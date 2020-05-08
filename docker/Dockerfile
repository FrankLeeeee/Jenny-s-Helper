FROM node:13.8.0

RUN apt-get update && apt-get install -y nginx \
    && git clone https://github.com/FrankLeeeee/Jenny-s-Helper.git \
    && cd ./Jenny-s-Helper \
    && npm install \
    && npm run build \
    && cd ./docker \
    && mv default /etc/nginx/sites-available/