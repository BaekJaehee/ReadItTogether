

# Read it Together : 빅데이터를 활용한 도서추천 서비스

개발 환경
---
+ Front-end
    - React : ^18.2.0
    - "react-dom": "^18.2.0"
    - tailwindcss : ^3.4.1 
+ Back-end
    - fastapi : 0.109.1
    - JDK:17
+ DB
    - redis
    - mysql
+ Cloud 
      -GCP,EC2


환경 설정
--
### miniconda 가상환경 설정
Refresh Tokken : Cookie / Acess tokken :local storage

#### miniconda 다운로드

-   https://docs.conda.io/projects/miniconda/en/latest/ 에 접속해서 miniconda 설치

#### 가상환경 생성 및 접속

-   본 프로젝트는 python version 3.8로 진행

-   myenv는 본인이 설정할 환경 이름

```
conda create --name {myenv} python=3.8
```

-   생성한 환경 접속

```
conda activate {myenv}
```

#### 필요한 라이브러리 설치

```
pip install -r requirement.txt
```

### Front-end .env 설정
```
HTTPS=true
REACT_APP_API_BASE_URL=https://localhost:8000/
```

### Back-end .env 설정
```
DATABASE_URL={postgreSQL 도메인}

SECRET_KEY={JWT secret key}
SESSION_SECRET_KEY={세션 관리용 secret key}

GCP_SERVICE_ACCOUNT_JSON={GCP 서비스 계정 권한 JSON TEXT}
GOOGLE_CLIENT_ID={Google OAuth ID}
GOOGLE_CLIENT_SECRET={Google OAuth Password}
KAKAO_CLIENT_ID={Kakao OAuth ID}
KAKAO_CLIENT_SECRET={Kakao OAuth Password}
NAVER_CLIENT_ID={Naver OAuth ID}
NAVER_CLIENT_SECRET={Naver OAuth Password}

SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME={SMTP 이메일 인증용 계정 ID}
SMTP_PASSWORD={SMTP 이메일 인증용 계정 App Password}
```


### Front-end .gitignore
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.1
.env
# dependencies
/node_modules
/.pnp
.pnp.js
.env

# testing
/coverage


# production
/build

# misc1
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Back-end .gitignore
```
.gradle
build/
!gradle/wrapper/gradle-wrapper.jar
!**/src/main/**/build/
!**/src/test/**/build/
gcs_cloud.json
### STS ###
src/main/resources/env.yml
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache
bin/
!**/src/main/**/bin/
!**/src/test/**/bin/
src/main/resources/env.yml
.env
### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr
out/
!**/src/main/**/out/
!**/src/test/**/out/

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/

### VS Code ###
.vscode/

```

# 외부 서비스 정리

 EC2, GCP, KaKao Ouath2(social)
