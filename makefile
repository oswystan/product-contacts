#######################################################################
## 
##
## 
#######################################################################
.PHONY: all build

all: db

db:
	@echo "===> initializing database ..."
	@psql -f ./datastore/postgre.sql
	@psql -f ./datastore/mock_data.sql
	@echo "<=== done"

test:
	@echo "===> run testcase ..."
	./test.sh
	@echo "<=== done"

q:
	@psql contacts -c "select * from employees;"
	@psql contacts -c "select * from departments;"

clean:
	@echo "===> cleaning ..."
	@psql -c "drop database if exists contacts;"
	@echo "<=== done"

#######################################################################
