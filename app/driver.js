var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var ToDoModel = require('./models/todo');

var ToDo = Marionette.LayoutView.extend({
  tagName: 'li',
  template: require('./templates/todoitem.html')
});


var TodoList = Marionette.CompositeView.extend({
  el: '#app-hook',
  template: require('./templates/todolist.html'),

  childView: ToDo,
  childViewContainer: 'ul',

  ui: {  // 1
    assignee: '#id_assignee',
    form: 'form',
    text: '#id_text'
  },

  triggers: {  // 2
    'submit @ui.form': 'add:todo:item'
  },

  collectionEvents: {  // 3
    add: 'itemAdded'
  },

  onAddTodoItem: function() {  // 4
    this.model.set({
    //this.collection.add({
      assignee: this.ui.assignee.val(),  // 5
      text: this.ui.text.val()
    });

      if (this.model.isValid()) {
      var items = this.model.pick('assignee', 'text');
      this.collection.add(items);
    }
  },

  // itemAdded: function() {  // 6
  //   this.ui.assignee.val('');
  //   this.ui.text.val('');

    itemAdded: function() {
    this.model.set({
      assignee: '',
      text: ''
    });

    this.ui.assignee.val('');
    this.ui.text.val('');
  }
});

var todo = new TodoList({
  collection: new Backbone.Collection([
    {assignee: 'Scott', text: 'Write a book about Marionette'},
    {assignee: 'Andrew', text: 'Do some coding'}
  //])
    ]),
  model: new ToDoModel()

});
todo.render();