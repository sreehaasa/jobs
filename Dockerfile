FROM node:18-slim
WORKDIR /
COPY package*.json /
RUN npm cache clean --force
RUN npm install
COPY . /
EXPOSE 3000
CMD [ "node", "server.js"]
