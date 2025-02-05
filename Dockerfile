# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# /app 디렉토리로 복사
COPY package.json package-lock.json ./

RUN npm install

# COPY 소스경로 목적지경로로
COPY app.js .

COPY public ./public/

EXPOSE 8081

CMD ["node", "app.js"]
