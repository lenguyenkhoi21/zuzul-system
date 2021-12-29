#Zuzul's E-commerce System

---
## Overview
This is our project - the `Zuzul` team.

We are going to defend our graduation thesis in `2022 April`. Our team will work on the `Gitlab `.

However, the `main branch` will be public on `Github` in order to share our knowledge and what we achieve through this project. 

Whenever all features are `completed` on the `Gitlab`, the team leader (**[Le Nguyen Khoi](https://github.com/lenguyenkhoi21)**) will `merge` into the main branch and push to the `Github` with public view.

Our project is about an `e-commerce system`. This is not only the place where we purchase items, but also the ideal platform for all people to `meet`, `communicate`, `establish` new friendships and `discuss` products.

Because we are still students, we do not have enough budget to deploy this system. It means everyone will use `Docker Desktop` to run and experience.

---
## Our Team
Team leader

Front-end Dev

Back-end Dev

Tester

---
## Tech-stack
### Language:
* Java
* JavaScript 
### Front-end
* NextJs
* React
* Tailwind Css
* Bootstrap
### Back-end:
* Microservices Architecture
* Spring Boot (Java)
* Spring Cloud Netflix (based on Netflix OSS)
* Spring Cloud Commons (Gateway, Sleuth, Client-side Load-balancing, Cirbreak-point,..)
* Socket.IO (NodeJS)
* Gradle
* Open Zipkin
* ELK Stack (Elasticsearch, Kibana, Logstash)
* Apache Kafka
* Nginx
* Keycloak
### Database:
* Cassandra
* Postgresql
* MySQL
* Elasticsearch
* Neo4J
* Redis
* MongoDB
### Storage:
* AWS S3
### Runtime:
* Docker
---
## Architecture
### Front-end Zone:
This is where user and admin using
### Gateway Zone:
This is where front-end call the apito the back-end system
### Public Zone:
1. API not secure, public, everyone can get it
2. In browser, cors config
### Private Zone:
Neet `JWT bearer token` header to do, each API need `specific role` from Keycloak
### Middleware Zone:
1. `Keycloak`: 
This is the heart of the system, so I give `preference` to port 8080. `Without keycloak`, you cannot call the api, except from public.
2. `Apache Kafka`:
   This is the system’s nerves that `transport` messages between services.

### Monitor Zone:
* `ELK` stack:
  * `Elasticsearch`: the database for logs
  * `Logstash`: Process lo log and save it in `Elasticsearch`
  * `Kibana`: Querry, Visualize
* `Zipkin`: Tracing in microservice
* `Config Server`: When a service `start`, it need to `get config` from config server
* `Eureka Server`: `Management`, `receive` heart beats and `send` the status for every service which `still alive`

![image](https://drive.google.com/uc?export=view&id=15R60jn8143rAf6SntJnSumIf_cK2BBpK)

---

## Rules code of team

---

### For `front-end` dev

IDE: `IntelliJ`, `Webstorm`, `Vscode`

JavaScript: `ES6+ syntax`

For Web user:
1. Structure folder:
```
+---component
+---pages
+---public
+---reducer
+---styles
\---utils
```
* In the folder `./component/` contains the `Component` using `in pages`
  * At `top folder`, the component that using in `_app.js`
  * The file in `./common`: component that using in `at least 2 page`
* In the folder `./pages`, where the NextJS `render` pages and `cache CDN` for us, read more at: [Next.JS docs](https://nextjs.org/docs/getting-started)
  * In the folder `./<page_name>`: component that using in `/<page>`
* In the folder `./public` is where we put the `public resource` like font, logo, image
* In the folder `./styles` contain `globals.css` for styling `all app`
* In the folder `./reducer`, the place we put the `Context` and `its logic`
* In the folder `./utils`, the `common functions` like `fetch api`, `calculate`, `contain api domain`, etc...
2. Component
* Each file JS is `a component`
* `export const default` name component
* Name component is `uppercase` first letter. EX: `HomePage`
* `Don't` use class component, `just` function component and hook
* `Follow` codding rules of hooks [react](https://reactjs.org/docs/hooks-rules.html)
* `Sometimes` you need to disable some `ESlint`, but `don’t abuse`. Most use-case is `useEffect()` with empty `[] dependencies`
* Rules for `component’s name`:
  * In the folder `./pages/`: `[<name_component> + Page].js`. EX: `RoomChatPage.js (RoomChat + Page)`
  * In the folder `./component`: export the as `React.memo()` to `optimized`
* `Style` for component:
  * Put the custom css in `<style jsx> {``}</style>`
  * Name of CSS Class: `.<tag_html>-<Component Name>-<meaning full>`. EX:
  ``` 
    .div-IconBar-container {
      padding: 7px;
    }
  ```
  * `Don't duplicate css that tailwind implementation for you`
* Template of component:
    ```
    import React from 'react'
    import { timeNow } from '../../utils/Utils'
    
    const ComponentName = () => {
        console.log(
            `${timeNow()} --- [ComponentName] --- Render at location`
        )
        return (
            <>
                <div></div>
                <style jsx>{``}</style>
            </>
        )
    }
    
    export default ComponentName
    ```
3. Global CSS:
* In` @layer base`, override the default tailwind css
* Put `font` in folder `public/font/`
* Each `font-weight` import from `public/font/` 
* In` @layer utilities`, A style like padding, margin that using in system
* `Some style not updated in runtime`

For Admin-Portal: will update soon

---
### For `back-end` dev
Common
1. IDE: Recommend `IntelliJ` (Ez to dev)
2. `Solid` code
3. `Don’t Update` dependency in gradle
4. With testing, follow `rules of gradle`, [docs here](https://docs.gradle.org/current/userguide/userguide.html)
5. `ssh-key` base on format: `ssh-keygen -m PEM -t rsa -b 4096 -C "your_email@example.com"`

Service
1. `Package` Structure Example
    ```
    ├───main
    │   ├───java
    │   │   └───com
    │   │       └───zuzul
    │   │           └───zuzulauthenticationservice
    │   │               ├───api
    │   │               │   └───v1
    │   │               │       ├───login
    │   │               │       ├───register
    │   │               │       ├───service_info
    │   │               │       └───valid_token
    │   │               └───common
    │   │                   ├───adminclient
    │   │                   ├───model
    │   │                   │   ├───api
    │   │                   │   │   └───v1
    │   │                   │   └───keycloak
    │   │                   ├───ultis
    │   │                   └───usercontext
    │   └───resources
    └───test
        └───java
            └───com
                └───zuzul
                    └───zuzulauthenticationservice
    ```
   * Follow rule folder structure of [spring boot project](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.structuring-your-code): 
   * `api` package is the logic for routes
     1. `Each route `is base on a package. EX: `/zuzul-authentication-service/v1/api/login` to  `api.v1.login`. here is example: 
        ```
        └───v1
            ├───login
            │       LoginControllers.java
            │       LoginPOSTResponse.java
            │       LoginServices.java
            │
            ├───register
            │       RegisterControllers.java
            │       RegisterPOSTResponse.java
            │       RegisterServices.java
            │
            ├───service_info
            │       ServiceInfo.java
            │       ServiceInfoControllers.java
            │
            └───valid_token
                    ValidTokenControllers.java
        ```
     2. The top at level is `@RequestMapping(Constant.rootPath)`
     3. Method is` @PostMapping("/routes")`, etc... for this route
     4. We also put the `@service` for handle logic of this route
     5. If these routes have many method like `POST`, `PATCH`, `PUT`, `DELETE`, name the response and the payload of this in the package
     6. `Don’t put logic in Controller Class, just in Service Class`
   * A `common package` is the config app, model used in `2 or more routes`, config app, constant, etc...
     ```
     ├───adminclient
     │       AdminClient.java
     │       Keycloak.java
     │       TokenFetchSchedule.java
     │
     ├───model
     │   ├───api
     │   │   └───v1
     │   │           POSTUserPayload.java
     │   │
     │   └───keycloak
     │           CompositeRole.java
     │           Credential.java
     │           Token.java
     │           UserInfo.java
     │           UserInfoAccess.java
     │           UserKeyCloakPayload.java
     │
     ├───ultis
     │       Constant.java
     │
     └───usercontext
     UserContext.java
     UserContextFilter.java

       ```
     1. `@Component` is the bean that using in more services










