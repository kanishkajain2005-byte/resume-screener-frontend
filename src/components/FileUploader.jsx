import React, { useCallback } from 'react';

export default function FileUploader({ onFileSelect, selectedFile }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e) => {
    if (e.target.files?.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="group relative"
    >
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />
      <label 
        htmlFor="resume-upload" 
        className={`cursor-pointer flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed transition-all duration-300
          ${selectedFile 
            ? 'border-indigo-300 bg-indigo-50/50 scale-[0.98]' 
            : 'border-slate-200 bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-400'}`}
      >
        <div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 
          ${selectedFile ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-400 shadow-sm'}`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-base font-semibold text-slate-700 mb-1">
            <span className="text-indigo-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-slate-500">PDF, DOC, DOCX up to 10MB</p>
        </div>
      </label>
      
      {selectedFile && (
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col truncate pr-2">
              <span className="text-sm font-bold text-slate-800 truncate" title={selectedFile.name}>
                {selectedFile.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Ready to analyze</span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); onFileSelect(null); }}
            className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors shrink-0"
            title="Remove file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
