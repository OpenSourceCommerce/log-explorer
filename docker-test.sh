#!/bin/bash

echo "INIT ENV"
cp .env.dist .env.test.local
docker-compose exec php bash -c "sed -i 's/APP_ENV=dev/APP_ENV=test/' .env.test.local"
docker-compose exec php bash -c "sed -i 's/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/dev/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/test/' .env.test.local"
docker-compose exec php bash -c "sed -i 's/DATABASE_DBNAME=logs/DATABASE_DBNAME=default/' .env.test.local"
docker-compose exec php bash -c "sed -i 's/APP_WEBPACK_FOLDER=assets/APP_WEBPACK_FOLDER=build/' .env.test.local"

echo "COMPOSER INSTALL"
docker-compose exec php bash -c "composer install --no-plugins --no-scripts --no-interaction --prefer-dist --optimize-autoloader"

echo "CLEAR CACHE"
docker-compose exec php bash -c "php bin/console cache:clear --env=\"test\""

echo "MIGRATION"
docker-compose exec php bash -c "php bin/console doctrine:migrations:migrate --no-interaction --env=\"test\""

echo "NPM"
npm install
npm run dev

echo "FIXTURES"
docker-compose exec php bash -c "php bin/console doctrine:fixtures:load -n --env=\"test\""

echo "DROP OLD DATABASE TABLE IF EXIST"
docker-compose exec php bash -c "php bin/console app:deletesampledatabase --env=\"test\""

echo "CREATE DATABASE TABLE"
docker-compose exec php bash -c "php bin/console app:createsampledatabase --env=\"test\""

echo "CREATE TEST DATA"
docker-compose exec php bash -c "php bin/console app:createsampledata 300 --env=\"test\""

echo "RUN UNIT TEST"
docker-compose exec php bash -c "php bin/phpunit \"$*\""
