import DS from 'ember-data';

var ProjectModel = DS.Model.extend({
  title: DS.attr('string')
});

ProjectModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: "Q on the D"
    },
    {
      id: 2,
      title: "Lebrandrew.com"
    }
  ]
});

export default ProjectModel;
