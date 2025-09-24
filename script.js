const caudalInput = document.getElementById("caudalInput");
const perdidaInput = document.getElementById("perdidaInput");
const kvsInput = document.getElementById("kvsInput");
const selectorTipo = document.getElementById("selectorTipo");
const selectorSubtipo = document.getElementById("selectorSubtipo");
const selectorOpciones = document.getElementById("selectorOpciones");
const tabla = document.getElementById("tablaSugerenciasBody");

const calculoInputs = [caudalInput, perdidaInput, kvsInput];
let selecCalculo = "kvsInput";
let caudal = null;
let perdida = null;
let kvs = null;

if (location.hostname === "arcsl.github.io") {
	window.location.replace("https://easyvalve.arcsl.com");
}

document.addEventListener("DOMContentLoaded", () => {

	document.title = "Easy Valve";

	selectorTipo.innerHTML = Object.keys(valvulas).map(tipo => `<option value="${tipo}">${tipo}</option>`).join("");
	actualizarSubtipo();

	calcular();
	calculoInputs.forEach(el => el.addEventListener('change', () => {
		calcular();
	}));

	selectorTipo.addEventListener('change', actualizarSubtipo);
	selectorSubtipo.addEventListener('change', actualizarOpciones);
	selectorOpciones.addEventListener('change', sugerirValvulas);

	document.querySelectorAll('input[name="selecCalculo"]').forEach(radio => {
		radio.addEventListener('change', event => {
			selecCalculo = event.target.value;

			calculoInputs.forEach(calculoInput => {
				if (calculoInput.id === selecCalculo) {
					calculoInput.disabled = true;
					calculoInput.style.backgroundColor = "#dddddd";
				} else {
					calculoInput.disabled = false;
					calculoInput.style.backgroundColor = "#ddffdd";
				}
			});

		});
	});

	const radioCalculo = document.querySelector(`input[name="selecCalculo"][value="${selecCalculo}"]`)
	radioCalculo.checked = true;
	radioCalculo.dispatchEvent(new Event('change', { bubbles: true }));


});

function calcular() {

	caudal = parseFloat(caudalInput.value);
	perdida = parseFloat(perdidaInput.value);
	kvs = parseFloat(kvsInput.value);

	let calculo = false;

	switch (selecCalculo) {
		case "caudalInput":
			calculo = calcularCaudal();
			break;

		case "perdidaInput":
			calculo = calcularPerdida();
			break;

		case "kvsInput":
			calculo = calcularKvs();
			break;
	}

	if (calculo) sugerirValvulas();

}

function calcularCaudal() {
	if (!perdida || !kvs) return false;
	caudal = kvs * Math.sqrt(perdida / 10);
	caudalInput.value = caudal.toFixed(2);
	return true;
}

function calcularPerdida() {
	if (!caudal || !kvs) return false;
	perdida = 10 * Math.pow(caudal / kvs, 2);
	perdidaInput.value = perdida.toFixed(2);
	return true;
}

function calcularKvs() {
	if (!perdida || !caudal) return;
	kvs = caudal / Math.sqrt(perdida / 10);
	kvsInput.value = kvs.toFixed(2);
	return true;
}

function actualizarSubtipo() {

	const tipo = selectorTipo.value;

	selectorSubtipo.innerHTML = "";

	if (!valvulas[tipo]) return;

	const subtipos = Object.keys(valvulas[tipo]);
	subtipos.forEach(sub => {
		const option = document.createElement("option");
		option.value = sub;
		option.textContent = sub;
		selectorSubtipo.appendChild(option);
	});

	actualizarOpciones();
}

function actualizarOpciones() {

	const tipo = selectorTipo.value;
	const subtipo = selectorSubtipo.value;

	selectorOpciones.innerHTML = "";

	if (!valvulas[tipo][subtipo]) return;

	const opciones = Object.keys(valvulas[tipo][subtipo]);
	opciones.forEach(opc => {
		const option = document.createElement("option");
		option.value = opc;
		option.textContent = opc;
		selectorOpciones.appendChild(option);
	});

	sugerirValvulas();
}

function sugerirValvulas() {

	const tipo = selectorTipo.value;
	const subtipo = selectorSubtipo.value;
	const opcion = selectorOpciones.value;

	if (!kvs || !caudal || !perdida) return;
	if (!valvulas[tipo] || !valvulas[tipo][subtipo] || !valvulas[tipo][subtipo][opcion]) return;

	tabla.innerHTML = "";

	const lista = [...valvulas[tipo][subtipo][opcion]].sort((a, b) => a.kvs - b.kvs);

	// Buscar válvula más cercana
	let seleccionada = lista.reduce((a, b) =>
		Math.abs(a.kvs - kvs) < Math.abs(b.kvs - kvs) ? a : b
	);

	const idx = lista.findIndex(v => v.modelo === seleccionada.modelo);
	const inferior = idx > 0 ? lista[idx - 1] : null;
	const superior = idx < lista.length - 1 ? lista[idx + 1] : null;

	const calcularDatos = (valvula) => {
		const pValvula = 10 * Math.pow(caudal / valvula.kvs, 2);
		const autoridad = pValvula / (pValvula + perdida);
		return { modelo: valvula.modelo, valvKvs: valvula.kvs, pValvula, autoridad, urlAppend: valvula.urlAppend };
	};

	const sugeridas = [inferior, seleccionada, superior].filter(Boolean).map(calcularDatos);

	sugeridas.forEach(({ modelo, valvKvs, pValvula, autoridad, urlAppend }) => {
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
        <td><a href="${hit}${urlAppend}" target="_blank" rel="noopener noreferrer">${modelo}</a></td>
        <td>${valvKvs}</td>
        <td>${pValvula.toFixed(2)}</td>
        <td class="${color}">${autoridad.toFixed(2)} - ${calidad}</td>
      </tr>
    `;
	});
}
