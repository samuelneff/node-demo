# Console App demo

This is a simplified clone of Curl that allows you got send a GET request POST request via commandline.

Curl is a commonly used client side tool for transferring data over different protocols. It can be used for much more than HTTP, in our case we're only interested in HTTP.

## Usage

To make a HTTP GET request

<pre>
node curl.js 'url'
</pre>

For most requests, you'll back the HTML.

To make a HTTP POST request use the following command format. In this case, the application only uses JSON format for submitting data.

<pre>
node curl.js 'path-to-json-file' 'url'
</pre>

For example, the included JSON file can be used to test the included poll demo.

```javascript

{
  "poll" : {
              "title": "poll title",
              "question": "poll question"
           }
}

```

# Points to Cover

* API access to operating system (http://nodejs.org/documentation/api/)
* CLI tools
