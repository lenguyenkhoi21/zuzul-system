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

![image](image/architechture.png)

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
* In `@layer base`, override the default tailwind css
* Put `font` in folder `public/font/`
* Each `font-weight` import from `public/font/` 
* In `@layer utilities`, A style like padding, margin that using in system
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
  * `Each route `is base on a package. EX: `/zuzul-authentication-service/v1/api/login` to  `api.v1.login`. here is example:
   ```
   ├───api
   │   └───v1
   │       ├───login
   │       │       LoginControllers.java      
   │       │       LoginPOSTResponse.java     
   │       │       LoginServices.java
   │       │       
   │       ├───register
   │       │       RegisterControllers.java   
   │       │       RegisterPOSTResponse.java  
   │       │       RegisterServices.java      
   │       │       
   │       ├───service_info
   │       │       ServiceInfo.java
   │       │       ServiceInfoControllers.java
   │       │       
   │       └───valid_token
   │               ValidTokenControllers.java
   ```
  * The top at level is `@RequestMapping(Constant.rootPath)`
  * Method is` @PostMapping("/routes")`, etc... for this route
  * We also put the `@service` for handle logic of this route
  * If these routes have many method like `POST`, `PATCH`, `PUT`, `DELETE`, name the response and the payload of this in the package
  * `Don’t put logic in Controller Class, just in Service Class`

