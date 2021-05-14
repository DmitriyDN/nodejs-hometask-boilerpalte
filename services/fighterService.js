const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    createFighter(data){
        return FighterRepository.create(data);
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    delete(id){
        return FighterRepository.delete(id);
    }
}

module.exports = new FighterService();