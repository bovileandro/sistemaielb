'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departamentosSchema = new Schema({
   nome:String
});

module.exports = mongoose.model('departamentos', departamentosSchema);