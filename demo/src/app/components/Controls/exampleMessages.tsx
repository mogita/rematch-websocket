/**
 * JSON.stringify sugar.
 */
const stringify = (input: any) => JSON.stringify(input, null, 2);

export default [
  {
    name: 'Array',
    value: stringify([
      {
        name: 'Jane',
        age: 26,
        sex: 'F',
        created: new Date(),
      },
      {
        name: 'John',
        age: 25,
        sex: 'M',
        created: new Date(),
      },
    ]),
  },
  {
    name: 'Date',
    value: stringify(new Date()),
  },
  {
    name: 'Object',
    value: stringify({
      name: 'John',
      age: 25,
      sex: 'M',
      created: new Date(),
    }),
  },
  {
    name: 'String',
    value: stringify(Math.random().toString(36).substring(2)),
  },
];
