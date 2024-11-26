### Django_React_Docker

## Jazzmin

you could customize the admin panel as you wish using this package, just add it to
installed apps and also paste the configuration's from readthedocs.

## Database tables and rows

you could run the following commands to visit the tables and rows in you
containerized postgresql database.

1- docker-compose up -d db ==> run the database service
2- docker-compose exec db sh ==> open a shell inside postgresql container
3- psql -U <db_user> -d <db_name> ==> connect to the database
4- use \q for quiting the shell.
