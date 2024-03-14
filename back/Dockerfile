# 빌드 스테이지
FROM gradle:7.2-jdk11 AS build
WORKDIR /app
# 소스 코드 및 빌드 스크립트 복사
COPY . .
# 애플리케이션 빌드
RUN gradle bootJar --no-daemon

# 실행 스테이지
FROM openjdk:11-jre-slim
WORKDIR /app
# 빌드 스테이지에서 생성된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar
# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
