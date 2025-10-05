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
2. Build the custom PostgreSQL image:
   ```bash
   docker build -t local/task-db:latest ./db
   ```
3. Start the database container for debugging:
   ```bash
   docker run --name task-db \
     --env-file ./.env \
     -p ${DB_PORT:-5432}:5432 \
     -v task-db-data:/var/lib/postgresql/data \
     -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro \
     local/task-db:latest
   ```
4. Point your application to `localhost:${DB_PORT}` using the same credentials from `.env`.
5. When finished, stop and remove the container:
   ```bash
   docker stop task-db && docker rm task-db
   ```
   To remove the persistent volume, also run:
   ```bash
   docker volume rm task-db-data
   ```

### Notes
- Update `db/init.sql` when you need to change the seed data. Rebuild the image (step 2) afterward.
- The shared `task-db-data` volume keeps your data between restarts. Remove it to reset the database.
- For alternative ports, change `DB_PORT` in `.env` before starting containers.
