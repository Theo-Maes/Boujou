#!/bin/sh

echo "le docker-entrypoint.prod s'execute"

# npx prisma migrate deploy
npx prisma generate
npx prisma db push

exec "$@"
