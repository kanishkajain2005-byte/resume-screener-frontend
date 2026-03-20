import React from 'react';

export default function JobDescription({ value, onChange }) {
  return (
    <div className="flex flex-col h-full relative group">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the target job description here. Include key responsibilities, required skills, and experience..."
        className="w-full h-56 p-5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white resize-none text-slate-700 text-base transition-all duration-300 placeholder:text-slate-400 outline-none shadow-inner"
      />
      <div className="absolute bottom-4 right-4 flex justify-end items-center pointer-events-none">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${value.length > 50 ? 'bg-indigo-100/90 text-indigo-700 shadow-sm' : 'bg-slate-200/80 text-slate-600'}`}>
          {value.length} chars
        </span>
      </div>
    </div>
  );
}
