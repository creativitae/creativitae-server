FROM node:latest

WORKDIR /usr/local/CREATIVITAE_SERVER

# Pastikan port sama kaya port server users kalian
ENV PORT=3000

COPY package.json package-lock.json /usr/local/CREATIVITAE_SERVER/

RUN npm install && npm cache clean --force


RUN npm install -g nodemon


COPY ./ ./


CMD ["npm", "run", "start"]
