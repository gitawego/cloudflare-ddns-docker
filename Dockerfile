FROM jsurf/rpi-raspbian:latest

RUN apt-get update && \
		apt-get install wget curl -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
		apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY ./index.js /usr/src/app
CMD [ "npm", "start" ]
