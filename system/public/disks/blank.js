// Blank, 2021.11.28.03.04

// 🥾 Boot (Runs once before first paint and sim)
function boot({ resize }) {
  // TODO: Runs only once!
  // resize(50, 20);
}

// 🧮 Sim(ulate) (Runs once per logic frame (120fps locked)).
function sim($api) {
  // TODO: Move a ball here!
}

// 🎨 Paint (Runs once per display refresh rate)
function paint({ wipe, num: { randInt: r }, screen }) {
  wipe(0);
  // wipe(r(255), r(255), r(255)).ink(0).line(0, 0, screen.width, screen.height);
}

// ✒ Act (Runs once per user interaction)
function act({ event }) {
  // console.log(event);
}

// 💗 Beat (Runs once per bpm)
function beat($api) {
  // TODO: Play a sound here!
}

// 📚 Library (Useful classes & functions used throughout the piece)
// ...

export { boot, sim, paint, act, beat };
