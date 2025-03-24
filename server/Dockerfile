from node:22.14

WORKDIR /app

COPY package*.json ./

RUN npm install

copy . .

expose 3000

cmd ["node","server.js"]