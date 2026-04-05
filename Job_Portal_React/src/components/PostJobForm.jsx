import { useState, useRef, useEffect } from 'react';

function FieldError({ msg }) {
  return msg ? <span className="field-error">{msg}</span> : null;
}

export default function PostJobForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '', company: '', location: '',
    jobType: 'Full Time', experience: 'Fresher', description: ''
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const required = [
      { key: 'title',       label: 'Job Title' },
      { key: 'company',     label: 'Company Name' },
      { key: 'location',    label: 'Location' },
      { key: 'description', label: 'Description' },
    ];
    const errs = {};
    required.forEach(({ key, label }) => {
      const val = form[key].trim();
      if (!val)           errs[key] = `${label} is required.`;
      else if (val.length < 2) errs[key] = `${label} must be at least 2 characters.`;
    });
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      onAdd(null, 'Please fix the highlighted errors.');
      return;
    }
    onAdd({
      id: Date.now(),
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      type: form.jobType,
      experience: form.experience,
      description: form.description.trim(),
    });
    setForm({ title: '', company: '', location: '', jobType: 'Full Time', experience: 'Fresher', description: '' });
    setErrors({});
  };

  return (
    <section className="post-job">
      <h2>Post a New Job</h2>
      <form id="post-job-form" className="post-job-form" onSubmit={handleSubmit} noValidate>

        <div>
          <input
            type="text"
            id="job-title"
            placeholder="Job Title"
            value={form.title}
            className={errors.title ? 'input-error' : ''}
            onChange={e => update('title', e.target.value)}
          />
          <FieldError msg={errors.title} />
        </div>

        <div>
          <input
            type="text"
            id="company"
            placeholder="Company Name"
            value={form.company}
            className={errors.company ? 'input-error' : ''}
            onChange={e => update('company', e.target.value)}
          />
          <FieldError msg={errors.company} />
        </div>

        <div>
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={form.location}
            className={errors.location ? 'input-error' : ''}
            onChange={e => update('location', e.target.value)}
          />
          <FieldError msg={errors.location} />
        </div>

        <div>
          <select id="job-type" value={form.jobType} onChange={e => update('jobType', e.target.value)}>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <select id="experience" value={form.experience} onChange={e => update('experience', e.target.value)}>
            <option value="Fresher">Fresher</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="3+ Years">3+ Years</option>
          </select>
        </div>

        <div className="full-width">
          <textarea
            id="description"
            placeholder="Job Description"
            rows="3"
            value={form.description}
            className={errors.description ? 'input-error' : ''}
            onChange={e => update('description', e.target.value)}
          />
          <FieldError msg={errors.description} />
        </div>

        <button type="submit" className="full-width">Post Job</button>
      </form>
    </section>
  );
}
