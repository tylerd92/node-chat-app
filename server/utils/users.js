class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that that was removed
        const user = this.getUser(id);

        if(user) {
            let newList = this.users.filter((user) => user.id !== id);
            this.users = newList;
        }
        
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        const users = this.users.filter((user) =>  user.room === room);
        const namesArray = users.map((user) => user.name );

        return namesArray;
    }

    isNameDuplicate(name, room) {
        let dupe = true;
        const users = this.getUserList(room);
        for (let i = 0; i < users.length; i++) {
            if (users[i] === name) {
                return dupe;
            } 
        }

        dupe = false;
        return dupe;
    }
}

export default Users;