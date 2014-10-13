import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('tool', 'Tool', {
  // Specify the other units that are required for this test.
  needs: ['model:project']
});

test('it exists', function() {
  var model = this.subject();
  ok(!!model);
});

test('project relationship', function() {
  var Tool = this.store().modelFor('tool');
  var relationship = Ember.get(Tool, 'relationshipsByName').get('projects');

  equal(relationship.key, 'projects');
  equal(relationship.kind, 'hasMany');
});
