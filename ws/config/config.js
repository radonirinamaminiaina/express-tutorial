module.exports = {
    database: {
        domain: 'localhost',
        name: 'userManager',
        connect: function() {
            return 'mongodb://' + this.domain + "/" + this.name;
        }
    },
    tokenExpiredTime: 3600
}