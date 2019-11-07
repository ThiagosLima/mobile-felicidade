FROM node:12.13.0-alpine
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add --no-cache bash
RUN npm install -g expo-cli
COPY package*.json ./
RUN npm install
RUN expo install react-native-gesture-handler react-native-screens
COPY . .
CMD [ "npm", "run", "start" ]