FROM postgres:15-alpine

# Set the working directory to ensure copy commands succeed
WORKDIR /docker-entrypoint-initdb.d

# Copy initialization scripts into the image so they run on first start
COPY init.sql ./

# Expose the default PostgreSQL port for clarity
EXPOSE 5432
