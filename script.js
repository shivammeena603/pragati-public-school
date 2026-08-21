
async function updateSite() {
    try {
        // Humne '?t=' + Date.now() add kiya hai taaki browser hamesha fresh data mangwaye
        const response = await fetch('data.json?t=' + Date.now());
        if (!response.ok) throw new Error("Data load nahi ho paya");
        
        const data = await response.json();

        // 1. Update Notices
        const noticeList = document.getElementById('notice-list');
        if(noticeList && data.notices) {
            noticeList.innerHTML = data.notices.map(n => `
                <div class="notice-item">
                    <div class="notice-date"><strong>${n.date}</strong></div>
                    <div class="notice-content">
                        <h4>${n.text} ${n.isNew ? '<span class="badge-new">New</span>' : ''}</h4>
                    </div>
                </div>
            `).join('');
        }

        // 2. Update Toppers
        const topperGrid = document.getElementById('topper-grid');
        if(topperGrid && data.toppers) {
            topperGrid.innerHTML = data.toppers.map(t => `
                <div class="topper-card">
                    <img src="${t.img}" alt="${t.name}">
                    <h4>${t.name}</h4>
                    <p>${t.class} <br> <b>${t.score}</b></p>
                </div>
            `).join('');
        }

        // 3. Update Downloads
        const downloadList = document.getElementById('download-list');
        if(downloadList && data.downloads) {
            downloadList.innerHTML = data.downloads.map(d => `
                <a href="${d.link}" class="btn ghost">${d.title} ↓</a>
            `).join('');
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

// Mobile Menu Toggle
const menu = document.querySelector('.menu'), nav = document.querySelector('.nav nav');
menu?.addEventListener('click', () => nav.classList.toggle('open'));

// Intersection Observer (Reveal animations)
const io = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('show')
}), {threshold:.1});
document.querySelectorAll('.reveal').forEach(e => io.observe(e));

// Copyright Year
const yr = document.getElementById('year');
if(yr) yr.textContent = new Date().getFullYear();

updateSite();
