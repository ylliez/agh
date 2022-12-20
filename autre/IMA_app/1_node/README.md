#  [Node.js](https://clab.concordia.ca/cart-451-node-js-intro/)

## Theory
[Node.js](https://nodejs.org/en/) is a JavaScript open source server-side platform built on Chrome’s V8 JavaScript engine. Node.js was developed by Ryan Dahl in 2009. Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications, using an asynchronous programming paradigm. Node.js also provides a rich library of various JavaScript modules which simplifies the development of web applications using Node.js to a great extent.

Examples of what it can do:
- generate dynamic page content
- create, open, read, write, delete, and close files on the server
- collect form data
- add, delete, modify data in your database
- serve and send and receieve data using various protocols (UDP, OSC, HTTP … )
- and more..

Examples of what it can be:
- Single-page apps: These are web apps that work inside a browser and don’t need to reload a page every time you use it to get new data. Some examples include social networking apps, email or map apps, online text or drawing tools, etc.
- Real-time apps: These are web apps that enable users to receive information as soon as it’s published by an author, rather than requiring that the user (or software) check a source periodically for updates. Some examples include instant messaging apps or chat rooms, online multiplayer games that can be played in the browser, online collaboration docs, community storage, video conference apps, etc.
- Data streaming apps: These are apps (or services) that send data/content as it arrives (or is created) while keeping the connection open to continue downloading further data, content, or components as needed. Some examples include video- and audio-streaming apps.
REST APIs: These are interfaces that provide data for someone else’s web app to interact with. For example, a Calendar API service could provide dates and times for a concert venue that could be used by someone else’s local events website.
- Command line tools: These allow you to automate repetitive tasks and then distribute your tool across the vast Node.js ecosystem. An example of a command line tool is cURL, which stand for client URL and is used to download content from an internet URL. cURL is often used to install things…
- Hardware programming: While not quite as popular as web apps, Node.js is growing in popularity for IoT uses, such as collecting data from sensors, beacons, transmitters, motors, or anything that generates large amounts of data. Node.js can enable data collection, analyzing that data, communicating back and forth between a device and server, and taking action based on the analysis. NPM contains more than 80 packages for Arduino controllers, raspberry pi, Intel IoT Edison, various sensors, and Bluetooth devices.

Difference w/ PHP, using a common task for a web server can be to open a file on the server and return the content to the client.
How a PHP server would do this:
- Sends the task to the computer’s (server) file system.
- Server waits while the file system opens and reads the file.
- Returns the content to the client.
- Server is now ready to handle the next request.
How a Node server would do this:
- Sends the task to the computer’s (server) file system.
- Server ready to handle the next request.
- When the file system has opened and read the file, the server returns the content to the client.
In summary, Node.js eliminates the waiting time, and simply continues with the next request. (cf JS callback)

## Practice
### Basics
Node.js is accessed through the Terminal/Command Line Interface by typing the command `node`.
Individual JS files can also be executed using node by navigating to parent folder (`cd`) then calling
```node [file_name].js```
Node package manager (npm) is used to install node programs/modules

### Express
Using the Express Module to implement local http web server. Once implemented, any client (a browser) that is on the same network as our server (e.g. WiFi, but need IP address) can type the server’s address (URL) into their web browser, and essentially make a *request* to that server --> security issues with this access. The server can then choose to *respond* – i.e. serve a particular web page to the client. **Express** is probably one of the most popular frameworks to use for this.
- Create a new project folder nodeTestExpress.
- Create JSON file to store meta data and dependencies about the project (using the *node package manager* command `npm init` in project directory)
- Install Express (using the npm command `npm install express --save` [save flag ensures that the dependency will be written to your json file.]); **do so for each project!**
- Create a new file called index.js in the root directory; this will be the main server side script.
- Define the port number where the server should run/listen for requests (can have multiple servers on local machine, each accessed using different ports); **conventionally  > 1000** to not conflict with other servers (e.g. 80 is default HTTP port).
- Create an instance of the Express object (to access the methods and properties available…): `const app = express();`
- Allow the server to listen for incoming requests on port ```app.listen(portNumber, function () {
  console.log("Server is running on port "+portNumber);
});```
- run the server script: `node index.js`; once it starts running, **it never stops!** until you press [CTRL+C]
- verify if sever is live by accessing `http://localhost:[PORT NUMBER]/` in a browser (localhost is own server)
 
The Express module is not just an HTTP Server but also by default gives you a router – meaning that you don’t have to check manually for the URL to decide what to do. Instead, you define the application’s routing with `app.get()`, `app.post()`, `app.put()`. These functions are then translated to the corresponding HTTP verbs. Next, We can specify a route using the HTTP verb get(): `app.get('/', requestHandler);` (path, then function to execute)
Now, when the client requests the default path then the requestHandler call back function is invoked – so let’s add the following:
```
function requestHandler(request,response){
// send a default response to the client...
response.send("HELLO WORLD");
 console.log(request); //built in
  console.log(response); //built  in
console.log(request.url);
}
```

### [Middleware](https://expressjs.com/en/guide/using-middleware.html)
Middleware (MW) is software that allows you to organise different routes, essentially forwarding requests to a specific function. The Express library supports the use of MW. Order in which MW gets called matters!
Pass it to Express app as .use function
Can subdivide URLs according to access

### Static pages
Static pages: ready made HTML pages, style sheets and other JavaScript libraries / scripts that need to be served to the client.
We have options here – we could use templating tools (jade, moustache,react …) -> which are currently beyond the scope of this workshop… OR, we can use another Node module to allow us to serve static pages.
Lets start by installing the needed module: `npm install node-static --save`

All client side files should be in a folder called public.

**Differentiate user request by URL!!**
Desire for user not to access html itself, make route for URL (custom name); still accessible from default URL --> incorporate error handling to prevent undue access

---

Passing vars as arguments in the URL w/ a GET request (limited & not secure)

AJAX - asynchronous JS & XML. Request protocol not requiring page reload

Fetch API: HTML 5 browser-side API (simpler, no libraries as with AJAX/jQuery); uses promises rather than callbacks


GET request

POST request
event.preventDefault(); --> prevent submission w/ default values


type of data, destination, manipulations
node.js is one framework allowing for multiple server-side constructions