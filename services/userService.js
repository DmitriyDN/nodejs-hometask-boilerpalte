const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    getAllUsers() {
        const users = UserRepository.getAll();
        if (!users) {
            return null
        } 
        return users;
    }

    getOneUser(search) {
        const user = UserRepository.getOne(search);
        if (!user) {
            return null
        } 
        return user;
    }

    create(data) {
        const user = UserRepository.create(data);
        if (!user) {
            return null;
        }
        return user;
    }

    update(id, dataToUpdate) {
        const user = UserRepository.update(id, dataToUpdate);
        if (!user) {
            return null;
        }
        return user;
    }
    
    delete(id) {
        const user = UserRepository.delete(id);
        if (!user) {
            return null;
        }
        return user;
    }
}



module.exports = new UserService();