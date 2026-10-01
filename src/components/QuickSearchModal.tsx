import React, { useState, useMemo } from 'react';
import { Search, X, User, HeartPulse, FileText, MapPin, ArrowRight } from 'lucide-react';
import { DOCTORS, SERVICES, BLOG_POSTS, LOCATIONS } from '../data/mockData';
import { Doctor, MedicalService, BlogPost } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectService: (service: MedicalService) => void;
  onSelectArticle: (post: BlogPost) => void;
  onNavigate: (path: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoctor,
  onSelectService,
  onSelectArticle,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return DOCTORS.filter(
      d => d.name.toLowerCase().includes(q) ||
           d.specialty.toLowerCase().includes(q) ||
           d.focusAreas.some(f => f.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [query]);

  const filteredServices = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SERVICES.filter(
      s => s.name.toLowerCase().includes(q) ||
           s.description.toLowerCase().includes(q) ||
           s.treatments.some(t => t.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [query]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return BLOG_POSTS.filter(
      b => b.title.toLowerCase().includes(q) ||
           b.summary.toLowerCase().includes(q)
    ).slice(0, 2);
  }, [query]);

  if (!isOpen) return null;

  const hasResults = filteredDoctors.length > 0 || filteredServices.length > 0 || filteredPosts.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E7E5DF] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Search input header */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-[#E7E5DF]">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 ml-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Dr. Tushar Bayaskar, clinical services, pathology tests, or guides..."
            className="w-full text-base sm:text-lg text-[#171717] placeholder-neutral-400 bg-transparent border-none outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Popular Quick Inquiries</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                {['Dr. Tushar Bayaskar', 'General Medicine', 'CBC & Widal', 'Pathology Lab', 'KFT & LFT', 'Critical Care', 'Ashirwad Nagar'].map((pill, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(pill)}
                    className="text-xs bg-[#F7F5EF] hover:bg-[#EBE8DF] text-neutral-700 px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No matching clinical results for "{query}". Try searching by Dr. Tushar Bayaskar, General Medicine, fever, diabetes, or pathology tests.
            </div>
          ) : (
            <>
              {/* Doctor Match */}
              {filteredDoctors.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Consulting Doctor ({filteredDoctors.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredDoctors.map(doctor => (
                      <div
                        key={doctor.id}
                        onClick={() => {
                          onSelectDoctor(doctor);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F7F5EF] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-[#171717]">{doctor.name}</div>
                            <div className="text-xs text-neutral-500">{doctor.specialty} · {doctor.hospital}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Match */}
              {filteredServices.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5" />
                    Medical Services ({filteredServices.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredServices.map(service => (
                      <div
                        key={service.id}
                        onClick={() => {
                          onSelectService(service);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F7F5EF] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#171717]">{service.name}</div>
                          <div className="text-xs text-neutral-500 line-clamp-1">{service.tagline}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Match */}
              {filteredPosts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Health Insights ({filteredPosts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredPosts.map(post => (
                      <div
                        key={post.id}
                        onClick={() => {
                          onSelectArticle(post);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F7F5EF] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#171717]">{post.title}</div>
                          <div className="text-xs text-neutral-500">{post.category} · {post.readTime}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FDFCF9] border-t border-[#E7E5DF] flex items-center justify-between text-xs text-neutral-500 px-6">
          <span>Search verified MEDTRUST clinical network</span>
          <button
            onClick={() => {
              onNavigate('/doctors');
              onClose();
            }}
            className="text-[#171717] font-semibold hover:underline"
          >
            Open Full Doctor Directory
          </button>
        </div>
      </div>
    </div>
  );
};
