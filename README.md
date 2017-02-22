# anunciar-frontend
Front end of Anunciar with react.js


# Anunciar-Frontend

Front end of Anunciar with react.js
fgffg
To run the app locally:

```bash
git clone https://github.com/dkaushik95/anunciar-frontend.git
cd anunciar-frontend
npm install
npm start
open http://localhost:8080
```

## Credentials you will need 
* ADMIN 
  * email: 'admin@example.co m'         
  * password: 'secret'

* STUDENT
  * email: 'student@example.com'
  * password: 'secret'

## API requests (You can use postman to check the API)

GET Announcement (requires Authorization as a header)
```http
https://anunciar-backend.herokuapp.com/v1/announcement
```

POST login (requires email and password as data)
```http
https://anunciar-backend.herokuapp.com/v1/login
```

POST signup (requires email, username, password and password confirmation as data)
```http
https://anunciar-backend.herokuapp.com/v1/students
```
