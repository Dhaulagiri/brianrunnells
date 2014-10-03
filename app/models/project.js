import DS from 'ember-data';

var ProjectModel = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  snippet: DS.attr('string')
});

ProjectModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Q on the D',
      url: 'http://qonthed.com',
      snippet: 'Event registration and scoring'
    },
    {
      id: 2,
      title: 'Lebrandrew.com',
      url: 'http://lebrandrew.com',
      snippet: 'Donation site'
    }
  ]
});

export default ProjectModel;
