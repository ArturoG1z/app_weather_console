require('colors');
const menuQuestions = [
	{
		type: "list",
		name: "option",
		message: "What do you want to do?",
		pageSize: 11,
		choices: [
			{
				value: 1,
				name: `${"1.".green} Search place`,
			},
			{
				value: 2,
				name: `${"2.".green} History`,
			},
			{
				value: 0,
				name: `${"0.".green} Exit`,
			},
		],
	},
];

const enterQuestion = [
  {
    type: "input",
    name: "enter",
    message: `Press ${'ENTER'.green} to continue... `,
  },
];


const inputQuestion = (message) => [
	{
		type: "input",
		name: "desc",
		message: message,
		validate(value) {
			if(value.length === 0){
				return 'Please insert a value :D';
			}
			return true;
		}
	},
];

const placeChoices = (places) => {
	const choices = [
		{
			value: '0',
			name: `0.`.green + ' Cancel'
		},
		...places.map((place, i) =>  {
			const idx = `${i + 1}.`.green;
			return {
				value: place.id,
				name: `${idx} ${place.place_name}`
			}
		})
	];

	return [
		{
			type: 'list',
			name: 'id',
			message: 'Select the place:',
			pageSize: 11,
			choices
		}
	];
}

const checklistQuestions = (tasks) => {
	const choices = tasks.map((task, i) =>  {
		const idx = `${i + 1}.`.green;
		return {
			value: task.id,
			name: `${idx} ${task.desc}$`,
			checked: (task.completedOn) ? true : false
		}
	});

	return [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selections: ',
			choices
		}
	];
}

const confirmQuestion = (message) => [
	{
		type: "confirm",
		name: "ok",
		message
	},
];

module.exports = {
  menuQuestions,
  enterQuestion,
  inputQuestion,
	placeChoices,
	checklistQuestions,
	confirmQuestion
}
