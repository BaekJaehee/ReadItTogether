# 빌드 스테이지
FROM gradle:7.2-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle clean build -x test --no-daemon

# 실행 스테이지
FROM openjdk:11-jre-slim
COPY --from=build /home/gradle/src/build/libs/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
