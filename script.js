const malla = document.getElementById("malla");
const estadoMaterias = {}; // Guarda si están aprobadas

function render() {
  malla.innerHTML = ""; // Limpiar antes de volver a pintar
  materias.forEach(materia => {
    const div = document.createElement("div");
    div.className = "materia";
    div.id = materia.id;
    div.textContent = materia.nombre;

    const aprobadas = materia.correlativas.every(id => estadoMaterias[id]);
    const yaAprobada = estadoMaterias[materia.id];

    if (!aprobadas && !yaAprobada) {
      div.classList.add("bloqueada");
    }
    if (yaAprobada) {
      div.classList.add("aprobada");
    }

    div.onclick = () => {
      if (!aprobadas && !yaAprobada) return; // Bloqueada
      estadoMaterias[materia.id] = !estadoMaterias[materia.id]; // Toggle aprobado
      render();
    };

    malla.appendChild(div);
  });
}

render();
