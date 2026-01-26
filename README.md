# Money Mentor – Frontend


![money-mentor](image.png)
![money-mentor](image.png)
![money-mentor](image.png)


Money Mentor is a react-based CRUD application for tracking personal finances and building better money habits through visibility and motivation.

Built with React, React Router, and a custom REST API.

---

Money Mentor helps users track income and expenses, view monthly summaries, and stay motivated with a points-based mentor system.

## Tech Stack

- React (Vite)
- React Router
- JavaScript
- CSS (global App.css)
- REST API
- Netlify (deployment)

---

## Features

- User authentication (signup, login, logout)
- Protected routes for authenticated users
- Create, edit, and delete income and expense transactions
- View transactions by month
- Monthly summary with totals and charts
- Mentor system with motivational messages
- Points and level progression based on user activity

---

## Data Models (Backend)

### User
- username
- password
- points

### Transaction
- amount
- type (Income / Expense)
- category
- date
- user

### Category
- name
- type

---

## Mentor System (Stretch Goal)

- Mentor provides personalized motivational feedback
- Users earn points for positive financial actions
- Levels unlock based on total points
- Users can see points remaining to the next level

---

## Routes (Frontend)

- / → Landing / Dashboard
- /sign-up
- /sign-in
- /transactions
- /transactions/new
- /transactions/:id
- /summary
- /mentors

---

## Notes

- Frontend built with React and Context API
- Authorization enforced by backend
- Users can only modify their own data


## Development Team

This project was built collaboratively by:
- **Angelika** - | [GitHub](https://github.com/angelikakasia?tab=repositories) | [LinkedIn](https://www.linkedin.com/in/angszy/) |

- **Gabriel Restrepo** - | [GitHub](https://github.com/gabogara) | [LinkedIn](https://www.linkedin.com/in/gabriel-restrepo-acosta/) |

- **Sarah Smith** - |[GitHub](https://github.com/sarahlibx) | [LinkedIn](https://www.linkedin.com/in/sarahsmithdeveloper/) |
