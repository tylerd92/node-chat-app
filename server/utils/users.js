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
        var users = this.getUserList(room);
        //console.log(users);
        if (users.length > 0) { 
            
           for(var i = 0; i < users.length; i++) {
               if(users[i].name !== name) {
                  return true;
               }
               return false;
           }
           
           
        } else { // if the user list is empty
            return false;
        }
    }
}

module.exports = {Users};