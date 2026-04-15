'use client';

import { useEffect, useState } from 'react';

interface TerminalHeroProps {
  lines: string[];
}

export default function TerminalHero({ lines }: TerminalHeroProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (currentChar < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((i) => i + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentChar, currentLineIndex, lines]);

  const currentPartial = currentLineIndex < lines.length
    ? lines[currentLineIndex].slice(0, currentChar)
    : '';

  const colorLine = (line: string) => {
    if (line.startsWith('$ ')) {
      return (
        <>
          <span className="text-tech-accent font-semibold">$</span>
          <span className="text-tech-text">{line.slice(1)}</span>
        </>
      );
    }
    if (line.startsWith('> ')) {
      return (
        <>
          <span className="text-tech-cyan">&gt;</span>
          <span className="text-tech-text-dim">{line.slice(1)}</span>
          {line.endsWith('OK') && (
            <span className="ml-1 text-tech-accent font-semibold">✓</span>
          )}
          {line.endsWith('LIVE') && (
            <span className="ml-1 text-tech-accent font-semibold">●</span>
          )}
        </>
      );
    }
    if (line.startsWith('success:')) {
      return <span className="text-tech-accent font-semibold">{line}</span>;
    }
    return <span className="text-tech-text-dim">{line}</span>;
  };

  return (
    <div className="terminal tech-border-gradient max-w-xl mx-auto lg:mx-0 shadow-tech-glow-sm">
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot bg-[#ff5f57]" />
          <div className="terminal-dot bg-[#febc2e]" />
          <div className="terminal-dot bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-xs text-tech-text-muted font-mono">
          gridjac — zsh
        </div>
      </div>
      <div className="terminal-body min-h-[180px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {colorLine(line)}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <div className="leading-relaxed">
            {colorLine(currentPartial)}
            <span className="inline-block w-2 h-4 bg-tech-accent ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
