import React, { useState } from 'react';
import { RESUME } from '../constants';
import ProjectPreview from './ProjectPreview';
import { ExternalLink, ArrowRight, Lock, Sparkles, Globe } from 'lucide-react';

// Fallback treatment for projects with no preview clip.
const projectStyles: Record<string, { gradient: string; icon: React.ReactNode }> = {
  'Solvizor': {
    gradient: 'from-accent/10 to-deep/10',
    icon: <Sparkles className="w-8 h-8" />
  },
  'Learna': {
    gradient: 'from-deep/10 to-accent/10',
    icon: <Globe className="w-8 h-8" />
  },
};

const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
         <div className="flex items-center gap-4 mb-16 reveal-section">
           <h2 className="font-display text-4xl md:text-5xl text-ink">
             <span className="mask-line"><span>Featured Projects</span></span>
           </h2>
           <div className="h-px flex-1 bg-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESUME.projects.map((project, index) => {
            const style = projectStyles[project.name] || {
              gradient: 'from-accent/10 to-deep/10',
              icon: <Globe className="w-8 h-8" />
            };
            const showcaseHref = project.showcase ? `#/${project.showcase.slug}` : undefined;

            return (
              <div
                key={index}
                className="reveal-section group relative rounded-2xl overflow-hidden glass-panel border-0 hover:shadow-xl hover:shadow-ink/5 transition-all duration-500"
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
                        <div className="absolute top-4 left-4 w-32 h-32 border border-line rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-24 h-24 border border-line rounded-lg rotate-12"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-line rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-ink/5 rounded-2xl text-ink/40 group-hover:text-ink/70 group-hover:scale-110 transition-all duration-500">
                          {style.icon}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Keeps the title legible over any frame of the clip */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 pointer-events-none"></div>

                  {/* External link button, only when there is a live URL */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="absolute top-4 right-4 p-2.5 bg-ink/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-ink/70 transition-all hover:scale-110"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-ink group-hover:text-accent transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-muted text-sm mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {showcaseHref ? (
                    <a
                      href={showcaseHref}
                      className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all after:absolute after:inset-0 after:content-['']"
                    >
                      View case study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-faint font-medium text-sm">
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
