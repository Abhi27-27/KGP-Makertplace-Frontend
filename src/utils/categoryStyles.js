export const CATEGORY_STYLES = {
  Cycles: { gradient: 'from-emerald-500 to-teal-700', icon: '🚲', bg: 'bg-emerald-50 text-emerald-800' },
  Books: { gradient: 'from-amber-500 to-orange-600', icon: '📚', bg: 'bg-amber-50 text-amber-800' },
  Electronics: { gradient: 'from-violet-500 to-purple-700', icon: '💻', bg: 'bg-violet-50 text-violet-800' },
  Academics: { gradient: 'from-blue-500 to-indigo-700', icon: '🎓', bg: 'bg-blue-50 text-blue-800' },
};

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || {
    gradient: 'from-slate-500 to-slate-700',
    icon: '📦',
    bg: 'bg-slate-50 text-slate-800',
  };
}
