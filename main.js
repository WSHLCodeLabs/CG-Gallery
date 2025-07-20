// Sample gallery data (replace with your real files)
const GALLERY = [
  {
    title: "GPU Transformation",
    filename: "gpuTransformation.html",
    preview: "previews/1.png"
  },
  {
    title: "GPU",
    filename: "gpu.html",
    preview: "previews/3.png"
  },
  {
    title: "CPU",
    filename: "cpu.html",
    preview: "previews/2.png"
  }
];

function renderGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.className = 'galleryGrid';
  gallery.innerHTML = GALLERY.map(item => `
    <a href="gallery.html?file=${encodeURIComponent(item.filename)}" class="card">
      <div class="previewWrapper">
        <img src="${item.preview}" alt="${item.title}" class="previewImg">
      </div>
      <div class="cardContent">
        <div class="title">${item.title}</div>
        <div class="filename">${item.filename}</div>
      </div>
    </a>
  `).join('');
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function renderViewer() {
  const viewer = document.getElementById('viewer');
  if (!viewer) return;
  const file = getQueryParam('file');
  if (!file) {
    viewer.innerHTML = '<div class="flex items-center justify-center h-full text-xl">No file specified.</div>';
    return;
  }
  viewer.innerHTML = `
    <iframe src="html/${encodeURIComponent(file)}" class="cg-iframe" allowfullscreen></iframe>
    <div id="floatMenu" class="cg-float-menu">
      <button id="menuBtn" class="cg-float-btn">
        <svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M7 10h6M10 7v6"/></svg>
      </button>
      <div id="popupMenu" class="cg-popup-menu" style="display:none;">
        <button id="backBtn" class="cg-popup-menu-btn">
          <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 20 20"><path d="M7.5 10L12.5 5M7.5 10L12.5 15M7.5 10H18"/></svg>
          Return to Gallery
        </button>
      </div>
    </div>
  `;

  // Floating menu logic
  const menuBtn = document.getElementById('menuBtn');
  const popupMenu = document.getElementById('popupMenu');
  menuBtn.onclick = () => {
    if (popupMenu.style.display === 'none') {
      popupMenu.style.display = 'flex';
      popupMenu.classList.remove('fadeOutMenu');
      popupMenu.classList.add('fadeInMenu');
    } else {
      popupMenu.classList.remove('fadeInMenu');
      popupMenu.classList.add('fadeOutMenu');
      setTimeout(() => { popupMenu.style.display = 'none'; }, 200);
    }
  };
  document.getElementById('backBtn').onclick = () => {
    window.location.href = 'index.html';
  };
  // Close modal on outside click or Escape
  document.addEventListener('mousedown', (e) => {
    const modal = document.getElementById('htmlModal');
    if (modal.style.display !== 'none' && !modal.contains(e.target)) {
      modal.style.display = 'none';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('htmlModal').style.display = 'none';
      popupMenu.style.display = 'none';
    }
  });
}

if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/@Staticver/') || window.location.pathname.endsWith('/@Staticver')) {
  renderGallery();
} else if (window.location.pathname.endsWith('gallery.html')) {
  renderViewer();
} 