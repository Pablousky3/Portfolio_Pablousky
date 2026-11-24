// 01. INICIO: decide qué vista montar y conecta controles comunes.
document.addEventListener("DOMContentLoaded", () => {
  const isProjectPage = document.body.dataset.page === "project";
  if (isProjectPage) {
    applyStaticLanguage();
    renderProjectPage();
  } else {
    renderSkills();
    renderProjects();
    renderDocuments();
    renderExperiences();
    renderAwards();
    applyStaticLanguage();
    setupDocumentFilters();
    setupScrollAnimations();
    setup3DCards();
    setupFloatingPhysics();
  }
  setupNavigation();
  $("#modal-close")?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (modalBackdrop && !modalBackdrop.hidden) {
      closeModal();
      return;
    }
    if (isProjectPage) window.location.href = "index.html#projects";
  });
});

// 02. MARCA: alterna la imagen estática y animada del personaje.
const character = document.querySelector(".brand-character");

if (character) {
  const staticImage = character.src;
  const animatedGif = character.dataset.gif;
  character.addEventListener("mouseenter", () => {
    character.src = animatedGif;
  });
  character.addEventListener("mouseleave", () => {
    character.src = staticImage;
  });
}

// 03. UTILIDADES: normalización de listas y registro de eventos.
const arr = (value) => (Array.isArray(value) ? value : []);

const onAll = (selector, event, callback, root = document) =>
  root
    .querySelectorAll(selector)
    .forEach((element) => element.addEventListener(event, callback));

// 04. DATOS — HABILIDADES: categorías, descripciones y herramientas.
const skills = [
  {
    title: "Diseño y prototipado",
    label: "ÁREA PRINCIPAL",
    wide: true,
    tools: [
      {
        name: "Unity",
        image: "Imagenes/Habilidades/Aplicaciones/unity-logo.png",
      },
      {
        name: "Unreal",
        image: "Imagenes/Habilidades/Aplicaciones/Unreal.png",
      },
      {
        name: "Construct",
        image:
          "Imagenes/Habilidades/Aplicaciones/construct-logo-DF244B4ECA-seeklogo.com.png",
      },
      {
        name: "Figma",
        image: "Imagenes/Habilidades/Aplicaciones/Figma-logo.svg.png",
      },
      {
        name: "Miro",
        image: "Imagenes/Habilidades/Aplicaciones/Miro.png",
      },
      {
        name: "Notion",
        image: "Imagenes/Habilidades/Aplicaciones/Notion-logo.svg.png",
      },
    ],
    image: "Imagenes/Habilidades/Diseño de videojuegos.gif",
    description:
      "Me gusta pensar en las reglas como el idioma del juego: tienen que ser claras, pero también dejar espacio para que el jugador las interprete y se sorprenda.",
    items: [
      [
        "Diseño de Narrativa",
        "Me encargo de crear y estructurar la historia, personajes, universo y diálogos, integrando la narrativa con las mecánicas y la experiencia del jugador.",
      ],
      [
        "Level design",
        "Me encargo de diseñar los espacios jugables, recorridos, retos, objetivos y ritmo de los niveles para construir una experiencia equilibrada y atractiva.",
      ],
      [
        "Diseño de sistemas",
        "Me encargo de diseñar las reglas, mecánicas, progresión, recursos y relaciones entre los diferentes sistemas que conforman la experiencia de juego.",
      ],
      [
        "UX/UI",
        "Me encargo de diseñar y optimizar la experiencia del usuario, facilitando la interacción con las interfaces, sistemas y mecánicas de forma clara, intuitiva y accesible.",
      ],
      [
        "Prototipado y Testeo",
        "Me encargo de crear prototipos para probar y validar mecánicas, sistemas e ideas de diseño, detectando problemas y realizando iteraciones antes de su implementación final.",
      ],
      [
        "Documentación",
        "Me encargo de estructurar y mantener la documentación del proyecto, definiendo mecánicas, sistemas, niveles y procesos para facilitar la comunicación y el desarrollo del equipo.",
      ],
      [
        "Gamificación",
        "Me encargo de aplicar principios y mecánicas de diseño de juegos a experiencias interactivas para fomentar la participación, motivación y consecución de objetivos.",
      ],
    ],
  },
  {
    title: "Inteligencia artificial",
    label: "ÁREA COMPLEMENTARIA",
    image: "Imagenes/Habilidades/Inteligencia Artificial.png",
    tools: [
      {
        name: "Copilot",
        image: "Imagenes/Habilidades/Aplicaciones/IAs/microsoft-copilot.png",
      },
      {
        name: "ChatGPT",
        image:
          "Imagenes/Habilidades/Aplicaciones/IAs/chatgpt-logo-png_seeklogo-465219.png",
      },
      {
        name: "Claude",
        image:
          "Imagenes/Habilidades/Aplicaciones/IAs/claude-logo-png_seeklogo-554534.png",
      },
      {
        name: "Gemini",
        image: "Imagenes/Habilidades/Aplicaciones/IAs/Gemini-icon.png",
      },
    ],
    description:
      "Estoy aprendiendo a usar la IA como una herramienta de exploración, no como un sustituto de las decisiones.",
    wide: true,
    items: [
      [
        "Fundamentos de IA y Machine Learning",
        "Me encargo de comprender y aplicar conceptos fundamentales de Inteligencia Artificial y Machine Learning en diferentes contextos y procesos creativos.",
      ],
      [
        "Prompting",
        "Me encargo de diseñar y optimizar prompts para obtener resultados precisos y adaptados a diferentes necesidades creativas.",
      ],
      [
        "Soft IA",
        "Me encargo de utilizar herramientas de IA orientadas a la generación de contenido, automatización y apoyo a procesos creativos.",
      ],
      [
        "Aplicacion de IA para el analisis de datos",
        "Me encargo de aplicar herramientas de Inteligencia Artificial al análisis, interpretación y explotación de datos.",
      ],
      [
        "Aplicación de herramientas para optimización",
        "Me encargo de identificar, seleccionar y aplicar herramientas de IA según las necesidades de cada proyecto, integrándolas en diferentes fases del proceso creativo.",
      ],
    ],
  },
  {
    title: "Programación",
    label: "ÁREA COMPLEMENTARIA",
    image: "Imagenes/Habilidades/Programacion.jpg",
    tools: [
      {
        name: "C#",
        image: "Imagenes/Habilidades/Aplicaciones/Programación/c sharp.png",
      },
      {
        name: "Unreal Blueprint",
        image:
          "Imagenes/Habilidades/Aplicaciones/Programación/Unreal blueprint.png",
      },
      {
        name: "Html",
        image: "Imagenes/Habilidades/Aplicaciones/Programación/Html.png",
      },
      {
        name: "Css",
        image: "Imagenes/Habilidades/Aplicaciones/Programación/Css.png",
      },
      {
        name: "Java script",
        image: "Imagenes/Habilidades/Aplicaciones/Programación/Js.png",
      },
    ],
    description:
      "Programo lo suficiente para que una idea deje de ser una explicación y se convierta en algo que podamos jugar.",
    items: [
      [
        "C#",
        "Me encargo de programar videojuegos en Unity utilizando C#, creando mecánicas, sistemas e interacciones.",
      ],
      [
        "Blueprint unreal",
        "Me encargo de crear mecánicas y sistemas para videojuegos utilizando Blueprints en Unreal Engine.",
      ],
      [
        "Html, css y js",
        "Me encargo de crear páginas web utilizando HTML, CSS y JavaScript, trabajando tanto en el diseño como en la funcionalidad.",
      ],
      [
        "Aprendiendo C++",
        "Actualmente estoy aprendiendo C++ para ampliar mis conocimientos de programación y aplicarlos al desarrollo de videojuegos y aplicaciones.",
      ],
    ],
  },
  {
    title: "Arte",
    label: "ÁREA COMPLEMENTARIA",
    image: "Imagenes/Habilidades/Arte.gif",
    tools: [
      {
        name: "Aseprite",
        image: "Imagenes/Habilidades/Aplicaciones/Dibujo/Logo_Aseprite.svg.png",
      },
      {
        name: "Photoshop",
        image:
          "Imagenes/Habilidades/Aplicaciones/Dibujo/Adobe_Photoshop_CC_icon.svg.png",
      },
      {
        name: "Ilustrator",
        image:
          "Imagenes/Habilidades/Aplicaciones/Dibujo/Adobe_Illustrator_CC_icon.svg.png",
      },
    ],
    description:
      "El arte me ayuda a pensar con claridad y a que una idea empiece a tener una identidad propia.",
    items: [
      [
        "Pixel Art",
        "Me encargo de crear sprites, objetos y pequeños elementos visuales en pixel art para videojuegos.",
      ],
      [
        "Bocetado",
        "Utilizo bocetos sencillos para representar y desarrollar ideas antes de llevarlas a una versión más elaborada.",
      ],
      [
        "Diseño de mapas",
        "Me encargo de crear mapas y niveles cuadriculados, organizando espacios, recorridos y elementos del escenario.",
      ],
      [
        "Documentación visual",
        "Utilizo dibujos y esquemas para explicar mecánicas, diseños y conceptos de forma visual.",
      ],
    ],
  },
];

const skillItemDescriptions = {
  "Diseño de Narrativa": "I create and structure stories, characters, worlds and dialogue, integrating narrative with mechanics and the player experience.",
  "Level design": "I design playable spaces, routes, challenges, objectives and level pacing to build a balanced and engaging experience.",
  "Diseño de sistemas": "I design the rules, mechanics, progression, resources and relationships between the systems that shape the game experience.",
  "UX/UI": "I design and optimise the user experience, making interfaces, systems and mechanics clear, intuitive and accessible.",
  "Prototipado y Testeo": "I create prototypes to test and validate mechanics, systems and design ideas, identifying problems and iterating before final implementation.",
  "Documentación": "I structure and maintain project documentation, defining mechanics, systems, levels and processes to support team communication and development.",
  "Gamificación": "I apply game design principles and mechanics to interactive experiences to encourage participation, motivation and goal achievement.",
  "Fundamentos de IA y Machine Learning": "I understand and apply fundamental Artificial Intelligence and Machine Learning concepts in different creative contexts and processes.",
  "Prompting": "I design and optimise prompts to produce accurate results adapted to different creative needs.",
  "Soft IA": "I use AI tools for content generation, automation and support across creative processes.",
  "Aplicacion de IA para el analisis de datos": "I apply Artificial Intelligence tools to the analysis, interpretation and use of data.",
  "Aplicación de herramientas para optimización": "I identify, select and apply AI tools according to each project's needs, integrating them into different stages of the creative process.",
  "C#": "I program Unity video games in C#, creating mechanics, systems and interactions.",
  "Blueprint unreal": "I create mechanics and systems for video games using Blueprints in Unreal Engine.",
  "Html, css y js": "I create websites with HTML, CSS and JavaScript, working on both design and functionality.",
  "Aprendiendo C++": "I am currently learning C++ to expand my programming knowledge and apply it to video game and application development.",
  "Pixel Art": "I create sprites, objects and small visual elements in pixel art for video games.",
  "Bocetado": "I use simple sketches to represent and develop ideas before turning them into a more polished version.",
  "Diseño de mapas": "I create grid-based maps and levels, organising spaces, routes and elements of the environment.",
  "Documentación visual": "I use drawings and diagrams to explain mechanics, designs and concepts visually.",
};

// 05. DATOS — PROYECTOS: ficha bilingüe, medios, equipo y tema.
const projects = [
  {
    slug: "bugged-out",
    caseStyle: "noir",
    published: true,
    featured: true,
    title: {
      es: "Bugged Out",
      en: "Bugged Out",
    },
    type: {
      es: "Videojuego",
      en: "Video Game",
    },
    date: {
      es: "2026",
      en: "2026",
    },
    status: {
      es: "En proceso",
      en: "In progress",
    },
    description: {
      es: "Aventura narrativa en tercera persona ambientada en un mundo noir de insectos, centrada en la investigación y la toma de decisiones.",
      en: "Third-person narrative adventure set in a noir insect world, focused on investigation and decision-making.",
    },
    role: {
      es: "Diseñador de narrativa",
      en: "Narrative Designer",
    },
    tools: {
      es: "Unreal Engine",
      en: "Unreal Engine",
    },
    image: "",
    video: "Imagenes/Juegos/Bugged Out/Presentacion MIG.mp4",
    cardImage: "Imagenes/Juegos/Bugged Out/Presentacion MIG.gif",
    cardVideo: "Imagenes/Juegos/Bugged Out/Presentacion MIG.gif",
    website: {
      enabled: false,
      url: "",
      label: {
        es: "Visitar la página del juego",
        en: "Visit the game website",
      },
    },
    theme: {
      primary: "#444545",
      deep: "#0e0505",
      accent: "#f70303",
      secondary: "#8e0000",
      glow: "rgba(255, 7, 7, 0.16)",
      grid: "rgba(247, 243, 236, 0.08)",
      radius: "20px",
    },
    team: {
      name: {
        es: "Evil Duck",
        en: "Evil Duck",
      },
      members: [
        {
          name: {
            es: "Andrés Calvo",
          },
          role: {
            es: "Arte y Cinemáticas",
            en: "Art & Cinematics",
          },
        },
        {
          name: {
            es: "Lucía Pelado",
          },
          role: {
            es: "Arte",
            en: "Art",
          },
        },
        {
          name: {
            es: "Rodrigo López-Salazar",
          },
          role: {
            es: "Diseño y Level Design",
            en: "Design & Level Design",
          },
        },
        {
          name: {
            es: "Pablo Manuel Martín",
          },
          role: {
            es: "Programación",
            en: "Programming",
          },
        },
        {
          name: {
            es: "Pablo Menéndez-Morán",
          },
          role: {
            es: "Diseño de Narrativa",
            en: "Narrative Design",
          },
        },
      ],
    },
    summary: {
      paragraphs: [
        {
          es: "Bugged Out es una aventura narrativa en tercera persona que combina la estética del cine noir con un mundo de insectos antropomórficos. En una ciudad corrupta y decadente, el jugador se adentra en una investigación marcada por la intriga, los dilemas morales y una lucha constante por la supervivencia a través de la exploración y los interrogatorios.",
          en: "Bugged Out is a third-person narrative adventure blending film noir aesthetics with an anthropomorphic insect world. Set in a decaying city, players dive into an investigation defined by moral dilemmas, clues, and survival.",
        },
        {
          es: "El objetivo principal del diseño fue fusionar mecánicas de investigación clásica con un ritmo cinematográfico, asegurando que cada elección del jugador altere de forma orgánica la tensión de los diálogos y la percepción de los personajes.",
          en: "The core design goal was blending classic investigation mechanics with a cinematic pace, ensuring player choices organically shift dialogue tension and character perception.",
        },
      ],
      details: [
        {
          label: {
            es: "Género",
            en: "Genre",
          },
          value: {
            es: "Aventura Narrativa / Noir",
            en: "Narrative Adventure / Noir",
          },
        },
        {
          label: {
            es: "Motor",
            en: "Engine",
          },
          value: {
            es: "Unreal Engine 5",
            en: "Unreal Engine 5",
          },
        },
        {
          label: {
            es: "Estado",
            en: "Status",
          },
          value: {
            es: "En desarrollo activo",
            en: "In active development",
          },
        },
      ],
    },
    gallery: [
      {
        src: "Imagenes/Juegos/Bugged Out/Presentacion MIG.gif",
        caption: { es: "Presentación y atmósfera general", en: "Presentation and overall atmosphere" },
      },
      {
        src: "Imagenes/Juegos/Bugged Out/Interrogar.gif",
        caption: { es: "Mecánica de interrogatorios y pistas", en: "Interrogation and clue mechanics" },
      },
      {
        src: "Imagenes/Juegos/Bugged Out/Movimiento y ambiente.gif",
        caption: { es: "Exploración de escenarios urbanos", en: "Urban environment exploration" },
      },
      {
        src: "Imagenes/Juegos/Bugged Out/Noctrium.gif",
        caption: { es: "Diseño de iluminación y tono noir", en: "Lighting design and noir tone" },
      },
    ],
    galleryIntro: {
      es: "Escenas de la ciudad noir y del proceso de investigación: interrogatorios, exploración y decisiones visuales.",
      en: "Scenes from the noir city and investigation process: interrogations, exploration and visual decisions.",
    },
    contributions: [
      {
        title: {
          es: "Estructura de diálogos y ramas narrativas",
          en: "Dialogue tree & narrative branching",
        },
        text: {
          es: "Diseñé el árbol de decisiones de los interrogatorios para que el jugador no solo obtenga información, sino que gestione la presión emocional del sospechoso, afectando directamente al flujo de la investigación.",
          en: "Designed the interrogation choice tree so players manage the suspect's emotional pressure while gathering intel, directly impacting the investigation flow.",
        },
        image: "",
        imageAlt: {
          es: "Esquema del sistema de diálogos",
          en: "Dialogue system flowchart",
        },
      },
      {
        title: {
          es: "Integración jugable de la narrativa ambiental",
          en: "Environmental storytelling integration",
        },
        text: {
          es: "Colaboré estrechamente con el equipo de Level Design para posicionar pistas visuales y elementos estéticos que refuercen la atmósfera de corrupción sin saturar la interfaz del usuario.",
          en: "Worked closely with Level Design to place visual clues and atmospheric props reinforcing the corruption theme without cluttering the UI.",
        },
        image: "",
        imageAlt: {
          es: "Diseño de escenarios y pistas",
          en: "Level design and clues",
        },
      },
    ],
    learned: {
      text: {
        es: "Este proyecto me enseñó la importancia de validar las ramas narrativas mediante playtesting temprano. Comprendí que un guion complejo no sirve de nada si el feedback visual del jugador no es inmediato.",
        en: "This project taught me the importance of validating narrative branches through early playtesting. I learned complex writing fails if player visual feedback isn't immediate.",
      },
      points: [
        {
          es: "Equilibrar la cantidad de texto con la interactividad directa.",
          en: "Balancing text quantity with direct interactivity.",
        },
        {
          es: "Diseñar árboles de decisión legibles para el equipo de programación.",
          en: "Designing readable decision trees for programmers.",
        },
        {
          es: "Coordinar tono visual y progresión de la investigación.",
          en: "Coordinating visual tone and investigation progression.",
        },
      ],
    },
    visual: "visual-1",
  },
  {
    slug: "Videojuego ARG",
    caseStyle: "hotel",
    published: true,
    title: {
      es: "Hotel Alighieri",
      en: "Hotel Alighieri",
    },
    type: {
      es: "Videojuego con elementos ARG",
      en: "Video game with ARG elements",
    },
    date: {
      es: "2025",
      en: "2025",
    },
    status: {
      es: "Demo Publicada",
      en: "Published Demo",
    },
    description: {
      es: "Experiencia de terror psicológico y supervivencia que integra mecánicas de realidad alternativa (ARG).",
      en: "Psychological horror and survival experience integrating Alternate Reality Gaming (ARG) mechanics.",
    },
    role: {
      es: "Lead Designer & Lead Programmer",
      en: "Lead Designer & Lead Programmer",
    },
    tools: {
      es: "Unreal Engine",
      en: "Unreal Engine",
    },
    image: "",
    video: "Imagenes/Juegos/Hotel Alighieri/Presentación Hotel Alighieri.mp4",
    cardImage: "Imagenes/Juegos/Hotel Alighieri/Hotel alighieri.jpg",
    cardVideo: "Imagenes/Juegos/Hotel Alighieri/Hotel alighieri.jpg",
    website: {
      enabled: true,
      url: "https://bloodmoons-studios.itch.io/hotel-alighieri",
      label: {
        es: "Visitar la página del juego",
        en: "Visit the game website",
      },
    },
    theme: {
      primary: "#30302c",
      deep: "#0e0505",
      accent: "#c6d30f",
      secondary: "#8e0000",
      glow: "rgba(255, 7, 7, 0.16)",
      grid: "rgba(247, 247, 236, 0.08)",
      radius: "20px",
    },
    team: {
      name: {
        es: "BloodMoon Studios",
      },
      members: [
        {
          name: {
            es: "Pablo Menéndez-Morán",
          },
          role: {
            es: "Lead Design & Lead Programming",
            en: "Lead Design & Lead Programming",
          },
        },
      ],
    },
    summary: {
      paragraphs: [
        {
          es: "Hotel Alighieri propone una atmósfera opresiva donde el terror psicológico se entrelaza con enigmas externos al propio ejecutable del juego (elementos ARG). El jugador debe recopilar códigos, audios y pistas que trascienden la pantalla para avanzar en la narrativa.",
          en: "Hotel Alighieri creates an oppressive atmosphere intertwining psychological horror with puzzles extending outside the game executable (ARG elements). Players gather codes, audio logs, and clues transcending the screen.",
        },
        {
          es: "El planteamiento principal consistió en validar cómo la tensión jugable se multiplica cuando el entorno digital del jugador se convierte de forma sutil en parte del misterio.",
          en: "The core approach was validating how gameplay tension multiplies when the player's digital environment subtly becomes part of the mystery.",
        },
      ],
      details: [
        {
          label: {
            es: "Género",
            en: "Genre",
          },
          value: {
            es: "Terror psicológico / ARG",
            en: "Psychological Horror / ARG",
          },
        },
        {
          label: {
            es: "Motor",
            en: "Engine",
          },
          value: {
            es: "Unreal Engine",
            en: "Unreal Engine",
          },
        },
        {
          label: {
            es: "Estado",
            en: "Status",
          },
          value: {
            es: "Demo Pública en Itch.io",
            en: "Public Demo on Itch.io",
          },
        },
      ],
    },
    gallery: [],
    contributions: [
      {
        title: {
          es: "Diseño de sistemas de puzles cruzados",
          en: "Cross-media puzzle system design",
        },
        text: {
          es: "Programé e implementé la lógica de conexión entre los eventos dentro del juego y los archivos externos necesarios para resolver los misterios del hotel.",
          en: "Programmed and implemented the connection logic between in-game events and external files required to solve the hotel's mysteries.",
        },
        image: "",
        imageAlt: {
          es: "Arquitectura del puzle",
          en: "Puzzle architecture",
        },
      },
      {
        title: {
          es: "Dirección de ritmo y tensión atmosférica",
          en: "Pacing and atmospheric tension direction",
        },
        text: {
          es: "Ajusté los tiempos de aparición de estímulos sonoros y visuales para mantener al jugador en un estado constante de alerta sin caer en sobresaltos vacíos.",
          en: "Tuned the timing of audio and visual stimuli to keep players in constant suspense without relying on empty jump scares.",
        },
        image: "",
        imageAlt: {
          es: "Control de ritmo y terror",
          en: "Pacing and horror control",
        },
      },
    ],
    learned: {
      text: {
        es: "Aprendí a gestionar las expectativas del jugador en proyectos conceptualmente ambiciosos y la importancia de guiar sutilmente sin romper la inmersión del terror.",
        en: "I learned to manage player expectations in conceptually ambitious projects and the importance of subtle guidance without breaking horror immersion.",
      },
      points: [
        {
          es: "Diseñar pistas externas claras pero crípticas.",
          en: "Designing clear yet cryptic external clues.",
        },
        {
          es: "Programación orientada a sistemas modulares de terror en Unreal.",
          en: "Modular horror systems programming in Unreal.",
        },
        {
          es: "Análisis de telemetría de jugadores en demos públicas.",
          en: "Analyzing player telemetry in public demos.",
        },
      ],
    },
    visual: "visual-2",
  },
  {
    slug: "proyecto-colaborativo",
    caseStyle: "arena",
    published: true,
    title: {
      es: "Slap League",
      en: "Collaborative project",
    },
    type: {
      es: "Trabajo en equipo",
      en: "Team project",
    },
    date: {
      es: "Añadir fecha",
      en: "Add date",
    },
    status: {
      es: "Añadir proyecto real",
      en: "Add real project",
    },
    description: {
      es: "Explica qué necesitaba el equipo y qué parte concreta asumiste para que el proyecto avanzara.",
      en: "Explain what the team needed and which specific part you took on to move the project forward.",
    },
    role: {
      es: "Añadir tu rol",
      en: "Add your role",
    },
    tools: {
      es: "Añadir motor y herramientas",
      en: "Add engine and tools",
    },
    image: "",
    video: "",
    cardImage: "",
    cardVideo: "",
    website: {
      enabled: true,
      url: "",
      label: {
        es: "Visitar la página del juego",
        en: "Visit the game website",
      },
    },
    theme: {
      primary: "#2e625b",
      deep: "#111820",
      accent: "#b8d96b",
      secondary: "#ff6b4a",
      glow: "rgba(184, 217, 107, 0.14)",
      grid: "rgba(247, 243, 236, 0.08)",
      radius: "20px",
    },
    team: {
      name: {
        es: "Añadir nombre del equipo",
        en: "Add team name",
      },
      members: [
        {
          name: {
            es: "Nombre del integrante 1",
            en: "Member name 1",
          },
          role: {
            es: "Puesto del integrante 1",
            en: "Member role 1",
          },
        },
        {
          name: {
            es: "Nombre del integrante 2",
            en: "Member name 2",
          },
          role: {
            es: "Puesto del integrante 2",
            en: "Member role 2",
          },
        },
      ],
    },
    summary: {
      paragraphs: [
        {
          es: "Presenta el equipo, el encargo y el objetivo común del proyecto.",
          en: "Introduce the team, brief and shared goal.",
        },
        {
          es: "Explica qué necesitaba la experiencia para funcionar y dónde encajaba tu responsabilidad.",
          en: "Explain what the experience needed to work and where your responsibility fitted in.",
        },
      ],
      details: [
        {
          label: {
            es: "Motor / herramientas",
            en: "Engine / tools",
          },
          value: {
            es: "Añadir herramientas",
            en: "Add tools",
          },
        },
        {
          label: {
            es: "Equipo",
            en: "Team",
          },
          value: {
            es: "Añadir equipo",
            en: "Add team",
          },
        },
        {
          label: {
            es: "Estado",
            en: "Status",
          },
          value: {
            es: "Completado",
            en: "Completed",
          },
        },
      ],
    },
  },
  {
    slug: "Juego de cartas ",
    caseStyle: "cards",
    published: true,
    title: {
      es: "Cabras Locas",
      en: "Collaborative project",
    },
    type: {
      es: "Trabajo en equipo",
      en: "Team project",
    },
    date: {
      es: "Añadir fecha",
      en: "Add date",
    },
    status: {
      es: "Añadir proyecto real",
      en: "Add real project",
    },
    description: {
      es: "Explica qué necesitaba el equipo y qué parte concreta asumiste para que el proyecto avanzara.",
      en: "Explain what the team needed and which specific part you took on to move the project forward.",
    },
    role: {
      es: "Añadir tu rol",
      en: "Add your role",
    },
    tools: {
      es: "Añadir motor y herramientas",
      en: "Add engine and tools",
    },
    image: "",
    video: "",
    cardImage: "",
    cardVideo: "",
    website: {
      enabled: true,
      url: "",
      label: {
        es: "Visitar la página del juego",
        en: "Visit the game website",
      },
    },
    theme: {
      primary: "#2e625b",
      deep: "#111820",
      accent: "#b8d96b",
      secondary: "#ff6b4a",
      glow: "rgba(184, 217, 107, 0.14)",
      grid: "rgba(247, 243, 236, 0.08)",
      radius: "20px",
    },
    team: {
      name: {
        es: "Añadir nombre del equipo",
        en: "Add team name",
      },
      members: [
        {
          name: {
            es: "Nombre del integrante 1",
            en: "Member name 1",
          },
          role: {
            es: "Puesto del integrante 1",
            en: "Member role 1",
          },
        },
        {
          name: {
            es: "Nombre del integrante 2",
            en: "Member name 2",
          },
          role: {
            es: "Puesto del integrante 2",
            en: "Member role 2",
          },
        },
      ],
    },
    summary: {
      paragraphs: [
        {
          es: "Presenta el equipo, el encargo y el objetivo común del proyecto.",
          en: "Introduce the team, brief and shared goal.",
        },
        {
          es: "Explica qué necesitaba la experiencia para funcionar y dónde encajaba tu responsabilidad.",
          en: "Explain what the experience needed to work and where your responsibility fitted in.",
        },
      ],
      details: [
        {
          label: {
            es: "Motor / herramientas",
            en: "Engine / tools",
          },
          value: {
            es: "Añadir herramientas",
            en: "Add tools",
          },
        },
        {
          label: {
            es: "Equipo",
            en: "Team",
          },
          value: {
            es: "Añadir equipo",
            en: "Add team",
          },
        },
        {
          label: {
            es: "Estado",
            en: "Status",
          },
          value: {
            es: "Completado",
            en: "Completed",
          },
        },
      ],
    },
  },
];

