FROM node:19.5.0

WORKDIR /app

COPY package.json tsconfig.json /app/
RUN npm install

COPY src /app/src


CMD ["npm", "run", "dev"]
