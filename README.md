# Hexagonal Code with Express & TypeScript


## Table of contents

* [Technologies](#Technologies)
* [Testing](#Testing)

## Technologies

Project is created with:

* Typescript
* Node
* Express
* PostgreSQL
* Docker
* Jest


## Running Server

Run database sync first for table setup. 

**DISCLAIMER**: 
- *Only use Database Sync for development only, __DO NOT USE IN PRODUCTION__*.
- *For production please use migration*.

```
# make sure your db already created
# make sure ormconfig.json was configured properly
$ npm run cli schema:sync
```

The start dev server (using nodemon) with below command.


```
$ npm run dev
```

## Testing

1.first get a bash shell in the container 

2.excute the test cases

```
$ docker-compose exec device bash
$ npm test
```

