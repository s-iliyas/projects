FROM ubuntu:jammy-20230425

ARG BASE_DIR=/var/www

ARG WEBSITE_NAME=frontend

ENV WEBSITE_NAME=${WEBSITE_NAME}

RUN apt-get update -yq && apt-get upgrade -yq && \
    apt-get install -yq curl && \
    curl -sL https://deb.nodesource.com/setup_19.x | bash - && \
    apt-get install -yq nano nodejs build-essential apache2

RUN npm install -g npm

RUN echo "ServerName 0.0.0.0" >> /etc/apache2/apache2.conf

COPY . .

RUN mkdir ${BASE_DIR}/${WEBSITE_NAME}

RUN a2enmod headers

RUN a2enmod rewrite

EXPOSE 80

RUN  service apache2 restart

ENTRYPOINT ["/bin/bash", "/var/www/frontend.sh"]
