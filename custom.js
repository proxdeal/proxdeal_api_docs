// Cards render as <div class="card ...">, groups as <div class="... card-group ...">.
function equalizeCardHeights() {
  document.querySelectorAll(".card").forEach(c => c.style.removeProperty("height"));
  document.querySelectorAll(".card-group").forEach(group => {
    const cards = Array.from(group.querySelectorAll(".card"));
    if (!cards.length) return;
    const max = Math.max(...cards.map(c => c.offsetHeight));
    if (max > 0) cards.forEach(c => c.style.setProperty("height", max + "px", "important"));
  });
}

document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(equalizeCardHeights));
window.addEventListener("resize", equalizeCardHeights);
new MutationObserver(equalizeCardHeights).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
