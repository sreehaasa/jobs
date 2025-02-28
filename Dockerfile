FROM node:18-slim
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000
CMD [ "node", "server.js"]
