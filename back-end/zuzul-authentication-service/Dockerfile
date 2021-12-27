FROM gradle:7.3.2-jdk11-alpine as packageJar
WORKDIR /home/gradle/project
COPY . .
RUN gradle bootJar

FROM openjdk:11 as run
WORKDIR /app
COPY --from=packageJar /home/gradle/project/build/libs/app.jar ./app.jar
CMD ["java", "-jar", "app.jar"]
