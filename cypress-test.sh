#!/bin/bash

if which node > /dev/null
    then
        NODE_INSTALLED=1
        echo "NPM installed"
    else
        NODE_INSTALLED=0
        echo "NPM NOT installed"
    fi


if [ ! -f .env.dev.local ]; then
    echo "INIT ENV"
    cp .env.dist .env.dev.local
    docker-compose exec php bash -c "sed -i 's/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/dev/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/test/' .env.dev.local"
    docker-compose exec php bash -c "sed -i 's/DATABASE_DBNAME=logs/DATABASE_DBNAME=default/' .env.dev.local"
    if [ "$NODE_INSTALLED" == "1" ]; then
        docker-compose exec php bash -c "sed -i 's/APP_WEBPACK_FOLDER=assets/APP_WEBPACK_FOLDER=build/' .env.dev.local"
    fi
fi

echo "CREATE test database"
docker-compose exec mysql bash -c "mysql -uroot -proot -e \"CREATE DATABASE IF NOT EXISTS test;GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%';\""

echo "COMPOSER INSTALL"
docker-compose exec php bash -c "composer self-update"
docker-compose exec php bash -c "composer install --no-interaction --prefer-dist --optimize-autoloader"

echo "MIGRATION"
docker-compose exec php bash -c "php bin/console doctrine:migrations:migrate --no-interaction --env=\"dev\""

if [ "$NODE_INSTALLED" == "1" ]; then
    echo "NPM"
    if test -f .env; then
        mv .env .env.npm.bak
        cp .env.dev.local .env
    fi
    npm install
    npm run dev
    if test -f .env.npm.bak; then
        rm -rf .env
        mv .env.npm.bak .env
    fi
fi

echo "FIXTURES"
docker-compose exec php bash -c "php bin/console doctrine:fixtures:load -n --env=\"test\""

echo "DROP OLD DATABASE TABLE IF EXIST"
docker-compose exec php bash -c "php bin/console app:deletesampledatabase --env=\"test\""

echo "CREATE DATABASE TABLE"
docker-compose exec php bash -c "php bin/console app:createsampledatabase --env=\"test\""

echo "CREATE TEST DATA"
docker-compose exec php bash -c "php bin/console app:createsampledata 300 --env=\"test\""

echo "RUN UNIT TEST"
npm run cli

echo "REMOVE ENV"
rm -rf .env.dev.local
