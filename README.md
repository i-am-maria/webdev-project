# A shopping list app
This is a Web Development assignment authored by Maria Czechowicz and Jade Brennan-Keane.

## What exactly is this website?
The website lets you compile a simple shopping list. It allows you to search, add and delete items.

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
To log in as a default account (parent) use the "user" for username and a "password" for password (WITHOUT the quotation marks). 
If you are not logged in, you will only be allowed to access the shopping list but you won't be able to add new items.
You can check if you're logged in by checking if the text on the navbar says "Log in" or "Log out".

## Database
The SQLite database required for the project is included under the main root and is called shopping.db. The raw SQL file to recreate it is also included under the name shopping.sql.