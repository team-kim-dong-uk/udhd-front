FROM node:14.17.1-alpine

# set working directory
WORKDIR /app

COPY src /app/src
COPY .node-version /app/.node-version
COPY next.config.js /app/next.config.js
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
EXPOSE 3000

RUN npm i
RUN npm i next
RUN npm i react react-dom

RUN npm run build
# RUN npm run start

# 앱 실행
CMD ["npm", "start"]
