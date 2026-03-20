import React from 'react';

export default function ResultDashboard({ result }) {
  const { score, feedback, keywordsMatched = [], keywordsMissing = [] } = result;
  
  const getScoreInfo = (score) => {
    if (score >= 80) return {
      color: 'text-emerald-500',
      bg: 'bg-emerald-500',
      ring: 'ring-emerald-100',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      label: 'Excellent Match'
    };
    if (score >= 60) return {
      color: 'text-amber-500',
      bg: 'bg-amber-500',
      ring: 'ring-amber-100',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      label: 'Potential Fit'
    };
    return {
      color: 'text-rose-500',
      bg: 'bg-rose-500',
      ring: 'ring-rose-100',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      label: 'Poor Match'
    };
  };
  
  const theme = getScoreInfo(score);

  return (
    <div className="space-y-8 animate-slide-up w-full">
      {/* Score Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/40 border border-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 transform -rotate-90 filter drop-shadow-sm">
            <circle cx="64" cy="64" r="56" className="text-slate-200/50" strokeWidth="12" fill="none" stroke="currentColor"/>
            <circle cx="64" cy="64" r="56" className={`${theme.color} transition-all duration-1000 ease-out`} strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * score) / 100} strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${theme.color} drop-shadow-sm`}>{score}%</span>
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border mb-3 shadow-sm ${theme.badge}`}>
            {theme.label}
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Overall Alignment</h3>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm">
            This score reflects the semantic match between the candidate's core experience and your specified job requirements.
          </p>
        </div>
      </div>

      {/* AI Feedback */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI Insights & Feedback
        </h3>
        <div className="relative bg-gradient-to-br from-indigo-50/70 to-purple-50/70 p-7 rounded-3xl border border-indigo-100/50 shadow-sm overflow-hidden">
          <svg className="absolute top-4 left-4 w-10 h-10 text-indigo-300 opacity-20 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p className="relative z-10 text-slate-700 text-[15px] leading-relaxed pl-8 font-medium">
            {feedback}
          </p>
        </div>
      </div>

      {/* Keywords Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white/40 p-6 rounded-3xl border border-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-[15px] font-black tracking-tight text-slate-800">Strengths & Matches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordsMatched.map((k, i) => (
              <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100/50 shadow-sm transition-transform hover:scale-105">
                {k}
              </span>
            ))}
            {keywordsMatched.length === 0 && <span className="text-sm text-slate-400 italic">No exact skill matches extracted.</span>}
          </div>
        </div>

        <div className="bg-white/40 p-6 rounded-3xl border border-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h3 className="text-[15px] font-black tracking-tight text-slate-800">Missing Core Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordsMissing.map((k, i) => (
              <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-100/50 shadow-sm transition-transform hover:scale-105">
                {k}
              </span>
            ))}
            {keywordsMissing.length === 0 && <span className="text-sm text-slate-400 italic">No significant missing skills detected.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
