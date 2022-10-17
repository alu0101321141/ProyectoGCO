import { useState } from "react";

export function Datos() {
  const [archivoData, setArchivoData] = useState();
  const [numeroVecinos, setNumeroVecinos] = useState();
  const [metrica, setMetrica] = useState("Correlación de Pearson.");
  const [prediccion, setPrediccion] = useState("Predicción simple.");

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
          console.log(archivoData);
          console.log(numeroVecinos);
          console.log(metrica);
          console.log(prediccion);
        }}
      >
        Mostrar
      </button>
    </>
  );
}
