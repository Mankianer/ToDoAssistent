FROM node:12

#Env
ENV TZ=Europe/Berlin
ENV MODULE=todo-service

# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Create Directory for the Container
WORKDIR /usr/src/ToDoAssistent


# copy
RUN git clone https://github.com/Mankianer/ToDoAssistent.git .

RUN ls -al

RUN chmod -R a+rwx .

# setUpProject
RUN ./project_setUp.sh

## Finished Build Module

CMD ["sh", "./start.sh"]

