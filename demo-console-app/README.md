# Console App demo

This is a simplified clone of Curl that allows you got send a GET request POST request via commandline.

Curl is a commonly used client side tool for transferring data over different protocols. It can be used for much more than HTTP, in our case we're only interested in HTTP and a subset of that in addition.

## Usage

To make a HTTP GET request

<pre>
node curl.js 'url'
</pre>

For most requests, you'll back the HTML.


To make a HTTP POST request use the following command format.

<pre>
node curl.js 'path-to-json-file' 'url'
</pre>

Usually POST requests are used as part of form submission. With the response being a completion message of some kind. This is all based on how the server chooses to handle the requests.
