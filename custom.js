// Square corners are handled in custom.css (.card { border-radius: 0 }).
// This only equalizes card heights within each CardGroup, which CSS can't do
// across grid rows without a fixed container height.
function equalizeCardHeights() {
  document.querySelectorAll(".card").forEach(c => c.style.removeProperty("height"));
  document.querySelectorAll(".card-group").forEach(group => {
    const cards = Array.from(group.querySelectorAll(".card"));
    if (cards.length < 2) return;
    const max = Math.max(...cards.map(c => c.offsetHeight));
    if (max > 0) cards.forEach(c => c.style.setProperty("height", max + "px", "important"));
  });
}

let scheduled = false;
function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    equalizeCardHeights();
  });
}

document.addEventListener("DOMContentLoaded", schedule);
window.addEventListener("resize", schedule);
// Re-run on SPA navigation (Mintlify swaps page content client-side).
new MutationObserver(schedule).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
