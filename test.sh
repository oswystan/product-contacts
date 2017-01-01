#!/usr/bin/env bash

function do_employee() {
    #function_body
    curl -X GET "http://localhost:8000/e"
    echo ""
    echo "==============="
    data='{
        "name" : "wangwu",
        "department": 1,
        "mobil": "123456789",
        "tel": "12345678",
        "mail": "wangwu@xxx.com",
        "position":"#1-1-1",
        "role":"swe"
    }'
    curl -X POST -d "$data" -H "Content-Type: application/json" "http://localhost:8000/e"
    echo ""
    echo "==============="

    data='{
        "id": 4,
        "name" : "wangwuxxx",
        "department": 1,
        "mobil": "123456789",
        "tel": "12345678",
        "mail": "wangwu@xxx.com",
        "position":"#1-1-1",
        "role":"swe"
    }'
    curl -X PUT -d "$data" -H "Content-Type: application/json" "http://localhost:8000/e"
    echo ""
    echo "==============="
    curl -X DELETE -d "$data" -H "Content-Type: application/json" "http://localhost:8000/e"
    echo ""
    echo "==============="
}

function do_department() {
    curl -X GET "http://localhost:8000/d"
    echo ""
    echo "==============="

    data='{
        "id": 3,
        "name" : "marketing",
        "leader" : 1
    }'
    curl -X POST -d "$data" -H "Content-Type: application/json" "http://localhost:8000/d"
    echo ""
    echo "==============="
    data='{
        "id": 3,
        "name" : "marketing-dep",
        "leader" : 1
    }'
    curl -X PUT -d "$data" -H "Content-Type: application/json" "http://localhost:8000/d"
    echo ""
    echo "==============="
    data='{
        "id": 3
    }'
    curl -X DELETE -d "$data" -H "Content-Type: application/json" "http://localhost:8000/d"
    echo ""
    echo "==============="
}

function query() {
    data='{
        "where": "department=1",
        "orderby": "id",
        "offset": 1,
        "limit":9,
        "fields": "*",
        "tab": "employees"
    }'
    curl -X GET -d "$data" -H "Content-Type: application/json" "http://localhost:8000/query"
}

do_employee
do_department
query
