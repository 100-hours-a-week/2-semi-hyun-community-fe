FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 644 /etc/nginx/conf.d/default.conf

EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]