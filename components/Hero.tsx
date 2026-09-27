import React from 'react';
import { Mail, Linkedin, Github, ArrowDown, Download } from 'lucide-react';
import { RESUME } from '../constants';
import CountUp from './CountUp';

/** Headline figures, pulled from the resume so they can't drift out of sync. */
const useHeadlineFacts = () => {
  const [current] = RESUME.experience;
  const cofounded = RESUME.experience.filter((role) => role.role.includes('Co-Founder')).length;

  return [
    { value: '4+', label: 'Years shipping' },
    { value: String(cofounded), label: 'Products co-founded' },
    { value: '5k+', label: 'Users reached' },
    { value: '50M+', label: 'Records processed' },
  ].concat(current ? [] : []);
};

const Hero: React.FC = () => {
  const { personal } = RESUME;
  const [current] = RESUME.experience;
  const facts = useHeadlineFacts();

  return (
    <section id="about" className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Availability line */}
        {current && (
          <div className="flex items-center gap-2.5 mb-8 text-sm text-muted animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-deep opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-deep" />
            </span>
            <span>
              Currently <span className="text-ink font-medium">{current.role.split('—')[0].trim()}</span> at{' '}
              <span className="text-ink font-medium">{current.company}</span>
            </span>
          </div>
        )}

        {/* Name */}
        <h1 className="font-display text-[clamp(3.5rem,13vw,9rem)] leading-[0.88] text-ink mb-8">
          <span className="mask-line mask-rise" style={{ animationDelay: '0.05s' }}>
            <span style={{ animationDelay: '0.05s' }}>Omar</span>
          </span>
          <span className="mask-line mask-rise italic text-accent">
            <span style={{ animationDelay: '0.18s' }}>Masmoudi</span>
          </span>
        </h1>

        {/* Positioning */}
        <div
          className="max-w-2xl mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <p className="text-xl md:text-2xl text-ink leading-snug mb-4">
            I build software that holds up — and I measure whether it actually does.
          </p>
          <p className="text-base text-muted leading-relaxed">
            {personal.summary}
          </p>
        </div>

        {/* Actions */}
        <div
          className="flex flex-wrap items-center gap-3 mb-20 animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink text-paper text-sm font-medium hover:bg-ink/90 transition-colors lift"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
          <a
            href="/omar-masmoudi-cv.pdf"
            download="Omar-Masmoudi-CV.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors lift"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-line text-ink text-sm font-medium hover:bg-sunken transition-colors lift"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-line text-ink text-sm font-medium hover:bg-sunken transition-colors lift"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>

        {/* Headline figures */}
        <dl
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {facts.map((fact) => (
            <div key={fact.label} className="bg-paper px-5 py-6">
              <dt className="font-display text-4xl md:text-5xl text-ink mb-1">
                <CountUp value={fact.value} />
              </dt>
              <dd className="text-xs uppercase tracking-wider text-faint">{fact.label}</dd>
            </div>
          ))}
        </dl>

        <a
          href="#experience"
          className="inline-flex items-center gap-2 mt-12 text-sm text-faint hover:text-ink transition-colors animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          See the work
        </a>
      </div>
    </section>
  );
};

export default Hero;
