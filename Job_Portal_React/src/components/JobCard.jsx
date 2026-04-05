import { useState } from 'react';

function badgeClass(type) {
  return `badge ${type.toLowerCase().replace(' ', '-')}`;
}

export default function JobCard({ job, onDelete }) {
  const [applied, setApplied] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleApply = () => {
    if (applied) return;
    setApplied(true);
  };

  const handleDelete = () => {
    setExiting(true);
    setTimeout(() => onDelete(job.id), 350);
  };

  return (
    <div className={`job-card${exiting ? ' card-exit' : ''}`} data-id={job.id}>
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={badgeClass(job.type)}>{job.type}</span>
      </div>
      <p className="company">
        <strong>{job.company}</strong> &bull; {job.location}
      </p>
      <p className="desc">{job.description}</p>
      <div className="job-footer">
        <span className="badge">{job.experience}</span>
        <div className="actions">
          <button
            className={`apply-btn${applied ? ' applied' : ''}`}
            disabled={applied}
            onClick={handleApply}
            title={applied ? 'You have already applied' : ''}
          >
            {applied ? '✓ Applied' : 'Apply'}
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
