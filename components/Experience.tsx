import React from 'react';
import { RESUME } from '../constants';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative">
       <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16 reveal-section">
           <h2 className="text-3xl font-bold text-white">Experience</h2>
           <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12">
          {RESUME.experience.map((exp, index) => (
            <div 
              key={index} 
              className="reveal-section relative pl-8 md:pl-12 group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-500 group-hover:bg-accent group-hover:border-accent group-hover:scale-125 transition-all duration-300"></div>
              
              {/* Connecting line glow on hover */}
              <div className="absolute -left-[1px] top-4 w-0.5 h-0 bg-accent/50 group-hover:h-full transition-all duration-500"></div>

              <div className="glass-panel p-6 rounded-2xl hover:bg-slate-800/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-lg text-primary font-medium hover:text-accent transition-colors"
                      >
                        {exp.company}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="text-lg text-primary font-medium">{exp.company}</div>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-end text-sm text-slate-400 gap-1">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4" />
                       {exp.period}
                       {exp.period.includes('Present') && (
                         <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium">
                           Current
                         </span>
                       )}
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin className="w-4 h-4" />
                       {exp.location}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300 leading-relaxed text-sm md:text-base">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
       </div>
    </section>
  );
};

export default Experience;