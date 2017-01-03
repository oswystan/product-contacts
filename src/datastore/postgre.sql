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
    department      int default null,
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
    leader          int default null,

    primary key(id)
);
alter table employees owner to pg_contacts;
alter table departments owner to pg_contacts;


-- triggers
create or replace function check_eid() returns trigger as $$
declare
    rec record;
    cur cursor for select count(id) as cnt from employees where id = new.leader;

begin
    if new.leader is null then
        return new;
    end if;
    if  tg_op = 'UPDATE' and new.leader = old.leader then
        return new;
    end if;

    open cur;
    fetch cur into rec;
    if rec.cnt <= 0 then
        close cur;
        raise exception 'can not found employee with id=%', new.leader;
    end if;
    close cur;

    return new;

end;
$$ language plpgsql;

create or replace function check_did() returns trigger as $$
declare
    rec record;
    cur cursor for select count(id) as cnt from departments where id = new.department;

begin
    if new.department is null then
        return new;
    end if;
    if  tg_op = 'UPDATE' and new.department = old.department then
        return new;
    end if;

    open cur;
    fetch cur into rec;
    if rec.cnt <= 0 then
        close cur;
        raise exception 'can not found employee with id=%', new.department;
    end if;
    close cur;

    return new;

end;
$$ language plpgsql;

create or replace function update_leader() returns trigger as $$
begin
    update departments set leader = null where leader = old.id;
    return old;
end;
$$ language plpgsql;

create or replace function update_department() returns trigger as $$
begin
    update employees set department = null where department = old.id;
    return old;
end;
$$ language plpgsql;

create trigger check_eid before insert or update on departments
    for each row execute procedure check_eid();

create trigger check_did before insert or update on employees
    for each row execute procedure check_did();

create trigger update_leader after delete on employees
    for each row execute procedure update_leader();

create trigger update_department after delete on departments
    for each row execute procedure update_department();

-- INDEX
create unique index idx_employee_id on employees (id);
create index idx_employees_name on employees (name);
create index idx_employees_depart on employees (department);

create unique index idx_departments_id on departments (id);
create index idx_departments_name on departments (name);

\q
---------------------------------------------------------------------------------
