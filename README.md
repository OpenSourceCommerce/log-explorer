# Log Explorer ![Testing](https://github.com/phucnh-nfq/log-explorer/actions/workflows/test.yml/badge.svg)

## Requirements
- Docker
- Node v12

## Installation
- Clone this repo
- Run `docker-start.sh`

To build the static files:
- Update your `.env` file `APP_WEBPACK_FOLDER=assets` to `APP_WEBPACK_FOLDER=build`
- Run `npm install`
- Run `npm run dev`, or `npm run build` to compile for `DEV`, `PROD` environments

## Start
- Open `http://localhost/`

## Create user
- Command to create user

`php bin/console app:createuser <email>`
```
Description:
  This command used to create system user

Usage:
  app:createuser [options] [--] <email>

Arguments:
  email                      User email

Options:
  -p, --password=PASSWORD    User password
  -f, --firstname=FIRSTNAME  User first name
  -l, --lastname=LASTNAME    User last name
      --user                 Create normal user, default is ADMIN
  -h, --help                 Display this help message
```
## Create new table by console.

Example

`php bin/console app:createtable apache_access -f status:Int16 -f method:String -f size:Int16 -f referer:String -f createdAt:DateTime --ttl='timestamp:3:MONTH'`

Usage:
```
app:createtable [options] [--] []

Arguments:
name Table name

Options:
-f, --fields=FIELDS Table column. status:Int16 (multiple values allowed)
-t, --ttl[=TTL] Time to life {column_name}:{interval}:{type}
Ex: timestamp:3:month -> "TTL timestamp + INTERVAL 3 MONTH"
```

## Sample data
- Command to create sample table `nginx_access`

`php bin/console app:createsampledatabase`
```
Description:
  This command used to create the sample database at ClickHouse

Usage:
  app:createsampledatabase

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -e, --env=ENV         The Environment name. [default: "dev"]
      --no-debug        Switches off debug mode.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

- Command to add sample data at sample table `nginx_access`

`php bin/console app:createsampledata 500`
```
Description:
  Create sample data

Usage:
  app:createsampledata [options] [--] <number>

Arguments:
  number                Number of row in database

Options:
      --date=DATE       At date [default: "2021-01-05"]
      --time=TIME       At special time
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -e, --env=ENV         The Environment name. [default: "dev"]
      --no-debug        Switches off debug mode.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

- Command to create data realtime

`php bin/console app:streamsampledata 60` create 60 rows in every minute
```
Description:
  Add sample data

Usage:
  app:streamsampledata <number>

Arguments:
  number                Number of request per-minute

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -e, --env=ENV         The Environment name. [default: "dev"]
      --no-debug        Switches off debug mode.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```


- Command to delete sample table `nginx_access`

`php bin/console app:deletesampledatabase`
```
Description:
  This command used to delete the sample database at ClickHouse

Usage:
  app:deletesampledatabase

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -e, --env=ENV         The Environment name. [default: "dev"]
      --no-debug        Switches off debug mode.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

## E-Mail
- This project includes Mailhog. You can access the Web-Mail-Overview at `http://localhost:8025/`

## Documentation

#### [Api Documentation](/docs/api/README.md)
