var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		tasks: [
			'Развернуть окружение в Codepen',
			'Пройти курс по Vue',
			'Сделать интернет-магазин на Vue'
		],
		finished_tasks: [
			'Скушать пончик',
			'ничего не делать'
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
	}
})