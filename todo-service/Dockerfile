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


WORKDIR /usr/src/app/todo-service

# Install all Packages
RUN npm install
RUN ls -al ../..
RUN ls -al node_modules
#
RUN npm run build

EXPOSE 3000

#ENTRYPOINT ["sh", ""]
CMD ["npm", "start"]

