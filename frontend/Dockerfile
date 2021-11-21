# pull official base image
FROM node:16.13.0-alpine

# set working directory
WORKDIR /react-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /react-app/node_modules/.bin:$PATH

# install react app dependencies
COPY package.json /react-app
COPY package-lock.json /react-app
RUN mkdir -p /react-app/node_modules
RUN chown node:node /react-app/node_modules
RUN npm install --silent

COPY . /react-app

# start react app
CMD pwd \
    && ls -la \
    && npm start
