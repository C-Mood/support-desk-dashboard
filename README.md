Support Desk Dashboard 

A frontend support ticket dashboard built with vanilla HTML, CSS, and JavaScript.  
This project simulates a real internal support tool with ticket management, filtering, and persistent state without using frameworks.

Features

- Create, view, and delete support tickets
- Search tickets by title or description
- Filter by ticket status (Open, Pending, Resolved)
- Sort tickets by date or priority
- Ticket detail panel with status updates
- Modal form with validation
- Persistent data using localStorage

Tech Stack

- HTML
- CSS
- JavaScript (ES Modules)
- DOM Manipulation
- localStorage
- Git & GitHub

Architecture Notes

The application is structured using separation of concerns:

•data.js — seed/mock ticket data
•storage.js — persistence layer (localStorage)
•ui.js— DOM creation and formatting
•app.js — application state, events, and rendering logic

This structure allows the data layer to be easily replaced with a real backend API in the future.

(https://c-mood.github.io/support-desk-dashboard/)

Future Improvements

- Edit ticket functionality
- Authentication simulation
- API integration
- Improved accessibility and keyboard navigation

---

Built throughtout my full-stack software engineering journey to practice real world UI patterns and JavaScript architecture.
