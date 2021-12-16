# antrean-covid-backend
This repository is specifically for the project backend

# API URL
https://vaksin-server.herokuapp.com/

# Required Header
Key: API *API_KEY*

# Authorization Header (Required for accessing queue)
Authorization: Bearer *JWT_TOKEN*

# Routes
## Auth
### Register
``http
    [POST] /auth/register
``

#### Body
"email": User Email Address (String)\
"password": User Password (String)\
"nama": User Full Name (String)\
"nik": User NIK (String)\
"dokter": Set true if the user is a doctor, false if the user is a patient (Boolean)

### Login
``http
    [POST] /auth/login
``

#### Body
"email": User Email Address (String) \
"password": User Password (String)\
"dokter": Set true if the user is a doctor, false if the user is a patient (Boolean)

## Queue
### Get All Queue
``http
    [GET] /api/queue
``

### Get One Queue
``http
    [GET] /api/queue/:id_queue
``

### Get the Front Patient of a Queue
``http
    [GET] /api/queue/:id_queue/front
``


### Insert Patient to the Back of a Queue
``http
    [POST] /api/queue/:id_queue
``


### Delete the Front Patient of a Queue
``http
    [DELETE] /api/queue/:id_queue
``


### Create Queue
``http
    [POST] /api/queue
``

#### Body
"nama": Queue Name (Usually Hospital Name) (String)\
"max": Maximum people before the queue overflows


### Add Vaccine Status
``http
    [PATCH] /api/queue/status/:id_pasien
``