* A `common package` is the config app, model used in `2 or more routes`, config app, constant, etc...
  ```
  └───common
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
  * `@Component` is the bean that using in more services

2. `Lombok` rule
* `@RequiredArgsConstructor` for make code clean. 
* The filed inject `must` be final: `private final LoginServices services;`
* `No` using new keyword for model, pojo,... `just lombok`. EX: 
  ```
    LoginPOSTResponse
      .builder()
      .userID(userInfo.getId())
      .access_token(token.getAccess_token())
      .role(role.get())
      .build();
  ```
* POJO, Model, DTO,... `must follow`  based on template
  ```
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class LoginPOSTResponse {
        private String userID;
        private String access_token;
        private String role;
    }
  ```
3. Call API between services
* `Must` using bean `RestTemplate` created with `@LoadBalanced`, `don’t` create new: 
  ```
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
      return new RestTemplate();
    }
  ```
* `Must` add `CirBreakpoint` top to `protect` the call
  ```
    @CircuitBreaker(name = "services-b", fallbackMethod = "bullFallbackServiceB")
    @RateLimiter(name = "services-b", fallbackMethod = "bullFallbackServiceB")
    @Retry(name = "retryServices-b", fallbackMethod = "bullFallbackServiceB")
    @Bulkhead(name = "bulkheadServices-b", type= Bulkhead.Type.THREADPOOL, fallbackMethod = "bullFallbackServiceB")
  ```
* If two services are in `different zones`, call throughout `gateway`. If in a zone, call it `directly`
4. Logger
* Create a logger like this: ``` private final Logger logger = LoggerFactory.getLogger(LoginServices.class); ```
* Logger `level info`, when request come into services with `CorrelationID`. EX:
  ```
    logger.info("CorrelationID - "
                    +  UserContext.getCorrelationId()
                    + " Failed To Login");
  ```
* Log some event, failed, success, etc...
5. With gateway:
* Filter package will track request:
  ```
    └───filter
        FilterUtils.java
        ResponseFilter.java
        TrackingFilter.java
  ```
* With `private zone`, must `valid` token, if not successfully, `reject`
---
### Coding flow: 
Don’t be waiting for back-end team or front-end team. FE must code the mock-up and dummy-data, when BE finish, FE call API

---
## Run the system
### Init setup:
1. All docker `commandline` must run at `top` folder project, `copy` dockerfile and run:
    ```
    +---.idea
    +---back-end
    +---docker-comose-template
    +---font-end
    +---image
    +---mock-up-be
    \---springboot-config-template
    ```
2. Create folder `./config` to add config, physical path, etc… and data to persist `./data`:
    ```
    +---.idea
    +---back-end
    +---config
    +---data
    +---docker-comose-template
    +---font-end
    +---image
    +---mock-up-be
    \---springboot-config-template
    ```
### Next Step
1. Team FE: No need BE real, run BE mock
2. Structure folder `./mock-up-be`
    ```
    +---config-mock
    +---docker-command
    +---mock-database-chat
    +---springboot-mock-image
    \---websock-mock-data
    ```
* Run commandline in  `./docker-command` to start mongodb:
* Run config-mock `(see in be)`
* Run springboot-mock-image `(see in be)`
* Run mock-database-chat: `yarn start`
* Run websocket-mock-data: `yarn start`
* Final, run FE:
  * Web for user in `./front-end/website`: `yarn start`
  * Web for admin-portal in `./front-end/admin-portal` : `yarn start`
2. Team BE:
* Run infrastructure from `./docker-compose-template`
  ```
  ├───docker-comose-template
  │   ├───App
  │   │       Docker-compose.yaml
  │   │
  │   ├───Back-end
  │   │       Docker-compose.yaml
  │   │
  │   ├───Config
  │   │   └───logstash-server
  │   │       ├───conf
  │   │       │       logstash.yaml
  │   │       │
  │   │       └───pipeline
  │   │               logstash.conf
  │   │
  │   └───Infrastructure
  │           Docker-compose.yaml
  ```
  * Copy config, etc..
  * Waiting all service `healthy` and `run app`:
  ```
    CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS                   PORTS                                            NAMES
    b3f4c772d7d7   bitnami/keycloak:15        "/opt/bitnami/script…"   3 minutes ago   Up 2 minutes (healthy)   0.0.0.0:8080->8080/tcp                           keycloak
    ec347410621a   logstash:7.14.2            "/usr/local/bin/dock…"   3 minutes ago   Up 2 minutes (healthy)   5044/tcp, 0.0.0.0:5000->5000/tcp, 9600/tcp       logstash-server
    168fdff30cc7   kibana:7.14.2              "/bin/tini -- /usr/l…"   3 minutes ago   Up 2 minutes (healthy)   0.0.0.0:5601->5601/tcp                           kibana-server
    3f9097d5d412   openzipkin/zipkin:latest   "start-zipkin"           3 minutes ago   Up 2 minutes (healthy)   9410/tcp, 0.0.0.0:9411->9411/tcp                 zipkin-server
    581412113cc1   elasticsearch:7.14.2       "/bin/tini -- /usr/l…"   3 minutes ago   Up 3 minutes (healthy)   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp   elasticsearch-monitor
    d02ed701975e   bitnami/postgresql:11      "/opt/bitnami/script…"   3 minutes ago   Up 3 minutes (healthy)   5432/tcp                                         postgresql
  ```
* Config for the `first time`:
  * `Create` a branch in repo config
    * `Naming` branch  rule: `yourname-profile`. Profile is `localhost` or `docker`. ex: `khoiln-localhost` or `khoiln-docker`
    * `Create` a branch from main
  * Config `Keycloak`, `client secret`, etc...
* Config Spring Boot App `./springboot-config-template`:
  ```
  └───springboot-config-template
      ├───config-repo
      │       application.yaml
      │
      ├───logging
      │       logback-spring.xml
      │
      └───other-service
              bootstrap.yaml
  ```
* `Copy logback.xml` the template config in folder `./logging` to `resources` folder of each `spring boot app`
* With `config-server-app`:  With config server, file `application`. `[yaml,yml,properties]`
  * `Copy application.yaml` from the template config in folder `./config-repo` to `resources` folder of project
  * `Add` your `SSH private key` to clone repo `gitlab`
  ```
  server:
    port: 8077
  
  spring:
    application:
      name: zuzul-config-server
    profiles:
      active: git
    cloud:
      config:
        server:
          git:
            uri: <GIT REPO>
            private-key: <YOUR PRIVATE SSH KEY, NOTE - ONLY RSA KEY, NOT OPEN SSH"
            passphrase: <YOUR PASSPHRASE SSH>
            ignore-local-ssh-settings: true
  ```
  * `Run` config server first
* With `services-app`: file `bootstrap`. `[yaml,yml,properties]`
  * `Copy boostrap.yaml` the template config in folder `./other-service` to `resources` folder of project
  * Put the name branch of your pc config, branch to clone:
  ```
  spring:
    application:
      name: <NAME SERVICE, MUST BE SAME WITH NAME .YAML IN CONFIG REPO>
    profiles:
      active: <Default - dev,  [qa, prod, test]>
    cloud:
      config:
        uri: <URL CONFIG SERVER TO FETCH CONFIG>
        label: <NAME OF YOUR BRANCH IN CONFIG REPO>
  ```
  * Run `eureka-server` first:
  * After `eureka-server` start up successfully, run other services
  * Run App:
    * Copy the docker-compose.yaml in docker-compose-template folder:
    * Run at top-level 
* End

_Thank you for watching_

---

Hope you and enjoy. If you like, give my team starts









