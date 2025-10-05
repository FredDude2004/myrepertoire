# myrepertoire 🎼♟️

A full-stack chess repertoire trainer built with TypeScript, React, Next.js, Go
, PostgreSQL, and hosted on a configured VPS instance

myrepertoire is a web application that enables
chess players to create, manage, and train their repertoires interactively.
Users can paste PGN files, transform them into structured repertoires, and
practice them through a drill system that simulates real-world play.

This project demonstrates software engineering, full-stack development, systems design, and DevOps
: from building a custom PGN lexer/parser in Go, to architecting a
secure backend API + PostgreSQL database, to deploying a Next.js frontend on a
hardened, VPS environment with reverse proxying, SSL/TLS Certificates, firewall
and a CI/CD pipeline by registering Docker containers on the GitHub Container
Registry and useing GitHub Actions and Watchtower for automated deployments.

**Custom Chess PGN parser written in Go**

- Designed and implemented a custom lexer and parser to perform lexical analysis
  of and evaluation of PGN files.

- Translates raw PGN into structured JSON objects for frontend consumption.

- Handles variations, nested moves, and advanced chess notation.

**Backend API (Go + Fiber + GORM)**

- Created a REST API for authentication, repertoire CRUD operations, and quiz
  delivery.

- Implemented JWT authentication with cookies on login/signup.

- Designed a normalized PostgreSQL schema to store users, repertoires, and lines
  with strong data integrity.

**Frontend (Next.js + React + TypeScript)**

- Built a responsive, interactive UI with React and Next.js.

- Developed an interactive quiz system that tests users on repertoire responses.

- Integrated with backend APIs for real-time repertoire management.

- Implemented global state management with Context + Reducer for scalability.

**Networking & VPS**

- configured a Virtual Private Server instance deployment on hardened hardware.

- Secured HTTPS with Let’s Encrypt TLS certificates via Go Traefik reverse proxy.

- Hardened environment with firewalls, port management, and SSH key-based
  authentication.

**Developer Tooling & Workflow**

- Full development in NeoVim with LSP, debugging, and Treesitter for Go,
  TypeScript, and SQL (All on Arch BTW).

- Docker + Docker Compose for containerized development of backend, frontend,
  and database.

- Open source with clear contribution guidelines for community collaboration.

### Tech Stack

Frontend: TypeScript, React, Next.js

Backend: Go (Fiber, GORM, custom PGN lexer/parser, corentings/chess/v2)

Database: PostgreSQL

Authentication: JWT, go/encrypt library

Deployment & Networking: VPS, Traefik, Let’s
Encrypt TLS, SSH, firewalls

Dev Tools: NeoVim, Docker, GitHub

### Contributing

myrepertoire is open source and welcomes contributions!

Just fork the repository and clone it out on your local machine.
Run locally (backend + frontend + database with Docker Compose):

```bash
docker-compose up --build
```

Backend (Go API) runs on port 8080

Frontend (Next.js) runs on port 3000

PostgreSQL runs on port 5432

## Notes and Sources

This project has been something that I wanted to build ever since I first
started using Gotham's [Chessly](https://chessly.com) and using the drills to go
over the openings. When I used it I thought to myself "Wouldn't it be awesome if
you could add your own openings to this tool?" And now here we are!

### Sources

- [Writing An Interpreter In Go](https://interpreterbook.com/)
- [Introduction to Tokenization | Writing a Custom Language Parser in Golang](https://youtu.be/V77J9l8N-P8?si=4IvABR0VSai87v3K)

  Building my own interpreter for a custom programming language was what gave me
  the technical base to understand how to process data and turn it into
  something that a computer can comprehend, which allowed me to use what I
  learned to build something hands on.

- [Chess in React](https://www.youtube.com/watch?v=jS9elCC2hPQ)

  It all started with this, I built all of the functionality of the app on top
  of this (after fixing a couple of the issues that I noticed which are still
  waiting to be merged :( ).

- [ShadCN](https://ui.shadcn.com/)

  Made making a decent looking UI a breeze, and allowed me to focus more on the
  things that I cared about.

- [JWT Authentication in Go (Gin/Gorm)](https://youtu.be/ma7rUS_vW9M?si=yrRS3YV-0hjOR9GO)

  This video was instrumental for setting up authentication and building the
  rest of the API. It showed all of the documentation and was so well put
  together that I referenced it multiple times for implementing the REST API

- [Setting up a production ready VPS is a lot easier than I thought.](https://youtu.be/F-9KWQByeU0?si=zsfz8yHdTL1fwdCz)

  All of the steps that I followed in order to secure my machine for self
  hosting. Also just an entertaining video that is very well put together.

- [Skyrim: Music & Ambience - Rainy Towns 10 Hours](https://youtu.be/Eveef36s_Wc?si=EF4asP_9WyH_L9dM)

  Pretty sure I listened to this full video eight times
