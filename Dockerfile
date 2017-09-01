FROM node:boron

ADD . /app
WORKDIR /app

CMD [ "node", "server/app.js" ]
