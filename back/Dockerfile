
# 실행 스테이지
FROM openjdk:17
WORKDIR /app
COPY gradlew .
COPY gradle gradle
RUN chmod +x ./gradlew

COPY build.gradle .
COPY settings.gradle .
COPY src src
# 애플리케이션 빌드
RUN ./gradlew clean build -x test --no-daemon

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
