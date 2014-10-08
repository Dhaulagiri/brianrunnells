import DS from 'ember-data';

var ProjectModel = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  urlActive: DS.attr('bool'),
  repoUrl: DS.attr('string'),
  snippet: DS.attr('string'),
  tools: DS.hasMany('tool', { async: true })
});

ProjectModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Q on the D',
      url: 'http://qonthed.com',
      urlActive: true,
      snippet: 'Event registration and scoring',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 2,
      title: 'Lebrandrew.com',
      url: 'http://lebrandrew.com',
      urlActive: true,
      snippet: 'Donation site',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 3,
      title: 'Hard Climbs',
      url: 'http://hardclimbs.info',
      urlActive: true,
      repoUrl: 'http://github.com/dhaulagiri/hardclimbs',
      snippet: 'Climbing website',
      tools: [1, 2, 3, 4]
    },
    {
      id: 4,
      title: 'Live Scoring',
      url: 'http://live-scoring.herokuapp.com',
      urlActive: true,
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4]
    },
    {
      id: 5,
      title: 'Psicocomp Live Scoring',
      url: 'http://psicobloc.herokuapp.com',
      urlActive: true,
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4, 7]
    },
    {
      id: 6,
      title: 'This site',
      url: 'http://brianrunnells.com',
      repoUrl: 'http://github.com/dhaulagiri/brianrunnells',
      urlActive: true,
      snippet: 'Personal site',
      tools: [3, 8]
    }
  ]
});

export default ProjectModel;
