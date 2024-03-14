FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./

# Yarn is already installed
RUN npm install
COPY . .
RUN npm run build


# ARG 및 ENV 설정 추가
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# production stage
FROM nginx:latest as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]