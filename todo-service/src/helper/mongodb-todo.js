"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var MongodbTodo = /** @class */ (function () {
    function MongodbTodo() {
        this.user = 'todo_dev';
        this.password = 'todo';
        this.dbName = 'todos';
        this.authMechanism = "SCRAM-SHA-1&authSource=" + this.dbName;
        // Connection URL
        this.url = "mongodb://" + this.user + ":" + this.password + "@localhost:27017/?authMechanism=" + this.authMechanism + "&useUnifiedTopology=true";
        this.client = new mongodb_1.MongoClient(this.url);
        this.client.connect(function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('MongoDB connected successfully');
            // client.close();
        });
    }
    MongodbTodo.prototype.addToDo = function (todo, callback) {
        var db = this.client.db(this.dbName);
        // Get the documents collection
        var collection = db.collection('todos');
        // Insert some documents
        collection.insertOne(todo, function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            if (callback)
                callback(result);
        });
    };
    return MongodbTodo;
}());
exports["default"] = MongodbTodo;
