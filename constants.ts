
import { Experience, Publication, ResearchProject, NewsItem, Education, Award, Service } from "./types";

export const PROFILE = {
  name: "Wei Zhang",
  title: "Postdoctoral Associate",
  affiliation: "University of Miami",
  email: "wei.zhang60@med.miami.edu",
  phone: "+1-786-630-2400",
  location: "Miami, FL",
  github: "https://github.com/noblegasss",
  researchGate: "#", 
  scholar: "#", 
  linkedin: "https://linkedin.com/in/nova-weizhang",
  bio: `I am a Postdoctoral Associate at the University of Miami, specializing in **Multi-omics Integration**, **Machine Learning**, and **Deep Learning** for biomedical research.
  
  My research focuses on developing advanced computational methods to identify biomarkers and therapeutic targets for neurodegenerative diseases and cancers. I integrate genomic, transcriptomic, and epigenetic data to build robust predictive models and uncover biological insights.`,
  interests: [
    "Multi-omics Integration", "Machine Learning", "Deep Learning", "Random Forests", 
    "Variable Selection", "Meta-analysis", "Biomarker Detection", "Subtype Clustering",
    "Statistical Genomics", "Epigenetics", "Neurodegenerative Disease", "Cancers"
  ]
};

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    date: "May 2025",
    content: "Scheduled to present at STATGEN 2025 in Minneapolis, MN."
  },
  {
    id: "n2",
    date: "Sep 2024",
    content: "Started as a Postdoctoral Associate at the University of Miami."
  },
  {
    id: "n3",
    date: "Aug 2024",
    content: "Successfully defended my Ph.D. Dissertation and received the Award of Academic Merit."
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Ph.D. in Biostatistics",
    institution: "University of Miami",
    location: "Miami, FL",
    year: "Aug 2024",
    advisor: "Chen, X. Steven, Ph.D.",
    details: "Dissertation: Integrative Multi-Omics Analysis Using Multivariate Random Forest"
  },
  {
    id: "edu2",
    degree: "M.S. in Statistics",
    institution: "The George Washington University",
    location: "Washington, DC",
    year: "May 2019"
  },
  {
    id: "edu3",
    degree: "B.S. in Economics Analysis & Actuarial Math",
    institution: "State University of New York at Binghamton",
    location: "Binghamton, NY",
    year: "May 2017"
  }
];

