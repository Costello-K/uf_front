## Project name:
### Welcome

## Project description:

This is a task manager application. The project is built using Vue.

## Development Tools:

    Node 20.10.0
    Vue CLI 5.0.8

## Installation and running the project:

### 1. Clone the repository
```
https://github.com/Costello-K/uf_frontend.git
```
### 2. Project setup
```
npm install
```
### 3. Create an ".env" file
```
In the root directory of the project, create an ".env" file. 
In the ".env" file, copy all the variables from the ".env.sample" file and give them values
```
### 4. Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

Deploying the application using Docker:

1) Ensure that Docker and Docker Compose are installed on your system.

2) In the root directory of the project, create an ".env" file. In the ".env" file, copy all the variables from the ".env.sample" file and give them values

3) Build the Docker images:

       docker-compose build
4) Start the containers:

       docker-compose up
5) You can now open a web browser and see the application in action at the following address.

       http://localhost:8080/


License:

Copyright (c) 2023-present, Kostiantyn Kondratenko
