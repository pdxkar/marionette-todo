var Backbone = require('backbone');
var Marionette = require('backbone.marionette');


var ToDo = Marionette.LayoutView.extend({
  tagName: 'li',
  template: require('./templates/todoitem.html')
});


var TodoList = Marionette.CollectionView.extend({
  el: '#app-hook',
  tagName: 'ul',

  childView: ToDo
});

var todo = new TodoList({
  collection: new Backbone.Collection([
    {assignee: 'Scott', text: 'Write a book about Marionette'},
    {assignee: 'Andrew', text: 'Do some coding'}
  ])
});

todo.render();