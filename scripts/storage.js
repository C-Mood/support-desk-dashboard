const TICKETS_KEY = "supportdesk:tickets";
const UI_KEY = "supportdesk:ui";

export function loadTickets() {
  const raw = localStorage.getItem(TICKETS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function loadUI() {
  const raw = localStorage.getItem(UI_KEY);
  return raw
    ? JSON.parse(raw)
    : { search: "", status: "all", sortBy: "newest" };
}

export function saveUI(ui) {
  localStorage.setItem(UI_KEY, JSON.stringify(ui));
}
