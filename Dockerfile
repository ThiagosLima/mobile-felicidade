FROM node:12.10.0-alpine
WORKDIR /app
RUN apk add --no-cache bash
RUN npm install -g expo-cli
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]