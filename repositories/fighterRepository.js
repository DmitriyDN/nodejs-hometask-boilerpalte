const { BaseRepository } = require('./baseRepository');

class FighterRepository extends BaseRepository {
    constructor() {
        super('fighters');
    }
}

exports.FighterRepository = new FighterRepository();