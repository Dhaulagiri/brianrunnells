import DS from 'ember-data';

var ProjectModel = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  urlActive: DS.attr('bool'),
  repoUrl: DS.attr('string'),
  snippet: DS.attr('string'),
  description: DS.attr('string'),
  tools: DS.hasMany('tool', { async: true })
});

ProjectModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'InstaClimb',
      url: 'http://instaclimb.com',
      urlActive: true,
      snippet: 'Tracking',
      description: 'InstaClimb is a Ruby on Rails application that integrates
      with APIs from Facebook, Twitter and Instagram to track the changes in
      follower counts of tracked users.  This information is presented using
      Ember.js and HighCharts',
      tools: [1, 2, 3, 5, 8]
    },
    {
      id: 2,
      title: 'Q on the D',
      url: 'http://qonthed.com',
      urlActive: true,
      snippet: 'Event registration and scoring',
      description: 'QontheD.com is a custom event registration and scoring website that I built using Ruby on Rails, Bootstrap and Stripe to allow event registrants to register, pay and see their results.  It is deployed to a custom Digital Ocean instance.',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 3,
      title: 'Lebrandrew.com',
      url: 'http://lebrandrew.com',
      urlActive: false,
      snippet: 'Donation site',
      description: 'Lebrandrew.com is a site built using Ruby on Rails and Stripe that allowed visitors to donate money to a particular cause.',
      tools: [1, 2, 3, 5, 6]
    },
    {
      id: 4,
      title: 'Hard Climbs',
      url: 'http://hardclimbs.info',
      urlActive: true,
      repoUrl: 'http://github.com/dhaulagiri/hardclimbs',
      snippet: 'Climbing website',
      tools: [1, 2, 3, 4]
    },
    {
      id: 5,
      title: 'Live Scoring',
      url: 'http://live-scoring.herokuapp.com',
      urlActive: true,
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4]
    },
    {
      id: 6,
      title: 'Psicocomp Live Scoring',
      url: 'http://psicobloc.herokuapp.com',
      urlActive: true,
      snippet: 'Live scoring',
      tools: [1, 2, 3, 4, 7]
    },
    {
      id: 7,
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
