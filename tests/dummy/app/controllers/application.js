import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setValue(value) {
      this.set('someValue', value);
    },
    toggleProperty(property) {
      this.toggleProperty(property);
    }
  }
});
