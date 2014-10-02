import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - Home Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function() {
  visit('/').then(function() {
    ok(true);
  });
});
