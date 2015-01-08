
'use strict';

var querystring = require('querystring');
var request = require('request');
// var utils = require('tradle-utils');
var TransactionReqBuilder = require('request-builders/transaction');
var HookReqBuilder = require('request-builders/hook');
var BootstrapReqBuilder = require('request-builders/bootstrap');
var noop = function() {};

function BitJoeAPI(config) {
  if (typeof config === 'string') {
    var parts = config.split(':');
    this._host = parts[0];
    this._port = parts[1];
  }
  else {
    this._host = config.host;
    this._port = config.port;
  }
}

BitJoeAPI.prototype.baseUrl = function() {
  var protocol = this._host.indexOf('://') === -1 ? 'http://' : '';
  return protocol + this._host + ':' + this._port + '/';
}

BitJoeAPI.prototype.transaction = function() {
  return new TransactionReqBuilder(this);
}

BitJoeAPI.prototype.hook = function() {
  return new HookReqBuilder(this);
}

BitJoeAPI.prototype.bootstrap = function() {
  return new BootstrapReqBuilder(this);
}

BitJoeAPI.prototype.put = function(method, queryParams, data, callback) {  
  request({
    method: 'PUT',
    body: data,
    url: this.url(method, queryParams)
  }, callback || noop);
}

BitJoeAPI.prototype.post = function(method, queryParams, body, callback) {  
  request({
    method: 'POST',
    body: body,
    url: this.url(method, queryParams)
  }, callback || noop);
}

BitJoeAPI.prototype.url = function(method, queryParams) {
  var url = this.baseUrl() + method;
  if (queryParams && Object.keys(queryParams).length)
    url += '?' + querystring.stringify(queryParams || {});

  return url;
}

module.exports = BitJoeAPI;