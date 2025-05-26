let kvsIdeal = null;
let caudalInstalacion = null;
let perdidaInstalacion = null;

if (location.hostname === "arcsl.github.io") {
    window.location.replace("https://easyvalve.arcsl.com");
}

document.addEventListener("DOMContentLoaded", () => {

    document.title = "Easy Valve";

	const selectorTipo = document.getElementById("selectorTipo");
	selectorTipo.innerHTML = Object.keys(valvulas)
		.map(tipo => `<option value="${tipo}">${tipo}</option>`)
		.join("");
	actualizarSubtipo();

});

function actualizarSubtipo() {
	const tipo = document.getElementById("selectorTipo").value;
	const selectorSubtipo = document.getElementById("selectorSubtipo");

	selectorSubtipo.innerHTML = "";
	kvsIdeal = null; // reiniciamos sugerencias si cambia grupo

	if (!valvulas[tipo]) return;

	const subtipos = Object.keys(valvulas[tipo]);
	subtipos.forEach(sub => {
		const option = document.createElement("option");
		option.value = sub;
		option.textContent = sub;
		selectorSubtipo.appendChild(option);
	});

	onSubtipoChange(); // si ya hay un cálculo, actualiza sugerencias
}

function calcularKvs() {
	const caudal = parseFloat(document.getElementById("caudalInput").value);
	const perdida = parseFloat(document.getElementById("perdidaInput").value);

	if (!caudal || !perdida) return;

	const kvs = caudal / Math.sqrt(perdida / 10);
	kvsIdeal = kvs;
	caudalInstalacion = caudal;
	perdidaInstalacion = perdida;

	document.getElementById("resultadoKvs").textContent = kvs.toFixed(2);

	onSubtipoChange(); // actualiza sugerencias tras cálculo
}

function calcularPerdida() {
	const caudal = parseFloat(document.getElementById("caudalPerdidaInput").value);
	const kvs = parseFloat(document.getElementById("kvsPerdidaInput").value);
	if (!caudal || !kvs) return;

	const perdida = 10 * Math.pow(caudal / kvs, 2);
	document.getElementById("resultadoPerdida").textContent = perdida.toFixed(2) + " m.c.a";
}

function calcularCaudal() {
	const perdida = parseFloat(document.getElementById("perdidaCaudalInput").value);
	const kvs = parseFloat(document.getElementById("kvsCaudalInput").value);
	if (!perdida || !kvs) return;

	const caudal = kvs * Math.sqrt(perdida / 10);
	document.getElementById("resultadoCaudal").textContent = caudal.toFixed(2) + " m³/h";
}

function onSubtipoChange() {
	const tipo = document.getElementById("selectorTipo").value;
	const subtipo = document.getElementById("selectorSubtipo").value;
	const tabla = document.getElementById("tablaSugerenciasBody");
	tabla.innerHTML = "";

	if (!kvsIdeal || !caudalInstalacion || !perdidaInstalacion) return;
	if (!valvulas[tipo] || !valvulas[tipo][subtipo]) return;

	const lista = [...valvulas[tipo][subtipo]].sort((a, b) => a.kvs - b.kvs);

	// Buscar válvula más cercana
	let seleccionada = lista.reduce((a, b) =>
		Math.abs(a.kvs - kvsIdeal) < Math.abs(b.kvs - kvsIdeal) ? a : b
	);

	const idx = lista.findIndex(v => v.modelo === seleccionada.modelo);
	const inferior = idx > 0 ? lista[idx - 1] : null;
	const superior = idx < lista.length - 1 ? lista[idx + 1] : null;

	const calcularDatos = (valvula) => {
		const pValvula = 10 * Math.pow(caudalInstalacion / valvula.kvs, 2);
		const autoridad = pValvula / (pValvula + perdidaInstalacion);
		return { modelo: valvula.modelo, pValvula, autoridad };
	};

	const sugeridas = [inferior, seleccionada, superior].filter(Boolean).map(calcularDatos);

	sugeridas.forEach(({ modelo, pValvula, autoridad }) => {
		let color = "w3-text-red", calidad = "Mala";

		if (autoridad >= 0.4 && autoridad <= 0.6) {
			color = "w3-text-green";
			calidad = "Buena";
		} else if ((autoridad >= 0.3 && autoridad < 0.4) || (autoridad > 0.6 && autoridad <= 0.7)) {
			color = "w3-text-orange";
			calidad = "Regular";
		}

		tabla.innerHTML += `
      <tr>
        <td>${modelo}</td>
        <td>${pValvula.toFixed(2)}</td>
        <td class="${color}">${autoridad.toFixed(2)} - ${calidad}</td>
      </tr>
    `;
	});
}
