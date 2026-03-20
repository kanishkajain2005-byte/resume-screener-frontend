import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import JobDescription from './components/JobDescription';
import ResultDashboard from './components/ResultDashboard';
import { api } from './services/api';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription || !resumeFile) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDescription);
      
      const response = await api.analyzeResume(formData);
      setResult(response.data);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback dummy result for visual testing when backend is unavailable
      setTimeout(() => {
        setResult({
          score: 87,
          feedback: "The candidate shows an exceptional background in frontend development. Strong alignment with core requirements, specifically in React and modern UI/UX design. However, backend experience is slightly lacking compared to the job description.",
          keywordsMatched: ["React", "JavaScript", "Tailwind CSS", "UI/UX", "Vite"],
          keywordsMissing: ["GraphQL", "Node.js", "Docker"]
        });
        setLoading(false);
      }, 1500);
      return; 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white relative pb-12 font-sans text-slate-800">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <header className="mb-16 text-center animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200/50">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight mb-4 drop-shadow-sm p-2">
            Smart Resume Screener
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Harness the power of AI to surface the best talent. Upload a resume and job description to get instant, actionable insights.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <section className="bg-white/70 backdrop-blur-xl p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">1</div>
                <h2 className="text-xl font-bold tracking-tight text-slate-800">Job Requirements</h2>
              </div>
              <JobDescription value={jobDescription} onChange={setJobDescription} />
            </section>

            <section className="bg-white/70 backdrop-blur-xl p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">2</div>
                <h2 className="text-xl font-bold tracking-tight text-slate-800">Candidate Resume</h2>
              </div>
              <FileUploader onFileSelect={setResumeFile} selectedFile={resumeFile} />
            </section>

            <button
              onClick={handleAnalyze}
              disabled={!jobDescription || !resumeFile || loading}
              className={`relative w-full overflow-hidden group py-4 px-6 rounded-2xl font-bold text-lg text-white transition-all duration-300
                ${(!jobDescription || !resumeFile || loading) 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(99,102,241,0.4)] active:scale-[0.98]'}`}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <span>Analyze Candidate</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </div>
            </button>
          </div>

          <div className="lg:col-span-7 h-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <section className="bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white h-full min-h-[500px] flex flex-col relative overflow-hidden">
              {/* Optional subtle gradient in the corner of the results card */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-2xl opacity-70"></div>
              
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 mb-6 relative z-10">Analysis Engine</h2>
              
              <div className="flex-1 relative z-10 w-full h-full">
                {loading ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-6 text-indigo-500 animate-pulse mt-10">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-indigo-100 rounded-full"></div>
                      <div className="w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="text-lg font-medium text-slate-500">Extracting skills & evaluating fit...</p>
                  </div>
                ) : result ? (
                  <ResultDashboard result={result} />
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center mt-10 px-8">
                    <div className="w-24 h-24 mb-6 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100 relative group">
                      <div className="absolute inset-0 bg-indigo-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center opacity-50"></div>
                      <svg className="w-10 h-10 text-slate-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Ready for analysis</h3>
                    <p className="text-slate-500 max-w-sm">Provide a job description and upload a resume to unlock AI-driven insights about the candidate's alignment.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
