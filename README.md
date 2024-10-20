## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features:

- role control
- configure in env -  nestjs/config
- auth - nestjs/jwt, nestjs/passport
- ORM solution - nestjs/typeorm (mysql)
- Job - nestjs/schedule
- Queue - nestjs/bull (redis)
- middleware
- file upload/download
- docker/docker-compose

## Tech stack:

- TypeOrm
- typescript
- nextjs
- nodejs
- caddy

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

change settings in file prod.env

```
$ docker-compose build
$ docker-compose up -d
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
