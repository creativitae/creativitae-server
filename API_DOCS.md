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

8. `POST /public/mytemplates/:templateId`
9. `GET /public/mytemplates`
10. `GET /templates/:templateId`
11. `GET /public/mydetail`
12. `POST /public/mydetail`
13. `PUT /public/mydetail`
14. `PATCH /pubilc/mydetail`

Routes below need authentication & authorization :

15. `POST /templates`
16. `PUT /templates/:templateId`
17. `PATCH /templates/:templateId`

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
        "password": "$2a$10$ErTU61vANBrLW3ZbpCXa.uPIDwM7EKJPs2qoOo3seZ07R1D4cCKiK",
        "phoneNumber": "08123456789",
        "address": "Jakarta",
        "updatedAt": "2023-03-01T16:36:26.930Z",
        "createdAt": "2023-03-01T16:36:26.930Z"
    }
}
```

_Response (400 - Bad Request):_

```json
{
    "errorsMessages": [
        {
            "message": "Admin name is required"
        },
        // OR
        {
            "message": "Admin email is required"
        },
        // OR
        {
            "message": "Admin password is required"
        },
        // OR
        {
            "message": "Admin phone number is required"
        },
        // OR
        {
            "message": "Admin address is required"
        },
        // OR
        {
            "message": "Please insert unique e-mail"
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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwiaWF0IjoxNjc3Njg4NzM2fQ.ciZ1A3VC9rblvxHWpah8Zpw198pB4HYo7g7rWqwdhc8",
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
    "customer": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$P5DCpyUwjy.7o4i3LVrwPuAbIK7EooGNpaLwZUs.HDs/5zeTX2kAm",
        "isPremium": false,
        "phoneNumber": "08123456789",
        "address": "Jakarta",
        "updatedAt": "2023-03-01T16:47:49.504Z",
        "createdAt": "2023-03-01T16:47:49.504Z"
    }
}
```

_Response (400 - Bad Request):_

```json
{
    "errorsMessages": [
        {
            "message": "Customer name is required"
        },
        // OR
        {
            "message": "Customer e-mail is required"
        },
        // OR
        {
            "message": "Customer password is required"
        },
        // OR
        {
            "message": "Customer phone number is required"
        },
        // OR
        {
            "message": "Customer address is required"
        },
        // OR
        {
            "message": "Please insert unique e-mail"
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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwiaWF0IjoxNjc3NjkwODMxfQ.NL0iYO51YcE5fPC45DuHv4RKZUR5T46JA5chRXK4Ggw",
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

## 5. POST /public/google-login

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
        "AdminId": 1,
        "createdAt": "2023-03-01T17:23:31.625Z",
        "updatedAt": "2023-03-01T17:23:31.625Z"
    },
    {
        "id": 2,
        "name": "template-1",
        "image": "https://images1.com",
        "isPremium": true,
        "AdminId": 1,
        "createdAt": "2023-03-01T17:43:27.745Z",
        "updatedAt": "2023-03-01T17:43:27.745Z"
    }
    ...,
]
```

&nbsp;

## 8. POST /public/mytemplates/:templateId

_Request:_
- params
```json
{
    "templateId": 1
}
```
_Response (201 - Created):_
```json
{
    "id": 1,
    "CustomerId": 1,
    "TemplateId": 1,
    "updatedAt": "2023-03-01T18:01:03.488Z",
    "createdAt": "2023-03-01T18:01:03.488Z"
}
```
_Response (400 - Bad Request):_
```json
{
    "message": "Template already in your list"
}
```
_Response (400 - Bad Request):_
```json
{
    "message": "Free user can only have one CV, create unlimited CV with premium perks"
}
```
_Response (403 - Forbidden):_
```json
{
    "message": "You need upgrade to premium to unlock this design"
}
```

_Response (404 - Not Found):_
```json
{
    "message": "Template not found"
}
```

&nbsp;

## 9. GET /public/mytemplates
_Response (200 - OK):_

```json
[
    {
        "id": 1,
        "CustomerId": 1,
        "TemplateId": 1,
        "createdAt": "2023-03-01T18:01:03.488Z",
        "updatedAt": "2023-03-01T18:01:03.488Z",
        "Template": {
            "id": 1,
            "name": "template-1",
            "image": "https://images1.com",
            "isPremium": true,
            "AdminId": 1,
            "createdAt": "2023-03-01T17:23:31.625Z",
            "updatedAt": "2023-03-01T17:23:31.625Z"
        }
    }
    ...,
]
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
    "AdminId": 1,
    "createdAt": "2023-03-01T17:23:31.625Z",
    "updatedAt": "2023-03-01T17:23:31.625Z",
    "Admin": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$ErTU61vANBrLW3ZbpCXa.uPIDwM7EKJPs2qoOo3seZ07R1D4cCKiK",
        "phoneNumber": "08123456789",
        "address": "Jakarta",
        "createdAt": "2023-03-01T16:36:26.930Z",
        "updatedAt": "2023-03-01T16:36:26.930Z"
    }
}
```

_Response (404 - Not Found):_

```json
{
  "message": "Template not found"
}
```

&nbsp;



## 11. GET /public/mydetail
_Response (200 - OK):_
```json
{
    "id": 1,
    "fullName": "John Doe",
    "summary": "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
    "educations": "[{\"schoolName\":\"School University\",\"degree\":\"Bachelor of Science\",\"startingYear\":2016,\"yearOfGraduates\":2020},{\"schoolName\":\"School University 2\",\"degree\":\"Master of Science\",\"startingYear\":2020,\"yearOfGraduates\":2023}]",
    "workExperiences": "[{\"workPlaceName\":\"Bank Dunia\",\"position\":\"Teller\",\"startingDate\":\"March 2015\",\"endingDate\":\"April 2016\"}]",
    "languages": "[{\"language\":\"English\",\"proficiency\":\"IELTS 7\"}]",
    "skills": "[{\"name\":\"Backend\",\"techs\":[{\"name\":\"Express\"},{\"name\":\"Sequelize\"}]},{\"name\":\"Frontend\",\"techs\":[{\"name\":\"React.js\"},{\"name\":\"Vue.js\"}]}]",
    "certifications": "[{\"provider\":\"Udemy\",\"title\":\"JavaScript algorithms and data structures\",\"issuedOn\":\"Date\",\"expirationDate\":\"Date\",\"certificateLink\":\"https://google.com\"}]",
    "CustomerId": 1,
    "createdAt": "2023-03-02T07:25:07.688Z",
    "updatedAt": "2023-03-02T07:25:07.688Z",
    "Customer": {
        "id": 1,
        "username": "johndoecustomer",
        "email": "johndoecustomer@mail.com",
        "password": "$2a$10$wjNn0yq2sPcI5uwH/J3lme5VRthpK9uL.chAY.3i3xOij7DzCDgN6",
        "isPremium": false,
        "phoneNumber": "08123456789",
        "address": "Jakarta",
        "createdAt": "2023-03-02T06:19:45.605Z",
        "updatedAt": "2023-03-02T06:19:45.605Z"
    }
}
```

&nbsp;


## 12. POST /public/mydetail
_Request:_
- body
```json
{
    "fullName": "John Doe",
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
    ],
    "languages": [
        {
            "language": "English",
            "proficiency": "IELTS 7"
        }
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
            ]
        }
    ],
    "certifications": [
        {
            "provider": "Udemy",
            "title": "JavaScript algorithms and data structures",
            "issuedOn": "Date",
            "expirationDate": "Date",
            "certificateLink": "https://google.com"
        }
    ]
}
```
_Response (200 - OK)_
```json
{
    "id": 1,
    "fullName": "",
    "summary": "A game enthusiast with a passion for programming, especially in web development and mobile applications. Began my programming journey by finishing Hacktiv8 bootcamp as a full-stack web developer, having decided to leave my previous career in the banking industry to pursue what has been a lifelong passion, technology.",
    "educations": "[{\"schoolName\":\"School University\",\"degree\":\"Bachelor of Science\",\"startingYear\":2016,\"yearOfGraduates\":2020},{\"schoolName\":\"School University 2\",\"degree\":\"Master of Science\",\"startingYear\":2020,\"yearOfGraduates\":2023}]",
    "workExperiences": "[{\"workPlaceName\":\"Bank Dunia\",\"position\":\"Teller\",\"startingDate\":\"March 2015\",\"endingDate\":\"April 2016\"}]",
    "languages": "[{\"language\":\"English\",\"proficiency\":\"IELTS 7\"}]",
    "skills": "[{\"name\":\"Backend\",\"techs\":[{\"name\":\"Express\"},{\"name\":\"Sequelize\"}]},{\"name\":\"Frontend\",\"techs\":[{\"name\":\"React.js\"},{\"name\":\"Vue.js\"}]}]",
    "certifications": "[{\"provider\":\"Udemy\",\"title\":\"JavaScript algorithms and data structures\",\"issuedOn\":\"Date\",\"expirationDate\":\"Date\",\"certificateLink\":\"https://google.com\"}]",
    "CustomerId": 1,
    "updatedAt": "2023-03-02T07:25:07.688Z",
    "createdAt": "2023-03-02T07:25:07.688Z"
}
```
_Response (403 - Forbidden):_
```json
{
    "message": "You already have your detail, please edit your detail instead"
}
```

&nbsp;


## 13. PUT /public/mydetail
_Request:_
- body
```json
{
    "fullName": "John Doe",
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
    ],
    "languages": [
        {
            "language": "English",
            "proficiency": "IELTS 7"
        }
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
            ]
        },
        {
            "name": "DepanSelesai",
            "techs": [
                {
                    "name": "React.js"
                },
                {
                    "name": "Vue.js"
                }
            ]
        }
    ],
    "certifications": [
        {
            "provider": "Udemy",
            "title": "JavaScript algorithms and data structures",
            "issuedOn": "Date",
            "expirationDate": "Date",
            "certificateLink": "https://google.com"
        }
    ]
}
```

_Response (200 - OK):_
```json
{
    "message": "Your detail updated successfully."
}
```
&nbsp;

## 14. PATCH /public/mydetail
_Response (201 - Created):_
```json
```

_Response (404 - Not Found):_
```json
{
    "message": "User not found"
}
```

## 15. POST /templates
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
    "AdminId": 1,
    "updatedAt": "2023-03-01T17:43:27.745Z",
    "createdAt": "2023-03-01T17:43:27.745Z"
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


## 16. PUT /templates/:templateId
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
    "name": "template-1",
    "image": "https://images1.com",
    "isPremium": true,
}
```
_Response (200 - OK):_
```json
{
    "message": "Template with name template-1, updated successfully."
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



## 17. PATCH /templates/:templateId
_Request params:_
```json
{
    "templateId": 1
}
```
_Request body:_
```json
{
    "status": "Inactive",
    "isPremium": true
}
```
_Response (200 - OK):_
```json
{
    "message": "template-1's status succesfully updated"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid access token"
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
