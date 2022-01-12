# User API

## 1. Invite User

#### Uri: `/api/v1/user/create`

#### Method: `POST`

### Header
```
Content-Type: application/json
X-AUTH-TOKEN: {api_token}
//Add this variable API_TOKEN={api_token} in your .env file
```

#### Body

```json
{
	"email": "example@scale.sc",
	"is_admin": 0,
	"first_name": "New",
	"last_name": "User"
}
```

#### Response Error

```json
{
    "error": 1,
    "fields": {
        "email": "Email is already taken"
    },
    "message": "Email is already taken"
}
```

#### Response Success

```json
{
	"redirect": "\/user",
	"id": 4,
	"error": 0
}
```
