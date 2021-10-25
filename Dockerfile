# base image
FROM node:16.9.1-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install

#copy project files to '/app'
COPY . .

# start app
CMD ["npm", "run", "serve"]