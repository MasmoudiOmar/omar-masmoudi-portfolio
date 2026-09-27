import React from 'react';
import { RESUME } from '../constants';
import { ArrowRight } from 'lucide-react';

// Simple Icons slugs for the logos that exist; anything unmapped renders as text.
const skillIcons: Record<string, string> = {
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Java': 'openjdk',
  'SQL': 'mysql',
  'Next.js': 'nextdotjs',
  'React': 'react',
  'Angular': 'angular',
  'Tailwind CSS': 'tailwindcss',
  'shadcn/ui': 'shadcnui',
  'TanStack Query': 'reactquery',
  'RxJS': 'reactivex',
  'Node.js': 'nodedotjs',
  'Spring Boot': 'springboot',
  'tRPC': 'trpc',
  'OAuth2/JWT': 'jsonwebtokens',
  'Spring Data JPA': 'spring',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Kafka': 'apachekafka',
  'Gemini': 'googlegemini',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'AWS': 'amazonaws',
  'Cloudflare': 'cloudflare',
  'Vercel': 'vercel',
  'GitHub Actions': 'githubactions',
};

const Skills: React.FC = () => (
  <section id="skills" className="py-24 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex items-baseline gap-4 mb-4 reveal-section">
        <h2 className="font-display text-4xl md:text-5xl text-ink">
             <span className="mask-line"><span>What I work with</span></span>
           </h2>
        <div className="h-px flex-1 bg-line" />
      </div>
      <p className="text-muted mb-14 max-w-xl reveal-section">
        Grouped by what I actually use it for. Where there's something to show, it links through.
      </p>

      <div className="divide-y divide-line border-y border-line">
        {RESUME.skills.map((group, index) => (
          <div
            key={group.category}
            className="reveal-section grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8 py-7"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint pt-1">
              {group.category}
            </h3>

            <div>
              <ul className="flex flex-wrap gap-x-2 gap-y-2 mb-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-line rounded-lg text-sm text-ink"
                  >
                    {skillIcons[skill] && (
                      <img
                        src={`https://cdn.simpleicons.org/${skillIcons[skill]}/8A877C`}
                        alt=""
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    {skill}
                  </li>
                ))}
              </ul>

              {group.proof && (
                <a
                  href={group.proof.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-accent font-medium"
                >
                  {group.proof.label}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
