"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todo_1 = require("./model/todo");
var mongodb_todo_1 = require("./helper/mongodb-todo");
var app = express_1["default"]();
var mongodb = new mongodb_todo_1["default"]();
var port = 3000;
app.get('/', function (req, res) {
    var todo = new todo_1["default"]();
    todo.titel = 'hallo';
    mongodb.addToDo(todo);
    res.send(todo);
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
