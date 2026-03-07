import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function highlightPython(line) {
  const keywords = ['class', 'def', 'return', 'import', 'from', 'while', 'if', 'else', 'for', 'in', 'not', 'and', 'or', 'True', 'False', 'None'];
  let result = line;

  // Comments
  const commentIdx = result.indexOf('#');
  let comment = '';
  if (commentIdx !== -1) {
    comment = result.substring(commentIdx);
    result = result.substring(0, commentIdx);
  }

  // Strings
  result = result.replace(/(""".*?"""|'''.*?'''|".*?"|'.*?')/g, '<span class="syntax-string">$1</span>');

  // Decorators
  result = result.replace(/(@\w+)/g, '<span class="syntax-decorator">$1</span>');

  // Keywords
  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    result = result.replace(regex, '<span class="syntax-keyword">$1</span>');
  });

  // self
  result = result.replace(/\b(self)\b/g, '<span class="syntax-self">$1</span>');

  // Function/class names after def/class
  result = result.replace(/(def\s+)(<span[^>]*>def<\/span>\s+)?(\w+)/g, (m, p1, p2, name) => {
    return `${p1}${p2 || ''}<span class="syntax-function">${name}</span>`;
  });

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>');

  if (comment) {
    result += `<span class="syntax-comment">${comment}</span>`;
  }

  return result;
}

export default function CodeBlock({ code, filename = 'vivek.py', typewriter = true, className = '' }) {
  const lines = code.split('\n');
  const [visibleLines, setVisibleLines] = useState(typewriter ? 0 : lines.length);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!typewriter || !inView) return;
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 60);
    return () => clearTimeout(timer);
  }, [visibleLines, lines.length, typewriter, inView]);

  return (
    <motion.div
      className={`rounded-xl overflow-hidden bg-[#0F172A] shadow-xl ${className}`}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-[#334155]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
          <div className="w-3 h-3 rounded-full bg-[#FBBC05]" />
          <div className="w-3 h-3 rounded-full bg-[#34A853]" />
        </div>
        <span className="text-xs text-gray-400 font-mono ml-2">{filename}</span>
      </div>
      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-gray-600 w-8 text-right mr-4 flex-shrink-0">{i + 1}</span>
              <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: highlightPython(line) || '&nbsp;' }} />
            </div>
          ))}
          {typewriter && visibleLines < lines.length && (
            <div className="flex">
              <span className="select-none text-gray-600 w-8 text-right mr-4">{visibleLines + 1}</span>
              <span className="animate-blink-cursor text-accent-blue">|</span>
            </div>
          )}
        </pre>
      </div>
    </motion.div>
  );
}
