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

## Stack
* MongoDB
* Nest