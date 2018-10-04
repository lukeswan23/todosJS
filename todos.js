var todoList = {
	todos: [],
	addToDo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeToDo: function(position, todoText) {
		//this.todos[position] = (' ' + newItem);
		this.todos[position].todoText = todoText;
	},
	deleteToDo: function (position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed; //! sets the proceeding property and flips it, ie true becomes false, false becomes true
		//this.todos[position].completed = true;
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
	},
};


var handlers = {
	addToDo: function(){
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addToDo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeToDo: function() {
		var changeToDoPosition = document.getElementById('changeTodoPositionInput');
		var changeToDoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeToDo(changeToDoPosition.valueAsNumber, changeToDoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		view.displayTodos();
	},
	deleteToDo: function(position) {
		todoList.deleteToDo(position);
		view.displayTodos();
	},
	toggleToDo: function() {
		var toggleToDoPosition = document.getElementById('toggleTodoPositionInput')
		todoList.toggleCompleted(toggleToDoPosition.valueAsNumber);
		toggleToDoPosition.value = '';
		view.displayTodos();
	},
	toggleAll: function(){
	todoList.toggleAll();
	view.displayTodos();
	},
};

//view object, only displays information to user...hence view
var view = {
	displayTodos: function() {
		var toDosUl = document.querySelector('ul'); //resets the UL each time the function is run to prevent it from creating the UL every time.
		toDosUl.innerHTML = ''; //prevents extra LI's being created by starting at 0, e.g if there are already 3 items on the page and we run the function again those 3 items won't be added AGAIN
		for (var i = 0; i < todoList.todos.length; i++) { //creates list item for each item in the todo list array32wq
			var toDoLi = document.createElement('li');
			var todo = todoList.todos[i];
			var todoTextWithCompletion = '';

			if (todo.completed === true) {
				todoTextWithCompletion = '(x) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			}

			toDoLi.id= i; //each li element will have an id that has the todos position
			toDoLi.textContent = todoTextWithCompletion; //replaces line below(line92)
			toDoLi.appendChild(this.createDeleteButton());
			// toDoLi.textContent = todoList.todos[i].todoText; //accessing todoLi object and setting text to value of i(current todo in array)'s todoText
			toDosUl.appendChild(toDoLi);
			}
		},
		createDeleteButton: function() {
			var deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';
			deleteButton.className = 'deleteButton';
			return deleteButton;
		},
		setUpEventListeners: function() {
			var toDosUl = document.querySelector('ul'); 

			toDosUl.addEventListener('click', function(event) {
				console.log(event.target.parentNode.id);

				//get element that was clicked 
				var elementClicked = event.target;

				//check if elementClicked is a delete button
				if (elementClicked.className === 'deleteButton') {
					//run handlers.deleteTodo(position) position that gets passed in as a string, so we parseInt
					handlers.deleteToDo(parseInt(elementClicked.parentNode.id));
				}
			});
		},	
	};

	view.setUpEventListeners();



