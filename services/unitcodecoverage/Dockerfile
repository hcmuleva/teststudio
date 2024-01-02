FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean verify
RUN mvn jacoco:report
# production stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/target/site/jacoco /app/jacoco
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
