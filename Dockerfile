FROM node:14

#just creating app directory where Bits Stack image will run
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install
# bits stack is not running on prod right now

COPY . /usr/src/app
# copying bundle source 

EXPOSE 5000 3000

CMD ["npm", "start"] 