FROM node:12-alpine as build

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run start

# -----

FROM node:12-alpine

RUN mkdir /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .

ENV NODE_ENV production

RUN npm install

EXPOSE 9000

CMD ["npm", "run", "start:prod"]


