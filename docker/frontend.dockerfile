FROM node:latest

WORKDIR /app

EXPOSE 3000

COPY /start-frontend.sh /usr/local/bin/start-frontend.sh
RUN chmod +x /usr/local/bin/start-frontend.sh

CMD ["start-frontend.sh"]