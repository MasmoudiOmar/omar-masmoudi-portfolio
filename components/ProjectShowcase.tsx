import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Info, Play, Pause } from 'lucide-react';
import { Media, ProjectShowcase as Showcase } from '../types';

/**
 * A looping, muted clip of the product.
 *
 * Autoplaying video is muted and loops, but users who ask their OS for reduced
 * motion get a still poster and an explicit play control instead.
 */
const Clip: React.FC<{ media: Media; label: string }> = ({ media, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
      <video
        ref={videoRef}
        className="w-full block"
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!reduceMotion}
        aria-label={label}
      >
        <source src={media.webm} type="video/webm" />
        <source src={media.mp4} type="video/mp4" />
      </video>

      {reduceMotion && (
        <button
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/40 hover:bg-slate-950/20 transition-colors"
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        >
          <span className="p-4 rounded-full bg-white/10 backdrop-blur-sm text-white">
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </span>
        </button>
      )}
    </div>
  );
};

const ProjectShowcase: React.FC<{ name: string; showcase: Showcase; onBack: () => void }> = ({
  name,
  showcase,
  onBack,
}) => (
  <div className="min-h-screen bg-background text-slate-200">
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to portfolio
      </button>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h1>
        <p className="text-xl md:text-2xl text-accent mb-8">{showcase.tagline}</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-400">
          <span>{showcase.role}</span>
          <span>{showcase.period}</span>
        </div>
      </header>

      {/* Be upfront that this is recorded, not live */}
      <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-16">
        <Info className="w-5 h-5 text-amber-400/80 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-100/70 leading-relaxed">{showcase.status}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {showcase.metrics.map((metric) => (
          <div key={metric.label} className="glass-panel rounded-2xl p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-xs text-slate-400 leading-snug">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Overview */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
        {showcase.overview.map((paragraph, index) => (
          <p key={index} className="text-slate-300 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Features, each with its clip */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">What it did</h2>
        <div className="space-y-16">
          {showcase.features.map((feature) => (
            <article key={feature.title}>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
              {feature.media && <Clip media={feature.media} label={feature.title} />}
            </article>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-3">How the data moved</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Ingestion had to keep up with the chain without ever blocking a user's request, so every
          stage between the chain and the UI was asynchronous.
        </p>
        <ol className="relative border-l-2 border-white/10 ml-2 space-y-6">
          {showcase.pipeline.map((stage, index) => (
            <li key={stage.label} className="relative pl-8">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-800 border-2 border-accent/60 text-accent text-[10px] font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <h3 className="text-white font-semibold mb-1">{stage.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Built with</h2>
        <div className="space-y-5">
          {showcase.stack.map((group) => (
            <div key={group.group} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider w-24 flex-shrink-0">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-lg border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to portfolio
      </button>
    </div>
  </div>
);

export default ProjectShowcase;
