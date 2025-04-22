console.log("Vamos con todo, este proyecto se saca")


// Requerir módulos al inicio

const express = require('express');
const multer = require('multer');
const path = require('path');

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

//ARCHIVOS STATICOS

app.use(express.static(path.join(__dirname,'public')));

//Rutas
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/landing_page',(req, res) =>{
    res.render("landing page.html");
});


app.get('/',(req, res) =>{
    res.render("Avisos-consejo.html");
});


app.get('/servicios',(req, res) =>{
    res.render("Servicios.html");
});


app.get('/correo_enviado',(req, res) =>{
    res.render("Correo_enviado.html");
});


app.get('/denuncias',(req, res) =>{
    res.render("Denuncias.html");
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
            imagen: req.file.filename
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

 app.post('/autenticarinicio',(req,res)=>{

    //Paso 1: ocupamos obtener los datos

    let datos= {
        email:req.body.email,
        password:req.body.password
    }
    
    const existeUsuario= async()=>{
        //Paso2: Verificar si el usuario existe
        const usuario = await user.findOne({correo:datos.email});
        //usuario ---- Si /datos   -   --- No/ null

        if(usuario!==null){
            //Paso3: Verificar si la contraseña del usuario coincide con la de DB
            if(usuario.password===datos.password){
                console.log("El usuario pudo ingresar");
                res.redirect('/perfil');
            }else{
                console.log("La contraseña es incorrecta");
                res.redirect('/registro');
            }
        }else{
            console.log("El usuario no está registrado");
            res.redirect('/registro');
        }
        
    }

    existeUsuario();
})
 
