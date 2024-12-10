# Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]