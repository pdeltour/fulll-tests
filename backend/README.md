# setup

## basic setup


    npm install

To build typescript source code run  

    npm run build 
    

## additionnal setup for mysql


create new schema 'backend-test'
load database structure in /sql/dump.sql

update connection_uri in tools/run_tests_mysql_database.sh with correct user and password

example : mysql://root:pwd@localhost:3306/backend-test


# tests



## run tests with memory database

To run memory tests, please use

    npm test


## run test with mysql database

run

    ./tools/run_tests_mysql_database.sh

# CLI tool

The cli, when install globally match the requested interface as described [here](https://github.com/fulll/developers/blob/master/Backend/ddd-and-cqs-level-2.md)


    ./fleet create <userId> # returns fleetId on the standard output
    ./fleet register-vehicle <fleetId> <vehiclePlateNumber>
    ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]

  
This default connection uri is mysql://root:pwd@localhost:3306/backend-test. 
If you want to change the connection uri, use the --connection-uri flag

## testing the tool locally
  
run 

    node ./out/src/App/index.js create john --connection-uri mysql://root:pwd@localhost:3306/backend-test
  
## install cli globally

 run 
 
    ./tools/deploy_tool_globally.sh

   

# Architecture
![fulll-test](https://user-images.githubusercontent.com/2302696/161108135-7bcfacd0-abdd-4144-9f30-d28a67080d9e.png)

