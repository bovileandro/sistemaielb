'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ofertasSchema = new Schema({
	data:Date,
	valor: Number,
//	_pessoa : { type: Schema.Types.ObjectId, ref: 'pessoas' },
	_pessoa : { type: Number, ref: 'pessoas' },
	_planocontas : { type: Schema.Types.ObjectId, ref: 'planocontas' }
});

module.exports = mongoose.model('ofertas', ofertasSchema);