---
layout: post
title:  "Preprocessing Affymetrix Gene Expression Arrays"
author: Nova Zhang
date:   2021-01-15 15:21:14 -0400
categories: Bioinfo
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">

<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"></script>
<script>
    document.addEventListener("DOMContentLoaded", function(){
        renderMathInElement(document.body,{delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
        ]});
    });
</script>

# Background

- **GEO** (Gene Expression Omnibus) is a public functional genomics data repository supporting MIAME-compliant data submissions. Array- and sequence-based data are accepted.
- A **CEL file** is a data file created by Affymetrix DNA microarray image analysis software. It contains the data extracted from "probes" on an Affymetrix GeneChip and can store thousands of data points, which may make it large in file size. CEL files can be processed by software algorithms and visualized on a 2D grid as part of an overall genome experiment.

# R Example on Breast Cancer Data

Data: [GES25055](https://www.notion.so/GSE25055-936dbd5499a44dc7bec234ed9e97dcfa)

Platform of data: `hgu133a.db`

```r
library(hgu133a.db)
```

## Install R package from Bioconductor:

```r
if (!requireNamespace("BiocManager", quietly = TRUE))
    install.packages("BiocManager") ## Install BiocManager
BiocManager::install("affy")
library(affy)
```

Full description of `affy` on Bioconductor: [affy](https://www.bioconductor.org/packages/release/bioc/html/affy.html)

## Download data

Download CEL file:

```r
file = getGEOSuppFiles("GSE25055") ## Here we need to unzip the download zip file
affyob<- ReadAffy(celfile.path="GSE25055/GSE25055_RAW")
```

Download information data:

```r
pinfo_25055 <- pData(phenoData(getGEO("GSE25055")[[1]]))
```

## fRMA process

Full desciption of `fRMA`: [frma](http://bioconductor.org/packages/release/bioc/html/frma.html)

### Normal RMA

Robust multiarray analysis (RMA) is the most widely used preprocessing algorithm for Affymetrix and Nimblegen gene expression microarrays. Three steps are performed by RMA: bacckground correction, normalization, and summarization in a modular way.

- **Backgound correction**: BOLSTAD , B. (2004). Low-level analysis of high-density oligonucleotide array data: background, normalization and summarization, [PhD. Thesis]. Berkeley, CA: University of California.
- **Normalization:** Quantile normalization forcesthe probe intensity distribution to be thesame on all the arrays.
- **Summarization:** Summarizing probe intensities into gene expression to be used in downstream analysis.

    $$Y_{ijn} = \theta_{in}+\phi_{jn}+\epsilon_{ijn}\quad\quad (1)$$

    - $Y_{ijn}$ representing the $\log_2$ background corrected and normalized intensity of probe $j \in 1,..., J_n$ in probe set $n \in 1,..., N$ on array $i \in 1,..., I$.
    - $\theta_{in}$ is the expression of probe set n on array $i$
    - $\phi_{jn}$ is the probe effect for $j_{th}$ probe set $n$.

Current R package `affy` uses median polish to estimate the $\theta$s. 

**Problem with RMA:**

1. Cannot computing the reference distribution used in quantile normalization
2. Cannot estimating the $\phi$s and $Var(\epsilon_{ijn})$ in equation (1) by running RMA on a reference database of biologially diverse samples

### frozen RMA

$$Y_{ijkn} = \theta_{in}+\phi_{jn}+\gamma_{jkn}+\epsilon_{ijkn}\quad\quad (2)$$

- $k \in 1,...,K$ represent batch and random-effect term and $\gamma$  explains the variability in probe effects across batches.

Frozen RMA removed the batch effect from each intensity and create a probe effect-corrected intensity:

$$Y_{i j \ln }^{*} \equiv Y_{i j l n}-\hat{\phi}_{j n}=\theta_{i n}+\gamma_{j l n}+\varepsilon_{i j ln} \quad\quad (3)$$

```r
library(fMRA)

object <- frma(affyob, verbose=TRUE)
expp<-exprs(object) 

colnames(expp)<-substr(colnames(expp),1,9)
```

## Filter probes

Use probe with largest IQR to represent the gene

```r
arrayIQR<-apply(expp,1,IQR)
probe<-rownames(expp)
uniqueGenes<-findLargest(as.vector(probe),arrayIQR,'hgu133a')

exp2<-expp[uniqueGenes,]
geneSymbol<-getSYMBOL(rownames(exp2),"hgu133a.db")
rownames(exp2)<-geneSymbol
```

## Save expression data

```r
write.csv(exp2,'Expr/exp_25055c.csv')
```
