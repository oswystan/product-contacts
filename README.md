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
	- [ ] employess list
	- [ ] department list
	- [ ] add / modify information
	- [x] login:
		- http BASIC auth
		- guest: only query
		- admin: all that needed

- [x] forever running

```
sudo npm install forever -g
forever ./index.js
```

- [x] database backup
- [x] automated test case
- [x] https supported

## issues
- [ ] beautify the json output


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
http://$server_ip:8000/e       [GET|POST|PUT|DELETE]
http://$server_ip:8000/e/$id   [GET]
http://$server_ip:8000/d       [GET|POST|PUT|DELETE]
http://$server_ip:8000/d/$id   [GET]
http://$server_ip:8000/query   [GET]
````
