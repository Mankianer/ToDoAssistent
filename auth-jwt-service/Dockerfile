FROM node:12

#Env
ENV TZ=Europe/Berlin
ENV PORT=3001
# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Create Directory for the Container
WORKDIR /usr/src/app


# install Packeges
COPY libs/ libs/

RUN chmod -R a+rwx .

# Build Libs
WORKDIR /usr/src/app/libs/express-utils
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/libs/todo-assistant-models
RUN npm install
RUN npm run build

COPY auth-jwt-service/ auth-jwt-service/
# Build service
WORKDIR /usr/src/app/auth-jwt-service

# Install all Packages
RUN npm install
RUN npm run build


## Finished Build Module

EXPOSE ${PORT}

WORKDIR /usr/src/app/auth-jwt-service
CMD ["node", "."]

