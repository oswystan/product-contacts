##TODO list
- input data valiation
    - date
    - mobile phone, tel
    - mail
    - employees.department IN departments.id
    - departments.leader IN employees.id


## FEATURES
- before delete a employee, modify the departments.leader to null.
- when delete a department, modify the employees.department to null.
- **[DONE]** make a uniform output like 

````
{
    err: , 
    err_desc: , 
    data:[]
}
````

- beautify then output
- **[DONE]** make query more flexable: fields, order by, where conditions, offset and limit  


