const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(where){
        return database[this.nomeDoModelo].findOne({ where: { ...where } })
    }

    async criaRegistro(dados){
        return database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dadosAtualizado, id, transacao = {}){

        return database[this.nomeDoModelo]
                .update(dadosAtualizado, {where: {id: id}}, transacao)
    }

    async atualizaRegistros(dadosAtualizado, where, transacao = {}){

        return database[this.nomeDoModelo]
                .update(dadosAtualizado, { where: {...where } }, transacao)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
      }
    
      async consultaRegistroApagado(id) {
        return database[this.nomeDoModelo]
          .findOne({ paranoid: false, where: { id: Number(id) } })
      }
    
      async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo]
          .findAndCountAll({ where: { ...where }, ...agregadores })
      }
    
}

module.exports = Services;