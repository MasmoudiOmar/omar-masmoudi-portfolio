import React, { useState } from 'react';
import { ChevronRight, Terminal } from 'lucide-react';
import { TraceStep } from '../types';

const formatArgs = (args: Record<string, unknown>) => {
  const entries = Object.entries(args).filter(([, value]) => value !== undefined && value !== '');
  if (entries.length === 0) return '()';
  return `({ ${entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')} })`;
};

/** Short, human summary of what a tool handed back. */
const summarise = (result: unknown): string => {
  if (result && typeof result === 'object') {
    const value = result as Record<string, unknown>;
    if (typeof value.matches === 'number') {
      return `${value.matches} role${value.matches === 1 ? '' : 's'}`;
    }
    for (const key of ['projects', 'achievements', 'categories', 'education']) {
      if (Array.isArray(value[key])) return `${(value[key] as unknown[]).length} ${key}`;
    }
    if (typeof value.error === 'string') return 'error';
    return `${Object.keys(value).length} fields`;
  }
  return 'ok';
};

const Step: React.FC<{ step: TraceStep; index: number }> = ({ step, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 text-left py-1 group/step"
      >
        <ChevronRight
          className={`w-3 h-3 text-white/35 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
        />
        <span className="text-white/35 tabular-nums">{index + 1}</span>
        <code className="text-accent/90">{step.tool}</code>
        <code className="text-white/40 truncate hidden sm:inline">{formatArgs(step.args)}</code>
        <span className="ml-auto flex items-center gap-2 flex-shrink-0 text-white/35">
          <span>{summarise(step.result)}</span>
          <span className="tabular-nums">{step.ms}ms</span>
        </span>
      </button>

      {open && (
        <pre className="mt-1 mb-2 ml-5 p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] leading-relaxed text-white/55 overflow-x-auto max-h-40">
          {JSON.stringify(step.result, null, 2)}
        </pre>
      )}
    </li>
  );
};

/**
 * Renders the agent's tool calls above its answer.
 *
 * This is the real trajectory returned by the server, not a decorative
 * animation — expanding a step shows exactly what that tool returned.
 */
const AgentTrace: React.FC<{ trace: TraceStep[] }> = ({ trace }) => {
  const [open, setOpen] = useState(false);
  if (trace.length === 0) return null;

  const total = trace.reduce((sum, step) => sum + step.ms, 0);

  return (
    <div className="mb-2 rounded-xl border border-white/10 bg-black/25 text-[11px] font-mono">
      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-3 py-2 text-white/50 hover:text-termfg transition-colors"
      >
        <Terminal className="w-3.5 h-3.5 text-accent" />
        <span>
          {trace.length} tool call{trace.length === 1 ? '' : 's'}
        </span>
        <span className="text-white/35">·</span>
        <span className="text-white/35 tabular-nums">{total}ms</span>
        <ChevronRight
          className={`w-3 h-3 ml-auto transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <ul className="px-3 pb-2 border-t border-white/5 pt-1">
          {trace.map((step, index) => (
            <Step key={`${step.tool}-${index}`} step={step} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentTrace;
