async function tasaCambio() {
    const respuesta = await fetch('https://open.er-api.com/v6/latest');
    const data = await respuesta.json();
    return data.rates;
}

async function monedasSelect() {
    const obtenerTasaCambio = await tasaCambio();
    const selectDesde = document.getElementById('selectDe');
    const selectHasta = document.getElementById('selectA');

    selectDesde.innerHTML = '';
    selectHasta.innerHTML = '';

    Object.keys(obtenerTasaCambio).forEach(moneda => {
        const opciones = document.createElement('option');
        opciones.value = moneda;
        opciones.textContent = moneda;
        selectDesde.appendChild(opciones);
    });

    Object.keys(obtenerTasaCambio).forEach(moneda => {
        const opciones = document.createElement('option');
        opciones.value = moneda;
        opciones.textContent = moneda;
        selectHasta.appendChild(opciones);
    });
}

async function convertirMoneda() {
    const obtenerTasaCambio = await tasaCambio();
    const monedaDesde = document.querySelector('.de select').value;
    const monedaHasta = document.querySelector('.a select').value;
    const cantidad = document.getElementById('cantidad').value;

    const tasaCambioDesde = obtenerTasaCambio[monedaDesde];
    const tasaCambioHasta = obtenerTasaCambio[monedaHasta];
    const conversion = (cantidad / tasaCambioDesde) * tasaCambioHasta;

    document.getElementById('resultado').innerText = `${cantidad} ${monedaDesde} = ${conversion.toFixed(2)} ${monedaHasta}`;
}

function cambiarMoneda() {
    const selectDesde = document.getElementById('selectDe');
    const selectHasta = document.getElementById('selectA');
    const selectDesdeValor = selectDesde.value;

    selectDesde.value = selectHasta.value;
    selectHasta.value = selectDesdeValor;
}

document.querySelector('.boton button').addEventListener('click', convertirMoneda);
document.getElementById('icono').addEventListener('click', cambiarMoneda);
window.onload = () => {
    monedasSelect();
}