import { useContext} from "react";
import {DataContext} from "../context/DataContext"

export function Resultado() {

  const value = useContext(DataContext);

  // Mostrar calculo predictivo y los vecinos utilizados.
  const vecCal = vecinosCalculo(value.incognitasResueltas, value.indexMejVec)
    .map((cadena) => 
    <text>{cadena}<br/></text>
    );


  // Mostrar similitud entre los vecinos
  const similaridad = value.vecinos.map((valor, index) => {
    return(
      <>
      <text>Para el usuario {index + 1}<br/></text>
      {valor.map((subValor, subIndex) => {
        if (subValor !== -1)
        return <text>El vecino {subIndex + 1} tiene una similaridad de {subValor.toFixed(3)}<br></br></text>
      })}
      </>
    )
  });


  // Imprimir la matriz.
  const mostrarMatriz = matrizTexto(value.matriz, value.incognitasResueltas, value.rangoMax, value.rangoMin)
    .split('\n')
    .map((cadena) =>
    <text>{cadena}<br/></text>
    );
    

  // Si todo los datos están bien.
  if (value.matriz.length > 0  && value.vecinos.length > 0 && 
      value.indexMejVec.length > 0 && value.incognitasResueltas.length > 0) {
    return (
      <>
        <h2>Matriz con los elementos faltantes</h2>
        <p>{mostrarMatriz}</p>
        <h2>Simililaridad entre los diferentes usuarios</h2>
        <p>{similaridad}</p>
        <h2>Cálculos de las predicciones y vecinos utilizados</h2>
        <p>{vecCal}</p>
      </>
    );
  }

  // Si hay algun dato mal y se ha hecho el calculo
  else if (value.evaluacion) {
    return (
      <>
         <h1>Hola</h1> 
      </>
    );
  }

  // Si no se ha realizado el calculo.
  return (
    <>
    <h1>mal</h1> 
    </>
  );
}

// funcion que rellena la matriz.
function matrizTexto(matriz, valores, rangoMax, rangoMin) {
  let contador = 0;
  let cadena = "";

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] !== -1) {
        cadena += (matriz[i][j] * (rangoMax - rangoMin) + rangoMin).toString() + " ";
      } 
      else {
        cadena += (valores[i][contador] * (rangoMax - rangoMin) + rangoMin).toFixed(3).toString() + " ";
        contador++;
      }
    }
    cadena += `\n`;
    contador = 0;
  }

  return cadena;
}



function vecinosCalculo (calculo, indexVecinos) {
  let contador = 0;
  let resultado = [];
  let cadena = "";

  for (let i = 0; i < calculo.length; i++) {
    cadena = "Para el usuario " + (i + 1).toString() + ":";
    resultado.push(cadena); 
    for (let j = 0; j < calculo[i].length; j++) {
      cadena = "El valor " + calculo[i][j].toFixed(3).toString() + " fue calculado utilizando los vecinos ";
      for (let z = 0; z < indexVecinos[contador].length; z++) {
        cadena += (indexVecinos[contador][z] + 1).toString() + " "
      }
      contador++;
      resultado.push(cadena);
    }
  }

  return resultado;
}