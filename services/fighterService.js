const { FighterRepository } = require('../repositories/fighterRepository')

class FighterService {
  // TODO: Implement methods to work with fighters

  getAllFighters() {
    const fighters = FighterRepository.getAll()
    if (!fighters) {
      return null
    }
    return fighters
  }

  search(search) {
    const fighter = FighterRepository.getOne(search)
    if (!fighter) {
      return null
    }
    return fighter
  }

  create(data) {
    const fighter = FighterRepository.create(data)
    if (!fighter) {
      return null
    }
    return fighter
  }

  update({ id, updateData = {} }) {
    const fighter = FighterRepository.update(id, { ...updateData })
    if (!fighter) {
      return null
    }
    return fighter
  }

  delete(id) {
    const fighter = FighterRepository.delete(id)
    if (!fighter) {
      return null
    }
    return fighter
  }

  hasName(obj = {}) {
    for (const key in obj) {
      if (this.search({ [key]: obj[key] })) {
        return true
      }
    }
    return false
  }
}

module.exports = new FighterService()
