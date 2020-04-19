const { BaseRepository } = require('./baseRepository');

class FightRepository extends BaseRepository {
    constructor() {
        super('fights');
    }
}

exports.FightRepository = new FightRepository();