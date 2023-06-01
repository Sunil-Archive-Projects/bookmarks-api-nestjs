# bookmarks-api-nestjs

**NestJS**

- Create testable, scalable and production ready APIs
- Native TS support
- Microservices
- REST API
- Documentation

**Install NestJS CLI**
- Install NestJS CLI
    ```
    npm i -g @nestjs/cli
    ```
- Create new Nest Project
    ```
    nest new project-name
    ```
- To run the application
  ```
  npm run start:dev
  ```

- **Modules**
  - A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
  - Can import other modules
  - Can import controllers and services

We create Auth Module by hand without generators. We create a class with @Module decorator and export it. In App module, we import the auth module in the "imports" option

We create user and bookmark module using the generator
nest g module user

# **Controllers**

Controllers are responsible for handling incoming requests and returning responses to the client.

# **Providers**

Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system.

We create the Controller and the Service Provider and import it in the User module file.

In the controller we pass the instance of the injectable service to call the services from controller
 
In the controller we define the methods with decorators @Get / @Post etc to correspond to REST methods. In the controller we can return the methods of the instance of services we have used in constructor, so that we can build the logic in services instead of controller.

We setup the postgres database in the docker for local development

We define the service in our docker-compose.yml and run 
```
docker compose up dev-db -d
```
-d to run as a daemon process


We use prisma ORM to interact with this postgres DB

To install Prisma

```
npm add -D prisma
npm add @prisma/client
```

To initialise Prisma DB
```
npx prisma init
```

We create a Prisma model for User in the schema.prisma file inside prisma folder

```
model User{
  id Int @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  email String
  hash String

  firstName String? // optional
  lastName String?
}
```

After adding models , run migrations
```
npx prisma migrate dev
```
This generates the Typescript types as well for the prisma models to be used in services


To run the prisma studio UI locally :
```
npx prisma studio
```

We create the module and service for prisma
```
nest g module prisma
nest g service prisma
```

We import the prisma module inside the Auth module. The Auth service should have access to the Prisma module now !

By adding the @Global() decorator at the top of the Module we can make it Global. Make sure to add exports in module config

signup method in the controller can take @Req() req:Request as a parameter to access the request object from Express and pass it on to the services if needed. Never use this in Nestjs, because when you change underlying tehnology like express/fastify, the references become irrelevant

Better approach - @Body() dto:any allows us to get the body of the request

dto's - Data Transfer Objects 
The object that has been sent as part of the request from the client

Pipes 
Pipes in nestjs functions that transform your data. e.g. : string to int etc.
Example:
```
@Body('email' ParseIntPipe) email:String 
``` 

Class Validator

We can use this to validate the body in the DTO class instead of piping everything in the controller
```
npm add class-validator class-transformer
```

We add the decorators on top of the fields in DTO class to validate it 

Use the below snippet in the main.ts to use this validation class globally
```
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
```
setting whitelist:true makes sure we are stripping out all the irrelevant params 

argon library for hashing password
argon.hash(dto.password) - to hash the password

We make changes in schema to add unique constraint to the email field in the user and run the migrations

We add the automation scripts for prisma and docker db in dev environment to restart db and apply the migrations 

**Config Module**

```
npm add @nestjs/config
```
Add it to the imports in the App module. It used dotenv library.
Set isGlobal to true in the config module import to make sure it is available in entire application.
