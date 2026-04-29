## Part 2: Ticket Blitz (5 Client Tickets — Fast Response)

**Scenario:** You've just joined the team. It's your first week. Five tickets come in from clients. Each one is a real request from a site HR manager. They need quick fixes — not next sprint, now.

For each ticket: make the change, commit with a clear message referencing the ticket number.

---

**TICKET LF-101: Wrong date format on payslip**
"Our site managers are confused — the payslip shows dates as MM/DD/YYYY but everyone in India reads DD/MM/YYYY. Please fix this across the payslip view."

*Type: Frontend fix. Find where dates are formatted in the payslip/salary display and change to DD/MM/YYYY.*

---

**TICKET LF-102: Salary field accepts negative numbers**
"I accidentally entered -5000 in the salary field and it saved. That shouldn't be possible."

*Type: Validation fix. Add frontend + backend validation — salary/amount fields must be positive numbers.*

---

**TICKET LF-103: Add worker designation field**
"We need a 'Designation' field on the employee profile — values like Mason, Electrician, Plumber, Supervisor, Helper. Dropdown, not free text. This should show on the employee list page too."

*Type: Small feature. Add a dropdown field to employee create/edit form, persist it, display in employee list.*

---

**TICKET LF-104: Export employee list to CSV**
"Every month I need to send the employee list to the head office in Excel. Right now I copy-paste from the screen. Can you add a Download CSV button?"

*Type: Feature addition. Add a CSV export button on the employee list page. Include key fields: name, designation, department, salary.*

---

**TICKET LF-105: Fix mobile layout on employee list**
"When I open the employee list on my phone at the construction site, the table is cut off on the right side. I can't see the salary column without scrolling sideways."

*Type: CSS/responsive fix. Make the employee list table responsive — horizontal scroll or stacked layout on mobile.*

---

## Evaluation Criteria

| What we evaluate | What we're looking for |
|---|---|
| **Code reading ability** | You picked up an unfamiliar codebase and made it work. You didn't rewrite everything — you worked within the existing patterns |
| **Validation discipline** | Frontend validations for UX, backend validations for safety. Both present, both correct |
| **Ticket speed** | 5 tickets, clean commits, no over-engineering. We will look at timestamps between commits |
| **AI usage** | We expect you to use AI tools (Claude, Copilot, etc.) — tell us which ones and how. No penalty for using AI. Penalty for not using it |
| **Communication** | Clear commit messages. If you'd skip or modify a ticket in a real job, leave a note explaining why |

---