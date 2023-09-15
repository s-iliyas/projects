# Agency


- Admin Signup
```bash
curl --location --request POST 'http://localhost:8080/auth/signup/admin/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "zelhussssssssss",
    "last_name": "consultants",
    "email": "zzzzzzzzzzzzzzzzzz@a.com",
    "phone_number": 9000000000,
    "address": "Kurnool",
    "password1":"3210",
    "password2":"3210"
}'
```
 - Admin Login
 ```bash
curl --location --request POST 'http://localhost:8080/auth/login/admin/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "zzzzzzzzzzzzzzzzzz@a.com",
    "password": "3210"
}'
 ```

- Get admin
```bash
curl --location --request GET 'localhost:8000/admin/get/?email=aasasb@a.com' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWFzYXNiQGEuY29tIiwidG9rZV90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjczMzI5Nzc5LCJleHAiOjE2NzMzMjk3ODB9.88DVKmHsCKLNjFqZrc_QaLNFczCzJZ793_Yziv28Aik'
```

- Get all Admins
```bash
curl --location --request GET 'localhost:8000/admin/getAll/' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWFzYXNiQGEuY29tIiwidG9rZV90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjczMzI5Nzc5LCJleHAiOjE2NzMzMjk3ODB9.88DVKmHsCKLNjFqZrc_QaLNFczCzJZ793_Yziv28Aik'
```

- Delete Admin
```bash
curl --location --request GET 'localhost:8080/agent/delete/?email=ab@a.com' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWFzYXNiQGEuY29tIiwidG9rZV90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjczMzI5Nzc5LCJleHAiOjE2NzMzMjk3ODB9.88DVKmHsCKLNjFqZrc_QaLNFczCzJZ793_Yziv28Aik'
```
- Update Admin
```bash
curl --location --request GET 'localhost:8080/agent/update/?email=ab@a.com' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWFzYXNiQGEuY29tIiwidG9rZV90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjczMzI5Nzc5LCJleHAiOjE2NzMzMjk3ODB9.88DVKmHsCKLNjFqZrc_QaLNFczCzJZ793_Yziv28Aik' \
--header 'Content-Type: application/json' \
--data-raw '{
    "full_name": "ravindra",
    "phone_number": 9182189384
}'
```















- Mongodb - > Nosql - > Collections - > Documents({"sdb":"sj","cbhs":1})
