import { useContext, useState } from "react";
import {DataContext} from "../context/DataContext"

export function Datos() {

  const [archivoData, setArchivoData] = useState();
  const [numeroVecinos, setNumeroVecinos] = useState();
  const [metrica, setMetrica] = useState("Correlación de Pearson.");
  const [prediccion, setPrediccion] = useState("Predicción simple.");

  const [errorArchivo, setErrorArchivo] = useState("");
  const [errorVecinos, setErrorVecinos] = useState("");

  const value = useContext(DataContext);

  return (
    <>
      {/*Titulo*/}
      <div className="grid place-content-center">
        <p className="font-mono font-bold text-white text-4xl p-8">
        Métodos de Filtrado Colaborativo.
        </p>
      </div>
      <div className="grid place-content-center">
      {/*Lectura del archivo*/}
        <input
          type="file"
          className="
            file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-full
            file:text-white
            file:cursor-pointer
            file:shadow-lg file:shadown-blue600/50
            
            text-medium font-mono
            bg-gradient-to-br from-gray-600 to-gray-700
            text-white/80
            rounded-full
            cursor-pointer
            shadow-xl shadow-gray-700/60
            "
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
      </div>
      <div className="grid grid-cols-3 place-content-center mt-8 text-medium font-mono">
        {/*Lectura de rangoMax*/}
        <input
          placeholder="Rango max"
          type="number"
          onChange={(e) => {
            value.setRangoMax(parseInt(e.target.value));
          }}
        />

        {/*Lectura de rangoMin*/}
        <input
          placeholder="Rango min"
          type="number"
          onChange={(e) => {
            value.setRangoMin(parseInt(e.target.value));
          }}
        />

        {/*Lectura de vecinos*/}
        <input
          placeholder="Número de vecinos"
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
        
        <div>
        </div>

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
          {errorArchivo} <br/> {errorVecinos}
        </p>
      </div> 
      
      <div className="grid place-content-center">
      <button
          onClick={() => {
            setErrorArchivo("");
            setErrorVecinos("");

            if (!archivoData)
              setErrorArchivo(
                `Error, hay que seleccionar un archivo que contenga la matriz`
              );
            if (!numeroVecinos || numeroVecinos < 1)
              setErrorVecinos(
                `Error, el número de vecinos tiene que ser un valor mayor que 0`
              );
            if (archivoData && numeroVecinos) {
              let matriz = formateoMatriz(archivoData, value.rangoMax, value.rangoMin);
              value.setMatriz(matriz);

              let vecinos = generarVecinos(matriz, metrica);
              value.setVecinos(vecinos);

              let aux = resolverIncognitas(matriz, vecinos, numeroVecinos, prediccion);
              value.setIncognitasResueltas(aux.incognitasResueltas);
              value.setIndexMejVec(aux.mejoresVecinos);

              value.setEvaluacion(true);
            }
          }}
        >
        Mostrar
        </button>
      </div>
    </>
  );
}



/*Arreglamos la matriz de entrada*/
function formateoMatriz(archivoData, rangoMax, rangoMin) {
  // Separamos la matriz por \n
  let arraysTextoArchivoEspacios = archivoData.split("\n");
  let arraysTextoArchivo = [];
  // Quetamos los espacios
  for (let i = 0; i < arraysTextoArchivoEspacios.length - 1; i++) {
    arraysTextoArchivo.push(arraysTextoArchivoEspacios[i].split(" "));
  }

  let matriz = [];
  // pasamos los numeros que se encuentran en string a float y normalizamos los datos 
  // si nos encontramos un - lo sustituimos por -1
  for (let i = 0; i < arraysTextoArchivo.length; i++) {
    let aux = [];
    for (let j = 0; j < arraysTextoArchivo[i].length - 1; j++) {
      if (arraysTextoArchivo[i][j] === "-") aux.push(-1);
      else
        aux.push(
          (parseInt(arraysTextoArchivo[i][j], 10) - rangoMin) /
            (rangoMax - rangoMin)
        );
    }
    matriz.push(aux);
  }

  return matriz;
}



// Calculamso el indice de los mejores vecinos
function calcularIndexMejoresVecinos(matriz, posicion, arrayVecinos, numeroVecinos) {
  // ordenamos los vecinos de mayor a menor.
  let mayoresValores = arrayVecinos
    .slice()
    .sort(function (a, b) {
      return b - a;
    })
    .splice(0, arrayVecinos.length);

  let indexMejVal = [];
  // hacemos una copia de los valores de los vecinos.
  let copiaArrayVecinos = arrayVecinos.slice(0);

  // Sacamos tantos vecinos como el usuario haya indicado sin repetirlos
  for (let i = 0; i < mayoresValores.length - 1; i++) {
    for (let j = 0; j < copiaArrayVecinos.length; j++) {
      if (
        mayoresValores[i] === copiaArrayVecinos[j] &&
        matriz[j][posicion] !== -1 &&
        indexMejVal.length < numeroVecinos
      ) {
        indexMejVal.push(j);
        copiaArrayVecinos[j] = -1;
        break;
      }
    }
  }

  return indexMejVal;
}



