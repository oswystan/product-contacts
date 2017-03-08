## FEATURES

- Restful API for employee ACID
	- [x] json output with paging supported
	- [x] input data valiation
	- [x] employees.department IN departments.id
	- [x] set departments.leader to null when delete this leader in employees;

- Restful API fro department ACID
	- [x] json output with paging supported
	- [x] input data valiation
		- mail, phone number
		- fileds can not be null
	- [x] department.leader MUSTBE IN employees.id
	- [x] set set employees.department to null when delete this department.

- Restful API for advanced query
	- [x] son output with paging supported
	- [x] input data valiation
	- [x] query parameters:
		- table
		- fields need to be show
		- conditions
		- orderby
		- offset & limit for paging

- Web page for ACIDs
	- [x] employess list
	- [x] department list
	- [x] add / modify information
	- [x] login:
		- jwt auth only
		- guest: only query and add
		- admin: all that needed
	- [x] import data from file: csv
	- [ ] multi-language support
	- [x] select a existing leader or department when create a new department / employee.
	- [ ] avatar for each employee.

- [x] forever running

It can be run when the system bootup as a system service. It also can be respawned if it is killed or exit. 

- [x] start on system boot up

```
### add a new conf file under dir: /etc/init/contacts.conf
description "contacts server"

start on (local-filesystems and net-device-up IFACE!=lo)
stop on runlevel [!2345]

respawn
respawn limit 10 5

console none
exec /path/to/contacts/bin/start

```

- [x] database backup
- [x] automated test case
- [x] https supported
- [ ] gz compress support for data transfer
- [ ] support refreshed jwt.

## issues
- [x] beautify the json output
- [ ] refactor and reduce code size
- [x] different tab color after click it


## reference
- json output format:

````
{
    err: , 
    err_desc: , 
    data:[]
}
````

- URLs

````
http://$server_ip:8000/api/e       [GET|POST|PUT|DELETE]  #NEED AUTH
http://$server_ip:8000/api/e/$id   [GET]                  #NEED AUTH
http://$server_ip:8000/api/d       [GET|POST|PUT|DELETE]  #NEED AUTH
http://$server_ip:8000/api/d/$id   [GET]                  #NEED AUTH
http://$server_ip:8000/api/query   [GET]                  #NEED AUTH
http://$server_ip:8000/api/upload  [POST]                 #NEED AUTH
http://$server_ip:8000/api/auth    [POST]
http://$server_ip:8000/            [GET]                  
````
