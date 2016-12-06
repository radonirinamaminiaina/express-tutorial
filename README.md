# MEAN stack User manager

## Pre-requis and installation
* [download](https://nodejs.org/en/download/) and install Nodejs,
* [download](https://www.mongodb.com/download-center#community) and instal MongoDb,
* [Clone](https://github.com/radonirinamaminiaina/mean-stack-user-tut.git) or [download](https://github.com/radonirinamaminiaina/mean-stack-user-tut/archive/master.zip) the project,
* Install globally angular-cli using `npm install -g angular-cli`,
* Install globally nodemon to detect change: `npm install nodemon` (*Note*: You can use forever as well).

## How to run the project
1. *Create Database and collection manually*
* Run `mongod.exe` into installed folder (E.g: `C:\Program Files\MongoDB\Server\3.4\bin`)
* Create database according to the name of data base into `ws/config/config.js`
```javascript
> mongo
> use user-database
> db.createCollection('users')
```
* Run terminal and tap `mongo`, then the command bellow to create collection insert the document below:
```javascript
> db.users.insert({
    name: 'Admin',
    lastName: 'Admin',
    email: 'admin@admin.com',
    phone: '0123456789',
    password: `d7da0bc39c8f139bd5cc10c8b71fec2e550dbdb5093e9f5d09cdae85bfafaab2d40d79a7a1a0fc
977d4118ddee5d217bcf90c0ba4a184ae2559a4aee2043e781a7cf5c804f23fe44750532a8eb7077
1f8a0fc5316321e6d9a47b7ab3d1877e652005e7bdae75d6bb8e7a13d67acc69e11228dcf569d521
a8b28b2e8d54e40bf3f47d86e6a4e0c88fec45d88371a57c7162dae6c6004cbeb34b77679e70fd1a
c0cc0dce43c3a4f1bc4eff866dc7002a9b242341e8425cdbfff30b807a07a8f0529d9fa46c8b5426
8fa13c6c2723e75fcd42acc9b77fc3641b71cc1d66fe6d33543d1d2707551761a3f4a6c1bfaf20e3
e9351cbf3630d7ff192bf9c33d37bbab4788e00c09be512ef098597db559f51a9a933251bc8e9342
1cf8e74718771f35c538763beaac02f865de1160a78bdaf49fe9ec5c51f5533c635bf163d913ff56
257a3d13e3b18c734eeb6a9e500bd354d0a4ab038d5c6859e9aba0fd7d828ba986d532938bf60a65
b8774b482dce8e42ea7fe9ba1c87a2765d7babe302c5fd9fbc7ed99de6ac7b9f68750348473a5eaf
d447fba346381990c226cfe0e2784133d6b20e316503c204e17a92bb96e81d5104575af56f9f000e
067bc710463ddd8038bc322cade030bd9b30a0af9602d88e37f359512c02282b71d356f7c083636e
91cf2bf55cec452abf1960b048019b2dd27747a5a02ded4f3f9ce356c3136aa8b6`,
    role: ['admin']
})
```
*Note* : I advise you to copy and pass the insertion.
2. *Create Database and collection automatically*
* Run `mongod.exe`
* `cd client && ng serve`
* `cd ws && nodemon`
* [http://localhost:4200/](http://localhost:4200/)
After those command, the database and collections will be created automatically, then insert the data above into users collection.

User login: admin@admin.com <br/>
User password: @Dmin123
