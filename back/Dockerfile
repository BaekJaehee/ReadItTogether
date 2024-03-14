FROM bellsoft/liberica-openjdk-alpine:17 AS build

WORKDIR /app

# 소스 코드 복사
COPY . .

RUN chmod +x ./gradlew && \
    ./gradlew clean build -x test --no-daemon

FROM bellsoft/liberica-openjdk-alpine:17

WORKDIR /app

# 빌드 스테이지에서 생성된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
