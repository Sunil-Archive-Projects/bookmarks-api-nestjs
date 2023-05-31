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