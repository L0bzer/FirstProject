(() => {

  const dadPage = '/D:/Programm/JavaScriptCode/1/FistProject/dad.html';
  const momPage = '/D:/Programm/JavaScriptCode/1/FistProject/mom.html';
  let currentTogitdoKey = '';
  let currentPage = location.pathname;
  
  switch (currentPage) {
    case dadPage:
      currentTodoKey = 'dadTodo';
      break;
    case momPage:
      currentTodoKey = 'momTodo';
      break;
  
    default:
      currentTodoKey = 'myTodo';
      break;
  }

    //создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML=title;
        return appTitle;
    }

    //создаём и возвращаем форму для создания дела
    function createTodoItemFotm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела'
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    //создаём и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(todoItem, {onDone, onRemove}) {
      const doneClass = 'list-group-item-success';
      
      let item = document.createElement('li');
      
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');

      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      if (todoItem.successed) {
        item.classList.add(doneClass);
      }
      item.textContent = todoItem.name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      doneButton.addEventListener('click', function() {
        onDone({todoItem, element: item});
        item.classList.toggle(doneClass);
      });
      deleteButton.addEventListener('click', function() {
        onRemove({todoItem, element: item})
      });
      
      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      return item
    };
    
    function createTodoApp(container, title = 'Список дел') {
      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemFotm();
      let todoList = createTodoList();
      const headlers = {
        onDone({todoItem}) {
            toggleDoneTodo(todoItem.name); 
        },
        onRemove({todoItem, element}) {
            if (!confirm('Вы уверены?')) {
                return;
            }
            element.remove();
            removeFromTodo(todoItem.name);
        },
    };

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);

      let todos = getTodoData();
      todos = todos ? jsonToData(todos) : [];
      if (todos.length) {
        todos.forEach(todoItem => {
          const itemTodo = createTodoItem(todoItem, headlers);
          todoList.append(itemTodo);
        });
      };
              
      todoItemForm.form.addEventListener('submit', function(e) {
        e.preventDefault();
      
        if (!todoItemForm.input.value) {
          return;
        }

        const itemName = todoItemForm.input.value.trim();

        addToTodo({name: itemName, successed: false});

        let todoItem = createTodoItem({name: itemName, successed: false}, headlers);

        todoList.append(todoItem);

        todoItemForm.input.value = '';
      });
    }

    function dataToJson(data) {
        return JSON.stringify(data);
      };
      
    function jsonToData(data) {
      return JSON.parse(data);
    };
      
    function getTodoData() {
      return localStorage.getItem(currentTodoKey)
    };
      
    function setTodoData (data) {
      localStorage.setItem(currentTodoKey, data)
    };
         
    function addToTodo({name, successed}) {
      let todo = getTodoData();
      todo = todo ? jsonToData(todo) : [];
      todo.push({name, successed});
      setTodoData(dataToJson(todo));
    };
      
    function toggleDoneTodo(name) {
      let todo = jsonToData(getTodoData());
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].name == name) {
          todo[i].successed = !todo[i].successed;
        }
      }
      setTodoData(dataToJson(todo));
    };
    
    function removeFromTodo(name) {
      let todo = jsonToData(getTodoData());
      let newTodo = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].name !== name) {
          newTodo.push(todo[i]);
        }
      }
      setTodoData(dataToJson(newTodo));
    };
    
    window.createTodoApp = createTodoApp;
})();