/**
 * The database is a simple array of objects. Each object is a record in the database.
 * eg:
 * const users = []
 * const orders = []
 * const stores = []
 * ...
 */

const users = [];

const questions = [
	{
		id: 1,
		question: 'En 2025, ¿Cómo te visualizas en cuanto a tu mentalidad y crecimiento personal?',
		options: [
			{ option: 'A. Más segura de mí misma y de mis decisiones', image: 'opciones/1opA.png' },
			{ option: 'B. Siempre buscando aprender y mejorar', image: 'opciones/1opB.png' },
			{ option: 'C. Desafiándome a ser mi mejor versión cada día', image: 'opciones/1opC.png' },
			{ option: 'D. Viviendo en armonía con mis pensamientos y emociones', image: 'opciones/1opD.png' },
		],
	},
	{
		id: 2,
		question: '¿Cuál es tu mayor motivación para crecer?',
		options: [
			{ option: 'A. Lograr mis objetivos personales', image: 'opciones/2opA.png' },
			{ option: 'B. Inspirar a otros', image: 'opciones/2opB.png' },
			{ option: 'C. Superar mis miedos', image: 'opciones/2opC.png' },
			{ option: 'D. Encontrar mi propósito en la vida', image: 'opciones/2opD.png' },
		],
	},
	// Agrega más preguntas aquí
];

module.exports = { users, questions };
