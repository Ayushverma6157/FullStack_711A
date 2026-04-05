import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import PostJobForm from './components/PostJobForm';
import JobCard from './components/JobCard';
import Toast from './components/Toast';

const INITIAL_JOBS = [
  { id: 1, title: 'Software Engineer',  company: 'Google',      location: 'Bangalore', type: 'Full Time', experience: 'Fresher',   description: 'Work on scalable systems and backend services.' },
  { id: 2, title: 'Frontend Developer', company: 'Startup Inc.', location: 'Remote',    type: 'Remote',    experience: 'Fresher',   description: 'Build clean UI using modern frontend tools.' },
  { id: 3, title: 'Data Analyst',       company: 'Amazon',       location: 'Hyderabad', type: 'Full Time', experience: '1-3 Years', description: 'Analyze business data and create insights.' },
];

export default function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [keyword, setKeyword]   = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters]   = useState({ jobTypes: [], experiences: [] });
  const [toast, setToast]       = useState({ msg: '', type: 'success', visible: false });
  const toastTimer = useRef(null);

  // ── Toast helper ──────────────────────────────────
  const showToast = useCallback((msg, type = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ msg, type, visible: false });
    // Let the DOM paint the off-state first, then animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setToast({ msg, type, visible: true });
      });
    });
    toastTimer.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 2800);
  }, []);

  // ── Filtered job list ─────────────────────────────
  const filteredJobs = jobs.filter(j => {
    const kw  = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const matchKw  = !kw  || [j.title, j.company, j.description].some(f => f.toLowerCase().includes(kw));
    const matchLoc = !loc || j.location.toLowerCase().includes(loc);
    const matchType = !filters.jobTypes.length   || filters.jobTypes.includes(j.type);
    const matchExp  = !filters.experiences.length || filters.experiences.includes(j.experience);
    return matchKw && matchLoc && matchType && matchExp;
  });

  // ── Handlers ──────────────────────────────────────
  const handleAdd = (job, errMsg) => {
    if (!job) { showToast(errMsg, 'error'); return; }
    setJobs(prev => [...prev, job]);
    showToast(`"${job.title}" posted successfully!`);
  };

  const handleDelete = id => {
    setJobs(prev => prev.filter(j => j.id !== id));
    showToast('Job listing removed.', 'info');
  };

  return (
    <>
      <Navbar />

      <Hero
        keyword={keyword}
        location={location}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onSearch={() => {}}   /* filtering is live — button is cosmetic */
      />

      <div className="container">
        <Filters filters={filters} onChange={setFilters} />

        <main className="jobs-section">
          <PostJobForm onAdd={handleAdd} />

          <h2 style={{ margin: '20px 0', color: 'var(--text)' }}>
            Latest Jobs{' '}
            <span className="job-count-badge">{filteredJobs.length}</span>
          </h2>

          <div className="jobs">
            {filteredJobs.length === 0 ? (
              <div className="no-jobs">No jobs found. Try a different search.</div>
            ) : (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} />
              ))
            )}
          </div>
        </main>
      </div>

      <footer>© 2026 Jobify. Built with React &amp; Vite.</footer>

      <Toast message={toast.msg} type={toast.type} visible={toast.visible} />
    </>
  );
}
