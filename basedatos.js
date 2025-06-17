// Configuración de Firebase (usa tus propios valores)
const firebaseConfig = {
    apiKey: "AIzaSyDHgKJXxQf6B3aQrHOcnFqdM3UkXiuF4RA",
    authDomain: "huella-de-carbono-neo.firebaseapp.com",
    projectId: "huella-de-carbono-neo",
    storageBucket: "huella-de-carbono-neo.firebasestorage.app",
    messagingSenderId: "145000733830",
    appId: "1:145000733830:web:ef8695d898f97024c44507",
    measurementId: "G-ZMSHCN03M0"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function guardarEnFirebase() {
  // Validar que se haya calculado la huella primero
  if (huellaData.huella === 0) {
    alert("⚠️ Por favor calcula tu huella antes de guardar.");
    return;
  }

  // Validar campos obligatorios
  const nombre = document.getElementById("nombre").value;
  const cargo = document.getElementById("cargo").value;
  if (!nombre || !cargo) {
    alert("⚠️ Nombre y cargo son obligatorios");
    return;
  }

  // Obtener todos los datos del formulario
  const datos = {
    // Información básica
    nombre: nombre,
    cargo: cargo,
    fechaRegistro: new Date().toISOString(),
    
    // Dispositivos electrónicos
    computadoras: parseInt(document.getElementById("pcs").value) || 0,
    monitores: parseInt(document.getElementById("monitores").value) || 0,
    teclados: parseInt(document.getElementById("teclado").value) || 0,
    mouse: parseInt(document.getElementById("mouse").value) || 0,
    impresoras: parseInt(document.getElementById("cim").value) || 0,
    
    // Climatización
    usoCalefactor: parseInt(document.getElementById("calorsemana").value) || 0,
    usoAireAcondicionado: parseInt(document.getElementById("airesemana").value) || 0,
    horasClimatizacion: parseInt(document.getElementById("horad").value) || 0,
    
    // Consumo energético
    horasComputadora: parseInt(document.getElementById("compuh").value) || 0,
    horasImpresora: parseInt(document.getElementById("himpresora").value) || 0,
    bombillas: parseInt(document.getElementById("bombi").value) || 0,
    horasBombillas: parseInt(document.getElementById("bombih").value) || 0,
    
    // Actividades digitales
    correos: parseInt(document.getElementById("correos").value) || 0,
    navegacionWeb: parseInt(document.getElementById("hweb").value) || 0,
    fotosRedes: parseInt(document.getElementById("fotored").value) || 0,
    videos: parseInt(document.getElementById("videos").value) || 0,
    
    // Materiales
    paginasImpresas: parseInt(document.getElementById("impresiones").value) || 0,
    
    // Transporte
    visitasOficina: parseInt(document.getElementById("vecesoficina").value) || 0,
    kmTaxi: parseInt(document.getElementById("taxi").value) || 0,
    kmBus: parseInt(document.getElementById("bus").value) || 0,
    kmTransmilenio: parseInt(document.getElementById("transmilenio").value) || 0,
    kmAvion: parseInt(document.getElementById("avion").value) || 0,
    kmAutomovil: parseInt(document.getElementById("automovil").value) || 0,
    kmCamioneta: parseInt(document.getElementById("camioneta").value) || 0,
    kmMoto: parseInt(document.getElementById("moto").value) || 0,
    kmMetro: parseInt(document.getElementById("metro").value) || 0,
    
    // Resultados calculados
    huellaTotal: huellaData.huella,
    consumoEnergetico: huellaData.energiam,
    impactoInternet: huellaData.internet,
    impactoClimatizacion: huellaData.aire,
    impactoTransporte: huellaData.combustible
  };

  // Mostrar loader
  const botonGuardar = document.querySelector("button[onclick='guardarEnFirebase()']");
  const textoOriginal = botonGuardar.textContent;
  botonGuardar.innerHTML = '<span class="loader">⏳</span> Guardando...';
  botonGuardar.disabled = true;

  try {
    // Guardar en Firestore
    await db.collection("huellasCarbono").add(datos);
    
    // Feedback al usuario
    alert("✅ Datos guardados correctamente");
    console.log("Datos guardados:", datos);
    
  } catch (error) {
    // Manejo de errores
    console.error("Error al guardar:", error);
    alert(`❌ Error: ${error.message}`);
    
  } finally {
    // Restaurar botón
    botonGuardar.textContent = textoOriginal;
    botonGuardar.disabled = false;
  }
}
