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
		progress: { image: '../assets/progress1.png' },
		question: '1. En 2025, ¿Cómo te visualizas en cuanto a tu mentalidad y crecimiento personal?',
		options: [
			{ option: 'A. Más segura de mí misma y de mis decisiones', image: '../assets/1A.png' },
			{ option: 'B. Siempre buscando aprender y mejorar', image: '../assets/1B.png' },
			{ option: 'C. Desafiándome a ser mi mejor versión cada día', image: '../assets/1C.png' },
			{ option: 'D. Viviendo en armonía con mis pensamientos y emociones', image: '../assets/1D.png' },
		],
	},
	{
		id: 2,
		progress: { image: '../assets/progress2.png' },
		question: '2. ¿Qué hábito te gustaría incorporar en tu rutina diaria para el 2025?',
		options: [
			{ option: 'A. Hacer ejercicio regularmente', image: '../assets/2A.png' },
			{ option: 'B. Llevar una alimentación más saludable', image: '../assets/2B.png' },
			{ option: 'C.  Aprender algo nuevo (un idioma, una habilidad)', image: '../assets/2C.png' },
			{ option: 'D. Meditar, practicar mindfulness o journaling', image: '../assets/2D.png' },
		],
	},
	{
		id: 3,
		progress: { image: '../assets/progress3.png' },
		question: '3. ¿Cuál de estas afirmaciones te resuena para tu mejor versión del 2025?',
		options: [
			{ option: 'A. Estoy en paz y me cuido a mí misma', image: '../assets/3A.png' },
			{ option: 'B. Soy exitosa y estoy cumpliendo mis metas', image: '../assets/3B.png' },
			{ option: 'C.  Vivo la vida con alegría y creatividad', image: '../assets/3C.png' },
			{ option: 'D. Soy una persona equilibrada y en crecimiento constante', image: '../assets/3D.png' },
		],
	},
	{
		id: 4,
		progress: { image: '../assets/progress4.png' },
		question: '4. ¿Cuáles son tus vacaciones soñadas para el 2025? ',
		options: [
			{ option: 'A. Viaje a la playa', image: '../assets/4A.png' },
			{ option: 'B. Cabaña privada en medio de las montañas', image: '../assets/4B.png' },
			{ option: 'C.  Eurotrip', image: '../assets/4C.png' },
			{ option: 'D. Aventura en medio de la naturaleza', image: '../assets/4D.png' },
		],
	},

	{
		id: 5,
		progress: { image: '../assets/progress5.png' },
		progress: { image: '../assets/progress4.png' },
		question: '5. ¿Qué color representara mejor tu energía para el 2025? ',
		options: [
			{ option: 'A. Rosa: Amor propio y dulzura', image: '../assets/5A.png' },
			{ option: 'B. Dorado: Éxito y prosperidad', image: '../assets/5B.png' },
			{ option: 'C.  Azul: Paz y claridad', image: '../assets/5C.png' },
			{ option: 'D. Morado: Transformación y empoderamiento', image: '../assets/5D.png' },
		],
	},

	{
		id: 6,
		progress: { image: '../assets/progress6.png' },
		question: '6. Si pudieras lograr un objetivo en 2025, ¿cuál sería? ',
		options: [
			{ option: 'A. Lograr  cuidar mejor de mi salud y crecimiento personal', image: '../assets/6A.png' },
			{ option: 'B. Alcanzar una meta profesional importante', image: '../assets/6B.png' },
			{ option: 'C. Viajar y descubrir nuevos lugares', image: '../assets/6C.png' },
			{ option: 'D.  Iniciar un proyecto personal o creativo', image: '../assets/6D.png' },
		],
	},

	{
		id: 7,
		progress: { image: '../assets/progress7.png' },
		question: '7. ¿Qué aspecto de tu vida deseas simplificar en 2025? ',
		options: [
			{ option: 'A. Mi entorno físico (organización de espacios)', image: '../assets/7A.png' },
			{ option: 'B. Mi rutina diaria (gestión del tiempo)', image: '../assets/7B.png' },
			{ option: 'C. Mis relaciones interpersonales', image: '../assets/7C.png' },
			{ option: 'D.  Enfocarme en mi (imagen personal, mentalidad, finanzas, etc).', image: '../assets/7D.png' },
		],
	},

	{
		id: 8,
		progress: { image: '../assets/progress8.png' },
		question: '8. ¿Cómo te gustaría contribuir a la comunidad o al mundo en 2025? ',
		options: [
			{ option: 'A. Voluntariado en una causa que me inspire', image: '../assets/8A.png' },
			{ option: 'B. Iniciar un proyecto que beneficie a otros', image: '../assets/8B.png' },
			{ option: 'C. Compartir mis conocimientos y experiencia', image: '../assets/8C.png' },
			{ option: 'D. Crear conciencia sobre temas importantes', image: '../assets/8D.png' },
		],
	},

	{
		id: 9,
		progress: { image: '../assets/progress9.png' },
		question: '9. ¿Cuál será tu principal enfoque financiero en 2025? ',
		options: [
			{ option: 'A. Ahorrar/invertir y gestionar mejor mis finanzas', image: '../assets/9A.png' },
			{ option: 'B. Invertir en mi educación o desarrollo profesional', image: '../assets/9B.png' },
			{ option: 'C. Empezar un negocio o proyecto rentable', image: '../assets/9C.png' },
			{ option: 'D. Planificar viajes y experiencias significativas', image: '../assets/9D.png' },
		],
	},

	{
		id: 10,
		progress: { image: '../assets/progress10.png' },
		question: '10. ¿Qué emoción quieres experimentar más a menudo en 2025? ',
		options: [
			{ option: 'A. Gratitud', image: '../assets/10A.png' },
			{ option: 'B. Felicidad', image: '../assets/10B.png' },
			{ option: 'C. Paz', image: '../assets/10C.png' },
			{ option: 'D. Motivación/Empoderamiento', image: '../assets/10D.png' },
		],
	},
];

const currentPrompt = {};

const currentvs = {};

const currentsupaurl = {};

module.exports = { users, questions, currentPrompt, currentvs, currentsupaurl };
