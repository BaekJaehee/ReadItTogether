FROM maven:3.8.5-openjdk-17 as build

WORKDIR /app
COPY . /app
RUN --mount=type=cache,target=/root/.m2 mvn -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true package

FROM amazoncorretto:17-alpine

ARG JAR_FILE=example-0.0.1-SNAPSHOT.jar

WORKDIR /app
COPY --from=build /app/target/${JAR_FILE} /app/app.jar
COPY scripts/run.sh /app/
ENTRYPOINT ["./run.sh"]