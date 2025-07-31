# myrepertoire.io ♟️

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A web application for building and mastering your chess repertoire. Upload lines in PGN format and drill them interactively with real-time quizzes. Inspired by tools like Chessly, this app focuses on helping you retain and internalize your openings efficiently.

---

## Features

- 🔍 **PGN Parsing:** Convert raw PGN strings into structured move trees.
- 🧠 **Quiz Mode:** Practice your repertoire with an interactive quiz that simulates your opponent's moves.
- 🛠️ **Custom Engine:** Built with a custom lexer and parser in Go for PGN processing.
- 📡 **API-first Architecture:** RESTful API powering frontend logic.
- 🔒 **Authentication:** Login/signup with support for Google Sign-In (planned).
- 📊 **User Profiles:** Save repertoires and track quiz performance (WIP).

---

## Tech Stack

- **Frontend:** React (TBD)
- **Backend:** Go (custom PGN parser, REST API)
- **Database:** PostgreSQL (planned)
- **Auth:** Google OAuth + local auth (planned)
- **Hosting:** VPS (planned)

---

## Project Status 🚧

### ✅ Completed

- PGN lexer and parser in Go
- Move tree data structure
- Basic backend setup

### 🛠️ In Progress

- Quiz engine (drill mode)
- REST API for repertoires
- Frontend UI (React)

### 🧭 Planned

- User authentication (Google Sign-In + username/password)
- Persistent storage with PostgreSQL
- Admin dashboard
- Multiplayer drills

---

## Contributing

Contributions are welcome and appreciated, just fork the repo
make your changes and open a Pull Request.
