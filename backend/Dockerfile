FROM node:14 as base

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
FROM base as production

ENV NODE_ENV=production
RUN npm install --production

CMD ["node", "src/bin/www"]

FROM base as dev

ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["npm", "start"]
