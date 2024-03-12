const dateBox = document.querySelector('.date_track');
const inputValue = document.querySelector('.add_task');
const inputBtn = document.querySelector('.add_btn');
const taskList = document.querySelector('.task_list');



const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
//function for date
const updatedDate = () => {

  const dayOptions = {weekday:'long'};
  const weekDay = currentDate.toLocaleDateString('en-US',dayOptions);

  const MonthOptions = {month:'long'};
  const monthName = currentDate.toLocaleDateString('en-US',MonthOptions);

  dateBox.innerHTML = `<span class="day">${weekDay}, ${date} </span> 
                      <span class="month">${monthName}, ${year} </span>` ;

}

updatedDate();

//function for adding task

inputBtn.addEventListener('click', () => {

  const taskText = inputValue.value;
  const newTask = document.createElement('li');

  newTask.innerHTML = `
                          <div class="todo_content">
                            <span class="checkbox"></span>
                            <p>${taskText}</p>
                          </div>
                          <div class="update_content">
                            <span class="task_date">${date}/${month+1}/${year}</span>
                            <i class="fa-solid fa-trash-can"></i>
                            <i class="fa-solid fa-pencil"></i>
                          </div>
                      `
  taskList.appendChild(newTask);
  inputValue.value = '';                    
})

