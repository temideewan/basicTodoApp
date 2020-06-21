const todoList = document.querySelector('.todoList');
const addItem = document.querySelector('.addItem');

// Storage for items
let listItems = JSON.parse(localStorage.getItem('listItems')) || [];

// control adding new item
function addNewItem(e) {
	e.preventDefault();

	const item = e.target.elements.newItem.value.trim();
	if (item) {
		listItems = [...listItems, item];
		localStorage.setItem('listItems', JSON.stringify(listItems));
		renderList(listItems, todoList);
		console.log(listItems);
	} else {
		todoList.innerHTML = `<p class="error">please enter a valid item</p>`;
	}
	e.target.elements.newItem.value = '';
}

// Render the list of items
function renderList(list, parent) {
	parent.innerHTML = list
		.map((item, index) => {
			return `
    				<li >
					<input type="checkbox" name="todo" id="todo${index}"/>
					<label class="item" for="todo${index}" data-index="${index}"></label>
					<p>${index + 1}. ${item}</p>
				</li>
  `;
		})
		.join('');
}

function removeItem(e) {
	if (e.target.className.includes('item')) {
		const element = e.target;
		const index = parseInt(element.dataset.index);
		listItems = listItems.filter((item, i) => {
			return i !== index;
		});

		localStorage.setItem('listItems', JSON.stringify(listItems));
		setTimeout(() => {
			renderList(listItems, todoList);
		}, 350);
	}
}

renderList(listItems, todoList);
todoList.addEventListener('click', removeItem);
addItem.addEventListener('submit', addNewItem);
