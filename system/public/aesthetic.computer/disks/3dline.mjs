// 3D Line, 22.10.05.11.01
// A test for developing software (and hardware) rasterized 3D lines
// and other geometry.

let cam, dolly; // Camera system.
let floor, cross, tri, triTop, drawing; // Geometry.
let race, tail, tail2; // Lazy line control with preview lines.

let client; // Network.

// *** Markmaking Configuration ***
const step = 0.025; // Step size of regulated line / minimum cut-off.
const smoothing = true; // Use a lazy moving cursor, or normal quantized lines.
const quantizedSmoothing = true; // Regulate all segments while still smoothing.
const speed = 20; // Only used if smoothing is true.

let colorParams = [0, 0, 0, 0];

let W, S, A, D, UP, DOWN, LEFT, RIGHT;

// 🥾 Boot
async function boot({
  painting: p,
  Camera,
  Dolly,
  Form,
  QUAD,
  TRI,
  LINE,
  geo: { Race, Quantizer },
  params,
  store,
  net,
}) {
  // Connect to the network.
  client = net.socket((id, type, content) => {
    // Instantiate painters (clients) based on their `id` attribute.
    //painters[id] = painters[id] || new Painter(id);
    // Record the action.
    //actions.push({ id, type, content });
    //console.log(content);

    // Just in case we are sending messages to "everyone" / receiving our
    // own messages.
    if (client.id !== id) drawing.addPoints(content); // Add points locally.

    //console.log(id, type, content);
  });

  colorParams = params.map((str) => parseInt(str)); // Set params for color.

  cam = new Camera(80, { z: 4 }); // camera with fov
  dolly = new Dolly(cam); // moves the camera

  race =
    smoothing === true
      ? new Race({ step, speed, quantized: quantizedSmoothing })
      : new Quantizer({ step });

  floor = new Form(
    QUAD,
    { tex: p(2, 2, (g) => g.wipe(0, 0, 100)) },
    { pos: [0, -1, 1], rot: [-90, 0, 0], scale: [3, 3, 3] }
  );

  cross = new Form(
    QUAD,
    { tex: p(4, 4, (g) => g.noise16DIGITPAIN()) },
    { pos: [0, -0.99, 1], rot: [-90, 0, 0] }
  );

  tri = new Form(
    TRI,
    { tex: p(1, 8, (g) => g.noise16DIGITPAIN()), alpha: 0.75 },
    { pos: [0, 0, 1] }
  );

  triTop = new Form(LINE, { pos: [0, 1, 1] });

  // An empty buffer that gets populated in `sim()`.

  // Load a drawing from RAM if it already exists, or from the indexedDB,
  // otherwise start an empty one.
  const stored = (store["3dline:drawing"] =
    store["3dline:drawing"] ||
    (await store.retrieve("3dline:drawing", "local:db")));

  drawing = new Form(
    {
      type: "line:buffered",
      vertices: stored?.vertices,
      indices: stored?.indices,
    },
    { color: [255, 255, 255, 255] }
  );
}

// 🎨 Paint (Executes every display frame)
function paint({ ink, wipe, screen, Form }) {
  // The lines & the furnitue.
  ink(0, 255, 0, 255).form([floor, cross, tri, triTop, drawing], cam);

  // Crosshair
  // TODO: Do a dirty box wipe here / use this to test the new compositor? 🤔
  // Tip of drawn line.

  // console.log(tail?.vertices[0], tail?.vertices[1])
  // ink(255, 0, 0).form(tail2, cam, { keep: false });
  wipe(10, 0)
    .ink(200, 0, 0, 255)
    .circle(...screen.center, 9);

  // I'm rendering multiple times before simming again, which means tail
  ink(...colorParams).form(
    new Form({ type: "line", positions: tail, keep: false }, { alpha: 1 }),
    cam
  );

  ink(255, 0, 0).form(
    new Form({ type: "line", positions: tail2, keep: false }, { alpha: 1 }),
    cam
  );
}

// 🧮 Sim(ulate) (Runs once per logic frame (120fps locked)).
function sim({ pen, Form, color, num: { dist3d, randIntRange: rr } }) {
  // First person camera controls.
  let forward = 0,
    strafe = 0;

  if (W) forward = -0.004;
  if (S) forward = 0.004;
  if (A) strafe = -0.004;
  if (D) strafe = 0.004;
  if (W || S || A || D) dolly.push({ x: strafe, z: forward });

  if (UP) cam.rotX += 1;
  if (DOWN) cam.rotX -= 1;
  if (LEFT) cam.rotY += 1;
  if (RIGHT) cam.rotY -= 1;

  dolly.sim(); // Move the camera.

  // Rotate some scenery.
  tri.turn({ y: -0.25 });
  triTop.turn({ x: -0.5, y: 0.5, z: 0.2 });

  // 🖱️ Add to the drawing.
  if (pen.drawing && pen.device === "mouse" && pen.button === 0) {
    const path = race.to(cam.center);
    if (!path) return;

    if (path.out?.length > 0) {
      const colors = [];
      path.out.forEach((p) => {
        const vertexColor = color(...colorParams);
        colors.push(vertexColor, vertexColor);
      });

      // Add points locally.
      drawing.addPoints({ positions: path.out, colors });

      // Send vertices to the cloud.
      client.send("add", {
        positions: path.out.map((vertex) => [...vertex]),
        colors,
      });
    }

    if (dist3d(path.last, path.current)) tail = [path.last, path.current];

    // Preview from current camera cursor / pointer.
    if (dist3d(path.current, cam.centerCached)) {
      tail2 = [path.current, cam.centerCached];
    }
  }
}

