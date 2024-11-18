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

// Función de inicio de sesión
async function iniciarSesion() {
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Correo ingresado: ", correo);
    console.log("Contraseña ingresada: ", password);

    try {
        // Realizar la consulta en Firestore
        const q = query(collection(db, "estudiantes"), where("correo", "==", correo));
        const docSnapshot = await getDocs(q);

        if (!docSnapshot.empty) {
            const estudianteData = docSnapshot.docs[0].data();
            console.log("Datos del estudiante: ", estudianteData);
            
            if (estudianteData.password === password) {
                console.log("Inicio de sesión exitoso");
                document.getElementById("mensaje-exito").innerText = "Has iniciado sesión correctamente.";

                // Guardar el correo en localStorage
                localStorage.setItem("correo", correo);

                // Redirigir a la página de cursos
                setTimeout(() => {
                    window.location.href = "../alumno/ApaginaP.html"; // Asegúrate de que esta página exista
                }, 2000); // 2 segundos para ver el mensaje de éxito
            } else {
                console.log("Contraseña incorrecta");
                alert("Contraseña incorrecta");
            }
        } else {
            console.log("El correo no está registrado");
            alert("Correo no registrado.");
        }
    } catch (error) {
        console.error("Error al verificar el inicio de sesión:", error.message);
        alert("Error al autenticarte. Intenta nuevamente.");
    }
}

// Escuchar el evento del formulario
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    iniciarSesion(); // Llamar a la función para verificar el inicio de sesión
});
