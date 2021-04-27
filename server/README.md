# Personal site server

## Building and running

Api and database are containerized with docker-compose. Environment variables in docker-compose are defined in .env (see example).

### Build

`docker-compose build`

### Run on background

`docker-compose up -d`

### Do database migrations

`docker exec -it api npm run migrate`

### Seed database in development

`docker exec -it api npm run seed`

### Stop

`docker-compose down`
