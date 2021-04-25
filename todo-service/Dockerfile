FROM node:12 as build

#Env
ENV TZ=Europe/Berlin

# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create Directory for the Container
WORKDIR /usr/src/app


# install Packeges
COPY . .

RUN chmod -R a+rwx .

# Build Libs
WORKDIR /usr/src/app/libs/express-utils
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/libs/todo-assistant-models
RUN npm install
RUN npm run build

# Build service
WORKDIR /usr/src/app/todo-service

# Install all Packages
RUN npm install
RUN npm run build

EXPOSE 3000

#ENTRYPOINT ["sh", ""]
CMD ["npm", "start"]

