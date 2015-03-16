define(function() {
  'use strict';

  // The routes for the application. This module returns a function.
  // `match` is match method of the Router
  return function(match) {
    match('', 'landing#show');
    match('landing', 'landing#show');
    match('countries/:code', 'countries#show', {params: {componentName: 'Country'}});
    match('countries/:code/:label', 'countries#show', {params: {componentName: 'Country'}});
  };
});
