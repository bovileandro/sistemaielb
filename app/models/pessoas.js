'use strict';

var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var extend = require('mongoose-validator').extend;
var Schema = mongoose.Schema;

var pessoasSchema = new Schema({
   nome: {type: String, required:true},
   endereco:String,
   numero: String,
   bairro: String,
   complemento: String,
   cidade: String,
   cep: String,
   telefoneresidencial: String,
   telefonecelular: String,
   email: String,
   datanascimento: Date,
   databatismo: Date,
   dataconfirmacao: Date
});

pessoasSchema.path('email').validate(
  validate({
    validator: 'isMail',
    message: 'E-mail inválido'
  })
);

pessoasSchema.path('nome').validate(
  validate({
    validator: 'isLength',
    arguments: [1, 80],
    message: 'Nome inválido'
  })
);

/*pessoasSchema.path('endereco').validate(
  validate({
    validator: 'isLength',
    arguments: [1, 80],
    message: 'Endereço inválido'
  })
);*/

module.exports = mongoose.model('pessoas', pessoasSchema);