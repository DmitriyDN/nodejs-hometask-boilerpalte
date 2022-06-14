const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAllFighters() {
        const fighters = FighterRepository.getAll();
        if (!fighters) {
            return null
        } 
        return fighters;
    }
    getOneFighter(search) {
        const fighter = FighterRepository.getOne(search);
        if (!fighter) {
            return null
        } 
        return fighter;
    }
    create(data) {
        const fighter = FighterRepository.create(data);
        if (!fighter) {
            return null;
        }
        return fighter;
    }
    update(id, dataToUpdate) {
        const fighter = FighterRepository.update(id, dataToUpdate);
        if (!fighter) {
            return null;
        }
        return fighter;
    }
    delete(id) {
        const fighter = FighterRepository.delete(id);
        if (!fighter) {
            return null;
        }
        return fighter;
    }
    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();