// 06. DATOS — DOCUMENTOS: catálogo que alimenta filtros y modales.
const documents = [
  {
    title: {
      es: "GDD de diseño de juego",
      en: "Game design document",
    },
    project: {
      es: "Proyecto principal",
      en: "Main project",
    },
    category: "gameplay",
    label: {
      es: "GAMEPLAY",
      en: "GAMEPLAY",
    },
    format: "PDF",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Documento para explicar el contexto, las reglas principales, el objetivo de diseño y las decisiones que convierten una idea en una experiencia jugable.",
      en: "A document explaining the context, core rules, design goal and decisions that turn an idea into a playable experience.",
    },
    image: "Imagenes/Habilidades/Diseño de videojuegos.gif",
    url: "",
  },
  {
    title: {
      es: "Sistema y progresión",
      en: "Systems and progression",
    },
    project: {
      es: "Sistema interactivo",
      en: "Interactive system",
    },
    category: "systems",
    label: {
      es: "SISTEMAS",
      en: "SYSTEMS",
    },
    format: "PDF / XLSX",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Una plantilla para documentar variables, estados, recursos, progresión y relaciones entre sistemas sin perder de vista la experiencia del jugador.",
      en: "A framework for documenting variables, states, resources, progression and system relationships while keeping the player experience in focus.",
    },
    image: "Imagenes/Habilidades/Programacion.jpg",
    url: "",
  },
  {
    title: {
      es: "Flujo UX / UI",
      en: "UX / UI flow",
    },
    project: {
      es: "Interfaz en contexto",
      en: "Interface in context",
    },
    category: "ux",
    label: {
      es: "UX / UI",
      en: "UX / UI",
    },
    format: "PDF / FIGMA",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Un documento para conectar objetivos del jugador, arquitectura de información, wireframes y decisiones visuales antes de implementar una interfaz.",
      en: "A document connecting player goals, information architecture, wireframes and visual decisions before implementing an interface.",
    },
    image: "Imagenes/Habilidades/Aplicaciones/Figma-logo.svg.png",
    url: "",
  },
  {
    title: {
      es: "Análisis y aprendizajes",
      en: "Analysis and learnings",
    },
    project: {
      es: "Investigación de diseño",
      en: "Design research",
    },
    category: "research",
    label: {
      es: "INVESTIGACIÓN",
      en: "RESEARCH",
    },
    format: "PDF",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Análisis de referencias y pruebas para entender qué funciona, qué falla y qué decisiones merece la pena llevar a un prototipo.",
      en: "Reference analysis and testing to understand what works, what fails and which decisions are worth taking into a prototype.",
    },
    image: "Imagenes/Habilidades/Inteligencia Artificial.png",
    url: "",
  },
  {
    title: {
      es: "Movimiento y cámara",
      en: "Movement and camera",
    },
    project: {
      es: "Prototipo de mecánica",
      en: "Mechanic prototype",
    },
    category: "research",
    label: {
      es: "EXPERIMENTO",
      en: "EXPERIMENT",
    },
    format: "GIF / PROTOTIPO",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Una prueba pequeña para estudiar cómo el ritmo del movimiento cambia la lectura de un nivel.",
      en: "A small test exploring how movement rhythm changes the way a level is read.",
    },
    image: "/manus-storage/skill-design_b9258bcc.png",
    url: "",
  },
  {
    title: {
      es: "Interfaz en contexto",
      en: "Interface in context",
    },
    project: {
      es: "Experimento UX",
      en: "UX experiment",
    },
    category: "research",
    label: {
      es: "EXPERIMENTO",
      en: "EXPERIMENT",
    },
    format: "GIF / UX",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Una exploración de cómo presentar información sin interrumpir la atención del jugador.",
      en: "An exploration of how to present information without interrupting the player's attention.",
    },
    image: "/manus-storage/skill-art_a485fde1.png",
    url: "",
  },
  {
    title: {
      es: "Idea en 48 horas",
      en: "An idea in 48 hours",
    },
    project: {
      es: "Game jam",
      en: "Game jam",
    },
    category: "research",
    label: {
      es: "EXPERIMENTO",
      en: "EXPERIMENT",
    },
    format: "GIF / GAME JAM",
    year: "2026",
    languages: "ES / EN",
    description: {
      es: "Un experimento breve para aprender qué decisiones sobreviven cuando el tiempo obliga a priorizar.",
      en: "A short experiment to learn which decisions survive when time forces prioritisation.",
    },
    image: "/manus-storage/skill-programming_69e5ebc9.png",
    url: "",
  },
];

// 07. DATOS — EXPERIENCIA: formación, trayectoria y aprendizajes.
const experiences = [
  {
    title: {
      es: "Diseño y Desarrollo de Videojuegos y Entornos Virtuales",
      en: "Game Design and Virtual Environments",
    },
    organization: "UDIT",
    date: "2022 — 2026",
    image:
      "Imagenes/Experiencia/Diseño y desarrollo de videojuegos y entornos virtuales.jpg",
    description: {
      es: "Durante mi formación en Diseño y Desarrollo de Videojuegos en UDIT, me especializo en la rama de Diseño, aprendiendo a desarrollar videojuegos desde la conceptualización de una idea hasta su implementación. Trabajo en la creación de mecánicas, niveles, sistemas de juego y experiencias centradas en el jugador, colaborando con perfiles de programación y arte para desarrollar proyectos completos.",
      en: "During my Game Design and Development studies at UDIT, I specialise in the Design pathway, learning to develop games from the conceptualisation of an idea through to implementation. I work on mechanics, levels, game systems and player-centred experiences, collaborating with programming and art profiles to develop complete projects.",
    },
    areas: {
      es: [
        "Diseño de mecánicas y sistemas de juego.",
        "Diseño y planificación de niveles y mapas.",
        "Creación de prototipos y pruebas de gameplay.",
        "Diseño de narrativa y experiencias interactivas.",
        "Conceptualización y diseño visual de videojuegos.",
        "Diseño centrado en la experiencia del jugador.",
        "Desarrollo y documentación de ideas y conceptos.",
        "Trabajo en equipos multidisciplinares.",
        "Uso de Unity y Unreal Engine.",
        "Iteración y mejora a partir de pruebas y feedback.",
        "Desarrollo de proyectos prácticos y trabajos en equipo.",
      ],
      en: [
        "Game mechanics and systems design.",
        "Level and map design and planning.",
        "Prototype creation and gameplay testing.",
        "Narrative design and interactive experiences.",
        "Game visual conceptualisation and design.",
        "Player experience-centred design.",
        "Development and documentation of ideas and concepts.",
        "Multidisciplinary teamwork.",
        "Using Unity and Unreal Engine.",
        "Iteration and improvement through testing and feedback.",
        "Practical projects and collaborative work.",
      ],
    },
    learned: {
      es: "Esta formación me ha permitido construir una base sólida para diseñar experiencias jugables y trabajar dentro de equipos de desarrollo.",
      en: "This training has given me a strong foundation for designing playable experiences and working within development teams.",
    },
    learnedPoints: {
      es: [
        "Convertir ideas abstractas en prototipos jugables.",
        "Justificar decisiones de diseño mediante pruebas.",
        "Analizar el comportamiento y la experiencia del jugador.",
        "Colaborar con perfiles de programación y arte.",
        "Iterar y mejorar un proyecto a partir del feedback.",
      ],
      en: [
        "Turning abstract ideas into playable prototypes.",
        "Supporting design decisions through testing.",
        "Analysing player behaviour and experience.",
        "Collaborating with programming and art profiles.",
        "Iterating and improving a project through feedback.",
      ],
    },
  },
  {
    title: {
      es: "Curso básico de Inteligencia Artificial Aplicada",
      en: "Basic Applied Artificial Intelligence Course",
    },
    organization: "UDIT",
    date: "2024 — 2025",
    image: "Imagenes/Experiencia/IA basico.jpg",
    description: {
      es: "Durante este curso en UDIT me introduje en los fundamentos de la Inteligencia Artificial Aplicada y exploré cómo puede incorporarse de forma responsable a procesos creativos, de investigación y de desarrollo de proyectos.",
      en: "During this course at UDIT, I was introduced to the fundamentals of Applied Artificial Intelligence and explored how it can be responsibly integrated into creative, research and project development processes.",
    },
    areas: {
      es: [
        "Fundamentos de Inteligencia Artificial y Machine Learning.",
        "Comprensión de los principales tipos de herramientas de IA.",
        "Diseño y optimización de prompts.",
        "Generación y exploración de ideas creativas.",
        "Análisis y síntesis de información.",
        "Aplicación de IA a procesos de investigación.",
        "Automatización de tareas repetitivas.",
        "Evaluación crítica de resultados generados.",
        "Uso responsable y ético de la Inteligencia Artificial.",
        "Integración de herramientas de IA en proyectos.",
      ],
      en: [
        "Artificial Intelligence and Machine Learning fundamentals.",
        "Understanding the main types of AI tools.",
        "Prompt design and optimisation.",
        "Creative idea generation and exploration.",
        "Information analysis and synthesis.",
        "Applying AI to research processes.",
        "Automating repetitive tasks.",
        "Critical evaluation of generated results.",
        "Responsible and ethical use of AI.",
        "Integrating AI tools into projects.",
      ],
    },
    learned: {
      es: "El curso me ayudó a entender la IA como una herramienta de apoyo que necesita criterio, revisión y una intención clara.",
      en: "The course helped me understand AI as a support tool that requires judgement, review and a clear intention.",
    },
    learnedPoints: {
      es: [
        "Investigar y comparar herramientas según cada necesidad.",
        "Formular preguntas y prompts más precisos.",
        "Revisar los resultados antes de utilizarlos.",
        "Detectar limitaciones y posibles errores.",
        "Aplicar la IA de forma responsable en procesos creativos.",
      ],
      en: [
        "Researching and comparing tools according to each need.",
        "Formulating more precise questions and prompts.",
        "Reviewing results before using them.",
        "Detecting limitations and possible errors.",
        "Applying AI responsibly in creative processes.",
      ],
    },
  },
  {
    title: {
      es: "Curso intermedio de Inteligencia Artificial Aplicada",
      en: "Intermediate Applied Artificial Intelligence Course",
    },
    organization: "UDIT",
    date: "2025 — 2026",
    image: "Imagenes/Experiencia/IA intermedio.jpg",
    description: {
      es: "En el curso intermedio profundicé en el uso práctico de herramientas de Inteligencia Artificial para apoyar el análisis, la automatización y la toma de decisiones dentro de proyectos creativos y tecnológicos.",
      en: "In the intermediate course, I deepened my practical use of Artificial Intelligence tools to support analysis, automation and decision-making within creative and technological projects.",
    },
    areas: {
      es: [
        "Creación de prompts más precisos y estructurados.",
        "Diseño de flujos de trabajo asistidos por IA.",
        "Automatización y optimización de procesos.",
        "Análisis, clasificación e interpretación de datos.",
        "Comparación y selección de herramientas.",
        "Aplicación de IA a la documentación de proyectos.",
        "Apoyo a la ideación y al desarrollo de conceptos.",
        "Revisión y validación de resultados.",
        "Identificación de errores, sesgos y limitaciones.",
        "Integración de la IA manteniendo el criterio humano.",
      ],
      en: [
        "Creating more precise and structured prompts.",
        "Designing AI-assisted workflows.",
        "Process automation and optimisation.",
        "Data analysis, classification and interpretation.",
        "Comparing and selecting tools.",
        "Applying AI to project documentation.",
        "Supporting ideation and concept development.",
        "Reviewing and validating results.",
        "Identifying errors, bias and limitations.",
        "Integrating AI while keeping human judgement.",
      ],
    },
    learned: {
      es: "La experiencia me enseñó a combinar automatización y análisis sin perder la intención humana ni el control sobre las decisiones del proyecto.",
      en: "The experience taught me to combine automation and analysis without losing human intent or control over project decisions.",
    },
    learnedPoints: {
      es: [
        "Diseñar flujos de trabajo asistidos por IA.",
        "Automatizar tareas repetitivas y optimizar procesos.",
        "Analizar datos para apoyar decisiones.",
        "Validar los resultados antes de incorporarlos.",
        "Mantener el criterio humano en todo el proceso.",
      ],
      en: [
        "Designing AI-assisted workflows.",
        "Automating repetitive tasks and optimising processes.",
        "Analysing data to support decisions.",
        "Validating results before incorporating them.",
        "Keeping human judgement throughout the process.",
      ],
    },
  },
  {
    title: {
      es: "Prácticas diseñando Escape Rooms",
      en: "Escape Room Design Internship",
    },
    organization: "Icarus Escape",
    date: "2024 — 2025",
    image: "Imagenes/Experiencia/Icarus Escape.jpg",
    description: {
      es: "Durante mis prácticas en Icarus Escape participé en el diseño de experiencias de escape room, trabajando en retos, recorridos y momentos de descubrimiento pensados para grupos de jugadores reales.",
      en: "During my internship at Icarus Escape, I contributed to the design of escape room experiences, working on puzzles, flows and moments of discovery designed for real groups of players.",
    },
    areas: {
      es: [
        "Diseño de retos y puzles físicos.",
        "Creación de recorridos y secuencias de juego.",
        "Diseño de pistas y sistemas de descubrimiento.",
        "Equilibrado de dificultad y ritmo.",
        "Observación del comportamiento de los jugadores.",
        "Pruebas de juego con usuarios reales.",
        "Iteración a partir de feedback y resultados.",
        "Diseño de experiencias colaborativas.",
        "Comunicación de ideas dentro de un equipo.",
        "Adaptación de retos a distintos perfiles de jugador.",
      ],
      en: [
        "Physical puzzle and challenge design.",
        "Creating game flows and sequences.",
        "Designing clues and discovery systems.",
        "Balancing difficulty and pacing.",
        "Observing player behaviour.",
        "Playtesting with real users.",
        "Iterating from feedback and results.",
        "Designing collaborative experiences.",
        "Communicating ideas within a team.",
        "Adapting challenges to different player profiles.",
      ],
    },
    learned: {
      es: "Las prácticas me enseñaron a diseñar para personas reales, observar sus reacciones y convertir ese feedback en mejoras concretas.",
      en: "The internship taught me to design for real people, observe their reactions and turn that feedback into concrete improvements.",
    },
    learnedPoints: {
      es: [
        "Diseñar retos claros, estimulantes y colaborativos.",
        "Ajustar la dificultad y el ritmo de una experiencia.",
        "Observar cómo las personas interpretan las pistas.",
        "Detectar problemas mediante pruebas con usuarios reales.",
        "Comunicar ideas de forma clara dentro de un equipo.",
      ],
      en: [
        "Designing clear, engaging and collaborative challenges.",
        "Adjusting the difficulty and pacing of an experience.",
        "Observing how people interpret clues.",
        "Finding problems through testing with real users.",
        "Communicating ideas clearly within a team.",
      ],
    },
  },
];

// 08. TEXTOS DEL SITIO: etiquetas estáticas traducibles.
const siteCopy = {
  metaDescription: {
    es: "Portfolio de Pablo Menéndez-Morán, diseñador de videojuegos especializado en narrativa y sistemas.",
    en: "Portfolio of Pablo Menéndez-Morán, game designer focused on narrative and systems.",
  },
  nav: {
    about: {
      es: "Sobre mí",
      en: "About me",
    },
    skills: {
      es: "Habilidades",
      en: "Skills",
    },
    projects: {
      es: "Proyectos",
      en: "Projects",
    },
    documents: {
      es: "Investigación",
      en: "Research",
    },
    awards: {
      es: "Reconocimientos",
      en: "Recognition",
    },
    experience: {
      es: "Experiencia",
      en: "Experience",
    },
    contact: {
      es: "Contacto ↗",
      en: "Contact ↗",
    },
  },
  hero: {
    eyebrow: {
      es: "Diseñador de videojuegos · narrativa y sistemas",
      en: "Game designer · narrative and systems",
    },
    title: {
      es: "Diseñar es<br><em>entender más allá</em><br>de lo que se ve.",
      en: "To design is<br><em>to understand beyond</em><br> what is visible.",
    },
    lede: {
      es: "Diseño experiencias jugables centradas en la narrativa y los sistemas. Convierto ideas en prototipos y las refino mediante pruebas y feedback.",
      en: "I design playable experiences focused on narrative and systems. I turn ideas into prototypes, test them and refine them through feedback.",
    },
    button: {
      es: "Ver caso destacado →",
      en: "View featured case →",
    },
  },
  about: {
    eyebrow: {
      es: "Sobre mí",
      en: "About me",
    },
    title: {
      es: "Diseñar es <br><em>hacer preguntas.</em>",
      en: "Design is <br><em>asking questions.</em>",
    },
    stats: {
      projects: {
        label: { es: "Proyectos", en: "Projects" },
        detail: { es: "Publicados y jugables", en: "Published and playable" },
      },
      awards: {
        label: { es: "Reconocimientos", en: "Awards" },
        detail: { es: "Premios y menciones", en: "Awards and mentions" },
      },
      languages: {
        label: { es: "Idiomas", en: "Languages" },
        detail: { es: "Español nativo · Inglés C1", en: "Native Spanish · English C1" },
      },
    },
    character: {
      status: {
        es: "ONLINE · DISPONIBLE PARA PROYECTOS",
        en: "ONLINE · AVAILABLE FOR PROJECTS",
      },
      role: {
        es: "Diseñador de videojuegos · narrativa y sistemas",
        en: "Game designer · narrative and systems",
      },
      profile: {
        es: "Me muevo entre el diseño, el arte y el código porque muchas veces una buena idea no se entiende hasta que se puede tocar. Ahí es donde más disfruto: convirtiendo preguntas en prototipos.",
        en: "I work between design, art, and code because a good idea is often not understood until it can be touched. That is where I find the most enjoyment: turning questions into prototypes.",
      },
      profileTwo: {
        es: "Mi forma de trabajar es empezar por una pregunta, construir algo pequeño, probarlo con alguien y ajustar según el feedback. Me gusta colaborar con equipos que quieran hacer juegos con una voz propia.",
        en: "My way of working is to start with a question, build something small, put it in someone’s hands and refine it through feedback. I enjoy collaborating with teams who want to make games with a voice of their own.",
      },
      focusLabel: { es: "Elige tu enfoque", en: "Choose your focus" },
      attributesLabel: { es: "Afinidad", en: "Affinity" },
      passivesLabel: { es: "Habilidades pasivas", en: "Passive abilities" },
      focuses: [
        {
          id: "narrative",
          icon: "story",
          accent: "#ff6b4a",
          soft: "rgba(255, 107, 74, 0.12)",
          name: { es: "Narrativa", en: "Narrative" },
          tagline: { es: "Historia y mundo", en: "Story and world" },
          text: {
            es: "Empiezo por la pregunta que sostiene todo: qué quiere contar el juego. Diseño personajes, diálogos y reglas del mundo para que la historia no decore el sistema, sino que lo explique.",
            en: "I start with the question that holds everything together: what the game wants to say. I design characters, dialogue and world rules so the story doesn’t decorate the system — it explains it.",
          },
          core: ["narrative", "visual"],
          affinity: { narrative: 10, systems: 7, prototyping: 7, ux: 8, programming: 5, visual: 9 },
        },
        {
          id: "systems",
          icon: "systems",
          accent: "#b8d96b",
          soft: "rgba(184, 217, 107, 0.12)",
          name: { es: "Sistemas", en: "Systems" },
          tagline: { es: "Reglas y ritmo", en: "Rules and pacing" },
          text: {
            es: "Diseño las reglas que hacen que una decisión importe: progresión, economía, ritmo y feedback. Me interesa que el jugador entienda el sistema jugando, sin necesidad de un manual.",
            en: "I design the rules that make a decision matter: progression, economy, pacing and feedback. I want players to understand the system by playing, without needing a manual.",
          },
          core: ["systems", "prototyping"],
          affinity: { narrative: 7, systems: 10, prototyping: 9, ux: 8, programming: 7, visual: 6 },
        },
        {
          id: "prototype",
          icon: "prototype",
          accent: "#7cc7ff",
          soft: "rgba(124, 199, 255, 0.12)",
          name: { es: "Prototipo", en: "Prototype" },
          tagline: { es: "Prototipado, UX/UI y pruebas", en: "Prototyping, UX/UI and testing" },
          text: {
            es: "Diseño flujos e interfaces claras y accesibles; las convierto en prototipos, las pruebo con personas y las ajusto con su feedback.",
            en: "I design clear, accessible flows and interfaces, turn them into prototypes, test them with people and refine them through feedback.",
          },
          core: ["prototyping", "ux", "programming"],
          affinity: { narrative: 6, systems: 8, prototyping: 10, ux: 8, programming: 8, visual: 6 },
        },
      ],
      attributes: [
        { id: "narrative", name: { es: "Diseño narrativo", en: "Narrative design" }, detail: { es: "Historias · diálogos · mundos", en: "Stories · dialogue · worlds" } },
        { id: "systems", name: { es: "Diseño de sistemas", en: "Systems design" }, detail: { es: "Reglas · progresión · ritmo", en: "Rules · progression · pacing" } },
        { id: "prototyping", name: { es: "Prototipado", en: "Prototyping" }, detail: { es: "Probar · iterar · validar", en: "Test · iterate · validate" } },
        { id: "ux", name: { es: "UX / UI", en: "UX / UI" }, detail: { es: "Claridad · flujo · accesibilidad", en: "Clarity · flow · accessibility" } },
        { id: "programming", name: { es: "Programación", en: "Programming" }, detail: { es: "C# · Blueprint · web", en: "C# · Blueprint · web" } },
        { id: "visual", name: { es: "Dirección visual", en: "Visual direction" }, detail: { es: "Arte · mapas · identidad", en: "Art · maps · identity" } },
      ],
      passives: [
        { icon: "loop", title: { es: "Iteración constante", en: "Constant iteration" }, text: { es: "Construyo algo pequeño, lo pruebo y escucho lo que devuelve el juego.", en: "I build something small, test it, and listen to what the game gives back." } },
        { icon: "hybrid", title: { es: "Pensamiento híbrido", en: "Hybrid thinking" }, text: { es: "Conecto diseño, código y arte para que las ideas puedan tocarse.", en: "I connect design, code, and art so ideas can be felt and played." } },
        { icon: "team", title: { es: "Trabajo en equipo", en: "Team player" }, text: { es: "Comunico decisiones con claridad y dejo espacio para otras voces.", en: "I communicate decisions clearly and leave room for other voices." } },
      ],
    },
  },
  skills: {
    eyebrow: {
      es: "Habilidades",
      en: "Skills",
    },
    title: {
      es: "Lo que sé<br><em>hacer.</em>",
      en: "What I<br><em>do.</em>",
    },
    intro: {
      es: "No separo estas áreas como conocimientos individuales. Diseño es mi punto de partida; el resto me ayudan a probar, comunicar y entender mejor las ideas.",
      en: "I do not separate these areas as isolated bodies of knowledge. Design is my starting point; the others help me test, communicate, and better understand ideas.",
    },
  },
  projects: {
    eyebrow: {
      es: "Proyectos",
      en: "Projects",
    },
    title: {
      es: "Ideas hechas<br><em>jugables.</em>",
      en: "Ideas made<br><em>playable.</em>",
    },
    intro: {
      es: "Estos casos muestran cómo convierto ideas en experiencias jugables: el contexto, las decisiones de diseño y mi aportación en cada proyecto.",
      en: "These case studies show how I turn ideas into playable experiences: the context, design decisions and my contribution to each project.",
    },
  },
  documents: {
    eyebrow: {
      es: "Investigación",
      en: "Research",
    },
    title: {
      es: "Experimentos<br><em>y documentos.</em>",
      en: "Experiments<br><em>and documents.</em>",
    },
    intro: {
      es: "Un único nivel conectado: cada sala reúne documentos, experimentos y pruebas de diseño en un mismo recorrido.",
      en: "One connected floor: each room brings planning documents, experiments and design tests into a single route.",
    },
    archive: {
      es: "Elige una puerta",
      en: "Choose a gate",
    },
    definition: {
      es: "<strong>Recorrido:</strong> explora el nivel de sala en sala. Cada puerta abre su ficha con más detalles.",
      en: "<strong>Route:</strong> explore the floor room by room. Each door opens a detailed profile.",
    },
    filters: {
      all: {
        es: "Todo",
        en: "All",
      },
      gameplay: {
        es: "Gameplay",
        en: "Gameplay",
      },
      systems: {
        es: "Sistemas",
        en: "Systems",
      },
      ux: {
        es: "UX / UI",
        en: "UX / UI",
      },
      research: {
        es: "Experimentos",
        en: "Experiments",
      },
    },
  },
  awards: {
    eyebrow: {
      es: "Reconocimientos",
      en: "Recognition",
    },
    title: {
      es: "Trabajo que<br><em>deja señal.</em>",
      en: "Work that<br><em>leaves a mark.</em>",
    },
    intro: {
      es: "Son momentos y proyectos que me han dado una excusa para seguir haciendo cosas. Pulsa una tarjeta para conocer el contexto y ver la referencia externa.",
      en: "These are moments and projects that gave me another reason to keep making things. Open a card to see the context and the external reference.",
    },
  },
  experience: {
    eyebrow: {
      es: "Experiencia",
      en: "Experience",
    },
    title: {
      es: "Aprender<br><em>haciendo.</em>",
      en: "Learning<br><em>by doing.</em>",
    },
    intro: {
      es: "No es una lista de puestos perfectos: son los lugares y aprendizajes que han ido dando forma a mi manera de diseñar.",
      en: "This is not a list of perfect job titles: it is a record of the places and lessons that have shaped the way I design.",
    },
  },
  contact: {
    eyebrow: {
      es: "Contacto",
      en: "Contact",
    },
    title: {
      es: "¿Hablamos de<br><em>un juego?</em>",
      en: "Shall we talk about<br><em>a game?</em>",
    },
    body: {
      es: "Si tienes una idea, un prototipo a medias o un problema de diseño que quieras mirar desde otro ángulo, escríbeme. Me gusta hablar de juegos antes de que estén resueltos.",
      en: "If you have an idea, a half-finished prototype or a design problem you want to look at from another angle, write to me. I like talking about games before they are solved.",
    },
    button: {
      es: "Escribir un mensaje →",
      en: "Write a message →",
    },
    github: {
      es: "GitHub <small>pendiente</small>",
      en: "GitHub <small>pending</small>",
    },
    cv: {
      es: "CV <small>pendiente</small>",
      en: "CV <small>pending</small>",
    },
  },
  footer: {
    description: {
      es: "Diseñado, desarrollado y revisado muchas veces con curiosidad.",
      en: "Designed, developed and revised many times with curiosity.",
    },
    back: {
      es: "Volver arriba ↑",
      en: "Back to top ↑",
    },
  },
};

// 09. DICCIONARIO: equivalencias para el contenido breve y dinámico.
const translations = {
  "Sobre mí": "About me",
  Habilidades: "Skills",
  Proyectos: "Projects",
  Laboratorio: "Lab",
  Reconocimientos: "Recognition",
  Experiencia: "Experience",
  Contacto: "Contact",
  Documentación: "Documentation",
  "Ideas convertidas": "Ideas turned",
  "Explorar archivo": "Explore archive",
  Todo: "All",
  Sistemas: "Systems",
  Investigación: "Research",
  Piezas: "Pieces",
  "Archivo vivo": "Living archive",
  "Abrir documento": "Open document",
  "Documento por publicar": "Document to publish",
  "Proyecto relacionado": "Related project",
  Formato: "Format",
  Idiomas: "Languages",
  Año: "Year",
  "Pequeñas pruebas": "Small experiments",
  "Abrir experimento": "Open experiment",
  "Ver mis proyectos": "View my projects",
  "Ver ficha completa": "View full case study",
  "Ver página del proyecto": "View project page",
  "Volver a proyectos": "Back to projects",
  Proceso: "Process",
  Resultado: "Result",
  "Ver experiencia": "View experience",
  "Qué hice": "What I did",
  "Principales áreas trabajadas": "Main areas covered",
  "Qué aprendí": "What I learned",
  "Ver reconocimiento": "View recognition",
  "Escribir un mensaje": "Write a message",
  "Volver arriba": "Back to top",
  "ÁREA PRINCIPAL": "CORE AREA",
  "ÁREA COMPLEMENTARIA": "SUPPORTING AREA",
  "Diseño de videojuegos": "Game design",
  "Diseño y prototipado": "Design and prototyping",
  "Inteligencia artificial": "Artificial intelligence",
  Arte: "Art",
  Programación: "Programming",
  "Me gusta pensar en las reglas como el idioma del juego: tienen que ser claras, pero también dejar espacio para que el jugador las interprete y se sorprenda.":
    "I like to think of rules as the language of a game: they have to be clear, while still leaving room for the player to interpret them and be surprised.",
  "Estoy aprendiendo a usar la IA como una herramienta de exploración, no como un sustituto de las decisiones.":
    "I am learning to use AI as a tool for exploration, not as a substitute for decision-making.",
  "Programo lo suficiente para que una idea deje de ser una explicación y se convierta en algo que podamos jugar.":
    "I code enough for an idea to stop being an explanation and become something we can play.",
  "El arte me ayuda a pensar con claridad y a que una idea empiece a tener una identidad propia.":
    "Art helps me think clearly and gives an idea the beginnings of its own identity.",
  "Diseño de Narrativa": "Narrative design",
  "Diseño de sistemas": "Systems design",
  "UX/UI": "UX/UI",
  "Prototipado y Testeo": "Prototyping and testing",
  Gamificación: "Gamification",
  "Fundamentos de IA y Machine Learning":
    "AI and machine learning fundamentals",
  Prompting: "Prompting",
  "Soft IA": "Soft AI",
  "Aplicacion de IA para el analisis de datos": "AI for data analysis",
  "Aplicación de herramientas para optimización": "Tools for optimisation",
  "Blueprint unreal": "Unreal Blueprints",
  "Html, css y js": "HTML, CSS and JS",
  "Aprendiendo C++": "Learning C++",
  "Pixel Art": "Pixel art",
  "Diseño de mapas": "Map design",
  "Documentación visual": "Visual documentation",
  "Premio de Publicación y 3º Puesto": "Publication Award and 3rd place",
  "Añadir motor y herramientas": "Add engine and tools",
  "Añadir tu rol": "Add your role",
  "Añadir fecha": "Add date",
  "Contenido por completar": "Content to complete",
  "Añadir proyecto real": "Add real project",
  "Caso destacado": "Featured case",
  "Proyecto no encontrado": "Project not found",
  "La ficha solicitada no está disponible. Vuelve al portfolio para explorar los casos publicados.":
    "This case study is not available. Return to the portfolio to explore the published work.",
  "Diseño de mecánicas": "Mechanics design",
  "UX y documentación": "UX and documentation",
  Ideación: "Ideation",
  "Prototipado visual": "Visual prototyping",
  "Criterio y revisión": "Judgement and review",
  "Dirección visual": "Visual direction",
  Bocetado: "Sketching",
  "Pixel art": "Pixel art",
  Composición: "Composition",
  Prototipado: "Prototyping",
  "C#": "C#",
  "Unreal y Construct": "Unreal and Construct",
  "Desarrollo web": "Web development",
  Herramientas: "Tools",
  Reconocimiento: "Recognition",
  "Visitar página externa": "Visit external page",
  "Abrir enlace externo": "Open external link",
  "Ficha de proyecto": "Project case study",
  Resumen: "Overview",
  "Mis contribuciones": "My contributions",
  "Detalles del proyecto": "Project details",
  Galería: "Gallery",
  "Abrir demo": "Open demo",
  "Fecha de creación": "Created",
  "Mi rol": "My role",
  Descripción: "Description",
  "Lo aprendido": "What I learned",
  "Resumen del juego": "Game overview",
  "Galería del proyecto": "Project gallery",
  "Visitar la página del juego": "Visit the game website",
  "Equipo": "Team",
  "Cerrar navegación": "Close navigation",
  "Abrir navegación": "Open navigation",
  "Rol y herramientas": "Role and tools",
  "Puntos de Rebote": "Bounce points",
  "Congelar física": "Freeze physics",
  "Reanudar física": "Resume physics",
  "Jugar con físicas": "Play with physics",
  "Salir": "Exit",
  "Récord": "High score",
  "Haz doble clic para reiniciar el récord": "Double-click to reset the high score",
  "Reiniciar récord": "Reset high score",
  "¿Deseas reiniciar tu récord a 0?": "Do you want to reset your high score to 0?",
  "Puntuación": "Score",
  "HIT ESTRELLA": "STAR HIT",
  "¡EXPLOSIÓN ESTELAR x2!": "STAR BURST x2!",
  "Caso de estudio": "Case study",
  "Experimento jugable": "Playable experiment",
  "Trabajo en equipo": "Team project",
  "Reto de innovación": "Innovation challenge",
  "Hackathon de impacto": "Impact hackathon",
  "Primer puesto": "First place",
  Fotografía: "Photography",
  Ideathon: "Ideathon",
  "Game Jam": "Game Jam",
  "Movimiento y cámara": "Movement and camera",
  "Interfaz en contexto": "Interface in context",
  "Idea en 48 horas": "An idea in 48 hours",
  "Prototipo de mecánica": "Mechanic prototype",
  "Experimento UX": "UX experiment",
  "Una prueba pequeña para estudiar cómo el ritmo del movimiento cambia la lectura de un nivel.":
    "A small test exploring how movement rhythm changes the way a level is read.",
  "Una exploración de cómo presentar información sin interrumpir la atención del jugador.":
    "An exploration of how to present information without interrupting the player's attention.",
  "Un experimento breve para aprender qué decisiones sobreviven cuando el tiempo obliga a priorizar.":
    "A short experiment to learn which decisions survive when time forces prioritisation.",
  "Match in Games · UDIT": "Match in Games · UDIT",
  "IndesIAhack · Ferrovial": "IndesIAhack · Ferrovial",
  "IndesIAhack · Global": "IndesIAhack · Global",
  "Hack For Good · Telefónica": "Hack For Good · Telefónica",
  "HackSTEM · Barrio Sésamo India": "HackSTEM · Sesame Street India",
  "Ideathon Amadeus": "Amadeus Ideathon",
  "Madrid Game Jam": "Madrid Game Jam",
  "Premio de fotografía OPPO × UDIT": "OPPO × UDIT Photography Award",
};

