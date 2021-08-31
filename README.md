# A shopping list app
This is a Web Development assignment authored by Maria Czechowicz and Jade Brennan-Keane.

## What exactly is this website?
The website lets you compile a simple shopping list. It allows you to search, add and delete items and supports profile management where different levels of users have different permissions.

## Deploy!
To install all node modules, simply run in your terminal:
```
npm i
```
After all modules are installed, run the following command

```
node app.js
```
And navigate to http://localhost:3000. 

## Credentials to use
To log in as a default account (parent) use the "user" for username and "password" for the password fields (WITHOUT the quotation marks). As a parent you will be able to add any shopping item and add new accounts.
If you log as a child account you will not be able to create new accounts or add "Sweets" to the list.

## Database
We had used a JSON file as the database due to an incompatibility between a newer version of SQLite and NodeJs. The main database file is placed under the main root of the project and is called shopping.json. 
We have left some of the SQL functions to represent that we also have an understanding of them. The SQLite file is also included along with a raw SQL file that can be used to create a database dump. 