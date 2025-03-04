import {expect} from 'chai';
import Users from './users.js';

describe('Users', () => {
    let users;

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
            name: 'Mike',
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
        expect(users.users).to.eql([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('2');
        expect(user.name).to.equal('Jen');
        expect(users.users.length).to.equal(4);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('6');
        expect(user).to.be.undefined;
        expect(users.users.length).to.equal(5);
    });

    it('should find user', () => {
        var user = users.getUser('3');
        expect(user.name).to.equal('Julie');
    });

    it('should not find user', () => {
        var user = users.getUser('6');
        expect(user).to.be.undefined;
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).to.eql(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).to.eql(['Jen']);
    });

    it('should return true for Jack', () => {
        expect(users.isNameDuplicate('Jack', 'Typescript Course')).to.equal(true);
    });

    it('should return false for Tyler', () => {
        expect(users.isNameDuplicate('Tyler', 'React Course')).to.equal(false);
    });
});