@post @all
Feature: sample karate test script

Background:
  * def apiurl = 'https://jsonplaceholder.typicode.com/posts'
  * def requestPayload =
  """
  {
     "title": "abc",
     "body": "abc body",
     "userID": 1010
  }
  """
Scenario: get all posts
  Given url apiurl
  And request requestPayload
  When method post
  Then status 201