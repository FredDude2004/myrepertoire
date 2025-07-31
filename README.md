# myrepertoire.io ♟️

A web application for building and mastering your chess repertoire. Upload
lines in PGN format and drill them interactively with real-time quizzes.
Inspired by tools like Chessly, this app focuses on helping you retain and
internalize your openings efficiently.

## Features

- 🔍 **PGN Parsing:** Convert raw PGN strings into structured move trees.
- 🧠 **Quiz Mode:** Practice your repertoire with an interactive quiz that
  simulates your opponent's moves.
- 🛠️ **Custom Engine:** Built with a custom lexer and parser in Go for PGN processing.
- 📡 **API-first Architecture:** RESTful API powering frontend logic.
- 🔒 **Authentication:** Login/signup with support for Google Sign-In (planned).
- 📊 **User Profiles:** Save repertoires and track quiz performance (WIP).

## Stack

- **Frontend:** React (TBD)
- **Backend:** Go (custom PGN parser, REST API)
- **Database:** PostgreSQL (planned)
- **Auth:** Google OAuth + local auth (planned)
- **Hosting:** VPS (planned)

## Development Status 🚧

This project is currently under active development.

### ✅ Done

- PGN lexer and parser (Go)
- Move tree generator
- Basic backend API setup

### 🛠️ In Progress

- Quiz engine (drill mode)
- API endpoints for repertoires
- Frontend UI (React)

### 🧭 Planned

- User authentication
- Persistent storage (PostgreSQL)
- Admin dashboard
- Live multiplayer quiz modes
