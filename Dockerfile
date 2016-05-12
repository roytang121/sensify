FROM node:6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV DOCKER_IP=192.168.99.100

copy package.json /usr/src/app
run npm install

copy . /usr/src/app

cmd ["./docker_start.sh"]
