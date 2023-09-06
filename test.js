const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');
//할일 목록이 저장될 배열 생성
let tasks = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input.value.trim() === '') return alert('할일을 입력하세요');

	const newTask = {
		id: performance.now(),
		title: input.value,
		creatAt: new Date(),
	};

	input.value = '';

	tasks.push(newTask);
	console.log('newTask', newTask);

	list.innerHTML = '';
	tasks.map((task) => addListItem(task));
});

function addListItem(task) {
	//li, input 엘리먼트 노드 생성
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	//input노드에 checkbox타입 설정
	checkbox.type = 'checkbox';
	//li노드에  자식으로 checkbox, 인수로 받은 객체의 할일내용 추가
	item.append(checkbox, task.title);
	//완성된 li노드를 ul안에 추가
	list.append(item);
}
