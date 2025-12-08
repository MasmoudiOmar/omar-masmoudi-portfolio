import React, { useState, useEffect } from 'react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<{ text: string; type: 'command' | 'output' | 'success' | 'info' }[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'executing' | 'complete'>('typing');
  const [showCursor, setShowCursor] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const command = 'bun run start';
  
  const outputLines = [
    { text: '$ bun run start', type: 'command' as const, delay: 0 },
    { text: '', type: 'output' as const, delay: 100 },
    { text: '➜  Resolving dependencies...', type: 'info' as const, delay: 300 },
    { text: '➜  Loading modules...', type: 'info' as const, delay: 600 },
    { text: '➜  Compiling TypeScript...', type: 'info' as const, delay: 900 },
    { text: '➜  Building styles...', type: 'info' as const, delay: 1200 },
    { text: '', type: 'output' as const, delay: 1400 },
    { text: '✓ Ready in 847ms', type: 'success' as const, delay: 1600 },
    { text: '', type: 'output' as const, delay: 1700 },
    { text: '➜  Local:   http://localhost:3000', type: 'output' as const, delay: 1900 },
    { text: '➜  Network: http://192.168.1.42:3000', type: 'output' as const, delay: 2000 },
    { text: '', type: 'output' as const, delay: 2100 },
    { text: '➜  Launching portfolio...', type: 'success' as const, delay: 2300 },
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation for command
  useEffect(() => {
    if (phase === 'typing' && currentChar < command.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 80 + Math.random() * 40); // Randomize typing speed for realism
      return () => clearTimeout(timeout);
    } else if (phase === 'typing' && currentChar >= command.length) {
      // Command fully typed, wait a beat then execute
      const timeout = setTimeout(() => {
        setPhase('executing');
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentChar, command.length]);

  // Execute output lines
  useEffect(() => {
    if (phase === 'executing') {
      outputLines.forEach((line, index) => {
        setTimeout(() => {
          setLines(prev => [...prev, { text: line.text, type: line.type }]);
          
          // After last line, trigger completion
          if (index === outputLines.length - 1) {
            setTimeout(() => {
              setPhase('complete');
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }, 600);
          }
        }, line.delay);
      });
    }
  }, [phase]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-cyan-400';
      case 'success': return 'text-emerald-400';
      case 'info': return 'text-slate-400';
      default: return 'text-slate-300';
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a] transition-all duration-700 overflow-hidden ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Terminal window */}
      <div 
        className={`relative w-full max-w-2xl mx-4 transform transition-all duration-500 ${
          isExiting ? 'translate-y-8' : 'translate-y-0'
        }`}
      >
        {/* Terminal chrome */}
        <div className="bg-[#1a1f2e] rounded-t-xl border border-white/10 border-b-0">
          <div className="flex items-center gap-2 px-4 py-3">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
            </div>
            {/* Title bar */}
            <div className="flex-1 text-center">
              <span className="text-xs text-slate-500 font-mono">omar@portfolio ~ </span>
            </div>
            <div className="w-14" /> {/* Spacer for symmetry */}
          </div>
        </div>

        {/* Terminal body */}
        <div className="bg-[#0d1117] rounded-b-xl border border-white/10 border-t-0 p-6 font-mono text-sm min-h-[320px] shadow-2xl shadow-black/50">
          {/* Typing phase */}
          {phase === 'typing' && (
            <div className="flex items-center">
              <span className="text-emerald-400 mr-2">❯</span>
              <span className="text-cyan-400">{command.slice(0, currentChar)}</span>
              <span 
                className={`inline-block w-2.5 h-5 ml-0.5 bg-cyan-400 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-100`}
              />
            </div>
          )}

          {/* Executing phase */}
          {phase !== 'typing' && (
            <div className="space-y-1">
              {lines.map((line, index) => (
                <div 
                  key={index} 
                  className={`${getLineColor(line.type)} terminal-line`}
                  style={{ 
                    animation: 'terminalFadeIn 0.15s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {line.type === 'command' && <span className="text-emerald-400 mr-2">❯</span>}
                  {line.text}
                </div>
              ))}
            </div>
          )}

          {/* Loading spinner */}
          {phase === 'executing' && lines.length < outputLines.length && (
            <div className="absolute bottom-6 right-6">
              <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Reflection effect */}
        <div 
          className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-b-xl blur-sm"
        />
      </div>

      {/* Scanline effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }}
      />
    </div>
  );
};

export default TerminalLoader;