export const PROJECTS: ResearchProject[] = [
  {
    id: "p1",
    title: "Multivariate Random Forest Framework for Multi-omics Data Integration",
    description: "A random forest-based method for integrating multi-omics datasets to improve predictive accuracy and uncover biomarkers.",
    tools: ["R", "Random Forest", "Method Development"],
    status: "Ongoing",
    github: "https://github.com/noblegasss",
    contentUrl: "research/p1.md" // Loads from markdown file
  },
  {
    id: "p2",
    title: "Tumor and CellLine Transcriptomes Alignment with Deep Neural Networks",
    description: "Deep learning framework using Variational Autoencoders (VAE) and domain-adversarial training to align tumor and cell-line transcriptional profiles.",
    tools: ["Python", "PyTorch", "VAE"],
    status: "Ongoing",
    contentUrl: "research/p2.html" // Loads from HTML file
  },
  {
    id: "p3",
    title: "Epigenetic Biomarkers for Alzheimer’s and Cognitive Health",
    description: "Identification and validation of blood-based DNA methylation signatures predictive of incident dementia in longitudinal cohorts.",
    tools: ["R", "Statistical Modeling", "Longitudinal Analysis"],
    status: "Completed",
    // No contentUrl provided, will fallback to description
  },
  {
    id: "p4",
    title: "Prediction Models for Cancer Biomarkers",
    description: "Transcriptome-based prediction models for chemotherapy response using matched colorectal tumor-organoid gene expression data.",
    tools: ["R", "WGCNA", "Meta-analysis"],
    status: "Completed"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "s1",
    title: "The Aging Epigenome: Integrative Analyses Reveal Functional Overlap with Alzheimers Disease",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Lukacsovich D" },
      { name: "Young JI" },
      { name: "Gomez L" },
      { name: "Schmidt MA" },
      { name: "Kunkle B" },
      { name: "Chen XS" },
      { name: "Martin ER" },
      { name: "Wang L" }
    ],
    venue: "Prepare for submission",
    year: 2025,
    status: "In Submission",
    type: "Preprint",
    tags: ["Epigenetics", "Aging"],
    links: { pdf: "#" }
  },
  {
    id: "j1",
    title: "DNA Methylation Signature of a Lifestyle-based Resilience Index for Cognitive Health",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Lukacsovich D" },
      { name: "Young JI" },
      { name: "et al." }
    ],
    venue: "Alzheimer’s Research & Therapy",
    year: 2025,
    status: "Published",
    type: "Journal",
    tags: ["DNA Methylation", "Cognitive Health"],
    links: { pdf: "#" }
  },
  {
    id: "j2",
    title: "Blood DNA methylation signature for incident dementia: Evidence from longitudinal cohorts",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Young JI" },
      { name: "Gomez L" },
      { name: "et al." }
    ],
    venue: "Alzheimer’s & Dementia",
    year: 2025,
    status: "Published",
    type: "Journal",
    tags: ["Dementia", "Biomarkers"],
    links: { pdf: "#" }
  },
  {
    id: "j3",
    title: "Enhancing chemotherapy response prediction via matched colorectal tumor-organoid gene expression analysis",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Wu C" },
      { name: "Huang H" },
      { name: "et al." }
    ],
    venue: "Translational Oncology",
    year: 2025,
    status: "Published",
    type: "Journal",
    tags: ["Oncology", "Gene Expression"],
    links: { pdf: "#" }
  },
  {
    id: "s2",
    title: "An Integrative Multi-Omics Random Forest Framework for Robust Biomarker Discovery",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Huang H" },
      { name: "Wang L" },
      { name: "Lehmann BD" },
      { name: "Chen XS" }
    ],
    venue: "GigaScience (Revision Submitted)",
    year: 2025,
    status: "Preprint",
    type: "Preprint",
    tags: ["Multi-omics", "Machine Learning"],
    links: { pdf: "#" }
  },
  {
    id: "j4",
    title: "Critical evaluation of the reliability of DNA methylation probes on the Illumina MethylationEPIC v1.0 BeadChip microarrays",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Young JI" },
      { name: "et al." }
    ],
    venue: "Epigenetics",
    year: 2024,
    status: "Published",
    type: "Journal",
    tags: ["Epigenetics", "Methodology"],
    links: { pdf: "#" }
  },
  {
    id: "j6",
    title: "Distinct CSF biomarker-associated DNA methylation in Alzheimer’s disease and cognitively normal subjects",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Young JI" },
      { name: "et al." }
    ],
    venue: "Alzheimer’s Research & Therapy",
    year: 2023,
    status: "Published",
    type: "Journal",
    tags: ["Alzheimer's", "CSF Biomarkers"],
    links: { pdf: "#" }
  },
  {
    id: "j7",
    title: "Transcriptome meta-analysis of triple-negative breast cancer response to neoadjuvant chemotherapy",
    authors: [
      { name: "Zhang W", isMe: true },
      { name: "Li E" },
      { name: "Wang L" },
      { name: "Lehmann BD" },
      { name: "Chen XS" }
    ],
    venue: "Cancers",
    year: 2023,
    status: "Published",
    type: "Journal",
    tags: ["Breast Cancer", "Meta-analysis"],
    links: { pdf: "#" }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Postdoctoral Associate",
    company: "University of Miami",
    location: "Miami, FL",
    period: "Sep 2024 - Present",
    type: "Research",
    description: []
  },
  {
    id: "exp2",
    role: "Graduate Research Assistant",
    company: "University of Miami",
    location: "Miami, FL",
    period: "May 2022 - Aug 2024",
    type: "Research",
    description: []
  },
  {
    id: "teach1",
    role: "Teaching Assistant (EPH705)",
    company: "University of Miami",
    location: "Miami, FL",
    period: "2022 - 2024",
    type: "Teaching",
    description: []
  },
  {
    id: "teach2",
    role: "Teaching Assistant (STAT6201)",
    company: "The George Washington University",
    location: "Washington, DC",
    period: "2018",
    type: "Teaching",
    description: []
  }
];

export const SKILLS = {
  programming: ["R/RStudio (Proficient)", "Python (Proficient)", "SAS (Comprehensive)", "Linux"],
  expertise: ["Package Building", "Data Analysis", "Visualization", "Statistical Modeling", "Machine Learning"]
};

export const AWARDS: Award[] = [
  {
    id: "a1",
    title: "Award of Academic Merit",
    organization: "University of Miami",
    date: "Aug 2024"
  },
  {
    id: "a2",
    title: "Student Competition Award (Best Student Poster)",
    organization: "ASA Florida Chapter Meeting",
    date: "March 2023"
  },
  {
    id: "a3",
    title: "Travel Award",
    organization: "University of Miami",
    date: "Mar 2023"
  }
];

export const SERVICE: Service[] = [
  { role: "Manuscript Reviewer", organization: "Nature Communication" },
  { role: "Manuscript Reviewer", organization: "Scientific Reports" },
  { role: "Manuscript Reviewer", organization: "Discover Applied Sciences" },
  { role: "Manuscript Reviewer", organization: "Biology Direct" },
  { role: "Manuscript Reviewer", organization: "Discover Oncology" },
  { role: "Manuscript Reviewer", organization: "Medicine in Omics" },
  { role: "Member", organization: "International Biometric Society (ENAR)" },
  { role: "Member", organization: "American Statistical Association (ASA)" },
  { role: "Member", organization: "International Society to Advance Alzheimer’s Research and Treatment (ISTAART)" },
];
