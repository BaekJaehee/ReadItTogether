FROM openjdk:17

WORKDIR /app

# 소스 코드 복사
COPY . .

RUN ./gradlew build

ARG JAR_FILE=*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]