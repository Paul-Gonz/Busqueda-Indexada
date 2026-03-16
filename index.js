//< Inicializar app
const express = require('express');
const readline = require('readline');
const app = express();
const port = 4321;

app.use(express.json());
//>

//< Datos a trabajar
let index = {}
let findWord = "secreto"
const path = "biblioteca/";
const fs = require('fs');
const books = fs.readdirSync(path)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

for (const book of books) {
    let content = fs.readFileSync(path + book, "utf-8")
    content = content.toLowerCase().replace(/[.,:;!?()*"“”‘’\[\]{}<>\/\\|@#$%^&+=~`-]/g, "").split(" ");

    for (const word of content) {
        if (!index[word]) {
            index[word] = []
        }
        if (!index[word].includes(book)) {
            index[word].push(book)
        }
    }
}

rl.question('¿Qué palabra quieres buscar? ', (findWord) => {
    const cleanWord = findWord.toLowerCase().trim();
    const result = index[cleanWord];

    if (result) {
        console.log(`La palabra "${findWord}" se encuentra en los siguientes libros: ` + result.join(", "))
    } else {
        console.log(`La palabra "${findWord}" no se encuentra en ninguno de los libros.`)
    }

    rl.close();
});

/* Mostrar el índice completo
console.log("Libros disponibles:\n", books + "\n")
console.log("\n\nIndice Completo: \n" + JSON.stringify(index, null, 2));
*/

//>

//< Inicializar servidor
app.listen(port, () => {
    //console.log("\n\nServidor de node escuchando en http://localhost:" + port)
})
//>