import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('tool', 'Tool', {
  // Specify the other units that are required for this test.
  needs: ['model:project']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('project relationship', function(assert) {
  var Tool = this.store().modelFor('tool');
  var relationship = Ember.get(Tool, 'relationshipsByName').get('projects');

  assert.equal(relationship.key, 'projects');
  assert.equal(relationship.kind, 'hasMany');
});
