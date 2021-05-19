FROM node:10.17.0

WORKDIR /app

COPY ./app /app
COPY ./.env /app/.env

RUN npm install -g serve && \
    npm install && \
    npm run build && \
    rm -rf /node_modules

CMD ["sh", "-c", "serve --ssl-cert /localhost.crt --ssl-key /localhost.key -p 3000 --single ./build/"]
