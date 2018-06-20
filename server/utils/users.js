class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that that was removed
        var user = this.getUser(id);

        if(user) {
            var newList = this.users.filter((user) => user.id !== id);
            this.users = newList;
        }
        
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) =>  user.room === room);
        var namesArray = users.map((user) => user.name );

        return namesArray;
    }
    
    // method still in works - will update soon
    isNameDuplicate(name, room) {
        var dupe = true;
        var users = this.getUserList(room);
        for (var i = 0; i < users.length; i++) {
            if (users[i] === name) {
                console.log('User is already here');
                return dupe;
            } 
        }

        dupe = false;
        return dupe;
    }
}

module.exports = {Users};