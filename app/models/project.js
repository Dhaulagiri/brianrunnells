import DS from 'ember-data';

var ProjectModel = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  snippet: DS.attr('string'),
  tools: DS.hasMany('tool', { async: true })
});

ProjectModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Q on the D',
      url: 'http://qonthed.com',
      snippet: 'Event registration and scoring',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 2,
      title: 'Lebrandrew.com',
      url: 'http://lebrandrew.com',
      snippet: 'Donation site',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 3,
      title: 'Hard Climbs',
      url: 'http://hardclimbs.info',
      snippet: 'Climbing website',
      tools: [1, 2, 3, 4]
    },
    {
      id: 4,
      title: 'Live Scoring',
      url: 'http://live-scoring.herokuapp.com',
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4]
    },
    {
      id: 5,
      title: 'Psicocomp Live Scoring',
      url: 'http://psicobloc.herokuapp.com',
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4, 7]
    },
    {
      id: 6,
      title: 'This site',
      url: 'http://brianrunnells.com',
      snippet: 'Personal site',
      tools: [3, 8]
    }
  ]
});

export default ProjectModel;
