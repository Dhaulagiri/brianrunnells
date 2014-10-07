import DS from 'ember-data';

var ToolModel = DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  projects: DS.hasMany('project')
});

ToolModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Github',
      image: 'http://qonthed.com'
    },
    {
      id: 2,
      name: 'Ruby on Rails',
      image: 'http://qonthed.com'
    },
    {
      id: 3,
      name: 'Bootstrap',
      image: 'http://qonthed.com'
    },
    {
      id: 4,
      name: 'Heroku',
      image: 'http://qonthed.com'
    },
    {
      id: 5,
      name: 'Digital Ocean',
      image: 'http://qonthed.com'
    },
    {
      id: 6,
      name: 'Stripe Payments',
      image: 'http://qonthed.com'
    },
    {
      id: 7,
      name: 'Redis',
      image: 'http://qonthed.com'
    },
    {
      id: 8,
      name: 'Ember.js',
      image: 'http://qonthed.com'
    }

  ]
});

export default ToolModel;
