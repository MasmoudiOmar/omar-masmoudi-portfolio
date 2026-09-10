import React from 'react';
import { RESUME } from '../constants';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 reveal-section">
           <h2 className="text-3xl font-bold text-white">Education</h2>
           <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME.education.map((edu, index) => (
             <div 
               key={index} 
               className="reveal-section glass-panel p-6 rounded-2xl flex gap-4 items-start hover:bg-slate-800/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
               style={{ transitionDelay: `${index * 100}ms` }}
             >
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                   <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{edu.school}</h3>
                   <p className="text-accent text-sm mb-1">{edu.degree}</p>
                   <p className="text-slate-400 text-xs mb-2">{edu.period} | {edu.location}</p>
                   {edu.details && (
                     <p className="text-slate-500 text-sm italic">{edu.details}</p>
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