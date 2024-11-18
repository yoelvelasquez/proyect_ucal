// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDfB9XFAq8nhU_FnD04X_Kt7FhPAxAqkI",
    authDomain: "proyectucal.firebaseapp.com",
    projectId: "proyectucal",
    storageBucket: "proyectucal.firebasestorage.app",
    messagingSenderId: "1075607180163",
    appId: "1:1075607180163:web:dfcaf1d51635857c68dcb6",
    measurementId: "G-TCCLNBEQND"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar los cursos del estudiante
async function cargarCursos() {
    const correo = localStorage.getItem("correo");  // Obtener el correo desde localStorage
    const nombreEstudiante = document.getElementById("nombre-estudiante");

    if (!correo) {
        // Si no se encuentra el correo en localStorage, redirigir al inicio de sesión
        window.location.href = "../inicio_sesion/inicio.html";
        return;
    }

    try {
        // Realizar la consulta en Firestore para obtener los cursos del estudiante
        const q = query(collection(db, "estudiantes"), where("correo", "==", correo));
        const docSnapshot = await getDocs(q);

        if (!docSnapshot.empty) {
            const estudianteData = docSnapshot.docs[0].data();
            console.log("Datos del estudiante: ", estudianteData);

            // Mostrar el nombre del estudiante
            nombreEstudiante.textContent = estudianteData.nombre;

            // Cargar los cursos del estudiante
            const cursos = estudianteData.cursos || []; // Obtener los cursos (si existen)

            const coursesContainer = document.getElementById("courses-container");

            if (cursos.length > 0) {
                cursos.forEach(curso => {
                    const cursoElement = document.createElement("div");
                    cursoElement.classList.add("course");
                    cursoElement.textContent = curso; // Asumiendo que cada curso es un string
                    coursesContainer.appendChild(cursoElement);
                });
            } else {
                // Si no hay cursos, mostrar un mensaje
                const noCursosMessage = document.createElement("p");
                noCursosMessage.textContent = "No tienes cursos disponibles.";
                coursesContainer.appendChild(noCursosMessage);
            }
        } else {
            console.log("No se encontró al estudiante en la base de datos.");
        }
    } catch (error) {
        console.error("Error al cargar los cursos:", error);
    }
}

// Llamar a la función para cargar los cursos al cargar la página
window.onload = cargarCursos;

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("correo");  // Eliminar el correo del localStorage
    window.location.href = "../inicio_sesion/inicio.html";  // Redirigir al inicio de sesión
}
