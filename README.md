# fmif_programming_technologies_LR_3
Repository for programming technologies dyscipline. Lab work #3 (DOCKER-COMPOSE)

## Local development workflow

1. Install Docker and Docker Compose v2.
2. Copy `.env.example` to `.env` and adjust values if needed.
3. Build containers and start the full stack:
   ```bash
   docker compose up --build
   ```
4. Open the frontend at http://localhost:3000.

## Running only the PostgreSQL database

1. Ensure the `.env` file contains the desired database credentials.
2. Start (and build on the first run) only the PostgreSQL service:
   ```bash
   docker compose --profile db up --build db
   ```
   On subsequent runs you can omit `--build` if `db/Dockerfile` and `db/init.sql` did not change.
3. Connect your application to `localhost:${DB_PORT}` using the same credentials from `.env`.
4. Stop the database once you are done debugging:
   ```bash
   docker compose --profile db down
   ```
   Add `-v` to the `down` command when you want to drop the persistent `db_storage` volume.

### Notes
- Update `db/init.sql` when you need to change the seed data. Rebuild by rerunning the `docker compose --profile db up --build db` command.
- The shared `db_storage` volume keeps your data between restarts. Drop it with `docker compose --profile db down -v` to reset the database.
- For alternative ports, change `DB_PORT` in `.env` before starting containers.
