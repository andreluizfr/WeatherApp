# Weather App


## Stacks
* Vite
* Typescript
* React
* React Router Dom
* Axios
* SASS, framer motion, react-icons, react-spinners
* Jest
* React testing library


## How to run the application
In the root folder run the commands:
```
  docker build --no-cache -t weather_app .
  docker run --name weather_app_container -dp 127.0.0.1:80:4173 weather_app
```

then access:
**[http://localhost:80](http://localhost:80)**

to stop docker container run:
```
  docker stop weather_app_container
```


## How to run tests
In the root folder run the commands:
```
  npm i
  npm run test
```

## Deployed application
then access:
**[]()**