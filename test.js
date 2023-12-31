const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');

let tasks = JSON.parse(localStorage.getItem('TASKS')) || [];

tasks.map((task) => addListItem(task));

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input.value.trim() === '') return alert('할일을 입력하세요');

	const newTask = {
		id: performance.now(),
		title: input.value,
		creatAt: new Date(),
	};

	input.value = '';

	list.innerHTML = '';

	tasks = [newTask, ...tasks];
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	//tasks에 있는 배열값을 반복돌면서 목록 생성
	tasks.map((task) => addListItem(task));
});

function addListItem(task) {
	//li, input 엘리먼트 노드 생성
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	//input노드에 checkbox타입 설정
	checkbox.type = 'checkbox';

	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		//change이벤트가 발생할때마다 해당객체의 complete값이 true면 line-through적용 그렇지 않으면 미적용
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		//동적으로 생긴 checkbox요소에 change이벤트가 발생할때마다 다시 변경점을 로컬저장소에 저장
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	//li노드에  자식으로 checkbox, 인수로 받은 객체의 할일내용 추가
	item.append(checkbox, task.title);
	//완성된 li노드를 ul안에 추가
	list.append(item);
}
