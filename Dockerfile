FROM nikolaik/python-nodejs:python3.10-nodejs18-alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN yarn

EXPOSE 3000

ENTRYPOINT ["yarn", "workspace", "backend", "start"]
