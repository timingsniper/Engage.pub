FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

#프로젝트의 모든 파일을 복사
COPY . .

RUN yarn run build

#포트 7000번 사용
EXPOSE 3000

CMD ["yarn", "run", "start"]