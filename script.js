// Draggable divider between the two homepage panels (Präzision / Ritual).
// Purely an interaction that embodies the site's real idea: you decide the balance.
(function () {
  const split = document.querySelector('.split');
  if (!split) return;
  const pz = split.querySelector('.split-pz');
  const rt = split.querySelector('.split-rt');
  const handle = split.querySelector('.split-divider');
  let dragging = false;

  function setRatio(pct) {
    const clamped = Math.max(22, Math.min(78, pct));
    split.style.gridTemplateColumns = clamped + '% ' + (100 - clamped) + '%';
    if (handle) handle.style.left = clamped + '%';
  }

  function ratioFromEvent(e) {
    const rect = split.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    return (x / rect.width) * 100;
  }

  function start(e) {
    dragging = true;
    split.style.transition = 'none';
    move(e);
  }
  function move(e) {
    if (!dragging) return;
    setRatio(ratioFromEvent(e));
    e.preventDefault();
  }
  function end() {
    dragging = false;
  }

  if (handle) {
    handle.style.pointerEvents = 'auto';
    handle.style.cursor = 'ew-resize';
    handle.addEventListener('mousedown', start);
    handle.addEventListener('touchstart', start, { passive: true });
  }
  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', end);
  window.addEventListener('touchend', end);
})();