// 10. IDIOMA: resolución de textos según la selección actual.
let language = "es";

const tr = (text) => {
  if (text && typeof text === "object") return text[language] || text.es || "";
  return language === "en" ? translations[text] || text : text;
};

// 11. DATOS — RECONOCIMIENTOS: tarjetas y referencias externas.
const awards = [
  {
    title: "Match in Games · UDIT",
    category: "Premio de Publicación y 3º Puesto",
    image: "Imagenes/premios/Match in games.jpeg",
    description:
      "Un reto que me permitió trabajar con restricciones reales y pensar en cómo convertir una idea tecnológica en algo que una persona pueda entender y usar. Completa aquí el proyecto, tu rol y el resultado concreto.",
    url: "https://www.nintenderos.com/2026/06/match-in-games-2026-asi-fue-la-feria-de-videojuegos-de-udit/",
  },
  {
    title: "IndesIAhack · Ferrovial",
    category: "Reto de innovación",
    image: "Imagenes/premios/Diploma_ganador_Ferrovial.jpg",
    description:
      "Un reto que me permitió trabajar con restricciones reales y pensar en cómo convertir una idea tecnológica en algo que una persona pueda entender y usar. Completa aquí el proyecto, tu rol y el resultado concreto.",
    url: "https://www.indesia.org/conoce-a-los-ganadores-de-la-primera-fase-de-indesiahack/",
  },
  {
    title: "IndesIAhack · Global",
    category: "Reto de innovación",
    image: "Imagenes/premios/Indesiahack.png",
    description:
      "Un reto que me permitió trabajar con restricciones reales y pensar en cómo convertir una idea tecnológica en algo que una persona pueda entender y usar. Completa aquí el proyecto, tu rol y el resultado concreto.",
    url: "https://www.udit.es/proyectos-de-exito/cuatro-estudiantes-de-udit-triunfan-en-el-indesiahack/",
  },
  {
    title: "Hack For Good · Telefónica",
    category: "Hackathon de impacto",
    image: "Imagenes/premios/Hack_for_good.jpeg",
    description:
      "Una experiencia centrada en diseñar con impacto y escuchar bien el problema antes de lanzarse a construir una solución. Completa aquí el reto y tu aportación exacta.",
    url: "https://www.udit.es/proyectos-de-exito/tres-estudiantes-del-grado-en-diseno-y-desarrollo-de-videojuegos-ganan-el-tercer-puesto-en-la-hackaton-hackforgood-de-telefonica/",
  },
  {
    title: "HackSTEM · Barrio Sésamo India",
    category: "Primer puesto",
    image: "Imagenes/premios/HackSTEM_Certificate_First_Place.png",
    description:
      "Un proyecto que me obligó a pensar cómo hacer que una idea fuese clara, cercana y útil para su público. Añade aquí el reto, el proceso y el resultado exactos.",
    url: "https://www.udit.es/proyectos-de-exito/los-alumnos-del-grado-en-diseno-y-desarrollo-de-videojuegos-de-udit-ganadores-de-hackstem/",
  },
  {
    title: "Ideathon Amadeus",
    category: "Ideathon",
    image: "Imagenes/premios/Ideathon-Amadeus-premios-82-scaled-1.jpg",
    description:
      "Una oportunidad para convertir una intuición en una propuesta defendible en poco tiempo. Completa aquí la idea presentada y las decisiones de diseño.",
    url: "https://www.udit.es/en/amadeus-celebra-con-los-alumnos-de-esne-una-maraton-creativa-en-torno-al-metaverso/",
  },
  {
    title: "Madrid Game Jam",
    category: "Game Jam",
    image: "Imagenes/premios/Madrid_game_jam.jpg",
    description:
      "Una experiencia concentrada de diseño, decisiones rápidas y trabajo en equipo. Completa aquí el juego, la temática y tu contribución.",
    url: "https://www.udit.es/proyectos-de-exito/siete-proyectos-de-alumnos-de-udit-entre-los-ganadores-de-la-vi-edicion-de-game-jam-madrid-crea/",
  },
  {
    title: "Premio de fotografía OPPO × UDIT",
    category: "Fotografía",
    image: "Imagenes/premios/Oppo_imagine_if.jpeg",
    description:
      "Un reconocimiento que también forma parte de mi manera de observar, encuadrar y comunicar una idea con pocos elementos. Añade aquí la obra y la publicación correspondiente.",
    url: "https://www.udit.es/en/succesful-projects/siete-estudiantes-de-udit-ganadores-en-el-concurso-de-fotografia-oppo-imagine-if-photography-award-udit-edition/",
  },
];

const awardDescriptions = {
  "Match in Games · UDIT": "A challenge that allowed me to work within real constraints and explore how to turn a technological idea into something people can understand and use. The project, my role and the concrete outcome are documented in the external reference.",
  "IndesIAhack · Ferrovial": "A challenge focused on working within real constraints and turning a technological idea into something people can understand and use. The project, my role and the concrete outcome are documented in the external reference.",
  "IndesIAhack · Global": "A challenge focused on working within real constraints and turning a technological idea into something people can understand and use. The project, my role and the concrete outcome are documented in the external reference.",
  "Hack For Good · Telefónica": "An experience focused on designing for impact and understanding the problem before building a solution. The challenge and my exact contribution are documented in the external reference.",
  "HackSTEM · Barrio Sésamo India": "A project that challenged me to make an idea clear, approachable and useful for its audience. The challenge, process and exact outcome are documented in the external reference.",
  "Ideathon Amadeus": "An opportunity to turn an intuition into a defensible proposal in a short time. The presented idea and design decisions are documented in the external reference.",
  "Madrid Game Jam": "A concentrated experience of design, fast decisions and teamwork. The game, theme and my contribution are documented in the external reference.",
  "Premio de fotografía OPPO × UDIT": "A recognition that also reflects the way I observe, frame and communicate an idea with very few elements. The work and related publication are documented in the external reference.",
};

// 12. HELPERS DE PROYECTO: búsqueda y variables de tema.
const projectText = (value) => tr(value);

const projectBySlug = (slug) => {
  const normalizedSlug = String(slug || "").trim();
  return (
    projects.find(
      (project) =>
        project.published !== false && project.slug.trim() === normalizedSlug,
    ) || null
  );
};

const projectThemeStyle = (project) =>
  Object.entries(project.theme || {})
    .map(([name, value]) => `--project-${name}:${value}`)
    .join(";");

// 13. RENDER — FICHA: genera el caso de estudio solicitado en la URL.
function renderProjectPage() {
  const target = $("#project-page");
  if (!target) return;

  const params = new URLSearchParams(window.location.search);
  const project = projectBySlug(params.get("project"));
  if (!project) {
    const notFoundTitle = tr("Proyecto no encontrado");
    document.title = `${notFoundTitle} · Pablo`;
    target.innerHTML = `
      <article class="project-page-article project-case project-not-found">
        <p class="eyebrow">${tr("Caso de estudio")}</p>
        <h1>${notFoundTitle}</h1>
        <p>${tr("La ficha solicitada no está disponible. Vuelve al portfolio para explorar los casos publicados.")}</p>
        <a class="button button-primary" href="index.html#projects">${tr("Volver a proyectos")} →</a>
      </article>`;
    return;
  }

  Object.entries(project.theme || {}).forEach(([name, value]) =>
    target.style.setProperty(`--project-${name}`, value),
  );

  const title = projectText(project.title);
  const heroMedia = project.image
    ? `<img class="project-page-image" src="${project.image}" alt="${title}">`
    : project.video
      ? `<video class="project-page-video" controls autoplay muted loop playsinline src="${project.video}"></video>`
      : "";
  const heroCover = heroMedia
    ? `<div class="project-study-cover">${heroMedia}</div>`
    : "";
  const paragraphs = arr(project.summary?.paragraphs)
    .map((item) => `<p>${projectText(item)}</p>`)
    .join("");
  const teamMembers = arr(project.team?.members).filter(
    (member) => member && (member.name || member.role),
  );
  const teamDetail = project.team
    ? `<div class="project-detail-item project-team-inline">
        <span>${tr("Equipo")}</span>
        <strong>${projectText(project.team.name)}</strong>
        <div class="project-team-members">${teamMembers
          .map(
            (member) =>
              `<div class="project-team-member"><b>${projectText(member.name)}</b><span>${projectText(member.role)}</span></div>`,
          )
          .join("")}</div>
      </div>`
    : "";
  const details =
    arr(project.summary?.details)
      .filter(
        (item) =>
          !["Equipo", "Estudio / equipo", "Team", "Studio / team"].includes(
            projectText(item.label),
          ),
      )
      .map(
        (item) =>
          `<div class="project-detail-item"><span>${projectText(item.label)}</span><b>${projectText(item.value)}</b></div>`,
      )
      .join("") + teamDetail;
  const gallery = arr(project.gallery).filter(
    (item) => item && (item.src || item.image),
  );

  let nextSectionNumber = 1;
  const sectionNumber = () =>
    String(nextSectionNumber++).padStart(2, "0");
  const summaryNumber = sectionNumber();
  const galleryNumber = gallery.length ? sectionNumber() : "";
  const contributionItems = arr(project.contributions).filter(
    (item) => item && (item.title || item.text),
  );
  const contributionsNumber = contributionItems.length ? sectionNumber() : "";
  const learnedPoints = arr(project.learned?.points).filter(Boolean);
  const learnedText = projectText(project.learned?.text || "");
  const hasLearnedSection = Boolean(learnedText || learnedPoints.length);
  const learnedNumber = hasLearnedSection ? sectionNumber() : "";

  const galleryMarkup = gallery
    .map((item, index) => {
      const src = item.src || item.image;
      const alt = projectText(item.alt) || `${title} ${index + 1}`;
      const caption = projectText(item.caption || "");
      return `<figure class="project-gallery-item"><img src="${src}" alt="${alt}">${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
    })
    .join("");
  const galleryIntro = projectText(project.galleryIntro || "");
  const gallerySection = gallery.length
    ? `<section class="project-study-section project-gallery-section">
        <div class="project-study-heading"><span class="eyebrow">${galleryNumber}</span><div><p class="project-study-kicker">${tr("Galería")}</p><h2>${tr("Galería del proyecto")}</h2></div></div>
        ${galleryIntro ? `<p class="project-gallery-intro">${galleryIntro}</p>` : ""}
        <div class="project-gallery-grid">${galleryMarkup}</div>
      </section>`
    : "";

  const contributions = contributionItems
    .map((item, index) => {
      const media = item.image
        ? `<figure class="project-contribution-media"><img src="${item.image}" alt="${projectText(item.imageAlt) || projectText(item.title)}"></figure>`
        : "";
      const textOnlyClass = media ? "" : " is-text-only";
      return `<article class="project-contribution-block${index % 2 ? " is-reversed" : ""}${textOnlyClass}">
        <div class="project-contribution-copy">
          <span class="project-section-number">${String(index + 1).padStart(2, "0")}</span>
          <h3>${projectText(item.title)}</h3>
          <p>${projectText(item.text)}</p>
        </div>
        ${media}
      </article>`;
    })
    .join("");
  const contributionSection = contributions
    ? `<section class="project-study-section project-contributions-section">
        <div class="project-study-heading"><span class="eyebrow">${contributionsNumber}</span><div><p class="project-study-kicker">${tr("Mis contribuciones")}</p><h2>${tr("Mis contribuciones")}</h2></div></div>
        <div class="project-contributions-stack">${contributions}</div>
      </section>`
    : "";
  const learnedList = learnedPoints.length
    ? `<ul>${learnedPoints.map((point) => `<li>${projectText(point)}</li>`).join("")}</ul>`
    : "";
  const learnedSection = hasLearnedSection
    ? `<section class="project-study-section project-learned-section">
        <div class="project-study-heading"><span class="eyebrow">${learnedNumber}</span><div><p class="project-study-kicker">${tr("Lo aprendido")}</p><h2>${tr("Lo aprendido")}</h2></div></div>
        <div class="project-learned-content">${learnedText ? `<p>${learnedText}</p>` : ""}${learnedList}</div>
      </section>`
    : "";

  const websiteReady =
    project.website?.enabled !== false && project.website?.url;
  const websiteLabel = projectText(
    project.website?.label || "Visitar la página del juego",
  );
  const gamepadIcon = `<svg class="gamepad-icon" viewBox="0 0 64 48" aria-hidden="true" focusable="false"><path d="M14.5 8h35c6.2 0 10.7 4.2 12.1 10.3l2.2 9.8c1.6 7.1-2.1 11.5-6.9 11.5-3.1 0-5.5-1.8-7.8-5l-2.5-3.5H17.4l-2.5 3.5c-2.3 3.2-4.7 5-7.8 5-4.8 0-8.5-4.4-6.9-11.5l2.2-9.8C3.7 12.2 8.3 8 14.5 8Z"/><path d="M16 17v10M11 22h10M44 19h.01M51 25h.01"/></svg>`;
  const website = websiteReady
    ? `<a class="project-floating-game-link" data-game-link href="${project.website.url}" target="_blank" rel="noreferrer" aria-label="${websiteLabel}" title="${websiteLabel}">${gamepadIcon}</a>`
    : "";

  document.title = `${title} · Pablo`;
  target.innerHTML = `<article class="project-page-article project-case ${project.visual}">
    <a class="project-back" href="index.html#projects">← ${tr("Volver a proyectos")}</a>
    <header class="project-study-hero">
      <p class="eyebrow">${projectText(project.type)}</p>
      <h1>${title}</h1>
      <p class="project-page-lede">${projectText(project.description)}</p>
      <div class="project-role-tools" aria-label="${language === "en" ? "Role and tools" : "Rol y herramientas"}">
        <div class="project-role-tools-item"><span>${tr("Mi rol")}</span><strong>${projectText(project.role)}</strong></div>
        <div class="project-role-tools-item"><span>${tr("Herramientas")}</span><strong>${projectText(project.tools)}</strong></div>
      </div>
      ${heroCover}
    </header>

    <section class="project-study-section project-summary-section">
      <div class="project-study-heading"><span class="eyebrow">${summaryNumber}</span><div><p class="project-study-kicker">${tr("Resumen")}</p><h2>${tr("Resumen del juego")}</h2></div></div>
      <div class="project-summary-layout"><div class="project-summary-copy">${paragraphs}</div><aside class="project-details-card">${details}</aside></div>
    </section>

    ${gallerySection}
    ${contributionSection}
    ${learnedSection}
    ${website}
  </article>`;

  const gameLink = target.querySelector("[data-game-link]");
  if (gameLink) {
    gameLink.addEventListener("click", (event) => {
      const message =
        language === "en"
          ? "Do you want to visit the game's website?"
          : "¿Quieres visitar la página web del juego?";
      if (!window.confirm(message)) event.preventDefault();
    });
  }
}

// 14. DOCUMENTACIÓN: mapa de salas, detalle modal y puertas de filtro.
let activeDocumentFilter = "all";
let documentRouteObserver = null;
let documentRouteFrame = 0;

function openDocumentModal(item) {
  const external = item.url
    ? `<a class="button button-dark" href="${item.url}" target="_blank" rel="noreferrer">${tr("Abrir enlace externo")} ↗</a>`
    : `<p class="modal-note">${tr("Documento por publicar")}</p>`;
  openModal(
    `<img class="document-modal-image" src="${item.image}" alt=""><p class="eyebrow">${tr(item.label)} · ${item.year}</p><h2 id="modal-title">${tr(item.title)}</h2><p class="modal-lede">${tr(item.description)}</p><div class="project-meta"><span>${tr("Proyecto relacionado")}<b>${tr(item.project)}</b></span><span>${tr("Formato")}<b>${item.format}</b></span><span>${tr("Idiomas")}<b>${item.languages}</b></span></div>${external}`,
  );
}

function renderDocumentRoom(item, documentIndex, roomIndex, isTestingRoom) {
  const english = language === "en";
  const roomType = isTestingRoom
    ? english ? "PLAYTEST ROOM" : "SALA DE PRUEBAS"
    : english ? "PLANNING ROOM" : "SALA DE PLANIFICACIÓN";
  const openLabel = english ? "Open room" : "Abrir sala";
  const missingPreview = english ? "PREVIEW NOT AVAILABLE" : "VISTA PREVIA NO DISPONIBLE";

  return `
    <article class="document-card document-room${isTestingRoom ? " document-room--testing" : " document-room--planning"}" style="--room-index:${roomIndex};--room-accent:${isTestingRoom ? "#ff795f" : "#e1bb70"}" data-document-card="${documentIndex}">
      <div class="document-room-head">
        <span class="document-room-number">${english ? "ROOM" : "SALA"} ${String(roomIndex + 1).padStart(2, "0")}</span>
        <span class="document-room-type">${roomType}</span>
      </div>
      <div class="document-room-viewport">
        <img class="document-room-image" src="${item.image}" alt="" loading="lazy">
        <span class="document-room-empty" aria-hidden="true">${missingPreview}</span>
        <span class="document-room-format">${item.format}</span>
      </div>
      <div class="document-room-body">
        <div class="document-room-meta-top">
          <span class="document-room-category">${tr(item.label)}</span>
          <span class="document-room-year">${item.year}</span>
        </div>
        <h3>${tr(item.title)}</h3>
        <p class="document-room-description">${tr(item.description)}</p>
        <div class="document-room-footer">
          <span>${tr(item.project)}</span>
          <span>${item.languages}</span>
        </div>
        <button type="button" class="document-open" data-document-open="${documentIndex}" aria-label="${openLabel}: ${tr(item.title)}">
          <span>${openLabel}</span><span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>`;
}

function renderDocumentLevel(rooms, roomCount) {
  const english = language === "en";
  const roomLabel = english ? "rooms" : "salas";
  const zoneTitle = english ? "Level routes" : "Recorrido de niveles";
  const zoneId = "documents-level-title";

  return `
    <section class="documents-zone documents-zone--dungeon" aria-labelledby="${zoneId}">
      <header class="documents-zone-head">
        <div class="documents-zone-heading">
          <span class="documents-zone-index">01 / ${english ? "FLOOR · ARCHIVE" : "NIVEL · ARCHIVO"}</span>
          <h3 id="${zoneId}">${zoneTitle}</h3>
        </div>
        <span class="documents-zone-count"><b>${String(roomCount).padStart(2, "0")}</b> ${roomLabel}</span>
      </header>
      <div class="documents-room-grid documents-dungeon-grid">
        <svg class="documents-route-map" aria-hidden="true" focusable="false"></svg>
        ${rooms}
      </div>
    </section>`;
}

function drawDocumentMapRoutes() {
  document.querySelectorAll("#documents-grid .documents-room-grid").forEach((grid) => {
    const svg = grid.querySelector(".documents-route-map");
    const rooms = [...grid.querySelectorAll(".document-room")];
    if (!svg || !rooms.length) return;

    const gridRect = grid.getBoundingClientRect();
    const width = Math.max(1, Math.round(grid.clientWidth));
    const height = Math.max(1, Math.round(grid.clientHeight));
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));

    const paths = rooms.slice(1).map((room, index) => {
      const previous = rooms[index].getBoundingClientRect();
      const next = room.getBoundingClientRect();
      let path, sx, sy, ex, ey;
      if (Math.abs(previous.top - next.top) < 5) {
        const y = previous.top - gridRect.top + previous.height / 2;
        const movingRight = previous.left < next.left;
        const x1 = (movingRight ? previous.right : previous.left) - gridRect.left;
        const x2 = (movingRight ? next.left : next.right) - gridRect.left;
        path = `M ${x1} ${y} L ${x2} ${y}`;
        const dx = movingRight ? 12 : -12;
        sx = x1 + dx; sy = y; ex = x2 - dx; ey = y;
      } else {
        const x1 = previous.left - gridRect.left + previous.width / 2;
        const y1 = previous.bottom - gridRect.top;
        const x2 = next.left - gridRect.left + next.width / 2;
        const y2 = next.top - gridRect.top;
        const bend = Math.max(6, Math.min(30, (y2 - y1) / 2));
        path = `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`;
        sx = x1; sy = y1 + 12; ex = x2; ey = y2 - 12;
      }
      return `<path class="documents-route-hall" d="${path}"></path><path class="documents-route-wall" d="${path}"></path><path class="documents-route-floor" d="${path}"></path><path class="documents-route-line" d="${path}"></path>`;
    });
    svg.innerHTML = paths.join("");
  });
}

function layoutDocumentRooms() {
  document.querySelectorAll("#documents-grid .documents-room-grid").forEach((grid) => {
    const columns = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(" ").length);
    grid.querySelectorAll(".document-room").forEach((room, index) => {
      const row = Math.floor(index / columns);
      const offset = index % columns;
      const column = row % 2 === 0 ? offset + 1 : columns - offset;
      room.style.gridColumn = String(column);
      room.style.gridRow = String(row + 1);
    });
  });
}

function scheduleDocumentRouteDraw() {
  if (documentRouteFrame) cancelAnimationFrame(documentRouteFrame);
  documentRouteFrame = requestAnimationFrame(() => {
    documentRouteFrame = 0;
    drawDocumentMapRoutes();
  });
}

window.addEventListener("resize", () => {
  layoutDocumentRooms();
  scheduleDocumentRouteDraw();
}, { passive: true });

function renderDocuments() {
  const target = $("#documents-grid");
  if (!target) return;
  const visibleDocuments = documents.filter(
    (item) => activeDocumentFilter === "all" || item.category === activeDocumentFilter,
  );
  const count = $("#documents-count");
  if (count) count.textContent = String(documents.length).padStart(2, "0");

  const rooms = visibleDocuments.map((item, roomIndex) =>
    renderDocumentRoom(
      item,
      documents.indexOf(item),
      roomIndex,
      item.label.es === "EXPERIMENTO",
    ),
  ).join("");
  target.innerHTML = renderDocumentLevel(rooms, visibleDocuments.length);
  layoutDocumentRooms();

  target.querySelectorAll(".document-room-image").forEach((image) => {
    const room = image.closest(".document-room");
    const markMissing = () => room?.classList.add("has-no-preview");
    image.addEventListener("error", markMissing, { once: true });
    if (image.complete && !image.naturalWidth) markMissing();
    image.addEventListener("load", scheduleDocumentRouteDraw, { once: true });
  });

  onAll(".document-room", "click", (event) => {
    if (event.target.closest("button")) return;
    const room = event.currentTarget;
    openDocumentModal(documents[Number(room.dataset.documentCard)]);
  }, target);
  onAll("[data-document-open]", "click", (event) => {
    const button = event.currentTarget;
    openDocumentModal(documents[Number(button.dataset.documentOpen)]);
  }, target);

  documentRouteObserver?.disconnect();
  if ("ResizeObserver" in window) {
    documentRouteObserver = new ResizeObserver(scheduleDocumentRouteDraw);
    target.querySelectorAll(".documents-zone, .documents-room-grid, .document-room")
      .forEach((item) => documentRouteObserver.observe(item));
  }
  scheduleDocumentRouteDraw();
  setupMobileScrollHover();
}

function setupDocumentFilters() {
  const filters = [...document.querySelectorAll("[data-document-filter]")];
  filters.forEach((button) => {
    const active = button.dataset.documentFilter === activeDocumentFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  onAll("[data-document-filter]", "click", (event) => {
    const button = event.currentTarget;
    activeDocumentFilter = button.dataset.documentFilter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderDocuments();
  });
}

// 15. EXPERIENCIA: tarjetas de trayectoria y ventanas de detalle.
function renderExperiences() {
  const target = $("#experience-list");
  if (!target) return;

  target.innerHTML = experiences
    .map(
      (experience, index) =>
        `
        <div class="experience-card-wrapper" data-experience="${index}">
          <article class="experience-card" data-experience-card="${index}">
            <div class="experience-card-image">
              <img src="${experience.image}" alt="${tr(experience.title)}">
            </div>
            <div class="experience-card-body">
              <span class="experience-card-index">0${index + 1}</span>
              <h3 class="experience-card-title">${tr(experience.title)}</h3>
              <span class="experience-card-org">${experience.organization}</span>
              <footer class="experience-card-footer">
                <time>${experience.date}</time>
                <span class="experience-open-link">${tr("Ver experiencia")} ↗</span>
              </footer>
            </div>
          </article>
        </div>
        `
    )
    .join("");

  const handleOpenExperience = (index) => {
    const experience = experiences[index];
    if (!experience) return;

    const areas = experience.areas
      ? `<h3>${tr("Principales áreas trabajadas")}</h3><ul class="experience-modal-list">${tr(
          experience.areas
        )
          .map((area) => `<li>${area}</li>`)
          .join("")}</ul>`
      : "";
    const learnedPoints = experience.learnedPoints
      ? `<ul class="experience-modal-list experience-learned-list">${tr(
          experience.learnedPoints
        )
          .map((point) => `<li>${point}</li>`)
          .join("")}</ul>`
      : "";

    openModal(
      `<img class="experience-modal-image" src="${experience.image}" alt="">
       <p class="eyebrow">${experience.organization} · ${experience.date}</p>
       <h2 id="modal-title">${tr(experience.title)}</h2>
       <h3>${tr("Qué hice")}</h3>
       <p class="modal-lede">${tr(experience.description)}</p>
       ${areas}
       <h3>${tr("Qué aprendí")}</h3>
       <p class="modal-lede">${tr(experience.learned)}</p>
       ${learnedPoints}`
    );
  };

  onAll("[data-experience-card]", "click", (event) => {
    const card = event.currentTarget;
    handleOpenExperience(Number(card.dataset.experienceCard));
  });
}

// 16. MOVIMIENTO AL DESPLAZAR: observadores, estadísticas y timeline.
function setupScrollAnimations() {
  setupTimelineProgress();
  setupMobileScrollHover();
  const statsTarget = $("#about-stats");
  if (statsTarget && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateStatsCounter();
          statsObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );
    statsObserver.observe(statsTarget);
  } else if (statsTarget) {
    animateStatsCounter();
  }
  const aboutRevealItems = document.querySelectorAll(".cs-reveal");
  if (aboutRevealItems.length && "IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );
    aboutRevealItems.forEach((item) => aboutObserver.observe(item));
  } else {
    aboutRevealItems.forEach((item) => item.classList.add("is-visible"));
  }
  if (!("IntersectionObserver" in window)) return;

  const experienceWrappers = document.querySelectorAll(".experience-card-wrapper");
  if (experienceWrappers.length > 0) {
    const expObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    experienceWrappers.forEach((wrapper) => expObserver.observe(wrapper));
  }
}

// 17. TARJETAS TÁCTILES: activa feedback visual en móvil.
function setupMobileScrollHover() {
  setupMobileScrollHover.observer?.disconnect();

  if (
    !window.matchMedia("(max-width: 800px)").matches ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .document-card, .award-card, .experience-card",
  );
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-scroll-active", entry.isIntersecting);
      });
    },
    {
      rootMargin: "-38% 0px -38% 0px",
      threshold: 0,
    },
  );

  cards.forEach((card) => observer.observe(card));
  setupMobileScrollHover.observer = observer;
}

// 18. TIMELINE: calcula y anima el progreso de lectura.
function setupTimelineProgress() {
  const state = setupTimelineProgress.state || (setupTimelineProgress.state = {
    current: null,
    target: 0,
    frame: 0,
    measureFrame: 0,
  });

  const animateProgress = () => {
    state.frame = 0;
    const list = $("#experience-list");
    if (!list) return;

    const difference = state.target - state.current;
    state.current = Math.abs(difference) < 0.08
      ? state.target
      : state.current + difference * 0.16;
    list.style.setProperty("--timeline-progress", `${state.current}%`);

    if (state.current !== state.target) {
      state.frame = window.requestAnimationFrame(animateProgress);
    }
  };

  const updateTarget = () => {
    const list = $("#experience-list");
    if (!list) return;

    const { top, height } = list.getBoundingClientRect();
    if (!height) return;

    const readingLine = window.innerHeight * 0.72;
    state.target = Math.max(0, Math.min(100, ((readingLine - top) / height) * 100));
    const reducedMotion = false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */;

    if (state.current === null || reducedMotion) {
      state.current = state.target;
      list.style.setProperty("--timeline-progress", `${state.current}%`);
      return;
    }

    if (!state.frame) {
      state.frame = window.requestAnimationFrame(animateProgress);
    }
  };

  if (!state.onScroll) {
    state.onScroll = () => {
      if (state.measureFrame) return;
      state.measureFrame = window.requestAnimationFrame(() => {
        state.measureFrame = 0;
        updateTarget();
      });
    };
    window.addEventListener("scroll", state.onScroll, { passive: true });
    window.addEventListener("resize", state.onScroll);
  }

  updateTarget();
}

// 19. SOBRE MÍ: selector de enfoque y contadores.
const aboutState = {
  focus: "narrative",
  bound: false,
  statsDone: false,
};

const padAboutNumber = (value) => String(value).padStart(2, "0");

const aboutFocusIcons = {
  story: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M8 7h8M8 11h6"/></svg>`,
  systems: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><circle cx="6" cy="6" r="2.3"/><circle cx="18" cy="7" r="2.3"/><circle cx="12" cy="18" r="2.3"/><path d="M8.2 6.6 15.7 7M7.4 8l3.4 7.7M16.6 9.2l-3.3 6.5"/></svg>`,
  prototype: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="1"/><path d="M10 8.5 16 12l-6 3.5z"/></svg>`,
};

const aboutPassiveIcons = {
  loop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M20 11a8 8 0 0 0-13.7-5.6L4 7.6"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 13.7 5.6L20 16.4"/><path d="M20 20v-4h-4"/></svg>`,
  hybrid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" focusable="false"><circle cx="9" cy="12" r="5.2"/><circle cx="15" cy="12" r="5.2"/></svg>`,
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3 2.5-5.4 5.5-5.4s5.5 2.4 5.5 5.4"/><circle cx="17" cy="9" r="2.2"/><path d="M16 14.2c2.6.2 4.5 2.3 4.5 4.8"/></svg>`,
};

const aboutStatIcons = {
  projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M12 3 3.5 7.5 12 12l8.5-4.5z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/></svg>`,
  awards: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M8 3h8v6a4 4 0 0 1-8 0z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 13v4M8 21h8M9 17h6v4H9z"/></svg>`,
  languages: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z"/></svg>`,
};

function getAboutFocus(id) {
  const focuses = siteCopy.about.character.focuses;
  return focuses.find((focus) => focus.id === id) || focuses[0];
}

function renderAboutStats() {
  const target = $("#about-stats");
  if (!target) return;
  const stats = [
    { key: "projects", value: projects.filter((project) => project.published !== false).length, href: "#projects", icon: "projects" },
    { key: "awards", value: awards.length, href: "#awards", icon: "awards" },
    { key: "languages", value: "ES/EN", icon: "languages" },
  ];

  target.innerHTML = stats
    .map((stat) => {
      const copy = siteCopy.about.stats[stat.key];
      const isCount = typeof stat.value === "number";
      const finalValue = isCount ? padAboutNumber(stat.value) : stat.value;
      const displayValue = isCount && !aboutState.statsDone ? "00" : finalValue;
      const tag = stat.href ? "a" : "div";
      const href = stat.href ? ` href="${stat.href}"` : "";
      return `
        <${tag} class="cs-stat${isCount ? "" : " cs-stat--lang"}"${href}>
          <span class="cs-stat-head">
            <span class="cs-stat-icon" aria-hidden="true">${aboutStatIcons[stat.icon]}</span>
            <span class="cs-stat-label">${tr(copy.label)}</span>
            ${stat.href ? '<span class="cs-stat-arrow" aria-hidden="true">↗</span>' : ""}
          </span>
          <strong class="cs-stat-value"${isCount ? ` data-count="${stat.value}"` : ""}>${displayValue}</strong>
          <span class="cs-stat-detail">${tr(copy.detail)}</span>
        </${tag}>`;
    })
    .join("");
}

function setAboutStatsFinal() {
  document.querySelectorAll(".cs-stat-value[data-count]").forEach((node) => {
    node.textContent = padAboutNumber(Number(node.dataset.count));
  });
}

function renderAboutCharacter() {
  const focusTarget = $("#about-focus");
  const attributesTarget = $("#about-attributes");
  const passivesTarget = $("#about-passives");
  if (!focusTarget || !attributesTarget || !passivesTarget) return;
  const characterCopy = siteCopy.about.character;

  focusTarget.innerHTML = characterCopy.focuses
    .map(
      (focus) => `
        <button
          type="button"
          class="cs-focus-btn"
          role="radio"
          aria-checked="false"
          tabindex="-1"
          data-focus="${focus.id}"
          style="--focus-accent:${focus.accent};--focus-soft:${focus.soft}"
        >
          <span class="cs-focus-icon" aria-hidden="true">${aboutFocusIcons[focus.icon] || ""}</span>
          <span class="cs-focus-name">${tr(focus.name)}</span>
        </button>`,
    )
    .join("");

  attributesTarget.innerHTML = characterCopy.attributes
    .map(
      (attribute) => `
        <div class="cs-attr" data-attribute="${attribute.id}">
          <div class="cs-attr-head">
            <span class="cs-attr-name">${tr(attribute.name)}</span>
            <span class="cs-attr-value"><span data-attr-value>00</span><span class="sr-only"> / 10</span></span>
          </div>
          <div class="cs-attr-pips" aria-hidden="true">
            ${Array.from({ length: 10 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}
          </div>
          <span class="cs-attr-detail">${tr(attribute.detail)}</span>
        </div>`,
    )
    .join("");

  passivesTarget.innerHTML = characterCopy.passives
    .map(
      (passive) => `
        <article class="cs-passive">
          <span class="cs-passive-icon" aria-hidden="true">${aboutPassiveIcons[passive.icon] || ""}</span>
          <div class="cs-passive-copy">
            <strong>${tr(passive.title)}</strong>
            <p>${tr(passive.text)}</p>
          </div>
        </article>`,
    )
    .join("");

  if (!aboutState.bound) setupAboutCharacter();
  setAboutFocus(aboutState.focus, { initial: true });
}

function setAboutFocus(id, options = {}) {
  const focus = getAboutFocus(id);
  aboutState.focus = focus.id;

  const section = $("#about");
  if (section) section.dataset.focus = focus.id;

  document.querySelectorAll(".cs-focus-btn").forEach((button) => {
    const isActive = button.dataset.focus === focus.id;
    button.setAttribute("aria-checked", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  const description = $("#about-focus-desc");
  if (description) {
    description.innerHTML = `<strong>${tr(focus.tagline)}.</strong> ${tr(focus.text)}`;
    if (!options.initial) {
      description.classList.remove("is-changing");
      void description.offsetWidth;
      description.classList.add("is-changing");
    }
  }

  document.querySelectorAll(".cs-attr").forEach((row) => {
    const attributeId = row.dataset.attribute;
    const value = focus.affinity[attributeId] ?? 0;
    const isCore = focus.core.includes(attributeId);
    row.classList.toggle("is-core", isCore);

    const valueNode = row.querySelector("[data-attr-value]");
    if (valueNode) valueNode.textContent = padAboutNumber(value);

    row.querySelectorAll(".cs-attr-pips i").forEach((pip, index) => {
      pip.classList.toggle("is-on", index < value);
    });
  });
}

function animateStatsCounter() {
  if (aboutState.statsDone) {
    setAboutStatsFinal();
    return;
  }

  const nodes = document.querySelectorAll(".cs-stat-value[data-count]");
  if (!nodes.length) return;

  if (false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */) {
    setAboutStatsFinal();
    aboutState.statsDone = true;
    return;
  }

  let pending = nodes.length;
  nodes.forEach((node, index) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) {
      pending -= 1;
      return;
    }
    const duration = 1100;
    const start = performance.now() + index * 130;
    const tick = (now) => {
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = padAboutNumber(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        node.textContent = padAboutNumber(target);
        pending -= 1;
        if (pending <= 0) aboutState.statsDone = true;
      }
    };
    requestAnimationFrame(tick);
  });
}

function setupAboutCharacter() {
  const section = $("#about");
  const focusTarget = $("#about-focus");
  if (!section || !focusTarget) return;
  aboutState.bound = true;

  focusTarget.addEventListener("click", (event) => {
    const button = event.target.closest(".cs-focus-btn");
    if (!button) return;
    setAboutFocus(button.dataset.focus);
  });

  focusTarget.addEventListener("keydown", (event) => {
    const buttons = [...focusTarget.querySelectorAll(".cs-focus-btn")];
    if (!buttons.length) return;
    const currentIndex = Math.max(
      0,
      buttons.findIndex((button) => button.dataset.focus === aboutState.focus),
    );
    let nextIndex = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }
    if (nextIndex === null || !buttons[nextIndex]) return;
    event.preventDefault();
    setAboutFocus(buttons[nextIndex].dataset.focus);
    buttons[nextIndex].focus();
  });

  const portrait = $("#cs-portrait");
  const portraitImage = $(".cs-portrait-img");
  if (portrait && portraitImage) {
    const showFallback = () => portrait.classList.add("is-missing");
    const showPortrait = () => portrait.classList.remove("is-missing");
    portraitImage.addEventListener("error", showFallback);
    portraitImage.addEventListener("load", showPortrait);
    if (portraitImage.getAttribute("src")) {
      if (portraitImage.complete && portraitImage.naturalWidth === 0) showFallback();
      if (portraitImage.complete && portraitImage.naturalWidth > 0) showPortrait();
    }
  }

  const reducedMotion = false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (reducedMotion || !finePointer) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let spotX = 0;
  let spotY = 0;
  section.addEventListener("pointermove", (event) => {
    const rect = section.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    spotX = event.clientX - rect.left;
    spotY = event.clientY - rect.top;
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      section.style.setProperty("--mx", pointerX.toFixed(3));
      section.style.setProperty("--my", pointerY.toFixed(3));
      section.style.setProperty("--spot-x", `${spotX.toFixed(0)}px`);
      section.style.setProperty("--spot-y", `${spotY.toFixed(0)}px`);
    });
  });
  section.addEventListener("pointerleave", () => {
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--mx", "0");
    section.style.setProperty("--my", "0");
    section.style.setProperty("--spot-x", `${Math.round(rect.width / 2)}px`);
    section.style.setProperty("--spot-y", `${Math.round(rect.height * 0.35)}px`);
  });
}

