FROM node:20-alpine3.18 AS build

RUN apk add --no-cache openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz

WORKDIR /app
COPY package* ./

RUN npm install


COPY ./ ./
RUN npx prisma generate 
RUN npm run build


FROM node:20-alpine3.18 AS next
LABEL org.opencontainers.image.source https://github.com/Theo-Maes/boujou

WORKDIR /app
COPY --from=build /usr/local/bin/dockerize /usr/local/bin/dockerize
COPY --from=build /app/package.json /package.json
COPY --from=build /app/node_modules /node_modules
COPY --from=build /app/.next /.next
COPY --from=build /app/public /public
COPY --from=build /app/prisma /prisma
COPY --from=build /app/docker/docker-bootstrap-app.sh ./

EXPOSE 3000
COPY /docker/docker-bootstrap-app.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT [ "docker-entrypoint" ]
CMD [ "npm", "run", "start"]