#!/bin/sh
set -e

echo "Le docker-entrypoint.prod s'exécute"
if [ -z "$ENV" ]; then
  ENV="db"
fi
dockerize -wait tcp://$ENV:5432 -timeout 60s
#Attendre que la base de données soit prête
# dockerize -wait tcp://db:5432 -timeout 60s
# echo "Database is ready!"
# #initialiser les migrations et la base de données
# # echo "Running Prisma migrate reset..."
npx prisma migrate deploy
# echo "start feeding db..."
npx prisma db seed

exec "$@"
