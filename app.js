const express = require("express");
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("shopping.db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//SQL queries
const findItems = "SELECT name, itemType, quantity FROM list ORDER BY name ASC;";
const findUsers = "SELECT username, role FROM users ORDER BY role ASC;";

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
app.get("*", function(req, res) {
	res.redirect("/");
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

app.get("/buildList", function(req, res) {
	const query = db.prepare(findItems);
	query.all(function(error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.get("/buildUsers", function(req, res) {
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