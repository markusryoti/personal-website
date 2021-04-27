# Personal site server

## Building and running

Api and database are containerized with docker-compose. Environment variables in docker-compose are defined in .env (see example).

### Build

`docker-compose build`

### Run on background

`docker-compose up`

### Do database migrations

`docker exec -it personal_site_api npm run migrate`

### Seed database in development

`docker exec -it personal_site_api npm run seed`
