FROM node:20.5.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add git && apk add busybox-extras && apk add --no-cache openssh 

RUN git config --global http.sslverify false 
RUN export GIT_SSL_NO_VERIFY=true


RUN echo " Microservice NODE Version:" && node --version
RUN echo " Microservice NPM Version:" && npm --version

COPY . .


RUN npm install next@latest react@latest react-dom@latest --force

RUN npm install --force



EXPOSE 3001

CMD [ "npm", "run", "dev" ]
