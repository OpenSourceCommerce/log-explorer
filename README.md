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

## Sample data
- Command to create sample table

`php bin/console app:createsampledatabase`

- Command to add sample data

`php bin/console app:createsampledata 1000` create 1000 rows in database

- Command to create data realtime

`php bin/console app:streamsampledata 60` create 60 rows in every minute


