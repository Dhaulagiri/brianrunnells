import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('project', 'Project', {
  // Specify the other units that are required for this test.
  needs: ['model:tool']
});

test('it exists', function() {
  var model = this.subject();
  ok(!!model);
});

test('tool relationship', function() {
  var Project = this.store().modelFor('project');
  var relationship = Ember.get(Project, 'relationshipsByName').get('tools');

  equal(relationship.key, 'tools');
  equal(relationship.kind, 'hasMany');
});
