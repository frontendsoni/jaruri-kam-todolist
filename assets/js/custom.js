  const dateBox = document.querySelector('.date_track');
  const inputValue = document.querySelector('.add_task');
  const inputBtn = document.querySelector('.add_btn');
  const taskList = document.querySelector('.task_list');

  let totalTask = 0;
  let pendingTask = 0;
  let completedTask = 0;

  //function for date
  const updatedDate = () => {

    const currentDate = new Date();

    const dayOptions = {weekday:'long'};
    const weekDay = currentDate.toLocaleDateString('en-US',dayOptions);

    const MonthOptions = {month:'long'};
    const monthName = currentDate.toLocaleDateString('en-US',MonthOptions);

    dateBox.innerHTML = `<span class="day">${weekDay}, ${currentDate.getDate()} </span> 
                        <span class="month">${monthName}, ${currentDate.getFullYear()} </span>` ;

  }

  updatedDate();

  //function for adding task

  const addTask = (taskText, date, month, year, id, completed) => {

    const newTask = document.createElement('li');
      newTask.id = id;
      newTask.innerHTML = `
                              <div class="todo_content">
                                <span class="checkbox ${completed ? 'tick' : '' }"></span>
                                <p ${completed ? 'class = "completed"' : '' }>${taskText}</p>
                              </div>
                              <div class="update_content">
                                <span class="task_date">${date}/${month+1}/${year}</span>
                                <i class="fa-solid fa-trash-can del_task_btn"></i>
                                <i class="fa-solid fa-pencil edit_task_btn"></i>
                              </div>
                          `
      taskList.appendChild(newTask);
  }

  inputBtn.addEventListener('click', () => {

    const taskText = inputValue.value.trim();
    if (taskText) {
      const taskId = Date.now();
      const taskCurrentDate = new Date();
      addTask(taskText, taskCurrentDate.getDate(), taskCurrentDate.getMonth(), taskCurrentDate.getFullYear(), taskId, false);
      addTodoItem(taskText, taskId);
      inputValue.value = '';
      updateTask();
      displayTask();
    }
  })

  //Task all functionality

  taskList.addEventListener('click', (event) => {
    //delete
    if (event.target.classList.contains('del_task_btn')) {
      const listItem = event.target.closest('li');
      const itemId = parseInt(listItem.id, 10);
      deleteTodoItem(itemId);
      listItem.remove(); // Remove the task from the UI
      updateTask();
      displayTask();
    };
    //complete(done)
    if (event.target.classList.contains('checkbox')) {
      const listItem = event.target.closest('li');
      const itemId = parseInt(listItem.id, 10);

      const taskBox = event.target.closest('.todo_content');
      const taskContent = taskBox.querySelector('p');
      taskContent.classList.toggle('completed');
      event.target.classList.toggle('tick');

      completeTodoListText(itemId);
      updateTask();
      displayTask();
    }
    //edit task text
    if (event.target.classList.contains('edit_task_btn')) {

      const targetListItem = event.target.closest('li');
      const taskContent = targetListItem.querySelector('p');

      const inputElem = document.createElement('input');
      inputElem.type = 'text';
      inputElem.className = 'edit_task_text';
      inputElem.value = taskContent.textContent;
      taskContent.replaceWith(inputElem);

      const deleteIcon = event.target;
      const doneIcon = document.createElement('i')
      doneIcon.className = 'fa-regular fa-square-check edit_done_btn';
      deleteIcon.replaceWith(doneIcon);

    }

    if (event.target.classList.contains('edit_done_btn')) {

      const targetListItem = event.target.closest('li');
      const checkBox = targetListItem.querySelector('.checkbox');

      const taskInput = targetListItem.querySelector('input');
      const newText = taskInput.value;
      const listItem = event.target.closest('li');
      const itemId = parseInt(listItem.id, 10);
      const taskParagraph = document.createElement('p');
      taskParagraph.textContent = newText;
      taskInput.replaceWith(taskParagraph);

      updateTodoListText(itemId, newText);

      const editDoneIcon = event.target;
      const deleteIcon = document.createElement('i')
      deleteIcon.className = 'fa-solid fa-pencil edit_task_btn';
      editDoneIcon.replaceWith(deleteIcon);

      
      if( checkBox.classList.contains('tick')) {
        checkBox.classList.remove('tick');
      }

      updateTask();
      displayTask();
      completeTodoListText(itemId);
    }

  });

  const updateTask = () => {
    totalTask = document.querySelectorAll('.task_list li').length;
    pendingTask = document.querySelectorAll('.task_list li p:not(.completed)').length;
    completedTask = document.querySelectorAll('.task_list li p.completed').length;
  }

  const displayTask = () => {
    document.querySelector('.t-task-num').innerText = totalTask;
    document.querySelector('.p-task-num').innerText = pendingTask;
    document.querySelector('.c-task-num').innerText = completedTask;
  }

  updateTask();
  displayTask();

  // to store the data in local storage

  // Function to save todo list data to local storage
  const saveTodoList = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  // Function to get todo list data from local storage
  const getTodoList = () => {
    const storedData = localStorage.getItem('todoList');
    return storedData ? JSON.parse(storedData) : [];
  };

  // Function to add a new todo item to the list
  const addTodoItem = (todoText, taskId) => {
    const todoDate = new Date();
    const todoList = getTodoList();
    const newItem = {
      id: taskId,
      text: todoText,
      completed: false,
      date: {
        day:todoDate.getDate(),
        month:todoDate.getMonth()+1,
        year:todoDate.getFullYear()
      }  // Include creation date
    };
    todoList.push(newItem);
    saveTodoList(todoList);
  };

  const deleteTodoItem = (itemId) => {
    const todoList = getTodoList();
    const updatedList = todoList.filter(item => item.id !== itemId);
    saveTodoList(updatedList);
  }

  const updateTodoListText = (itemId, newText) => {
    const todoList = getTodoList();
    const itemIndex = todoList.findIndex( item => item.id === itemId);
    todoList[itemIndex].text = newText;
    saveTodoList(todoList);
    }
  const completeTodoListText = (itemId) => {
    const todoList = getTodoList();
    const itemIndex = todoList.findIndex( item => item.id === itemId);
    todoList[itemIndex].completed = !todoList[itemIndex].completed;
    saveTodoList(todoList);
    }

  const initializeTodoList = () => {
    const todoList = getTodoList();
      todoList.forEach( todoItem => {
        let day = todoItem?.date?.day;
        let month = todoItem?.date?.month;
        let year = todoItem?.date?.year;
      addTask(todoItem.text, day, month, year, todoItem.id, todoItem.completed)
    });
    console.log(todoList);
  };

  window.addEventListener('load', () => {
    initializeTodoList();
    updateTask();
    displayTask();
  });
