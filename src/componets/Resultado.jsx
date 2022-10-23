import { useContext} from "react";
import {DataContext} from "../context/DataContext"

export function Resultado() {

  const value = useContext(DataContext);

  // Mostrar calculo predictivo y los vecinos utilizados.
  const vecCal = vecinosCalculo(value.incognitasResueltas, value.indexMejVec, value.rangoMax, value.rangoMin)
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
        return <text>El vecino {subIndex + 1} tiene una similaridad de {subValor.toFixed(3)} sobre 1<br></br></text>
      })}
      </>
    )
  });


  // Imprimir la matriz.
  const mostrarMatriz = matrizTexto(value.matriz, value.incognitasResueltas, value.rangoMax, value.rangoMin)
    .trim()
    .split('\n')
    .map((cadena) =>
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      { 
        cadena.trim().split(" ").map((cadena2) => 
          <td className= "py-4 px-6">
            {cadena2}
          </td>
        )
      }
    </tr>
    );
    

  // Si todo los datos están bien.
  if (value.matriz.length > 0  && value.vecinos.length > 0 && 
      value.indexMejVec.length > 0 && value.incognitasResueltas.length > 0) {
    return (
      <>
        <div className="mb-20 bg-white text-center text-black rounded-3xl">
        <div className="p-5">
          <p className="font-mono font-bold text-xl">Matriz con los elementos faltantes</p>
          <div class="max-w-3xl  max-h-screen overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              {mostrarMatriz}
            </table>
          </div>
          <p className="font-mono font-bold text-xl"><br/>Simililaridad entre los diferentes usuarios</p>
          <p>{similaridad}</p>
          <p className="font-mono font-bold text-xl"><br/>Cálculos de las predicciones y vecinos utilizados</p>
          <p>{vecCal}</p>
        </div>
      </div>
      </>
    );
  }

  // Si hay algun dato mal y se ha hecho el calculo
  else if (value.evaluacion) {
    return (
      <>
         <p className="mb-10 text-center text-red-400 rounded-md">
          Porfavor, revise los datos introducidos e intentelo de nuevo.
          </p>
      </>
    );
  }
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



function vecinosCalculo (calculo, indexVecinos, rangoMax, rangoMin) {
  let contador = 0;
  let resultado = [];
  let cadena = "";

  for (let i = 0; i < calculo.length; i++) {
    cadena = "Para el usuario " + (i + 1).toString() + ":";
    resultado.push(cadena); 
    for (let j = 0; j < calculo[i].length; j++) {
      cadena = "El valor " + (calculo[i][j] * (rangoMax - rangoMin) + rangoMin).toFixed(3).toString() + " fue calculado utilizando los vecinos ";
      for (let z = 0; z < indexVecinos[contador].length; z++) {
        cadena += (indexVecinos[contador][z] + 1).toString() + " "
      }
      contador++;
      resultado.push(cadena);
    }
  }

  return resultado;
}