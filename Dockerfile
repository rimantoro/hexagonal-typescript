FROM node:10

WORKDIR /home/service

COPY package*.json ./


RUN npm install 


COPY . .

EXPOSE 8070

CMD ["npm","start"]