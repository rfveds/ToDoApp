const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#input-todo');
const todoItemsList = document.querySelector('#todo-list');
let todos = [];

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach((item) => {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'flex-space-between');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.children[0].children[0].children[0].classList.add('checked');
        }
        li.innerHTML = `
              <div>
                <label>
                    <input type="checkbox" class="checkbox" ${checked}>
                </label>
              <span class="todo">${item.name}</span>
              </div>
              <button class="delete-btn">X</button>
            `;
        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach((item) => {
        if (item.id === parseInt(id)) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter((item) => {
        return item.id !== parseInt(id);
    });
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click',  (event) =>{
    if (event.target.type === 'checkbox') {
        event.target.parentElement.parentElement.querySelector('span').classList.toggle('checkbox')
    }
    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
