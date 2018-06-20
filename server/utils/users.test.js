const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, 
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        },
        {
            id: '4',
            name: 'Jack',
            room: 'Typescript Course'
        },
        {
            id: '5',
            name: 'Jack',
            room: 'Typescript Course'
        },
        ]
    });

    it ('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Tyler',
            room: 'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('2');
        expect(user.name).toBe('Jen');
        expect(users.users.length).toBe(4);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('6');
        expect(user).toNotExist();
        expect(users.users.length).toBe(5);
    });

    it('should find user', () => {
        var user = users.getUser('3');
        expect(user.name).toBe('Julie');
    });

    it('should not find user', () => {
        var user = users.getUser('6');
        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });

    // it('should return true for Jack', () => {
    //     console.log('Jack' === 'Jack');
    //     expect(users.isNameDuplicate('Jack', 'Typescript Course')).toExist();
    // });

    // it('should return false for Tyler', () => {
    //     expect(users.isNameDuplicate('Tyler', 'React Course')).toNotExist();
    // });
});