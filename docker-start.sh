#!/bin/bash

git pull

echo "STARTING DOCKER ENVIRONMENT..."
docker-compose up -d

echo "INSTALLING COMPOSER DEPENDENCIES..."
docker-compose exec -T php bash -c '/usr/local/bin/composer install --no-plugins --no-scripts --no-interaction --prefer-dist --optimize-autoloader'

if [ ! -f .env ]; then
    cp .env.dist .env
fi

# npm install
# npm run dev
