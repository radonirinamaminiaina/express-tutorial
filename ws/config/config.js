module.exports = {
    database: {
        domain: 'localhost',
        name: 'userManager',
        connect: function() {
            return 'mongodb://' + this.domain + "/" + this.name;
        }
    },
    tokenExpiredTime: 3600,
    userAdmin: {
        name: "Admin",
        lastname: "Admin",
        email: "admin@admin.com",
        passowrd: "@Dmin123",
        phone: "0123456789",
        role: ["admin"]
    }
}