// 20. TRADUCCIÓN: aplica textos, metadatos y atributos accesibles.
const gameCopy = {
  score: { es: "Puntos de Rebote", en: "Bounce points" },
  freeze: { es: "⏸️ Congelar física", en: "⏸️ Freeze physics" },
  resume: { es: "▶️ Reanudar física", en: "▶️ Resume physics" },
  play: { es: "🕹️ Jugar con físicas", en: "🕹️ Play with physics" },
  exit: { es: "✕ Salir", en: "✕ Exit" },
  record: { es: "Récord", en: "High score" },
  resetTitle: { es: "Reiniciar récord", en: "Reset high score" },
  resetConfirm: { es: "¿Deseas reiniciar tu récord a 0?", en: "Do you want to reset your high score to 0?" },
};

function updatePhysicsLanguage() {
  const english = language === "en";
  const scoreLabel = document.querySelector(".score-label");
  const freeze = document.querySelector("#physics-freeze-btn");
  const arcade = document.querySelector("#arcade-toggle-btn");
  const close = document.querySelector("#arcade-close-btn");
  const highScore = document.querySelector("#physics-highscore-wrapper");
  const resetRecord = document.querySelector("#reset-record-btn");
  const multiplier = document.querySelector("#physics-multiplier-badge");
  if (scoreLabel) scoreLabel.textContent = gameCopy.score[language];
  if (freeze) freeze.textContent = freeze.classList.contains("is-frozen") ? gameCopy.resume[language] : gameCopy.freeze[language];
  if (arcade) arcade.textContent = gameCopy.play[language];
  if (close) close.textContent = gameCopy.exit[language];
  if (resetRecord) resetRecord.title = gameCopy.resetTitle[language];
  if (multiplier) multiplier.textContent = english ? "x2 ACTIVE" : "x2 ACTIVO";
  if (highScore) {
    highScore.firstChild.textContent = `${gameCopy.record[language]}: `;
    const valueElement = document.querySelector("#high-score-display");
    if (valueElement) valueElement.title = english ? "Double-click to reset the high score" : "Haz doble clic para reiniciar el récord";
  }
}

function applyStaticLanguage() {
  const set = (selector, value) => {
    const node = $(selector);
    if (node && value != null) node.innerHTML = tr(value);
  };
  const c = siteCopy;
  const english = language === "en";
  updatePhysicsLanguage();
  document.documentElement.lang = language;
  document.title = "Pablo · Game Design / Dev";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", tr(c.metaDescription));
  set('.main-nav a[href$="#about"]', c.nav.about);
  set('.main-nav a[href$="#skills"]', c.nav.skills);
  set('.main-nav a[href$="#projects"]', c.nav.projects);
  set('.main-nav a[href$="#documents"]', c.nav.documents);
  set('.main-nav a[href$="#awards"]', c.nav.awards);
  set('.main-nav a[href$="#experience"]', c.nav.experience);
  set('.main-nav a[href$="#contact"]', c.nav.contact);
  set(".hero-section .eyebrow", c.hero.eyebrow);
  set(".hero-section h1", c.hero.title);
  set(".hero-lede", c.hero.lede);
  set(".hero-copy .button", c.hero.button);
  set("#about .eyebrow", c.about.eyebrow);
  set(".cs-quote", c.about.title);
  set(".about-status-copy", c.about.character.status);
  set(".about-character-role-copy", c.about.character.role);
  const aboutBio = document.querySelectorAll(".about-bio-copy");
  if (aboutBio[0]) aboutBio[0].innerHTML = tr(c.about.character.profile);
  if (aboutBio[1]) aboutBio[1].innerHTML = tr(c.about.character.profileTwo);
  set(".cs-focus-head .cs-label", c.about.character.focusLabel);
  set(".about-attributes-label", c.about.character.attributesLabel);
  set(".about-passives-label", c.about.character.passivesLabel);
  renderAboutCharacter();
  renderAboutStats();
  $("#about-focus")?.setAttribute(
    "aria-label",
    english ? "Design focus" : "Enfoque de diseño",
  );
  $("#about-attributes")?.setAttribute(
    "aria-label",
    english ? "Core attributes" : "Atributos principales",
  );
  set("#skills .eyebrow", c.skills.eyebrow);
  set("#skills h2", c.skills.title);
  set("#skills .section-intro", c.skills.intro);
  set("#projects .eyebrow", c.projects.eyebrow);
  set("#projects h2", c.projects.title);
  set("#projects .section-intro", c.projects.intro);
  set("#documents .eyebrow", c.documents.eyebrow);
  set("#documents h2", c.documents.title);
  set("#documents .section-intro > p", c.documents.intro);
  set(".documents-toolbar-label", c.documents.archive);
  set(".documents-definition", c.documents.definition);
  document.querySelectorAll("[data-document-filter]").forEach((button) => {
    const key = button.dataset.documentFilter;
    if (c.documents.filters[key])
      button.textContent = tr(c.documents.filters[key]);
  });
  set("#awards .eyebrow", c.awards.eyebrow);
  set("#awards h2", c.awards.title);
  set("#awards .section-intro", c.awards.intro);
  set("#experience .eyebrow", c.experience.eyebrow);
  set("#experience h2", c.experience.title);
  set("#experience .section-intro", c.experience.intro);
  set("#contact .eyebrow", c.contact.eyebrow);
  set("#contact h2", c.contact.title);
  set("#contact p:not(.eyebrow)", c.contact.body);
  set("#contact .button", c.contact.button);
  set(".contact-links a", "✉ Email");
  set(".contact-links .contact-pending:nth-child(2)", c.contact.github);
  set(".contact-links .contact-pending:nth-child(3)", c.contact.cv);
  set(".footer span:nth-child(2)", c.footer.description);
  set(".footer a", c.footer.back);
  $(".brand")?.setAttribute("aria-label", english ? "Go to home" : "Ir al inicio");
  $(".language-switcher")?.setAttribute("aria-label", english ? "Change language" : "Cambiar idioma");
  $(".main-nav")?.setAttribute("aria-label", english ? "Main navigation" : "Navegación principal");
  $(".hero-visual")?.setAttribute("aria-label", english ? "Dark grid of a video game level" : "Cuadrícula oscura de un nivel de videojuego");
  $(".physics-freeze-btn")?.setAttribute("aria-label", english ? "Freeze floating cards" : "Pausar movimiento de recuadros");
  $(".cs-portrait-img")?.setAttribute(
    "alt",
    english ? "Portrait of Pablo Menéndez-Morán" : "Retrato de Pablo Menéndez-Morán",
  );
  $(".brand-character")?.setAttribute("alt", english ? "Pablo's character" : "Personaje de Pablo");
  const physicsAlt = english
    ? ["Programming", "Design", "Experience", "Video games", "Bonus star"]
    : ["Programación", "Diseño", "Experiencia", "Videojuegos", "Estrella Bonus"];
  document.querySelectorAll(".physics-item").forEach((item, index) => {
    if (physicsAlt[index]) item.setAttribute("alt", physicsAlt[index]);
  });
  $(".documents-stats")?.setAttribute("aria-label", english ? "Level map summary" : "Resumen del mapa");
  $(".documents-stats span:nth-child(1) small")?.replaceChildren(document.createTextNode(english ? "rooms" : "salas"));
  $(".documents-stats span:nth-child(2) small")?.replaceChildren(document.createTextNode(english ? "floor" : "nivel"));
  $(".documents-stats span:nth-child(3) small")?.replaceChildren(document.createTextNode(english ? "languages" : "idiomas"));
  $(".documents-toolbar")?.setAttribute("aria-label", english ? "Map gates" : "Puertas del mapa");
  $(".document-filters")?.setAttribute("aria-label", english ? "Map gates" : "Puertas del mapa");
  const closeButton = $("#modal-close");
  if (closeButton)
    closeButton.setAttribute(
      "aria-label",
      english ? "Close window" : "Cerrar ventana",
    );
  const mobileToggle = $(".mobile-toggle");
  if (mobileToggle)
    mobileToggle.setAttribute(
      "aria-label",
      english ? "Open navigation" : "Abrir navegación",
    );
}

// 21. MODALES: selectores compartidos y apertura/cierre.
const $ = (selector) => document.querySelector(selector);

const modalBackdrop = $("#modal-backdrop");

const modalContent = $("#modal-content");

let modalScrollLockState = null;

function lockPageScrollForModal() {
  if (modalScrollLockState) return;

  const root = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - root.clientWidth;
  const currentPaddingRight =
    Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

  modalScrollLockState = {
    scrollY,
    rootOverflow: root.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyPaddingRight: body.style.paddingRight,
  };

  root.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
  }
}

function unlockPageScrollForModal() {
  if (!modalScrollLockState) return;

  const state = modalScrollLockState;
  modalScrollLockState = null;

  const root = document.documentElement;
  const body = document.body;
  root.style.overflow = state.rootOverflow;
  body.style.overflow = state.bodyOverflow;
  body.style.position = state.bodyPosition;
  body.style.top = state.bodyTop;
  body.style.left = state.bodyLeft;
  body.style.right = state.bodyRight;
  body.style.width = state.bodyWidth;
  body.style.paddingRight = state.bodyPaddingRight;
  window.scrollTo(0, state.scrollY);
}

function closeModal() {
  if (!modalBackdrop || !modalContent) return;
  modalBackdrop.hidden = true;
  modalContent.innerHTML = "";
  unlockPageScrollForModal();
}

function openModal(content) {
  if (!modalBackdrop || !modalContent) return;
  modalContent.innerHTML = content;
  modalBackdrop.hidden = false;
  lockPageScrollForModal();
  $("#modal-close").focus();
}

// 22. RENDER — HABILIDADES: árbol de ramas, nodos con nivel e inventario de herramientas.
function renderSkills() {
  const target = $("#skills-list");
  if (!target) return;

  const isEnglish = language === "en";
  const totalNodes = skills.reduce((total, skill) => total + skill.items.length, 0);
  const accents = ["#d98b76", "#a49dd8", "#a3bf6c", "#cdb57a"];
  const marks = ["DS", "AI", "{ }", "ART"];
  const rootLabel = isEnglish ? "PLAYER SKILL TREE" : "ÁRBOL DE HABILIDADES";
  const rootTitle = isEnglish ? "Skill map" : "Mapa de habilidades";
  const branchWord = isEnglish ? "branches" : "ramas";
  const nodeWord = isEnglish ? "nodes" : "nodos";
  const invLabel = isEnglish ? "INVENTORY · TOOLS" : "INVENTARIO · HERRAMIENTAS";
  const levelWord = isEnglish ? "level" : "nivel";
  const hint = isEnglish
    ? "Select a node to open its details. The dots show my level (1–5)."
    : "Selecciona un nodo para ver su ficha. Los puntos indican mi nivel (1–5).";

  const ICONS = {
    book: [".######.", "#..#..##", "#..#..##", "#..#..##", "#..#..##", "#..#..##", "########", ".######."],
    map: ["#######.", "#.#.#.#.", "#.#.#.#.", "#.#.#.#.", "#.#.#.#.", "#.#.#.#.", "#######.", "........"],
    gear: ["..#..#..", ".######.", "########", "##....##", "##....##", "########", ".######.", "..#..#.."],
    window: ["########", "#......#", "########", "#.#....#", "#.#.##.#", "#....#.#", "#......#", "########"],
    flask: ["..####..", "...##...", "...##...", "..####..", ".######.", "########", "########", ".######."],
    page: [".#####..", ".#...##.", ".#....#.", ".#.##.#.", ".#....#.", ".#.##.#.", ".#....#.", ".######."],
    dice: ["########", "#......#", "#.#..#.#", "#......#", "#..##..#", "#......#", "#.#..#.#", "########"],
    brain: [".##..##.", "#.####.#", "########", "#.#..#.#", "########", "#.####.#", ".#.##.#.", "..#..#.."],
    chat: ["########", "#......#", "#.#.#.##", "#......#", "########", "..#.....", "...#....", "........"],
    wand: ["......##", "....####", "...###.#", "..##..#.", ".##.....", "##......", "#.......", "........"],
    chart: ["#.......", "#.....#.", "#...#.#.", "#.#.#.#.", "#.#.#.#.", "#.#.#.#.", "########", "........"],
    bolt: ["....###.", "...###..", "..###...", "#######.", "..###...", ".###....", ".##.....", "#......."],
    code: ["...#.#..", "..#...#.", ".#.....#", "#.......", "#.......", ".#.....#", "..#...#.", "...#.#.."],
    sprout: ["...##...", "..####..", "#..##..#", "###.##.#", ".##.###.", "..####..", "...##...", "...##..."],
    grid: ["##..##..", "##..##..", "..##..##", "..##..##", "##..##..", "##..##..", "..##..##", "..##..##"],
    pencil: ["......##", ".....###", "....###.", "...###..", "..###...", ".###....", "##......", "#......."],
    eye: ["........", ".######.", "##....##", "#..##..#", "#..##..#", "##....##", ".######.", "........"],
  };
  const pixel = (name) => {
    let d = "";
    ICONS[name].forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c === "#") d += `M${x} ${y}h1v1h-1z`;
      }),
    );
    return `<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path d="${d}" fill="currentColor"/></svg>`;
  };
  const iconMap = [
    ["book", "map", "gear", "window", "flask", "page", "dice"],
    ["brain", "chat", "wand", "chart", "bolt"],
    ["code", "gear", "window", "sprout"],
    ["grid", "pencil", "map", "eye"],
  ];
  /* Nivel de cada nodo (1-5). Ajusta estos números a tu gusto. */
  const levels = [[5, 5, 5, 5, 5, 4, 4], [3, 4, 3, 3, 2], [4, 3, 3, 1], [4, 3, 3, 3]];

  target.classList.add("skills-tree");
  target.innerHTML = `
    <div class="st-tree">
      <div class="st-root" role="group" aria-label="${rootLabel}: ${skills.length} ${branchWord}, ${totalNodes} ${nodeWord}">
        <span class="st-root-orb">PABLO</span>
        <div class="st-root-copy"><small>${rootLabel}</small><b>${rootTitle}</b></div>
        <span class="st-root-count"><b>${skills.length}</b> ${branchWord} · <b>${totalNodes}</b> ${nodeWord}</span>
      </div>
      <div class="st-trunk" aria-hidden="true"></div>
      <div class="st-branches">
        ${skills
          .map((skill, c) => {
            const accent = accents[c % accents.length];
            return `
        <article class="st-branch" style="--c:${accent}">
          <figure class="st-art"><img class="st-art-img" src="${skill.image}" alt=""></figure>
          <header class="st-head">
            <span class="st-shield" aria-hidden="true">${marks[c % marks.length]}</span>
            <div class="st-head-copy">
              <p class="st-tag">${tr(skill.label)}</p>
              <h3>${tr(skill.title)}</h3>
            </div>
          </header>
          <p class="st-desc">${tr(skill.description)}</p>
          <ul class="st-nodes">
            ${skill.items
              .map((item, k) => {
                const lvl = levels[c][k];
                return `
            <li>
              <button type="button" class="st-node" data-skill="${c}-${k}" aria-label="${tr(item[0])}, ${levelWord} ${lvl}/5">
                <span class="st-ico">${pixel(iconMap[c][k])}</span>
                <span class="st-name">${tr(item[0])}</span>
                <span class="st-pips" aria-hidden="true">${[1, 2, 3, 4, 5].map((n) => `<i${n <= lvl ? ' class="on"' : ""}></i>`).join("")}</span>
              </button>
            </li>`;
              })
              .join("")}
          </ul>
          <div class="st-inv">
            <div class="st-inv-head"><span>${invLabel}</span><span aria-label="${skill.tools.length} ${isEnglish ? "tools" : "herramientas"}">${skill.tools.length}</span></div>
            <div class="st-slots">
              ${skill.tools
                .map(
                  (tool) =>
                    `<span class="tool-icon st-slot" role="img" data-tooltip="${tr(tool.name)}" title="${tr(tool.name)}" tabindex="0" aria-label="${tr(tool.name)}"><img src="${tool.image}" alt=""></span>`,
                )
                .join("")}
            </div>
          </div>
        </article>`;
          })
          .join("")}
      </div>
      <p class="st-hint">${hint}</p>
    </div>
  `;

  target.querySelectorAll(".st-art-img").forEach((image) => {
    const art = image.closest(".st-art");
    const hide = () => art?.classList.add("is-missing");
    image.addEventListener("error", hide, { once: true });
    if (image.complete && !image.naturalWidth) hide();
  });

  target.querySelectorAll(".tool-icon img").forEach((image) => {
    const icon = image.closest(".tool-icon");
    const showFallback = () => {
      if (!icon || icon.classList.contains("is-missing")) return;
      const label = (icon.dataset.tooltip || "APP")
        .replace(/[^a-z0-9]/gi, "")
        .slice(0, 3)
        .toUpperCase();
      icon.classList.add("is-missing");
      image.remove();
      icon.append(document.createTextNode(label || "APP"));
    };
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && !image.naturalWidth) showFallback();
  });

  onAll("[data-skill]", "click", (event) => {
    const button = event.currentTarget;
    const [categoryIndex, itemIndex] = button.dataset.skill.split("-").map(Number);
    const skill = skills[categoryIndex];
    const item = skill.items[itemIndex];
    openModal(
      `<p class="eyebrow">${tr(skill.title)}</p><h2 id="modal-title">${tr(item[0])}</h2><p class="modal-lede">${language === "en" ? (skillItemDescriptions[item[0]] || item[1]) : item[1]}</p>`,
    );
  });
}
// Masonry responsive para mantener las tarjetas pegadas sin huecos entre filas.
let projectMasonryObserver = null;
let projectMasonryFrame = 0;

function layoutProjectMasonry() {
  const list = $("#projects-list");
  if (!list) return;

  /* casilleros vacíos para completar la última fila de la estantería */
  list.querySelectorAll(".gbc-empty").forEach((e) => e.remove());
  const shelfCols = window.matchMedia("(min-width: 801px)").matches ? 3 : 1;
  const shelfCount = list.querySelectorAll(".game-box-card").length;
  for (let i = 0; shelfCount && i < (shelfCols - (shelfCount % shelfCols)) % shelfCols; i++) {
    const slot = document.createElement("div");
    slot.className = "gbc-empty"; slot.setAttribute("aria-hidden", "true");
    slot.dataset.label = language === "en" ? "COMING SOON" : "PRÓXIMAMENTE";
    slot.innerHTML = '<span class="gbc-plank"></span>';
    list.appendChild(slot);
  }
  const cards = [...list.querySelectorAll(".game-box-card")];
  const listStyles = getComputedStyle(list);
  const useMasonry = window.matchMedia("(min-width: 801px)").matches && listStyles.display === "grid";

  cards.forEach((card) => card.style.removeProperty("grid-row-end"));
  if (!useMasonry) return;

  const rowHeight = Number.parseFloat(listStyles.gridAutoRows) || 1;
  const spans = cards.map((card) => {
    const marginBottom = Number.parseFloat(getComputedStyle(card).marginBottom) || 0;
    return Math.max(
      1,
      Math.ceil((card.getBoundingClientRect().height + marginBottom) / rowHeight),
    );
  });

  cards.forEach((card, index) => {
    card.style.gridRowEnd = `span ${spans[index]}`;
  });
}

function scheduleProjectMasonry() {
  if (projectMasonryFrame) cancelAnimationFrame(projectMasonryFrame);
  projectMasonryFrame = requestAnimationFrame(() => {
    projectMasonryFrame = 0;
    layoutProjectMasonry();
  });
}

window.addEventListener("resize", scheduleProjectMasonry, { passive: true });

