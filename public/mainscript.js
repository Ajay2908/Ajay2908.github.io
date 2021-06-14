// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", filterTodo);


let currentActiveUser;
// Functions

function getUser() {
    return new Promise((resolve, reject) => {
        try {
            let user_name;
            $.ajax({
                type: "get",
                url: '/users/session',
                contentType: "text/html",
                dataType: "text",
                async: false,
                success: function (response) {
                    user_name = response;
                },
                error: function (result) {
                    console.log(result);
                }
            })
            document.getElementById("username").innerText = user_name;
            currentActiveUser = user_name;
            resolve('success');
        }
        catch (e) {
            reject(e);
        }

    })

}
function dbtodos() {
    return new Promise((resolve, reject) => {
        try {
            let todos;
            $.ajax({
                type: "get",
                url: `/users/todolist/${currentActiveUser}`,
                contentType: "application/json",
                dataType: "json",
                async: false,
                success: function (response) {
                    todos = JSON.parse(JSON.stringify(response));
                },
                error: function (result) {
                    console.log(result);
                }
            })
            resolve(todos);
        }
        catch (e) {
            reject({ error: e });
        }

    })

}

function adddbtodos(todo) {

    return new Promise((resolve, reject) => {
        try {
            console.log(todo)
            let todos;
            $.ajax({
                type: "post",
                url: `/users/todolist/update/${currentActiveUser}`,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({ toadd: todo }),
                async: false,
                success: function (response) {
                    // todos = JSON.parse(JSON.stringify(response));
                },
                error: function (result) {
                    console.log(result);
                }
            })
            resolve('success');
        }
        catch (e) {
            reject({ error: e });
        }

    })

}

function createComponents(value) {
    // Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    // Create Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append all
    todoList.appendChild(todoDiv);
}

function addTodo(e) {
    // Validate and prevent refresh
    e.preventDefault();
    if (!todoInput.value) return;

    // Creating all components
    createComponents(todoInput.value);

    // TODO : save todos to the data base
    saveTodos(todoInput.value);

    // Clear and focus Input
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;

    // delete todo
    if (item.classList[0] === "trash-btn") {
        todo.classList.add("fall");
        todo.addEventListener("animationend", function () {
            removeTodos(todo);
            todo.remove();
        });
    }

    // completed todo
    if (item.classList[0] === "check-btn") todo.classList.toggle("completed");
}

function filterTodo(e) {
    const value = e.target.value;
    const todos = todoList.childNodes;
    console.log(value);
    todos.forEach(function (todo) {
        switch (value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                return;
        }
    });
}

async function saveTodos(todo) {
    // Check
    let todos;

    // TODO : access todos of the current user in data base
    await adddbtodos(todo);
    // if (localStorage.getItem("todos") !== null) {
    //     todos = JSON.parse(localStorage.getItem("todos"));
    // } else {
    //     todos = [];
    // }

    // todos.push(todo);
    // localStorage.setItem("todos", JSON.stringify(todos)); // TODO : store it in data base of user 
}



async function getTodos() {
    await getUser();
    console.log(currentActiveUser)
    let todos = [];

    // TODO : get all the todos of current user from mongodb

    // if (localStorage.getItem("todos") !== null) {
    //     todos = JSON.parse(localStorage.getItem("todos"));
    // } else {
    //     todos = [];
    // }
    problems = await dbtodos();
    problemArray = problems.todoList;

    for (let problem of problemArray) {
        todos.push(problem);
    }

    todos.forEach(function (todo) {
        createComponents(todo);
    });
}




function removeTodos(todo) {
    let todos;


    // TODO : Get all the todos of the current active user
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    // TODO : Update current users data base 
    localStorage.setItem("todos", JSON.stringify(todos));
}
