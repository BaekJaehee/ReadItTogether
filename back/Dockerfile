# 빌드 스테이지
FROM gradle:7.2-jdk17 AS build
WORKDIR /app
# Gradle Wrapper 실행 권한 부여
COPY gradlew .
COPY gradle gradle
RUN chmod +x ./gradlew
# 소스 코드 및 빌드 스크립트 복사
COPY build.gradle .
COPY settings.gradle .
COPY src src
# 애플리케이션 빌드
RUN ./gradlew clean build

# 실행 스테이지
FROM openjdk:17
WORKDIR /app
# 빌드 스테이지에서 생성된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar
# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
