let input = document.querySelector("#input");
let submit = document.querySelector("#sudmit");
let ul = document.querySelector("ul");
let tasks = [];
let editIndex = -1;


submit.addEventListener("click", submitTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitTask()
  }
})

function submitTask() {
  if (input.value.trim() === "") return;

  if (editIndex === -1) {
    tasks.push(input.value.trim());
  } else {
    tasks[editIndex] = input.value;
    editIndex = -1;
  }

  input.value = "";
  render();
}


function render() {
  ul.innerHTML = ''

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `
    <span>${tasks[i]}</span>
    <div class="btn-group">
      <button class="editBtn">Edit Task</button>
      <button class="dltBtn">Delete Task</button>
      <div class="checkbox-wrapper-15">
        <input class="inp-cbx checkbox" id="cbx-${i}" type="checkbox" style="display:none;">
        <label class="cbx" for="cbx-${i}">
          <span>
            <svg width="12px" height="9px" viewbox="0 0 12 9">
              <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
          </span>
          <span class="text">Done</span>
        </label>
      </div>
    </div>
  `;
    ul.appendChild(li);
  }
}

ul.addEventListener("click", (e) => {
  if (e.target.classList == "dltBtn") {
    let index = tasks.indexOf(
      e.target.parentElement.parentElement.childNodes[0].nodeValue.trim()
    );
    tasks.splice(index, 1);
    e.target.parentElement.parentElement.remove();

  }

  if (e.target.classList == "editBtn") {
    let taskText = e.target.closest('li').querySelector('span').innerText.trim()
    let index = tasks.indexOf(taskText);
    editIndex = index;
    input.value = tasks[editIndex];
    render();
  }

  if (e.target.classList.contains('inp-cbx')) {
    let li = e.target.closest('li');
    li.classList.toggle('completed', e.target.checked);
  }


});
