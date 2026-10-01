import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, Share2, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E7E5DF] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Close Article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image of article */}
        <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-neutral-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
              {post.category}
            </span>
            <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-bold font-editorial mt-1 leading-tight text-white">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Meta & Author bar */}
        <div className="p-6 sm:p-8 pb-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5DF] text-xs text-[#737373]">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover border border-neutral-200"
            />
            <div>
              <div className="font-semibold text-[#171717]">{post.author.name}</div>
              <div className="text-[11px] text-[#737373]">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <p className="text-base text-[#171717] font-medium leading-relaxed italic border-l-2 border-[#171717] pl-4">
            {post.summary}
          </p>

          <div className="space-y-4 text-sm text-[#555555] leading-relaxed pt-2">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E7E5DF] flex items-center justify-between text-xs text-[#737373]">
            <span>Published by MEDTRUST Clinical Editorial Board</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#171717] text-white hover:bg-neutral-800 font-semibold"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
