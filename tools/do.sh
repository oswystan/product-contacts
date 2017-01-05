#!/usr/bin/env bash
###########################################################################
##                     Copyright (C) 2017 wystan
##
##       filename: do.sh
##    description: 
##        created: 2017-01-05 16:22:50
##         author: wystan
##
###########################################################################

backup_dir="../backup"
db="contacts"
sql="db-`date '+%Y%m%d%H%M%S'`.sql"

function do_backup() {
    echo "start backup..."
    pg_dump $db > $backup_dir/$sql
    echo "done"
}

function do_restore() {
    echo "start restore..."
    if [ ! -f $1 ]; then
        echo "ERROR: $1 does not exist, exit !!"
        return
    fi
    psql -c "create database $db"
    psql -d $db -f $1
    echo "done"
}

function usage() {
cat << !EOF
usage: 
    - do.sh backup
    - do.sh restore <backup.sql>

!EOF
}

if [ ! -d $backup_dir ]; then
    mkdir -p $backup_dir
fi

case $1 in
    "backup")
        do_backup
        ;;
    "restore")
        shift
        do_restore $1
        ;;
    *)
        usage
        ;;
esac

###########################################################################
