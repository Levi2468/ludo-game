export const COLORS = [
  "green",
  "red",
  "blue",
  "yellow",
];

export const COLOR_HEX = {
  green: "#21d96b",
  red: "#ff4055",
  blue: "#329cff",
  yellow: "#ffd52a",
};

export const PLAYER_START = {
  green: 0,
  red: 13,
  blue: 26,
  yellow: 39,
};

/*
  52 cells around the outside board.

  Coordinates use:

  row = 0 → 14
  col = 0 → 14
*/

export const MAIN_PATH = [
  // Green side
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],

  [5, 6],
  [4, 6],
  [3, 6],
  [2, 6],
  [1, 6],

  [0, 6],
  [0, 7],
  [0, 8],

  // Red side
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 8],
  [5, 8],

  [6, 9],
  [6, 10],
  [6, 11],
  [6, 12],
  [6, 13],
  [6, 14],

  [7, 14],
  [8, 14],

  [8, 13],
  [8, 12],
  [8, 11],
  [8, 10],
  [8, 9],

  // Blue side
  [9, 8],
  [10, 8],
  [11, 8],
  [12, 8],
  [13, 8],
  [14, 8],

  [14, 7],
  [14, 6],

  [13, 6],
  [12, 6],
  [11, 6],
  [10, 6],
  [9, 6],

  // Yellow side
  [8, 5],
  [8, 4],
  [8, 3],
  [8, 2],
  [8, 1],
  [8, 0],

  [7, 0],
  [6, 0],
];

export const SAFE_CELLS = [
  0,
  8,
  13,
  21,
  26,
  34,
  39,
  47,
];

/*
  Home lanes.

  Each color has 6 final cells leading
  toward the center.
*/

export const HOME_PATHS = {
  green: [
    [6, 6],
    [6, 7],
  ],

  red: [
    [7, 8],
    [7, 7],
  ],

  blue: [
    [8, 8],
    [8, 7],
  ],

  yellow: [
    [7, 6],
    [7, 7],
  ],
};

export const BASE_POSITIONS = {
  green: [
    [2, 2],
    [2, 4],
    [4, 2],
    [4, 4],
  ],

  red: [
    [2, 10],
    [2, 12],
    [4, 10],
    [4, 12],
  ],

  blue: [
    [10, 10],
    [10, 12],
    [12, 10],
    [12, 12],
  ],

  yellow: [
    [10, 2],
    [10, 4],
    [12, 2],
    [12, 4],
  ],
};

export const CENTER_CELL = [7, 7];