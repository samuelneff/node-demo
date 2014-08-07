# Poll Demo

This demo demonstrates how to hook up basic CRUD with an Angular front end.

## Setup

1. Run `npm install`
2. Run `bower install`
3. Use `npm start` to run sample
4. Open a browser window and go to `http://localhost:3000`

## Demo Layout

| Folder | Description |
|-----------------|-------------------------------------|
|**\lib**		  | backend code  						|
|**\public**		  |	contains static html files			|
|**\public\js**       | frontend code  						|
|**\public\css**	  |	styling for frontend				|
|**\public\vendor**	  |	vendor javascript files				|
|**server.js** 		  |	main node entry point				|

# Points of Interest

* Ease of creating a restful API
* Use of angular routing to get URL parameters, and why it is necessary
* All data is retrieved from service calls
* Separation of layers
* Socket.IO for live updates

# Common Errors

* Angular not working or no styling? You probably forgot to do a `bower install`.
* Error regarding missing module? Run `npm install`