// 23. RENDER — PROYECTOS: tarjetas, previews e hipervínculos.
function renderProjects() {
  const target = $("#projects-list");
  if (!target) return;
  const visibleProjects = projects.filter(
    (project) => project.published !== false,
  );
  target.innerHTML = visibleProjects
    .map((project) => {
      const cardImage = project.cardImage || project.image;
      const requestedPreview = project.cardVideo || project.video;
      const videoPreview = /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(
        requestedPreview || "",
      )
        ? requestedPreview
        : /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(project.video || "")
          ? project.video
          : "";
      const gifPreview = /\.gif(?:[?#]|$)/i.test(requestedPreview || "")
        ? requestedPreview
        : /\.gif(?:[?#]|$)/i.test(cardImage || "")
          ? cardImage
          : "";
      const hasCardMedia = Boolean(gifPreview || videoPreview || cardImage);
      const cardMedia = gifPreview
        ? `<img class="project-card-media" src="${gifPreview}" alt="${projectText(project.title)}"><span class="project-media-badge">GIF / PREVIEW</span>`
        : videoPreview
          ? `<video class="project-card-media" src="${videoPreview}" ${cardImage ? `poster="${cardImage}"` : ""} muted loop autoplay playsinline aria-label="${projectText(project.title)}"></video><span class="project-media-badge">VIDEO / PREVIEW</span>`
          : cardImage
            ? `<img class="project-card-media" src="${cardImage}" alt="${projectText(project.title)}"><span class="project-media-badge">IMAGE / COVER</span>`
            : "";
      const isPlaceholder = (value) => /^(añadir|add |explica |explain |presenta |introduce )/i.test((value || "").trim());
      const statusText = projectText(project.status);
      const statusLabel = statusText && !isPlaceholder(statusText)
        ? `<span class="project-status-pill">${statusText}</span>`
        : "";
      const featuredLabel = project.featured
        ? `<span class="project-featured-pill">${tr("Caso destacado")}</span>`
        : "";
      const roleText = projectText(project.role);
      const role = roleText && !isPlaceholder(roleText)
        ? `<p class="project-card-role">${tr("Mi rol")}: <strong>${roleText}</strong></p>`
        : "";
      const descriptionText = projectText(project.description);
      const description = descriptionText && !isPlaceholder(descriptionText)
        ? `<p class="project-case-description">${descriptionText}</p>`
        : "";
      const caseMeta = [projectText(project.date), projectText(project.tools)]
        .filter((value) => value && !isPlaceholder(value))
        .join(" · ");
      const caseMark = projectText(project.title)
        .split(/[\s-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
      return `
        <a class="project-card game-box-card case-${project.caseStyle || "generic"}${project.featured ? " is-featured" : ""}" style="${projectThemeStyle(project)}" href="project.html?project=${encodeURIComponent(project.slug.trim())}">
          <div class="gbc-stage">
          <div class="gbc-case">
          <span class="gbc-disc" aria-hidden="true"></span>
          <span class="project-case-spine" aria-hidden="true"><span>${projectText(project.title)}</span></span>
          <div class="project-visual ${project.visual} project-case-cover">
            ${featuredLabel}${statusLabel}
            <div class="project-card-media-frame${hasCardMedia ? "" : " has-no-media"}">
              <div class="project-case-artwork-fallback" aria-hidden="true"><span>${caseMark}</span></div>
              ${cardMedia}
            </div>
            <span class="project-case-disc" aria-hidden="true"></span>
            <div class="project-case-cover-copy">
              <p class="project-type">${projectText(project.type)}</p>
              <h3 class="project-case-title">${projectText(project.title)}</h3>
            </div>
            <span class="project-case-rim" aria-hidden="true"></span>
          </div>
          </div>
          </div>
          <span class="gbc-plank" aria-hidden="true"></span>
          <div class="project-content${caseMeta || role || description ? "" : " is-case-empty"}">
            ${caseMeta ? `<p class="project-case-meta">${caseMeta}</p>` : ""}
            ${role}
            ${description}
            <span class="project-link">${tr("Ver página del proyecto")} <b aria-hidden="true">↗</b></span>
          </div>
        </a>`;
    })
    .join("");

  projectMasonryObserver?.disconnect();
  if ("ResizeObserver" in window) {
    projectMasonryObserver = new ResizeObserver(scheduleProjectMasonry);
    target.querySelectorAll(".game-box-card").forEach((card) => {
      projectMasonryObserver.observe(card);
    });
  }
  scheduleProjectMasonry();

  /* la caja se ajusta a la proporción de la imagen de portada */
  target.querySelectorAll(".gbc-case").forEach((box) => {
    const media = box.querySelector(".project-card-media");
    if (!media) return;
    const fit = () => {
      const w = media.naturalWidth || media.videoWidth, h = media.naturalHeight || media.videoHeight;
      if (w && h) box.style.setProperty("--ar", Math.min(1.8, Math.max(0.62, (w / h) * 1.07)).toFixed(3));
      if (w && h) {
        const aspectRatio = Math.min(1.8, Math.max(0.62, w / h));
        const baseDiscSize = 46 + ((aspectRatio - 0.62) / (1.8 - 0.62)) * 18;
        const caseAspectRatio = Math.min(1.8, Math.max(0.62, aspectRatio * 1.07));
        const discSize = Math.min(baseDiscSize, 90 / caseAspectRatio);
        box.style.setProperty("--disc-size", `${discSize}%`);
      }
    };
    fit();
    media.addEventListener(media.tagName === "VIDEO" ? "loadedmetadata" : "load", fit);
  });

  target.querySelectorAll(".project-card-media").forEach((media) => {
    const frame = media.closest(".project-card-media-frame");
    const showArtworkFallback = () => {
      frame?.classList.add("has-no-media");
      frame?.querySelector(".project-media-badge")?.remove();
    };
    const updateCoverAspect = () => {
      const width = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
      const height = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
      if (!width || !height) return;
      media.closest(".project-visual")?.style.setProperty(
        "aspect-ratio",
        `${width} / ${height}`,
      );
      scheduleProjectMasonry();
    };
    media.addEventListener("error", showArtworkFallback);
    media.addEventListener("load", updateCoverAspect);
    media.addEventListener("loadedmetadata", updateCoverAspect);
    updateCoverAspect();
    if (media instanceof HTMLImageElement && media.complete && !media.naturalWidth) {
      showArtworkFallback();
    }
  });
}

// 24. RENDER — RECONOCIMIENTOS: tarjetas y contenido modal.
function renderAwards() {
  const target = $("#awards-grid");
  if (!target) return;
  target.innerHTML = awards
    .map(
      (award) =>
        `<button type="button" class="award-card recognition-card" data-award="${award.title}"><img src="${award.image}" alt=""><span class="award-card-copy"><strong class="award-card-title">${tr(award.title)}</strong><span class="skill-label award-card-category">${tr(award.category)}</span><span class="award-open">${tr("Ver reconocimiento")} ↗</span></span></button>`,
    )
    .join("");
  onAll("[data-award]", "click", (event) => {
    const button = event.currentTarget;
    const award = awards.find((item) => item.title === button.dataset.award);
    if (!award) return;
    openModal(
      `<img class="award-modal-image" src="${award.image}" alt=""><p class="eyebrow">${tr("Reconocimiento")}</p><h2 id="modal-title">${tr(award.title)}</h2><p class="modal-lede">${language === "en" ? (awardDescriptions[award.title] || award.description) : award.description}</p><a class="button button-dark" href="${award.url}" target="_blank" rel="noreferrer">${tr("Visitar página externa")} ↗</a>`,
    );
  });
}

// 25. NAVEGACIÓN: anclas, sección activa, menú móvil y progreso.
function setupNavigation() {
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 1],
      },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
  const mainNav = $(".main-nav");
  const mobileToggle = $(".mobile-toggle");
  onAll('a[href^="#"]', "click", (event) => {
    const link = event.currentTarget;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    if (link.closest(".main-nav")) setActiveSection(target.id);
    target.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
    mainNav?.classList.remove("is-open");
    mobileToggle?.setAttribute("aria-expanded", "false");
  });
  mobileToggle?.addEventListener("click", () => {
    const nav = mainNav;
    if (!nav) return;
    const isOpen = nav.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileToggle.setAttribute(
      "aria-label",
      isOpen ? tr("Cerrar navegación") : tr("Abrir navegación"),
    );
  });
  const ctaButton = document.querySelector(".main-nav .nav-cta");
  if (ctaButton) {
    ctaButton.addEventListener("mousemove", (e) => {
      const rect = ctaButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * 0.35;
      const y = (e.clientY - centerY) * 0.35;
      ctaButton.style.transition = "none";
      ctaButton.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
    });
    ctaButton.addEventListener("mouseleave", () => {
      ctaButton.style.transition =
        "transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      ctaButton.style.transform = "translate(0px, 0px) scale(1)";
    });
  }
}

// 26. SELECTOR DE IDIOMA: actualiza y vuelve a renderizar la vista.
onAll("[data-language]", "click", (event) => {
  const button = event.currentTarget;
  language = button.dataset.language;
  document
    .querySelectorAll("[data-language]")
    .forEach((item) =>
      item.classList.toggle("is-active", item.dataset.language === language),
    );
  if (document.body.dataset.page === "project") {
    applyStaticLanguage();
    renderProjectPage();
  } else {
    renderSkills();
    renderProjects();
    renderDocuments();
    renderExperiences();
    renderAwards();
    applyStaticLanguage();
    setupScrollAnimations();
    setup3DCards();
  }
});

// 27. EFECTO 3D: inclinación de tarjetas con puntero compatible.
function setup3DCards() {
  if (
    false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */ ||
    !window.matchMedia("(pointer: fine)").matches
  )
    return;

  const cards = document.querySelectorAll(".award-card, .experience-card");

  cards.forEach((card) => {

    card.onmousemove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 14;

      card.style.transition = "transform 0.05s ease-out, box-shadow 0.3s ease";
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.04, 1.04, 1.04)
      `;
    };

    card.onmouseleave = () => {
      card.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease";
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };
  });
}

// 28. MINIJUEGO FÍSICO: pausa, arcade, colisiones y puntuación.
function setupFloatingPhysics() {
  const container = document.getElementById("floating-physics-container");
  if (!container) return;
  const items = container.querySelectorAll(".physics-item:not(.star-bonus-item)");
  const starEl = container.querySelector(".star-bonus-item");
  if (!items.length || !starEl) return;

  let starInnerEl = starEl.querySelector(".star-inner");
  if (!starInnerEl) {
    starInnerEl = document.createElement("div");
    starInnerEl.className = "star-inner";
    starInnerEl.innerHTML = starEl.innerHTML;
    starEl.innerHTML = "";
    starEl.appendChild(starInnerEl);
  }

  const arcadeToggleBtn = document.getElementById("arcade-toggle-btn");
  const arcadeCloseBtn = document.getElementById("arcade-close-btn");
  const freezeBtn = document.getElementById("physics-freeze-btn");
  const scoreDisplay = document.getElementById("score-display");
  const scoreCounterWrapper = document.getElementById("physics-score-counter");

  let highScoreDisplay = document.getElementById("high-score-display");
  let highScoreWrapper = document.getElementById("physics-highscore-wrapper");

  if (!highScoreDisplay && scoreCounterWrapper) {
    highScoreWrapper = document.createElement("div");
    highScoreWrapper.id = "physics-highscore-wrapper";
    highScoreWrapper.className = "physics-highscore-wrapper";
    highScoreWrapper.style.cssText = "font-size: 0.75rem; opacity: 0.9; margin-top: 3px; font-family: var(--mono); color: #e2e8f0; display: flex; align-items: center; justify-content: center; gap: 6px; pointer-events: auto;";
    highScoreWrapper.innerHTML = `${gameCopy.record[language]}: <span id="high-score-display" style="color: #ffcc00; font-weight: bold; text-shadow: 0 0 8px rgba(255, 204, 0, 0.6); cursor: pointer; pointer-events: auto;" title="${gameCopy.resetTitle[language]}">0</span>`;
    scoreCounterWrapper.appendChild(highScoreWrapper);
    highScoreDisplay = document.getElementById("high-score-display");
  }

  let highScore = parseInt(localStorage.getItem("physics_arcade_highscore")) || 0;
  if (highScoreDisplay) {
    highScoreDisplay.textContent = highScore;
  }

  if (highScoreDisplay && !highScoreDisplay.dataset.resetInitialized) {
    highScoreDisplay.dataset.resetInitialized = "true";
    highScoreDisplay.addEventListener("dblclick", () => {
      if (confirm(gameCopy.resetConfirm[language])) {
        highScore = 0;
        localStorage.removeItem("physics_arcade_highscore");
        highScoreDisplay.textContent = highScore;
        highScoreDisplay.classList.remove("is-record-glowing-loop");
      }
    });
  }

  let resetRecordBtn = document.getElementById("reset-record-btn");
  if (!resetRecordBtn && highScoreWrapper) {
    resetRecordBtn = document.createElement("button");
    resetRecordBtn.id = "reset-record-btn";
    resetRecordBtn.textContent = "🔄";
    resetRecordBtn.title = gameCopy.resetTitle[language];
    resetRecordBtn.style.cssText = "background: none; border: none; cursor: pointer; font-size: 0.7rem; padding: 0; pointer-events: auto;";
    resetRecordBtn.addEventListener("click", () => {
      if (confirm(gameCopy.resetConfirm[language])) {
        highScore = 0;
        localStorage.removeItem("physics_arcade_highscore");
        if (highScoreDisplay) {
          highScoreDisplay.textContent = highScore;
          highScoreDisplay.classList.remove("is-record-glowing-loop");
        }
      }
    });
    highScoreWrapper.appendChild(resetRecordBtn);
  }

  let multiplierBadge = document.getElementById("physics-multiplier-badge");
  if (!multiplierBadge && scoreCounterWrapper) {
    multiplierBadge = document.createElement("div");
    multiplierBadge.id = "physics-multiplier-badge";
    multiplierBadge.className = "physics-multiplier-badge";
    multiplierBadge.textContent = language === "en" ? "x2 ACTIVE" : "x2 ACTIVO";
    scoreCounterWrapper.appendChild(multiplierBadge);
  }

  let totalScore = 0;
  let newRecordCelebrated = false;
  let comboTimer = null;
  let warningTimer = null;
  let multiplierActive = false;
  let multiplierTimer = null;
  let multiplierBlinkTimer = null;
  let lastStarHitTime = 0;
  let isFrozen = false;

  const bodies = [];
  let isArcadeActive = false;

  const unfreezePhysics = () => {
    isFrozen = false;
    if (freezeBtn) {
      freezeBtn.classList.remove("is-frozen");
      freezeBtn.textContent = gameCopy.freeze[language];
    }
    bodies.forEach((b) => {
      if (b.isStar) return;
      b.vx = (Math.random() - 0.5) * 3;
      b.vy = (Math.random() - 0.5) * 3;
      b.el.classList.remove("is-static-column");
    });
  };

  if (arcadeToggleBtn && arcadeCloseBtn) {
    const launchArcade = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      isArcadeActive = true;
      container.classList.add("is-arcade-active");
      arcadeCloseBtn.hidden = false;
      arcadeToggleBtn.style.display = "none";

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      if (isFrozen) { unfreezePhysics(); }
    };

    const closeArcade = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      isArcadeActive = false;
      container.classList.remove("is-arcade-active");
      arcadeCloseBtn.hidden = true;
      arcadeToggleBtn.style.display = "";

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };

    arcadeToggleBtn.addEventListener("click", launchArcade);
    arcadeToggleBtn.addEventListener("touchstart", launchArcade, { passive: false });
    arcadeCloseBtn.addEventListener("click", closeArcade);
    arcadeCloseBtn.addEventListener("touchstart", closeArcade, { passive: false });
  }

  if (freezeBtn) {
    freezeBtn.addEventListener("click", () => {
      isFrozen = !isFrozen;
      freezeBtn.classList.toggle("is-frozen", isFrozen);
      freezeBtn.textContent = isFrozen ? gameCopy.resume[language] : gameCopy.freeze[language];

      if (isFrozen) {
        if (starBody.active) deactivateStar();

        const cRect = container.getBoundingClientRect();
        const isMobile = window.innerWidth <= 800;
        const boundW = isArcadeActive && isMobile ? window.innerWidth : (cRect.width || container.offsetWidth || 800);
        const startX = boundW - 140;
        const startY = 140;
        const gapY = 120;

        let currentItemIndex = 0;
        bodies.forEach((b) => {
          if (b.isStar) return;
          b.vx = 0;
          b.vy = 0;
          b.x = startX;
          b.y = startY + (currentItemIndex * gapY);
          b.scale = 1;
          currentItemIndex++;
          b.el.classList.add("is-static-column");
        });
      } else {
        unfreezePhysics();
      }
    });
  }

  items.forEach((el) => {
    const size = el.offsetWidth || 100;
    const cRect = container.getBoundingClientRect();
    const initialWidth = window.innerWidth <= 800 ? window.innerWidth : (cRect.width || container.offsetWidth || 800);
    const initialHeight = window.innerWidth <= 800 ? window.innerHeight : (cRect.height || container.offsetHeight || 600);

    const minX = initialWidth * 0.45;
    const x = minX + Math.random() * (initialWidth - minX - size - 50);
    const y = Math.random() * (initialHeight - size - 100) + 50;

    bodies.push({
      el,
      x,
      y,
      vx: (Math.random() - 0.5) * 3.5,
      vy: (Math.random() - 0.5) * 3.5,
      radius: size / 2,
      isDragging: false,
      scale: 1,
      isStar: false
    });
  });

  const starSize = starEl.offsetWidth || 75;
  const starBody = {
    el: starEl,
    x: 0,
    y: 0,
    vx: 2,
    vy: 2,
    radius: starSize / 2,
    isDragging: false,
    scale: 1,
    isStar: true,
    active: false,
    hits: 0,
    timer: null,
    warningTimer: null
  };
  bodies.push(starBody);

  let activeBody = null;
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseVx = 0;
  let mouseVy = 0;
  let totalReboundsCount = 0;

  const spawnPopupText = (text, x, y, color = "#b8d96b") => {
    const popup = document.createElement("div");
    popup.className = "physics-popup-text";
    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.color = color;
    container.appendChild(popup);
    setTimeout(() => popup.remove(), 700);
  };

  const triggerScreenShake = (intensity = 1) => {
    if (!multiplierActive) return;

    const shakeX = Math.min(10, Math.max(3, intensity * 2.5));
    const shakeY = Math.min(8, Math.max(2, intensity * 2));

    container.style.setProperty("--shake-x", `${shakeX}px`);
    container.style.setProperty("--shake-y", `${shakeY}px`);

    container.classList.remove("is-shaking");
    void container.offsetWidth;
    container.classList.add("is-shaking");

    setTimeout(() => container.classList.remove("is-shaking"), 180);
  };

  const spawnFairyDust = (centerX, centerY) => {
    for (let i = 0; i < 12; i++) {
      const dust = document.createElement("div");
      dust.className = "fairy-dust-particle";
      dust.style.left = `${centerX}px`;
      dust.style.top = `${centerY}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 55;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      dust.style.setProperty("--tx", `${tx}px`);
      dust.style.setProperty("--ty", `${ty}px`);
      dust.style.animationDelay = `${Math.random() * 0.05}s`;

      container.appendChild(dust);
      setTimeout(() => dust.remove(), 650);
    }
  };

  const showCenterRecordBanner = (scoreValue) => {
    const banner = document.createElement("div");
    banner.className = "physics-center-banner";
    banner.innerHTML = `<h2>NEW RECORD!</h2><p>${gameCopy.score[language].replace("Bounce points", "Score").replace("Puntos de Rebote", "Puntuación")}: ${scoreValue}</p>`;
    container.appendChild(banner);
    setTimeout(() => banner.remove(), 1600);
  };

  const triggerStarExplosion = (centerX, centerY) => {
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement("div");
      particle.className = "star-explosion-particle";
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      const angle = (Math.PI * 2 / 16) * i;
      const distance = 80 + Math.random() * 70;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      container.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  };

  const resetCombo = () => {
    totalScore = 0;
    newRecordCelebrated = false;
    if (scoreDisplay) scoreDisplay.textContent = totalScore;

    if (highScoreDisplay) {
      highScoreDisplay.classList.remove("is-record-glowing-loop");
    }

    container.classList.remove("is-urgent-warning");
    if (scoreCounterWrapper) {
      scoreCounterWrapper.classList.remove("is-urgent");
      scoreCounterWrapper.style.opacity = "0.4";
      setTimeout(() => { if (scoreCounterWrapper) scoreCounterWrapper.style.opacity = "1"; }, 300);
    }
  };

  const addScore = (points, x, y, color) => {
    const finalPoints = multiplierActive ? points * 2 : points;
    totalScore += finalPoints;
    totalReboundsCount++;
    if (scoreDisplay) scoreDisplay.textContent = totalScore;

    if (totalScore > highScore) {
      highScore = totalScore;
      localStorage.setItem("physics_arcade_highscore", highScore);
      if (highScoreDisplay) {
        highScoreDisplay.textContent = highScore;
        highScoreDisplay.classList.add("is-record-glowing-loop");
      }

      if (!newRecordCelebrated) {
        newRecordCelebrated = true;
        showCenterRecordBanner(highScore);
      }
    }

    if (scoreCounterWrapper) {
      scoreCounterWrapper.classList.remove("is-urgent");
      container.classList.remove("is-urgent-warning");
      scoreCounterWrapper.classList.add("is-bump");
      setTimeout(() => scoreCounterWrapper.classList.remove("is-bump"), 150);
    }

    spawnPopupText(multiplierActive ? `+${finalPoints} (x2)` : `+${finalPoints}`, x, y, color);

    if (comboTimer) clearTimeout(comboTimer);
    if (warningTimer) clearTimeout(warningTimer);

    warningTimer = setTimeout(() => {
      if (scoreCounterWrapper && totalScore > 0) {
        scoreCounterWrapper.classList.add("is-urgent");
        container.classList.add("is-urgent-warning");
      }
    }, 1500);

    comboTimer = setTimeout(resetCombo, 3000);

    if (!starBody.active && totalReboundsCount > 4 && Math.random() < 0.15) {
      activateStar();
    }
  };

  const activateMultiplierX2 = () => {
    multiplierActive = true;
    container.classList.add("is-multiplier-active");
    container.classList.remove("is-multiplier-ending");

    if (multiplierBadge) {
      multiplierBadge.classList.add("is-active");
      multiplierBadge.classList.remove("is-blinking");
    }

    if (multiplierTimer) clearTimeout(multiplierTimer);
    if (multiplierBlinkTimer) clearTimeout(multiplierBlinkTimer);

    multiplierBlinkTimer = setTimeout(() => {
      if (multiplierActive) {
        container.classList.add("is-multiplier-ending");
        if (multiplierBadge) multiplierBadge.classList.add("is-blinking");
      }
    }, 4500);

    multiplierTimer = setTimeout(() => {
      multiplierActive = false;
      container.classList.remove("is-multiplier-active", "is-multiplier-ending");
      if (multiplierBadge) {
        multiplierBadge.classList.remove("is-active", "is-blinking");
      }
    }, 6500);
  };

  const activateStar = () => {
    starBody.active = true;
    starBody.hits = 0;
    starBody.scale = 1;
    starEl.classList.remove("hit-level-1", "hit-level-2", "hit-level-3", "hit-level-4");
    if (starInnerEl) starInnerEl.style.transform = `scale(1)`;
    lastStarHitTime = 0;

    const cRect = container.getBoundingClientRect();
    const isMobile = window.innerWidth <= 800;
    const boundW = isMobile ? window.innerWidth : (cRect.width || container.offsetWidth || 800);
    const boundH = isMobile ? window.innerHeight : (cRect.height || container.offsetHeight || 600);

    starBody.x = (boundW * 0.45) + Math.random() * (boundW * 0.5 - starSize);
    starBody.y = Math.random() * (boundH - starSize - 100) + 50;
    starBody.vx = (Math.random() - 0.5) * 4.5;
    starBody.vy = (Math.random() - 0.5) * 4.5;
    starEl.style.display = "block";
    starEl.classList.add("star-spawning");
    starEl.classList.remove("is-disappearing");

    if (starBody.timer) clearTimeout(starBody.timer);
    if (starBody.warningTimer) clearTimeout(starBody.warningTimer);

    starBody.warningTimer = setTimeout(() => {
      if (starBody.active) {
        starEl.classList.add("is-disappearing");
      }
    }, 8500);

    starBody.timer = setTimeout(() => { deactivateStar(); }, 12000);
  };

  const deactivateStar = () => {
    starBody.active = false;
    starEl.style.display = "none";
    starEl.classList.remove("is-disappearing", "hit-level-1", "hit-level-2", "hit-level-3", "hit-level-4");
    if (starBody.timer) clearTimeout(starBody.timer);
    if (starBody.warningTimer) clearTimeout(starBody.warningTimer);
  };

  bodies.forEach((body) => {
    const onStart = (clientX, clientY) => {
      if (isFrozen) return;
      const isMobile = window.innerWidth <= 800;
      if (isMobile && !isArcadeActive) return;

      body.isDragging = true;
      activeBody = body;
      body.el.classList.add("is-dragging");
      const cRect = container.getBoundingClientRect();
      mouseX = isArcadeActive && isMobile ? clientX : clientX - cRect.left;
      mouseY = isArcadeActive && isMobile ? clientY : clientY - cRect.top;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    body.el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      onStart(e.clientX, e.clientY);
    });
    body.el.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
  });

  const onMove = (clientX, clientY) => {
    if (!activeBody || isFrozen) return;
    const isMobile = window.innerWidth <= 800;
    const cRect = container.getBoundingClientRect();
    const newX = isArcadeActive && isMobile ? clientX : clientX - cRect.left;
    const newY = isArcadeActive && isMobile ? clientY : clientY - cRect.top;

    mouseVx = newX - lastMouseX;
    mouseVy = newY - lastMouseY;
    lastMouseX = newX;
    lastMouseY = newY;
    mouseX = newX;
    mouseY = newY;
  };

  window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  const onEnd = () => {
    if (activeBody) {
      activeBody.isDragging = false;
      activeBody.vx = mouseVx * 0.8;
      activeBody.vy = mouseVy * 0.8;
      activeBody.el.classList.remove("is-dragging");
      activeBody = null;
    }
  };

  window.addEventListener("mouseup", onEnd);
  window.addEventListener("touchend", onEnd);

  const updatePhysics = () => {
    const isMobile = window.innerWidth <= 800;
    if (isMobile && !isArcadeActive) {
      requestAnimationFrame(updatePhysics);
      return;
    }

    if (isFrozen) {
      bodies.forEach((b) => {
        if (!b.isStar) {
          b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px) scale(1)`;
        } else {
          b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px)`;
        }
      });
      requestAnimationFrame(updatePhysics);
      return;
    }

    const cRect = container.getBoundingClientRect();
    const width = isArcadeActive && isMobile ? window.innerWidth : (cRect.width || container.offsetWidth || 800);
    const height = isArcadeActive && isMobile ? window.innerHeight : (cRect.height || container.offsetHeight || 600);

    let obstacleBoxes = [];
    if (!isMobile || !isArcadeActive) {
      const copyElements = document.querySelectorAll(
        ".hero-copy h1, .hero-copy .hero-lede, .hero-copy .eyebrow, .hero-copy .button",
      );
      if (copyElements.length > 0) {
        let minLeft = Infinity, minTop = Infinity, maxRight = -Infinity, maxBottom = -Infinity;
        copyElements.forEach(el => {
          const eRect = el.getBoundingClientRect();
          minLeft = Math.min(minLeft, eRect.left - cRect.left - 10);
          minTop = Math.min(minTop, eRect.top - cRect.top - 10);
          maxRight = Math.max(maxRight, eRect.right - cRect.left + 10);
          maxBottom = Math.max(maxBottom, eRect.bottom - cRect.top + 10);
        });
        obstacleBoxes.push({ left: minLeft, right: maxRight, top: minTop, bottom: maxBottom });
      }
    }

    for (let i = 0; i < bodies.length; i++) {
      let b = bodies[i];
      if (b.isStar && !b.active) continue;

      let diameter = b.radius * 2;

      if (!b.isStar) {
        b.scale += (1 - b.scale) * 0.1;
      }

      if (b === activeBody) {
        const targetX = mouseX - b.radius;
        const targetY = mouseY - b.radius;
        b.vx = (targetX - b.x) * 0.3;
        b.vy = (targetY - b.y) * 0.3;
        b.x += b.vx;
        b.y += b.vy;
      } else {
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.99;
        b.vy *= 0.99;
        b.vx += (Math.random() - 0.5) * 0.05;
        b.vy += (Math.random() - 0.5) * 0.05;

        let hitWall = false;
        if (b.x < 0) { b.x = 0; b.vx *= -0.8; hitWall = true; }
        if (b.x > width - diameter) { b.x = width - diameter; b.vx *= -0.8; hitWall = true; }
        if (b.y < 0) { b.y = 0; b.vy *= -0.8; hitWall = true; }
        if (b.y > height - diameter) { b.y = height - diameter; b.vy *= -0.8; hitWall = true; }

        if (hitWall && (Math.abs(b.vx) > 1.5 || Math.abs(b.vy) > 1.5) && !b.isStar) {
          const impactSpeed = Math.hypot(b.vx, b.vy);
          if (impactSpeed > 2.8) {
            triggerScreenShake(impactSpeed * 0.6);
          }
          if (b !== activeBody) { addScore(10, b.x + b.radius, b.y, "#ff6b4a"); }
          b.scale = 1.15;
          b.el.classList.add("is-impacted");
          setTimeout(() => b.el.classList.remove("is-impacted"), 150);
        }
      }

      obstacleBoxes.forEach(box => {
        let bCenterX = b.x + b.radius;
        let bCenterY = b.y + b.radius;

        if (bCenterX > box.left && bCenterX < box.right && bCenterY > box.top && bCenterY < box.bottom) {
          let dLeft = Math.abs(bCenterX - box.left);
          let dRight = Math.abs(box.right - bCenterX);
          let dTop = Math.abs(bCenterY - box.top);
          let dBottom = Math.abs(box.bottom - bCenterY);
          let minD = Math.min(dLeft, dRight, dTop, dBottom);

          if (minD === dLeft) { b.x = box.left - diameter; b.vx *= -0.8; }
          else if (minD === dRight) { b.x = box.right; b.vx *= -0.8; }
          else if (minD === dTop) { b.y = box.top - diameter; b.vy *= -0.8; }
          else if (minD === dBottom) { b.y = box.bottom; b.vy *= -0.8; }

          if (!b.isStar && b !== activeBody) {
            const impactSpeed = Math.hypot(b.vx, b.vy);
            if (impactSpeed > 2.8) {
              triggerScreenShake(impactSpeed * 0.6);
            }
            addScore(15, bCenterX, bCenterY, "#ff6b4a");
            b.scale = 1.2;
            b.el.classList.add("is-impacted");
            setTimeout(() => b.el.classList.remove("is-impacted"), 150);
          }
        }
      });

      for (let j = i + 1; j < bodies.length; j++) {
        let b2 = bodies[j];
        if (b2.isStar && !b2.active) continue;

        let dx = (b2.x + b2.radius) - (b.x + b.radius);
        let dy = (b2.y + b2.radius) - (b.y + b.radius);
        let dist = Math.sqrt(dx * dx + dy * dy);
        let minDist = b.radius + b2.radius;

        if (dist < minDist) {
          let overlap = minDist - dist;
          let nx = dx / (dist || 1);
          let ny = dy / (dist || 1);

          if (b !== activeBody && b2 !== activeBody) {
            b.x -= nx * overlap * 0.5;
            b.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;
          } else if (b === activeBody) {
            b2.x += nx * overlap;
            b2.y += ny * overlap;
          } else {
            b.x -= nx * overlap;
            b.y -= ny * overlap;
          }

          let kx = b.vx - b2.vx;
          let ky = b.vy - b2.vy;
          let p = (2 * (nx * kx + ny * ky)) / 2;

          let impactSpeed = Math.abs(p);
          if (impactSpeed > 0.8) {
            let midX = (b.x + b2.x) / 2 + b.radius;
            let midY = (b.y + b2.y) / 2 + b.radius;

            if (b.isStar || b2.isStar) {
              let starObj = b.isStar ? b : b2;

              const now = Date.now();
              if (!starObj.isDragging && now - lastStarHitTime > 350) {
                lastStarHitTime = now;
                starObj.hits++;

                starObj.scale = 1 + (starObj.hits * 0.4);

                if (starObj.hits > 0 && starObj.hits < 5) {
                  starEl.classList.add(`hit-level-${starObj.hits}`);
                }

                spawnFairyDust(midX, midY);

                starEl.classList.add("star-hit-glow");
                setTimeout(() => starEl.classList.remove("star-hit-glow"), 180);

                addScore(50, midX, midY, "#ffcc00");
                spawnPopupText(`${language === "en" ? "STAR HIT" : "¡HIT ESTRELLA!"} (${starObj.hits}/5)`, midX, midY, "#ffcc00");

                if (starObj.hits >= 5) {
                  triggerStarExplosion(starObj.x + starObj.radius, starObj.y + starObj.radius);
                  activateMultiplierX2();
                  spawnPopupText(language === "en" ? "STAR BURST x2!" : "¡EXPLOSIÓN ESTELAR x2!", midX, midY - 20, "#ffcc00");
                  deactivateStar();
                }
              }
            } else if (b !== activeBody && b2 !== activeBody) {
              if (impactSpeed > 2.2) {
                triggerScreenShake(impactSpeed);
              }
              let pointsEarned = Math.round(impactSpeed * 25) + 25;
              addScore(pointsEarned, midX, midY, "#b8d96b");
              b.scale = 1.25;
              b2.scale = 1.25;
              b.el.classList.add("is-impacted");
              b2.el.classList.add("is-impacted");
              setTimeout(() => {
                b.el.classList.remove("is-impacted");
                b2.el.classList.remove("is-impacted");
              }, 150);
            }
          }

          if (b !== activeBody) { b.vx -= p * nx * 0.8; b.vy -= p * ny * 0.8; }
          if (b2 !== activeBody) { b2.vx += p * nx * 0.8; b2.vy += p * ny * 0.8; }
        }
      }

      if (b.isStar) {
        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px)`;
        if (starInnerEl) {
          starInnerEl.style.transform = `scale(${b.scale})`;
        }
      } else {
        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px) scale(${b.scale})`;
      }
    }

    requestAnimationFrame(updatePhysics);
  };

  requestAnimationFrame(updatePhysics);
}

