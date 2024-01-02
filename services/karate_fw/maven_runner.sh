#!/bin/bash
mvn -q clean test-compile > /dev/null 2>&1
mvn -q test -Dtest=TestRunner > /dev/null 2>&1
export MAVEN_OPTS="-Dlogback.configurationFile=logback.xml"
