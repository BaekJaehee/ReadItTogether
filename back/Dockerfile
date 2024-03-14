FROM openjdk:17-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar
# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]