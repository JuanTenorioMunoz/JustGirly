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
			{ option: 'A. Más segura de mí misma y de mis decisiones', image: '//server/assets/1A.png' },
			{ option: 'B. Siempre buscando aprender y mejorar', image: '//server/assets/1B.png' },
			{ option: 'C. Desafiándome a ser mi mejor versión cada día', image: '//server/assets/1C.png' },
			{ option: 'D. Viviendo en armonía con mis pensamientos y emociones', image: '//server/assets/1D.png' },
		],
	},
	{
		id: 2,
		question: '¿Qué hábito te gustaría incorporar en tu rutina diaria para el 2025?',
		options: [
			{ option: 'A. Hacer ejercicio regularmente', image: 'opciones/2opA.png' },
			{ option: 'B. Llevar una alimentación más saludable', image: 'opciones/2opB.png' },
			{ option: 'C.  Aprender algo nuevo (un idioma, una habilidad)', image: 'opciones/2opC.png' },
			{ option: 'D. Meditar, practicar mindfulness o journaling', image: 'opciones/2opD.png' },
		],
	},
	{
		id: 3,
		question: '¿Cuál de estas afirmaciones te resuena para tu mejor versión del 2025?',
		options: [
			{ option: 'A. Estoy en paz y me cuido a mí misma', image: 'opciones/3opA.png' },
			{ option: 'B. Soy exitosa y estoy cumpliendo mis metas', image: 'opciones/3opB.png' },
			{ option: 'C.  Vivo la vida con alegría y creatividad', image: 'opciones/3opC.png' },
			{ option: 'D. Soy una persona equilibrada y en crecimiento constante', image: 'opciones/3opD.png' },
		],
	},
	{
		id: 4,
		question: '¿Cuáles son tus vacaciones soñadas para el 2025? ',
		options: [
			{ option: 'A. Viaje a la playa', image: 'opciones/4opA.png' },
			{ option: 'B. Cabaña privada en medio de las montañas', image: 'opciones/4opB.png' },
			{ option: 'C.  Eurotrip', image: 'opciones/4opC.png' },
			{ option: 'D. Aventura en medio de la naturaleza', image: 'opciones/4opD.png' },
		],
	},
	// Agrega más preguntas aquí
];

module.exports = { users, questions };
