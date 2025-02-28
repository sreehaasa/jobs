FROM node:18-slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json /opt/app/
RUN npm install
COPY . /opt/app/
EXPOSE 3000
CMD [ "node", "server.js"]
