import { createContext, useState} from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {

  const [matriz, setMatriz] = useState([]);
  const [vecinos, setVecinos] = useState([]);
  const [indexMejVec, setIndexMejVec] = useState([]);
  const [incognitasResueltas, setIncognitasResueltas] = useState([]);

  const [evaluacion, setEvaluacion] = useState(false);

  const [rangoMax, setRangoMax] = useState();
  const [rangoMin, setRangoMin] = useState();

  return( <DataContext.Provider value={{
    vecinos,
    setVecinos,
    matriz,
    setMatriz,
    indexMejVec,
    setIndexMejVec,
    incognitasResueltas,
    setIncognitasResueltas,
    evaluacion,
    setEvaluacion,
    rangoMax,
    setRangoMax,
    rangoMin,
    setRangoMin
  }}> {props.children} </DataContext.Provider>);
}