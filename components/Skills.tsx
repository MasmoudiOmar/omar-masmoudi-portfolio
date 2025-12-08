import React from 'react';
import { RESUME } from '../constants';
import { Code, Layers, Database, Cloud, Wrench } from 'lucide-react';

// Skill icon mapping for Simple Icons CDN
const skillIcons: Record<string, string> = {
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Java': 'openjdk',
  'SQL': 'mysql',
  'Next.js': 'nextdotjs',
  'Angular': 'angular',
  'Spring Boot': 'springboot',
  'React': 'react',
  'MongoDB': 'mongodb',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'Redis': 'redis',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'AWS': 'amazonaws',
  'Vercel': 'vercel',
  'GitHub Actions': 'githubactions',
  'Git': 'git',
};

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
  'Languages': <Code className="w-5 h-5" />,
  'Frameworks': <Layers className="w-5 h-5" />,
  'Databases': <Database className="w-5 h-5" />,
  'DevOps': <Cloud className="w-5 h-5" />,
  'Tools': <Wrench className="w-5 h-5" />,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16 reveal-section">
           <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
           <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME.skills.map((category, index) => (
            <div 
              key={index} 
              className="reveal-section glass-panel p-6 rounded-2xl border-t-4 border-t-primary hover:border-t-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {categoryIcons[category.category] || <Code className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-white">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-lg border border-white/5 hover:border-primary/50 hover:text-white hover:bg-slate-700 transition-all cursor-default"
                  >
                    {skillIcons[skill] && (
                      <img 
                        src={`https://cdn.simpleicons.org/${skillIcons[skill]}/64748b`}
                        alt={skill}
                        className="w-4 h-4 group-hover:brightness-150 transition-all"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;