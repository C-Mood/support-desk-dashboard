import { seedTickets } from "./data.js";
import { loadTickets, saveTickets, loadUI, saveUI } from "./storage.js";
import { makeTicketElement, formatDate } from "./ui.js";

// ----- DOM -----
const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const sortBy = document.querySelector("#sortBy");
const newTicketBtn = document.querySelector("#newTicketBtn");

const ticketCount = document.querySelector("#ticketCount");
const ticketsContainer = document.querySelector("#ticketsContainer");
const emptyState = document.querySelector("#emptyState");

const detailsEmpty = document.querySelector("#detailsEmpty");
const detailsCard = document.querySelector("#detailsCard");
const detailsTitle = document.querySelector("#detailsTitle");
const detailsStatus = document.querySelector("#detailsStatus");
const detailsDescription = document.querySelector("#detailsDescription");
const detailsPriority = document.querySelector("#detailsPriority");
const detailsCreated = document.querySelector("#detailsCreated");
const toggleStatusBtn = document.querySelector("#toggleStatusBtn");
const deleteTicketBtn = document.querySelector("#deleteTicketBtn");

const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const ticketForm = document.querySelector("#ticketForm");
const titleInput = document.querySelector("#titleInput");
const descInput = document.querySelector("#descInput");
const priorityInput = document.querySelector("#priorityInput");

// ----- STATE -----
let tickets = loadTickets() ?? seedTickets;
let ui = loadUI();
let selectedId = null;

// ----- INIT UI -----
searchInput.value = ui.search;
statusFilter.value = ui.status;
sortBy.value = ui.sortBy;

render();

// ----- EVENTS -----
searchInput.addEventListener("input", () => {
  ui.search = searchInput.value.trim();
  saveUI(ui);
  render();
});

statusFilter.addEventListener("change", () => {
  ui.status = statusFilter.value;
  saveUI(ui);
  render();
});

sortBy.addEventListener("change", () => {
  ui.sortBy = sortBy.value;
  saveUI(ui);
  render();
});

newTicketBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTicket = {
    id: crypto.randomUUID(),
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    status: "open",
    priority: priorityInput.value,
    createdAt: Date.now(),
  };

  tickets = [newTicket, ...tickets];
  saveTickets(tickets);

  ticketForm.reset();
  priorityInput.value = "medium";
  closeModal();

  selectedId = newTicket.id;
  render();
});

ticketsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".ticket");
  if (!card) return;

  selectedId = card.dataset.id;
  renderDetails();
});

toggleStatusBtn.addEventListener("click", () => {
  if (!selectedId) return;

  tickets = tickets.map((t) => {
    if (t.id !== selectedId) return t;
    const next =
      t.status === "open"
        ? "pending"
        : t.status === "pending"
        ? "resolved"
        : "open";
    return { ...t, status: next };
  });

  saveTickets(tickets);
  render();
});

deleteTicketBtn.addEventListener("click", () => {
  if (!selectedId) return;

  tickets = tickets.filter((t) => t.id !== selectedId);
  saveTickets(tickets);

  selectedId = null;
  render();
});

// ----- RENDER -----
function getVisibleTickets() {
  const search = ui.search.toLowerCase();

  let list = tickets.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search);

    const matchesStatus = ui.status === "all" ? true : t.status === ui.status;

    return matchesSearch && matchesStatus;
  });

  list.sort((a, b) => {
    if (ui.sortBy === "newest") return b.createdAt - a.createdAt;
    if (ui.sortBy === "oldest") return a.createdAt - b.createdAt;

    const rank = { high: 3, medium: 2, low: 1 };
    if (ui.sortBy === "priorityHigh")
      return rank[b.priority] - rank[a.priority];
    if (ui.sortBy === "priorityLow") return rank[a.priority] - rank[b.priority];

    return 0;
  });

  return list;
}

function render() {
  saveTickets(tickets);

  const visible = getVisibleTickets();
  ticketsContainer.innerHTML = "";
  visible.forEach((t) => ticketsContainer.append(makeTicketElement(t)));

  ticketCount.textContent = String(visible.length);
  emptyState.classList.toggle("hidden", visible.length !== 0);

  // if selected ticket got filtered out, clear details
  if (selectedId && !tickets.some((t) => t.id === selectedId))
    selectedId = null;

  renderDetails();
}

function renderDetails() {
  const ticket = tickets.find((t) => t.id === selectedId);

  const hasSelection = Boolean(ticket);

  detailsEmpty.classList.toggle("hidden", hasSelection);
  detailsCard.classList.toggle("hidden", !hasSelection);

  if (!ticket) return;

  detailsTitle.textContent = ticket.title;
  detailsStatus.textContent = ticket.status;
  detailsDescription.textContent = ticket.description;
  detailsPriority.textContent = ticket.priority;
  detailsCreated.textContent = formatDate(ticket.createdAt);
}

// ----- MODAL -----
function openModal() {
  modal.classList.remove("hidden");
  titleInput.focus();
}

function closeModal() {
  modal.classList.add("hidden");
}
