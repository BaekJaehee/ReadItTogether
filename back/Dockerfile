FROM openjdk:17-alpine as build

WORKDIR /app
COPY . /app
RUN chmod +x ./gradlew
RUN ./gradlew build -x test

FROM amazoncorretto:17-alpine

ARG JAR_FILE=back-0.0.1-SNAPSHOT.jar

ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ENV DATABASE_URL=${DATABASE_URL}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}

WORKDIR /app
COPY --from=build /app/build/libs/${JAR_FILE} /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]