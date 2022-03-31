#!/bin/bash

cd ..
./node_modules/.bin/cucumber-js -p default --world-parameters '{"driver":"mysql", "connection" : "mysql://root:pwd@localhost:3306/backend-test" }' 
#--tags @run-test