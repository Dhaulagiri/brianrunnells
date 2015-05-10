import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var App;

module('Integration - Home Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function(assert) {
  visit('/').then(function() {
    assert.ok(true);
  });
});
