@get @all
Feature: sample karate test script

Background:
  * def apiurl = 'https://jsonplaceholder.typicode.com/posts'

Scenario: get all posts
  Given url apiurl
  When method get
  Then status 200