// ✒ Act
function act({ event: e, color, download, num: { vec4, timestamp }, geo: { Quantizer } }) {

  // Right hand.
  if (e.is("3d:touch:1")) {
    console.log("Touched:", e.position, "Left");
  }

  if (e.is("3d:draw:1")) {
    console.log("Moved:", e.position, "Left");
    console.log(tri.position, e.position);
    triTop.position = [e.position.x, e.position.y, e.position.z];
  }

  if (e.is("3d:lift:1")) {
    console.log("Lifted:", e.position, "Left");
  }

  // Left Hand
  if (e.is("3d:touch:2")) {
    console.log("Touched:", e.position, "Right");
  }

  if (e.is("3d:draw:2")) {
    console.log("Draw:", e.position, "Right");
    const vertexColor = color(...colorParams);

    drawing.addPoints({
      positions: [
        [e.position.x, e.position.y, e.position.z],
        [e.lastPosition.x, e.lastPosition.y, e.lastPosition.z],
      ],
      colors: [vertexColor, vertexColor]
    });

    client.send("add", {
      positions: [
        [e.position.x, e.position.y, e.position.z],
        [e.lastPosition.x, e.lastPosition.y, e.lastPosition.z],
      ],
      colors: [vertexColor, vertexColor]
    });

  }

  if (e.is("3d:move:2")) {
    console.log("Moved:", e.position, "Right");
  }

  if (e.is("3d:lift:2")) {
    console.log("Lifted:", e.position, "Right");
  }


  if (e.is("keyboard:down:enter")) {

    /*
    [
      {
        "Name": "NewRow",
        "Vertices": [
          {
            "X": 10,
            "Y": 20,
            "Z": -30
          }
        ],
        "Color": [
          {
            "B": 0,
            "G": 0,
            "R": 201,
            "A": 0
          }
        ]
      },
      {
        "Name": "NewRow_0",
        "Vertices": [
          {
            "X": 10,
            "Y": 20,
            "Z": -30
          }
        ],
        "Color": [
          {
            "B": 0,
            "G": 0,
            "R": 201,
            "A": 0
          }
        ]
      }
    ]
    */
    // Pack up and download the vertices according to the above.
    download(`sculpture-${timestamp()}.json`, JSON.stringify(
      drawing.vertices.map((v, i) => {
        return {
          Name: "NewRow_" + i,
          Vertices: [
            {
              X: v.pos["0"],
              Y: v.pos["1"],
              Z: v.pos["2"],
            }
          ],
          Color: [
            {
              R: v.color["0"],
              G: v.color["1"],
              B: v.color["2"],
              A: v.color["3"]
            }
          ]
        }
      }))
    );


    // Pack up and download the vertices in an array of arrays.
    /*
    download(`sculpture-${timestamp()}.json`, JSON.stringify(
      drawing.vertices.map(v => [
        [v.pos["0"], v.pos["1"], v.pos["2"]],
        [...v.color]
      ]))
    );
    */
  }

  // Controls

  // 🖱️ Mouse
  //Look around while dragging.
  if (e.is("draw")) {
    cam.rotX -= e.delta.y / 3.5;
    cam.rotY -= e.delta.x / 3.5;
  }

  // Start a mark.
  if (e.is("touch") && e.device === "mouse") {
    race.start(cam.center);
    drawing.gpuFlush = true;
  }

  // End a mark.
  if (e.is("lift") && e.device === "mouse") {
    race.reset?.(); // Reset the lazy cursor.

    // Draw the second tail if it exists, then clear both.
    const start = tail?.[0] || tail2?.[0];
    const end = tail2?.[1];

    if (start && end) {
      const q = new Quantizer({ step });
      q.start(start);
      const path = q.to(end);

      if (path.out.length > 0) {
        const colors = []; // Note: Could this whole color loop be shorter?
        path.out.forEach((p) => {
          const vertexColor = color(...colorParams);
          colors.push(vertexColor, vertexColor);
        });

        drawing.addPoints({ positions: path.out, colors });
      }
    }

    tail = tail2 = undefined;
  }

  // 🖖 Touch
  // Two fingers for move forward.
  if (e.is("touch:2")) W = true;
  if (e.is("lift:2")) W = false;

  // Three fingers for moving backward.
  if (e.is("touch:3")) S = true;
  if (e.is("lift:3")) S = false;

  // 💻️ Keyboard: WASD for movement, arrows for looking.
  if (e.is("keyboard:down:w")) W = true;
  if (e.is("keyboard:down:s")) S = true;
  if (e.is("keyboard:down:a")) A = true;
  if (e.is("keyboard:down:d")) D = true;

  if (e.is("keyboard:up:w")) W = false;
  if (e.is("keyboard:up:s")) S = false;
  if (e.is("keyboard:up:a")) A = false;
  if (e.is("keyboard:up:d")) D = false;

  if (e.is("keyboard:down:arrowup")) UP = true;
  if (e.is("keyboard:down:arrowdown")) DOWN = true;
  if (e.is("keyboard:down:arrowleft")) LEFT = true;
  if (e.is("keyboard:down:arrowright")) RIGHT = true;

  if (e.is("keyboard:up:arrowup")) UP = false;
  if (e.is("keyboard:up:arrowdown")) DOWN = false;
  if (e.is("keyboard:up:arrowleft")) LEFT = false;
  if (e.is("keyboard:up:arrowright")) RIGHT = false;

  if (e.is("keyboard:down:k")) cursorSize += 0.1;
  if (e.is("keyboard:down:j")) cursorSize -= 0.1;
}

// 💗 Beat
function beat($api) {
  // Make sound here.
}

// 👋 Leave
function leave({ store }) {
  // Pass data to the next piece here.
  store["3dline:drawing"] = drawing;
  store.persist("3dline:drawing", "local:db");
}

export { boot, sim, paint, act, beat, leave };

// 📚 Library
