// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var search = req.query.task;
   var empty;
   console.log(search);
   for (var i = 0; i < todos.length; i++){
     if (search === todos[i].task){
       console.log("found it");
       empty.push(todos[i].task);
     }
     console.log(empty);
   }
    // res.json(todos);
    res.json(empty);
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newTodo = req.body;
   if (todos.length > 0){
     newTodo._id = todos[todos.length - 1]._id + 1;
   } else {
     newTodo._id = 1;
   }
     todos.push(newTodo);
     res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   //res.json({todos: '_id'});
   for (var i = 0; i < todos.length; i++){
     if (req.params.id == todos[i]._id){
       res.json(todos[i]);
     };
   }
  //  var todoId = parseInt(req.params.id);
  //  res.json({todos: '_id'} + todoId);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var updateTodo = req.body;
   var updateId = req.params.id;
   for (var i = 0; i < todos.length; i++){
     if (updateId == todos[i]._id){
       updateTodo._id = todos[i]._id;
       todos[i] = updateTodo;
       console.log("update");
     }
   }
   res.json(updateTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   for (var i = 0; i < todos.length; i++){
     if (req.params.id == todos[i]._id){
       todos.splice(i , 1);
       console.log(i)
     } else {
       console.log("Didnt Work");
     }
     res.json("Success");
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
