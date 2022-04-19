// DIGITPAIN 3

let frameProgress = 0;
let frameTime = 3;
let frame = 0;
const frames = { count: 4, loaded: false, images: [] };

// 🥾 Boot
async function boot({ net: { preload }, cursor, resize, help: { repeat } }) {
  cursor("native");
  resize(1000, 1250);
  // Preload all images.
  repeat(frames.count, (n) => {
    preload(`disks/digitpain/3/${n}.webp`).then((img) => {
      frames.images[n] = img;
      // Set the `loaded` flag if everything is finished.
      frames.loaded = frames.images.reduce((n) => n + 1, 0) === frames.count;
    });
  });
}

// 🎨 Paint
function paint({ wipe, paste, num: { randIntRange: r }, help: { choose } }) {
  if (frames.loaded) {
    wipe(r(168, 188), r(168, 188), r(168, 188)).paste(frames.images[frame], 0, 0);
  }
}

// 🧮 Sim
function sim({ help: { choose } }) {
  if (frames.loaded) {
    frameProgress += 1;
    if (frameProgress >= frameTime) {
      frameProgress = 0;
      frame = (frame + 1) % frames.count;
    }
  }
}

export { boot, paint, sim };