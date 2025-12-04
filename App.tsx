
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { 
  Github, Mail, ExternalLink, 
  MapPin, Menu, X, Code, Briefcase, GraduationCap, Award, Book, User, Globe, Download, ArrowLeft, BookOpen
} from './components/Icons';
import { PROFILE, PUBLICATIONS, PROJECTS, EXPERIENCES, NEWS, EDUCATION, AWARDS, SERVICE, SKILLS } from './constants';
import { SectionId, ResearchProject } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [projectContent, setProjectContent] = useState<string>('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      const scrollPosition = window.scrollY + 150; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch logic for project content
  useEffect(() => {
    if (selectedProject?.contentUrl) {
      setIsLoadingContent(true);
      fetch(selectedProject.contentUrl)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load content");
          return res.text();
        })
        .then(async text => {
          if (selectedProject.contentUrl!.endsWith('.md')) {
            const html = await marked.parse(text);
            setProjectContent(html);
          } else {
            setProjectContent(text);
          }
          setIsLoadingContent(false);
        })
        .catch(err => {
          console.error(err);
          setProjectContent('<p class="text-red-600">Failed to load content file.</p>');
          setIsLoadingContent(false);
        });
    } else if (selectedProject) {
      // Fallback if no URL
      setProjectContent(`<p>${selectedProject.longDescription || selectedProject.description}</p>`);
    } else {
      setProjectContent('');
    }
  }, [selectedProject]);

  // Lock body scroll and trigger MathJax when content is loaded/project is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // Trigger MathJax re-render after content update
      if ((window as any).MathJax && !isLoadingContent) {
         setTimeout(() => {
            (window as any).MathJax.typesetPromise();
         }, 100);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject, isLoadingContent]);

  const scrollTo = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 1024 ? 80 : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }: { id: SectionId, label: string }) => (
    <button
      onClick={() => scrollTo(id)}
      className={`group flex items-center gap-3 text-sm font-medium transition-all duration-300 w-full text-left ${
        activeSection === id 
          ? 'text-white translate-x-2' 
          : 'text-brand-200 hover:text-white hover:translate-x-1'
      }`}
    >
      <span className={`h-px bg-white transition-all duration-300 ${activeSection === id ? 'w-8' : 'w-0 group-hover:w-4'}`}></span>
      {label}
    </button>
  );

  // Helper to render formatted text for bio/news
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-brand-900">{part.slice(2, -2)}</strong>;
      }
      const italicParts = part.split(/(\*.*?\*)/g);
      return (
        <span key={index}>
          {italicParts.map((subPart, subIndex) => {
            if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
               return <em key={subIndex} className="italic text-academic-800">{subPart.slice(1, -1)}</em>;
            }
            return subPart;
          })}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-academic-50 flex flex-col lg:flex-row selection:bg-brand-200 selection:text-brand-950 font-sans">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-brand-900 border-r border-brand-800 px-8 py-12 justify-between text-white shadow-xl z-20 shrink-0">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-white text-brand-900 flex items-center justify-center text-2xl font-serif font-bold border-4 border-brand-700 shadow-lg">
              WZ
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white tracking-tight">{PROFILE.name}</h1>
              <p className="text-brand-200 text-xs mt-2 font-medium leading-relaxed">{PROFILE.title}</p>
              <p className="text-brand-300 text-xs">{PROFILE.affiliation}</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-4 items-start">
            <NavLink id={SectionId.INTRO} label="Intro" />
            <NavLink id={SectionId.RESEARCH} label="Research" />
            <NavLink id={SectionId.PUBLICATIONS} label="Publications" />
            <NavLink id={SectionId.CV} label="CV" />
          </nav>
        </div>

        <div className="space-y-4">
            <div className="flex gap-4">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-white transition-colors"><Github size={18} /></a>
              <a href={`mailto:${PROFILE.email}`} className="text-brand-300 hover:text-white transition-colors"><Mail size={18} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-white transition-colors"><ExternalLink size={18} /></a>
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-brand-900 text-white border-b border-brand-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <span className="font-serif font-bold text-xl">{PROFILE.name}</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-200 p-1">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-brand-900 pt-24 px-8 flex flex-col space-y-6 animate-fade-in text-white overflow-y-auto pb-10">
           {Object.values(SectionId).map((id) => (
             <button key={id} onClick={() => scrollTo(id)} className="text-2xl font-serif text-brand-100 hover:text-white text-left capitalize border-b border-brand-800 pb-2">
               {id}
             </button>
           ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:px-12 lg:py-16 space-y-24">
        
        {/* Intro Section */}
        <section id={SectionId.INTRO} className="space-y-12 animate-fade-in-up">
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-900 leading-tight">
              Integrating <span className="text-accent-600">multi-omics</span> & <span className="text-accent-600">AI</span> to decode complex diseases.
            </h2>
            <div className="prose prose-lg text-academic-600 leading-relaxed font-light">
               <p className="whitespace-pre-line">{renderFormattedText(PROFILE.bio)}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {PROFILE.interests.map(interest => (
                <span key={interest} className="px-3 py-1 bg-white border border-brand-100 text-brand-700 rounded-full text-xs font-bold tracking-wide hover:border-brand-300 transition-colors cursor-default shadow-sm">
                  {interest}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-academic-600 text-sm pt-4 border-t border-academic-200 mt-6">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent-600"/>
                <span>{PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent-600"/>
                <a href={`mailto:${PROFILE.email}`} className="hover:text-brand-600 transition-colors">{PROFILE.email}</a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-brand-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Globe size={16} /> Recent News
            </h3>
            <div className="space-y-4">
              {NEWS.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:gap-6 sm:items-baseline">
                  <span className="text-xs font-bold text-academic-400 w-24 shrink-0 uppercase">{item.date}</span>
                  <div className="text-sm text-academic-800 font-medium">{renderFormattedText(item.content)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section - Grid of Squares */}
        <section id={SectionId.RESEARCH} className="space-y-10">
           <div className="flex items-center gap-4 mb-8 border-b border-brand-100 pb-4">
              <Code size={32} className="text-brand-900" />
              <h3 className="font-serif text-3xl font-bold text-brand-900">Research</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {PROJECTS.map(project => (
               <div 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white border border-brand-100 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[360px] overflow-hidden"
               >
                 {/* Decorative Background Element */}
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-50 rounded-full transition-transform group-hover:scale-150 duration-700 ease-out z-0"></div>

                 <div className="relative z-10 flex flex-col gap-4 h-full">
                    <div className="flex justify-between items-start">
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${
                          project.status === 'Ongoing' 
                          ? 'bg-accent-50 text-accent-700 border-accent-100' 
                          : 'bg-gray-50 text-gray-600 border-gray-100'
                        }`}>
                          {project.status}
                        </span>
                        <ExternalLink size={20} className="text-brand-300 group-hover:text-brand-600 transition-colors" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-brand-900 font-serif leading-tight group-hover:text-brand-700 transition-colors line-clamp-3">
                      {project.title}
                    </h4>
                    
                    <p className="text-academic-600 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                         {project.tools.slice(0, 3).map(tool => (
                           <span key={tool} className="text-[10px] font-bold uppercase text-brand-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-brand-100">
                             {tool}
                           </span>
                         ))}
                         {project.tools.length > 3 && (
                             <span className="text-[10px] font-bold uppercase text-brand-400 px-1 py-1">
                               +{project.tools.length - 3}
                             </span>
                         )}
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Publications Section */}
        <section id={SectionId.PUBLICATIONS} className="space-y-10">
           <div className="flex items-center gap-4 mb-8 border-b border-brand-100 pb-4">
              <Book size={32} className="text-brand-900" />
              <h3 className="font-serif text-3xl font-bold text-brand-900">Selected Publications</h3>
           </div>

           <div className="space-y-8">
             {PUBLICATIONS.map(pub => (
               <div key={pub.id} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-white border border-brand-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                 <div className="sm:w-32 shrink-0 pt-1 flex flex-col gap-1">
                    <span className="text-xl font-bold text-brand-900">{pub.year}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded w-fit ${
                      pub.type === 'Journal' ? 'bg-brand-50 text-brand-700' :
                      pub.type === 'Conference' ? 'bg-accent-50 text-accent-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{pub.type}</span>
                 </div>
                 
                 <div className="space-y-2 flex-1">
                   <h4 className="text-lg font-bold text-academic-800 font-serif leading-snug">
                     {pub.title}
                   </h4>
                   <p className="text-sm text-academic-600 leading-relaxed">
                     {pub.authors.map((author, idx) => (
                       <span key={idx} className={author.isMe ? "font-bold text-brand-900 underline decoration-accent-400 decoration-2 underline-offset-2" : ""}>
                         {author.name}{idx < pub.authors.length - 1 ? ", " : ""}
                       </span>
                     ))}
                   </p>
                   <div className="flex items-center gap-2 text-sm italic text-academic-500 font-medium">
                     <span>{pub.venue}</span>
                     {pub.status && <span className="not-italic text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">{pub.status}</span>}
                   </div>
                   
                   <div className="flex gap-2 mt-2 pt-2">
                      {pub.links.pdf && <a href={pub.links.pdf} className="text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline">PDF</a>}
                      {pub.links.doi && <a href={pub.links.doi} className="text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline">DOI</a>}
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* CV Section */}
        <section id={SectionId.CV} className="space-y-16 pb-20">
           <div className="flex items-center justify-between mb-8 border-b border-brand-100 pb-4">
              <div className="flex items-center gap-4">
                <User size={32} className="text-brand-900" />
                <h3 className="font-serif text-3xl font-bold text-brand-900">Curriculum Vitae</h3>
              </div>
              <a 
                href="/cv.pdf" 
                download
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
           </div>

           {/* Experience */}
           <div className="space-y-8">
             <h4 className="text-xl font-bold text-brand-800 flex items-center gap-2">
               <Briefcase size={20} className="text-accent-600"/> Experience
             </h4>
             <div className="relative border-l-2 border-brand-100 ml-3 space-y-10 py-2">
               {EXPERIENCES.filter(e => e.type === 'Research').map((exp) => (
                 <div key={exp.id} className="relative pl-8 md:pl-10 group">
                   <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-[3px] border-brand-300 group-hover:border-accent-500 transition-colors shadow-sm"></div>
                   <div className="grid md:grid-cols-[1fr_3fr] gap-2 md:gap-8">
                     <span className="text-xs font-bold text-academic-500 uppercase tracking-wide mt-1">{exp.period}</span>
                     <div className="space-y-2">
                       <h5 className="text-lg font-bold text-brand-900">{exp.role}</h5>
                       <p className="text-academic-700 font-medium text-sm">{exp.company} &bull; {exp.location}</p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Education */}
           <div className="space-y-8">
             <h4 className="text-xl font-bold text-brand-800 flex items-center gap-2">
               <GraduationCap size={20} className="text-accent-600"/> Education
             </h4>
             <div className="grid gap-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="bg-white p-6 rounded-xl border border-brand-100 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <h5 className="text-lg font-bold text-brand-900">{edu.degree}</h5>
                      <p className="text-academic-700">{edu.institution}</p>
                      {edu.advisor && <p className="text-sm text-academic-500 mt-1 italic">Advisor: {edu.advisor}</p>}
                      {edu.details && <p className="text-sm text-academic-600 mt-1">{edu.details}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-sm font-bold text-brand-600">{edu.year}</span>
                      <span className="block text-xs text-academic-400 uppercase">{edu.location}</span>
                    </div>
                  </div>
                ))}
             </div>
           </div>

           {/* Skills & Awards Grid */}
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-brand-800 flex items-center gap-2">
                  <Award size={20} className="text-accent-600"/> Honors & Awards
                </h4>
                <ul className="space-y-4">
                  {AWARDS.map(award => (
                    <li key={award.id} className="flex justify-between items-start border-b border-academic-100 pb-3 last:border-0">
                       <div>
                         <span className="block font-bold text-academic-800 text-sm">{award.title}</span>
                         <span className="text-xs text-academic-500 italic">{award.organization}</span>
                       </div>
                       <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{award.date}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-brand-800 flex items-center gap-2">
                  <Code size={20} className="text-accent-600"/> Skills
                </h4>
                <div className="bg-white p-6 rounded-xl border border-brand-100 space-y-4 shadow-sm">
                   <div>
                      <span className="text-xs font-bold text-academic-400 uppercase tracking-widest block mb-2">Programming</span>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.programming.map(s => (
                          <span key={s} className="px-2 py-1 bg-academic-50 text-academic-700 rounded text-xs font-medium border border-academic-200">{s}</span>
                        ))}
                      </div>
                   </div>
                   <div>
                      <span className="text-xs font-bold text-academic-400 uppercase tracking-widest block mb-2">Expertise</span>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.expertise.map(s => (
                          <span key={s} className="px-2 py-1 bg-academic-50 text-academic-700 rounded text-xs font-medium border border-academic-200">{s}</span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
           </div>
           
           {/* Service */}
           <div className="space-y-6">
              <h4 className="text-xl font-bold text-brand-800 flex items-center gap-2">
                  <User size={20} className="text-accent-600"/> Professional Service
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                 {/* Manuscript Peer Review */}
                 <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm flex flex-col">
                    <h5 className="font-bold text-brand-900 mb-4 border-b border-brand-50 pb-2 flex items-center gap-2">
                       <BookOpen size={18} className="text-accent-600" />
                       Manuscript Peer Review
                    </h5>
                    <ul className="space-y-3 flex-1">
                       {SERVICE.filter(s => s.role === 'Manuscript Reviewer').map((s, i) => (
                          <li key={i} className="text-sm text-academic-700 flex items-start gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0"></span>
                             <span className="italic">{s.organization}</span>
                          </li>
                       ))}
                    </ul>
                 </div>

                 {/* Memberships */}
                 <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm flex flex-col">
                    <h5 className="font-bold text-brand-900 mb-4 border-b border-brand-50 pb-2 flex items-center gap-2">
                       <User size={18} className="text-accent-600" />
                       Memberships
                    </h5>
                    <ul className="space-y-3 flex-1">
                       {SERVICE.filter(s => s.role === 'Member').map((s, i) => (
                          <li key={i} className="text-sm text-academic-700 flex items-start gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0"></span>
                             <span>{s.organization}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>

        </section>

      </main>

      {/* Full Screen Research Project Modal ("New Page") */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-academic-50 overflow-y-auto animate-fade-in flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-brand-100 px-6 py-4 flex items-center justify-between z-10">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-brand-50"
            >
              <ArrowLeft size={20} />
              <span>Back to Research</span>
            </button>
            <span className="text-sm font-serif font-bold text-brand-900 truncate max-w-xs md:max-w-md">
              {selectedProject.title}
            </span>
          </div>

          {/* Article Content */}
          <div className="max-w-6xl mx-auto w-full px-6 py-12 md:py-16 space-y-10 animate-fade-in-up">
            
            <div className="space-y-6">
               <div className="flex flex-wrap gap-3">
                  <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full tracking-wide ${
                     selectedProject.status === 'Ongoing' ? 'bg-accent-100 text-accent-800' : 'bg-gray-100 text-gray-700'
                   }`}>
                     {selectedProject.status}
                  </span>
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs uppercase font-bold px-3 py-1 rounded-full bg-academic-800 text-white hover:bg-black transition-colors">
                      <Github size={12} /> Repository
                    </a>
                  )}
               </div>
               <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 leading-tight">
                 {selectedProject.title}
               </h1>
            </div>

            {/* Render Dynamic Content from File */}
            <div className="min-h-[200px] bg-white rounded-xl p-8 border border-brand-100 shadow-sm markdown-content">
               {isLoadingContent ? (
                  <div className="flex items-center justify-center py-20 text-brand-600">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                  </div>
               ) : (
                  <div 
                     className="prose prose-lg prose-indigo max-w-none"
                     dangerouslySetInnerHTML={{ __html: projectContent }} 
                  />
               )}
            </div>

            {/* Footer Navigation */}
            <div className="pt-12 mt-12 border-t border-brand-100 flex justify-center">
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
               >
                 View All Research
               </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default App;
