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

	tasks = [newTask, ...tasks];
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

	//동적으로 생성되는 checkbox요소에 아예 이벤트핸들러까지 연결해서 생성
	//이벤트위임을 하지 않아도 동적인 요소에 이벤트 연결하는 방법
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		//change이벤트가 발생할때마다 해당객체의 complete값이 true면 line-through적용 그렇지 않으면 미적용
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
	});

	//li노드에  자식으로 checkbox, 인수로 받은 객체의 할일내용 추가
	item.append(checkbox, task.title);
	//완성된 li노드를 ul안에 추가
	list.append(item);
}
