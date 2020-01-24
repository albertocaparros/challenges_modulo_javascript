console.log(
  'Playground preparado para entrega de challenges modulo Javascript!'
);

/* 1. Aplanando arrays */

/*
Apartado A
Dado un array multidimensional, construye una función inmutable que devuelva el mismo array aplanado, esto
es, con un único nivel de profundidad. Por ejemplo, el siguiente array:
const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];
quedaría aplanado como:
// [1, 2, 3, 4, 5, 6, 7, 8, 9] */

console.log('----------------------------------------------------------');
console.log('----------- EJERCICIO 1 - Aplanando arrays ---------------');
console.log('----------------------------------------------------------');
console.log('--------------------- APARTADO A -------------------------');
console.log('----------------------------------------------------------');
const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];

let aplanado = arrayMultidimensional => {
  return arrayMultidimensional.reduce(
    (acc, actual) =>
      //Si es un array, recursión. Si no, concatenamos al array actual que se está reduciendo
      Array.isArray(actual) ? acc.concat(aplanado(actual)) : acc.concat(actual),
    []
  );
};

console.log('El array original es: ');
console.log(sample);
console.log('El array aplanado es: ');
console.log(aplanado(sample));
console.log('----------------------------------------------------------');

/* Apartado B
¿Has resuelto el ejercicio anterior? Suponiendo que los arrays multidimensionales del ejercicio anterior no
serán de naturaleza mixta, es decir, sus elementos siempre serán del mismo tipo ¿Serías capaz de proporcionar
un tipado adecuado a dicha función de aplanamiento? */
console.log('--------------------- APARTADO B -------------------------');
console.log('----------------------------------------------------------');

let aplanadoTipado = (arrayMultidimensional: number[]): number[] => {
  return arrayMultidimensional.reduce(
    (acc, actual) =>
      Array.isArray(actual)
        ? acc.concat(aplanadoTipado(actual))
        : acc.concat(actual),
    []
  );
};

console.log('El array original es: ');
console.log(sample);
console.log('El array aplanado es: ');
console.log(aplanado(sample));
console.log('----------------------------------------------------------');
console.log('----------------------------------------------------------');
console.log('------- EJERCICIO 2 - Acceso en profundidad --------------');
console.log('----------------------------------------------------------');
console.log('--------------------- APARTADO A -------------------------');
console.log('----------------------------------------------------------');

/* Implementa un mecanismo deepGet para acceder en profundidad a objetos anidados, de modo que podamos
recuperar una propiedad en cualquiera de sus niveles. Mira a continuación el comportamiento que debería
seguir: */

const myObject = {
  a: 1,
  b: {
    c: null,
    d: {
      e: 3,
      f: {
        g: 'bingo'
      }
    }
  }
};
const deepGet = (object, ...properties) => {
  if (properties.length === 0) return object;
  else if (properties.length === 1) return object[properties[0]];
  else {
    //Mientras haya propiedades vamos accediendo cada vez mas profundo con slice y recursión
    let newProperties = properties.slice(1, properties.length);
    return deepGet(object[properties[0]], ...newProperties);
  }
};

console.log("deepGet de 'x'", deepGet(myObject, 'x')); // undefined
console.log("deepGet de 'a'", deepGet(myObject, 'a')); // 1
console.log("deepGet de 'b'", deepGet(myObject, 'b')); // { c: null, d: {....}}
console.log("deepGet de 'b', 'c'", deepGet(myObject, 'b', 'c')); // null
console.log(
  "deepGet de 'b', 'd', 'f', 'g'",
  deepGet(myObject, 'b', 'd', 'f', 'g')
); // bingo
console.log('deepGet sin parametro', deepGet(myObject)); // {a: 1, b: {...}}

console.log('----------------------------------------------------------');
console.log('--------------------- APARTADO B -------------------------');
console.log('----------------------------------------------------------');

/* Ahora implementa el complementario, deepSet , que permita guardar valores en profundidad. Su
comportamiento debería ser:
 */

const myObject2 = {};

const deepSet = (value, object, ...properties: Array<string>) => {
  //Si no hay propiedades, Do nothing
  if (properties.length > 0) {
    //Recorremos propiedades
    while (properties.length - 1) {
      var property0 = properties.shift(); //Tomamos la propiedad en 0 y la eliminamos de properties, recorriendo el array hacia adelante
      if (!(property0 in object)) {
        object[property0] = {}; //Si no existe, asignamos objeto vacio
      }
      object = object[property0]; //Asignamos el objeto ya existente, o el nuevo vacio recien creado
    }

    object[properties[0]] = value; //Asignamos el valor a la ultima propiedad del array que hemos ido reduciendo hacia adelante
  }
};

