const database = [
  {
    id: "1",
    name: "Nathan",
    username: "nathan@example.com",
    password: "12345",
  },
].reduce((map, row) => {
  map.add(row.id, row);
}, new Map());
