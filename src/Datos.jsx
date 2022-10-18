import { useState } from "react";

export function Datos() {
  const [archivoData, setArchivoData] = useState();
  const [numeroVecinos, setNumeroVecinos] = useState();
  const [metrica, setMetrica] = useState("Correlación de Pearson.");
  const [prediccion, setPrediccion] = useState("Predicción simple.");

  const [rangoMax, setRangoMax] = useState("");
  const [rangoMin, setRangoMin] = useState("");

  const [errorArchivo, setErrorArchivo] = useState("");
  const [errorVecinos, setErrorVecinos] = useState("");

  return (
    <>
      {/*Lectura del archivo*/}
      <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          let file = new FileReader();
          file.onload = () => {
            setArchivoData(file.result);
          };
          if (e.target.files[0]) file.readAsText(e.target.files[0]);
          else setArchivoData(undefined);
        }}
      />

      {/*Lectura de rangoMax*/}
      <input
        type="number"
        onChange={(e) => {
          setRangoMax(e.target.value);
        }}
      />

      {/*Lectura de rangoMin*/}
      <input
        type="number"
        onChange={(e) => {
          setRangoMin(e.target.value);
        }}
      />

      {/*Lectura de vecinos*/}
      <input
        type="number"
        onChange={(e) => {
          setNumeroVecinos(e.target.value);
        }}
      />

      {/*Lectura de metrica*/}
      <select
        onChange={(e) => {
          setMetrica(e.target.value);
        }}
      >
        <option>Correlación de Pearson.</option>
        <option>Distancia coseno.</option>
        <option>Distancia Euclídea.</option>
      </select>

      {/*Lectura de prediccion*/}
      <select
        onChange={(e) => {
          setPrediccion(e.target.value);
        }}
      >
        <option>Predicción simple.</option>
        <option>Diferencia con la media.</option>
      </select>

      {/*Mostrar errores */}
      <p>
        {errorArchivo} <br /> {errorVecinos}
      </p>

      <button
        onClick={() => {
          setErrorArchivo("");
          setErrorVecinos("");

          if (!archivoData)
            setErrorArchivo(
              `Error, hay que seleccionar un archivo que contenga la matriz`
            );
          if (!numeroVecinos)
            setErrorVecinos(`Error, hay que seleccionar un numero de vecinos`);
          if (archivoData && numeroVecinos) {
            generarVecinos(formateo(archivoData, rangoMax, rangoMin), metrica);
          }
        }}
      >
        Mostrar
      </button>
    </>
  );
}

/*Arreglamos la matriz de entrada*/
function formateo(archivoData, rangoMax, rangoMin) {
  let arraysTextoArchivo = archivoData.split("\n");

  let matriz = [];
  for (let i = 0; i < arraysTextoArchivo.length - 1; i++) {
    let aux = [];
    for (let j = 0; j < arraysTextoArchivo[i].length - 1; j++) {
      if (arraysTextoArchivo[i][j] !== " ") {
        if (arraysTextoArchivo[i][j] === "-") aux.push(-1);
        else
          aux.push(
            (parseInt(arraysTextoArchivo[i][j], 10) - rangoMin) /
              (rangoMax - rangoMin)
          );
      }
    }
    matriz.push(aux);
  }

  return matriz;
}

function generarVecinos(matriz, metrica) {
  let vecinos = [];

  for (let i = 0; i < matriz.length - 1; i++) {
    let aux = [];
    for (let j = 0; j < matriz.length - 1; j++) {
      if (i !== j) {
        if (metrica === "Correlación de Pearson.")
          aux.push(
            correlacionPearson(
              matriz[i],
              calcularMedia(matriz[i]),
              matriz[j],
              calcularMedia(matriz[j])
            )
          );
        else if (metrica === "Distancia coseno.")
          aux.push(distanciaCoseno(matriz[i], matriz[j]));
        else aux.push(distanciaEuclidiana(matriz[i], matriz[j]));
      }
    }
    vecinos.push(aux);
  }
  console.log(vecinos);
}

function distanciaEuclidiana(usuario1, usuario2) {
  let contador = 0,
    distancia = 0;

  for (let i = 0; i < usuario1.length - 1; i++) {
    if (usuario1[i] !== -1 && usuario2[i] !== -1) {
      distancia = Math.pow(usuario1[i] - usuario2[i], 2);
      contador++;
    }
  }

  distancia = Math.sqrt(distancia);
  return distancia / Math.sqrt(contador);
}

function distanciaCoseno(usuario1, usuario2) {
  let numerador = 0,
    denominador1 = 0,
    denominador2 = 0;

  for (let i = 0; i < usuario1.length - 1; i++) {
    if (usuario1[i] !== -1 && usuario2[i] !== -1) {
      numerador += usuario1[i] * usuario2[i];
      denominador1 += Math.pow(usuario1[i], 2);
      denominador2 += Math.pow(usuario2[i], 2);
    }
  }

  return numerador / (Math.sqrt(denominador1) * Math.sqrt(denominador2));
}

function correlacionPearson(usuario1, media1, usuario2, media2) {
  let numerador = 0,
    denominador1 = 0,
    denominador2 = 0,
    correlacion = 0;

  for (let i = 0; i < usuario1.length - 1; i++) {
    if (usuario1[i] !== -1 && usuario2[i] !== -1) {
      numerador += (usuario1[i] - media1) * (usuario2[i] - media2);
      denominador1 += Math.pow(usuario1[i] - media1, 2);
      denominador2 += Math.pow(usuario2[i] - media2, 2);
    }
  }

  correlacion = numerador / (Math.sqrt(denominador1) * Math.sqrt(denominador2));
  return (correlacion + 1) / 2;
}

function calcularMedia(vector) {
  let sumatorio = 0,
    contador = 0;

  for (let i = 0; i < vector.length - 1; i++) {
    if (vector[i] !== -1) {
      sumatorio += vector[i];
      contador++;
    }
  }

  return sumatorio / contador;
}
