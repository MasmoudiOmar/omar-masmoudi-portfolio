import React, { useState } from 'react';
import { RESUME } from '../constants';
import ProjectPreview from './ProjectPreview';
import { ExternalLink, ArrowRight, Lock, Sparkles, Globe } from 'lucide-react';

// Fallback treatment for projects with no preview clip.
const projectStyles: Record<string, { gradient: string; icon: React.ReactNode }> = {
  'Solvizor': {
    gradient: 'from-violet-600/20 via-purple-600/10 to-fuchsia-600/20',
    icon: <Sparkles className="w-8 h-8" />
  },
  'Learna': {
    gradient: 'from-emerald-600/20 via-teal-600/10 to-cyan-600/20',
    icon: <Globe className="w-8 h-8" />
  },
};

const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
         <div className="flex items-center gap-4 mb-16 reveal-section">
           <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
           <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESUME.projects.map((project, index) => {
            const style = projectStyles[project.name] || {
              gradient: 'from-primary/20 to-accent/20',
              icon: <Globe className="w-8 h-8" />
            };
            const showcaseHref = project.showcase ? `#/${project.showcase.slug}` : undefined;

            return (
              <div
                key={index}
                className="reveal-section group relative rounded-2xl overflow-hidden glass-panel border-0 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
              >
                {/* Preview area: the clip when there is one, else the gradient treatment */}
                <div className={`h-48 relative overflow-hidden ${project.preview ? 'bg-slate-950' : `bg-gradient-to-br ${style.gradient}`}`}>
                  {project.preview ? (
                    <ProjectPreview
                      media={project.preview}
                      label={`${project.name} preview`}
                      active={hovered === index}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-4 w-32 h-32 border border-white/10 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/10 rounded-lg rotate-12"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                          {style.icon}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Keeps the title legible over any frame of the clip */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>

                  {/* External link button, only when there is a live URL */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="absolute top-4 right-4 p-2.5 bg-black/30 backdrop-blur-sm rounded-full text-white/60 hover:text-white hover:bg-black/50 transition-all hover:scale-110"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-slate-400 text-sm mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {showcaseHref ? (
                    <a
                      href={showcaseHref}
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all after:absolute after:inset-0 after:content-['']"
                    >
                      View case study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-slate-500 font-medium text-sm">
                      <Lock className="w-4 h-4" />
                      Private source
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
