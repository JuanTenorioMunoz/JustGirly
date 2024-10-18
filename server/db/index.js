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
			{ option: 'A. Hacer ejercicio regularmente', image: '//server/assets/2A.png' },
			{ option: 'B. Llevar una alimentación más saludable', image: '//server/assets/2B.png' },
			{ option: 'C.  Aprender algo nuevo (un idioma, una habilidad)', image: '//server/assets/2C.png' },
			{ option: 'D. Meditar, practicar mindfulness o journaling', image: '//server/assets/2D.png' },
		],
	},
	{
		id: 3,
		question: '¿Cuál de estas afirmaciones te resuena para tu mejor versión del 2025?',
		options: [
			{ option: 'A. Estoy en paz y me cuido a mí misma', image: '//server/assets/3A.png' },
			{ option: 'B. Soy exitosa y estoy cumpliendo mis metas', image: '//server/assets/3B.png' },
			{ option: 'C.  Vivo la vida con alegría y creatividad', image: '//server/assets/3C.png' },
			{ option: 'D. Soy una persona equilibrada y en crecimiento constante', image: '//server/assets/3D.png' },
		],
	},
	{
		id: 4,
		question: '¿Cuáles son tus vacaciones soñadas para el 2025? ',
		options: [
			{ option: 'A. Viaje a la playa', image: '//server/assets/4A.png' },
			{ option: 'B. Cabaña privada en medio de las montañas', image: '//server/assets/4B.png' },
			{ option: 'C.  Eurotrip', image: '//server/assets/4C.png' },
			{ option: 'D. Aventura en medio de la naturaleza', image: '//server/assets/4D.png' },
		],
	},

	{
		id: 5,
		question: '¿Qué color representara mejor tu energía para el 2025? ',
		options: [
			{ option: 'A. Rosa: Amor propio y dulzura', image: '//server/assets/5A.png' },
			{ option: 'B. Dorado: Éxito y prosperidad', image: '//server/assets/5B.png' },
			{ option: 'C.  Azul: Paz y claridad', image: '//server/assets/5C.png' },
			{ option: 'D. Morado: Transformación y empoderamiento', image: '//server/assets/5D.png' },
		],
	},

	{
		id: 6,
		question: 'Si pudieras lograr un objetivo en 2025, ¿cuál sería? ',
		options: [
			{ option: 'A. Lograr  cuidar mejor de mi salud y crecimiento personal', image: '//server/assets/6A.png' },
			{ option: 'B. Alcanzar una meta profesional importante', image: '//server/assets/6B.png' },
			{ option: 'C. Viajar y descubrir nuevos lugares', image: '//server/assets/6C.png' },
			{ option: 'D.  Iniciar un proyecto personal o creativo', image: '//server/assets/6D.png' },
		],
	},

	{
		id: 7,
		question: '¿Qué aspecto de tu vida deseas simplificar en 2025? ',
		options: [
			{ option: 'A. Mi entorno físico (organización de espacios)', image: '//server/assets/7A.png' },
			{ option: 'B. Mi rutina diaria (gestión del tiempo)', image: '//server/assets/7B.png' },
			{ option: 'C. Mis relaciones interpersonales', image: '//server/assets/7C.png' },
			{ option: 'D.  Enfocarme en mi (imagen personal, mentalidad, finanzas, etc).', image: '//server/assets/7D.png' },
		],
	},

	{
		id: 8,
		question: '¿Cómo te gustaría contribuir a la comunidad o al mundo en 2025? ',
		options: [
			{ option: 'A. Voluntariado en una causa que me inspire', image: '//server/assets/8A.png' },
			{ option: 'B. Iniciar un proyecto que beneficie a otros', image: '//server/assets/8B.png' },
			{ option: 'C. Compartir mis conocimientos y experiencia', image: '//server/assets/8C.png' },
			{ option: 'D. Crear conciencia sobre temas importantes', image: '//server/assets/8D.png' },
		],
	},

	{
		id: 9,
		question: '¿Cuál será tu principal enfoque financiero en 2025? ',
		options: [
			{ option: 'A. Ahorrar/invertir y gestionar mejor mis finanzas', image: '//server/assets/9A.png' },
			{ option: 'B. Invertir en mi educación o desarrollo profesional', image: '//server/assets/9B.png' },
			{ option: 'C. Empezar un negocio o proyecto rentable', image: '//server/assets/9C.png' },
			{ option: 'D. Planificar viajes y experiencias significativas', image: '//server/assets/9D.png' },
		],
	},

	{
		id: 10,
		question: '¿Qué emoción quieres experimentar más a menudo en 2025? ',
		options: [
			{ option: 'A. Gratitud', image: '//server/assets/10A.png' },
			{ option: 'B. Felicidad', image: '//server/assets/10B.png' },
			{ option: 'C. Paz', image: '//server/assets/10C.png' },
			{ option: 'D. Motivación/Empoderamiento', image: '//server/assets/10D.png' },
		],
	},
];

module.exports = { users, questions };
