FROM node:latest

WORKDIR /app

EXPOSE 3000

COPY /start-backend.sh /usr/local/bin/start-backend.sh
RUN chmod +x /usr/local/bin/start-backend.sh

CMD ["start-backend.sh"]