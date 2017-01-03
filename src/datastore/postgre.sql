---------------------------------------------------------------------------------
--                      Copyright (C) 2016 wystan
--
--        filename: postgre.sql
--     description: 
--         created: 2016-12-31 14:26:52
--          author: wystan
-- 
---------------------------------------------------------------------------------

drop database if exists contacts;
create database contacts;
\c contacts


-- USER
drop user if exists pg_contacts;
create user pg_contacts with createdb login password '123456';


-- TABLE
create table employees (
    id              serial not null,
    name            char(32) not null,
    department      int default 0,
    mobile          char(32) ,
    tel             char(32) ,
    mail            char(64) ,
    position        char(128) ,
    role            char(64),

    primary key(id)
);
create table departments (
    id              serial not null,
    name            char(32) not null,
    leader          int default 0 not null,

    primary key(id)
);
alter table employees owner to pg_contacts;
alter table departments owner to pg_contacts;

-- INDEX
create unique index idx_employee_id on employees (id);
create index idx_employees_name on employees (name);
create index idx_employees_depart on employees (department);

create unique index idx_departments_id on departments (id);
create index idx_departments_name on departments (name);

---------------------------------------------------------------------------------
