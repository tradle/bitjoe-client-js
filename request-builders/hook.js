'use strict';

function Builder(api) {
  this._api = api;
  this._params = {};
}

/**
 *  {string} url to call back on
 */
Builder.prototype.url = function (url) {
  this._params.url = url;
  return this;
}

Builder.prototype.event = function (event) {
  this._params.event = event;
  return this;
}

Builder.prototype.execute = function (cb) {
  return this._api.post('hooks', null, this._params, cb);
}

module.exports = Builder;