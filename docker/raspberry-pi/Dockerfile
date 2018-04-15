FROM resin/raspberry-pi-alpine-node:9-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ../../package.json /usr/src/app/
COPY ../../package-lock.json /usr/src/app/
RUN npm install --production

COPY ../../index.js /usr/src/app
COPY ../../updateRecord.js /usr/src/app
CMD [ "npm", "start" ]
