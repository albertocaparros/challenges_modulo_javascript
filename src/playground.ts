console.log(
  'This is your playground, experiment with TS code and check the console'
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

let aplanadoTipado = (arrayMultidimensional: Array<number>) => {
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

const deepSet = (value, object, ...properties) => {
  if (properties.length === 0) return object;
  else if (properties.length === 1) return (object[properties[0]] = value);
  else {
    let newProperties = properties.slice(1, properties.length);
    return deepSet(value, object, ...newProperties);
  }
};

deepSet(1, myObject2, 'a', 'b');
console.log(JSON.stringify(myObject2)); // {a: { b: 1}}
deepSet(2, myObject2, 'a', 'c');
console.log(JSON.stringify(myObject2)); // {a: { b: 1, c: 2}}
deepSet(3, myObject2, 'a');
console.log(JSON.stringify(myObject2)); // {a: 3}
deepSet(4, myObject2);
console.log(JSON.stringify(myObject2)); // Do nothing // {a: 3}
