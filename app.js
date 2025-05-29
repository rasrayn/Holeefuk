const express = require('express');//importa framework Express.js y permite crear el servidor web facilmente. Permitiendo definir rutas (/admin, /upload) enviar formularios y servir archivos estáticos
const multer = require('multer');//middleware especializado en manejar formularios con archivos, permite recibir y guardar archivos enviados desde formularios HTML
const path = require('path');//ayuda a construir rutas de archivos uniendo carpetas y nombres de archivo de forma segura
const fs = require('fs');// importa file system que permite interactuar con el sistema de archivos.

const app = express();
const PORT = 3000;

//crear una carpeta uploads si no existe
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

//Configurar almacenamiento con Multer

const storage = multer.diskStorage({//aqui le decimos que vamos a usar almacenamiento en disco
    destination: (req, file, cb) => cb(null, 'uploads'),//define carpeta de destino; null no hay error y el uploads es el nombre donde se guardan archivos
    filename: (req, file, cb) =>//define el nombre del archivo guardado
        cb(null, Date.now() + path.extname(file.originalname))//genera un número unico basado en fecha y hora actuarl evitando que se sobreescriban archivos; path.extname recupera la extension original del archivo.
});
const upload = multer({ storage });

//middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: true}));

//Formulario de subida
app.get('/admin', (req, res) => {
    res.send(`
        <h2>Subir imagen o video</h2>
        <form method="POST" action="/upload" enctype="multipart/form-data">
            <label>Archivo:</label><br>
            <input type="file" name="media" required /><br><br>

            <label>Categoría:</label><br>
            <select name="categoria" required>
                <option value="minimalista">Minimalista</option>
                <option value="blackwork">Black Work</option>
                <option value="realismo">Realismo</option>
                <option value="neoold">Neo/Old School</option>
                <option value="japones">Japones</option>
            </select><br><br>

            <button type="submit">Subir</button>
        </form>
    `);
});


//Ruta POST para subir archivo
app.post('/upload', upload.single('media'), (req, res) => {
    if (!req.file) return res.send('Error al subir archivo');

    const fileUrl = `/uploads/${req.file.filename}`;

    //capturamos la categoría
    const categoria = req.body.categoria;

    //guardamos la info en uploads.json
    const jsonPath = path.join(__dirname, 'uploads.json');
    const nuevoArchivo = {
        url: fileUrl,
        tipo: ext,
        categoria: categoria
    };

    let archivos = [];

    if (fs.existsSync(jsonPath)) {
        const datos = fs.readFileSync(jsonPath);
        archivos=JSON.parse(datos);
    }

    archivos.push (nuevoArchivo);
    fs.writeFileSync(jsonPath, JSON.stringify(archivos, null, 2));

    //tipos de archivos
    const videoTypes = ['.mp4', '.webm', '.mov'];
    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    let preview;
    if ( videoTypes.includes(ext)){
        preview = `<video src="${fileUrl}" controls autoplay muted style="max-width:400px;></video>`;
        } else if (imageTypes.includes(ext)) {
        preview = `<img src="${fileUrl}" alt="Imagen subida" style="max-width: 400px;" />`;
    } else {
        preview = `<a href="${fileUrl}" target="_blank">Ver archivo</a>`;
    }
    res.send(`
        <p>Archivo subido correctamente:</p>
        ${preview}<br><br>
        <a href="/admin">Subir otros</a>
    `);
});

//iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});