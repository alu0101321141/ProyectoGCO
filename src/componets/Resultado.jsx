import { useContext, useState } from "react";
import {DataContext} from "../context/DataContext"

export function Resultado() {

  const value = useContext(DataContext);

  // Si todo los datos están bien.
  if (value.matriz.length > 0  && value.vecinos.length > 0 && 
      value.indexMejVec.length > 0 && value.incognitasResueltas.length > 0) {
    return (
      <>
        <p>{matrizTexto(value.matriz, value.incognitasResueltas)}</p>
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

function matrizTexto(matriz, valores) {
  let contador = 0;
  let cadena = "";

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] !== -1) cadena += matriz[i][j].toString() + " ";
      else {
        cadena += valores[i][contador].toString() + " ";
        contador++;
      }
    }
    cadena += `\n`;
    contador = 0;
  }

  console.log(cadena);
  return cadena;
}