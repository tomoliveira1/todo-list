"use strict";

// (??) If todoList is null, get an empty array
const getDataBase = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setDataBase = (dataBase) =>
  localStorage.setItem("todoList", JSON.stringify(dataBase));

const createItem = (task, status, index) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
          <input type="checkbox" ${status} data-indice=${index}>
          <div>${task}</div>
          <input type="button" value="X" data-indice=${index}>
      `;
  document.getElementById("todoList").appendChild(item);
};

const clearTask = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const renderOnScreen = () => {
  clearTask();
  const dataBase = getDataBase();
  dataBase.forEach((item, index) => createItem(item.text, item.status, index));
};

const createTask = (event) => {
  const key = event.key;
  const dataBase = getDataBase();
  if (key === "Enter") {
    dataBase.push({
      text: event.target.value,
      status: "",
    });
    setDataBase(dataBase);
    renderOnScreen();
    event.target.value = "";
  }
};

const deleteItem = (index) => {
  const dataBase = getDataBase();
  dataBase.splice(index, 1);
  setDataBase(dataBase);
  renderOnScreen();
};

const updateItem = (index) => {
  const dataBase = getDataBase();
  dataBase[index].status = dataBase[index].status === "" ? "checked" : "";
  setDataBase(dataBase);
  renderOnScreen();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === "button") {
    const index = element.dataset.indice;
    deleteItem(index);
  } else if (element.type === "checkbox") {
    const index = element.dataset.indice;
    updateItem(index);
  }
};

document.getElementById("newItem").addEventListener("keypress", createTask);
document.getElementById("todoList").addEventListener("click", clickItem);
renderOnScreen();
