//use AutoresLibros;

// Creacion de Colecciones (tablas):
db.createCollection("Generos");
db.createCollection("Autores");
db.createCollection("Libros");
db.createCollection("Usuarios");

// Creacion de Generos:
db.Generos.insertMany([
    { "nombre": "Ficción", "descripcion": "Narrativa que describe eventos y personajes que no corresponden a la realidad, pero que pueden estar inspirados en hechos reales." },
    { "nombre": "No Ficción", "descripcion": "Obras literarias que se basan en hechos reales, investigaciones, biografías y relatos verídicos." },
    { "nombre": "Ciencia Ficción", "descripcion": "Género que imagina futuros avances científicos y tecnológicos, así como sus impactos en la sociedad, el espacio o el tiempo." },
    { "nombre": "Fantasía", "descripcion": "Narrativa que presenta mundos imaginarios con elementos sobrenaturales, como magia, criaturas fantásticas y mundos alternativos." },
    { "nombre": "Misterio", "descripcion": "Obras que giran en torno a resolver enigmas, crímenes o sucesos inexplicables, y cuya trama se desarrolla a través de la investigación." },
    { "nombre": "Romántico", "descripcion": "Historias centradas en relaciones amorosas, explorando el amor, los sentimientos y las complejidades de las relaciones románticas." },
    { "nombre": "Biografía", "descripcion": "Relato de la vida de una persona, escrito por otro autor, generalmente con un enfoque histórico, social o emocional." },
    { "nombre": "Historia", "descripcion": "Género que estudia y narra hechos y eventos pasados de la humanidad, interpretando su relevancia y contexto a lo largo del tiempo." },
    { "nombre": "Terror", "descripcion": "Género literario cuyo objetivo es generar miedo, horror y tensión en el lector a través de situaciones macabras o sobrenaturales." },
    { "nombre": "Autoayuda", "descripcion": "Libros que buscan mejorar la vida del lector proporcionando consejos prácticos sobre bienestar, desarrollo personal y emocional." }
]);

// Creacion de Autores:
db.Autores.insertMany([
    { "nombre": "Gabriel García Márquez", "fecha_nacimiento": ISODate("1927-03-06"), "nacionalidad": "Colombia" },
    { "nombre": "Plinio Apuleyo Mendoza", "fecha_nacimiento": ISODate("1932-01-01"), "nacionalidad": "Colombia" },
    { "nombre": "Mario Vargas Llosa", "fecha_nacimiento": ISODate("1936-03-28"), "nacionalidad": "Perú" },
    { "nombre": "Jorge Luis Borges", "fecha_nacimiento": ISODate("1899-08-24"), "nacionalidad": "Argentina" },
    { "nombre": "Adolfo Bioy Casares", "fecha_nacimiento": ISODate("1914-09-15"), "nacionalidad": "Argentina" },
    { "nombre": "Pablo Neruda", "fecha_nacimiento": ISODate("1904-07-12"), "nacionalidad": "Chile" },
    { "nombre": "Julio Cortázar", "fecha_nacimiento": ISODate("1914-08-26"), "nacionalidad": "Argentina" },
    { "nombre": "Isabel Allende", "fecha_nacimiento": ISODate("1942-08-02"), "nacionalidad": "Chile" },
    { "nombre": "Carlos Fuentes", "fecha_nacimiento": ISODate("1928-11-11"), "nacionalidad": "México" },
    { "nombre": "Octavio Paz", "fecha_nacimiento": ISODate("1914-03-31"), "nacionalidad": "México" },
    { "nombre": "Laura Esquivel", "fecha_nacimiento": ISODate("1950-09-30"), "nacionalidad": "México" },
    { "nombre": "Rubén Darío", "fecha_nacimiento": ISODate("1867-01-18"), "nacionalidad": "Nicaragua" },
    { "nombre": "Mario Benedetti", "fecha_nacimiento": ISODate("1920-09-14"), "nacionalidad": "Uruguay" },
    { "nombre": "Vicente Huidobro", "fecha_nacimiento": ISODate("1893-01-10"), "nacionalidad": "Chile" },
    { "nombre": "Alejo Carpentier", "fecha_nacimiento": ISODate("1904-12-26"), "nacionalidad": "Cuba" },
    { "nombre": "Juan Rulfo", "fecha_nacimiento": ISODate("1917-05-16"), "nacionalidad": "México" },
    { "nombre": "Sor Juana Inés de la Cruz", "fecha_nacimiento": ISODate("1648-11-12"), "nacionalidad": "México" },
    { "nombre": "Horacio Quiroga", "fecha_nacimiento": ISODate("1878-12-31"), "nacionalidad": "Uruguay" },
    { "nombre": "Eduardo Galeano", "fecha_nacimiento": ISODate("1940-09-03"), "nacionalidad": "Uruguay" },
    { "nombre": "María Dueñas", "fecha_nacimiento": ISODate("1960-01-01"), "nacionalidad": "España" },
    { "nombre": "Ricardo Piglia", "fecha_nacimiento": ISODate("1941-12-24"), "nacionalidad": "Argentina" },
    { "nombre": "César Vallejo", "fecha_nacimiento": ISODate("1892-03-16"), "nacionalidad": "Perú" },
    { "nombre": "José María Arguedas", "fecha_nacimiento": ISODate("1911-01-18"), "nacionalidad": "Perú" },
    { "nombre": "Alfredo Bryce Echenique", "fecha_nacimiento": ISODate("1939-02-19"), "nacionalidad": "Perú" },
    { "nombre": "Ricardo Palma", "fecha_nacimiento": ISODate("1833-02-07"), "nacionalidad": "Perú" }
]);

// Creacion de Libros: