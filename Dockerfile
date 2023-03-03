# Dockerfile
# 1st Stage
FROM node:12.3.1 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build:x

# 2nd Stage
FROM nginx:1.14.2-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN chmod -R 777 /var/log/nginx /var/cache/nginx/ /etc/nginx/ /var/run

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
