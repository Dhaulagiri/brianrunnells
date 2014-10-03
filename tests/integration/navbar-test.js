import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - Navbar', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should have the proper links', function() {
  visit('/').then(function() {
    equal(find('button:contains("Projects")').length, 1);
    equal(find('button:contains("About")').length, 1);
  });
});