const wall = document.getElementById('wall');
const grid = document.getElementById('notesGrid');

function toggleWall(e){
  e.stopPropagation();

  if (wall.classList.contains('expanded')) {
    // COLLAPSE: hide immediately
    grid.classList.remove('show', 'reveal');
    grid.classList.add('force-hide');
    wall.classList.remove('expanded');
  } else {
    // EXPAND
    wall.classList.add('expanded');
  }
}

wall.addEventListener('transitionend', (e) => {
  if (e.propertyName !== 'width') return;

  if (wall.classList.contains('expanded')) {
    // Reveal + restart animation every time
    grid.classList.remove('force-hide');

    // Force a reflow so animation restarts cleanly
    // (removing & re-adding the class in separate frames)
    grid.classList.remove('reveal', 'show');
    void grid.offsetWidth;           // reflow hack
    grid.classList.add('show', 'reveal');
  } else {
    // keep hidden after collapse
    grid.classList.remove('show', 'reveal');
    grid.classList.add('force-hide');
  }
});



(function(){
  const grid    = document.getElementById('notesGrid');
  const overlay = document.getElementById('wallOverlay');

  grid.addEventListener('click', (e) => {
    // If X button is clicked
    if (e.target.closest('.note-close')) {
      e.stopPropagation();
      closeZoom();
      return;
    }

    const note = e.target.closest('.note');
    if (!note) return;

    const open = grid.querySelector('.note.zoomed');

    // If another note is open, close it before opening new
    if (open) {
      open.classList.remove('zoomed');
    }

    // Open the clicked note
    note.classList.add('zoomed');
    overlay.classList.add('active');
    grid.classList.add('modal-open');
    e.stopPropagation();
  });

  // No overlay click listener here — prevents accidental closing
  // Only Esc key should also close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZoom();
  });

  function closeZoom(){
    const open = grid.querySelector('.note.zoomed');
    if (open) open.classList.remove('zoomed');
    overlay.classList.remove('active');
    grid.classList.remove('modal-open');
  }
})();





const now = new Date();
const dateString = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const timeString = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});


const message = `Welcome, Agent.
It is currently ${dateString} ${timeString}.
Case 019876 has been classified as HIGH PRIORITY.
The Victim has been identified as Kaleb Lee.
Click the wall to access the murder board...
`
const typewriter = document.getElementById("typewriter");

let index = 0;
const speed = 40;

function type(){
    if (index < message.length){
        typewriter.textContent += message.charAt(index);
        index++;
        setTimeout(type, speed);
    }
}

window.addEventListener("load", type);

