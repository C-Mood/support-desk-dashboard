export function formatDate(ms) {
  return new Date(ms).toLocaleString();
}

export function ticketChipText(ticket) {
  return `${ticket.status}`;
}

export function makeTicketElement(ticket) {
  const el = document.createElement("div");
  el.className = "ticket";
  el.dataset.id = ticket.id;

  el.innerHTML = `
    <div class="ticket__top">
      <h3 class="ticket__title">${escapeHtml(ticket.title)}</h3>
      <span class="chip">${escapeHtml(ticket.status)}</span>
    </div>
    <div class="ticket__meta">
      Priority: <strong>${escapeHtml(ticket.priority)}</strong> •
      ${escapeHtml(formatDate(ticket.createdAt))}
    </div>
  `;

  return el;
}

// small helper to avoid injecting raw text into HTML
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
