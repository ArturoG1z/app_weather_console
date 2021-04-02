const inquirer = require("inquirer");
const {
	menuQuestions,
	enterQuestion,
	inputQuestion,
	placeChoices,
	checklistQuestions,
	confirmQuestion,
} = require("./configInquier");
require("colors");

const inquirerMenu = async () => {
	console.clear();
	console.log(
		(
			"============================\n" +
			"     Select an option\n" +
			"============================\n"
		).green
	);
	const { option } = await inquirer.prompt(menuQuestions);
	return option;
};

const pause = async () => {
	await inquirer.prompt(enterQuestion);
};

const readInput = async (message) => {
	const question = inputQuestion(message);
	const { desc } = await inquirer.prompt(question);
	return desc;
};

const listPlaces = async (places = []) => {
	const questions = placeChoices(places);
	const { id } = await inquirer.prompt(questions);
	return id;
};

const showListChecklist = async (tasks = []) => {
	const questions = checklistQuestions(tasks);
	const { ids } = await inquirer.prompt(questions);
	return ids;
};

const confirm = async (message) => {
	const question = confirmQuestion(message);
	const { ok } = await inquirer.prompt(question);
	return ok;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	listPlaces,
	confirm,
	showListChecklist,
};
