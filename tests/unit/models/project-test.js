import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('project', 'Project', {
  // Specify the other units that are required for this test.
  needs: ['model:tool']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('tool relationship', function(assert) {
  var Project = this.store().modelFor('project');
  var relationship = Ember.get(Project, 'relationshipsByName').get('tools');

  assert.equal(relationship.key, 'tools');
  assert.equal(relationship.kind, 'hasMany');
});
