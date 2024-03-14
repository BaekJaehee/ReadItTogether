FROM maven:3.8.5-openjdk-17 as build

WORKDIR /app
COPY . /app
RUN chmod +x ./gradlew
RUN ./gradlew build -x test

FROM amazoncorretto:17-alpine

ARG JAR_FILE=back-0.0.1-SNAPSHOT.jar

WORKDIR /app
COPY --from=build /app/build/libs/${JAR_FILE} /app/app.jar
COPY scripts/run.sh /app/
ENTRYPOINT ["./run.sh"]