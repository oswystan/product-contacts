## FEATURES

- Restful API for employee ACID
	- [X] json output with paging supported
	- [X] input data valiation
	- [X] employees.department IN departments.id
	- [X] set departments.leader to null when delete this leader in employees;

- Restful API fro department ACID
	- [X] json output with paging supported
	- [X] input data valiation
		- mail, phone number
		- fileds can not be null
	- [X] department.leader MUSTBE IN employees.id
	- [X] set set employees.department to null when delete this department.

- Restful API for advanced query
	- [X] son output with paging supported
	- [X] input data valiation
	- [X] query parameters:
		- table
		- fields need to be show
		- conditions
		- orderby
		- offset & limit for paging

- Web page for ACIDs
	- [ ] employess list
	- [ ] department list
	- [ ] add / modify information
	- [ ] login:
		- http BASIC auth
		- guest: only query
		- admin: all that needed

- [ ] forever running
- [ ] database backup
- [X] automated test case
- [ ] https supported

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
