import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Mail, Phone, Linkedin, Github, Download, FileCode, X } from 'lucide-react';
import { RESUME } from '../constants';

// Token types for syntax highlighting
type TokenType = 'keyword' | 'variable' | 'string' | 'number' | 'operator' | 'punctuation' | 'comment' | 'function' | 'property' | 'plain';
type TabType = 'profile' | 'projects';

interface Token {
  type: TokenType;
  value: string;
}

interface CodeLine {
  tokens: Token[];
  indent: number;
}

const tokenColors: Record<TokenType, string> = {
  keyword: 'text-purple-400',
  variable: 'text-yellow-300',
  string: 'text-emerald-400',
  number: 'text-orange-400',
  operator: 'text-pink-400',
  punctuation: 'text-slate-400',
  comment: 'text-slate-500 italic',
  function: 'text-blue-400',
  property: 'text-cyan-300',
  plain: 'text-slate-300',
};

const Hero: React.FC = () => {
  const { personal, projects } = RESUME;
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for dynamic background
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  // Define the profile code to be typed out with syntax tokens
  const profileCodeLines: CodeLine[] = useMemo(() => [
    { indent: 0, tokens: [
      { type: 'keyword', value: 'interface' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'Engineer' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '{' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'name' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'role' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'experience' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'number' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'stack' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string[]' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'passions' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string[]' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 0, tokens: [
      { type: 'punctuation', value: '}' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { type: 'keyword', value: 'const' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'omar' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'Engineer' },
      { type: 'plain', value: ' ' },
      { type: 'operator', value: '=' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '{' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'name' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: `"${personal.name}"` },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'role' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: `"${personal.title}"` },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'experience' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'number', value: '4' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'comment', value: '// years of building cool stuff' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'stack' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '[' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"Next.js"' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: '"React"' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: '"Angular"' },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"Spring Boot"' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: '"Node.js"' },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"PostgreSQL"' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: '"MongoDB"' },
      { type: 'punctuation', value: ',' },
      { type: 'plain', value: ' ' },
      { type: 'string', value: '"Redis"' }
    ]},
    { indent: 1, tokens: [
      { type: 'punctuation', value: '],' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'passions' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '[' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"AI/ML Integrations"' },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"Scalable Data Pipelines"' },
      { type: 'punctuation', value: ',' }
    ]},
    { indent: 2, tokens: [
      { type: 'string', value: '"End-to-End Ownership"' }
    ]},
    { indent: 1, tokens: [
      { type: 'punctuation', value: ']' }
    ]},
    { indent: 0, tokens: [
      { type: 'punctuation', value: '};' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { type: 'comment', value: "// Let's build something amazing together! 🚀" }
    ]},
  ], [personal.name, personal.title]);

  // Define the projects code to be typed out with syntax tokens
  const projectsCodeLines: CodeLine[] = useMemo(() => [
    { indent: 0, tokens: [
      { type: 'keyword', value: 'interface' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'Project' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '{' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'name' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'link' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 1, tokens: [
      { type: 'property', value: 'description' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'string' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 0, tokens: [
      { type: 'punctuation', value: '}' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { type: 'keyword', value: 'const' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'projects' },
      { type: 'punctuation', value: ':' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'Project[]' },
      { type: 'plain', value: ' ' },
      { type: 'operator', value: '=' },
      { type: 'plain', value: ' ' },
      { type: 'punctuation', value: '[' }
    ]},
    ...projects.flatMap((project, index) => [
      { indent: 1, tokens: [
        { type: 'punctuation' as TokenType, value: '{' }
      ]},
      { indent: 2, tokens: [
        { type: 'property' as TokenType, value: 'name' },
        { type: 'punctuation' as TokenType, value: ':' },
        { type: 'plain' as TokenType, value: ' ' },
        { type: 'string' as TokenType, value: `"${project.name}"` },
        { type: 'punctuation' as TokenType, value: ',' }
      ]},
      { indent: 2, tokens: [
        { type: 'property' as TokenType, value: 'link' },
        { type: 'punctuation' as TokenType, value: ':' },
        { type: 'plain' as TokenType, value: ' ' },
        { type: 'string' as TokenType, value: `"${project.link}"` },
        { type: 'punctuation' as TokenType, value: ',' }
      ]},
      { indent: 2, tokens: [
        { type: 'property' as TokenType, value: 'description' },
        { type: 'punctuation' as TokenType, value: ':' },
        { type: 'plain' as TokenType, value: ' ' },
        { type: 'string' as TokenType, value: `"${project.description}"` }
      ]},
      { indent: 1, tokens: [
        { type: 'punctuation' as TokenType, value: '}' },
        ...(index < projects.length - 1 ? [{ type: 'punctuation' as TokenType, value: ',' }] : [])
      ]}
    ]),
    { indent: 0, tokens: [
      { type: 'punctuation', value: '];' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { type: 'keyword', value: 'export' },
      { type: 'plain', value: ' ' },
      { type: 'keyword', value: 'default' },
      { type: 'plain', value: ' ' },
      { type: 'variable', value: 'projects' },
      { type: 'punctuation', value: ';' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { type: 'comment', value: '// Click to explore these projects! 🔗' }
    ]},
  ], [projects]);

  // Get current code lines based on active tab
  const codeLines = activeTab === 'profile' ? profileCodeLines : projectsCodeLines;

  // Reset animation when tab changes
  const handleTabChange = useCallback((tab: TabType) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setDisplayedLines(0);
      setCurrentCharIndex(0);
      setIsComplete(false);
    }
  }, [activeTab]);

  // Calculate total characters in a line
  const getLineLength = (line: CodeLine): number => {
    return line.tokens.reduce((sum, token) => sum + token.value.length, 0) + line.indent * 2;
  };

  // Typing animation effect
  useEffect(() => {
    if (isComplete) return;

    const currentLine = codeLines[displayedLines];
    if (!currentLine) {
      setIsComplete(true);
      return;
    }

    const lineLength = getLineLength(currentLine);
    
    if (currentCharIndex < lineLength) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 25); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 80); // Delay between lines
      return () => clearTimeout(timeout);
    }
  }, [displayedLines, currentCharIndex, codeLines, isComplete, activeTab]);

  // Render a single line with partial typing
  const renderLine = (line: CodeLine, lineIndex: number, isCurrentLine: boolean, charLimit: number) => {
    const indent = '  '.repeat(line.indent);
    let charsRendered = line.indent * 2;
    
    return (
      <div key={lineIndex} className="flex">
        <span className="text-slate-600 select-none w-8 text-right pr-3 flex-shrink-0">
          {lineIndex + 1}
        </span>
        <span>
          <span className="text-slate-700">{isCurrentLine ? indent.slice(0, Math.max(0, charLimit)) : indent}</span>
          {line.tokens.map((token, tokenIndex) => {
            if (!isCurrentLine) {
              return (
                <span key={tokenIndex} className={tokenColors[token.type]}>
                  {token.value}
                </span>
              );
            }
            
            const startChar = charsRendered;
            charsRendered += token.value.length;
            
            if (startChar >= charLimit) return null;
            
            const visibleLength = Math.min(token.value.length, charLimit - startChar);
            const visibleText = token.value.slice(0, visibleLength);
            
            return (
              <span key={tokenIndex} className={tokenColors[token.type]}>
                {visibleText}
              </span>
            );
          })}
          {isCurrentLine && <span className="inline-block w-2 h-4 bg-accent/80 animate-pulse ml-0.5 align-middle" />}
        </span>
      </div>
    );
  };

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-blob animation-delay-3000"></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-1000 ease-out opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 70%)',
            left: `calc(${mousePosition.x}% - 250px)`,
            top: `calc(${mousePosition.y}% - 250px)`,
          }}
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div>
            <h2 className="text-accent font-medium mb-4 tracking-wider uppercase text-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Resume Portfolio</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {personal.name.split(' ')[0]} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {personal.name.split(' ')[1]}
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {personal.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-accent/30">
                <Mail className="w-4 h-4 text-accent" />
                {personal.email}
             </a>
             <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-accent/30">
                <Phone className="w-4 h-4 text-accent" />
                {personal.phone}
             </a>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Visit LinkedIn Profile"
              className="bg-primary hover:bg-primary/90 hover:scale-105 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Visit GitHub Profile"
              className="bg-slate-800 hover:bg-slate-700 hover:scale-105 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 border border-white/10"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href="/omar-masmoudi-cv.pdf"
              download="Omar-Masmoudi-CV.pdf"
              aria-label="Download Resume"
              className="bg-accent hover:bg-accent/90 hover:scale-105 text-slate-900 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Editor Title Bar */}
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"></div>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {activeTab === 'profile' ? 'omar-masmoudi.ts' : 'projects.ts'}
            </span>
            <div className="flex gap-2 text-slate-600">
              <div className="w-4 h-4 flex items-center justify-center hover:text-slate-400 cursor-pointer">
                <div className="w-2.5 h-0.5 bg-current"></div>
              </div>
              <div className="w-4 h-4 border border-current rounded-sm hover:text-slate-400 cursor-pointer"></div>
              <X className="w-4 h-4 hover:text-slate-400 cursor-pointer" />
            </div>
          </div>
          
          {/* Editor Tabs */}
          <div className="bg-slate-900/80 flex items-end border-b border-white/5">
            <button
              onClick={() => handleTabChange('profile')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-slate-950 border-t-2 border-t-accent text-slate-300'
                  : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900/50 border-t-2 border-t-transparent'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 transition-colors ${activeTab === 'profile' ? 'text-blue-400' : ''}`} />
              omar-masmoudi.ts
              {activeTab === 'profile' && (
                <X className="w-3 h-3 text-slate-600 hover:text-slate-400 ml-1" />
              )}
            </button>
            <button
              onClick={() => handleTabChange('projects')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all duration-200 ${
                activeTab === 'projects'
                  ? 'bg-slate-950 border-t-2 border-t-accent text-slate-300'
                  : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900/50 border-t-2 border-t-transparent'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 transition-colors ${activeTab === 'projects' ? 'text-yellow-400' : ''}`} />
              projects.ts
              {activeTab === 'projects' && (
                <X className="w-3 h-3 text-slate-600 hover:text-slate-400 ml-1" />
              )}
            </button>
          </div>
          
          {/* Code Content */}
          <div className="bg-slate-950 p-4 font-mono text-sm leading-relaxed overflow-hidden min-h-[380px] max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {codeLines.map((line, index) => {
              if (index > displayedLines) return null;
              if (index < displayedLines) {
                return renderLine(line, index, false, Infinity);
              }
              return renderLine(line, index, true, currentCharIndex);
            })}
            {isComplete && (
              <div className="flex mt-2">
                <span className="text-slate-600 select-none w-8 text-right pr-3 flex-shrink-0">
                  {codeLines.length + 1}
                </span>
                <span className="inline-block w-2 h-4 bg-accent/80 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* Editor Status Bar */}
          <div className="bg-slate-900/80 px-4 py-1.5 flex items-center justify-between text-xs text-slate-500 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span>TypeScript</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ln {codeLines.length}, Col 1</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Prettier
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;