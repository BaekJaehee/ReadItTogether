FROM gradle:jdk11 as build-stage

WORKDIR /app

COPY . .

# First, correctly apply execute permissions to gradlew
RUN chmod +x ./gradlew

# Then, execute your build command in a separate RUN instruction
RUN ./gradlew build -x test

FROM openjdk:17

WORKDIR /app

# Copy the jar file from the previous stage
COPY --from=build-stage /app/build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
