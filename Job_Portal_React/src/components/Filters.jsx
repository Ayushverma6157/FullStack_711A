export default function Filters({ filters, onChange }) {
  const jobTypes = ['Full Time', 'Internship', 'Remote'];
  const experiences = ['Fresher', '1-3 Years', '3+ Years'];

  const toggle = (group, value) => {
    const current = filters[group];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [group]: next });
  };

  return (
    <aside className="filters">
      <h2>Filters</h2>

      <h3>Job Type</h3>
      {jobTypes.map(type => (
        <label key={type}>
          <input
            type="checkbox"
            checked={filters.jobTypes.includes(type)}
            onChange={() => toggle('jobTypes', type)}
          />{' '}
          {type}
        </label>
      ))}

      <h3>Experience</h3>
      {experiences.map(exp => (
        <label key={exp}>
          <input
            type="checkbox"
            checked={filters.experiences.includes(exp)}
            onChange={() => toggle('experiences', exp)}
          />{' '}
          {exp}
        </label>
      ))}
    </aside>
  );
}
