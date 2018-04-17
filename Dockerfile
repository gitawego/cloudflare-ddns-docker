FROM mhart/alpine-node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/
RUN npm install --production

COPY ./index.js /usr/src/app
COPY ./updateRecord.js /usr/src/app
CMD [ "npm", "start" ]
