FROM node:18-slim
WORKDIR /
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js"]
