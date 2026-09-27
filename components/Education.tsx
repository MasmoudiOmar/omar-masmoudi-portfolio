import React from 'react';
import { RESUME } from '../constants';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-sunken/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 reveal-section">
           <h2 className="font-display text-4xl md:text-5xl text-ink">
             <span className="mask-line"><span>Education</span></span>
           </h2>
           <div className="h-px flex-1 bg-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME.education.map((edu, index) => (
             <div 
               key={index} 
               className="reveal-section glass-panel p-6 rounded-2xl flex gap-4 items-start hover:bg-sunken hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 group"
               style={{ transitionDelay: `${index * 100}ms` }}
             >
                <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent/15 group-hover:scale-110 transition-all">
                   <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors">{edu.school}</h3>
                   <p className="text-accent text-sm mb-1">{edu.degree}</p>
                   <p className="text-muted text-xs mb-2">{edu.period} | {edu.location}</p>
                   {edu.details && (
                     <p className="text-faint text-sm italic">{edu.details}</p>
                   )}
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;