# antrean-covid-backend

This repository is specifically for the project backend

# Notes :

- pilih issues yang mau dikerjain, tandain issues yg dipilih (bisa lewat comment)
- abis pilih buat branch baru
- terus kalo udh selesai kerjain codingannya (dah aman) pull request

# Website :
TBA

# Routes : 
##route login
###Register
```http
    [POST] /auth/register
```
#####Requirement
	"email" = type : string 
	"password" = type : string
	"nama" = type : string
	"nik" = type : string
	"dokter" = boolean
	"idStatus" = number
  
#####Header
    key = API key

###Login
```http
    [POST] /auth/login
```
####Requirement
    "email" :  = type : string 
	"password" = type : string
	"dokter" = boolean

####Header 
    key = API key

##queue
###Addstatus
```http
    [PATCH]/api/queue/status/:id
```

####Header
    - Key = API key
    - Token = JWT 