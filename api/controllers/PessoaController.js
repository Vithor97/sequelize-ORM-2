// const database = require('../models')
// const Sequelize = require('sequelize')

const {PessoasServices} = require('../services')

const pessoaService = new PessoasServices

//const { where } = require('sequelize')

class PessoaController {
  static async pegaPessoasAtivas(req, res){
    try {
      const pessoasAtivas = await pessoaService.pegaRegistrosAtivos()
      return res.status(200).json(pessoasAtivas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTodasAsPessoas(req, res){
    try {
      const todasAsPessoas = await pessoaService.pegaTodosOsRegistros()
      return res.status(200).json(todasAsPessoas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  } 

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await pessoaService.pegaUmRegistro({id})
      return res.status(200).json(umaPessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await pessoaService.atualizaRegistro(novasInfos, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params
    try {
      await pessoaService.apagaRegistro(Number(id))
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


  static async restauraPessoa(req, res) {
    const { id } = req.params
    try {
      const registroRestaurado = await pessoaService
      .restauraRegistro(Number(id))
      return res.status(200).json(registroRestaurado)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  

  static async cancelaPessoa(req, res) {
    const {estudanteId} = req.params
    try {

        await pessoaService.cancelaPessoaEMatricula(estudanteId)
        return res.status(200).json({message: `matricula ref. estudante ${estudanteId} foi cancelada`})
    } 
    catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas(req, res) {  
    const { estudanteId } = req.params
    try {
      const matriculas = await pessoasServices
        .pegaMatriculasPorEstudante({ id: Number(estudanteId) })
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


}

module.exports = PessoaController