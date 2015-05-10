import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var App;

module('Integration - Navbar', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have the proper links', function(assert) {
  visit('/').then(function() {
    assert.equal(find('button:contains("Projects")').length, 1);
    assert.equal(find('button:contains("About")').length, 1);
  });
});
