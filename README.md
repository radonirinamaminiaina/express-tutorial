# MEAN stack User manager

## Pre-requis and installation
* [download](https://nodejs.org/en/download/) and install Nodejs,
* [download](https://www.mongodb.com/download-center#community) and instal MongoDb,
* [Clone](https://github.com/radonirinamaminiaina/mean-stack-user-tut.git) or [download](https://github.com/radonirinamaminiaina/mean-stack-user-tut/archive/master.zip) the project,
* Install globally angular-cli using `npm install -g angular-cli`,
* Install globally nodemon to detect change: `npm install nodemon` (*Note*: You can use forever as well).

## How to run the project
**Create Database and collection manually**
* Run `mongod.exe` into installed folder (E.g: `C:\Program Files\MongoDB\Server\3.4\bin`)
* Create database according to the name of data base into `ws/config/config.js`
```javascript
> mongo
> use userManager
> db.createCollection('users')
```
* Run terminal and tap `mongo`, then the command bellow to create collection insert the document below:
```javascript
> db.users.insert({
    name: 'Admin',
    lastname: 'Admin',
    phone: '0123456789',
    email: 'admin@admin.com',
    passowrd: '093172142b221b76a07be51103f3de5fe699e7438f219263873e5daf5df08e1b294c921e858e6a284dda0bae06e478468b7baed84d7b2d543bc8c9addd1aed5a248717b828d6fad5ae826991e28dbbaa456fba17024590237e5de20e50b6be8f03361ea63dcb5c111ceaaccbfc945489cf2deedf786c3117a8a97f25cf062f77bae904f7aada80eda7a533d2f6df354136811a3d67ef2d66eaeb243f7fca617c1c92828d47afe6bed57d7b009367aef657fb01b3a10a71944b6601340f7f37da4c1763f16fd79b0ce5f39733393403e1ff18b4b30f4b73c990b030dbae4b49385df430250cfd225ede4a674204931e90c5eea46894f84dfff8d376de418e5fbab95e6935a8cca8a4b1de24d778911cf4d635dba1e837d335b03e76d937801f29d4ca6e5ad3b960ee1a663e86ff759f7204d0806f78757b65b118a400730353444337724928d469f7b28ccf18a7ef5f0bd87644752c066ceaee1d893fc95d6563408765eaf74a18de3861dda9b137f0b27e199323bd44a4df18f2e85a9a28f6d077473511df358225276002dd3e269fdfc2c9bef0ac68be7e4e4b3eaedf8e9c8503fa7895e7d4496af0f8ab285803d6f9803abe06172dce55bba8b9a4a045ebaa975c306763e30e1717be37442a4f448ac56abb93a532b5746f55ef130253294d5aae3e6e6a4cb7759d650e35f1a672f0d7bb1bf4426fb7cd62daaa07f85c5f17',
    role: ['admin']
})
```
*Note* : Copy and paste the document above to create admin account. The password hash and salt is generated according to the giving email and use pbkdf2 crypting (password has typo error and use passowrd).
<br/>
<br/>
**Create Database and collection automatically**
* Run `mongod.exe`
* `cd client && ng serve`
* `cd ws && nodemon`
* [http://localhost:4200/](http://localhost:4200/). <br/>
After those command, the database and collections will be created automatically, then insert the document above into users collection.

User login: admin@admin.com <br/>
User password: @Dmin123
