FROM openjdk:17-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 도구 설치
RUN apk add --no-cache bash git openssh-client curl xargs

# 애플리케이션의 소스 코드 및 기타 필요 파일들을 이미지로 복사
COPY . .

# Gradle Wrapper 실행 권한 부여
RUN chmod +x ./gradlew

# 빌드 실행 (테스트 제외)
RUN ./gradlew build -x test --no-daemon
