var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		tasks: [
			{text: 'Развернуть окружение в Codepen', done: true},
			{text: 'Пройти курс по Vue', done: false},
			{text: 'Сделать интернет-магазин на Vue', done: false}
		],
		random_title: [
			'Add',
			'Добавить',
			'Впиши и нажми)'
		],
		current_title: ''
	},
	created() {
		const idx = Math.floor(Math.random() * this.random_title.length);
		this.current_title = this.random_title[idx]
	},
	methods: {
		submit(){
			this.tasks.push({text: this.message, done: false});
			this.message = '';
		},
		count(){
			return this.tasks.filter(task => !task.done).length;
		}
	}
})