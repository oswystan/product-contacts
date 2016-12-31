#######################################################################
## 
##
## 
#######################################################################
.PHONY: all build

all: db

db:
	@echo "initializing database ..."
	psql -f ./datastore/postgre.sql
	psql -f ./datastore/mock_data.sql
	@echo "done"

test:
	@echo "run testcase ..."
	./test.sh
	@echo "done"

clean:
	@psql -c "drop database if exists contacts;"

#######################################################################
