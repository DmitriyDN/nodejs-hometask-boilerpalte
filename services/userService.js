const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    createUser(data){
        return UserRepository.create(data);
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    delete(id){
        return UserRepository.delete(id);
    }
}

module.exports = new UserService();