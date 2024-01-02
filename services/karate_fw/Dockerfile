FROM maven:3.8.4-openjdk-17-slim AS build
# ENV PATH="/usr/local/apache-maven-3.8.4/bin:${PATH}"
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y maven
RUN mvn clean verify
RUN mvn test -Dtest=com.example.TestRunner
# production stage
# FROM openjdk:17-jdk-alpine
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# COPY --from=build /app/target/site/jacoco /app/jacoco
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]

FROM python:3

WORKDIR /app

COPY app.py /app
COPY . .
COPY requirements.txt /app

RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y maven
COPY repository.zip /root/.m2/
WORKDIR /root/.m2
RUN rm -rf repository 
RUN unzip repository.zip
WORKDIR /app

CMD ["python", "app.py"]
