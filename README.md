# Log Server

## Requirements
- Docker
- Node v12

## Installation
- Clone this repo
- Run `docker-start.sh`
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

## Sample data
- Command to create sample table

`php bin/console app:createsampledatabase`

- Command to add sample data

`php bin/console app:createsampledata 1000` create 1000 rows in database

- Command to create data realtime

`php bin/console app:streamsampledata 60` create 60 rows in every minute

## Documentation

#### [Api Documentation](/docs/api/README.md)
