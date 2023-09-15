FROM ubuntu:22.04

ARG BASE_DIR=/var/www

ARG WEBSITE_NAME=backend

ENV WEBSITE_NAME=${WEBSITE_NAME}

COPY src .

RUN apt-get update && apt-get upgrade && apt-get install -y \
    nodejs \
    npm \
    apache2 \
    nano \ 
    build-essential gcc ca-certificates openssl 

RUN npm i 

RUN npm i pm2

RUN echo "ServerName 0.0.0.0" >> /etc/apache2/apache2.conf

RUN a2enmod proxy

RUN a2enmod proxy_http

RUN service apache2 restart

RUN mkdir ${BASE_DIR}/${WEBSITE_NAME}

EXPOSE 8080