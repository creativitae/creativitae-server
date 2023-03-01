# Restaurant API Documentation

## Endpoints:

List of available endpoints :

1. `POST /register`
2. `POST /login`
3. `POST /public/register`
4. `POST /public/login`
5. `POST /public/google-login`
6. `POST /public/linkedin-login`
7. `GET /templates`

Routes below need authentication :

8. `GET /public/mytemplates`
9. `GET /public/mytemplates/:templateId`
10. `GET /templates/:templateId`
11. `GET /public/:userId`
12. `POST /public/:userId`
13. `PUT /public/:userId`

Routes below need authentication & authorization :

14. `POST /templates`
15. `PUT /templates/:templateId`
16. `DELETE /templates/:templateId`

&nbsp;

## 1. POST /register

Request:

- body

```json
{
    "username": "johndoe",
    "email": "johndoe@mail.com",
    "password": "12345",
    "phoneNumber": "08123456789",
    "address": "Jakarta"
}
```

_Response (201 - Created):_

```json
{
    "admin": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$oEB/0yI8Pmd9tSThkLI52.RWwAxtTl3/5py2YI.UCOCioR7N7MiYe",
        "phoneNumber": "08123456789",
        "address": "Jakarta"
    }
}
```

_Response (400 - Bad Request):_

```json
{
    "errorsMessages": [
        {
            "message": "Email must be unique"
        },
        // OR
        {
            "message": "Password is required"
        },
        // OR
        {
            "message": "Password be at least 5 characters long"
        },
        // OR
        {
            "message": "Email is required"
        },
        // OR
        {
            "message": "Please insert e-mail format"
        }
    ]
}
```

&nbsp;

## 2. POST /login

Request:

- body

```json
{
    "email": "johndoe@mail.com",
    "password": "12345"
}
```

_Response (200 - OK):_

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlZHVAbWFpbC5jbyIsImlhdCI6MTY3NDk5NDk1NH0.uH5vq9MD3_W0bzuT0Dv-XIH_MUCsJ_BE3LU0u4fer-E",
    "id": 1,
    "username": "johndoe"
}
```

_Response (400 - Bad Request):_

```json
{
    "message": "Please insert e-mail"
}
// OR
{
    "message": "Please insert password"
}
```

_Response (401 - Unauthorized):_

```json
{
    "message": "Error invalid email or password"
}
```

&nbsp;

## 3. POST /public/register

Request:

- body

```json
{
    "username": "johndoe",
    "email": "johndoe@mail.com",
    "password": "12345",
    "phoneNumber": "08123456789",
    "address": "Jakarta"
}
```

_Response (201 - Created):_

```json
{
    "admin": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$oEB/0yI8Pmd9tSThkLI52.RWwAxtTl3/5py2YI.UCOCioR7N7MiYe",
        "phoneNumber": "08123456789",
        "address": "Jakarta"
    }
}
```

_Response (400 - Bad Request):_

```json
{
    "errorsMessages": [
    {
        "message": "Email must be unique"
    },
    // OR
    {
        "message": "Password is required"
    },
    // OR
    {
        "message": "Password be at least 5 characters long"
    },
    // OR
    {
        "message": "Email is required"
    },
    // OR
    {
        "message": "Please insert e-mail format"
    }
]
}
```

&nbsp;

## 4. POST /public/login

Request:

- body

```json
{
  "email": "johndoe@mail.com",
  "password": "12345"
}
```

_Response (200 - OK):_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlZHVAbWFpbC5jbyIsImlhdCI6MTY3NDk5NDk1NH0.uH5vq9MD3_W0bzuT0Dv-XIH_MUCsJ_BE3LU0u4fer-E",
  "id": 1,
  "username": "johndoe"
}
```

_Response (400 - Bad Request):_

```json
{
    "message": "Please insert e-mail"
}
// OR
{
    "message": "Please insert password"
}
```

_Response (401 - Unauthorized):_

```json
{
  "message": "Error invalid email or password"
}
```

&nbsp;

## 5. POST /google-login

Request:

- body

