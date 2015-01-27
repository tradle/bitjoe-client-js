'use strict';

var assert = require('assert');

function Builder(api) {
  this._api = api;
  this._params = {};
}

Builder.prototype.data = function(data) {
  this._data = data;
  return this;
}

Builder.prototype.recipients = function(pubKeys) {
  this._params.recipients = typeof pubKeys === 'string' ? pubKeys : pubKeys.join(',');
  return this;
}

Builder.prototype.setPublic = function() {
  this._params['public'] = true;
  return this;
}

Builder.prototype.cleartext = function() {
  this._params.cleartext = true;
  return this;
}

Builder.prototype.execute = function(cb) {
  assert(this._data, 'transaction request must include "data"');
  return this._api.put('transaction', this._params, this._data, cb);
}

module.exports = Builder;
