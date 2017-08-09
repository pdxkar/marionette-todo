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

//is this not working?
  triggers: {  // 2
    'submit @ui.form': 'add:todo:item'
  },

  collectionEvents: {  // 3
    add: 'itemAdded'
  },

  //Added this in part 2.5 "We just need to wire up our view to handle this..."
  modelEvents: {
    change: 'render'
  },

  onAddTodoItem: function() {  // 4
    this.model.set({
      assignee: this.ui.assignee.val(),  // 5
      text: this.ui.text.val()
    });

      if (this.model.isValid()) {
      var items = this.model.pick('assignee', 'text');
      this.collection.add(items);
      //replacing the above line with the line below didn't work:
      //this.model.add(items);
    }
  },

    itemAdded: function() {
    this.model.set({
      assignee: '',
      text: ''
    });

//removed this in part 2.5 "We just need to wire up our view to handle this..."
//duplicates are posted whether it's here or not
    //this.ui.assignee.val('');
   // this.ui.text.val('');
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