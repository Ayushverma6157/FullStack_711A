let jobs = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Bangalore", type: "Full Time", experience: "0-2 Years", description: "Work on scalable systems and backend services." },
    { id: 2, title: "Frontend Developer", company: "Startup Inc.", location: "Remote", type: "Remote", experience: "Fresher", description: "Build clean UI using modern frontend tools." },
    { id: 3, title: "Data Analyst", company: "Amazon", location: "Hyderabad", type: "Full Time", experience: "1-3 Years", description: "Analyze business data and create insights." }
];

const jobContainer = document.querySelector('.jobs');
const jobCountEl = document.getElementById('job-count');

const esc = str => str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function showToast(msg, type = 'success') {
    document.querySelector('.toast')?.remove();
    const t = Object.assign(document.createElement('div'), { className: `toast toast-${type}`, textContent: msg });
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('toast-visible'), 10);
    setTimeout(() => { t.classList.remove('toast-visible'); setTimeout(() => t.remove(), 400); }, 2800);
}

function renderJobs(list = jobs) {
    jobCountEl.textContent = list.length;
    if (!list.length) {
        jobContainer.innerHTML = `<div class="no-jobs">No jobs found. Try a different search.</div>`;
        return;
    }
    jobContainer.innerHTML = list.map(job => `
        <div class="job-card" data-id="${job.id}">
            <div class="job-header">
                <h3>${esc(job.title)}</h3>
                <span class="badge ${job.type.toLowerCase().replace(' ', '-')}">${esc(job.type)}</span>
            </div>
            <p class="company"><strong>${esc(job.company)}</strong> &bull; ${esc(job.location)}</p>
            <p class="desc">${esc(job.description)}</p>
            <div class="job-footer">
                <span class="badge">${esc(job.experience)}</span>
                <div class="actions">
                    <button class="apply-btn" onclick="applyJob(this)">Apply</button>
                    <button class="delete-btn" onclick="deleteJob(${job.id})">&#128465; Delete</button>
                </div>
            </div>
        </div>`).join('');
}

function filterJobs() {
    const kw = document.getElementById('search-keyword').value.trim().toLowerCase();
    const loc = document.getElementById('search-location').value.trim().toLowerCase();
    renderJobs(jobs.filter(j =>
        (!kw || [j.title, j.company, j.description].some(f => f.toLowerCase().includes(kw))) &&
        (!loc || j.location.toLowerCase().includes(loc))
    ));
}

function addJob(e) {
    e.preventDefault();
    const get = id => document.getElementById(id);
    const fields = [
        { el: get('job-title'), label: 'Job Title' },
        { el: get('company'), label: 'Company Name' },
        { el: get('location'), label: 'Location' },
        { el: get('description'), label: 'Description' }
    ];
    let valid = true;
    fields.forEach(({ el, label }) => {
        el.classList.remove('input-error');
        el.nextSibling?.classList?.contains('field-error') && el.nextSibling.remove();
        if (el.value.trim().length < 2) {
            const err = Object.assign(document.createElement('span'), { className: 'field-error', textContent: el.value.trim() ? `${label} must be at least 2 characters.` : `${label} is required.` });
            el.classList.add('input-error');
            el.after(err);
            valid = false;
        }
    });
    if (!valid) return showToast('Please fix the highlighted errors.', 'error');
    jobs.push({ id: Date.now(), title: get('job-title').value.trim(), company: get('company').value.trim(), location: get('location').value.trim(), type: get('job-type').value, experience: get('experience').value, description: get('description').value.trim() });
    filterJobs();
    e.target.reset();
    showToast(`"${jobs.at(-1).title}" posted successfully!`);
}

function applyJob(btn) {
    if (btn.disabled) return;
    Object.assign(btn, { textContent: '✓ Applied', disabled: true, title: 'You have already applied' });
    btn.classList.add('applied');
    showToast('Application submitted! Good luck 🎉');
}

function deleteJob(id) {
    const card = document.querySelector(`.job-card[data-id="${id}"]`);
    if (!card) return;
    card.classList.add('card-exit');
    setTimeout(() => { jobs = jobs.filter(j => j.id !== id); filterJobs(); showToast('Job listing removed.', 'info'); }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
    renderJobs();
    const form = document.getElementById('post-job-form');
    form.addEventListener('submit', addJob);
    form.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', () => {
        el.classList.remove('input-error');
        el.nextSibling?.classList?.contains('field-error') && el.nextSibling.remove();
    }));
    document.getElementById('search-btn').addEventListener('click', filterJobs);
    document.getElementById('search-keyword').addEventListener('input', filterJobs);
    document.getElementById('search-location').addEventListener('input', filterJobs);
});
