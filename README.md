# MEAN stack User manager

## Pre-requis and installation
* [download](https://nodejs.org/en/download/) and install Nodejs,
* [download](https://www.mongodb.com/download-center#community) and instal MongoDb,
* [Clone](https://github.com/radonirinamaminiaina/mean-stack-user-tut.git) or [download](https://github.com/radonirinamaminiaina/mean-stack-user-tut/archive/master.zip) the project,
* Install globally angular-cli using `npm install -g angular-cli`,
* Install globally nodemon to detect change: `npm install nodemon` (*Note*: You can use forever as well).

## How to run the project
* Run `mongod.exe` to start database
* `cd client && ng serve`
* `cd ws && nodemon`
* [http://localhost:4200/](http://localhost:4200/). <br/>
After those command, the database and collections will be created automatically, then insert the document above into users collection.


## Config.js
Before starting the project, you can change the config.userAdmin according your need but keep the properties because each property matches the document into our collection. <br/>
User login: admin@admin.com <br/>
User password: @Dmin123
