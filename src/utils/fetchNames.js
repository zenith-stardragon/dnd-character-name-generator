const fetchNames = async (letter, sheetId) => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`
  );
  const data = await response.text();
  const json = JSON.parse(data.substr(47).slice(0, -2));

  const columnIndex = letter === 'Random' ? -1 : letter.charCodeAt(0) - 65;

  if (columnIndex === -1) {
    return json.table.rows.slice(1).reduce((names, row) => {
      row.c.forEach((cell) => {
        if (cell !== null) names.push(cell.v);
      });
      return names;
    }, []);
  }

  return json.table.rows
    .slice(1)
    .filter((row) => row.c[columnIndex] !== null)
    .map((row) => row.c[columnIndex].v);
};

export default fetchNames;