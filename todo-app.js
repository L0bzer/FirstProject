(() => {

  const dadPage = '/D:/Programm/JavaScriptCode/1/FistProject/dad.html';
  const momPage = '/D:/Programm/JavaScriptCode/1/FistProject/mom.html';
  let currentTodoKey = '';
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

    function getTodoItem(name, successed) {
      let item = document.createElement('li');
      
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');

      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      item.textContent = name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      if (successed == true) {
        item.classList.add('list-group-item-success');
      }

      return {
          item,
          doneButton,
          deleteButton,
      };
  };
    
    function createTodoItem(data) {
        let item = document.createElement('li');
        
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = data.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        addToTodo(data);

        return {
            item,
            doneButton,
            deleteButton,
        };
    };
    
    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemFotm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let todos = getTodoData();
        todos = todos ? jsonToData(todos) : [];
        if (todos.length > 0) {
          for (let todo of todos) {
            const itemName = todo.name;
            let successed = todo.successed;
            let itemTodo = getTodoItem(itemName, successed);

            itemTodo.doneButton.addEventListener('click', function() {
              itemTodo.item.classList.toggle('list-group-item-success');
              toggleDoneTodo(itemName);
            });
            itemTodo.deleteButton.addEventListener('click', function() {
              if (confirm('Вы уверены?')) {
                  itemTodo.item.remove();
                  removeFromTodo(itemName);
              }
            })

            todoList.append(itemTodo.item);
          };
        }
                
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
          
            if (!todoItemForm.input.value) {
                return;
            }

            const itemName = todoItemForm.input.value

            let todoItem = createTodoItem({name: itemName, successed: false});

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                toggleDoneTodo(itemName);
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    removeFromTodo(itemName);
                }
            })

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
        })
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