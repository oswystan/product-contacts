#######################################################################
## 
##
## 
#######################################################################
.PHONY: all db test q clean

all: db q

db:
	@echo "===> initializing database ..."
	@psql -f ./datastore/postgre.sql > /dev/null
	@psql -f ./datastore/mock_data.sql > /dev/null
	@echo "<=== done"

test:
	@echo "===> run testcase ..."
	./test.sh
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

#######################################################################
