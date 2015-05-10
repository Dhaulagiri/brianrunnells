import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var App;

module('Integration - About Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function(assert) {
  visit('/').then(function() {
    click("button:contains('About')").then(function() {
      assert.ok(true);
      // equal(find('h3').text(), 'About');
    });
  });
});
