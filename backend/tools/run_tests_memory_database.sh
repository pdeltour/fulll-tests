#!/bin/bash

cd ..
./node_modules/.bin/cucumber-js -p default --world-parameters '{"driver":"memory"}'