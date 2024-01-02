
@delete @all
Feature: sample karate test script

Background:
  * def apiurl = 'https://jsonplaceholder.typicode.com/posts'

Scenario: get all posts
  Given url apiurl
  And path "/1"
  When method delete
  Then status 200