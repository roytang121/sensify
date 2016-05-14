FROM node:6

MAINTAINER Roy Tang "roy.tang@sensbeat.com"

RUN rm -rf /usr/src/app

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE  8080

ENV DOCKER_IP=192.168.99.100
ENV NODE_ENV=production

cmd ["./docker_start.sh"]
