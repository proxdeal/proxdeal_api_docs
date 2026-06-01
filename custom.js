function fixCards() {
  // Inline style beats any stylesheet — try every plausible selector
  document.querySelectorAll(
    '.card, card, [class*="rounded-2xl"][class*="overflow-hidden"], [class*="rounded-2xl"][class*="border"]'
  ).forEach(el => {
    el.style.setProperty("border-radius", "0", "important");
  });
}

function equalizeCardHeights() {
  // Reset
  document.querySelectorAll(
    '.card, card, [class*="rounded-2xl"][class*="overflow-hidden"]'
  ).forEach(el => el.style.removeProperty("height"));

  // Find each card group container and equalize its cards
  document.querySelectorAll(
    '.card-group, card-group, [class*="grid"][class*="gap"]'
  ).forEach(group => {
    const cards = Array.from(
      group.querySelectorAll('.card, card, [class*="rounded-2xl"][class*="overflow-hidden"]')
    );
    if (!cards.length) return;
    const max = Math.max(...cards.map(c => c.offsetHeight));
    if (max > 0) cards.forEach(c => c.style.setProperty("height", max + "px", "important"));
  });
}

function applyAll() {
  fixCards();
  equalizeCardHeights();
}

// Run after paint so layout is settled
document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(applyAll));
window.addEventListener("resize", applyAll);

// Re-run on SPA navigation
new MutationObserver(applyAll).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
