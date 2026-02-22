# FizzBuzz API

A REST API implementation of the classic FizzBuzz algorithm built with Express and TypeScript.

## What is FizzBuzz?

For each number in a given range:

- Divisible by **3** → `"Fizz"`
- Divisible by **5** → `"Buzz"`
- Divisible by **both 3 and 5** → `"FizzBuzz"`
- Otherwise → the number itself

## Getting Started

### Prerequisites

- Node.js (latest LTS version)

### Installation

```bash
git clone https://github.com/Erafle/fizz-buzz.git
cd fizz-buzz
npm install
```

### Environment Variables

Create a `.env` file at the root:

```env
API_KEY=your-api-key
```

### Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API

### `GET /api/fizz-buzz`

Returns the FizzBuzz sequence for a given range.

#### Headers

| Header          | Required | Description                      |
| --------------- | -------- | -------------------------------- |
| `Authorization` | Yes      | Must match `API_KEY` from `.env` |

#### Query Parameters

| Parameter | Type   | Default | Min | Max | Description        |
| --------- | ------ | ------- | --- | --- | ------------------ |
| `from`    | number | `1`     | 1   | 100 | Start of the range |
| `to`      | number | `100`   | 1   | 100 | End of the range   |

> **_Note:_** `to` must be greater than or equal to `from`.

#### Example

```bash
curl -H "Authorization: your-api-key" "http://localhost:3000/api/fizz-buzz?from=1&to=15"
```

#### Response `200 OK`

```json
{
  "data": [
    1,
    2,
    "Fizz",
    4,
    "Buzz",
    "Fizz",
    7,
    8,
    "Fizz",
    "Buzz",
    11,
    "Fizz",
    13,
    14,
    "FizzBuzz"
  ]
}
```

#### Error Responses

| Status | Name                  | When                                              |
| ------ | --------------------- | ------------------------------------------------- |
| `400`  | `ValidationError`     | Invalid or out-of-range query params              |
| `401`  | `UnauthorizedError`   | Missing `Authorization` header or invalid API key |
| `500`  | `InternalServerError` | Unexpected server error                           |
