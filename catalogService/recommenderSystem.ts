import { Car } from "@prisma/client";
import { json } from "stream/consumers";

const tokenize = (string: any) => {
  var tokens = [];
  for (var i = 0; i < string.length - 1; i++) {
    tokens.push(string.substr(i, 2));
  }

  return tokens.sort();
};

const intersect = (a: any, b: any) => {
  var ai = 0,
    bi = 0;
  var result = new Array();

  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++;
    } else if (a[ai] > b[bi]) {
      bi++;
    } /* they're equal */ else {
      result.push(a[ai]);
      ai++;
      bi++;
    }
  }

  return result;
};

const sum = (items: []) => {
  var sum = 0;
  for (var i = 0; i < items.length; i++) {
    sum += items[i];
  }

  return sum;
};

const wordSimilarity = (a: string, b: string) => {
  var left = tokenize(a);
  var right = tokenize(b);
  var middle = intersect(left, right);

  return (2 * middle.length) / (left.length + right.length);
};

const yearSimilarity = (a: any, b: any) => {
  var maxAge = 2024;
  var diff1 = maxAge - a;
  var diff2 = maxAge - b;
  var diff = Math.abs(diff2 - diff1);
  var distance = diff / maxAge;

  return 1 - distance;
};
const numberSimilarity = (a: any, b: any) => {
  var maxAge = 100000;
  var diff1 = maxAge - a;
  var diff2 = maxAge - b;
  var diff = Math.abs(diff2 - diff1);
  var distance = diff / maxAge;

  return 1 - distance;
};

const recordSimilarity = (a: any, b: any) => {
  var fields = [
    { name: "make", measure: wordSimilarity },
    { name: "model", measure: wordSimilarity },
    { name: "year", measure: yearSimilarity },
    { name: "milage", measure: numberSimilarity },
    { name: "price", measure: numberSimilarity },
    { name: "type", measure: wordSimilarity },
  ];

  var sum = 0;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var name = field.name;
    var measure = field.measure;
    var sim = measure(a[name], b[name]);

    sum += sim;
  }

  return sum / fields.length;
};

export default (items: any, query: any) => {
  const fitlered = items.filter((item: Car) => item.id != query.id);
  var maxSim = 0;
  var result = null;
  const map = new Map();
  for (var i = 0; i < fitlered.length; i++) {
    var item = fitlered[i];
    var sim = recordSimilarity(item, query);
    map.set(item, sim);
    if (sim > maxSim) {
      maxSim = sim;
      result = item;
    }
  }
  return { top: result, map: [...map.entries()] };
};
