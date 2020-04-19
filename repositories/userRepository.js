const { BaseRepository } = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }
}

exports.UserRepository = new UserRepository();