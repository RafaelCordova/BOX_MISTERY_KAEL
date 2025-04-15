let premios = [];
let cajaCerrada = false;

function agregarPremio() {
    const premioInput = document.getElementById('premioInput');
    const premio = premioInput.value.trim();
    if (premio) {
        premios.push(premio);

        const anim = document.createElement('div');
        anim.className = 'entrada-premio';
        anim.textContent = premio;
        document.body.appendChild(anim);

        const inputRect = premioInput.getBoundingClientRect();
        anim.style.left = (inputRect.left + inputRect.width / 2 - anim.offsetWidth / 2) + 'px';
        anim.style.top = (inputRect.top + inputRect.height / 2 - anim.offsetHeight / 2) + 'px';
        void anim.offsetWidth;

        const cajaRect = document.getElementById('cajaMisteriosa').getBoundingClientRect();
        anim.style.left = (cajaRect.left + cajaRect.width / 2 - anim.offsetWidth / 2) + 'px';
        anim.style.top = (cajaRect.top + cajaRect.height / 2 - anim.offsetHeight / 2) + 'px';
        anim.style.opacity = '0';
        anim.style.transform = 'scale(0.2)';

        setTimeout(() => {
            anim.remove();
        }, 800);

        premioInput.value = '';
    }
}

function cerrarCaja() {
    if (premios.length === 0) {
        alert("Agrega al menos un premio antes de cerrar la caja.");
        return;
    }
    cajaCerrada = true;
    document.getElementById('btnCerrar').disabled = true;
    document.getElementById('premioInput').disabled = true;
    document.getElementById('btnAgregar').disabled = true;

    const premioMostrar = document.getElementById('premioMostrar');
    premioMostrar.style.opacity = '1';
    premioMostrar.style.fontSize = '18px';
    premioMostrar.style.animation = 'none';
    premioMostrar.textContent = '📦 CAJA CERRADA 📦';

    premioMostrar.style.position = 'absolute';
    premioMostrar.style.top = '50%';
    premioMostrar.style.left = '50%';
    premioMostrar.style.transform = 'translate(-50%, 90%)';

    alert("🎁 ¡La caja está lista! Haz click sobre ella para revelar tu premio.");
}

function abrirCaja() {
    if (!cajaCerrada) return;
  
    const contenedor = document.getElementById('contenedorCaja');
    const caja = document.getElementById('cajaMisteriosa');
    const tapa = caja.querySelector('.tapa');
    const fondoOscuro = document.getElementById('fondoOscuro');
    const premioMostrar = document.getElementById('premioMostrar');
  
    fondoOscuro.style.display = 'block';
    contenedor.classList.add('primer-plano');
  
    setTimeout(() => {
        tapa.style.transform = 'rotateY(-120deg) rotateZ(-120deg)';
        lanzarConfeti();
  
        const premio = premios[Math.floor(Math.random() * premios.length)];
  
        setTimeout(() => {
            premioMostrar.textContent = `🎉 Felicidades abejorro, ganaste: ${premio} 🎉`;
            premioMostrar.style.animation = 'salirDeCaja 1s ease forwards';
            premioMostrar.style.position = 'absolute';
            premioMostrar.style.top = '120%';
            premioMostrar.style.left = '50%';
            premioMostrar.style.transform = 'translateX(-50%)';
            premioMostrar.style.fontSize = '32px';
  
            const imagenCaja = document.getElementById('imagenCaja');
            imagenCaja.style.display = 'block';
            imagenCaja.style.position = 'absolute';
            imagenCaja.style.top = '0';
            imagenCaja.style.left = '0';
            imagenCaja.style.transform = 'scale(1)';
            imagenCaja.style.transition = 'all 0.5s ease';
  
            caja.onclick = null;
        }, 1000);
    }, 2000);
}

function lanzarConfeti() {
    for (let i = 0; i < 50; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 3000);
    }
}

function verPremios() {
    if (premios.length === 0) {
        alert("Aún no hay premios en la caja.");
        return;
    }

    const listaPremios = document.getElementById('listaPremios');
    listaPremios.innerHTML = '';

    premios.forEach(premio => {
        const li = document.createElement('li');
        li.textContent = premio;
        listaPremios.appendChild(li);
    });

    document.getElementById('modalPremios').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalPremios').style.display = 'none';
}