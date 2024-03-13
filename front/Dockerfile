# 빌드 스테이지
FROM node:20 AS build

# 애플리케이션 디렉토리 생성
WORKDIR /app

# 애플리케이션 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 추가
COPY . .

# ARG 및 ENV 설정 추가
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# React 앱 빌드
RUN npm run build

# 실행 스테이지
FROM nginx:alpine

# Nginx가 정적 파일을 서빙할 디렉토리
WORKDIR /usr/share/nginx/html

# 빌드 스테이지에서 생성된 빌드 파일 복사
COPY --from=build /app/build .