// Realizamos la predicción.
function prediccionSimpleMedia(matriz, posicion, arrayVecinos, numeroVecinos, prediccion, usuarioIndex) {
  // calculamos los mejores vecinos.
  let indexMejVec = calcularIndexMejoresVecinos(matriz, posicion, arrayVecinos, numeroVecinos);
  let numerador = 0,
    denominador = 0;

  // Recorremos los vecinos y realizamos el calculo.
  for (let i = 0; i < indexMejVec.length; i++) {
    if (prediccion === "Predicción simple.")
      numerador +=
        arrayVecinos[indexMejVec[i]] * matriz[indexMejVec[i]][posicion];
    else
      numerador +=
        arrayVecinos[indexMejVec[i]] *
        (matriz[indexMejVec[i]][posicion] -
          calcularMedia(matriz[indexMejVec[i]]));
    denominador += Math.abs(arrayVecinos[indexMejVec[i]]);
  }
  console.log(prediccion);
  if (prediccion === "Predicción simple.") return ({valor : numerador / denominador,
                                     mejorVec: indexMejVec});
  return ({valor : calcularMedia(matriz[usuarioIndex]) + (numerador / denominador),
           mejorVec: indexMejVec});
}



// Resolvemos las incognitas que se encuentran en la matriz.
function resolverIncognitas(matriz, vecinos, numeroVecinos, prediccion) {
  let incognitasResueltas = [];
  let mejoresVecinos = [];

  // Recorremos la matriz y si encontramos un -1 aplicamos el metodo de predicción.
  for (let i = 0; i < matriz.length; i++) {
    let aux = [];
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] === -1) {
        let predic = prediccionSimpleMedia(matriz, j, vecinos[i], numeroVecinos, prediccion, i);
        aux.push(predic.valor);
        mejoresVecinos.push(predic.mejorVec);
      }
    }
    incognitasResueltas.push(aux);
  }

  return ({incognitasResueltas,
           mejoresVecinos})
}



// Calculamos los vecinos para cada usuario
function generarVecinos(matriz, metrica) {
  let vecinos = [];

  // Recorremos la matriz por fila y cuando nos encontrmos a algun vecino llamamos
  // a la metrica escogida. 
  for (let i = 0; i < matriz.length; i++) {
    let aux = [];
    for (let j = 0; j < matriz.length; j++) {
      if (i !== j) {
        console.log(metrica)
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
      } else {
        aux.push(-1);
      }
    }
    vecinos.push(aux);
  }

  return vecinos;
}



// Metrica euclidiana
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



// Metrica distancia coseno
function distanciaCoseno(usuario1, usuario2) {
  let numerador = 0,
    denominador1 = 0,
    denominador2 = 0;

  for (let i = 0; i < usuario1.length; i++) {
    if (usuario1[i] !== -1 && usuario2[i] !== -1) {
      numerador += usuario1[i] * usuario2[i];
      denominador1 += Math.pow(usuario1[i], 2);
      denominador2 += Math.pow(usuario2[i], 2);
    }
  }

  return numerador / (Math.sqrt(denominador1) * Math.sqrt(denominador2));
}



// Metrica correlación de Pearson.
function correlacionPearson(usuario1, media1, usuario2, media2) {
  let numerador = 0,
    denominador1 = 0,
    denominador2 = 0,
    correlacion = 0;

  for (let i = 0; i < usuario1.length; i++) {
    if (usuario1[i] !== -1 && usuario2[i] !== -1) {
      numerador += (usuario1[i] - media1) * (usuario2[i] - media2);
      denominador1 += Math.pow(usuario1[i] - media1, 2);
      denominador2 += Math.pow(usuario2[i] - media2, 2);
    }
  }

  correlacion = numerador / (Math.sqrt(denominador1) * Math.sqrt(denominador2));
  return (correlacion + 1) / 2;
}



// Calculamos la media sin tener en cuenta los valores nulos.
function calcularMedia(vector) {
  let sumatorio = 0,
    contador = 0;

  for (let i = 0; i < vector.length; i++) {
    if (vector[i] !== -1) {
      sumatorio += vector[i];
      contador++;
    }
  }

  return sumatorio / contador;
}