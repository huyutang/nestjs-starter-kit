FROM node:22-alpine3.19

# 安装 mysql 客户端
RUN apk add --no-cache mysql-client

RUN mkdir -p /app/uploads
WORKDIR /app

COPY . .

COPY prod.env .env
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start:prod"]