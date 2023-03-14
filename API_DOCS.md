# Restaurant API Documentation

## Endpoints:

List of available endpoints :

1. `POST /register`
2. `POST /login`
3.  `GET/verify/:uniqueString`
4. `POST /public/register`
5. `POST /public/login`
6. `POST /public/google-login`
7. `POST /public/linkedin-login`
8. `GET /templates`

Routes below need authentication :

8. `POST /public/mytemplates/:templateId`
9. `GET /public/mytemplates`
10. `GET /templates/:templateId`
11. `GET /public/mydetail`
12. `POST /public/mydetail`
13. `PUT /public/mydetail`
14. `PATCH /pubilc/mydetail`
15. `POST /payment`
16. `READ /payment`
15. `15. POST /templates`
16. `PUT /templates/:templateId`
17. `PATCH /templates/:templateId`
18. `18. POST /templates/upload-images`
19. `GET /users/linkedin-request-auth`
20. `POST /users/linkedin-user-auth`
21. `POST /users/me`
22. `POST /users/getemail`
23. `POST /users/loginOrRegister`

Routes below need authentication & authorization :

17. `POST /templates`
18. `PUT /templates/:templateId`
19. `PATCH /templates/:templateId`

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
    "message": "You already have your detail, you can edit it instead"
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
_Response (404 - Not Found):_
```json
{
    "message": "You don't have your detail yet, please create one"
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
    {
        "message": "Please insert template name"
    },
    // OR
    {
        "message": "Please insert template image"
    },
    // OR
    {
        "message": "Please insert template premium status"
    },
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
_Response (404 - Not found):_
```json
{
    "message": "Template not found"
}
```

## 18. POST /payment
Response (201 - Created):_
```json
{
    {
    "id": "640444cf63bf9b4eaeeedc56",
    "external_id": "1",
    "user_id": "6403605c456fbecb3aff51c5",
    "status": "PENDING",
    "merchant_name": "creativitae",
    "merchant_profile_picture_url": "https://du8nwjtfkinx.cloudfront.net/xendit.png",
    "amount": 15000,
    "payer_email": "alfianelsaarief@gmail.com",
    "description": "Get Premium",
    "expiry_date": "2023-03-06T07:29:19.955Z",
    "invoice_url": "https://checkout-staging.xendit.co/web/640444cf63bf9b4eaeeedc56",
    "available_banks": [
        {
            "bank_code": "MANDIRI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BRI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BNI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "PERMATA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BCA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "SAHABAT_SAMPOERNA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "CIMB",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BSI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BJB",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        }
    ],
    "available_retail_outlets": [
        {
            "retail_outlet_name": "ALFAMART"
        },
        {
            "retail_outlet_name": "INDOMARET"
        }
    ],
    "available_ewallets": [
        {
            "ewallet_type": "OVO"
        },
        {
            "ewallet_type": "DANA"
        },
        {
            "ewallet_type": "SHOPEEPAY"
        },
        {
            "ewallet_type": "LINKAJA"
        },
        {
            "ewallet_type": "ASTRAPAY"
        }
    ],
    "available_qr_codes": [
        {
            "qr_code_type": "QRIS"
        }
    ],
    "available_direct_debits": [
        {
            "direct_debit_type": "DD_BRI"
        }
    ],
    "available_paylaters": [
        {
            "paylater_type": "KREDIVO"
        },
        {
            "paylater_type": "UANGME"
        },
        {
            "paylater_type": "AKULAKU"
        },
        {
            "paylater_type": "ATOME"
        }
    ],
    "should_exclude_credit_card": false,
    "should_send_email": true,
    "success_redirect_url": "http://localhost:5173/",
    "failure_redirect_url": "http://localhost:5173/",
    "created": "2023-03-05T07:29:20.717Z",
    "updated": "2023-03-05T07:29:20.717Z",
    "currency": "IDR",
    "customer": {
        "given_names": "alfian",
        "surname": "alfian",
        "email": "alfianelsaarief@gmail.com",
        "mobile_number": "+6281665577"
    },
    "customer_notification_preference": {
        "invoice_created": [
            "email"
        ],
        "invoice_reminder": [
            "email"
        ],
        "invoice_expired": [
            "email"
        ],
        "invoice_paid": [
            "email"
        ]
    }
}
}
```

_Response (400 - Bad Request):_
```json
{
    "status": 400,
    "code": "API_VALIDATION_ERROR",
    "message": "Invalid input data. Please check your request"
}
```

## 19. GET /payment
_Response (200 - OK):_
```json
{
    "id": "640442c7ec41c6969b41386b",
    "external_id": "1",
    "user_id": "6403605c456fbecb3aff51c5",
    "payment_method": "EWALLET",
    "status": "PAID",
    "merchant_name": "creativitae",
    "merchant_profile_picture_url": "https://du8nwjtfkinx.cloudfront.net/xendit.png",
    "amount": 15000,
    "paid_amount": 15000,
    "paid_at": "2023-03-05T07:30:13.223Z",
    "payer_email": "alfianelsaarief@gmail.com",
    "description": "Get Premium",
    "expiry_date": "2023-03-06T07:20:39.316Z",
    "invoice_url": "https://checkout-staging.xendit.co/web/640442c7ec41c6969b41386b",
    "available_banks": [
        {
            "bank_code": "MANDIRI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BRI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BNI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "PERMATA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BCA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "SAHABAT_SAMPOERNA",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "CIMB",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BSI",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        },
        {
            "bank_code": "BJB",
            "collection_type": "POOL",
            "transfer_amount": 15000,
            "bank_branch": "Virtual Account",
            "account_holder_name": "CREATIVITAE",
            "identity_amount": 0
        }
    ],
    "available_retail_outlets": [
        {
            "retail_outlet_name": "ALFAMART"
        },
        {
            "retail_outlet_name": "INDOMARET"
        }
    ],
    "available_ewallets": [
        {
            "ewallet_type": "OVO"
        },
        {
            "ewallet_type": "DANA"
        },
        {
            "ewallet_type": "SHOPEEPAY"
        },
        {
            "ewallet_type": "LINKAJA"
        },
        {
            "ewallet_type": "ASTRAPAY"
        }
    ],
    "available_qr_codes": [
        {
            "qr_code_type": "QRIS"
        }
    ],
    "available_direct_debits": [
        {
            "direct_debit_type": "DD_BRI"
        }
    ],
    "available_paylaters": [
        {
            "paylater_type": "KREDIVO"
        },
        {
            "paylater_type": "UANGME"
        },
        {
            "paylater_type": "AKULAKU"
        },
        {
            "paylater_type": "ATOME"
        }
    ],
    "should_exclude_credit_card": false,
    "should_send_email": true,
    "success_redirect_url": "http://localhost:5173/",
    "failure_redirect_url": "http://localhost:5173/",
    "created": "2023-03-05T07:20:40.065Z",
    "updated": "2023-03-05T07:31:16.687Z",
    "currency": "IDR",
    "payment_channel": "DANA",
    "payment_id": "ewc_5445d440-c0d0-4c40-9b58-f9a17ebbef9c",
    "payment_method_id": "pm-140c7ac2-0308-44a9-989e-e4cef0412c61",
    "customer": {
        "given_names": "alfian",
        "surname": "alfian",
        "email": "alfianelsaarief@gmail.com",
        "mobile_number": "+6281665577",
        "customer_id": "a82621a3-8f7a-4731-a2f6-af34715128d6"
    },
    "customer_notification_preference": {
        "invoice_created": [
            "email"
        ],
        "invoice_reminder": [
            "email"
        ],
        "invoice_expired": [
            "email"
        ],
        "invoice_paid": [
            "email"
        ]
    }
}
```

_Response (404 - Bad Request):_
```json
{
    "status": 404,
    "code": "INVOICE_NOT_FOUND_ERROR",
    "message": "Invoice ID 640442c7ec41c6969b41386 is invalid or not found. Please try again with a valid ID."
}
```


## 18. POST /templates/upload-images

_Response (201 - Created):_
```json
{
    "message": "images uploaded succesfully",
    "data": [
        {
            "url": "http://res.cloudinary.com/dtaetrd2d/image/upload/v1678091918/Images/lau2afbnzkhhbr7jg8pa.png",
            "id": "Images/lau2afbnzkhhbr7jg8pa"
        }
    ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Image too large, please use image with 1mb size"
}, // or
{
  "message": "Unsupported file format, please use file with format png/jpeg"
}

```

## 19. GET /users/linkedin-request-auth

_Response (200 - OK):_
```json
{
    "url": "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86o3pfdquzum55&scope=r_emailaddress%20r_liteprofile&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallbacks&state=3d859"
}
```

## 20. POST /users/linkedin-user-auth

_Request body:_
```json
{
  "code": "AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k  "  
}
```

_Response (200 - OK):_
```json
{
    "access_token": "AQVKshL9Jq6YqUxPzpW64QhnU-fYF3dRydcMGJMSAVSctaYkN8QuNoGRgOMekfP6vlcpad4x0JV5_k2puvs1xbQfgpC04HweoDbixk1lzqGRcIMioZo_baYU3VrJCnw36IrsejA_Dr7Xf6UX9xu__uQ791mPO404GuCfdGl9yY7o6jT1b9oySghoJlTNLvqJ-BTCU4gT8U7ye-lqfElH3vYz8syMVAkOHV0LpuZMct7x2g_CpWvImQfV1_pTPv1nWG3ABCg7FeeCWCH4RgRFl5qiWjk267tNE32aBX9dbXcy3J1KpVdky6OxZjdt4sj_4g9AH72x14ajIfiT2m4_vMJcSlH0mw",
    "expires_in": 5183999,
    "scope": "r_emailaddress,r_liteprofile"
}
```

## 21. POST /users/me

_Request body:_
```json
{
  "code": "AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k"  
}
```

_Response (200 - OK):_
```json
{
    "username": "Mess Opposite"
}
```

## 22. POST /users/getemail

_Request body:_
```json
{
  "code": "AQRuR3C4qjTs3V0oyT4thzU-HX0NyIN3-93Mx6CtFrVlCgnr-QhJWauRYwTRtCq-PMLTdcEQA94NDysx6IpMUOd-xyj2R1T0pWbEQfiJ40UGkWNIUjlr5RhTkQmL01-CzCXGHh0xMCBN3wNFbjEd4clqcs51nIO724SiEJeckn0ttXEfoFQeelh_1leAMtqFX9HnKlUI9171x8qSE2k"  
}
```

_Response (200 - OK):_
```json
{
    "email": "wahyunanandika@gmail.com"
}
```

## 23. POST /users/loginOrRegister

_Request body:_
```json
{
  "username": "Mess opposite",
  "email": "wahyunanandika@gmail.com"
}
```

_Response (200 - OK):_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3YWh5dW5hbmFuZGlrYUBnbWFpbC5jb20iLCJpYXQiOjE2NzgxMDI1NTd9.q8nyQILU9MHRwE2R3tYmXO9327-EkSILQ1GG_MJ3r5A",
  "id": 1,
  "username": "Mess opposite",
  "email": "wahyunanandika@gmail.com"
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