```json
{
  "googleToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmYzRmYmE2NTk5ZmY1ZjYzYjcyZGM1MjI0MjgyNzg2ODJmM2E3ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2..."
}
```

_Response (200 - OK):_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJlZHVhcmR1c29sZGk5OEBeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJlZHVhcmR1c29sZGk5OEB",
  "id": 1,
  "username": "Jhon",
  "email": "jhondoe@gmail.com"
}
```

&nbsp;

## 6. POST /public/linkedin-login

## 7. GET /templates

_Response (200 - OK):_

```json
[
    {
        "id": 1,
        "name": "template-1",
        "image": "https://images1.com",
        "isPremium": true,
        "AdminId": 1
    },
    {
        "id": 2,
        "name": "template-2",
        "image": "https://images2.com",
        "isPremium": false,
        "AdminId": 1
    }
    ...,
]
```

&nbsp;

## 8. GET /public/mytemplates

_Response (200 - OK):_

```json
[
    {
        "id": 1,
        "CustomerId": 1,
        "TemplateId": 1,
        "Template": {
            "name": "template-1",
            "image": "https://images1.com",
            "isPremium": true,
            "AdminId": 1
        }
    },
    {
        "id": 2,
        "CustomerId": 1,
        "TemplateId": 2,
        "Template": {
            "name": "template-2",
            "image": "https://images2.com",
            "isPremium": false,
            "AdminId": 1
        }
    },
    ...,
]
```

&nbsp;

## 9. GET /public/mytemplates/:templateId

_Request params:_

```json
{
  "templateId": 1
}
```

_Response (200 - OK):_

```json
{
    "id": 1,
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true,
    "AdminId": 1
},
```

_Response (404 - Not Found):_

```json
{
  "message": "Template not found"
}
```

&nbsp;

## 10. GET /templates/:templateId

_Request params:_

```json
{
  "templateId": 1
}
```

_Response (200 - OK):_

```json
{
    "id": 1,
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true,
    "AdminId": 1
},
```

_Response (404 - Not Found):_

```json
{
  "message": "Template not found"
}
```

&nbsp;



## 11. GET /public/:userId
_Request:_
- params 
```json
{
    "userId": 1
}
```
_Response (200 - OK):_
```json
{
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@mail.com",
    "password": "12345",
    "isPremium": true,
    "phoneNumber": "08123456789",
    "address": "Jakarta",
    "CustomerDetail": {
        "id": 1,
        "CustomerId": 1,
        "fullname": "John Doe",
        "summary": "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
        "educations": [
            {
                "schoolName": "School University",
                "degree": "Bachelor of Science",
                "startingYear": 2016,
                "yearOfGraduates": 2020
            },
            {
                "schoolName": "School University 2",
                "degree": "Master of Science",
                "startingYear": 2020,
                "yearOfGraduates": 2023
            }
        ],
        "workExperiences": [
            {
                "workPlaceName": "Bank Dunia",
                "position": "Teller",
                "startingDate": "March 2015",
                "endingDate": "April 2016"
            }
            ...,
        ],
        "languages": [
            {
                "language": "English",
                "proficiency": "IELTS 7"
            }
            ...,
        ],
        "skills": [
            {
                "name": "Backend",
                "techs": [
                    {
                        "name": "Express"
                    },
                    {
                        "name": "Sequelize"
                    }
                    ...,
                ]
            },
            {
                "name": "Frontend",
                "techs": [
                    {
                        "name": "React.js"
                    },
                    {
                        "name": "Vue.js"
                    }
                    ...,
                ]
            },

            ...,
        ],
        "certifications": [
            {
                "provider": "Udemy",
                "title": "JavaScript algorithms and data     structures",
                "issuedOn": "Date",
                "expirationDate": "Date" /* OR */ null,
                "certificateLink": "https://google.com"
            },
            ...,
        ],
    },
}
```
_Response (404 - Not Found):_
```json
{
    "message": "User not found"
}
```

&nbsp;


## 12. POST /public/:userId
_Request:_
- params
```json
{
    "userId": 1
}
```
- body
```json
{
    "fullname": "John Doe",
        "summary": "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
        "educations": [
            {
                "schoolName": "School University",
                "degree": "Bachelor of Science",
                "startingYear": 2016,
                "yearOfGraduates": 2020
            },
            {
                "schoolName": "School University 2",
                "degree": "Master of Science",
                "startingYear": 2020,
                "yearOfGraduates": 2023
            }
        ],
        "workExperiences": [
            {
                "workPlaceName": "Bank Dunia",
                "position": "Teller",
                "startingDate": "March 2015",
                "endingDate": "April 2016"
            }
            ...,
        ],
        "languages": [
            {
                "language": "English",
                "proficiency": "IELTS 7"
            }
            ...,
        ],
        "skills": [
            {
                "name": "Backend",
                "techs": [
                    {
                        "name": "Express"
                    },
                    {
                        "name": "Sequelize"
                    }
                    ...,
                ]
            },
            {
                "name": "Frontend",
                "techs": [
                    {
                        "name": "React.js"
                    },
                    {
                        "name": "Vue.js"
                    }
                    ...,
                ]
            },

            ...,
        ],
        "certifications": [
            {
                "provider": "Udemy",
                "title": "JavaScript algorithms and data     structures",
                "issuedOn": "Date",
                "expirationDate": "Date" /* OR */ null,
                "certificateLink": "https://google.com"
            },
            ...,
        ],
}
```
_Response (200 - OK)_
```json
{
    "message": "Successfully adding your customer detail"
}
```

&nbsp;


## 13. PUT /public/:userId
_Request:_
- params
```json
{
    "userId": 1
}
```
- body
```json
{
    "fullname": "John Doe",
        "summary": "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
        "educations": [
            {
                "schoolName": "School University",
                "degree": "Bachelor of Science",
                "startingYear": 2016,
                "yearOfGraduates": 2020
            },
            {
                "schoolName": "School University 2",
                "degree": "Master of Science",
                "startingYear": 2020,
                "yearOfGraduates": 2023
            }
        ],
        "workExperiences": [
            {
                "workPlaceName": "Bank Dunia",
                "position": "Teller",
                "startingDate": "March 2015",
                "endingDate": "April 2016"
            }
            ...,
        ],
        "languages": [
            {
                "language": "English",
                "proficiency": "IELTS 7"
            }
            ...,
        ],
        "skills": [
            {
                "name": "Backend",
                "techs": [
                    {
                        "name": "Express"
                    },
                    {
                        "name": "Sequelize"
                    }
                    ...,
                ]
            },
            {
                "name": "Frontend",
                "techs": [
                    {
                        "name": "React.js"
                    },
                    {
                        "name": "Vue.js"
                    }
                    ...,
                ]
            },

            ...,
        ],
        "certifications": [
            {
                "provider": "Udemy",
                "title": "JavaScript algorithms and data     structures",
                "issuedOn": "Date",
                "expirationDate": "Date" /* OR */ null,
                "certificateLink": "https://google.com"
            },
            ...,
        ],
}
```
## 14. POST /templates
_Request body:_
```json
{
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true
}
```
_Response (201 - Created):_
```json
{
    "id": 1,
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true,
    "AdminId": 1
}
```
_Response (400 - Bad Request):_
```json
{
    "errorsMessages": [
        {
            "message": "Please insert template name"
        },
        // OR
        {
            "message": "Please insert template image"
        }
    ]
}
```
## 15. PUT /templates/:templateId
_Request:_
- params 
```json
{
    "templateId": 1
}
```
- body
```json
{
    "id": 1,
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true,
    "AdminId": 1
}
```
_Response (200 - OK):_
```json
{
    "message": "Template succesfully updated"
}
```
_Response (400 - Bad Request):_
```json
{
    "errorsMessages": [
        {
            "message": "Please insert template name"
        },
        // OR
        {
            "message": "Please insert template image"
        }
    ]
}
```

## 16. DELETE /templates/:templateId
_Request params:_
```json
{
    "templateId": 1
}
```
_Response (200 - OK):_
```json
{
    "message": "Template succesfully deleted"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
