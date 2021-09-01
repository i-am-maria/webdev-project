const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('shopping.db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//SQL queries
const findItems = "SELECT name, itemType, quantity FROM list ORDER BY name ASC;";
const findUsers = "SELECT username, role FROM users ORDER BY role ASC;";
const deleteItem = "DELETE FROM list WHERE name = $1;";
const searchItem = "SELECT name, itemType, quantity FROM list WHERE name LIKE $1 ;";
const searchUser = "SELECT username, role FROM users WHERE username LIKE $1 ;";

app.listen(3000, function() {
	console.log("Server running on port 3000");
});

//routing
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/login.html");
});

app.get("/users", function(req, res) {
	res.sendFile(__dirname + "/users.html");
});

app.get("/index", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

//add a login/out in navbar
app.get("/loginout", function(req, res) {
	if (req.isAuthenticated()) {
		button = `<li><a href="/logout">Log out</a></li>`;
	} else {
		button = `<li><a href="/login">Log in</a></li>`;
	}
	res.status(200).json({button: button});
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get("/buildlist", function(req, res) {
	const query = db.prepare(findItems);
	query.all(function(error, rows) {
		if (error) {
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.get("/buildusers", function(req, res) {
	const query = db.prepare(findUsers);
	query.all(function(error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post("/findItem", function(req, res) {
	const value = "%" + req.body.search + "%";
	const query = db.prepare(searchItem);
	query.all(value, function(error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post("/findUser", function(req, res) {
	const value = "%" + req.body.search + "%";
	const query = db.prepare(searchUser);
	query.all(value, function(error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post("/deleteItem", function(req, res) {
    const itemName = req.body.name;
    const deleteStmt = db.prepare(deleteItem);
    deleteStmt.run(itemName);
    deleteStmt.finalize(function() {

    });

    const query = db.prepare(findItems);
    query.all(function(error, rows) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log(rows);
            res.status(200).json(rows);
        }
    });

});

app.get("*", function(req, res) {
	res.redirect("/");
});