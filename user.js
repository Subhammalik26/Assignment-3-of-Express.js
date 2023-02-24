const express = require('express');   // Include the HTTP module.
const bodyParser = require('body-parser');   // Include the body-parser module.
const path = require('path');   // Include the path module.
const fs = require('fs');    // Include the File System module.

const user = express();  // Creates an instance of the express() function and assigns it to a constant variable user.

user.use(express.static('public'));   // serve static files from the "public" directory. 
user.use(bodyParser.urlencoded({ extended: false }));  // Parsing the URL-encoded data.
// Define the middleware function
function myMiddleware(req, res, next) {
  console.log("Middleware function called!");
  // Call the next middleware function or route handler
  next();
}
// Assign middleware to the routes
user.use("/", myMiddleware);
user.use("/create", myMiddleware);
user.use("/users", myMiddleware);

// Home page with greeting text.
user.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/index.html');  // Serve index.html file from the "public" directory to the index page.
});
// Create page 
user.get('/create', (req, res) => {             
  res.sendFile(__dirname + '/Public/create.html');  // Serve create.html file from the "public" directory to the create page.
});
// Call POST request to "/add" and store user name in a text file.
user.post('/add', (req, res) => {
  const userName = req.body.userName;
  fs.appendFile('users.txt', userName + '\n', err => {   // Store the data in a text file.
    if (err) throw err; 
      res.redirect('/create');    // After storing the data redirect to "create" route.
  });
});
// User page 
user.get('/users', (req, res) => {
  res.sendFile(__dirname + '/Public/users.html');  // Serve users.html file from the "public" directory to the users page.
});
// Spin Node.js server on port 3030.
user.listen(3030, () => {
  console.log('Server listening on port 3030!');
});