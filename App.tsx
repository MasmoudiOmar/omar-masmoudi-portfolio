import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import TerminalLoader from './components/TerminalLoader';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

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

  // Intersection Observer for section reveal animations - only run after content is shown
  useEffect(() => {
    if (!showContent) return;
    
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
  }, [showContent]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Education', href: '#education', id: 'education' },
  ];

  // Show terminal loader first
  if (isLoading) {
    return <TerminalLoader onComplete={handleLoadComplete} />;
  }

  return (
    <>
      {/* Navigation - Outside animated container so fixed positioning works */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-300 ${
          showContent ? 'opacity-100' : 'opacity-0'
        } ${
          isScrolled ? 'bg-background/95 backdrop-blur-md py-4 shadow-lg shadow-black/20' : 'bg-background py-6'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          ref={progressRef}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
          style={{ width: '0%', willChange: 'width' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="hover:scale-105 transition-transform" aria-label="Home">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <rect width="100" height="100" rx="20" fill="#0f172a"/>
              <rect x="4" y="4" width="92" height="92" rx="16" fill="none" stroke="#06b6d4" strokeWidth="3"/>
              <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#ffffff" textAnchor="middle">OM</text>
              <circle cx="82" cy="22" r="6" fill="#06b6d4"/>
            </svg>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.id 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white'
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
            className="md:hidden text-white hover:scale-110 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
           <div className="absolute top-full left-0 w-full bg-surface border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl animate-fade-in">
              {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.id ? 'text-accent' : 'text-slate-400 hover:text-white'
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
      <div className={`min-h-screen bg-background text-slate-200 selection:bg-accent/30 selection:text-white ${
        showContent ? 'animate-portfolio-enter' : 'opacity-0'
      }`}>
        {/* Main Content */}
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Education />
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} Omar Masmoudi</p>
          <p className="mt-2 text-xs">Built with React & Tailwind</p>
        </footer>
      </div>
    </>
  );
};

export default App;