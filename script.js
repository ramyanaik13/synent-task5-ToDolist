let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


addTaskBtn.addEventListener("click", addTask);



function addTask(){


    let text = taskInput.value.trim();


    if(text===""){
        alert("Please enter task");
        return;
    }



    let task = {

        id: Date.now(),

        title:text,

        date:dueDate.value || "No Due Date",

        priority:priority.value,

        completed:false

    };



    tasks.push(task);


    saveTasks();


    displayTasks();


    taskInput.value="";

    dueDate.value="";

}



function displayTasks(){


    taskList.innerHTML="";



    tasks.forEach(task=>{


        let li=document.createElement("li");


        li.className="task";



        li.innerHTML=`

        <div class="task-left">


        <input type="checkbox" class="check"
        ${task.completed?"checked":""}>


        <div>


        <div class="task-title"
        style="${task.completed?
        'text-decoration:line-through;color:gray':''}">

        ${task.title}

        </div>



        <div class="task-date">

        📅 ${task.date}

        </div>



        <span class="priority ${task.priority.toLowerCase()}">

        ${task.priority}

        </span>


        </div>


        </div>



        <div class="actions">


        <button class="delete">

        <i class="fa-solid fa-trash"></i>

        </button>


        </div>


        `;



        let checkbox=li.querySelector(".check");



        checkbox.addEventListener("change",()=>{


            task.completed=checkbox.checked;


            saveTasks();


            displayTasks();


        });





        // Delete icon


        li.querySelector(".delete")
        .addEventListener("click",()=>{


            tasks=tasks.filter(t=>t.id!==task.id);


            saveTasks();


            displayTasks();


        });



        taskList.appendChild(li);


    });



    updateProgress();

}



// Today's Progress


function updateProgress(){


    let total=tasks.length;


    let completed=tasks.filter(t=>t.completed).length;



    let percent= total===0 ? 0 :
    Math.round((completed/total)*100);



    document.getElementById("totalTasks").innerText=total;


    document.getElementById("completedTasks").innerText=completed;


    document.getElementById("progressFill").style.width=
    percent+"%";


    document.getElementById("progressText").innerText=
    percent+"%";


}



// Filters


const filters=document.querySelectorAll(".filter");



filters.forEach(btn=>{


    btn.addEventListener("click",()=>{


        let type=btn.dataset.filter;


        let taskElements=document.querySelectorAll(".task");



        taskElements.forEach((element,index)=>{


            let task=tasks[index];



            if(type==="all"){

                element.style.display="flex";

            }


            else if(type==="pending"){


                element.style.display=
                task.completed ? "none":"flex";


            }


            else if(type==="completed"){


                element.style.display=
                task.completed ? "flex":"none";


            }



        });



    });



});




// Search


// Search Task

const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input",()=>{


    let value = searchInput.value.toLowerCase().trim();


    let found = false;


    document.querySelectorAll(".task").forEach((element)=>{


        let title = element
        .querySelector(".task-title")
        .innerText
        .toLowerCase();



        if(title.includes(value)){


            element.style.display = "flex";

            found = true;


        }
        else{


            element.style.display = "none";


        }


    });



    // Show message when task not found

    let noTask = document.getElementById("noTaskMessage");



    if(!found && value !== ""){


        if(!noTask){


            noTask = document.createElement("p");

            noTask.id = "noTaskMessage";

            noTask.innerText = "Task is not there";


            taskList.appendChild(noTask);


        }


    }
    else{


        if(noTask){

            noTask.remove();

        }


    }



});



// Load tasks

displayTasks();