# Next.js (React) + Redux + Express REST API + Postgres SQL boilerplate

## Why is this awesome?

This is a great starting point for a any project where you want **React + Redux** (with server-side rendering, powered by [Next.js](https://github.com/zeit/next.js)) as frontend and **Express/Postgres** as a REST API backend.
Lightning fast, all JavaScript.

* Simple REST routes with [`sql-wizard`](https://github.com/tomsoderlund/sql-wizard)
* Flexible client-side routing with `next-routes` (see `server/routes.js`)
* Flexible configuration with `config/config.js` and `.env` files
* Hot reloading with `nodemon`
* JWT authentication (coming)

## Demo

See [**nextjs-sql-rest-api-boilerplate** running on Heroku here](https://nextjs-sql-rest-api.herokuapp.com/).

![nextjs-sql-rest-api-boilerplate demo on Heroku](docs/demo.gif)

## How to use

Clone this repository:

	git clone https://github.com/tomsoderlund/nextjs-sql-rest-api-boilerplate.git [MY_APP]

Install dependencies:

	cd [MY_APP]
	yarn  # or npm install

Install Postgres and set up the database:

	psql postgres
	CREATE DATABASE "nextjs-sql-rest-api-boilerplate";  -- You can also use \connect to connect to existing database
	CREATE TABLE kitten (id serial, name text);  -- Create a blank table
	INSERT INTO kitten (name) VALUES ('Sphynxie');  -- Add example data
	SELECT * FROM kitten;  -- Check data exists
	\q

Start it by doing the following:

	export DATABASE_URL=[your Postgres URL]
	yarn dev

In production:

	yarn build
	yarn start

If you navigate to `http://localhost:3123/` you will see a [Next.js](https://github.com/zeit/next.js) page with a list of kittens (or an empty list if you haven't added one).

You have your API server running at `http://localhost:3123/api/kittens`


## Deploying

### Deploying on Heroku

	heroku create [MY_APP]
	heroku addons:create heroku-postgresql:hobby-dev
	git push heroku master

### Deploying on Now

(Coming)
