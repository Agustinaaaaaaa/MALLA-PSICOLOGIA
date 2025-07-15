// Prerrequisitos para desbloqueo
const prerequisitos = {
  r1: ['r2', 'r3', 'r4'],
  r2: ['r5', 'r6'],
  r3: ['r7', 'r10'],
  r4: ['r8'],
  r5: ['r9', 'r11'],
  r6: [],
  r7: ['r8'],
  r8: ['r12'],
  r9: ['r12'],
  r10: ['r11'],
  r11: ['r12'],
  r12: []
};

const ramos = document.querySelectorAll('.ramo');

ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('locked')) return;

    if (ramo.classList.contains('aprobado')) {
      ramo.classList.remove('aprobado');
      bloquearDependientes(ramo.id);
    } else {
      ramo.classList.add('aprobado');
      desbloquearDependientes(ramo.id);
    }
  });
});

function desbloquearDependientes(id) {
  if (!prerequisitos[id]) return;
  prerequisitos[id].forEach(depId => {
    const dep = document.getElementById(depId);
    if (dep && dep.classList.contains('locked')) {
      dep.classList.remove('locked');
    }
  });
}

function bloquearDependientes(id) {
  if (!prerequisitos[id]) return;
  prerequisitos[id].forEach(depId => {
    const dep = document.getElementById(depId);
    if (dep) {
      if (!tienePrerrequisitoAprobado(depId)) {
        dep.classList.add('locked');
        dep.classList.remove('aprobado');
        bloquearDependientes(depId);
      }
    }
  });
}

function tienePrerrequisitoAprobado(id) {
  for (let key in prerequisitos) {
    if (prerequisitos[key].includes(id)) {
      const r = document.getElementById(key);
      if (r && r.classList.contains('aprobado')) {
        return true;
      }
    }
  }
  return false;
}
