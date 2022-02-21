# Syslog Receiver

## 1. Configuration

### 1.1 Server

```dotenv
SERVER_HOST=0.0.0.0
UDP_SERVER_PORT=9506
TCP_SERVER_PORT=9507

CLICKHOUSE_DB_HOST=
CLICKHOUSE_DB_PORT=
CLICKHOUSE_DB_USERNAME=
CLICKHOUSE_DB_PASSWORD=
CLICKHOUSE_DB_DBNAME=
CLICKHOUSE_DB_POOL_SIZE=50

CLICKHOUSE_DB_TIMEOUT=5 #in seconds
CLICKHOUSE_DB_CONNECTION_TIMEOUT=5 #in seconds
```

### 1.2 Syslog pattern

```yaml
// config/syslog.yml
pattern: '<%{POSINT:pri}>%{POSINT:version} %{TIMESTAMP_ISO8601:timestamp} %{HOSTNAME:hostname} %{USERNAME:table_name} %{USERNAME:proc_id} %{USERNAME:app_name} \- %{GREEDYDATA:message}'
```

### 1.3 Table

```yaml
// config/{table_name}.yml
// Ex: config/nginx_access.yml

type: grok
pattern: '%{TIMESTAMP_ISO8601:date} %{TIMESTAMP_ISO8601:timestamp} %{IP} %{GREEDYDATA:text}'

// or

type: json
```

## Starting

### 1. Starting UDP Server to receive udp message

```shell
php server.php
```

## Testing

### 1. Send udp message with json format

```shell
docker run --log-driver syslog --log-opt syslog-address=udp://localhost:9506 --log-opt tag="udp_logs" --log-opt syslog-format=rfc5424 alpine echo '{"text":"testing json format","date":"2022-02-18 09:47:14","timestamp":"2022-02-18 09:47:00"}'
```

### 2. Send udp message with grok format

```shell
docker run --log-driver syslog --log-opt syslog-address=udp://localhost:9506 --log-opt tag="udp_logs" --log-opt syslog-format=rfc5424 alpine echo '2022-02-18 17:11:14 2022-02-18 17:11:14 10.0.0.219 testing grok message'
```
