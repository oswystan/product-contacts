#!/usr/bin/env bash

function do_employee() {
    #function_body
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
    echo ""
    echo "==============="
    curl -X PUT -d "$data" -H "Content-Type: application/json" "http://localhost:8000/e"
    echo ""
    echo "==============="
    curl -X DELETE -d "$data" -H "Content-Type: application/json" "http://localhost:8000/e"
    echo ""
    echo "==============="
}

function do_department() {
    #function_body
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

do_employee
do_department
