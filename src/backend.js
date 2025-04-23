console.log("Vamos con todo, este proyecto se saca")


// Requerir módulos al inicio

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
//INICIALIZAR EL SERVER

const app = express();

app.listen(201, () =>{
    console.log("Server en puerto",201);
});


//Body parser
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
/*{
    //name : value
    "colorName":"value",
    "categoryColor": "value"
}
*/

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'img')); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, req.body.email_moni + '-' + file.originalname); // Prefijo con el correo del usuario
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));


//Express-session
const session = require('express-session');

app.use(session({
    secret: 'mi_secreto_seguro', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usa `true` si estás en HTTPS
}));




//ARCHIVOS STATICOS

app.use(express.static(path.join(__dirname,'public')));



//subir imagenes denuncias
/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Usar una ruta absoluta con __dirname
      cb(null, path.join(__dirname, 'public/img'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
 */

//Rutas
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/landing_page',(req, res) =>{
    res.render("landing page.html");
});

 app.get('/', (req, res) => {
    const userRole = req.session.userRole || null; 
    res.render('Avisos-consejo', { role: userRole });
}); 


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect('/');
        console.log("Sesión cerrada correctamente");
    });
});

/* app.get('/',(req, res) =>{
    res.render("Avisos-consejo.ejs");
});
 */

app.get('/servicios',(req, res) =>{
    res.render("Servicios.html");
});


app.get('/correo_enviado',(req, res) =>{
    res.render("Correo_enviado.html");
});



const denunciaModel = require('../models/denuncias');


app.route('/denuncias')

.get(async(req, res) => {
// optener datos de db
const denuncias = require("../models/denuncias.js");
const lsitaDenuncias = await denuncias.find();

// console.log(lsitaDenuncias); 
// eviar datos a pantalla
    res.render("denuncias.ejs", {lsitaDenuncias:lsitaDenuncias});
  })
  
  
  .post(upload.array('imagenes_jean', 5), async (req, res) => {

    try {
      

const rutasImagenes = Array.isArray(req.files)? req.files.map(file => '/img/' + file.filename) : [];


      const denuncia = new denunciaModel({
        asunto: req.body.denunciaNombre_jean,
        fecha: req.body.fechaDenuncia_jean,
        comentarios: req.body.comentarios_jean,
        imagenes: rutasImagenes
      });

      const savedDenuncia = await denuncia.save(); //cambiar luego
      await denuncia.save();
      
      res.redirect('/denuncias');
      console.log(savedDenuncia)
    } catch (err) {
      console.log(err);
      
    }
  });


























app.get('/inicio_sesion',(req, res) =>{
    res.render("Inicio_Sesion.html");
});


app.get('/noticias',(req, res) =>{
    res.render("Noticias.html");
});


app.get('/otros_usuarios',(req, res) =>{
    res.render("Otros_Usuarios.html");
});


app.get('/perfil',(req, res) =>{
    res.render("Perfil.html");
});


app.get('/registro',(req, res) =>{
    res.render("Registro.html");
});


app.get('/recuperacion_contra',(req, res) =>{
    res.render("RecuperacionContra.html");
});


app.get('/recuperacion_contra_2',(req, res) =>{
    res.render("RecuperacionContra2.html");
});


app.get('/usuario1',(req, res) =>{
    res.render("Usuario1.html");
});

app.get('/otros_usuarios',(req, res) =>{
    res.render("Otros_Usuarios.html");
});

const user = require('../models/users.js');


//Registro formulario
app.post('/register', upload.single('imagen_moni'), async (req, res) => {
    try {
        // Verificar si el correo ya existe en la base de datos
        const correoExistente = await user.findOne({ correo: req.body.email_moni });
        if (correoExistente) {
            console.log("El correo ya está registrado");
            return res.status(400).send("El correo ya está registrado. Intente con otro.");
        }

        // Crear un nuevo usuario
        let data = new user({
            nombre: req.body.nombre_moni,
            identificacion: req.body.identificacion_moni,
            correo: req.body.email_moni,
            password: req.body.password_moni,
            password2: req.body.password2,
            direccion: req.body.direccion_moni,
            informacion: req.body.informacion_moni,
            distrito: req.body.distrito_moni,
            telefono: req.body.telefono_moni,
            imagen: req.file.filename,
            rol: 'usuario'
        });

        // Guardar el usuario en la base de datos
        await data.save();
        console.log("Usuario creado");
        res.redirect('/'); // Redirigir a la página principal o donde desees
    } catch (err) {
        console.log("ERROR", err);
        res.status(500).send("Ocurrió un error al registrar el usuario.");
    }
});



//Inicio sesion formulario

app.post('/autenticarinicio', async (req, res) => {
    try {
        // Paso 1: Obtener los datos del formulario
        const datos = {
            email: req.body.email,
            password: req.body.password
        };

        // Paso 2: Verificar si el usuario existe
        const usuario = await user.findOne({ correo: datos.email });

        if (usuario) {
            // Paso 3: Verificar si la contraseña coincide
            if (usuario.password === datos.password) {
                console.log("El usuario pudo ingresar");
                console.log("Usuario autenticado:", usuario.rol);

                // Guardar el rol del usuario en la sesión
                req.session.userRole = usuario.rol;

                // Redirigir según el rol
                if (usuario.rol === 'admin') {
                    res.redirect('/'); // AGREGAR ACA LA PAGINA DEL ADMIN
                } else {
                    res.redirect('/'); // Página para usuarios normales
                }
            } else {
                console.log("La contraseña es incorrecta");
                res.redirect('/');
            }
        } else {
            console.log("El usuario no está registrado");
            res.redirect('/registro');
        }
    } catch (err) {
        console.error("Error al autenticar el usuario:", err);
        res.status(500).send("Ocurrió un error al autenticar el usuario.");
    }
});


