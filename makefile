#######################################################################
## 
##
## 
#######################################################################
.PHONY: all db test q clean c

all: db q

db:
	@echo "===> initializing database ..."
	@psql -f ./src/datastore/postgre.sql > /dev/null
	@psql -f ./src/datastore/mock_data.sql > /dev/null
	@echo "<=== done"

test:
	@echo "===> run testcase ..."
	@mocha
	@echo "<=== done"

q:
	@echo "===> list data in database ..."
	@psql contacts -c "select id, trim(name) as name, department, trim(mobile) as mobile from employees;"
	@psql contacts -c "select * from departments;"
	@echo "<=== done"

clean:
	@echo "===> cleaning ..."
	@psql -c "drop database if exists contacts;"
	@echo "<=== done"

c:
	@echo "===> cleaning data..."
	@psql contacts -c "delete from departments;"
	@psql contacts -c "delete from employees;"
	@echo "<=== done"
#######################################################################
