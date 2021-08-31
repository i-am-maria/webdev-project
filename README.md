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
The SQLite database required for the project is included under the main root and is called shopping.db. The raw SQL file to recreate it is also included under the name shopping.sql.