// 29. MONEDAS, TROFEOS Y CONFETI: HUD, desbloqueos y efectos de celebración.

/* Mantiene el HUD de monedas/trofeos, el retrato interactivo, el código Konami
   y el trofeo por superar el récord tres veces. */
(() => {
  "use strict";
  if (document.body.dataset.page === "project") return;

  const L = () => (typeof language !== "undefined" ? language : "es");
  const t = (es, en) => (L() === "en" ? en : es);
  const q = (s, r = document) => r.querySelector(s);
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem("pmm:" + k);
        return v === null ? d : JSON.parse(v);
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem("pmm:" + k, JSON.stringify(v));
      } catch {
        /* sin almacenamiento */
      }
    },
  };

  /* ---------- Estado global: monedas y 3 trofeos ---------- */
  const TROPHIES = {
    pet: ["Mejor amigo del retrato", "Portrait's best friend"],
    konami: ["Código secreto", "Secret code"],
    record3: ["Cazarrécords x3", "Record breaker x3"],
    map: ["Cartógrafo", "Cartographer"],
    goal: ["Meta alcanzada", "Finish line"],
  };

  let coins = store.get("coins", 0);
  let won = store.get("trophies", {});
  let recordBeats = store.get("physics_record_beats", 0);
  const hudListeners = [];
  let earnedRevealTimer = 0;
  const earnedTypes = new Set();

  // Limpia trofeos antiguos que ya no existan en TROPHIES
  const validKeys = Object.keys(TROPHIES);
  const cleanedWon = Object.fromEntries(
    Object.entries(won).filter(([k, val]) => val && validKeys.includes(k))
  );
  if (Object.keys(cleanedWon).length !== Object.keys(won).length) {
    won = cleanedWon;
    store.set("trophies", won);
  }

  const allTrophiesUnlocked = () => {
    const keys = Object.keys(TROPHIES);
    return keys.length > 0 && keys.every((k) => Boolean(won[k]));
  };

  const hud = document.createElement("aside");
  hud.className = "pmm-hud";
  hud.setAttribute("aria-label", "Progreso");
  document.body.appendChild(hud);

  const drawHud = (bump, earned = false) => {
    queueMicrotask(() => hudListeners.forEach((fn) => fn()));
    const total = Object.keys(TROPHIES).length;
    const n = Object.keys(won).length;
    const unlockedNames =
      Object.keys(TROPHIES)
        .filter((k) => won[k])
        .map((k) => TROPHIES[k][L() === "en" ? 1 : 0])
        .join(", ") || t("Aún sin trofeos", "No trophies yet");
    const complete = allTrophiesUnlocked();

    if (earned && (bump === "c" || bump === "t")) earnedTypes.add(bump);
    const shopExpanded = q("#pmm-shop-panel")?.hidden === false;
    const shopClasses = ["pmm-chip", "pmm-shop-toggle", bump === "c" ? "is-bump" : "", earnedTypes.has("c") ? "is-earned" : ""].filter(Boolean).join(" ");
    const trophyClasses = ["pmm-chip", "pmm-trophy-btn", complete ? "is-complete" : "", bump === "t" ? "is-bump" : "", earnedTypes.has("t") ? "is-earned" : ""].filter(Boolean).join(" ");
    hud.innerHTML =
      `<button type="button" id="pmm-shop-toggle" class="${shopClasses}" title="${t("Abrir tienda", "Open shop")}" aria-label="${t("Abrir tienda. Monedas:", "Open shop. Coins:")} ${coins}" aria-controls="pmm-shop-panel" aria-expanded="${shopExpanded}"><svg class="pmm-shop-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 1.4 1 2.5 2.2 2.5S7.5 11.4 7.5 10c0 1.4.9 2.5 2.25 2.5S12 11.4 12 10c0 1.4.9 2.5 2.25 2.5S16.5 11.4 16.5 10c0 1.4.9 2.5 2.25 2.5S21 11.4 21 10M8 20v-5h5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="pmm-coins-value" aria-live="polite">${coins}</span></button>` +
      `<button type="button" class="${trophyClasses}" aria-label="${t(`Trofeos: ${n} de ${total}. Pulsa para ver el progreso.`, `Trophies: ${n} of ${total}. Activate to view progress.`)}" title="${unlockedNames}">🏆 ${n}/${total}</button>`;

    q(".pmm-shop-toggle", hud)?.addEventListener("click", () => {
      window.dispatchEvent(new Event("pmm:open-shop"));
    });
    const trophyBtn = q(".pmm-trophy-btn", hud);
    trophyBtn?.addEventListener("click", () => {
      // El trofeo es el control de celebración: funciona aunque aún falten trofeos.
      confetti(complete ? 45 : 24);
      toast(
        complete
          ? t(
              "🎉 ¡Todos los trofeos desbloqueados!",
              "🎉 All trophies unlocked!"
            )
          : t(
              `🏆 Llevas ${n}/${total} trofeos.`,
              `🏆 You have ${n}/${total} trophies.`
            )
      );
    });

    if (earned) {
      clearTimeout(earnedRevealTimer);
      earnedRevealTimer = window.setTimeout(() => {
        earnedTypes.clear();
        hud.querySelectorAll(".is-earned").forEach((chip) => chip.classList.remove("is-earned"));
      }, 2600);
    }
  };

  const toast = (msg) => {
    q(".pmm-toast")?.remove();
    const el = document.createElement("div");
    el.className = "pmm-toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3300);
  };

  const addCoins = (n) => {
    if (n <= 0) return;
    coins += n;
    store.set("coins", coins);
    drawHud("c", true);
  };

  const unlock = (id) => {
    if (!TROPHIES[id] || won[id]) return;
    won[id] = true;
    store.set("trophies", won);
    drawHud("t", true);
    toast(`🏆 ${t("Trofeo", "Trophy")}: ${TROPHIES[id][L() === "en" ? 1 : 0]}`);
    confetti(24);
  };

  function confetti(n = 40) {
    const bag = ["⭐", "🎉", "🪙", "✨", "🎈"];
    const reducedMotion = false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "pmm-conf";
      s.textContent = bag[rnd(0, bag.length - 1)];
      s.style.left = rnd(0, 96) + "vw";
      const duration = reducedMotion ? 0.9 : rnd(16, 30) / 10;
      const delay = reducedMotion ? 0 : rnd(0, 6) / 10;
      s.style.animationDuration = `${duration}s`;
      s.style.animationDelay = `${delay}s`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), (duration + delay + 0.2) * 1000);
    }
  }

  window.pmmConfetti = confetti;

  /* ---------- Recompensas de un solo uso (persisten al recargar) ---------- */
  const claimed = store.get("claimed", {});
  const claim = (key, n, msg) => {
    if (claimed[key]) return false;
    claimed[key] = true;
    store.set("claimed", claimed);
    addCoins(n);
    if (msg) toast(msg);
    return true;
  };
  const spend = (n) => {
    if (n < 0 || coins < n) return false;
    coins -= n;
    store.set("coins", coins);
    drawHud("c");
    return true;
  };
  window.pmmGame = {
    claim,
    spend,
    addCoins,
    unlock,
    toast,
    confetti,
    store,
    t,
    L,
    has: (key) => Boolean(claimed[key]),
    getCoins: () => coins,
    onHud: (fn) => hudListeners.push(fn),
  };


  /* ---------- Trofeo por superar el récord en el juego de físicas 3 veces ---------- */
  // Guarda el primer récord detectado como base inicial si aún no existe uno propio
  let trackedBest = store.get("physics_tracked_best", null);
  let lastSeenScore = 0;
  let beatInCurrentRun = false;

  const parseScore = (el) => {
    if (!el) return null;
    const raw = (el.textContent || "").replace(/[^\d.-]/g, "");
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  };

  const registerRecordBeat = () => {
    if (beatInCurrentRun) return;
    beatInCurrentRun = true;
    recordBeats++;
    store.set("physics_record_beats", recordBeats);
    addCoins(10);

    if (recordBeats >= 3) {
      unlock("record3");
    } else {
      toast(
        t(
          `⚡ ¡Récord superado! (${recordBeats}/3 para trofeo)`,
          `⚡ Record beaten! (${recordBeats}/3 for trophy)`
        )
      );
    }
  };

  const syncPhysicsScore = () => {
    const scoreEl = q("#score-display");
    const current = parseScore(scoreEl);
    if (current === null) return;

    // Al empezar una nueva partida (el marcador vuelve a 0 tras haber tenido puntos)
    if (current === 0 && lastSeenScore > 0) {
      beatInCurrentRun = false;
    }

    if (trackedBest === null) {
      if (current > 0) {
        trackedBest = current;
        store.set("physics_tracked_best", trackedBest);
      }
    } else if (current > trackedBest) {
      trackedBest = current;
      store.set("physics_tracked_best", trackedBest);
      registerRecordBeat();
    }

    lastSeenScore = current;
  };

  const scoreTarget = q("#score-display");
  if (scoreTarget) {
    const observer = new MutationObserver(syncPhysicsScore);
    observer.observe(scoreTarget, { childList: true, characterData: true, subtree: true });
    syncPhysicsScore();
  }

  /* ---------- Retrato interactivo ---------- */
  let pokes = store.get("pokes", 0);
  const lines = [
    ["¡Eh, que me despeinas!", "Hey, you're messing my hair!"],
    ["Prototipo antes que presentación.", "Prototype before presentation."],
    ["¿Ya has hecho tu pregunta de hoy?", "Asked your question for today yet?"],
    ["Playtest, playtest, playtest.", "Playtest, playtest, playtest."],
    ["+1 de carisma.", "+1 charisma."],
    ["¡Cosquillas!", "That tickles!"],
  ];

  document.addEventListener("click", (e) => {
    const p = e.target.closest?.(".cs-portrait");
    if (!p) return;
    pokes++;
    store.set("pokes", pokes);
    if (pokes <= 10) addCoins(1);
    if (pokes === 10) unlock("pet");
    p.classList.remove("is-poked");
    void p.offsetWidth;
    p.classList.add("is-poked");
    p.querySelector(".pmm-bubble")?.remove();
    const b = document.createElement("span");
    b.className = "pmm-bubble";
    b.textContent = lines[rnd(0, lines.length - 1)][L() === "en" ? 1 : 0];
    p.appendChild(b);
    setTimeout(() => b.remove(), 1600);
  });

  /* ---------- Código Konami ---------- */
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let ki = 0;
  document.addEventListener("keydown", (e) => {
    ki = e.key === code[ki] || e.key.toLowerCase() === code[ki] ? ki + 1 : 0;
    if (ki === code.length) {
      ki = 0;
      claim("konami", 100);
      confetti(60);
      unlock("konami");
    }
  });

  /* ---------- Arranque y cambio de idioma ---------- */
  drawHud();
  document.querySelectorAll("[data-language]").forEach((b) =>
    b.addEventListener("click", () =>
      setTimeout(drawHud, 60)
    )
  );
})();

// 30. EXTRAS DE JUEGO: acento por enfoque, cartuchos, mapa con peón, banderas y tienda de punteros.

/* Usa la API window.pmmGame del bloque 29 (HUD).
   Cada recompensa se cobra una sola vez y queda guardada, así que recargar no da monedas de nuevo. */
