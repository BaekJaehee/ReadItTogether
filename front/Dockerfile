FROM node:20 as build-stage
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
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]