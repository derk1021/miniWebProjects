const inputTask = document.getElementById("input-text");
const listContainer = document.getElementsByClassName("list-container");

// Method 1 of click event for adding todo:
// - add onclick="addTodo" in ul element
const addTodo = () => {
  if (inputTask.value === "") {
    alert("You have to add a todo!");
  } else {
    if (listContainer.length > 0) {
      // Adds the child <li> element to <ul>
      let listElement = document.createElement("li"); // Creates the nested <li> element within <> -> <li></li>
      listElement.innerHTML = inputTask.value; // Takes your input and turns it into your HTML content -> <li>[content]</li>
      let innerSpan = document.createElement("span");
      innerSpan.innerHTML = "X";
      listContainer[0].appendChild(listElement); // Nest <li class="checked">[content]</li> as child of ul -> <ul><li class="checked">[content]</li></ul>
      listElement.appendChild(innerSpan); // Final product: <li class="checked"><span><span>[content]</li>
    }
  }
  inputTask.value = "";
  saveData();
};

// Method 2 of click event for adding todo:
// - add id="add-todo" in ul element
// - add "const addTodo = document.getElementById("add-todo");" at top of code
// addTodo.addEventListener("click", () => {
//   if (inputTask.value === "") {
//     alert("You have to add a todo!");
//   } else {
// if (listContainer.length > 0) {
//     let listElement = document.createElement("li");
//     listElement.innerHTML = inputTask.value;
//     listElement.classList.add("checked");
//     listContainer[0].appendChild(listElement);
//   }
// }
// });

listContainer[0].addEventListener("click", (e) => {
  // e.target is the element that triggered the event
  if (e.target.tagName === "LI") {
    // When the <li> is clicked, then either apply the checked class or not (cross it out or don't)
    e.target.classList.toggle("checked");
    saveData();
    // We want to create the "X" button corresponding with each todo for deletion
  } else if (e.target.tagName === "SPAN") {
    // When the <span> is clicked, then remove the entire todo by removing the parent element
    e.target.parentElement.remove();
    saveData();
  }
});

// We want to save the data we create even after the refresh and close the browser
function saveData() {
  localStorage.setItem("allTodos", listContainer[0].innerHTML);
}

// We want to display all of that data we have saved
function showTodos() {
  listContainer[0].innerHTML = localStorage.getItem("allTodos");
}
showTodos();

// localStorage.clear(); // Clears all the data
