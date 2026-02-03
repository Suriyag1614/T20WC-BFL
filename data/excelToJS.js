import fs from "fs";
import path from "path";

// input & output paths
const inputFile = path.join("data", "players.txt");
const outputFile = path.join("data", "players.js");

// read excel-pasted data
const raw = fs.readFileSync(inputFile, "utf8");

// split lines
const lines = raw.trim().split("\n");
const headers = lines[0].split("\t").map(h => h.trim());

// convert to JS objects
const players = lines.slice(1).map(line => {
  const values = line.split("\t");
  const obj = {};

  headers.forEach((key, i) => {
    let value = values[i]?.trim();

    // auto-number conversion
    if (value !== "" && !isNaN(value)) {
      value = Number(value);
    }

    obj[key] = value;
  });

  return obj;
});

// write JS file
const output =
`// AUTO-GENERATED FILE – DO NOT EDIT
// Generated from players.txt

const players = ${JSON.stringify(players, null, 2)};

export default players;
`;

fs.writeFileSync(outputFile, output);

console.log("✅ players.js generated successfully!");
