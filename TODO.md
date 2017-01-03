## FEATURES

- Restful API for employee ACID
	- json output 
	- input data valiation
	- employees.department IN departments.id
	- set departments.leader to null when delete this leader in employees;

- Restful API fro department ACID
	- json output with paging supported
	- input data valiation
		- mail, phone number
		- fileds can not be null
	- department.leader MUSTBE IN employees.id
	- set set employees.department to null when delete this department.

- Restful API for advanced query
	- json output with paging supported
	- input data valiation
	- query parameters:
		- table
		- fields need to be show
		- conditions
		- orderby
		- offset & limit for paging

- Web page for ACIDs
	- employess list
	- department list
	- add / modify information
	- login:
		- guest: only query
		- admin: all that needed
- forever running
- database backup
- automated test case;

## issues
- beautify the json output


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
