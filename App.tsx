import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import ChatInterface from './components/ChatInterface';
import ProjectShowcase from './components/ProjectShowcase';
import Logo from './components/Logo';
import { RESUME } from './constants';
import { Menu, X, Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

const readRoute = () =>
  window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '';

const App: React.FC = () => {
  const [route, setRoute] = useState(readRoute);
  // Deep-linking straight to a case study should not sit through the loader.
  // Content renders immediately — no loading gate. The old terminal animation
  // held the page for ~3s before a visitor saw anything.
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /**
   * Position the page after a route change.
   *
   * Leaving a case study restores a section anchor like #projects, but the main
   * page has not mounted at the moment the hash changes — so the browser has no
   * element to scroll to and falls back to its own scroll restoration, landing
   * somewhere arbitrary. Scrolling on the next frame, once the section exists,
   * puts it where the anchor actually points.
   */
  useEffect(() => {
    if (route) {
      window.scrollTo(0, 0);
      return;
    }

    const anchor = window.location.hash.slice(1);
    if (!anchor || anchor.startsWith('/')) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        
        // Update scroll progress directly on the DOM for smoothness
        if (progressRef.current) {
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
          progressRef.current.style.width = `${progress}%`;
        }
        
        // Determine active section
        const sections = ['about', 'experience', 'skills', 'projects', 'education'];
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Intersection Observer for section reveal animations - only run after content is shown.
  // Also re-runs when leaving a case study, because returning remounts every
  // .reveal-section and the previous observer was watching the old nodes.
  useEffect(() => {
    if (route) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    document.querySelectorAll('.reveal-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [route]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Education', href: '#education', id: 'education' },
  ];

  // Show terminal loader first
  // A matching route replaces the whole page with that project's case study.
  const routedProject = route
    ? RESUME.projects.find((project) => project.showcase?.slug === route)
    : undefined;

  if (routedProject?.showcase) {
    return (
      <ProjectShowcase
        name={routedProject.name}
        showcase={routedProject.showcase}
        onBack={() => {
          // Land back on the Projects section rather than the top of the page.
          window.location.hash = '#projects';
        }}
      />
    );
  }

  return (
    <>
      {/* Navigation - Outside animated container so fixed positioning works */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-300 ${
          isScrolled ? 'bg-paper/90 backdrop-blur-md py-4 border-b border-line' : 'bg-paper py-6 border-b border-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          ref={progressRef}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
          style={{ width: '0%', willChange: 'width' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="block" aria-label="Home">
            <Logo size={40} className="text-ink" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.id
                    ? 'text-ink'
                    : 'text-muted hover:text-ink link-underline'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-ink hover:scale-110 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
           <div className="absolute top-full left-0 w-full bg-card border-b border-line p-6 md:hidden flex flex-col gap-4 shadow-2xl animate-fade-in">
              {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.id ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
           </div>
        )}
      </nav>

      {/* Main Container with animation */}
      <div className="min-h-screen bg-paper text-ink selection:bg-accent/20 selection:text-ink">
        {/* Main Content */}
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Education />
        </main>

        <ChatInterface />

        {/* Footer */}
        <footer className="border-t border-line bg-sunken/60">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
              Let's build something together
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Open to full-stack roles and freelance work. The fastest way to reach me is email.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <a
                href={`mailto:${RESUME.personal.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-ink text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                {RESUME.personal.email}
              </a>
              <a
                href={RESUME.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel text-muted hover:text-ink text-sm font-medium transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={RESUME.personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel text-muted hover:text-ink text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-line text-faint text-sm">
              <p>&copy; {new Date().getFullYear()} Omar Masmoudi</p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 hover:text-muted transition-colors"
              >
                Back to top
                <ArrowUp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;