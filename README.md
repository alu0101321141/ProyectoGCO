# Gestión del conocimiento en las organizaciones
## Sistemas de recomendación. Métodos de Filtrado Colaborativo
---
### Despliegue de la aplicación web:
En el siguiente enlace se puede ver la aplicación desarrolla desplegada utilizando Vercel.
[Despliegue de la web](https://gco-deploy.vercel.app/)

---
### Autores:
* Alejandro Lugo Fumero         | alu0101329185
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

### Herramientas 

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

---

### Ejemplo de uso
En la siguiente imagen se puede ver la aplicación web nada más acceder a ella.

![Imagen web inicio](/img/inicio.png)

La aplicación se divide en diferentes partes:
1. En la zona del recuadro naranja podemos seleccionar las diferentes matrices.
2. En la zona de los recuadros amarillos selecionaremos el mayor valor de nuestros datos, el menor y el número de vecinos que utilizaremos para las predicciones.
3. En la zona del recuadro azul seleccionaremos la metrica a utilizar.
4. En la zona del recuadro rojo seleccionaremos la predicción a utilizar.
5. En la zona del recuadro rosado ejecutaremos el filtrado colaborativo.

Una vez ejecutado el filtrado colaborativo nuestra página se extenderá hacia abajo mostrando la información que podemos ver en la siguiente imagen.

![Imagen web datos](/img/datos.png)

La imagen anterior se devide en 2 partes:
1. En la zona del recuadro morado podemos ver la matriz introducida anteriormente rellena con los resultados del filtrado colaborativo.
2. En la zona del recuadro marrón podemos ver diferente información, entre ella se encuentra: 
    - La similaridad entre cada usuario y sus vecinos de acuerdo a la métrica elegida.
    - Los vecinos seleccionados en el proceso de predicción.
    - El cálculo de cada predicción de la matriz de utilidad en base a los vecinos seleccionados.
