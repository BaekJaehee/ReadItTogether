# JDK 이미지 사용
FROM openjdk:17

# 작업 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 모든 파일을 컨테이너의 /app 디렉토리로 복사
COPY . .

# Gradle Wrapper 실행 권한 부여
RUN chmod +x ./gradlew

# 빌드 실행 (테스트 제외)
RUN ./gradlew clean build -x test --no-daemon


# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
