
# 실행 스테이지
FROM openjdk:17
WORKDIR /app

# 애플리케이션 빌드
RUN gradlew clea build -x test --no-daemon

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
