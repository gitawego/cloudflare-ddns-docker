FROM jsurf/rpi-raspbian:latest

RUN apt-get update && \
  apt-get install curl -y && \
  curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
  apt-get install -y nodejs && \
  apt-get remove curl -y

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ../../package.json /usr/src/app/
COPY ../../package-lock.json /usr/src/app/
RUN npm install --production

COPY ../../index.js /usr/src/app
COPY ../../updateRecord.js /usr/src/app
CMD [ "npm", "start" ]
