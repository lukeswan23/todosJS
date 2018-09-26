var todoList = {
	todos: [],
	displayToDos: function() {
		if (this.todos.length === 0) {
			console.log('Your todo list is empty!')
		} else {
			console.log('My todos:');
			for (var i=0; i < this.todos.length; i++) {
				if (this.todos[i].completed === false) {
					console.log('( ) ' + this.todos[i].todoText);
			} else {
					console.log('(x) ' + this.todos[i].todoText);
				}
			}
		}
	},
	addToDo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
		this.displayToDos();
	},
	changeToDo: function(position, todoText) {
		//this.todos[position] = (' ' + newItem);
		this.todos[position].todoText = todoText;
		this.displayToDos();
	},
	deleteToDo: function (position) {
		this.todos.splice(position, 1);
		this.displayToDos();
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed; //! sets the proceeding property and flips it, ie true becomes false, false becomes true
		//this.todos[position].completed = true;
		this.displayToDos();
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;
		//get number of completed todos
		for (var i = 0; i < totalTodos; i++) 
			if (this.todos[i].completed === true) { //if everything is true(completed), set it to false(not complete)
				completedTodos++
			}
			//case 1: if everything's true, make everything false
		if (completedTodos === totalTodos) {
			for (var i = 0; i < totalTodos; i++)
				this.todos[i].completed = false
			//case 2: else make everything true
		} else {
			for (var i = 0; i < totalTodos; i++)
				this.todos[i].completed = true;
		}
		this.displayToDos();

	},

};

var displayTodosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('displayToggleAllButton');

displayTodosButton.addEventListener('click', function(){
	todoList.displayToDos();
})

displayToggleAllButton.addEventListener('click', function() {
	todoList.toggleAll();
})