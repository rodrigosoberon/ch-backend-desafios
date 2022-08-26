// Definición de clase
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return console.log(`${this.nombre} ${this.apellido}`);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getBookNames() {
    return this.libros.map((libros) => libros.nombre);
  }
}

//Test
const usuario = new Usuario(
  "Juan",
  "Gomez",
  [
    { nombre: "Orgullo y prejuicio", autor: "Jane Austen" },
    { nombre: "Don Quijote de la Mancha", autor: "Miguel de Cervantes" },
  ],
  ["Fido", "Tato", "Lorenzo"]
);

usuario.getFullName();
console.log(usuario.countMascotas() + " mascotas");
usuario.addBook("El retrato de Dorian Gray", "Oscar Wilde");
console.log(usuario.getBookNames());