deepSet(1, myObject2, 'a', 'b');
console.log('CASO 1', JSON.stringify(myObject2)); // {a: { b: 1}}
deepSet(2, myObject2, 'a', 'c');
console.log('CASO 2', JSON.stringify(myObject2)); // {a: { b: 1, c: 2}}
deepSet(3, myObject2, 'a');
console.log('CASO 3', JSON.stringify(myObject2)); // {a: 3}
deepSet(4, myObject2);
console.log('CASO 4', JSON.stringify(myObject2)); // Do nothing // {a: 3}

console.log('----------------------------------------------------------');
console.log('----------------------------------------------------------');
console.log('------------------- EJERCICIO 3 - Árbol ------------------');
console.log('------------------- Respuesta en código! ------------------');
console.log('----------------------------------------------------------');
/* ¿Cómo generarías con TypeScript un tipado para estructuras en forma de árbol? Un árbol es una estructura
que parte de un nodo raiz, a partir del cual salen más nodos. Cada nodo en un árbol puede tener hijos (más
nodos) o no tenerlos (convirtiendose en un nodo final o una "hoja"). */

interface Arbol<T> {
  value: T;
  node: Array<Arbol<T>>;
}

console.log('----------------------------------------------------------');
console.log('----------- EJERCICIO 4 - Trazas por consola -------------');
console.log('----------------------------------------------------------');
/* Las trazas resultante en consola son:
first;
second;
third;
El ejercicio consiste en reordenar las trazas para que se muestren invertidas, es decir, con el siguiente orden:
third;
second;
first;
Pero para ello tan solo podrás modificar la función run .
Queda prohibido modificar cualquier otro código asi como el contenido de triggers . */

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const showMessage = async ([time, message]) => {
  await delay(time);
  console.log(message);
};
const triggers = [
  async () => await showMessage([200, 'third']),
  async () => await showMessage([100, 'second'])
];
const run = async (triggers: Array<any>) => {
  for (let trigger of triggers) {
    await trigger();
  }
  console.log('first');
};

//Está puesto así para que quede bien el log de consola
run(triggers).then(() => {
  console.log('----------------------------------------------------------');
  console.log('------------------ EJERCICIO 5 - Memoization -------------');
  console.log('----------------------------------------------------------');
  console.log('----------------------------------------------------------');
  console.log('--------------------- APARTADO A y B ----------------------');
  console.log('----------------------------------------------------------');
  /* 
Implementa un mecanismo de memoización para funciones costosas y tipalo con TypeScript. La memoización
optimiza sucesivas llamadas del siguiente modo: */
  const expensiveFunction = () => {
    console.log('Una única llamada');
    return 3.1415;
  };

  let x = expensiveFunction();
  const memoize = f => (x ? x : f());

  const memoized = () => memoize(expensiveFunction);
  console.log(memoized()); // Una única llamada // 3.1415
  console.log(memoized()); // 3.1415
  console.log(memoized()); // 3.1415

  console.log('----------------------------------------------------------');
  console.log('--------------------- APARTADO C -------------------------');
  console.log('----------------------------------------------------------');
  /* Contempla ahora la posibilidad de que la función a memoizar pueda tener argumentos. Por simplicidad
supongamos sólo argumentos primitivos: string , number o boolean y que no sean undefined . ¿Podrías
hacer una versión aceptando argumentos? ¿Cómo la tiparías con TS? Un ejemplo de comportamiento podría
ser: */

  let count = 0; // Comprobacion de nº de ejecuciones
  const repeatText = (repetitions: number, text: string): string => (
    count++, `${text} `.repeat(repetitions).trim()
  );
  let cache = new WeakMap();

  const memoize2 = (f: Function) => {
    var cache = {};
    return (rep, text) => {
      var key = JSON.stringify(rep, text);
      if (cache[key]) return cache[key];
      else {
        let funcion = f(rep, text);
        cache[key] = funcion;
        return funcion;
      }
    };
  };

  const memoizedGreet = memoize2(repeatText);
  console.log(memoizedGreet(1, 'pam')); // pam
  console.log(memoizedGreet(3, 'chun')); // chun chun chun
  console.log(memoizedGreet(1, 'pam')); // pam
  console.log(memoizedGreet(3, 'chun')); // chun chun chun
  console.log(count); // 2
});
