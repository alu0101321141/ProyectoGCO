import React from 'react'
import ReactDOM from 'react-dom/client'
import {Datos} from './componets/Datos'
import { Resultado } from './componets/Resultado'
import {DataContextProvider} from "./context/DataContext"


ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="gap-4">
    <DataContextProvider>
      <Datos/>
      <Resultado/>
    </DataContextProvider>
  </div>
)
