#!/bin/bash

if which node > /dev/null
    then
        NODE_INSTALLED=1
        echo "NPM installed"
    else
        NODE_INSTALLED=0
        echo "NPM NOT installed"
    fi


echo "INIT ENV"
cp .env.dist .env.test.local
docker-compose exec php bash -c "sed -i 's/APP_ENV=dev/APP_ENV=test/' .env.test.local"
docker-compose exec php bash -c "sed -i 's/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/dev/MYSQL_URL=mysql:\/\/dev:dev@mysql:3306\/test/' .env.test.local"
docker-compose exec php bash -c "sed -i 's/DATABASE_DBNAME=logs/DATABASE_DBNAME=default/' .env.test.local"
if [ "$NODE_INSTALLED" == "1" ]; then
    docker-compose exec php bash -c "sed -i 's/APP_WEBPACK_FOLDER=assets/APP_WEBPACK_FOLDER=build/' .env.test.local"
fi

echo "CREATE test database"
docker-compose exec mysql bash -c "mysql -uroot -proot -e \"CREATE DATABASE IF NOT EXISTS test;GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%';\""

echo "COMPOSER INSTALL"
docker-compose exec php bash -c "composer install --no-plugins --no-scripts --no-interaction --prefer-dist --optimize-autoloader"

echo "CLEAR CACHE"
docker-compose exec php bash -c "php bin/console cache:clear --env=\"test\""

echo "MIGRATION"
docker-compose exec php bash -c "php bin/console doctrine:migrations:migrate --no-interaction --env=\"test\""

if [ "$NODE_INSTALLED" == "1" ]; then
    echo "NPM"
    if test -f .env; then
        mv .env .env.npm.bak
        cp .env.test.local .env
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
docker-compose exec php bash -c "php bin/phpunit \"$*\""
