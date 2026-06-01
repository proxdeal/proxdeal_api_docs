function equalizeCardHeights() {
  document.querySelectorAll("card").forEach(c => (c.style.height = ""));
  document.querySelectorAll("card-group").forEach(group => {
    const cards = Array.from(group.querySelectorAll("card"));
    const max = Math.max(...cards.map(c => c.offsetHeight));
    if (max > 0) cards.forEach(c => (c.style.height = max + "px"));
  });
}

document.addEventListener("DOMContentLoaded", equalizeCardHeights);
window.addEventListener("resize", equalizeCardHeights);
