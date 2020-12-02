# Log Receiver API

## 1. Adding new log data
#### Uri: `/api/v1/log/receiver`

#### Method: `POST`

#### Body

```json
{
    "table": "log_table_name",
    "data": {
        "status": "200",
        "forwarded_proto": "http",
        "ssl_protocol": "true",
        "host": "google.com.vn",
        "device_type": "mobile",
        "timestamp": "2020-12-01 16:45:00",
        "ip": "127.0.0.1",
        "scheme": "https"
    }
}
```

#### Response Error

```json
{
    "error": 1,
    "fields": {
        "data": "Error message"
    }
}
```

#### Response Success

```json
{
    "error": 0
}
```
