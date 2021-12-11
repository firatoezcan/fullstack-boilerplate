FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY ui/dist .

COPY ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
