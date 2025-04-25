console.log("Vamos con todo, este proyecto se saca")


// Requerir módulos al inicio

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

//INICIALIZAR EL SERVER

const app = express();

app.listen(201, () =>{
    console.log("Server en puerto", 201); 
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
        cb(null, path.join(__dirname, 'public', 'img'));
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.email_moni}-${file.originalname}`); // Usar req.body.email_moni
    }
});
const upload = multer({ storage: storage });



const storageDen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'img'));
    },
    filename: (req, file, cb) => {
        const userEmail = req.session.userEmail || 'anonimo';
        cb(null, `${userEmail}-${file.originalname}`); // Usar req.session.userEmail
    }
});

const uploadDen = multer({ storage: storageDen});





app.use(express.static(path.join(__dirname, 'public')));


//Express-session
const session = require('express-session');

app.use(session({
    secret: 'dsadasdsad', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));




//ARCHIVOS STATICOS

app.use(express.static(path.join(__dirname,'public')));



//Rutas
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/landing_page',(req, res) =>{
    res.render("landing page.html");
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


app.get('/servicios',(req, res) =>{
    const userRole = req.session.userRole || null; 
    res.render("Servicios.ejs", { role: userRole });
});


/* app.get('/correo_enviado',(req, res) =>{
    res.render("Correo_enviado.html");
});
*/



app.get('/noticias',(req, res) =>{
    res.render("Noticias.html");
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

app.get('/otros_usuarios',async(req, res) =>{
    //Paso 1: Obtener los datos
    const userRole = req.session.userRole || null;
    const usuarios = require('../models/users.js');
    //Paso 2: Enviar esos datos a mostrarse en pantalla
    const listaUsuarios = await usuarios.find();
    res.render("Otros_Usuarios.ejs", { role: userRole,listaUsuarios:listaUsuarios });
});

app.get('/usuario/:identificacion', async (req, res) => {
    const usuarios = require('../models/users.js');
    const userRole = req.session.userRole || null;
    const identificacionUsuario = decodeURIComponent(req.params.identificacion) || null;
    const denunciaModel = require('../models/denuncias');

    const infoUsuario = await usuarios.findOne({ identificacion: identificacionUsuario }) || null;
    
    if (!infoUsuario) {
        return res.status(404).send("Usuario no encontrado");
    }

    const listaDenuncias = await denunciaModel.find({ identificacion: identificacionUsuario }) || [];

    res.render("Usuario1.ejs", { 
        role: userRole, 
        infoUsuario: infoUsuario, 
        listaDenuncias: listaDenuncias
    });
});

app.get('/perfil',async(req, res) =>{
    const usuarios = require('../models/users.js');
    const userRole = req.session.userRole || null;
    const idPerfil = req.session.userIdentificacion || null;
    const infoPerfil = await usuarios.findOne({identificacion:idPerfil}) || null; 
    res.render("Perfil.ejs", { role: userRole, infoPerfil: infoPerfil });
});


const user = require('../models/users.js');


//Registro formulario
app.post('/register', upload.single('imagen_moni'), async (req, res) => {
    try {
        const identificacionExistente = await user.findOne({ identificacion: req.body.identificacion_moni});
        if (identificacionExistente) {
            console.log("La identifiacion ya está usada");
            return res.status(400).send("El correo ya está registrado. Intente con otro.");
        }

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


//Modificar user

app.post('/guardar-perfil', uploadDen.single('imagen_nueva'), async (req, res) => {
    try {
        const { nombre, correo, telefono, direccion, distrito } = req.body;
        const idPerfil = req.session.userIdentificacion || null;  
        const usuario = await user.findOne({ identificacion: idPerfil });

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.correo = correo || usuario.correo;
        usuario.telefono = telefono || usuario.telefono;
        usuario.direccion = direccion || usuario.direccion;
        usuario.distrito = distrito || usuario.distrito;

        if (req.file) {
            usuario.imagen = req.session.userEmail + '-' + req.file.originalname;
        }

        await usuario.save();
        res.redirect('/perfil');

    } catch (err) {
        console.error("Error al guardar el perfil:", err);
        res.status(500).send("Ocurrió un error al actualizar el perfil");
    }
});

//Avisos formulario
const Aviso = require('../models/avisos.js');
const Noticia = require('../models/noticias.js');

app.post('/avisos', async (req, res) => {
    try {
        // Crear un nuevo usuario
        let avisosObjt = new Aviso({
            avisosTitulo: req.body.tituloAvisos,
            avisosFecha: req.body.fechaAvisos,
            avisosContenido: req.body.contenidoAvisos,
            aprobado: false 
        });
        // Guardar el aviso
        await avisosObjt.save();
        console.log("Aviso subido");
        res.redirect('/'); // Redirigir a la página principal o donde desees
    } catch (err) {
        console.log("ERROR", err);
        res.status(500).send("Ocurrió un error al registrar el usuario.");
    }
});
app.post('/noticias', uploadDen.single('imagenNoticia'), async (req, res) => {
    try {

        
        let noticiasObjt = new Noticia({
            nombreNoticia: req.body.tituloNoticias,
            fechaPublicacion: req.body.fechaNoticias,
            contenidoNoticia: req.body.contenidoNoticias,
            imagen: req.file.filename,
            aprobado: false,
        });

        // Guardar el aviso
        await noticiasObjt.save();
        console.log("Noticia subida");
        res.redirect('/'); // Redirigir a la página principal o donde desees
    } catch (err) {
        console.log("ERROR", err);
        res.status(500).send("Ocurrió un error al registrar el usuario.");
    }
});

app.post('/aprobar/:id', async (req, res) => {
    if (req.session.userRole !== 'admin') {
        return res.status(403).send("Acceso denegado");
    }

    try {
        await Aviso.findByIdAndUpdate(req.params.id, { aprobado: true });
        res.redirect('/');
    } catch (err) {
        console.log("Error al aprobar solicitud:", err);
        res.status(500).send("Error al aprobar el aviso.");
    }
});
app.post('/aprobar-noticia/:id', async (req, res) => {
    if (req.session.userRole !== 'admin') {
        return res.status(403).send("Acceso denegado");
    }

    try {
        await Noticia.findByIdAndUpdate(req.params.id, { aprobado: true });
        res.redirect('/');
    } catch (err) {
        console.log("Error al aprobar solicitud de noticia:", err);
        res.status(500).send("Error al aprobar la noticia.");
    }
});
app.post('/rechazar/:id', async (req, res) => {
    if (req.session.userRole !== 'admin') {
        return res.status(403).send("Acceso denegado");
    }

    try {
        await Aviso.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log("Error al rechazar solicitud:", err);
        res.status(500).send("Error al rechazar el aviso.");
    }
});
app.post('/rechazar-noticia/:id', async (req, res) => {
    if (req.session.userRole !== 'admin') {
        return res.status(403).send("Acceso denegado");
    }

    try {
        await Noticia.findByIdAndDelete(req.params.id);
        res.redirect('/'); 
    } catch (err) {
        console.log("Error al rechazar solicitud de noticia:", err);
        res.status(500).send("Error al rechazar la noticia.");
    }
});
app.get('/', async (req, res) => {
    try {
        const userRole = req.session.userRole || null;

        const [avisos, noticias, solicitudesAvisos, solicitudesNoticias] = await Promise.all([
            Aviso.find({ aprobado: true }),
            Noticia.find({ aprobado: true }),
            Aviso.find({ aprobado: false }),
            Noticia.find({ aprobado: false })
        ]);

        res.render('Avisos-consejo', {
            avisos,
            noticias,
            solicitudesAvisos,
            solicitudesNoticias,
            role: userRole
        });
    } catch (err) {
        console.log("Error al obtener datos:", err);
        res.status(500).send("Error al cargar la página principal");
    }
});


//Inicio sesion formulario As

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
                req.session.userEmail = usuario.correo;
                req.session.userIdentificacion = usuario.identificacion;

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


// Denuncias
const denunciaModel = require('../models/denuncias');



// Ruta GET para obtener las denuncias
app.get('/denuncias', async (req, res) => {
       
            const userEmail = req.session.userEmail;
            const userRole = req.session.userRole || null;
            /* const usuario = await user.findOne({ correo: userEmail }); */
            /* const id = usuario.identificacion; */
            let listaDenuncias;
    
            // Si el usuario es admin, mostrar todas las denuncias
            if (userRole === 'admin') {
                listaDenuncias = await denunciaModel.find(); // Obtener todas las denuncias
            } else if (userRole === 'usuario') {
                // Si no es admin, mostrar solo las denuncias del usuario logueado
                listaDenuncias = await denunciaModel.find({ correo: userEmail });
                
            } else {
                res.redirect('/registro'); // Redirigir a la página principal si no es un usuario válido
                return;
            }
    
            res.render('denuncias', { role: userRole, listaDenuncias: listaDenuncias });
    
        }
);

// Ruta POST para crear una denuncia
app.post('/denuncias', uploadDen.array('imagenes_jean', 5), async (req, res) => {
    try {
        // Verifica si se han subido imágenes
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No se han subido imágenes.");
        }
        console.log(req.session.userEmail);

        const userEmail = req.session.userEmail;
        /* const userRole = req.session.userRole || null;
        const usuario = await user.findOne({ correo: userEmail }); */
        const id = req.session.userIdentificacion;

        // Extraer los nombres de los archivos subidos y agregar el correo como prefijo
        const rutasImagenes = req.files.map(file => `${userEmail}-${file.originalname}`);

        // Crear una nueva denuncia
        const denuncia = new denunciaModel({
            correo: userEmail,
            identificacion: id,
            asunto: req.body.denunciaNombre_jean,
            fecha: req.body.fechaDenuncia_jean,
            comentarios: req.body.comentarios_jean,
            imagenes: rutasImagenes, // Almacenar las rutas de las imágenes
        });

        // Guardar la denuncia en la base de datos
        const savedDenuncia = await denuncia.save();
        res.redirect('/denuncias');
        console.log("Denuncia creada:", savedDenuncia);
    } catch (err) {
        console.error("Error al guardar la denuncia:", err);
        res.status(500).send("Ocurrió un error al guardar la denuncia.");
    }
});

app.post('/eliminarUsuario/:identificacion', async (req, res) => {
    const id = req.params.identificacion;
    const usuarios = require('../models/users.js');

    try {
        const usuario = await usuarios.findOne({ identificacion: id });
        await usuarios.findOneAndDelete({ identificacion: id });

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.redirect('/otros_usuarios');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error interno al eliminar usuario');
    }
});

app.post('/editarUsuario/:identificacion', async (req, res) => {
    const id = req.params.identificacion;
    const { identificacion, correo, telefono, distrito, direccion } = req.body;
    const usuarios = require('../models/users.js');

    try {
        const usuario = await usuarios.findOne({ identificacion: id });

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        usuario.identificacion = identificacion || usuario.identificacion;
        usuario.correo = correo || usuario.correo;
        usuario.telefono = telefono || usuario.telefono;
        usuario.distrito = distrito || usuario.distrito;
        usuario.direccion = direccion || usuario.direccion;

        await usuario.save(); 

        res.redirect(`/usuario/${id}`);
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).send('Error interno al editar usuario');
    }
});