(() => {
  "use strict";
  const G = window.pmmGame;
  if (!G) return;
  const { claim, unlock, toast, confetti, t, store } = G;
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = () => false /* animaciones siempre activas, aunque el sistema pida reducir movimiento */;

  /* ================= SOBRE MÍ: el enfoque tiñe la web ================= */
  function initAbout() {
    const about = q("#about");
    if (!about) return;
    const root = document.documentElement;
    const bounce = () => qa(".cs-attr", about).forEach((row, i) => {
      row.style.setProperty("--d", i * 90 + "ms");
      row.classList.remove("pmm-bounce");
      void row.offsetWidth;
      row.classList.add("pmm-bounce");
    });
    const apply = (replay) => {
      const btn = q('.cs-focus-btn[aria-checked="true"]', about);
      const accent = btn && getComputedStyle(btn).getPropertyValue("--focus-accent").trim();
      if (accent) {
        root.style.setProperty("--coral", accent);
        root.style.setProperty("--pmm-accent", accent);
      }
      if (replay) bounce();
    };
    new MutationObserver(() => apply(true)).observe(about, { attributes: true, attributeFilter: ["data-focus"] });
    const bars = q("#about-attributes");
    if (bars && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { bounce(); io.disconnect(); }
      }, { threshold: 0.4 });
      io.observe(bars);
    }
    apply(false);
  }

  /* ================= PROYECTOS: cartucho y sello "jugado" ================= */
  function initProjects() {
    const list = q("#projects-list");
    if (!list) return;
    const slugOf = (a) => new URL(a.href, location.href).searchParams.get("project") || "";
    const played = () => store.get("played", []);
    const stamp = () => {
      const p = played();
      qa("a.project-card", list).forEach((a) => {
        if (!p.includes(slugOf(a))) return;
        let s = q(".pmm-stamp", a);
        if (!s) {
          s = document.createElement("span");
          s.className = "pmm-stamp";
          s.setAttribute("aria-hidden", "true");
          (q(".gbc-case", a) || a).appendChild(s);
        }
        s.textContent = ""; s.title = t("Jugado", "Played");
      });
    };
    new MutationObserver(stamp).observe(list, { childList: true });
    stamp();
    list.addEventListener("click", (e) => {
      const a = e.target.closest("a.project-card");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.classList.contains("is-inserting")) { e.preventDefault(); return; }
      const slug = slugOf(a), p = played();
      if (!p.includes(slug)) { store.set("played", [...p, slug]); claim("proj:" + slug, 2); }
      if (reduce()) return;
      e.preventDefault();
      a.classList.add("is-inserting");
      setTimeout(() => { location.href = a.href; }, 520);
    });
  }

  /* ================= INVESTIGACIÓN: peón y niebla de guerra ================= */
  function initMap() {
    const wrap = q("#documents-grid");
    if (!wrap) return;
    let busy = false, bypass = false;
    store.set("rooms", []); /* la niebla vuelve a cubrir todas las salas en cada recarga */
    const found = () => store.get("rooms", []);
    const total = () => (typeof documents !== "undefined" ? documents.length : 0);
    const rooms = (g) => qa(".document-room", g);
    const anchor = (g, r) => {
      const gr = g.getBoundingClientRect(), rr = r.getBoundingClientRect();
      return { x: rr.left - gr.left + rr.width / 2, y: rr.top - gr.top };
    };
    const place = (g, pawn) => {
      const rs = rooms(g); if (!rs.length) return;
      const a = anchor(g, rs[Math.min(+pawn.dataset.at || 0, rs.length - 1)]);
      pawn.style.transform = `translate(${a.x}px,${a.y}px)`;
    };
    const setup = () => {
      const f = found();
      qa(".documents-room-grid", wrap).forEach((g) => {
        rooms(g).forEach((r) => r.classList.toggle("is-discovered", f.includes(Number(r.dataset.documentCard))));
        let pawn = q(".pmm-pawn", g);
        if (!pawn) {
          pawn = document.createElement("span");
          pawn.className = "pmm-pawn"; pawn.dataset.at = "0";
          pawn.setAttribute("aria-hidden", "true");
          pawn.innerHTML = '<span class="pmm-pawn-sprite"><img class="pmm-idle" src="Imagenes/recorrido-parado.gif" alt=""><img class="pmm-run" src="Imagenes/recorrido-correr.gif" alt=""></span>';
          g.appendChild(pawn);
        }
        requestAnimationFrame(() => place(g, pawn));
      });
    };
    async function walk(g, pawn, target) {
      const rs = rooms(g), from = +pawn.dataset.at || 0, to = rs.indexOf(target);
      if (to < 0) return;
      const step = from <= to ? 1 : -1, pts = [], xs = [];
      for (let i = from; i !== to + step; i += step) { const a = anchor(g, rs[i]); xs.push(a.x); pts.push(`translate(${a.x}px,${a.y}px)`); }
      pawn.dataset.at = String(to);
      if (pts.length < 2 || reduce()) { place(g, pawn); return; }
      pawn.classList.add("is-walking");
      const segMs = Math.max(280, Math.min(700, 1400 / (pts.length - 1)));
      const anims = [];
      for (let i = 0; i < pts.length - 1; i++) {
        if (Math.abs(xs[i + 1] - xs[i]) > 2) pawn.classList.toggle("is-left", xs[i + 1] < xs[i]);
        const anim = pawn.animate([{ transform: pts[i] }, { transform: pts[i + 1] }], { duration: segMs, easing: "linear", fill: "forwards" });
        anims.push(anim);
        try { await anim.finished; } catch { break; }
      }
      place(g, pawn); anims.forEach((a) => a.cancel()); pawn.classList.remove("is-walking");
    }
    const discover = (room) => {
      const idx = Number(room.dataset.documentCard), f = found();
      if (!f.includes(idx)) { f.push(idx); store.set("rooms", f); claim("room:" + idx, 2); }
      room.classList.add("is-discovered");
      if (total() && f.length >= total()) { claim("map_all", 10); unlock("map"); }
    };
    /* la niebla se quita al pasar el ratón / enfocar / (móvil) al activarse la sala, y ya no vuelve hasta recargar */
    const reveal = (e) => {
      if (e.pointerType === "touch") return;
      const room = e.target.closest && e.target.closest(".document-room");
      if (room && !room.classList.contains("is-discovered")) discover(room);
    };
    wrap.addEventListener("pointerover", reveal);
    wrap.addEventListener("focusin", reveal);
    new MutationObserver((ms) => ms.forEach((m) => {
      const r = m.target;
      if (r.classList && r.classList.contains("document-room") && r.classList.contains("is-scroll-active") && !r.classList.contains("is-discovered")) discover(r);
    })).observe(wrap, { attributes: true, attributeFilter: ["class"], subtree: true });
    wrap.addEventListener("click", async (e) => {
      if (bypass) return;
      const room = e.target.closest(".document-room");
      if (!room) return;
      e.stopPropagation(); e.preventDefault();
      if (busy) return;
      busy = true;
      const origin = e.target.closest(".document-open") || room;
      const g = room.closest(".documents-room-grid"), pawn = g && q(".pmm-pawn", g);
      if (g && pawn) await walk(g, pawn, room);
      discover(room);
      busy = false; bypass = true; origin.click(); bypass = false;
    }, true);
    new MutationObserver(setup).observe(wrap, { childList: true });
    let timer;
    window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(setup, 200); });
    setup();
  }

  /* ================= EXPERIENCIA: banderas de checkpoint y meta ================= */
  function initExperience() {
    const list = q("#experience-list");
    if (!list) return;
    const seen = new Set();
    let io = null;
    const check = () => {
      const line = window.innerHeight * 0.72;
      let all = true;
      qa(".experience-card-wrapper", list).forEach((w, i) => {
        const f = q(".pmm-flag", w);
        if (!f) return;
        if (!f.classList.contains("is-planted") && seen.has(w.dataset.experience) && w.getBoundingClientRect().top + 40 < line) {
          f.classList.add("is-planted");
          claim("flag:" + i, 2);
        }
        if (!f.classList.contains("is-planted")) all = false;
      });
      q(".pmm-goal")?.classList.toggle("is-ready", all);
    };
    const goal = () => {
      q(".pmm-goal")?.remove();
      const done = G.has("goal");
      const el = document.createElement("div");
      el.className = "pmm-goal" + (done ? " is-done" : "");
      el.innerHTML = `<span class="pmm-goal-flag" aria-hidden="true">🏁</span><div><b>${t("Meta", "Finish line")}</b><small>${done ? t("Nivel completado", "Level complete") : t("Planta todas las banderas para activar la moneda", "Plant every flag to activate the coin")}</small></div><button type="button" class="pmm-goal-coin" ${done ? "disabled" : ""} aria-label="${t("Recoger la moneda de meta", "Collect the finish coin")}">🪙</button>`;
      list.after(el);
      q("button", el).addEventListener("click", () => {
        if (!el.classList.contains("is-ready") || G.has("goal")) return;
        claim("goal", 10); unlock("goal"); confetti(40); goal(); check();
      });
    };
    const flags = () => {
      qa(".experience-card-wrapper", list).forEach((w, i) => {
        if (q(".pmm-flag", w)) return;
        const f = document.createElement("span");
        f.className = "pmm-flag" + (G.has("flag:" + i) ? " is-planted is-instant" : "");
        f.setAttribute("aria-hidden", "true");
        f.innerHTML = "<i></i><b></b>";
        w.appendChild(f);
        io?.observe(w);
      });
      goal(); check();
    };
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) seen.add(e.target.dataset.experience); });
        check();
      }, { threshold: 0.15 });
    }
    new MutationObserver(flags).observe(list, { childList: true });
    let frame = 0;
    window.addEventListener("scroll", () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; check(); }); }, { passive: true });
    flags();
  }

  /* ================= CONTACTO: tienda de punteros ================= */
  const INK = "#12062e";
  const SKINS = [
    { id: "classic", price: 0, name: ["Clásico", "Classic"], hot: [0, 0], inner: `<path d="M5 3v21l6-5 4 9 4-2-4-9h8z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>` },
    { id: "arrow", price: 15, name: ["Flecha cartoon", "Cartoon arrow"], hot: [4, 3], inner: `<path d="M4 3v21l6-5 4 9 4-2-4-9h8z" fill="#ff6b4a" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>` },
    { id: "wand", price: 30, name: ["Varita estelar", "Star wand"], hot: [22, 9], inner: `<path d="M5 28L19 14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M5 28L19 14" stroke="#c98a4b" stroke-width="2.4" stroke-linecap="round"/><path d="M22 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L14.8 8.3l5-.7z" fill="#ffd23f" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` },
    { id: "glove", price: 45, name: ["Manita guante", "Glove hand"], hot: [14, 3], inner: `<path d="M11 15V6a3 3 0 016 0v8l2-.6a2.8 2.8 0 013.4 2.2l.4 2.4 1-.2a2.6 2.6 0 013 2.6V23c0 4-3 6.5-7 6.5h-3c-3 0-4.6-1.6-6-4l-3-5a2.4 2.4 0 013.6-3z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>` },
    { id: "sword", price: 60, name: ["Espada pixel", "Pixel sword"], hot: [6, 6], inner: `<g transform="rotate(-45 16 16)"><path d="M16 1l3.2 4v15h-6.4V5z" fill="#dfe8f2" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><rect x="8.5" y="20" width="15" height="3.4" rx="1.4" fill="#ffd23f" stroke="${INK}" stroke-width="2"/><rect x="13.5" y="23.4" width="5" height="5" fill="#a0522d" stroke="${INK}" stroke-width="2"/></g>` },
  ];
  const svg = (s, pointer) => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${s.inner}${pointer ? `<circle cx="27" cy="27" r="4" fill="#b8d96b" stroke="${INK}" stroke-width="2"/>` : ""}</svg>`;
  const cursorCss = () => `@media (hover:hover){html.pmm-cursor-ready,html.pmm-cursor-ready *{cursor:none!important}}`;
  function initShop() {
    const style = document.createElement("style");
    style.id = "pmm-cursor";
    document.head.appendChild(style);
    const fxLayer = document.createElement("div");
    fxLayer.className = "pmm-cursor-fx-layer";
    fxLayer.setAttribute("aria-hidden", "true");
    const cursorLive = document.createElement("div");
    cursorLive.className = "pmm-cursor-live";
    fxLayer.appendChild(cursorLive);
    document.body.appendChild(fxLayer);

    let activeCursor = SKINS[0], lastPointer = null, lastMove = null, lastTrailAt = 0;
    let touchHoverNodes = [], touchHoverTimer = 0;
    const positionCursor = (x, y, tilt = 0, scale = 1) => {
      cursorLive.style.left = `${x - activeCursor.hot[0]}px`;
      cursorLive.style.top = `${y - activeCursor.hot[1]}px`;
      cursorLive.style.setProperty("--cursor-hot-x", `${activeCursor.hot[0]}px`);
      cursorLive.style.setProperty("--cursor-hot-y", `${activeCursor.hot[1]}px`);
      cursorLive.style.setProperty("--cursor-tilt", `${tilt.toFixed(1)}deg`);
      cursorLive.style.setProperty("--cursor-scale", scale.toFixed(3));
      cursorLive.style.opacity = "1";
      document.documentElement.classList.add("pmm-cursor-ready");
    };
    const emitParticle = (x, y, tier, burst = false) => {
      const particle = document.createElement("span");
      particle.className = "pmm-cursor-particle";
      particle.dataset.tier = String(tier);
      const angle = Math.random() * Math.PI * 2;
      const distance = burst ? 12 + Math.random() * 16 : 5 + Math.random() * 7;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
      fxLayer.appendChild(particle);
      window.setTimeout(() => particle.remove(), burst ? 560 : 420);
    };
    const emitClick = (event) => {
      if (activeCursor.id === "classic") return;
      const tier = Math.floor(activeCursor.price / 15);
      const pulse = document.createElement("span");
      pulse.className = "pmm-cursor-pulse";
      pulse.dataset.tier = String(tier);
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      fxLayer.appendChild(pulse);
      window.setTimeout(() => pulse.remove(), 440);
      const count = Math.min(5, Math.max(2, tier + 1));
      for (let i = 0; i < count; i++) emitParticle(event.clientX, event.clientY, tier, true);
      cursorLive.classList.remove("is-clicking");
      void cursorLive.offsetWidth;
      cursorLive.classList.add("is-clicking");
      window.setTimeout(() => cursorLive.classList.remove("is-clicking"), 220);
    };
    const installTouchHoverStyles = () => {
      const mirroredRules = [];
      const visit = (rules, wrappers = []) => {
        for (const rule of rules) {
          if (rule.selectorText && rule.style && /:hover\b/.test(rule.selectorText)) {
            const selector = rule.selectorText.replace(/:hover\b/g, ".is-touch-hover");
            mirroredRules.push(`${wrappers.map((wrapper) => `${wrapper}{`).join("")}${selector}{${rule.style.cssText}}${"}".repeat(wrappers.length)}`);
          } else if (rule.cssRules && rule.cssText.startsWith("@") && !/^@(?:-webkit-)?keyframes\b/i.test(rule.cssText)) {
            const brace = rule.cssText.indexOf("{");
            if (brace > 0) visit(rule.cssRules, [...wrappers, rule.cssText.slice(0, brace).trim()]);
          }
        }
      };
      for (const sheet of document.styleSheets) {
        try { visit(sheet.cssRules); } catch { /* Omitimos hojas externas sin acceso CSSOM. */ }
      }
      if (!mirroredRules.length) return;
      const touchStyles = document.createElement("style");
      touchStyles.id = "pmm-touch-hover-styles";
      touchStyles.textContent = mirroredRules.join("\n");
      document.head.appendChild(touchStyles);
    };
    const setTouchHoverPath = (target) => {
      const next = [];
      for (let node = target; node && node !== document.body; node = node.parentElement) next.push(node);
      touchHoverNodes.forEach((node) => { if (!next.includes(node)) node.classList.remove("is-touch-hover"); });
      next.forEach((node) => node.classList.add("is-touch-hover"));
      touchHoverNodes = next;
    };
    const clearTouchHover = () => {
      clearTimeout(touchHoverTimer);
      touchHoverNodes.forEach((node) => node.classList.remove("is-touch-hover"));
      touchHoverNodes = [];
    };
    installTouchHoverStyles();

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") {
        if (event.buttons) setTouchHoverPath(event.target);
        return;
      }
      const now = performance.now();
      const previous = lastMove;
      const dx = previous ? event.clientX - previous.x : 0;
      const dy = previous ? event.clientY - previous.y : 0;
      const dt = previous ? Math.max(8, now - previous.time) : 16;
      const speed = Math.hypot(dx, dy) / dt;
      lastMove = { x: event.clientX, y: event.clientY, time: now };
      lastPointer = { x: event.clientX, y: event.clientY, pointerType: event.pointerType };
      if (activeCursor.id === "classic") return;
      const tilt = Math.max(-14, Math.min(14, (dx / dt) * 8));
      positionCursor(event.clientX, event.clientY, tilt, 1 + Math.min(0.055, speed * 0.035));
      if (speed > 0.72 && now - lastTrailAt > 90) {
        lastTrailAt = now;
        emitParticle(event.clientX - activeCursor.hot[0] + 16, event.clientY - activeCursor.hot[1] + 16, Math.floor(activeCursor.price / 15));
      }
    }, { capture: true, passive: true });
    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" && event.isPrimary) {
        clearTimeout(touchHoverTimer);
        setTouchHoverPath(event.target);
      }
      if (event.isPrimary) emitClick(event);
    }, { capture: true, passive: true });
    const endTouch = (event, delay) => {
      if (event.pointerType !== "touch") return;
      clearTimeout(touchHoverTimer);
      touchHoverTimer = window.setTimeout(clearTouchHover, delay);
    };
    document.addEventListener("pointerup", (event) => endTouch(event, 720), true);
    document.addEventListener("pointercancel", (event) => endTouch(event, 180), true);
    const hideCursor = () => { cursorLive.style.opacity = "0"; lastMove = null; document.documentElement.classList.remove("pmm-cursor-ready"); };
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    const apply = (id) => {
      const s = SKINS.find((x) => x.id === id) || SKINS[0];
      activeCursor = s;
      document.documentElement.classList.toggle("pmm-cur", s.id !== "classic");
      style.textContent = s.id === "classic" ? "" : cursorCss();
      cursorLive.innerHTML = s.id === "classic" ? "" : svg(s, false);
      cursorLive.style.transformOrigin = `${s.hot[0]}px ${s.hot[1]}px`;
      if (s.id !== "classic" && lastPointer && lastPointer.pointerType !== "touch") positionCursor(lastPointer.x, lastPointer.y);
      else { cursorLive.style.opacity = "0"; document.documentElement.classList.remove("pmm-cursor-ready"); }
    };
    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.id = "pmm-shop-backdrop";
    backdrop.className = "pmm-shop-backdrop";
    backdrop.hidden = true;
    backdrop.setAttribute("aria-label", t("Cerrar tienda", "Close shop"));
    const panel = document.createElement("aside");
    panel.id = "pmm-shop-panel";
    panel.className = "pmm-shop-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "pmm-shop-title");
    panel.setAttribute("tabindex", "-1");
    panel.innerHTML = `<div class="pmm-shop-panel-head"><span class="pmm-shop-panel-kicker">${t("MONEDAS · TIENDA", "COINS · SHOP")}</span><button type="button" class="pmm-shop-close" aria-label="${t("Cerrar tienda", "Close shop")}">×</button></div>`;
    const host = document.createElement("div");
    host.className = "pmm-shop";
    panel.appendChild(host);
    document.body.append(backdrop, panel);

    let closeTimer = 0;
    const shopToggle = () => q("#pmm-shop-toggle");
    const closePanel = () => {
      if (panel.hidden) return;
      panel.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        panel.hidden = true;
        backdrop.hidden = true;
        document.body.classList.remove("pmm-shop-open");
        shopToggle()?.setAttribute("aria-expanded", "false");
        shopToggle()?.focus();
      }, 240);
    };
    const openPanel = () => {
      clearTimeout(closeTimer);
      panel.hidden = false;
      backdrop.hidden = false;
      document.body.classList.add("pmm-shop-open");
      shopToggle()?.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        panel.classList.add("is-open");
        backdrop.classList.add("is-open");
      });
      panel.querySelector(".pmm-shop-close")?.focus();
    };
    panel.querySelector(".pmm-shop-close")?.addEventListener("click", closePanel);
    backdrop.addEventListener("click", closePanel);
    window.addEventListener("pmm:open-shop", openPanel);
    document.addEventListener("keydown", (event) => {
      if (panel.hidden) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...panel.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
      } else if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        focusable[0].focus();
      }
    });

    const render = () => {
      const owned = store.get("cur_owned", ["classic"]), eq = store.get("cur_eq", "classic"), coins = G.getCoins();
      panel.querySelector(".pmm-shop-panel-kicker").textContent = t("MONEDAS · TIENDA", "COINS · SHOP");
      panel.querySelector(".pmm-shop-close").setAttribute("aria-label", t("Cerrar tienda", "Close shop"));
      backdrop.setAttribute("aria-label", t("Cerrar tienda", "Close shop"));
      host.innerHTML = `<h3 id="pmm-shop-title">${t("Tienda de punteros", "Cursor shop")}</h3><p>${t("Gasta tus monedas en un puntero nuevo.", "Spend your coins on a new cursor.")}</p><div class="pmm-skins">` +
        SKINS.map((s) => {
          const has = owned.includes(s.id);
          const status = eq === s.id ? t("Equipado", "Equipped") : has ? t("Equipar", "Equip") : `🪙 ${s.price}`;
          return `<button type="button" class="pmm-skin${eq === s.id ? " is-equipped" : ""}${!has && coins < s.price ? " is-locked" : ""}" data-skin="${s.id}" data-tier="${Math.floor(s.price / 15)}" aria-pressed="${eq === s.id}"><span class="pmm-skin-prev">${svg(s, false)}</span><b>${s.name[G.L() === "en" ? 1 : 0]}</b><small>${status}</small></button>`;
        }).join("") + "</div>";
    };
    host.addEventListener("click", (e) => {
      const b = e.target.closest(".pmm-skin");
      if (!b) return;
      const s = SKINS.find((x) => x.id === b.dataset.skin), owned = store.get("cur_owned", ["classic"]);
      if (!owned.includes(s.id)) {
        if (!G.spend(s.price)) {
          const miss = s.price - G.getCoins();
          toast(t(`Te faltan ${miss} 🪙`, `You need ${miss} more 🪙`));
          return;
        }
        owned.push(s.id); store.set("cur_owned", owned);
        toast(t(`¡Comprado: ${s.name[0]}!`, `Bought: ${s.name[1]}!`));
      }
      store.set("cur_eq", s.id); apply(s.id); render();
      requestAnimationFrame(() => {
        const equippedButton = [...host.querySelectorAll(".pmm-skin")].find((item) => item.dataset.skin === s.id);
        if (!equippedButton) return;
        equippedButton.focus({ preventScroll: true });
        equippedButton.classList.add("is-activating");
        window.setTimeout(() => equippedButton.classList.remove("is-activating"), 850);
      });
    });
    G.onHud(render);
    apply(store.get("cur_eq", "classic"));
    render();
  }

  const run = () => { initAbout(); initProjects(); initMap(); initExperience(); initShop(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();

/* TEMA EDITOR: menú de jerarquía (móvil), barra de XP en la cabecera y textos ES/EN de la sección Proceso. */
(function () {
  var onProject = document.body.getAttribute("data-page") === "project";
  var base = onProject ? "index.html" : "";
  var T = {
    es: {
      root: "▾ Portfolio", hier: "JERARQUÍA", nav: "Jerarquía del portfolio",
      items: { top: "Portada", about: "Sobre mí", process: "Proceso", projects: "Proyectos", skills: "Habilidades", documents: "Investigación", awards: "Reconocimientos", experience: "Experiencia", contact: "Contacto" },
      eyebrow: "Proceso", title: "Cómo diseño,<br /><em>paso a paso.</em>",
      intro: "Cada ventana muestra una parte de mi proceso con una animación simple. Son esquemas ilustrativos, no un proyecto concreto.",
      w1: "1 · Pregunta", w1tag: "idea", w1d: "Empiezo por una pregunta concreta: qué quiero que haga o sienta el jugador.", w1Alt: "Animación: se escribe una pregunta y aparecen posibles respuestas",
      w2: "2 · Prototipo", w2tag: "greybox", w2d: "Construyo lo mínimo para poder tocar la idea: bloques grises y reglas básicas.", w2Alt: "Animación: aparecen bloques grises y un cubo los cruza saltando",
      w3: "3 · Playtest", w3tag: "feedback", w3d: "Lo prueba otra persona y observo dónde se atasca, sin explicarle nada.", w3Alt: "Animación: un jugador recorre el nivel y se atasca en un obstáculo mientras alguien observa",
      w4: "4 · Ajuste", w4tag: "iteración", w4d: "Cambio un valor según lo observado y vuelvo a probar.", w4Alt: "Animación: un control deslizante estrecha el hueco entre dos plataformas",
      w5: "Diseño de niveles", w5tag: "blockout", w5d: "Primero el espacio y el ritmo, sin arte: dónde empieza el jugador, dónde descansa y dónde se pone a prueba (la curva de abajo).", w5Alt: "Plano de un nivel que se traza de inicio a jefe con su curva de ritmo",
      w6: "Narrativa", w6tag: "ramas", w6d: "Cada decisión abre ramas con consecuencias: lo escribo como grafo antes de escribir una sola línea.", w6Alt: "Grafo de diálogo que se ilumina de la decisión a los dos finales",
      start: "Inicio", check: "Checkpoint", key: "Llave", boss: "Jefe",
      n0: "Inicio", n1: "¿Confiar en él?", n2: "Sí", n3: "No", n4: "Final A", n5: "Final B"
    },
    en: {
      root: "▾ Portfolio", hier: "HIERARCHY", nav: "Portfolio hierarchy",
      items: { top: "Cover", about: "About me", process: "Process", projects: "Projects", skills: "Skills", documents: "Research", awards: "Recognition", experience: "Experience", contact: "Contact" },
      eyebrow: "Process", title: "How I design,<br /><em>step by step.</em>",
      intro: "Each window shows one part of my process with a simple animation. They are illustrative diagrams, not a specific project.",
      w1: "1 · Question", w1tag: "idea", w1d: "I start with a concrete question: what do I want the player to do or feel.", w1Alt: "Animation: a question is typed and possible answers appear",
      w2: "2 · Prototype", w2tag: "greybox", w2d: "I build the minimum to touch the idea: grey blocks and basic rules.", w2Alt: "Animation: grey blocks appear and a cube hops across them",
      w3: "3 · Playtest", w3tag: "feedback", w3d: "Someone else plays it and I watch where they get stuck, without explaining anything.", w3Alt: "Animation: a player runs the level and gets stuck at an obstacle while someone watches",
      w4: "4 · Adjust", w4tag: "iteration", w4d: "I change one value based on what I saw and test again.", w4Alt: "Animation: a slider narrows the gap between two platforms",
      w5: "Level design", w5tag: "blockout", w5d: "Space and pacing first, no art: where the player starts, rests and gets tested (the curve below).", w5Alt: "Level plan traced from start to boss with its pacing curve",
      w6: "Narrative", w6tag: "branches", w6d: "Each choice opens branches with consequences: I write it as a graph before writing a single line.", w6Alt: "Dialogue graph lighting up from the decision to both endings",
      start: "Start", check: "Checkpoint", key: "Key", boss: "Boss",
      n0: "Start", n1: "Trust him?", n2: "Yes", n3: "No", n4: "Ending A", n5: "Ending B"
    }
  };
  var ids = ["top", "about", "process", "projects", "skills", "documents", "awards", "experience", "contact"];
  function L() { return document.documentElement.lang === "en" ? T.en : T.es; }
  function $(s, r) { return (r || document).querySelector(s); }
  var shell = $(".site-shell");

  /* Jerarquía = menú desplegable del móvil */
  var nav = document.createElement("nav");
  nav.className = "ed-hierarchy"; nav.id = "ed-hierarchy";
  nav.innerHTML = '<h2></h2><div class="ed-root"></div><ul></ul>';
  var ul = $("ul", nav);
  ids.forEach(function (id, i) {
    var li = document.createElement("li"), a = document.createElement("a");
    li.style.setProperty("--i", i);
    a.href = base + "#" + id; a.setAttribute("data-ed", id);
    li.appendChild(a); ul.appendChild(li);
  });
  shell.appendChild(nav);
  var toggle = $(".mobile-toggle"), mainNav = $(".main-nav");
  if (toggle) toggle.setAttribute("aria-controls", "ed-hierarchy");
  function sync() {
    var open = !!(mainNav && mainNav.classList.contains("is-open"));
    nav.classList.toggle("is-open", open);
    if (toggle) toggle.textContent = open ? "✕" : "☰";
  }
  function closeMenu() {
    if (mainNav) mainNav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    sync();
  }
  if (mainNav) new MutationObserver(sync).observe(mainNav, { attributes: true, attributeFilter: ["class"] });
  nav.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-ed]");
    if (!a) return;
    if (!onProject) {
      var el = document.getElementById(a.getAttribute("data-ed"));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "auto", block: "start" }); }
    }
    closeMenu();
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !(toggle && toggle.contains(e.target))) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); if (toggle) toggle.focus(); }
  });

  /* Barra de XP en la cabecera */
  var xp = document.createElement("div");
  xp.className = "ed-xp"; xp.setAttribute("aria-hidden", "true");
  xp.innerHTML = '<b>XP</b><span class="ed-xp-track"><i></i></span><span class="ed-xp-pct">0%</span>';
  var brand = $(".topbar .brand");
  if (brand) brand.insertAdjacentElement("afterend", xp);

  function render() {
    var t = L();
    $("h2", nav).textContent = t.hier;
    $(".ed-root", nav).textContent = t.root;
    nav.setAttribute("aria-label", t.nav);
    nav.querySelectorAll("a[data-ed]").forEach(function (a) { a.textContent = t.items[a.getAttribute("data-ed")]; });
    var p = $("#process");
    if (p) {
      p.querySelectorAll("[data-t]").forEach(function (n) {
        var v = t[n.getAttribute("data-t")];
        if (v == null) return;
        if (n instanceof SVGElement) n.textContent = v; else n.innerHTML = v;
      });
      p.querySelectorAll("[data-alt]").forEach(function (n) { n.setAttribute("aria-label", t[n.getAttribute("data-alt") + "Alt"]); });
    }
  }

  function update() {
    var y = window.scrollY + window.innerHeight * 0.35, cur = "top";
    ids.forEach(function (id) {
      var el = id === "top" ? $(".hero-section") : document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id;
    });
    nav.querySelectorAll("a[data-ed]").forEach(function (a) {
      if (a.getAttribute("data-ed") === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
    $(".ed-xp-track i", xp).style.width = pct + "%";
    $(".ed-xp-pct", xp).textContent = pct + "%";
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener("resize", update);
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  render(); update();
})();


/* PROCESO · guiño al editor de niveles.
   Cada ventana tiene ▶/⏸ (pausar la animación) y ↻ (reiniciar). El "modo edición" (interruptor o tecla E)
   congela las animaciones y activa una mini interacción por ventana. Al salir, los cambios se restablecen. */
(function () {
  var section = document.getElementById("process");
  if (!section) return;
  var NS = "http://www.w3.org/2000/svg", CELL = 20;
  var TXT = {
    es: {
      mode: "Modo edición", modeTitle: "Activar o desactivar el modo edición (tecla E)",
      pause: "Pausar animación", play: "Reproducir animación", restart: "Reiniciar animación",
      reset: "Restablecer los cambios de esta ventana", lockedPlay: "Sal del modo edición para reproducir la animación",
      hints: [
        "Haz clic en una respuesta para elegirla.",
        "Clic para colocar o borrar bloques (también en el suelo). El cubo lo prueba solo.",
        "Observa al jugador y anota dónde se atasca; luego arréglalo y vuelve a probar.",
        "Arrastra el deslizador: ¿llega el cubo a saltar el hueco?",
        "Elige una pieza y haz clic en el plano. Arrastra para moverla; clic sobre una pieza para borrarla.",
        "Haz clic en «Sí» o «No» para seguir esa rama."
      ],
      pieces: { start: "Inicio", check: "Checkpoint", boss: "Jefe" },
      p3: {
        find: "Observa al cubo: va a atascarse con algo del nivel.",
        stuck: "¡Atascado! Haz clic en el muro rojo para anotar el problema.",
        wait: "Espera un momento: el cubo todavía está corriendo.",
        miss: "Haz clic sobre el muro rojo, que es lo que lo bloquea.",
        found: "Anotado. Ahora haz clic otra vez en el muro para bajarlo.",
        foundHint: "Haz clic en el muro rojo para bajarlo y poder saltarlo.",
        retest: "Arreglado. Vuelve a probar…",
        fixed: "¡Funciona! Nuevo nivel, nueva prueba.",
        complete: "¡Playtest completo! Has encontrado y arreglado todos los atascos.",
        score: "Arreglados",
        reward: "Playtest superado: +3 monedas",
        names: { wall: "Muro", gap: "Salto", boss: "Jefe" },
        gap: {
          find: "Observa al cubo: va a intentar saltar un hueco.",
          stuck: "¡Se cae! El salto no llega. Haz clic en el hueco para anotar el problema.",
          miss: "Haz clic sobre el hueco, ahí es donde cae.",
          found: "Anotado. Ahora haz clic otra vez en el hueco para estrecharlo.",
          foundHint: "Haz clic en el hueco para estrecharlo y que el salto llegue.",
          retest: "Arreglado. Vuelve a probar…"
        },
        boss: {
          find: "Observa al cubo: se va a enfrentar al jefe.",
          stuck: "¡El jefe lo derrota! Haz clic en el jefe para anotar el problema.",
          miss: "Haz clic sobre el jefe, es lo que lo derrota.",
          found: "Anotado. Haz clic otra vez en el jefe para bajarle la vida y frenar su ataque.",
          foundHint: "Haz clic en el jefe para bajarle la vida y frenar su ataque.",
          retest: "Jefe ajustado. Vuelve a probar…"
        }
      },
      p5: {
        tension: "TENSIÓN →", clear: "Limpiar",
        empty: "Coloca primero el Inicio del nivel.",
        noStart: "Falta el Inicio: marca dónde empieza el jugador.",
        noBoss: "Falta el Jefe: es el final del recorrido.",
        order: "El Jefe debe ir a la derecha del Inicio.",
        ok: "¡Nivel listo! Añade Checkpoints y mira cómo cambia la curva."
      }
    },
    en: {
      mode: "Edit mode", modeTitle: "Turn edit mode on or off (E key)",
      pause: "Pause animation", play: "Play animation", restart: "Restart animation",
      reset: "Reset this window's changes", lockedPlay: "Leave edit mode to play the animation",
      hints: [
        "Click an answer to pick it.",
        "Click to place or erase blocks (ground too). The cube tests it on its own.",
        "Watch the player and note where they get stuck; then fix it and retest.",
        "Drag the slider: can the cube clear the gap?",
        "Pick a piece and click the plan. Drag to move it; click a piece to delete it.",
        "Click “Yes” or “No” to follow that branch."
      ],
      pieces: { start: "Start", check: "Checkpoint", boss: "Boss" },
      p3: {
        find: "Watch the cube: it's going to get stuck on something.",
        stuck: "Stuck! Click the red wall to note the problem.",
        wait: "Hold on: the cube is still running.",
        miss: "Click the red wall, that's what blocks it.",
        found: "Noted. Now click the wall again to lower it.",
        foundHint: "Click the red wall to lower it so it can be jumped.",
        retest: "Fixed. Retesting…",
        fixed: "It works! New level, new test.",
        complete: "Playtest complete! You found and fixed every blocker.",
        score: "Fixed",
        reward: "Playtest cleared: +3 coins",
        names: { wall: "Wall", gap: "Jump", boss: "Boss" },
        gap: {
          find: "Watch the cube: it's going to try to jump a gap.",
          stuck: "It falls! The jump doesn't reach. Click the gap to note the problem.",
          miss: "Click the gap, that's where it falls.",
          found: "Noted. Now click the gap again to narrow it.",
          foundHint: "Click the gap to narrow it so the jump reaches.",
          retest: "Fixed. Retesting…"
        },
        boss: {
          find: "Watch the cube: it's about to face the boss.",
          stuck: "The boss defeats it! Click the boss to note the problem.",
          miss: "Click the boss, that's what defeats it.",
          found: "Noted. Click the boss again to lower its health and slow its attack.",
          foundHint: "Click the boss to lower its health and slow its attack.",
          retest: "Boss tuned. Retesting…"
        }
      },
      p5: {
        tension: "TENSION →", clear: "Clear",
        empty: "Place the level Start first.",
        noStart: "Start is missing: mark where the player begins.",
        noBoss: "Boss is missing: it's the end of the route.",
        order: "The Boss must be to the right of the Start.",
        ok: "Level ready! Add Checkpoints and watch the curve change."
      }
    }
  };
  function T() { return TXT[document.documentElement.lang === "en" ? "en" : "es"]; }
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function ptOf(svg, ev) {
    var p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
    var m = svg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function box(n) { return { x: +n.getAttribute("x"), y: +n.getAttribute("y"), w: +n.getAttribute("width"), h: +n.getAttribute("height") }; }
  function inBox(p, b) { return p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h; }
  var MONO = "IBM Plex Mono, monospace";

  var wins = [].slice.call(section.querySelectorAll(".ed-win"));
  var editing = false, mods = [], hintEls = [];

  /* sello CLEAR / FAIL */
  function makeStamp(svg, x, y) {
    var g = el("g", { class: "ed-stamp", transform: "translate(" + x + "," + y + ") rotate(-6)" }, svg);
    var inner = el("g", { class: "ed-keep ed-stamp-in" }, g);
    var r = el("rect", { x: -30, y: -12, width: 60, height: 17, rx: 2, fill: "#111820", "fill-opacity": ".88", "stroke-width": "1.5" }, inner);
    var t = el("text", { "text-anchor": "middle", y: 1, "font-size": 11, "font-weight": 700, "font-family": MONO, "letter-spacing": 1 }, inner);
    g.style.display = "none";
    return {
      node: g,
      show: function (ok) {
        var c = ok ? "#b8d96b" : "#ff6b4a";
        t.textContent = ok ? "CLEAR" : "FAIL"; t.setAttribute("fill", c); r.setAttribute("stroke", c);
        g.style.display = "";
        inner.style.animation = "none"; void inner.getBoundingClientRect(); inner.style.animation = "";
      },
      hide: function () { g.style.display = "none"; }
    };
  }

  /* mini simulación: un cubo que corre, salta huecos y paredes bajas, y reaparece */
  function makeSim(o) {
    var S = 16, SPEED = 70, G = 600, JV = -190;
    var cube = el("rect", { class: "ed-cube", width: S, height: S, fill: o.color, stroke: "#111820", "stroke-width": 1 }, o.svg);
    var st = { x: 0, y: 0, vy: 0, ground: false, maxX: 0, stuck: 0, wait: 0, run: false };
    function hit(x, y, list) {
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        if (x < s.x + s.w && x + S > s.x && y < s.y + s.h && y + S > s.y + 0.001) return s;
      }
      return null;
    }
    function solidAt(px, py, list) {
      for (var i = 0; i < list.length; i++) {
        var s = list[i];
        if (px >= s.x && px < s.x + s.w && py >= s.y && py < s.y + s.h) return true;
      }
      return false;
    }
    function draw() { cube.setAttribute("x", st.x.toFixed(2)); cube.setAttribute("y", st.y.toFixed(2)); }
    function finish(ok) { st.run = false; st.wait = 1.1; o.onEnd(ok); }
    var api = {
      node: cube,
      reset: function () {
        st.x = o.spawn.x; st.y = o.spawn.y; st.vy = 0; st.ground = false; st.maxX = st.x; st.stuck = 0; st.run = true;
        cube.style.display = ""; draw(); o.onStart();
      },
      step: function (dt) {
        if (!st.run) { if (o.hold && o.hold()) return; st.wait -= dt; if (st.wait <= 0) api.reset(); return; }
        var list = o.getSolids(), blocked = false;
        var nx = st.x + SPEED * dt;
        if (hit(nx, st.y, list)) blocked = true; else st.x = nx;
        if (st.ground && (blocked || !solidAt(st.x + S + 2, st.y + S + 2, list))) { st.vy = JV; st.ground = false; }
        st.vy += G * dt;
        var ny = st.y + st.vy * dt, s = hit(st.x, ny, list);
        if (s) {
          if (st.vy > 0) { st.y = s.y - S; st.ground = true; } else { st.y = s.y + s.h; st.ground = false; }
          st.vy = 0;
        } else { st.y = ny; st.ground = false; }
        if (st.x > st.maxX + 0.5) { st.maxX = st.x; st.stuck = 0; } else st.stuck += dt;
        draw();
        if (st.y > o.vbH + 12 || st.stuck > 1.6) return finish(false);
        if (st.ground && st.x >= o.goalX) return finish(true);
      }
    };
    return api;
  }

  /* 1 · Pregunta: elegir una respuesta */
  function mod1(win, svg) {
    var chips = [].slice.call(svg.querySelectorAll(".q-chip")), qmark = svg.querySelector(".q-mark");
    var orig = chips.map(function (c) { return { fill: c.getAttribute("fill"), stroke: c.getAttribute("stroke") }; });
    var sel = -1, mark = null;
    function paint() {
      chips.forEach(function (c, i) {
        var on = i === sel;
        c.setAttribute("fill", on ? "rgba(184,217,107,.22)" : orig[i].fill);
        c.setAttribute("stroke", on ? "#b8d96b" : orig[i].stroke);
      });
      if (mark) { mark.remove(); mark = null; }
      if (sel >= 0) {
        var b = box(chips[sel]);
        mark = el("text", { class: "ed-keep ed-pop", x: b.x + b.w / 2, y: b.y + 18, "text-anchor": "middle", "font-size": 14, "font-weight": 700, fill: "#b8d96b", "font-family": MONO }, svg);
        mark.textContent = "✓";
      }
      if (qmark) { qmark.textContent = sel >= 0 ? "✓" : "?"; qmark.setAttribute("fill", sel >= 0 ? "#b8d96b" : "#ff6b4a"); }
    }
    svg.addEventListener("click", function (e) {
      if (!editing) return;
      var p = ptOf(svg, e), i = -1;
      chips.forEach(function (c, k) { if (inBox(p, box(c))) i = k; });
      if (i < 0) return;
      sel = sel === i ? -1 : i; paint();
    });
    function reset() { sel = -1; paint(); }
    return { enter: reset, exit: reset, reset: reset };
  }

  /* 2 · Prototipo: bloques y suelo editables; el cubo los prueba */
  function mod2(win, svg) {
    var OY = 8, COLS = 15, GROUND = 5, PROT = 3;
    var cells = {}, ghost = null, stamp = null, sim = null;
    var start = [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 13];
    function solids() {
      var out = [];
      for (var k in cells) out.push({ x: cells[k].cx * CELL, y: OY + cells[k].cy * CELL, w: CELL, h: CELL });
      return out;
    }
    function put(cx, cy, pop) {
      var r = el("rect", { class: "ed-keep" + (pop ? " ed-pop" : ""), x: cx * CELL + 0.5, y: OY + cy * CELL + 0.5, width: CELL - 1, height: CELL - 1, fill: cy < GROUND ? "#d9d6cf" : "#b9b8b3" });
      svg.insertBefore(r, ghost);
      cells[cx + "," + cy] = { cx: cx, cy: cy, el: r };
    }
    function clearCells() { for (var k in cells) cells[k].el.remove(); cells = {}; }
    function build() { clearCells(); start.forEach(function (cx) { put(cx, GROUND, false); }); }
    function cellOf(e) {
      var p = ptOf(svg, e), cx = Math.floor(p.x / CELL), cy = Math.floor((p.y - OY) / CELL);
      if (cx < PROT || cx >= COLS || cy < 0 || cy > GROUND) return null;
      return { cx: cx, cy: cy };
    }
    svg.addEventListener("pointermove", function (e) {
      if (!editing || !ghost) return;
      var c = cellOf(e);
      if (!c) { ghost.style.display = "none"; return; }
      ghost.setAttribute("x", c.cx * CELL + 0.5); ghost.setAttribute("y", OY + c.cy * CELL + 0.5);
      ghost.style.display = "";
    });
    svg.addEventListener("pointerleave", function () { if (ghost) ghost.style.display = "none"; });
    svg.addEventListener("click", function (e) {
      if (!editing || !sim) return;
      var c = cellOf(e); if (!c) return;
      var k = c.cx + "," + c.cy;
      if (cells[k]) { cells[k].el.remove(); delete cells[k]; } else put(c.cx, c.cy, true);
      sim.reset();
    });
    return {
      enter: function () {
        ghost = el("rect", { class: "ed-ghost", width: CELL - 1, height: CELL - 1, fill: "none", stroke: "#b8d96b", "stroke-dasharray": "3 2" }, svg);
        ghost.style.display = "none";
        stamp = makeStamp(svg, 150, 28);
        sim = makeSim({ svg: svg, color: "#ff6b4a", spawn: { x: 26, y: 92 }, goalX: 248, vbH: 150, getSolids: solids,
          onStart: function () { stamp.hide(); }, onEnd: function (ok) { stamp.show(ok); } });
        build(); sim.reset();
      },
      exit: function () {
        clearCells();
        [ghost, stamp && stamp.node, sim && sim.node].forEach(function (n) { if (n) n.remove(); });
        ghost = stamp = sim = null;
      },
      reset: function () { build(); if (sim) sim.reset(); },
      tick: function (dt) { if (sim) sim.step(dt); }
    };
  }

  /* 3 · Playtest: tres situaciones (muro, salto que no llega, jefe difícil). El cubo falla, tú lo anotas, lo arreglas y repites la prueba */
  function mod3(win, svg, inEl) {
    var GY = 108, WW = 18, GOAL = 250, NEED = 3, SCENES = ["wall", "gap", "boss"], HEARTS = 3;
    var wallEl = null, gA = null, gB = null, bossEl = null, bossBg = null, bossFill = null, hearts = [], parts = [];
    var stamp = null, sim = null, simOpts = null, pupil = null, status = null, pin = null;
    var hidden = [], state = "run", msg = "find", fixedCount = 0, rewarded = false, scene = "wall";
    var wallX = 150, wallH = 40, gapX = 120, gapW = 60;
    var bossX = 236, bossS = 34, bossMax = 100, bossHp = 100, bossCd = 0.9, fight = null, shots = [];
    function put(n, x, y, w, h) { n.setAttribute("x", x); n.setAttribute("y", y); n.setAttribute("width", w); n.setAttribute("height", h); }
    function showN(n, on) { n.style.display = on ? "" : "none"; }
    function mk(attrs) { var n = el("rect", attrs, svg); n.classList.add("ed-keep"); parts.push(n); return n; }
    function solids() {
      if (scene === "gap") return [{ x: 20, y: GY, w: gapX - 20, h: 22 }, { x: gapX + gapW, y: GY, w: 280 - gapX - gapW, h: 22 }];
      var l = [{ x: 20, y: GY, w: 260, h: 22 }];
      if (scene === "wall") l.push({ x: wallX, y: GY - wallH, w: WW, h: wallH });
      return l;
    }
    function drawScene() {
      var gap = scene === "gap", boss = scene === "boss";
      if (gap) { put(gA, 20, GY, gapX - 20, 22); put(gB, gapX + gapW, GY, 280 - gapX - gapW, 22); } else put(gA, 20, GY, 260, 22);
      showN(gB, gap); showN(wallEl, scene === "wall");
      if (scene === "wall") put(wallEl, wallX, GY - wallH, WW, wallH);
      showN(bossEl, boss); showN(bossBg, boss); showN(bossFill, boss);
      if (boss) {
        put(bossEl, bossX, GY - bossS, bossS, bossS);
        put(bossBg, bossX, GY - bossS - 10, bossS, 4);
        put(bossFill, bossX, GY - bossS - 10, bossS * Math.max(bossHp, 0) / bossMax, 4);
      }
      hearts.forEach(function (h, i) { showN(h, boss); h.setAttribute("fill", fight && i >= fight.hp ? "#33414d" : "#b8d96b"); });
    }
    function pinXY() {
      if (scene === "gap") return [gapX + gapW / 2, GY - 24];
      if (scene === "boss") return [bossX - 14, GY - bossS + 2];
      return [wallX + WW / 2, GY - wallH - 22];
    }
    function near(p, m) {
      var b = scene === "gap" ? { x: gapX, y: GY - 18, w: gapW, h: 40 } : scene === "boss" ? { x: bossX, y: GY - bossS, w: bossS, h: bossS } : { x: wallX, y: GY - wallH, w: WW, h: wallH };
      return p.x >= b.x - m && p.x <= b.x + b.w + m && p.y >= b.y - m - 12 && p.y <= b.y + b.h + 4;
    }
    function clearPin() { if (pin) { pin.remove(); pin = null; } }
    function addPin() {
      clearPin();
      var xy = pinXY();
      pin = el("g", { class: "ed-pin is-hit", transform: "translate(" + xy[0] + "," + xy[1] + ")" }, svg);
      var i = el("g", { class: "ed-keep ed-pop" }, pin);
      el("circle", { class: "ed-heat", r: 19, fill: "#b8d96b", "fill-opacity": ".16" }, i);
      el("circle", { class: "ed-core", r: 7, fill: "#b8d96b", stroke: "#111820", "stroke-width": 1.5 }, i);
      var t = el("text", { y: 3.5, "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: "#111820", "font-family": "Space Grotesk, sans-serif" }, i);
      t.textContent = "!";
    }
    /* jefe: combate sencillo (el cubo dispara, el jefe dispara) */
    function endFight() { shots.forEach(function (q) { q.n.remove(); }); shots = []; fight = null; }
    function startFight() { endFight(); fight = { hp: HEARTS, pT: 0, bT: 0, done: false }; bossHp = bossMax; drawScene(); }
    function spawn(x0, x1, y, color, atBoss) {
      var n = el("rect", { class: "ed-keep", x: x0, y: y, width: 6, height: 6, fill: color }, svg);
      shots.push({ n: n, x: x0, to: x1, dir: x1 > x0 ? 1 : -1, boss: atBoss });
    }
    function stepFight(dt) {
      var cx = +sim.node.getAttribute("x") || 176;
      fight.pT += dt; fight.bT += dt;
      if (fight.pT >= 0.6) { fight.pT -= 0.6; spawn(cx + 16, bossX, GY - 12, "#b8d96b", true); }
      if (fight.bT >= bossCd) { fight.bT -= bossCd; spawn(bossX - 6, cx + 16, GY - 8, "#ff6b4a", false); }
      for (var i = shots.length - 1; i >= 0; i--) {
        var q = shots[i]; q.x += q.dir * 170 * dt; q.n.setAttribute("x", q.x.toFixed(1));
        if ((q.dir > 0 && q.x >= q.to) || (q.dir < 0 && q.x <= q.to)) {
          q.n.remove(); shots.splice(i, 1);
          if (q.boss) bossHp -= 10; else fight.hp--;
        }
      }
      drawScene();
      if (bossHp <= 0 || fight.hp <= 0) {
        var win = bossHp <= 0;
        shots.forEach(function (q) { q.n.remove(); }); shots = []; fight.done = true;
        settle(win);
      }
    }
    function applyFix() {
      if (scene === "gap") gapW = 26;
      else if (scene === "boss") { bossS = 26; bossMax = 60; bossHp = 60; bossCd = 2.0; }
      else wallH = 20;
      drawScene();
    }
    function newLevel() {
      scene = SCENES[fixedCount % SCENES.length];
      wallX = 100 + Math.round(Math.random() * 89); wallH = 38 + Math.round(Math.random() * 9);
      gapX = 110 + Math.round(Math.random() * 30); gapW = 56 + Math.round(Math.random() * 10);
      bossS = 34; bossMax = 100; bossHp = 100; bossCd = 0.9;
      if (simOpts) simOpts.goalX = scene === "boss" ? 176 : GOAL;
      endFight(); drawScene(); clearPin(); state = "run"; msg = "find";
    }
    function render() {
      if (!status) return;
      var t = T(), p = t.p3, own = p[scene] || {};
      var line = own[msg] != null ? own[msg] : p[msg];
      status.textContent = p.names[scene] + ": " + line + " · " + p.score + " " + fixedCount + "/" + NEED;
      status.classList.toggle("is-ok", msg === "fixed" || msg === "complete");
    }
    function reward() {
      if (rewarded) return;
      rewarded = true;
      if (window.pmmGame) {
        window.pmmGame.claim("playtest", 3, T().p3.reward);
        if (window.pmmGame.confetti) window.pmmGame.confetti(24);
      }
    }
    function settle(ok) {
      if (!ok) {
        if (state === "run") { state = "stuck"; msg = "stuck"; }
        else if (state === "fixed") { state = "found"; msg = "foundHint"; }
        stamp.show(false);
      } else if (state === "fixed") {
        state = "done"; fixedCount++; stamp.show(true);
        msg = fixedCount >= NEED ? "complete" : "fixed";
        if (fixedCount >= NEED) reward();
      } else stamp.show(true);
      render();
    }
    svg.addEventListener("click", function (e) {
      if (!editing || !sim) return;
      var p = ptOf(svg, e);
      if (state === "run" || state === "fixed") { msg = state === "run" ? "wait" : "retest"; return render(); }
      if (state === "stuck") {
        if (near(p, 30)) { addPin(); state = "found"; msg = "found"; } else msg = "miss";
        render();
      } else if (state === "found") {
        if (near(p, 16)) { applyFix(); clearPin(); state = "fixed"; msg = "retest"; render(); sim.reset(); }
        else { msg = "foundHint"; render(); }
      }
    });
    return {
      enter: function () {
        [].forEach.call(svg.querySelectorAll('rect[x="190"][y="84"], rect[x="20"][y="108"][width="260"], .t-run, .t-warn'), function (n) {
          hidden.push({ n: n, d: n.style.display }); n.style.display = "none";
        });
        pupil = svg.querySelector(".t-pupil");
        parts = []; hearts = [];
        gA = mk({ fill: "#b9b8b3" }); gB = mk({ fill: "#b9b8b3" });
        wallEl = mk({ fill: "#ff6b4a" });
        bossEl = mk({ fill: "#ff6b4a", stroke: "#111820", "stroke-width": 1 });
        bossBg = mk({ fill: "#33414d" }); bossFill = mk({ fill: "#ff6b4a" });
        for (var h = 0; h < HEARTS; h++) hearts.push(mk({ x: 26 + h * 14, y: 66, width: 10, height: 6, fill: "#b8d96b" }));
        stamp = makeStamp(svg, 150, 64);
        status = document.createElement("p"); status.className = "ed-status"; inEl.appendChild(status);
        fixedCount = 0; rewarded = false;
        simOpts = { svg: svg, color: "#b8d96b", spawn: { x: 26, y: 92 }, goalX: GOAL, vbH: 150, getSolids: solids,
          hold: function () { return state === "stuck" || state === "found" || !!(fight && !fight.done); },
          onStart: function () {
            stamp.hide(); endFight(); bossHp = bossMax; drawScene();
            if (state === "done") { newLevel(); render(); }
          },
          onEnd: function (ok) {
            if (ok && scene === "boss") { startFight(); return; }
            settle(ok);
          } };
        newLevel();
        sim = makeSim(simOpts);
        render(); sim.reset();
      },
      exit: function () {
        hidden.forEach(function (h) { h.n.style.display = h.d; }); hidden = [];
        endFight(); clearPin();
        parts.forEach(function (n) { n.remove(); }); parts = []; hearts = [];
        [stamp && stamp.node, sim && sim.node, status].forEach(function (n) { if (n) n.remove(); });
        if (pupil) pupil.setAttribute("cx", 50);
        wallEl = gA = gB = bossEl = bossBg = bossFill = stamp = sim = simOpts = status = pupil = null;
      },
      reset: function () {
        if (!sim) return;
        fixedCount = 0; newLevel(); render(); sim.reset();
      },
      tick: function (dt) {
        if (!sim) return;
        sim.step(dt);
        if (fight && !fight.done) stepFight(dt);
        if (pupil) {
          var cx = +sim.node.getAttribute("x") || 26;
          pupil.setAttribute("cx", (50 + clamp((cx - 150) / 150, -1, 1) * 9).toFixed(1));
        }
      },
      relabel: render
    };
  }

  /* 4 · Ajuste: arrastrar el deslizador cambia el hueco; el cubo lo prueba y sella CLEAR / FAIL */
  function mod4(win, svg) {
    var knob = svg.querySelector(".a-knob"), right = svg.querySelector(".a-right");
    var cubeOrig = svg.querySelector('rect[x="40"][y="88"]');
    if (cubeOrig) cubeOrig.classList.add("ed-orig-cube");
    var o = { cx: knob.getAttribute("cx"), x: right.getAttribute("x"), w: right.getAttribute("width") };
    var sim = null, stamp = null, label = null, rx = 170, dragging = false, T0 = 0.78;
    function setT(t) {
      t = clamp(t, 0, 1);
      var gap = 100 - 90 * t; rx = 130 + gap;
      knob.setAttribute("cx", 50 + 200 * t);
      right.setAttribute("x", rx); right.setAttribute("width", 280 - rx);
      if (label) label.textContent = "gap " + Math.round(gap);
      if (sim) sim.reset();
    }
    svg.addEventListener("pointerdown", function (e) {
      if (!editing) return;
      var p = ptOf(svg, e);
      if (p.y > 64) return;
      dragging = true; svg.setPointerCapture(e.pointerId);
      setT((p.x - 50) / 200);
    });
    svg.addEventListener("pointermove", function (e) { if (dragging) setT((ptOf(svg, e).x - 50) / 200); });
    function stop() { dragging = false; }
    svg.addEventListener("pointerup", stop); svg.addEventListener("pointercancel", stop);
    return {
      enter: function () {
        label = el("text", { x: 260, y: 62, "text-anchor": "end", "font-size": 9, fill: "#b8d96b", "font-family": MONO }, svg);
        stamp = makeStamp(svg, 232, 84);
        sim = makeSim({ svg: svg, color: "#b8d96b", spawn: { x: 40, y: 88 }, goalX: 250, vbH: 150,
          getSolids: function () { return [{ x: 20, y: 104, w: 110, h: 22 }, { x: rx, y: 104, w: 280 - rx, h: 22 }]; },
          onStart: function () { stamp.hide(); }, onEnd: function (ok) { stamp.show(ok); } });
        setT(T0);
      },
      exit: function () {
        dragging = false;
        [label, stamp && stamp.node, sim && sim.node].forEach(function (n) { if (n) n.remove(); });
        label = stamp = sim = null;
        knob.setAttribute("cx", o.cx); right.setAttribute("x", o.x); right.setAttribute("width", o.w);
      },
      reset: function () { setT(T0); },
      tick: function (dt) { if (sim) sim.step(dt); }
    };
  }

  /* 5 · Diseño de niveles: blockout sencillo (inicio, checkpoint, jefe); la curva de ritmo reacciona */
  function mod5(win, svg, inEl) {
    var curve = svg.querySelector("polyline.draw");
    var origPts = curve.getAttribute("points");
    var base = origPts.trim().split(/\s+/).map(function (s) { var a = s.split(","); return [+a[0], +a[1]]; });
    var xs = []; for (var x = 10; x <= 370; x += 10) xs.push(x);
    var KINDS = ["start", "check", "boss"];
    var AMP = { start: 8, check: 14, boss: -34 };
    var LIMIT = { start: 1, check: 3, boss: 1 };
    var items = [], piece = "start", tween = 0, drag = null, route = null, axis = null, statusKey = "empty";
    function baseY(x) {
      for (var i = 0; i < base.length - 1; i++) {
        if (x >= base[i][0] && x <= base[i + 1][0]) return base[i][1] + (base[i + 1][1] - base[i][1]) * (x - base[i][0]) / (base[i + 1][0] - base[i][0]);
      }
      return base[base.length - 1][1];
    }
    function target() {
      return xs.map(function (x) {
        var y = baseY(x);
        items.forEach(function (it) { var d = (x - it.x) / 26; y += AMP[it.kind] * Math.exp(-d * d); });
        return clamp(y, 172, 226);
      });
    }
    var cur = xs.map(baseY);
    var grad = svg.querySelector("#ed-diff-grad");
    function setHeat(a) { /* verde -> rojo según la altura de la curva: la zona pico se vuelve roja */
      if (!grad) return;
      var lo = Math.min.apply(null, a), hi = Math.max.apply(null, a), rg = Math.max(hi - lo, 12), out = "";
      a.forEach(function (y, i) {
        var k = clamp(1 - (y - lo) / rg / 0.4, 0, 1); k = k * k * (3 - 2 * k);
        var c = [0, 1, 2].map(function (j) { var g = [184, 217, 107][j], r = [255, 107, 74][j]; return Math.round(g + (r - g) * k); });
        out += '<stop offset="' + ((xs[i] - 10) / 360).toFixed(4) + '" stop-color="rgb(' + c.join(",") + ')"/>';
      });
      grad.innerHTML = out;
    }
    setHeat(cur);
    function write(a) { setHeat(a); curve.setAttribute("points", xs.map(function (x, i) { return x + "," + a[i].toFixed(1); }).join(" ")); }
    function animate() {
      cancelAnimationFrame(tween);
      var from = cur.slice(), to = target(), t0 = null;
      function f(ts) {
        if (t0 === null) t0 = ts;
        var k = clamp((ts - t0) / 280, 0, 1); k = 1 - Math.pow(1 - k, 3);
        cur = from.map(function (v, i) { return v + (to[i] - v) * k; }); write(cur);
        if (k < 1) tween = requestAnimationFrame(f);
      }
      tween = requestAnimationFrame(f);
    }

    var pal = document.createElement("div");
    pal.className = "ed-palette"; pal.setAttribute("role", "group");
    pal.innerHTML = KINDS.map(function (k) {
      return '<button type="button" class="ed-piece" data-piece="' + k + '" aria-pressed="' + (k === piece) + '"><i></i><span></span></button>';
    }).join("") + '<button type="button" class="ed-piece ed-action" data-action="clear"><span></span></button>';
    var status = document.createElement("p"); status.className = "ed-status";
    inEl.appendChild(pal); inEl.appendChild(status);
    pal.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-action") === "clear") { wipe(); animate(); refresh(); return; }
      piece = b.getAttribute("data-piece");
      [].forEach.call(pal.querySelectorAll("[data-piece]"), function (n) { n.setAttribute("aria-pressed", String(n === b)); });
    });

    function xOf(k) { for (var i = 0; i < items.length; i++) if (items[i].kind === k) return items[i].x; return null; }
    function analyse() {
      if (!items.length) return "empty";
      var s = xOf("start"), b = xOf("boss");
      if (s === null) return "noStart";
      if (b === null) return "noBoss";
      if (b <= s) return "order";
      return "ok";
    }
    function labelsNow() {
      var t = T();
      [].forEach.call(inEl.querySelectorAll("[data-action]"), function (b) { b.querySelector("span").textContent = t.p5[b.getAttribute("data-action")]; });
      items.forEach(function (it) { it.label.textContent = t.pieces[it.kind]; });
      if (axis) axis.textContent = t.p5.tension;
      status.textContent = t.p5[statusKey];
    }
    function drawRoute() {
      if (route) { route.remove(); route = null; }
      var pts = items.slice().sort(function (a, b) { return a.x - b.x; });
      if (pts.length < 2) return;
      route = el("polyline", { class: "ed-keep", points: pts.map(function (it) { return it.x + "," + it.y; }).join(" "), fill: "none", stroke: "#f7f3ec", "stroke-width": 1.2, "stroke-dasharray": "4 3", "stroke-opacity": ".7" }, svg);
      svg.insertBefore(route, svg.querySelector(".ed-pc"));
    }
    function refresh() {
      statusKey = analyse();
      status.classList.toggle("is-ok", statusKey === "ok");
      drawRoute(); labelsNow();
    }
    function draw(kind, x, y) {
      var g = el("g", { class: "ed-pc", transform: "translate(" + x + "," + y + ")" }, svg);
      var i = el("g", { class: "ed-keep ed-pop" }, g);
      var lab = el("text", { y: -12, "text-anchor": "middle", "font-size": 8, "font-family": MONO, fill: "#f7f3ec" }, i);
      if (kind === "boss") el("rect", { x: -7, y: -7, width: 14, height: 14, fill: "#ff6b4a", stroke: "#b8d96b", "stroke-width": 1.5 }, i);
      else el("circle", { r: 7, fill: kind === "start" ? "#b8d96b" : "#ff6b4a", stroke: kind === "start" ? "#f7f3ec" : "#b8d96b", "stroke-width": 1.5 }, i);
      return { g: g, label: lab };
    }
    function place(kind, x, y) {
      var n = 0, pc = draw(kind, x, y);
      items.push({ kind: kind, x: x, y: y, g: pc.g, label: pc.label });
      items.forEach(function (it) { if (it.kind === kind) n++; });
      if (n > LIMIT[kind]) {
        for (var i = 0; i < items.length; i++) if (items[i].kind === kind) { items.splice(i, 1)[0].g.remove(); break; }
      }
      animate(); refresh();
    }
    function wipe() { items.forEach(function (it) { it.g.remove(); }); items = []; }
    function hitItem(p) {
      for (var i = 0; i < items.length; i++) {
        if (Math.sqrt(Math.pow(p.x - items[i].x, 2) + Math.pow(p.y - items[i].y, 2)) < 12) return items[i];
      }
      return null;
    }
    function snap(p) { return { x: clamp(Math.round(p.x / 10) * 10, 10, 370), y: clamp(Math.round(p.y / 10) * 10, 14, 170) }; }

    svg.addEventListener("pointerdown", function (e) {
      if (!editing) return;
      var p = ptOf(svg, e), it = hitItem(p);
      if (it) { drag = { it: it, sx: p.x, sy: p.y, moved: false }; try { svg.setPointerCapture(e.pointerId); } catch (x) {} return; }
      if (p.y < 8 || p.y > 172) return;
      var s = snap(p); place(piece, s.x, s.y);
    });
    svg.addEventListener("pointermove", function (e) {
      if (!editing || !drag) return;
      var p = ptOf(svg, e);
      if (!drag.moved && Math.sqrt(Math.pow(p.x - drag.sx, 2) + Math.pow(p.y - drag.sy, 2)) < 4) return;
      drag.moved = true;
      var s = snap(p); drag.it.x = s.x; drag.it.y = s.y;
      drag.it.g.setAttribute("transform", "translate(" + s.x + "," + s.y + ")");
      cancelAnimationFrame(tween); cur = target(); write(cur); drawRoute();
    });
    svg.addEventListener("pointerup", function () {
      if (!editing || !drag) return;
      var d = drag; drag = null;
      if (!d.moved) { var i = items.indexOf(d.it); if (i >= 0) items.splice(i, 1)[0].g.remove(); animate(); }
      refresh();
    });
    svg.addEventListener("pointercancel", function () { drag = null; });

    function restore() { cancelAnimationFrame(tween); cur = xs.map(baseY); curve.setAttribute("points", origPts); setHeat(cur); }
    return {
      enter: function () {
        axis = el("text", { class: "ed-keep", x: 10, y: 184, "font-size": 8, "font-family": MONO, fill: "#b9b8b3" }, svg);
        wipe(); restore(); refresh();
      },
      exit: function () {
        wipe(); drag = null; restore();
        if (route) { route.remove(); route = null; }
        if (axis) { axis.remove(); axis = null; }
        statusKey = "empty"; refresh();
      },
      reset: function () { wipe(); animate(); refresh(); },
      relabel: labelsNow
    };
  }

  /* 6 · Narrativa: elegir una rama ilumina su camino */
  function mod6(win, svg) {
    var rects = [].slice.call(svg.querySelectorAll("rect.g-node"));
    var texts = rects.map(function (r) { return r.nextElementSibling; });
    /* cada rama es una cadena: bloque -> tramo -> bloque ... (índices de rects y trazo de cada tramo) */
    var CHAIN = {
      yes: { nodes: [0, 1, 2, 4], links: ["M190 40V70", "M190 100L95 135", "M95 165V200"], off: [3, 5] },
      no: { nodes: [0, 1, 3, 5], links: ["M190 40V70", "M190 100L285 135", "M285 165V200"], off: [2, 4] }
    };
    var choice = null, extras = [];
    var NODE_MS = 420, LINK_MS = 300;
    function clearExtras() { extras.forEach(function (n) { n.remove(); }); extras = []; }
    function paint() {
      clearExtras();
      rects.forEach(function (r, i) { r.classList.remove("ed-node-on", "ed-node-dim"); if (texts[i]) texts[i].classList.remove("ed-node-dim"); });
      if (!choice) return;
      var c = CHAIN[choice], t = 0;
      c.off.forEach(function (i) { rects[i].classList.add("ed-node-dim"); if (texts[i]) texts[i].classList.add("ed-node-dim"); });
      c.nodes.forEach(function (ni, k) {
        var b = box(rects[ni]);
        var ov = el("rect", { class: "ed-keep ed-node-fill", x: b.x + 1, y: b.y + 1, width: b.w - 2, height: b.h - 2, rx: 3, fill: "#34502a" });
        ov.style.animationDelay = t + "ms";
        rects[ni].parentNode.insertBefore(ov, rects[ni].nextSibling); /* justo debajo del texto del bloque */
        extras.push(ov); t += NODE_MS;
        if (k < c.links.length) {
          var ln = el("path", { class: "ed-keep ed-route", d: c.links[k], pathLength: 1, fill: "none", stroke: "#b8d96b", "stroke-width": 2.5, "stroke-linecap": "round" }, svg);
          ln.style.animationDuration = LINK_MS + "ms"; ln.style.animationDelay = t + "ms"; ln.style.animationFillMode = "both";
          extras.push(ln); t += LINK_MS;
        }
      });
    }
    svg.addEventListener("click", function (e) {
      if (!editing) return;
      var p = ptOf(svg, e), pick = null;
      if (inBox(p, box(rects[2])) || inBox(p, box(rects[4]))) pick = "yes";
      else if (inBox(p, box(rects[3])) || inBox(p, box(rects[5]))) pick = "no";
      if (!pick) return;
      choice = choice === pick ? null : pick; paint();
    });
    function reset() { choice = null; paint(); }
    return { enter: reset, exit: reset, reset: reset };
  }

  /* interruptor del modo edición (junto al título) */
  var toggle = document.createElement("button");
  toggle.type = "button"; toggle.className = "ed-edit-toggle";
  toggle.setAttribute("role", "switch"); toggle.setAttribute("aria-checked", "false");
  toggle.innerHTML = '<span class="ed-sw" aria-hidden="true"><i></i></span><span class="ed-edit-label"></span><kbd aria-hidden="true">E</kbd>';
  (section.querySelector(".section-heading > div") || section).appendChild(toggle);

  function restart(win) { win.classList.add("is-restarting"); void win.offsetWidth; win.classList.remove("is-restarting"); }

  function syncTools() {
    var t = T();
    wins.forEach(function (w) {
      var b = w.querySelector('[data-act="toggle"]'), r = w.querySelector('[data-act="restart"]');
      if (!b || !r) return;
      var paused = w.classList.contains("is-paused");
      b.setAttribute("data-state", paused ? "play" : "pause"); b.disabled = editing;
      var lab = editing ? t.lockedPlay : (paused ? t.play : t.pause);
      b.title = lab; b.setAttribute("aria-label", lab);
      var rl = editing ? t.reset : t.restart;
      r.title = rl; r.setAttribute("aria-label", rl);
    });
  }
  function labels() {
    var t = T();
    toggle.querySelector(".ed-edit-label").textContent = t.mode; toggle.title = t.modeTitle;
    hintEls.forEach(function (h, i) { h.textContent = t.hints[i] || ""; });
    [].forEach.call(section.querySelectorAll(".ed-piece[data-piece]"), function (b) { b.querySelector("span").textContent = t.pieces[b.getAttribute("data-piece")]; });
    mods.forEach(function (m) { if (m && m.relabel) m.relabel(); });
    syncTools();
  }

  var factories = [mod1, mod2, mod3, mod4, mod5, mod6];
  wins.forEach(function (win, n) {
    var svg = win.querySelector(".ed-win-body svg"), bar = win.querySelector(".ed-win-bar");
    if (!svg || !bar) return;
    win.setAttribute("data-ed", n + 1);
    var vb = svg.viewBox.baseVal, oy = n === 1 ? 8 : 0;

    /* cuadrícula de tiles */
    var pid = "ed-grid-" + n;
    var defs = el("defs", {});
    var pat = el("pattern", { id: pid, width: CELL, height: CELL, y: oy, patternUnits: "userSpaceOnUse" }, defs);
    el("path", { d: "M" + CELL + " 0H0V" + CELL, fill: "none", stroke: "#b8d96b", "stroke-width": "1" }, pat);
    svg.insertBefore(el("rect", { class: "ed-grid", x: vb.x, y: vb.y, width: vb.width, height: vb.height, fill: "url(#" + pid + ")" }), svg.firstChild);
    svg.insertBefore(defs, svg.firstChild);

    /* botones ▶/⏸ y ↻ (sustituyen a los puntos de la barra) */
    var tools = document.createElement("span");
    tools.className = "ed-tools";
    tools.innerHTML = '<button type="button" class="ed-tool" data-act="toggle" data-state="pause"></button><button type="button" class="ed-tool" data-act="restart"></button>';
    var dots = win.querySelector(".ed-dots");
    if (dots) dots.replaceWith(tools); else bar.insertBefore(tools, bar.firstChild);

    /* fila de ayuda que solo aparece en modo edición */
    var row = document.createElement("div");
    row.className = "ed-edit-row";
    row.innerHTML = '<div class="ed-edit-clip"><div class="ed-edit-in"><span class="ed-hint"></span></div></div>';
    svg.insertAdjacentElement("afterend", row);
    hintEls[n] = row.querySelector(".ed-hint");

    var mod = factories[n] ? factories[n](win, svg, row.querySelector(".ed-edit-in")) : null;
    mods[n] = mod;

    tools.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      if (b.getAttribute("data-act") === "toggle") win.classList.toggle("is-paused");
      else if (editing) { if (mod) mod.reset(); }
      else { win.classList.remove("is-paused"); restart(win); }
      syncTools();
    });
  });

  /* bucle de la simulación (solo en modo edición y con la ventana visible) */
  var raf = 0, last = 0;
  function loop(ts) {
    var dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts;
    mods.forEach(function (m, i) {
      if (!m || !m.tick) return;
      var r = wins[i].getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      m.tick(dt);
    });
    raf = requestAnimationFrame(loop);
  }

  function setEditing(on) {
    if (on === editing) return;
    editing = on;
    section.classList.toggle("is-editing", on);
    toggle.setAttribute("aria-checked", String(on));
    wins.forEach(function (w) { if (on) w.classList.remove("is-paused"); });
    mods.forEach(function (m) { if (m) (on ? m.enter : m.exit)(); });
    cancelAnimationFrame(raf); last = 0;
    if (on) raf = requestAnimationFrame(loop);
    syncTools();
  }
  toggle.addEventListener("click", function () { setEditing(!editing); });

  /* selección de ventana al estilo editor */
  function clearSel() { var any = false; wins.forEach(function (w) { if (w.classList.contains("is-selected")) any = true; w.classList.remove("is-selected"); }); return any; }
  section.addEventListener("click", function (e) {
    var win = e.target.closest(".ed-win");
    if (!win || e.target.closest("button")) return;
    if (editing && e.target.closest("svg")) return;
    var was = win.classList.contains("is-selected");
    clearSel();
    if (!was) win.classList.add("is-selected");
  });
  document.addEventListener("click", function (e) { if (!e.target.closest("#process .ed-win")) clearSel(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!clearSel() && editing) setEditing(false); return; }
    if ((e.key === "e" || e.key === "E") && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      var r = section.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight - 80) return;
      setEditing(!editing);
    }
  });

  new MutationObserver(labels).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  labels();
})();
