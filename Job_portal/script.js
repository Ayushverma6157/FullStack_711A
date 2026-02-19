let jobs = [
    {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        location: "Bangalore",
        type: "Full Time",
        experience: "0-2 Years",
        description: "Work on scalable systems and backend services."
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Startup Inc.",
        location: "Remote",
        type: "Remote",
        experience: "Fresher",
        description: "Build clean UI using modern frontend tools."
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Amazon",
        location: "Hyderabad",
        type: "Full Time",
        experience: "1-3 Years",
        description: "Analyze business data and create insights."
    }
];

const jobContainer = document.querySelector('.jobs');
const jobCountEl = document.getElementById('job-count');

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-visible'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

function updateCount() {
    if (jobCountEl) jobCountEl.textContent = jobs.length;
}

function renderJobs() {
    jobContainer.innerHTML = '';
    updateCount();

    if (jobs.length === 0) {
        jobContainer.innerHTML = `<div class="no-jobs">No jobs posted yet. Be the first to post one!</div>`;
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.dataset.id = job.id;

        card.innerHTML = `
            <div class="job-header">
                <h3>${escapeHtml(job.title)}</h3>
                <span class="badge ${job.type.toLowerCase().replace(' ', '-')}">${escapeHtml(job.type)}</span>
            </div>
            <p class="company"><strong>${escapeHtml(job.company)}</strong> &bull; ${escapeHtml(job.location)}</p>
            <p class="desc">${escapeHtml(job.description)}</p>
            <div class="job-footer">
                <span class="badge">${escapeHtml(job.experience)}</span>
                <div class="actions">
                    <button class="apply-btn" onclick="applyJob(this)">Apply</button>
                    <button class="delete-btn" onclick="deleteJob(${job.id})">&#128465; Delete</button>
                </div>
            </div>
        `;

        jobContainer.appendChild(card);
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function setError(input, message) {
    clearError(input);
    const err = document.createElement('span');
    err.className = 'field-error';
    err.textContent = message;
    input.classList.add('input-error');
    input.parentNode.insertBefore(err, input.nextSibling);
}

function clearError(input) {
    input.classList.remove('input-error');
    const next = input.nextSibling;
    if (next && next.classList && next.classList.contains('field-error')) {
        next.remove();
    }
}

function validateForm(fields) {
    let valid = true;

    fields.forEach(({ el, label }) => {
        clearError(el);
        const val = el.value.trim();
        if (!val) {
            setError(el, `${label} is required.`);
            valid = false;
        } else if (val.length < 2) {
            setError(el, `${label} must be at least 2 characters.`);
            valid = false;
        }
    });

    return valid;
}

function addJob(event) {
    event.preventDefault();

    const titleInput = document.getElementById('job-title');
    const companyInput = document.getElementById('company');
    const locationInput = document.getElementById('location');
    const typeInput = document.getElementById('job-type');
    const expInput = document.getElementById('experience');
    const descInput = document.getElementById('description');

    const isValid = validateForm([
        { el: titleInput, label: 'Job Title' },
        { el: companyInput, label: 'Company Name' },
        { el: locationInput, label: 'Location' },
        { el: descInput, label: 'Description' }
    ]);

    if (!isValid) {
        showToast('Please fix the highlighted errors.', 'error');
        return;
    }

    const newJob = {
        id: Date.now(),
        title: titleInput.value.trim(),
        company: companyInput.value.trim(),
        location: locationInput.value.trim(),
        type: typeInput.value,
        experience: expInput.value,
        description: descInput.value.trim()
    };

    jobs.push(newJob);
    renderJobs();
    document.getElementById('post-job-form').reset();
    showToast(`"${newJob.title}" posted successfully!`);
}

function applyJob(button) {
    if (button.disabled) return;
    button.textContent = '✓ Applied';
    button.classList.add('applied');
    button.disabled = true;
    button.setAttribute('title', 'You have already applied');
    showToast('Application submitted! Good luck 🎉');
}

function deleteJob(id) {
    const card = document.querySelector(`.job-card[data-id="${id}"]`);
    if (!card) return;

    card.classList.add('card-exit');
    setTimeout(() => {
        jobs = jobs.filter(job => job.id !== id);
        renderJobs();
        showToast('Job listing removed.', 'info');
    }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
    renderJobs();

    const form = document.getElementById('post-job-form');
    if (form) form.addEventListener('submit', addJob);

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });
});
