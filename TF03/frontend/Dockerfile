FROM node:alpine

WORKDIR /app

COPY TF03/frontend .

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server",".","-p","8080"]