'use client';

import { useState } from 'react';
import { DIFF_FILES, type DiffFile, type DiffLine } from '../data/diff-content';
import { highlight } from '../lib/highlight';
import { FileCode2, Plus, Minus } from 'lucide-react';

function DiffLineRow({
  line,
  isHovered,
  onHover,
  isAnchor,
}: {
  line: DiffLine;
  isHovered: boolean;
  onHover: () => void;
  isAnchor: boolean;
  fileLang: 'typescript' | 'prisma' | 'sql';
}) {
  const bg =
    line.type === 'add'
      ? 'bg-emerald-500/10 border-l-2 border-emerald-400/60'
      : line.type === 'remove'
        ? 'bg-rose-500/10 border-l-2 border-rose-400/60'
        : line.type === 'meta'
          ? 'bg-slate-800/40 text-slate-500'
          : 'border-l-2 border-transparent';

  const marker =
    line.type === 'add' ? '+' : line.type === 'remove' ? '-' : line.type === 'meta' ? '' : ' ';

  const markerColor =
    line.type === 'add'
      ? 'text-emerald-400'
      : line.type === 'remove'
        ? 'text-rose-400'
        : 'text-slate-600';

  return (
    <div
      onMouseEnter={onHover}
      className={`group grid grid-cols-[3rem_3rem_1.5rem_1fr] items-start font-mono text-[12px] sm:text-[13px] leading-5 ${bg} ${
        isAnchor ? 'ring-1 ring-cyan-400/40' : ''
      } ${isHovered ? 'bg-slate-800/60' : ''} transition-colors`}
    >
      <span className="text-right pr-2 text-slate-600 select-none">
        {line.oldLine ?? ''}
      </span>
      <span className="text-right pr-2 text-slate-600 select-none">
        {line.newLine ?? ''}
      </span>
      <span className={`text-center select-none ${markerColor}`}>{marker}</span>
      <span
        className="pr-4 whitespace-pre overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: line.content ? highlight(line.content) : '&nbsp;' }}
      />
    </div>
  );
}

export default function CodeDiff() {
  const [activeFileId, setActiveFileId] = useState<string>(DIFF_FILES[0].id);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<number | null>(null);

  const activeFile: DiffFile = DIFF_FILES.find((f) => f.id === activeFileId) ?? DIFF_FILES[0];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm shadow-2xl overflow-hidden">
      {/* File tabs */}
      <div
        role="tablist"
        aria-label="Modified files"
        className="flex overflow-x-auto border-b border-slate-800 bg-slate-900/60"
      >
        {DIFF_FILES.map((file) => {
          const isActive = file.id === activeFileId;
          return (
            <button
              key={file.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${file.id}`}
              id={`tab-${file.id}`}
              onClick={() => {
                setActiveFileId(file.id);
                setHoveredAnnotation(null);
              }}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono whitespace-nowrap border-r border-slate-800 transition-colors ${
                isActive
                  ? 'bg-slate-950 text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[14rem] sm:max-w-none">{file.filename}</span>
              <span className="flex items-center gap-1 text-[10px] ml-1">
                <span className="text-emerald-400 inline-flex items-center">
                  <Plus className="w-2.5 h-2.5" aria-hidden="true" />
                  {file.additions}
                </span>
                {file.deletions > 0 && (
                  <span className="text-rose-400 inline-flex items-center">
                    <Minus className="w-2.5 h-2.5" aria-hidden="true" />
                    {file.deletions}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active file panel */}
      <div
        id={`panel-${activeFile.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeFile.id}`}
        className="grid lg:grid-cols-[1fr_22rem]"
      >
        {/* Diff body */}
        <div className="border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/40">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeFile.summary}
            </p>
          </div>
          <div className="py-2 overflow-x-auto">
            {activeFile.lines.map((line, idx) => {
              const anchorMatch = activeFile.annotations.find(
                (a) => a.anchorLine === (line.newLine ?? line.oldLine ?? -1)
              );
              const annotationIdx = anchorMatch
                ? activeFile.annotations.indexOf(anchorMatch)
                : -1;
              const isAnchor = annotationIdx !== -1;
              const isHovered = isAnchor && hoveredAnnotation === annotationIdx;

              return (
                <DiffLineRow
                  key={idx}
                  line={line}
                  isAnchor={isAnchor}
                  isHovered={isHovered}
                  onHover={() => setHoveredAnnotation(isAnchor ? annotationIdx : null)}
                  fileLang={activeFile.language}
                />
              );
            })}
          </div>
        </div>

        {/* Annotations sidebar */}
        <aside className="bg-slate-900/30" aria-label="Engineering notes">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/40">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 font-mono">
              {'// '}engineering notes
            </p>
          </div>
          <div className="p-4 space-y-4">
            {activeFile.annotations.map((note, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setHoveredAnnotation(idx)}
                onMouseLeave={() => setHoveredAnnotation(null)}
                onFocus={() => setHoveredAnnotation(idx)}
                onBlur={() => setHoveredAnnotation(null)}
                className={`w-full text-left rounded-lg border p-3 transition-all ${
                  hoveredAnnotation === idx
                    ? 'border-cyan-400/60 bg-cyan-500/5'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-cyan-400">
                    L{note.anchorLine}
                  </span>
                  <h4 className="font-semibold text-sm text-slate-100">{note.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{note.body}</p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
