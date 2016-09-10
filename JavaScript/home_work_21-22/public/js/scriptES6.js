'use strict';

(function init($) {

	var questions = [{
		'title': '1. Какой формат передачи данных наиболее распостранен?',
		'answers': ['a. SQL', 'b. JSON', 'c. XML'],
		'check': 1
	}, {
		'title': '2. Выберите правильный вариант фрагменяа XML файла:',
		'answers': ['a. &lt;greeting/&gtHello, world!;', 'b. &lt;greeting&gt;Hello, world!&lt;/&gt;', 'c. &lt;greeting&gt;Hello, world!&lt;/greeting&gt;'],
		'check': 2
	}, {
		'title': '3. Выберите правильный вариант фрагмента JSON файла.',
		'answers': ['a. {name: Иван }', 'b. {‘name’: ‘Иван’ }', 'c. {"name": "Иван" }'],
		'check': 1
	}];
	localStorage.setItem('questions', JSON.stringify(questions));
})(jQuery);

$(document).ready(function () {
	'use strict';

	$(function () {
		var questions = JSON.parse(localStorage.getItem('questions'));

		var html = $('#opros').html();
		var template = tmpl(html, {
			questions: questions
		});
		var box = void 0;
		var show = void 0;
		var modal = "";
		var body = $('body');

		body.append(template);

		$("#result").on('click', function () {
			// проверка на сделаный "checked"  на каждий "question"
			var needAnswer = false;
			for (var i = 0; i < questions.length; i++) {
				var inputQuestion = 'form[name="question_' + i + '"]';
				var inputs = $(inputQuestion + ' input');
				var hasChecked = false;
				for (var j = 0; j < inputs.length; j++) {
					var input = inputs[j];
					if (input.checked) {
						hasChecked = true;
					}
				}
				// выделяем каждий "question" в катором не сделаный "checked" рамкой
				if (!hasChecked) {
					needAnswer = true;
					$(inputQuestion).css('border', '1px solid red');
				} else {
					$(inputQuestion).css('border', 'none');
				}
			};
			if (needAnswer) {
				alert("Сделайте выбор");
			} else {
				// проверка на правильные "answers" на каждый "questions" 
				var allChecked = true;
				for (var _i = 0; _i < questions.length; _i++) {
					var n = questions[_i].check;
					var check = $('#questions' + _i + '_lab' + n)[0].checked;
					if (!check) {
						allChecked = false;
						break;
					}
				}
				// уведомление про правильность ответов
				if (allChecked) {
					modal = "Take my congratulation , yours answers are correct!!!";
				} else {
					modal = "Yours answers are false, try again later!!!";
				};
				// создание модального окна с выводом "modal"
				box = $('<div class="modalBox"></div>');
				show = $('<div class="modal"><a>"' + modal + '"</a><div class="modalButtom"><input type="submit" id="submit" value="Ok"></div></div>');
				body.append(box);
				body.append(show);
			}
			// при клике на кнопку "Ok" удаляет модальное окно и чистит форму
			$('#submit').on('click', function () {
				box.remove();
				show.remove();
				var inputs = $('form input');
				Array.prototype.forEach.call(inputs, function (input) {
					return input.checked = false;
				});
			});
		});
	});
});
