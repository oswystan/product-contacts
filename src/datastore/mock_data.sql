---------------------------------------------------------------------------------
--                      Copyright (C) 2016 wystan
--
--        filename: mock_data.sql
--     description: 
--         created: 2016-12-31 14:26:33
--          author: wystan
-- 
---------------------------------------------------------------------------------

\c contacts
-- create table employees (
--     id              serial not null,
--     name            char(32) not null,
--     department      int default 0,
--     mobile          char(32) not null,
--     tel             char(32) not null,
--     mail            char(64) not null,
--     position        char(128) not null,
--     role            char(64),

--     primary key(id)
-- );
-- create table departments (
--     id              serial not null,
--     name            char(32) not null,
--     leader          int default 0 not null,

--     primary key(id)
-- );

begin;

insert into employees values(default, 'zhangsan', null, '12038479247', '8475393', 'zhangsan@xxx.com', '#1-2-304', 'SWE');
insert into employees values(default, 'lisi', null, '12038479249', '8475398', 'lisi@xxx.com', '#1-2-304', 'PM');
insert into employees values(default, 'laowang', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laoli', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laozhao', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laojia', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laolu', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laoxu', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laopeng', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');


insert into departments values(default, 'RnD',  1);
insert into departments values(default, 'sales', 2);

commit;

---------------------------------------------------------------------------------
