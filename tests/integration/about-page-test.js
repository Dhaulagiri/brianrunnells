import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - About Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function() {
  visit('/').then(function() {
    click("button:contains('About')").then(function() {
      ok(true);
      // equal(find('h3').text(), 'About');
    });
  });
});
