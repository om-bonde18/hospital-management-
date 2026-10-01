import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { ArrowUpRight, Calendar, Clock, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onSelectArticle: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'General Medicine & Infectious Care', 'Pathology & Preventive Diagnostics', 'Endocrinology & Chronic Care'];

  const filteredPosts = categoryFilter === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === categoryFilter);

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#737373] font-semibold">
          Clinical Guidance & Education
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight">
          Health insights & medical discoveries.
        </h1>
        <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
          Evidence-based articles written and guided by Dr. Tushar Bayaskar (MBBS, MD Medicine) and Dr. Bayaskar Pathology Lab, focusing on seasonal fever management, routine kidney/liver diagnostics, and metabolic wellness.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              categoryFilter === cat
                ? 'bg-[#171717] text-white'
                : 'bg-[#F7F5EF] text-[#555555] hover:text-[#171717] hover:bg-[#EBE8DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedArticle(post)}
            className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#171717] text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                  {post.category}
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3 text-xs text-[#737373] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#171717] group-hover:text-black leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-sm text-[#555555] line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-[#F0EFEA] mt-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-[#171717]">{post.author.name}</span>
              </div>
              <span className="text-xs font-semibold text-[#171717] group-hover:underline inline-flex items-center gap-1">
                Read <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};
