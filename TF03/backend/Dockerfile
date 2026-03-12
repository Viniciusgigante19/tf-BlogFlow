FROM node:20-alpine

WORKDIR /app/backend

COPY TF03/backend/package*.json ./

RUN npm install 

COPY TF03/backend ./

EXPOSE 3000

CMD ["npm", "start"]