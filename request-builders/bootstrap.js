'use strict';

function Builder(api) {
  this._api = api;
  this._params = {};
}

Builder.prototype.blockHeight = function (blockHeight) {
  this._params.blockHeight = blockHeight;
  return this;
}

Builder.prototype.tail = function (num) {
  this._params.tail = num;
  return this;
}

Builder.prototype.execute = function (cb) {
  return this._api.post('bootstrap', null, this._params, cb);
}

module.exports = Builder;