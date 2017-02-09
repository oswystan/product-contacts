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
	@./node_modules/mocha/bin/mocha
	@echo "<=== done"

q:
	@echo "===> list data in database ..."
	@psql contacts -c "select id, trim(name) as name, department, trim(mobile) as mobile from employees order by id asc;"
	@psql contacts -c "select * from departments order by id asc;"
	@echo "<=== done"

clean:
	@echo "===> cleaning ..."
	@rm -rf logs
	@psql -c "drop database if exists contacts;"
	@echo "<=== done"

c:
	@echo "===> cleaning data..."
	@psql contacts -c "delete from departments;"
	@psql contacts -c "delete from employees;"
	@echo "<=== done"
#######################################################################
