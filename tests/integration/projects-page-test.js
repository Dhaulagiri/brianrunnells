import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - Projects Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function() {
  visit('/').then(function() {
    click("button:contains('Projects')").then(function() {
      ok(true);
    });
  });
});

test('Should list all projects', function() {
  visit('/projects').then(function() {
    equal(find('a:contains("Q on the D")').length, 1);
  });
});

test('Should be able to navigate to a project page', function() {
  visit('/projects').then(function() {
    click('a:contains("Q on the D")').then(function() {
      equal(find('h3').text(), 'The Thing...');
      equal(currentRouteName(), 'projects.show');
      equal(currentPath(), 'projects.show');
    });
  });
});

test('Should be able visit a project page', function() {
  visit('/projects/1').then(function() {
    equal(find('h3').text(), 'The Thing...');
    equal(currentRouteName(), 'projects.show');
    equal(currentPath(), 'projects.show');
  });
});
