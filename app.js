const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require("express-validator");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('shopping.db');

const bcrypt = require('bcrypt');
const saltRounds = 9;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//SQL queries
const findItems = "SELECT name, itemType, quantity FROM list ORDER BY name ASC;";
const findUsers = "SELECT username, role FROM users ORDER BY role ASC;";
const deleteItem = "DELETE FROM list WHERE name = $1;";
const searchItem = "SELECT name, itemType, quantity FROM list WHERE name LIKE $1 ;";
const searchUser = "SELECT username, role FROM users WHERE username LIKE $1 ;";
const findItemByName = "SELECT name FROM list WHERE name LIKE $1 ;";
const findUserByName = "SELECT username, password FROM users WHERE username LIKE $1";
const insertItem = 'INSERT INTO list VALUES (name, itemType, quantity) VALUES ($1, $2, $3);';

app.use(session({
    secret: "C18764491",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
    const query = db.prepare(findUserByName);
    query.get(username, function(error, row) {
        if (error) { return err;}
        if (!row) { return done(null, false, { message: "User not found! Please check credentials." }); }
        bcrypt.compare(password, row.password, function(err, res) {
            if (res == true) done(null, { id: row.username });
            else return done(null, false, { message: "The password was incorrect." });
        });
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const query = db.prepare(findUserByName);
    query.get(id, function(err, row) {
        done(err, row);
    });
});

app.post("/login", [
	body("username").isLength({min: 3, max: 50}),
	body("password").isLength({min: 8, max: 50})
],
function(req, res, next) {
	const validErrors = validationResult(req)
	if (!validErrors.isEmpty()) {
		console.log(validErrors.array());
		res.status(400).json({errors: validErrors.array()});
	} else {
		passport.authenticate("local", function(err, user, info) {
			if (err) {
				console.log(err);
				return next(err);
			}
			if (!user) {
				console.log(info);
				return res.redirect("/login");
			}
			req.logIn(user, function(err) {
				if (err) {
					console.log(err);
					return next(err);
				}
				return res.redirect("/index");
			});
		})(req, res, next);
	}
}
);

app.listen(3000, function () {
	console.log("Server running on port 3000");
});

//routing
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/login.html");
});

app.get("/users", function (req, res) {
	res.sendFile(__dirname + "/users.html");
});

app.get("/index", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

function isAuthenticated() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}

//add a login/out in navbar
app.get("/loginout", function (req, res) {
	if (req.isAuthenticated()) {
		navtext = `<li><a href="/logout">Log out</a></li>`;
	} else {
		navtext = `<li><a href="/login">Log in</a></li>`;
	}
	res.status(200).json({ navtext:navtext });
});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.get("/buildlist", function (req, res) {
	const query = db.prepare(findItems);
	query.all(function (error, rows) {
		if (error) {
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.get("/buildusers", function (req, res) {
	const query = db.prepare(findUsers);
	query.all(function (error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post("/findItem", function (req, res) {
	const value = "%" + req.body.search + "%";
	const query = db.prepare(searchItem);
	query.all(value, function (error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post("/findUser", function (req, res) {
	const value = "%" + req.body.search + "%";
	const query = db.prepare(searchUser);
	query.all(value, function (error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			res.status(200).json(rows);
		}
	});
});

app.post('/addItem', [
	body('name').isLength({ min: 3, max: 50 }),
	body('itemType').isLength({ min: 3, max: 50 }),
	body('quantity').isInt(),
	],
	function (req, res) {

		const name = req.body.name;
		const itemType = req.body.itemType;
		const quantity = req.body.quantity;
		console.log(`Adding: ${name} ${itemType}, ${quantity}`);

		const nameQuery = db.prepare(findItemByName);
		nameQuery.get(name, function (error, rows) {
			if (error) {
				console.log(error);
				res.status(400).json({ error: "Unknown error has occured."});
			} else {
				if (rows) {
					const errorMsg = 'Item already on the list.';
					console.log(errorMsg);
					res.status(400).json({ error: errorMsg });
				} else {
					const insert = db.prepare(insertItem);
					insert.run(name, itemType, quantity);
					insert.finalize(function (error) {
						if (error) {
							console.log(error);
							res.status(400).json({ error: unknownError });
						} else {
							res.status(200).json({});
						}
					});
				}
			}
		});
	});

app.post("/deleteItem", function (req, res) {
	const itemName = req.body.name;
	const deleteStmt = db.prepare(deleteItem);
	deleteStmt.run(itemName);
	deleteStmt.finalize(function () {

	});

	const query = db.prepare(findItems);
	query.all(function (error, rows) {
		if (error) {
			console.log(error);
			res.status(400).json(error);
		} else {
			console.log(rows);
			res.status(200).json(rows);
		}
	});

});

app.get("*", function (req, res) {
	res.redirect("/");
});