FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt install make gcc g++ python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt autoremove

# For migrate/seeds
RUN npm i -g knex

COPY . .

RUN npm run build
COPY .env ./build
WORKDIR /usr/src/app/build

EXPOSE 5000

CMD ["node", "src/index.js"]