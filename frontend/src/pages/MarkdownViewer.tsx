import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Copy, Check } from 'lucide-react';

const parseMarkdown = (markdown: string) => {
  let html = markdown;

  // Escape HTML characters to prevent XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Remove YAML Frontmatter
  html = html.replace(/^---[\s\S]*?---/, '');

  // Headers
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-white mt-6 mb-4 border-b border-white/10 pb-2 italic">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-5 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-[var(--accent-primary)] mt-4 mb-2">$1</h3>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-white/70 mb-1">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-white/70 mb-1">$1</li>');

  // Links (Convert local file:/// paths to viewer HTTP paths dynamically)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
    let finalUrl = url;
    if (url.startsWith('file:///root/.gemini/antigravity-cli/brain/')) {
      finalUrl = url.replace('file:///root/.gemini/antigravity-cli/brain/', '/viewer?file=brain/');
    } else if (url.startsWith('file:///root/.gemini/GEMINI.md')) {
      finalUrl = '/viewer?file=GEMINI.md';
    }
    return `<a href="${finalUrl}" class="text-[var(--accent-primary)] hover:underline font-bold">${text}</a>`;
  });

  // Code blocks
  html = html.replace(/`([^`]+)`/g, '<code class="bg-white/5 border border-white/5 rounded px-1.5 py-0.5 text-xs text-pink-400 font-mono">$1</code>');

  // Paragraphs
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed === '') return '<br />';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<div')) {
      return line;
    }
    return `<p class="text-sm text-white/70 leading-relaxed mb-3">${line}</p>`;
  });

  return processedLines.join('\n');
};

export default function MarkdownViewer() {
  const [searchParams] = useSearchParams();
  const file = searchParams.get('file') || 'GEMINI.md';
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/${file}`)
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải tệp tin');
        return res.text();
      })
      .then(text => {
        setContent(text);
      })
      .catch(err => {
        setError(err.message || 'Lỗi tải tệp');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [file]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileName = () => {
    return file.split('/').pop() || 'Tài liệu';
  };

  return (
    <div className="min-h-screen bg-[#0f0b17] text-white p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header bar */}
        <div className="flex items-center justify-between glass-card p-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 bg-white/5 border border-white/5 rounded-xl text-white/60 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft size={16} /> Trang chủ
          </button>
          
          <div className="flex items-center gap-2">
            <FileText className="text-[var(--accent-primary)]" size={18} />
            <span className="text-xs font-bold font-mono tracking-tight max-w-[150px] truncate">{getFileName()}</span>
          </div>

          <button 
            onClick={handleCopy}
            className="p-2 bg-white/5 border border-white/5 rounded-xl text-white/60 hover:text-white transition-all"
            title="Sao chép nội dung gốc"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Content Panel */}
        <div className="glass-card p-6 md:p-8 min-h-[50vh] border border-white/10 shadow-[0_10px_50px_rgba(244,114,182,0.1)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] space-y-4">
              <div className="w-8 h-8 border-4 border-[var(--accent-primary)]/20 border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
              <div className="text-sm text-white/40">Đang tải tài liệu...</div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">
              <p className="font-bold">Lỗi: {error}</p>
              <p className="text-xs text-white/40 mt-2">Vui lòng kiểm tra lại đường dẫn tệp tin</p>
            </div>
          ) : (
            <div 
              className="prose prose-invert max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
