# 빌드 스테이지
FROM gradle:jdk11 as build-stage

WORKDIR /app

# 소스 코드 및 빌드 스크립트 복사
COPY . .

# 애플리케이션 빌드 (테스트 제외)
RUN ./gradlew clean build -x test

# 실행 스테이지
FROM openjdk:17-jdk

WORKDIR /app

# 빌드 스테이지에서 생성된 JAR 파일 복사
COPY --from=build-stage /app/build/libs/*.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
