console.log("Vamos con todo, este proyecto se saca")


// Requerir módulos al inicio

const express = require('express');

const path = require('path');
const router = express.Router();
const multer = require('multer');
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




//ARCHIVOS STATICOS

app.use(express.static(path.join(__dirname,'public')));



//subir imagenes denuncias
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Usar una ruta absoluta con __dirname
      cb(null, path.join(__dirname, 'public/img'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


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


//Inicio sesion formulario

app.post('/authenticateIniciosesion',(req,res)=>{

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
                res.redirect('/');
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

//