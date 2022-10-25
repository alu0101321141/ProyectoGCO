# Gestión del conocimiento en las organizaciones
## Sistemas de recomendación. Métodos de Filtrado Colaborativo
---
### Autores:
* Alejandro Lugo Fumero         | alu0101339185
* Vlatko Jesús Marchán Sekulic  | alu0101321141
* Nicolas Vegas Rodriguez       | alu0101321745

---

### Introducción

En la práctica se nos propone implementar un sistema de recomendación siguiendo el método de filtrado colaborativo. 

Para ello se desarolló una aplicación web en la que tendremos los siguientes elementos

* Obtener de un archivo la matriz con los datos de los items y usuarios.
* Multiopción para elegir el tipo de métrica a utilizar.
* Número de vecinos considerado.
* Tipos de predicción a utilizar.

---

### Heramientas 

Para el desarrollo de la práctica se utilizaron las siguientes herramientas:

* __Vscode__: editor de código fuente desarrollado por Microsoft para Windows, Linux, macOS y Web.

* __Visual Studio Live Share__: extensión del visual estudio code para el desarrollo colaborativo de código en tiempo real.

* __Git__: software de control de versiones.

* __React__: biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.

* __Vite__: Herramienta de frontend que para crear proyectos de forma agnóstica (sin atarte a ningún framework concreto) y que su desarrollo y construcción final sea lo más sencilla y cómoda posible.

* __Tailwind CSS__: Tailwind CSS es un framework de CSS de código abierto​ para el diseño de páginas web.

---

### Explicación del código.

* __index.html:__ Estructura HTML del projecto donde se definirán las dependencias de React y tailwind CSS así como los elementos básicos de html como el `head` , `body` y `footer`.

* __main.jsx:__ Se corresponde con nuestro fichero principal donde llamaremos a nuestros componentes en el orden apropiado para generar nuestra página web con una estructura determinada.

* __DataContext.jsx:__ Declaramos las variables globales que se compartirán con el resto de la aplicación. Podemos destacar el uso del hook `useState()` para el tracking de dichas variables a lo largo de la ejercución del programa.

* __Datos.jsx:__ En este fichero estarán todos nuestros componentes en lo referente a la toma inicial de datos, un ejemplo sería:

```js
        <select
          className="
          bg-gradient-to-br from-slate-50 to-slate-400
          m-2 h-8
          rounded-md
          text-center
          cursor-pointer
          shadow-xl shadow-gray-700/60
          "
          onChange={(e) => {
            setMetrica(e.target.value);
          }}
        >
          <option>Correlación de Pearson.</option>
          <option>Distancia coseno.</option>
          <option>Distancia Euclídea.</option>
        </select>
```

Adicionalmente, podemos destacar la presencia de funciones fundamentales para el procesado de dichos datos como:

> `function formateoMatriz()`: Se encarga del formateo de la matriz introducidad por el input file correspondiente, estos se pueden encontrar en: [matrices de prueba](./examples-utility-matrices/) 

> `function generarVecinos()`: Genera los vecinos de cada elemento teniendo en cuenta que si alguno de los vecinos tiene una incógnita se descarta.

> `function calcularIndexMejoresVecinos()`: Se encarga de calcular los índices de los mejores vecinos. 

> `function calcularMedia()`: Calcula la media dado un vector sin tener en cuenta los valores nulos.

> `function prediccionSimpleMedia()`: Se encarga de calcular la predicción dependiendo del valor seleccionado, ya sea simple o cáculo con la media.

> `function resolverIncognitas()`: Resuelve las incógnitas de nuestra matriz inicial. 

> Dentro del cálculo final tenemos distintas posibles métricas y para ello tenemos las 3 funciones correspondientes a cada una: `distanciaEuclidiana()` `distanciaCoseno()` `correlacionPearson()`

* __Resultado.jsx:__ En este fichero nos centramos en la muestra de resultados después del cálculo realizado anteriormente.
