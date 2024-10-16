FROM node:20.17.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]