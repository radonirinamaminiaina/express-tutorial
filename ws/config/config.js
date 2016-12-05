module.exports = {
    database: {
        domain: 'localhost',
        name: 'user-database',
        connect: function() {
            return 'mongodb://' + this.domain + "/" + this.name;
        }
    },
    tokenExpiredTime: 3600
}