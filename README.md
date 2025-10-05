# Task Board with Docker Compose

## Overview
This project shows a simple task board made from three Node.js services and a PostgreSQL database. The API serves task data, the frontend shows a React interface, and the logger service stores request logs. Docker Compose keeps all containers connected on the same network.

## Project structure
- **frontend/** – React app that talks to the API.
- **api/** – Express server that manages tasks and contacts the logger.
- **logger/** – Small logging service that writes events to disk.
- **db/** – SQL script that creates the `tasks` table and seed data.
- **docker-compose.yml** – Starts every service together.
- **.env.example** – Copy this file to `.env` for your own settings.

## Prerequisites
Make sure these tools are installed:
- Docker 24 or newer
- Docker Compose plugin 2.24 or newer

## Quick start
1. Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```
2. Update `.env` if you need other ports, passwords, or log levels.
3. Build and start every container:
   ```bash
   docker compose up --build
   ```
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

Docker Compose also exposes:
- API at [http://localhost:5000](http://localhost:5000)
- Logger service listening for POST requests at `http://localhost:4000/log`
- PostgreSQL at `localhost:5432` for local tools

## Useful commands
- Stop the stack but keep containers: `docker compose stop`
- Remove containers and network: `docker compose down`
- Watch logs from all services: `docker compose logs -f`

## Troubleshooting
- If ports are busy, change them in `.env` and restart with `docker compose up --build`.
- If the database keeps old data, run `docker compose down -v` to remove the volume.

## Development tips
- Code changes inside `api`, `frontend`, or `logger` directories update live because they are mounted as volumes.
- Run `docker compose logs -f api` to focus on the API output when debugging.

## License
This lab project is shared for educational use within the Programming Technologies course.
