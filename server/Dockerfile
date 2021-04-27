FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

# For migrate/seeds
RUN npm i -g knex

COPY . .

RUN npm run build
COPY .env ./build
WORKDIR /usr/src/app/build

EXPOSE 5000

CMD node src/index.js