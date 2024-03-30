FROM node:20

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

COPY .next ./.next

CMD ["yarn", "dev"]