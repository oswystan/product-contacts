#######################################################################
## 
##
## 
#######################################################################
.PHONY: all build

all: db

db:
	@echo "initializing database ..."
	psql -f postgre.sql
	psql -f mock_data.sql
	@echo "done"

test:
	@echo "run testcase ..."
	./test.sh
	@echo "done"

clean:
	@psql -c "drop database if exists contacts;"

#######################################################################
