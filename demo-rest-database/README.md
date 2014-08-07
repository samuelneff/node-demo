# How it works

## Modules

Currently, there's just the users module. For this exercise, you will add Courses and Scores.

### Initialize (init)

Modules should have an init function and it should be called in app.js. Your init function should set up
the routes for your module.

### Actions

"Actions" refers to what sort of call needs to be made. It will generate a button (always) and data field
(if necessary) that will make the call and get data. If you set up the actions correctly, the buttons should
appear automatically. Don't forget to call module.getActions() in app.js.

### Routes

The modules' routes should get data and return it in JSON format. Your JSON does not have to be in any particular
format; there is no JSON parser on the front end.

## Templating

I've set up the application so you shouldn't need to mess with index.ejs. As long as you specify the actions,
it should automatically add it to the main HTML page. EJS is a templating language that functions similar to
how you would write PHP scripts on the HTML page.

# Tasks

## Courses
* Get all the Courses
* Get a Course by its ID
* Get all Active Courses

## Scores
* Get all Scores received by a User
* Get all Scores created by a User (GraderUserID)
* Get all Scores for a Course

## Extra

* Get all Scores for a specific GraderID and Course
* Get all Scores for every active Course and ScoredUserID
* Create a new module that has some common middleware
* Create a new module to run the query and package the data automatically
