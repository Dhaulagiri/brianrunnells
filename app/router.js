import Ember from 'ember';
import config from './config/environment';
import './ga';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('projects', function() {
    this.route('show', {path: ':project_id'});
  });
  this.route('about');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    if (config.environment === 'production') {
      try {
        // TODO - Figure out how to make this pass jshint
        /* jshint ignore:start */
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
          });
        /* jshint ignore:end */
      }
      catch (err) {
      }
    }
  }.on('didTransition')
});

export default Router;
