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

const addTask = (taskText, date, month, year) => {

  const newTask = document.createElement('li');
    newTask.innerHTML = `
                            <div class="todo_content">
                              <span class="checkbox"></span>
                              <p>${taskText}</p>
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
    const taskCurrentDate = new Date();
    addTask(taskText, taskCurrentDate.getDate(), taskCurrentDate.getMonth(), taskCurrentDate.getFullYear())
    inputValue.value = '';
    updateTask();
    displayTask();
  }
})

//Task all functionality

taskList.addEventListener('click', (event) => {
  //delete
  if (event.target.classList.contains('del_task_btn')) {
    event.target.closest('li').remove();
    updateTask();
    displayTask();
  };
  //complete(done)
  if (event.target.classList.contains('checkbox')) {
    const taskBox = event.target.closest('.todo_content');
    const taskContent = taskBox.querySelector('p');
    taskContent.classList.toggle('completed');
    event.target.classList.toggle('tick');
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
    const taskInput = targetListItem.querySelector('input');
    const newText = taskInput.value
    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = newText;
    taskInput.replaceWith(taskParagraph);

    const editDoneIcon = event.target;
    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'fa-solid fa-pencil edit_task_btn';
    editDoneIcon.replaceWith(deleteIcon);
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

