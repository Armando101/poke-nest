<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in dev environment

1. Clone repository
2. Execute
```
npm install
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Run database 
```
docker-compose up -d
```
5. Clone file __.env.template__ and rename to __.env__

6. Fill the environment variables defined in __.env__

7. Execute dev envirnoment
```
npm run start:dev
```

8. Seed data
```
http://localhost:3000/api/v2/seed
```
# Production build
1. Create __.env.prod__ file
2. Fill environment variables for production
3. Create the new docker image
```docker
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Stack
* MongoDB
* Nest