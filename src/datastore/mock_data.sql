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

insert into employees values(default, 'zhangsan', null, '12038479247', '8475393', 'zhangsan@xxx.com', '#1-2-304', 'SWE');
insert into employees values(default, 'lisi', null, '12038479249', '8475398', 'lisi@xxx.com', '#1-2-304', 'PM');
insert into employees values(default, 'laowang', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laoli', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laozhao', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laojia', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laolu', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laoxu', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'laopeng', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'wystan', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'sabri', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');
insert into employees values(default, 'lilei', null, '18038479249', '9475398', 'laowang@xxx.com', '#1-2-304', 'boss');


insert into departments values(default, 'RnD',  1);
insert into departments values(default, 'sales', 2);
insert into departments values(default, 'market', 2);
insert into departments values(default, 'account', 2);
insert into departments values(default, 'factory', 2);
insert into departments values(default, 'support', 2);
insert into departments values(default, 'service', 2);
insert into departments values(default, 'dep-1', 2);
insert into departments values(default, 'dep-2', 2);
insert into departments values(default, 'dep-3', 2);
insert into departments values(default, 'dep-4', 2);
insert into departments values(default, 'dep-5', 2);

update employees set department = 1 where id < 4;
update employees set department = 2 where id >= 4;
\q

---------------------------------------------------------------------------------
