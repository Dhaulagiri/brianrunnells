import startApp from 'brianrunnells/tests/helpers/start-app';
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

var App;

module('Integration - Projects Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load', function(assert) {
  visit('/').then(function() {
    click("button:contains('Projects')").then(function() {
      assert.ok(true);
    });
  });
});

test('Should list all projects', function(assert) {
  visit('/projects').then(function() {
    assert.equal(find('a:contains("Q on the D")').length, 1);
  });
});

test('Should be able to navigate to a project page', function(assert) {
  visit('/projects').then(function() {
    click('a:contains("Q on the D")').then(function() {
      assert.equal(find('h3').text(), 'The Thing...');
      assert.equal(currentRouteName(), 'projects.show');
      assert.equal(currentPath(), 'projects.show');
    });
  });
});

test('Should be able visit a project page', function(assert) {
  visit('/projects/1').then(function() {
    assert.equal(find('h3').text(), 'The Thing...');
    assert.equal(currentRouteName(), 'projects.show');
    assert.equal(currentPath(), 'projects.show');
  });
});
