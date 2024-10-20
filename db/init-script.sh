#!/bin/bash
echo '################################'
echo '###### Initializing DB #######'
echo '################################'
env | grep DB
mysql -u root -p $MYSQL_ROOT_PASSWORD <<-EOSQL
    CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;
    GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';
    FLUSH PRIVILEGES;
EOSQL