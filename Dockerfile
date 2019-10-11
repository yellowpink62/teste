FROM node:10

RUN apt-get update
COPY . /opt/teste
WORKDIR /opt/teste
RUN npm i
EXPOSE 5000
ENTRYPOINT ["node","app.js"]
