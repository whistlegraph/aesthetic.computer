// ️🪄 Cadwand, 22.11.05.00.30 ⚙️
// A laboratory & development piece for designing the geometry in `wand`.

/* #region 🏁 todo
* VR
  - [] Add support for controller buttons to change background.
  - [] White wand / finish wandForm and preview. (Ignore PC for now.)
  - [] Add some keyboard and VR controller button options for complexity
        and color / radius.
  - [] Show the limit of the vertex count in VR somehow.
  * Decorative
  - [] Solid offset generative colors on tubes with colored end-caps?.
    - [] Choose a palette.
  - [] Add a light to the scene.
  - [] Make scale test drawings for Barry / UE export.
    - [] Make two or three different samples with no options.
* Final
  - [] Change demo format to remove light-switch in favor of
       background Tube color changes.
  - [] Make Tube color changes stripe-able / dynamic during drawing.
* Optimization
 - [] Two sided triangle optimization.
   - [] Be able to set whether to use DoubleSided or not on the Tube start.
   - [-] Flip any inverted triangles. Check to see if enabling two sided
          triangles flip anything.
     - [x] 5 sides or greater
   - [] Double up the vertices in the exception (Ribbon / 2 sided Tube)
   - [] Re-enable THREE.FrontSide / BackSide?
  - [] Should each stroke be its own Tube in order to support different
        geometry types? Yes if I wanna easily select and delete.
        Do we need that for demo recording? No...
        - Would it be nice for the export data? Yes!
        - Could it be added subsequently after the drawings are complete? Yes.
        - (The files would load the same way.)
   - [] Finish all extra-necessary TODOS in this file.
   - [] Get things good enough to make 1 complete drawing.
END OF DAY
+ Later
 - [] Make a discord bot that pings the jeffrey channel for updated wand sculpture URLs /
       keep an automated list somewhere... maybe look at the S3 shell scripts?
 - [] Create a "view wand timestamp" player that loads the model as a GLTF.
 - [] Try to re-enable workers again.
 - [] Integrate into `wand`.
   - [] Read both pieces side by side.
   - [] Model each wand as a single skinny tube (with colored stripes).
       (Bring Tube geometry into Wand)
   - [] Remove strips from the tube as needed.
   - [] Allow
- [] Add transparent triangle rendered vertices to measurement cube. 
- [] Reload last camera position on refresh.
- [] Record some GIFs.
- [] There should be an "inner" and "outer" triangulation option.
      - [] Inner ONLY for complexity 1 and 2.
      - [] Optional elsewhere.
 - [] Add a generic `turn` function to `Spider` for fun procedural stuff.
+ Done
- [x] Enable saving of files to the network instead of the device...
  - [x] Save everything!!!
    - [x] Set up a route to save through the server.
  (But what happens if I try to download something on the device?)
  - [x] Skip certain objects like the measurement cube and the stage.
  - [x] Transform the drawing downward by the Y position of the center
      of the cube.
- [x] Demo file recording and playback.
  - [x] Playback file.
  - [x] Load file.
  - [x️] Save file.
  - [x] Recording
    tick, light:switch (true / false based on starting light or dark value)
    tick, wand,       PX, PY, PZ, QX, QY, QZ
    tick, tube:start, PX, PY, PZ, QX, QY, QZ, R, G, B, A, RADIUS, SIDES   
    tick, tube:goto,  PX, PY, PZ, QX, QY, QZ, R, G, B, A
    tick, tube:stop,  (no other data needed) 
    tick, light:switch true / false (subsequent light changes)
  - [x️‍] Record full controller position and rotation as JSON.
    - (Each simulation tick)
  - [x] Record stroke as JSON.
    - (Each Tube start, stop, and goto.)
#endregion */

// #region 🗺️ global
import { CamDoll } from "../lib/cam-doll.mjs";
const { abs, max, cos, sin } = Math;

let camdoll, stage; // Camera and stage.
const rulers = false; // Whether to render arch. guidelines for development.
let measuringCube; // A toggled cube for conforming a sculpture to a scale.
let origin; // Some crossing lines to check the center of a sculpture.
let measuringCubeOn = true;
let cubeHeight = 1.8;
let originOn = true;
let background = 0x000000; // Background color for the 3D environment.
let waving = false; // Whether we are making tubes or not.
let geometry = "triangles"; // "triangles" for surfaces or "lines" for wireframes
let race,
  speed = 12; // Race after the cursor quickly.
let spi, // Follow it in even increments.
  color = [255, 255, 255, 255]; // The current spider color read by the tube..
let tube, // Circumscribe the spider's path with a form.
  sides = 16, // Number of tube sides. 1 or 2 means flat.
  radius = 0.035, // The width of the tube.
  step = 0.05, // The length of each tube segment.
  capColor = [255, 255, 255, 255], // [255, 255, 255, 255] The currently selected tube end cap color.
  capVary = 0, // 2; How much to drift the colors for the cap.
  tubeVary = 0, // 50; How much to drift the colors for the tube.
  rayDist = 0.1, // How far away to draw the tube on non-spatial devices.
  graphPreview = false; // Whether to render pieces of a tube smaller or greater
//                       than `step` at the start of end of a stroke.
let wandForm; // A live cursor.

let demo, player; // For recording a session and rewatching it in realtime.
let beep, bop; // For making sounds when pieces begin and end.
let ping, pong; // For making sounds when pieces upload or fail to upload.
let beatCount = 0n; // TODO: This should really go into the main API at this point... 22.11.15.05.22

const racePoints = [], // Extra stuff for CAD-style drawing.
  diffPrevPoints = [],
  diffPrevColors = [],
  diffPoints = [],
  diffColors = [];
let trackerPoints = [],
  trackerColors = [];
let spiderForm, trackerForm;
let limiter = 0;
// #endregion

function boot({ Camera, Dolly, Form, QUAD, ORIGIN, CUBEL, wipe, num, geo }) {
  demo = new Demo(); // Start logging user interaction on demo frame 0.
  demo?.rec("light:switch", background === 0xffffff); // Record the starting bg color in case the default ever changes.

  camdoll = new CamDoll(Camera, Dolly, { z: 1.4, y: 0.5 }); // Camera controls.
  stage = new Form(
    QUAD,
    { color: [64, 64, 64, 255] },
    /* { tex: painting(16, 16, (g) => g.noise16DIGITPAIN()) }, */
    { pos: [0, 0, 0], rot: [-90, 0, 0], scale: [8, 8, 8] }
  );

  measuringCube = new Form(
    CUBEL,
    { color: [255, 0, 0, 255] },
    { pos: [0, cubeHeight, 0], rot: [0, 0, 0], scale: [1, 1, 1] }
  );

  origin = new Form(ORIGIN, {
    pos: [0, 1.8, 0],
    rot: [0, 0, 0],
    scale: [10, 10, 10],
  });

  race = new geo.Race({ speed });
  tube = new Tube({ Form, num }, radius, sides, geometry, demo);

  wipe(0, 0); // Clear the software buffer to make sure we see the gpu layer.
}

let lastWandPosition;
let lastWandRotation;

function sim({
  pen,
  pen3d,
  Form,
  simCount,
  num: { vec3, randIntRange: rr, dist3d, quat, vec4, mat3 },
}) {
  camdoll.sim(); // Update the camera + dolly.
  // racePoints.push(race.pos); // For debugging.

  // 🐭️ Live Cursor: generated from the controller position and direction.
  let position, lastPosition, rotation;
  let alteredSpiState;

  if (pen3d) {
    position = [pen3d.pos.x, pen3d.pos.y, pen3d.pos.z, 1];
    lastPosition = [pen3d.lastPos.x, pen3d.lastPos.y, pen3d.lastPos.z, 1];
    const dir = [pen3d.direction.x, pen3d.direction.y, pen3d.direction.z];

    wandForm = new Form({
      type: "line",
      positions: [
        position,
        vec3.add(vec3.create(), position, vec3.scale(vec3.create(), dir, 0.2)),
      ],
      colors: [
        [255, 255, 255, 255],
        [255, 255, 255, 255],
      ],
      keep: false,
    });

    rotation = quat.fromValues(
      pen3d.rotation._x,
      pen3d.rotation._y,
      pen3d.rotation._z,
      pen3d.rotation._w
    );

    const controllerRotation = quat.fromValues(
      pen3d.rotation._x,
      pen3d.rotation._y,
      pen3d.rotation._z,
      pen3d.rotation._w
    );

    const controllerPosition = [pen3d.pos.x, pen3d.pos.y, pen3d.pos.z, 1];

    // Record current wand position into the active demo if it has changed.
    // Format: wand, PX, PY, PZ, QX, QY, QZ
    // TODO: Generalize this with the below. 22.11.14.22.47
    if (
      (lastWandPosition !== undefined &&
        lastWandRotation !== undefined &&
        (lastWandPosition.x !== pen3d.pos.x ||
          lastWandPosition.y !== pen3d.pos.y ||
          lastWandPosition.z !== pen3d.pos.z ||
          lastWandRotation._x !== pen3d.rotation._x ||
          lastWandRotation._y !== pen3d.rotation._y ||
          lastWandRotation._z !== pen3d.rotation._z ||
          lastWandRotation._w !== pen3d.rotation._w)) ||
      (lastWandPosition === undefined && lastWandRotation === undefined)
    ) {
      demo?.rec("wand", [
        pen3d.pos.x,
        pen3d.pos.y,
        pen3d.pos.z,
        pen3d.rotation._x,
        pen3d.rotation._y,
        pen3d.rotation._z,
        pen3d.rotation._w,
      ]);
      lastWandPosition = pen3d.pos;
      lastWandRotation = pen3d.rotation;
    }

    // Show a live preview of what will be drawn, with measurement lines
    // as needed.
    // TODO: Move this into aSpider.peekTowards method.

    {
      // This block is very similar to `crawlTowards` in `Spider`,
      // Except customized to make a preview. The functionality could
      // probably be merged, otherwise they have to be kept in sync.

      let lpos, pos, tpos, rot;
      if (spi && race) {
        lpos = spi.state.position;
        pos = position; // Current
        tpos = race.pos; // Replace with the stepsize in current dir?
        rot = spi.rotation;
      } else {
        lpos = lastPosition; // TODO: Should I track one more position here?
        pos = lastPosition; // Current
        tpos = position;
        rot = rotation;
      }

      const firstTangent = vec3.normalize(
        vec3.create(),
        vec3.sub(vec3.create(), pos, lpos)
      );

      const nextTangent = vec3.normalize(
        vec3.create(),
        vec3.sub(vec3.create(), tpos, lpos)
      );

      let lastNormal = vec4.transformQuat(vec4.create(), [0, 1, 0, 1], rot);

      const helper = vec3.normalize(
        vec3.create(),
        vec3.cross(vec3.create(), lastNormal, firstTangent)
      );

      lastNormal = vec3.normalize(
        vec3.create(),
        vec3.cross(vec3.create(), firstTangent, helper)
      );

      if (waving) {
        diffPrevPoints.push(
          // For debugging.
          pos,
          vec3.add(
            vec3.create(),
            pos,
            vec3.scale(vec3.create(), lastNormal, 0.15)
          ),
          pos,
          vec3.add(vec3.create(), pos, vec3.scale(vec3.create(), helper, 0.15))
        );
        diffPrevColors.push(
          [255, 255, 100, 255],
          [255, 255, 100, 255],
          [50, 255, 100, 255],
          [50, 255, 100, 255]
        );
      }

      // 🥢 Measurement of normals for rotation.
      let bitangent = vec3.cross(vec3.create(), firstTangent, nextTangent);

      let newNormal;

      if (vec3.length(bitangent) === 0) {
        newNormal = lastNormal;
      } else {
        // Get angle between first and next tangent.

        // 🅰️ With matrices...
        // bitangent = vec3.normalize(vec3.create(), bitangent);
        // Rotate around bitangent by `theta` radians.
        // const theta = acos(vec3.dot(firstTangent, nextTangent)) || 0;
        // const mat = mat4.fromRotation(mat4.create(), theta, bitangent);
        // newNormal = vec3.transformMat4(vec3.create(), lastNormal, mat);

        // 🅱️ or a quaternion.
        let rq = quat.rotationTo(quat.create(), firstTangent, nextTangent);
        newNormal = vec3.transformQuat(vec3.create(), lastNormal, rq);
      }

      bitangent = vec3.normalize(
        vec3.create(),
        vec3.cross(vec3.create(), newNormal, nextTangent)
      );

      if (waving) {
        diffPrevPoints.push(
          // For debugging.
          pos,
          vec3.add(
            vec3.create(),
            pos,
            vec3.scale(vec3.create(), newNormal, 0.15)
          ),
          pos,
          vec3.add(
            vec3.create(),
            pos,
            vec3.scale(vec3.create(), bitangent, 0.15)
          )
        );
        diffPrevColors.push(
          [255, 0, 0, 255],
          [255, 0, 0, 255],
          [50, 0, 255, 255],
          [50, 0, 255, 255]
        );
      }

      // Build a rotation transform.
      const qua = quat.normalize(
        quat.create(),
        quat.fromMat3(
          quat.create(),
          mat3.fromValues(...bitangent, ...newNormal, ...nextTangent)
        )
      );

      rotation = qua;

      if (spi) {
        alteredSpiState = { ...spi.state };
        alteredSpiState.rotation = rotation;
      }

      if (waving) {
        if (tube.gesture.length === 0) {
          tube.preview(alteredSpiState, {
            position,
            rotation,
            color,
          });
        } else {
          tube.preview(spi.state, {
            position,
            rotation,
            color,
          });
        }
      } else {
        // TODO: Finish better tube preview later. 22.11.13.21.41
        // tube.preview({
        //   position: pos,
        //   rotation,
        //   color: [255, 0, 0, 255],
        // });
        tube.preview({
          position: controllerPosition,
          rotation: controllerRotation,
          color: color,
        });
      }
    }
    // Default / non-waving tube preview.
    //tube.preview({ position, rotation, color: [255, 0, 0, 255] });
    //}
  } else if (pen) {
    // TODO: Also generate a full live cursor here... using the above code
    //       for spatial devices.
    position = camdoll.cam.ray(pen.x, pen.y, rayDist, true);
    rotation = quat.fromEuler(quat.create(), ...camdoll.cam.rot);

    // 🔴 Record current wand position into the active demo if it has changed.
    // Format: wand, PX, PY, PZ, QX, QY, QZ
    // TODO: Generalize this with the above. 22.11.14.22.46
    if (
      (lastWandPosition !== undefined &&
        lastWandRotation !== undefined &&
        (lastWandPosition[0] !== position[0] ||
          lastWandPosition[1] !== position[1] ||
          lastWandPosition[2] !== position[2] ||
          lastWandRotation[0] !== rotation[0] ||
          lastWandRotation[1] !== rotation[1] ||
          lastWandRotation[2] !== rotation[2] ||
          lastWandRotation[3] !== rotation[3])) ||
      (lastWandPosition === undefined && lastWandRotation === undefined)
    ) {
      demo?.rec("wand", [...position.slice(0, 3), ...rotation]);
      lastWandPosition = position;
      lastWandRotation = rotation;
    }

    tube.preview({ position, rotation, color: [255, 0, 0, 255] });
  }
  lastWandPosition = position;

  // 🏁 Move the race finish line to the current cursor position.
  // Compute an in-progress gesture.
  if (pen3d && race) {
    race.to([pen3d.pos.x, pen3d.pos.y, pen3d.pos.z]);
  } else if (race && pen) {
    race.to(camdoll.cam.ray(pen.x, pen.y, rayDist / 4, true));
  }

  if (waving) {
    // Project a ray out into the direction we might be moving in to measure
    // the possibility space.
    const spiToRace = vec3.normalize(
      vec3.create(),
      //vec3.sub(vec3.create(), race.pos, spi.state.position)
      vec3.sub(vec3.create(), position, spi.state.position)
    );

    let dot = vec3.dot(spiToRace, spi.state.direction);
    const d = dist3d(spi.state.position, race.pos);
    let dotSign;

    // 🕷️ Spider Jump
    if (d > step) {
      if (tube.gesture.length === 0) {
        // Populate first tube start with the preview state.
        if (pen3d) {
          tube.start(alteredSpiState, radius, sides);
          spi.crawlTowards(race.pos, step / 2, 1); // <- last parm is a tightness fit
          tube.goto(spi.state); // 2. Knots the tube.
        } else {
          tube.start(spi.state, radius, sides);
          spi.crawlTowards(race.pos, step / 2, 1); // <- last parm is a tightness fit
          tube.goto(spi.state); // 2. Knots the tube.
        }
        return;
      }

      if (tube.gesture.length > 0) {
        if (pen3d && dot > 0.5) {
          // 1. Jumps N steps in the direction from this position to last position.
          spi.crawlTowards(race.pos, step / 2, 1); // <- last parm is a tightness fit
          tube.goto(spi.state); // 2. Knots the tube.
          // #. Randomizes the color for every section.
          //spi.ink(rr(100, 255), rr(100, 255), rr(100, 255), 255); // Set the color.
        } else if (!pen3d) {
          spi.crawlTowards(race.pos, step / 2, 1); // <- last parm is a tightness fit
          tube.goto(spi.state); // 2. Knots the tube.
        }
      }
    }
    // Add some debug data to show the future direction.
    // const scaledDiff = vec3.scale(vec3.create(), diff, 2);
    // trackerPoints = [
    //   // spi.state.position,
    //   // vec3.add(vec3.create(), spi.state.position, [pen3d.direction.x, pen3d.direction.y, pen3d.direction.z]),
    //   spi.state.position,
    //   vec3.add(vec3.create(), spi.state.position, scaledDiff),
    //   spi.state.position,
    //   vec3.add(vec3.create(), spi.state.position, spi.state.direction),
    // ];
    // if (dot > 0.5) {
    //   // For debugging.
    //   trackerColors = [
    //     // [255, 255, 255, 255],
    //     // [255, 255, 255, 255],
    //     [0, 255, 0, 255],
    //     [0, 255, 0, 255],
    //     [255, 255, 0, 255],
    //     [255, 255, 0, 255],
    //   ];
    // } else {
    //   trackerColors = [
    //     // [255, 255, 255, 255],
    //     // [255, 255, 255, 255],
    //     [255, 0, 0, 255],
    //     [255, 0, 0, 255],
    //     [255, 255, 0, 255],
    //     [255, 255, 0, 255],
    //   ];
    // }
  }

  demo?.sim(simCount); // 🔴 Update the demo frame count.

  player?.sim((frames, frameCount) => {
    // Parse demo frames and act on them in order.

    // 🟢 Advance forward any player frames.
    frames.forEach((f) => {
      const type = f[1];
      const di = 2;

      if (type === "light:switch") {
        // ❔ tick, light:switch (true / false based on starting light or dark value)
        lightSwitch(f[di]);
        // Skip `true` and `false` values for now.
      } else if (type === "wand") {
        // ❔ tick, wand, PX, PY, PZ, QX, QY, QZ
        // Skip wand data for now.
      } else if (type === "tube:start") {
        // Format: tick, tube:start, PX, PY, PZ, QX, QY, QZ, R, G, B, A, RADIUS, SIDES
        tube.start(
          {
            position: [f[di], f[di + 1], f[di + 2]],
            rotation: [f[di + 3], f[di + 4], f[di + 5], f[di + 6]],
            color: [f[di + 7], f[di + 8], f[di + 9], f[di + 10]],
          },
          f[di + 11],
          f[di + 12],
          false
        );
      } else if (type === "tube:goto") {
        // ❔ tick, tube:goto, PX, PY, PZ, QX, QY, QZ, R, G, B, A
        tube.goto(
          {
            position: [f[di], f[di + 1], f[di + 2]],
            rotation: [f[di + 3], f[di + 4], f[di + 5], f[di + 6]],
            color: [f[di + 7], f[di + 8], f[di + 9], f[di + 10]],
          },
          undefined,
          false
        );
      } else if (type === "tube:stop") {
        // ❔ tick, tube:stop, (no other data needed)
        tube.stop(true);
      } else if (type === "demo:complete") {
        // An invented frame with no other information to destroy our player.
        player = null;
      }
    });
    // console.log(frameCount, frames[0]);
  });
}

function paint({ form, Form }) {
  //#region 🐛 Debugging drawing.
  // Draw the path of the race.
  /*
  const racePositions = [];
  const raceColors = [];

  for (let r = 0; r < racePoints.length - 1; r += 1) {
    racePositions.push(racePoints[r], racePoints[r + 1]);
    raceColors.push([127, 0, 127, 255], [127, 0, 127, 255]);
  }

  const raceForm = new Form(
    {
      type: "line",
      positions: racePositions,
      colors: raceColors,
      gradients: true,
      keep: false,
    },
    { color: [255, 255, 255, 255] },
    { scale: [1, 1, 1] }
  );
  */

  // The spider's path so far.
  /*
  if (spi) {
    const spiderPositions = [];
    const spiderColors = [];

    for (let s = 0; s < spi.path.length - 1; s += 1) {
      spiderPositions.push(spi.path[s].position, spi.path[s + 1].position);
      spiderColors.push([255, 255, 255, 255], [0, 0, 0, 255]);
      //spiderColors.push(spi.path[s + 1].color, spi.path[s + 1].color);
    }

    spiderForm = new Form(
      {
        type: "line",
        positions: spiderPositions,
        colors: spiderColors,
        gradients: true,
        keep: false,
      },
      { color: [255, 255, 255, 255] },
      { scale: [1, 1, 1] }
    );
  }
  */

  // Other measurement lines.
  if (rulers) {
    const diffPrevPositions = [];
    const diffPrevCol = [];

    for (let d = 0; d < diffPrevPoints.length - 1; d += 2) {
      diffPrevPositions.push(
        [...diffPrevPoints[d], 1],
        [...diffPrevPoints[d + 1], 1]
      );
      diffPrevCol.push(diffPrevColors[d], diffPrevColors[d + 1]);
    }

    diffPrevPoints.length = 0;

    const diffPrevForm = new Form(
      {
        type: "line",
        positions: diffPrevPositions,
        colors: diffPrevColors,
        gradients: false,
        keep: false,
      },
      { color: [255, 0, 0, 255] },
      { scale: [1, 1, 1] }
    );

    const diffPositions = [];
    const diffCol = [];

    for (let d = 0; d < diffPoints.length - 1; d += 2) {
      diffPositions.push([...diffPoints[d], 1], [...diffPoints[d + 1], 1]);
      diffCol.push(diffColors[d], diffColors[d + 1]);
    }

    const diffForm = new Form(
      {
        type: "line",
        positions: diffPositions,
        colors: diffColors,
        gradients: false,
        keep: false,
      },
      { color: [255, 0, 0, 255] },
      { scale: [1, 1, 1] }
    );
    /*

  // Draw some cursor measurement lines.
  trackerForm = new Form(
    {
      type: "line",
      positions: trackerPoints,
      colors: trackerColors,
      gradients: true,
      keep: false,
    },
    { color: [255, 255, 255, 255] },
    { scale: [1, 1, 1] }
  );
  */
    // Draw some cursor measurement lines.
    trackerForm = new Form(
      {
        type: "line",
        positions: trackerPoints,
        colors: trackerColors,
        gradients: true,
        keep: false,
      },
      { color: [255, 255, 255, 255] },
      { scale: [1, 1, 1] }
    );

    form([trackerForm, diffPrevForm, diffForm], camdoll.cam);
    //#endregion
  }

  form([stage, tube.capForm, tube.form, wandForm], camdoll.cam, { background });
  if (measuringCubeOn) form(measuringCube, camdoll.cam);
  if (originOn) form(origin, camdoll.cam);
}

function act({
  event: e,
  pen,
  gpu,
  debug,
  upload,
  download,
  serverUpload,
  num,
}) {
  const { quat, randIntRange: rr, vec3, timestamp } = num;

  // 🥽 Start a gesture. (Spatial)
  if (e.is("3d:touch:2")) {
    const last = [e.lastPosition.x, e.lastPosition.y, e.lastPosition.z];
    const cur = [e.pos.x, e.pos.y, e.pos.z];
    const rot = quat.fromValues(
      e.rotation._x,
      e.rotation._y,
      e.rotation._z,
      e.rotation._w
    );

    const dir = [e.direction.x, e.direction.y, e.direction.z]; // ❓ Is this even used? 22.11.13.16.41

    spi = new Spider({ num, debug }, cur, last, dir, rot, color);

    race.start(spi.state.position);
    // racePoints.push(race.pos); // For debugging.

    //tube.start(spi.state, radius, sides); // Start a gesture, adding radius and
    //                                       size for an optional update.
    waving = true;
  }

  // 🖱️ Start a gesture. (Screen)
  if (e.is("touch") && e.button === 0 && pen && pen.x && pen.y) {
    const far = camdoll.cam.ray(pen.x, pen.y, rayDist, true);
    const near = camdoll.cam.ray(pen.x, pen.y, rayDist / 2, true);
    const dir = vec3.sub(vec3.create(), near, far);
    const rot = quat.fromEuler(quat.create(), ...camdoll.cam.rot);
    spi = new Spider({ num, debug }, near, far, dir, rot, color);
    race.start(spi.state.position);
    // racePoints.push(race.pos); // For debugging.

    // tube.start(spi.state, radius, sides); // Start a gesture.
    waving = true;
  }

  // 🛑 Stop a gesture.
  if ((e.is("lift") && e.button === 0) || e.is("3d:lift:2")) {
    waving = false;
    if (e.is("3d:lift:2")) {
      tube.stop();
    } else if (spi) {
      tube.stop();
    }
  }

  // Toggle cube and origin measurement lines.
  if (e.is("keyboard:down:t")) {
    measuringCubeOn = !measuringCubeOn;
    originOn = !originOn;
    if (measuringCubeOn && originOn) {
      measuringCube.resetUID();
      origin.resetUID();
    }
  }

  // Toggle binary color switch of background and foreground.
  if (e.is("keyboard:down:c") || e.is("3d:rhand-button-a")) {
    lightSwitch();
    demo?.rec("light:switch", background === 0xffffff);
  }

  // Save scene data.
  if (e.is("keyboard:down:enter")) gpu.message({ type: "export-scene" });

  // Remove / cancel a stroke.
  if (e.is("3d:rhand-trigger-secondary")) {
    console.log("Delete / cancel a stroke!");
    pong = true;
  }

  // 🔴 Recording a new piece / start over.
  if (e.is("keyboard:down:r") || e.is("3d:rhand-button-b")) {
    demo?.dump(); // Start fresh / clear any existing demo cache.

    // Remove all vertices from the existing tube.
    tube.form.clear();
    tube.capForm.clear();

    demo?.rec("light:switch", background === 0xffffff); // Record the starting bg color in case the default ever changes.
    console.log("🪄 A new piece...");
    beep = true;
  }

  const saveMode = "server"; // The default for now. 22.11.15.05.32

  // 🛑 Finish a piece.
  if (e.is("keyboard:down:f") || e.is("3d:rhand-button-thumb")) {
    // demo?.print(); // Print the last demo to the console.
    const ts = timestamp();

    console.log("🪄 Piece completed:", ts);
    bop = true;

    // TODO: I probably shouldn't dump demos and instead wait until things
    //       finish uploading in case they fail. 22.11.15.08.52
    //       (In my studio for now they probably won't fail...)

    // Attempt to upload the piece to the server...
    const handle = "@digitpain"; // Hardcoded for now.

    // Server saving.
    if (saveMode === "server") {
      // Save demo JSON.
      serverUpload(`${ts}-recording-${handle}.json`, demo.frames, "wand")
        .then((data) => {
          // console.log("JSON Upload success:", data);
          console.log(
            "🪄 Demo uploaded:",
            `https://wand.aesthetic.computer/${ts}-recording-${handle}.json`,
            data
          );
          ping = true;
        })
        .catch((err) => {
          console.error("🪄 Demo upload failed:", err);
          pong = true;
        });

      // Save scene GLTF.
      gpu
        .message({
          type: "export-scene",
          content: {
            timestamp: ts,
            output: "server",
            handle,
            sculptureHeight: cubeHeight,
          },
        })
        .then((data) => {
          console.log(
            "🪄 Sculpture uploaded:",
            `https://wand.aesthetic.computer/${ts}-sculpture-${handle}.gltf`,
            data
          );
          ping = true;
        })
        .catch((err) => {
          console.error("🪄 Sculpture upload failed:", err);
          pong = true;
        });
    } else {
      // Local saving. (Assume "local")
      download(`${ts}-recording-${handle}.json`, demo.frames); // Save demo to json.
      gpu.message({ type: "export-scene", content: { timestamp: ts } }); // Save scene to json.
    }

    demo?.dump(); // Start fresh / clear any existing demo cache.
    tube.form.clear(); // Clear out the tube.
    tube.capForm.clear();
  }

  // 📥 Load a demo file and play it back.
  if (e.is("keyboard:down:l")) {
    upload(".json")
      .then((data) => {
        const frames = JSON.parse(data).map((f) => {
          // TODO: This may not cover embedded array types.
          f.forEach((v, i) => {
            if (i === 0) {
              f[i] = BigInt(f[i]);
            } else if (f[i] === true) {
              f[i] = true;
            } else if (f[i] === false) {
              f[i] = false;
            } else if (typeof f[i] === "string" && !isNaN(f[i])) {
              f[i] = parseFloat(f[i]);
            }
          });
          return f;
        });
        console.log("🎞️ Loaded a demo file:", frames);

        // Play back the demo file.
        player = new Player(frames);
      })
      .catch((err) => {
        console.error("JSON load error:", err);
      });
  }

  camdoll.act(e); // Wire up FPS style navigation events.

  //#region 🐛 Debugging controls.
  // Adjust model complexity. (Only works if geometry is non-buffered atm.)
  if (e.is("keyboard:down:k")) {
    sides += 1;
    limiter = 0;
  }

  if (e.is("keyboard:down:j")) {
    sides = max(1, sides - 1);
    limiter = 0;
  }

  if (e.is("wheel") && e.dir > 0 && tube) {
    limiter += 1;
    tube.form.limiter = limiter;
  }

  if (e.is("wheel") && e.dir < 0 && tube) {
    limiter -= 1;
    if (limiter < 0) limiter = tube.form.vertices.length / 2;
    tube.form.limiter = limiter;
  }

  // In case we need a wireframe form too.
  // if (e.is("keyboard:down:[")) tubeWire.form.limiter = limiter2;

  // if (e.is("keyboard:down:]")) {
  //   if (limiter2 < 0) limiter2 = tubeWire.form.vertices.length / 2;
  //   tubeWire.form.limiter = limiter2;
  // }
  //#endregion
}

// 💗 Beat
function beat({ sound: { bpm, square } }) {
  if (beatCount === 0n) bpm(1800); // Set bpm to 1800 ~ 30fps }
  beatCount += 1n; // TODO: This should go into the main API. 22.11.01.17.43

  if (beep) {
    square({
      tone: 300,
      beats: 0.7,
      attack: 0.01,
      decay: 0.5,
      volume: 0.15,
    });
    beep = false;
  }

  if (bop) {
    square({
      tone: 600,
      beats: 0.7,
      attack: 0.01,
      decay: 0.5,
      volume: 0.15,
    });
    bop = false;
  }

  if (ping) {
    square({
      tone: 1000,
      beats: 1.0,
      attack: 0.01,
      decay: 0.9,
      volume: 0.25,
    });
    ping = false;
  }

  if (pong) {
    square({
      tone: 100,
      beats: 1.5,
      attack: 0.01,
      decay: 0.5,
      volume: 0.35,
    });
    pong = false;
  }
}

export { boot, paint, sim, act, beat };

// #region 📑 library

let lit = false;

function lightSwitch(light) {
  lit = light === undefined ? (lit = !lit) : light;

  if (lit) {
    background = 0xffffff;
  } else {
    background = 0x000000;
  }

  if (background === 0x000000) {
    color = [255, 255, 255, 255];
    //capColor = [0, 0, 0, 255];
    capColor = [255, 255, 255, 255];
    // stage.color = [255, 255, 255, 255];

    tubeVary = 0; // 20;
    capVary = 0; // 4;
  } else {
    color = [0, 0, 0, 255];
    //capColor = [255, 255, 255, 255];
    capColor = [0, 0, 0, 255];
    // stage.color = [0, 0, 0, 255];

    tubeVary = 0; // 4;
    capVary = 0; //20;
  }
}

// Here we build a path out of points, which draws
// tubular segments by adding them to a geometric form.
// It does this by producing a cookie cutter shape that gets
// extruded in a transformed direction according to the path data.
class Tube {
  $; // api
  shape; // This hold the vertices in our cookie cutter shape.
  gesture = []; // Set up points on a path / gesture. (Resets on each gesture.)
  //               Used for triangulation logic.
  lastPathP; // Keep track of the most recent "path point".
  sides; // Number of sides the tube has. (See the top of this file.)
  radius; // Thickness of the tube.
  form; // Represents the tube...
  capForm; // " a cursor that presents the cap of the tube.
  geometry = "triangles"; // or "lines"
  previewRotation; // Keeps track of the last rotation sent to `preview()`.
  triColor; // Stores the current triangle color.
  varyTriCount = 0; // Counts by 3 to color triangle vertices.
  lineColor; // Stores the current triangle color.
  varyLineCount = 0; // Counts by 2 to color line segment vertices.
  // TODO: ^ Some of these fields could still be privated. 22.11.11.15.50
  demo; // Points to a demo that is being recorded to in start, goto, and stop.

  // ☁️
  // Note: I could eventually add behavioral data into these vertices that
  //       animate things / turn on or off certain low level effects etc.

  constructor($, radius, sides, geometry, demo) {
    this.$ = $; // Hold onto the API.
    this.geometry = geometry; // Set the geometry type.
    this.radius = radius;
    this.sides = sides;
    this.shape = this.#segmentShape(radius, sides); // Set shape to start.
    this.demo = demo;

    // Make the buffered geometry form, given the geometry type.,
    // and another to represent a dynamic cursor.

    const formType = [
      {
        type:
          this.geometry === "triangles" ? "triangle:buffered" : "line:buffered",
        keep: true,
        //this.geometry === "triangles" ? "triangle" : "line", // Toggle this for testing full form updates.
        //keep: false,
        gradients: false,
      },
      //{ type: "line:buffered", gradients: false },
      //{ tex: this.$.painting(2, 2, (g) => g.wipe(0, 0, 70)) },
      { color: [255, 255, 255, 255] }, // If vertices are passed then this number blends down.
      { scale: [1, 1, 1] },
    ];

    this.form = new $.Form(...formType); // Main form.
    this.form.tag = "sculpture"; // This tells the GPU what to export right now. 22.11.15.09.05

    this.capForm = new $.Form(...formType); // Cursor.

    const totalLength = 1;
    this.form.MAX_POINTS = totalLength * 2 * 32000; // Must be a multiple of two for "line".
    this.capForm.MAX_POINTS = totalLength * 128;
    // That should be enough to cover a healthy range of composition vertices
    // and sidecounts. 😱 22.11.11.16.13
  }

  // Creates an initial position, orientation and end cap geometry.
  start(p, radius = this.radius, sides = this.sides, fromDemo = false) {
    this.sides = sides;
    this.radius = radius;

    if (this.sides === 1) this.sides = 0;

    // Create an initial position in the path and generate points in the shape.
    // this.shape = this.#segmentShape(radius, sides); // Update radius and sides.
    const start = this.#pathp(p);
    this.lastPathP = start; // Store an inital lastPath.

    // Transform the first shape and add an end cap to the form.
    this.#transformShape(start);
    if (this.sides > 1) this.#cap(start, this.form);

    this.gesture.push(start);

    // 🗒️ Note: Eventually this should be on the level of abstraction of a Wand, not a tool like Tube. 22.11.14.23.20
    if (start.color.length === 3) start.color.push(255); // Use RGBA for demo.

    if (!fromDemo)
      this.demo?.rec("tube:start", [
        ...start.pos.slice(0, 3),
        ...start.rotation,
        ...start.color,
        radius,
        sides,
      ]);
  }

  // Produces the `capForm` cursor.
  preview(p, nextPathP) {
    // TODO: - [] Test all sides here. 22.11.11.16.23
    // Replace the current capForm shape values with transformed ones.
    // TODO: get color out of p here
    this.previewRotation = p.rotation;
    this.capForm.clear();

    const pathP = this.#transformShape(this.#pathp({ ...p }));

    if (waving && this.gesture.length === 0) {
      this.#cap(pathP, this.capForm);
    }

    if (nextPathP) {
      this.#cap(
        this.#transformShape(this.#pathp({ ...nextPathP })),
        this.capForm
      );
    }

    // Also move towards the next possible position here...
    if (nextPathP) {
      // Cache some state that goto writes to, load it back.
      const cachedLastPathP = this.lastPathP;
      const cachedGesture = this.gesture;
      this.lastPathP = pathP;
      this.gesture = [];
      this.goto(nextPathP, this.capForm); // Generate a preview only.
      this.lastPathP = cachedLastPathP;
      this.gesture = cachedGesture;
    }
  }

  // Adds additonal points as args in [position, rotation, color] format.
  goto(pathPoint, form, fromDemo = false) {
    // Add new points to the path.
    // Extrude shape points from and in the direction of each path vertex.
    const pathp = this.#pathp(pathPoint);
    this.#consumePath([this.#transformShape(pathp)], form);

    if (pathp.color.length === 3) pathp.color.push(255); // Use RGBA for demo.
    if (!fromDemo)
      this.demo?.rec("tube:goto", [
        ...pathp.pos.slice(0, 3),
        ...pathp.rotation,
        ...pathp.color,
      ]);
  }

  stop(fromDemo = false) {
    const { dist3d } = this.$.num;

    this.capForm.clear();

    // Push anything we haven't stepped into onto the path.

    // Optionally add start or end bits, drawn over or under our step size.
    if (!fromDemo && graphPreview) {
      const d = dist3d(spi.state.position, race.pos);
      if (d > 0.01) {
        if (this.gesture.length === 0) {
          const alteredState = { ...spi.state };
          alteredState.rotation = this.previewRotation;
          this.start(alteredState, radius, sides);
        }

        spi.crawlTowards(race.pos, d, 1);

        const alteredState = { ...spi.state };
        if (this.gesture.length === 0) {
          alteredState.rotation = this.previewRotation;
        }
        this.goto(alteredState);
      }
    }

    if (this.lastPathP) this.#cap(this.lastPathP, this.form, false);
    //                                                      `false` for no ring

    this.gesture.length = 0;

    if (!fromDemo) this.demo?.rec("tube:stop");
  }

  // Takes a starting position, direction and length.
  // Projects out a center core along with from there...
  // Produces a circle yet at low complexity makes
  // - lines, planes, prisms, and boxes.
  #segmentShape(radius, sides) {
    const positions = [];

    // 🅰️ Define a core line for this segment shape, based around the z axis.
    positions.push([0, 0, 0, 1]);

    // 🅱️ Circumnavigate points around the center core..
    const PI2 = Math.PI * 2;
    for (var i = 0; i < sides; i += 1) {
      const angle = (i / sides) * PI2;
      positions.push([sin(angle) * radius, cos(angle) * radius, 0, 1]);
    }

    return positions;
  }

  // Generate a path point with room for shape positions.
  // A spatial snapshot of state used around as `spider.state`.
  // 😱 (This method is dumb, it only adds a shape array. 22.11.12.01.28)
  #pathp({ position, direction, rotation, color, shape = [] }) {
    if (position.length === 3) position = [...position, 1];
    return { pos: position, direction, rotation, color, shape };
  }

  // Generate a start or end (where ring === false) cap to the tube.
  // Has a form input that is either `form` or `capForm`.
  #cap(pathP, form, ring = true) {
    const tris = this.geometry === "triangles";
    const shade = capColor;

    // 📐 Triangles

    if (tris) {
      // 2️⃣ Two Sides
      if (this.sides === 2) {
        if (ring) {
          form.addPoints({
            positions: [pathP.shape[1], pathP.shape[pathP.shape.length - 1]],
            colors: [this.varyCap(shade), this.varyCap(shade)],
          });
        }
      }

      // 3️⃣ Three Sides
      if (this.sides === 3) {
        // Start cap.
        if (ring) {
          for (let i = 0; i < pathP.shape.length; i += 1) {
            if (i > 1) {
              form.addPoints({
                positions: [pathP.shape[i]],
                colors: [this.varyCap(shade)],
              });
            }
          }

          form.addPoints({
            positions: [pathP.shape[1]],
            //colors: [pathP.color],
            colors: [this.varyCap(shade), this.varyCap(shade)],
          });
        } else {
          // End cap.
          form.addPoints({
            positions: [pathP.shape[1], pathP.shape[2], pathP.shape[3]],
            colors: [
              this.varyCap(shade),
              this.varyCap(shade),
              this.varyCap(shade),
            ],
          });
        }
      }

      // 4️⃣ Four sides.
      if (this.sides === 4) {
        form.addPoints({
          positions: [
            pathP.shape[1],
            pathP.shape[2],
            pathP.shape[3],
            pathP.shape[3],
            pathP.shape[4],
            pathP.shape[1],
          ],
          colors: [
            this.varyCap(shade),
            this.varyCap(shade),
            this.varyCap(shade),
            this.varyCap(shade),
            this.varyCap(shade),
            this.varyCap(shade),
          ],
          // [255, 100, 0, 255], [255, 100, 0, 255],
        });
      }

      // This is a general case now.
      if (this.sides >= 5) {
        const center = pathP.shape[0]; // Hold onto center point.

        // Radiate around each point, plotting a triangle towards the center,
        // between this and the next point, skipping the last.
        for (let i = 1; i < pathP.shape.length - 1; i += 1) {
          if (!ring) {
            form.addPoints({
              positions: [center, pathP.shape[i], pathP.shape[i + 1]],
              colors: [
                this.varyCap(shade), // Inner color for a gradient.
                this.varyCap(shade),
                this.varyCap(shade),
              ],
            });
          } else {
            form.addPoints({
              positions: [center, pathP.shape[i + 1], pathP.shape[i]],
              colors: [
                this.varyCap(shade), // Inner color for a gradient.
                this.varyCap(shade),
                this.varyCap(shade),
              ],
            });
          }
        }

        if (!ring) {
          // And wrap around to the beginning for the final point.
          form.addPoints({
            positions: [
              center,
              pathP.shape[pathP.shape.length - 1],
              pathP.shape[1],
            ],
            colors: [
              this.varyCap(shade), // Inner color for a gradient.
              this.varyCap(shade),
              this.varyCap(shade),
            ],
          });
        } else {
          form.addPoints({
            positions: [
              center,
              pathP.shape[1],
              pathP.shape[pathP.shape.length - 1],
            ],
            colors: [
              this.varyCap(shade), // Inner color for a gradient.
              this.varyCap(shade),
              this.varyCap(shade),
            ],
          });
        }
      }
    } else {
      // 📈 Lines (TODO: This branch could be simplified and broken down)

      if (this.sides > 2) {
        for (let i = 0; i < pathP.shape.length; i += 1) {
          // Pie: Radiate out from core point
          if (i > 0 && this.sides > 4) {
            form.addPoints({
              positions: [pathP.shape[0], pathP.shape[i]],
              colors: [this.varyCapLine(shade), this.varyCapLine(shade)],
            });
          }

          // Single diagonal for a quad.
          if (i === 0 && this.sides === 4) {
            form.addPoints({
              positions: [pathP.shape[1], pathP.shape[3]],
              colors: [this.varyCapLine(shade), this.varyCapLine(shade)],
            });
          }

          // Ring: Skip core point
          if (i > 1 && ring) {
            form.addPoints({
              positions: [pathP.shape[i - 1], pathP.shape[i]],
              colors: [this.varyCapLine(shade), this.varyCapLine(shade)],
            });
          }
        }
      }

      // Ring: add final point
      if (ring) {
        form.addPoints({
          positions: [pathP.shape[1], pathP.shape[pathP.shape.length - 1]],
          colors: [this.varyCapLine(shade), this.varyCapLine(shade)],
        });
      }
    }
  }

  // Transform the cookie-cutter by the pathP, returning the pathP back.
  #transformShape(pathP) {
    const { quat, mat4, vec4, vec3, radians } = this.$.num;
    const rm = mat4.fromRotationTranslationScaleOrigin(
      mat4.create(),
      pathP.rotation,
      pathP.pos,
      [1, 1, 1],
      [0, 0, 0]
    );
    quat.normalize(rm, rm);

    this.shape.forEach((shapePos, i) => {
      const newShapePos = vec4.transformMat4(
        vec4.create(),
        [...shapePos, 1],
        rm
      );
      pathP.shape.push(newShapePos);
    });
    return pathP;
  }

  #driftValue(n, amt) {
    return this.$.num.clamp(n + this.$.num.randIntRange(-amt, amt), 0, 255);
  }

  // Shade input colors in `consumePath` and `#cap` for triangles and lines.

  // This method is for triangles and keeps a counter to only
  // change after every 3 vertices.
  vary(color) {
    if (this.varyTriCount === 0) {
      const newValues = [
        this.#driftValue(color[0], tubeVary),
        this.#driftValue(color[1], tubeVary),
        this.#driftValue(color[2], tubeVary),
      ];

      if (this.triColor && tubeVary > 0) {
        const differences = [
          this.triColor[0] - newValues[0],
          this.triColor[1] - newValues[1],
          this.triColor[2] - newValues[2],
        ];

        const averageDifference = abs(differences.reduce((p, c) => p + c) / 3);
        // Recurse if the average of all three color channels is still
        // inside the vary range.
        if (averageDifference < tubeVary / 5) {
          // console.log("recurse");
          return this.vary(color);
        }

        this.triColor[0] = this.#driftValue(color[0], tubeVary);
        this.triColor[1] = this.#driftValue(color[1], tubeVary);
        this.triColor[2] = this.#driftValue(color[2], tubeVary);
      } else {
        this.triColor = color.slice();
      }
      // Don't do anything with the alpha.
    }
    this.varyTriCount = (this.varyTriCount + 1) % 3;
    color = this.triColor.slice();
    return color;
  }
  // and also the input colors in `#cap`.
  varyCap(color) {
    if (this.varyTriCount === 0) {
      if (!this.triColor) this.triColor = [];
      if (capVary > 0) {
        this.triColor[0] = this.#driftValue(color[0], capVary);
        this.triColor[1] = this.#driftValue(color[1], capVary);
        this.triColor[2] = this.#driftValue(color[2], capVary);
      } else {
        this.triColor = color.slice();
      }
      // Don't do anything with the alpha.
    }
    this.varyTriCount = (this.varyTriCount + 1) % 3;
    color = this.triColor.slice();
    return color;
  }

  // And these are for lines, and keep a counter for every 2 vertices.
  varyLine(color) {
    return color;
  }

  varyCapLine(color) {
    return color;
  }

  // Copy each point in the shape, transforming it by the added path positions
  // and angles to `positions` and `colors` which can get added to the `form`.
  #consumePath(pathPoints, form) {
    const positions = [];
    const colors = [];
    const tris = this.geometry === "triangles";

    const args = pathPoints;

    for (let pi = 0; pi < args.length; pi += 1) {
      const pathP = args[pi];
      const shade = pathP.color;
      this.gesture.push(pathP);

      // console.log("Number of sections so far:", this.gesture.length);

      // ⚠️
      // This is a complicated loop that generates triangulated vertices
      // or line segment vertices and sets all their colors for a given
      // parallel tube section.
      for (let si = 0; si < pathP.shape.length; si += 1) {
        if (!tris && si === 0) {
          // 1. 📉 Line: Core / center path.
          positions.push(this.lastPathP.shape[si], pathP.shape[si]);
          colors.push(this.varyLine(shade), this.varyLine(shade));
        }

        if (this.sides === 1) return;

        // 2. Vertical
        if (si > 0) {
          // 📐
          if (tris) {
            // Two Sides
            if (this.sides === 2) {
              // This may *not* only be a sides 2 thing...
              if (this.gesture.length > 1) {
                positions.push(this.lastPathP.shape[si]); // First tri complete for side length of 2.
                colors.push(this.vary(shade));
              }
              if (si > 1) {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si - 1]);
                positions.push(pathP.shape[si]);
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              }
            }
            // Three Sides
            if (this.sides === 3) {
              positions.push(pathP.shape[si]);

              if (si === 3) {
                colors.push(this.vary(shade));
              } else {
                colors.push(this.vary(shade));
              }
            }
            // Four Sides
            if (this.sides === 4) {
              if (si === 1) {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si]);
                colors.push(this.vary(shade), this.vary(shade));
              }

              if (si === 2) {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si]);
                colors.push(this.vary(shade), this.vary(shade));
              }

              if (si === 3) {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si]);
                colors.push(v(shade, this.vary(shade)));
              }

              if (si === 4) {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si]);
                colors.push(this.vary(shade), this.vary(shade));
              }
            }
            if (this.sides >= 5) {
              if (si === 1) {
                positions.push(pathP.shape[si]);
                positions.push(this.lastPathP.shape[si]);
                positions.push(this.lastPathP.shape[si + 1]);
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              } else {
                positions.push(this.lastPathP.shape[si]);
                positions.push(pathP.shape[si]);
                colors.push(this.vary(shade), this.vary(shade));
              }
            }
          } else {
            // 📈 Lines
            positions.push(this.lastPathP.shape[si], pathP.shape[si]);
            colors.push(this.varyLine(shade), this.varyLine(shade));
          }
        }

        // 3. Across (We skip the first shape points here.)
        if (si > 1) {
          // 📐
          if (tris) {
            if (this.sides === 3) {
              positions.push(pathP.shape[si - 1], this.lastPathP.shape[si]);
              colors.push(this.vary(shade), this.vary(shade));
            }

            if (this.sides === 4) {
              if (si === 2) {
                positions.push(pathP.shape[si - 1]);
                colors.push(this.vary(shade));
              }
              if (si === 3) {
                positions.push(pathP.shape[si - 1]);
                colors.push(this.vary(shade));
              }
              if (si === 4) {
                positions.push(pathP.shape[si - 1]);
                colors.push(this.vary(shade));
              }
            }

            if (this.sides >= 5) {
              positions.push(pathP.shape[si - 1]);
              colors.push(this.vary(shade));
            }
          } else {
            // 📈 Lines
            if (!form) {
              // Only add across lines if we are not previewing. (Hacky)
              positions.push(pathP.shape[si], pathP.shape[si - 1]);
              colors.push(this.varyLine(shade), this.varyLine(shade));
            }
          }
        }

        // 4. Diagonal
        if (si > 0 && si < pathP.shape.length - 1) {
          // 📐
          if (tris) {
            // Two sided
            if (sides === 2 && si === 1) {
              positions.push(pathP.shape[si]);
              colors.push(this.vary(shade));
            }

            // 3️⃣
            // Three sided
            if (this.sides === 3) {
              if (si === 1) {
                positions.push(
                  this.lastPathP.shape[si + 1],
                  this.lastPathP.shape[si]
                );
                colors.push(this.vary(shade), this.vary(shade));
              } else if (si === 2) {
                positions.push(
                  this.lastPathP.shape[si],
                  this.lastPathP.shape[si + 1],
                  pathP.shape[si]
                );
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              }
            }

            // 4️⃣
            // Four sided
            if (this.sides === 4) {
              if (si === 1) {
                positions.push(this.lastPathP.shape[si + 1]);
                colors.push(this.vary(shade));
              }
              if (si === 2) {
                positions.push(
                  this.lastPathP.shape[si],
                  this.lastPathP.shape[si + 1],
                  pathP.shape[si]
                );
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              }
              if (si === 3) {
                positions.push(
                  this.lastPathP.shape[si],
                  this.lastPathP.shape[si + 1],
                  pathP.shape[si]
                );
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              }
            }

            if (this.sides >= 5) {
              if (si > 1) {
                positions.push(
                  this.lastPathP.shape[si],
                  this.lastPathP.shape[si + 1],
                  pathP.shape[si]
                );
                colors.push(
                  this.vary(shade),
                  this.vary(shade),
                  this.vary(shade)
                );
              }
            }
          } else {
            // 📈 Lines
            positions.push(this.lastPathP.shape[si + 1], pathP.shape[si]);
            colors.push(this.varyLine(shade), this.varyLine(shade));
          }
        }
      }

      //  5. Final side / diagonal

      // 📐 Triangles
      if (tris) {
        if (this.sides === 3) {
          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1],
            this.lastPathP.shape[pathP.shape.length - 1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));

          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1],
            pathP.shape[1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));
        }

        if (this.sides === 4) {
          // First closer.
          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1],
            this.lastPathP.shape[pathP.shape.length - 1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));

          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1],
            pathP.shape[1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));
        }

        if (this.sides >= 5) {
          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));

          positions.push(
            pathP.shape[pathP.shape.length - 1],
            this.lastPathP.shape[1],
            pathP.shape[1]
          );

          colors.push(this.vary(shade), this.vary(shade), this.vary(shade));
        }
      } else {
        // 📈 Lines
        if (this.sides > 2) {
          positions.push(
            this.lastPathP.shape[1],
            pathP.shape[pathP.shape.length - 1]
          );
          colors.push(this.varyLine(shade), this.varyLine(shade));
        }

        if (this.sides > 2) {
          // 6. Final across
          positions.push(pathP.shape[1], pathP.shape[pathP.shape.length - 1]);
          colors.push(this.varyLine(shade), this.varyLine(shade));
        }
      }

      this.lastPathP = pathP;
    }

    if (positions.length > 0) {
      if (form) {
        form.addPoints({ positions, colors });
      } else {
        this.form.addPoints({ positions, colors });
      }
    }
  }
}

// Turtle graphics in 3D.
class Spider {
  $;
  position;
  lastPosition;
  direction; // A directional axis-orientation vector around [0, 0, 1].
  color;
  rotation; // A quaternion.
  path = []; // A built up path.
  lastNormal; // Remembered for parallel transport / `rotateTowards`.

  constructor(
    $,
    pos = [0, 0, 0, 1],
    lp = [0, 0, 0, 1],
    dir, // A starting directional vector.
    rot, // A quaternion.
    col = [255, 255, 255, 255]
  ) {
    this.$ = $; // Shorthand any dependencies.
    // const { num: { vec3 } } = $;

    if (pos.length === 3) pos.push(1); // Make sure pos has a W coordinate.
    this.position = pos;
    this.lastPosition = lp;
    this.color = col;

    // TODO: Does this really matter?
    //this.lastNormal = [0, 1, 0];

    this.direction = dir;
    this.rotation = rot;

    this.path.push(this.state);
  }

  get state() {
    // TODO: Is slicing necessary? (Try a complex path with it off.)
    return {
      direction: this.direction.slice(),
      rotation: this.rotation.slice(),
      position: this.position.slice(),
      color: this.color.slice(),
    };
  }

  // Turn the spider towards a target, with a given tightness 0-1.
  // This uses "parallel transport" of normals to maintain orientation.
  crawlTowards(targetPosition, stepSize, tightness) {
    const {
      num: { mat3, mat4, vec3, vec4, quat },
    } = this.$;

    const firstTangent = vec3.normalize(
      vec3.create(),
      vec3.sub(vec3.create(), targetPosition, this.lastPosition)
    );

    const nextTangent = vec3.normalize(
      vec3.create(),
      vec3.sub(vec3.create(), targetPosition, this.position)
    );

    // This position stuff should come back together maybe...
    this.direction = nextTangent;
    const scaledDir = vec3.scale(vec3.create(), this.direction, stepSize);
    const pos = vec3.add(vec3.create(), this.position, scaledDir);

    // TODO: Will this only be the first normal?
    let lastNormal;
    if (this.lastNormal === undefined) {
      lastNormal = vec4.transformQuat(
        vec4.create(),
        [0, 1, 0, 1],
        this.rotation
      );
    } else {
      lastNormal = this.lastNormal;
    }

    const helper = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), lastNormal, firstTangent)
    );

    lastNormal = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), firstTangent, helper)
    );

    diffPoints.push(
      // For debugging.
      this.position,
      vec3.add(
        vec3.create(),
        this.position,
        vec3.scale(vec3.create(), firstTangent, 0.05)
      )
    );
    diffColors.push([0, 255, 255, 255], [0, 255, 255, 255]);

    let newNormal;
    let bitangent = vec3.cross(vec3.create(), firstTangent, nextTangent);

    if (vec3.length(bitangent) === 0) {
      newNormal = lastNormal;
    } else {
      // Get angle between first and next tangent.

      // 🅰️ With matrices...
      // bitangent = vec3.normalize(vec3.create(), bitangent);
      // Rotate around bitangent by `theta` radians.
      // const theta = acos(vec3.dot(firstTangent, nextTangent)) || 0;
      // const mat = mat4.fromRotation(mat4.create(), theta, bitangent);
      // newNormal = vec3.transformMat4(vec3.create(), lastNormal, mat);

      // 🅱️ or a quaternion.
      let rq = quat.rotationTo(quat.create(), firstTangent, nextTangent);
      newNormal = vec3.transformQuat(vec3.create(), lastNormal, rq);

      this.lastNormal = newNormal;
    }

    bitangent = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), newNormal, nextTangent)
    );

    diffPoints.push(
      // For debugging.
      this.position,
      vec3.add(
        vec3.create(),
        this.position,
        vec3.scale(vec3.create(), newNormal, 0.05)
      )
    );
    diffColors.push([0, 255, 0, 255], [0, 255, 0, 255]);

    diffPoints.push(
      // For debugging.
      this.position,
      vec3.add(
        vec3.create(),
        this.position,
        vec3.scale(vec3.create(), bitangent, 0.05)
      )
    );
    diffColors.push([255, 255, 0, 255], [255, 255, 0, 255]);

    // Build a rotation transform.
    const qua = quat.normalize(
      quat.create(),
      quat.fromMat3(
        quat.create(),
        mat3.fromValues(...bitangent, ...newNormal, ...nextTangent)
      )
    );

    // Interpolate it... only apply a section via `tightness` from 0-1.
    let slerpedRot = quat.slerp(quat.create(), this.rotation, qua, tightness);

    this.rotation = slerpedRot; // Only update the quaternion if it makes sense with the bitangent result.

    this.lastPosition = this.position;
    this.position = [...pos, 1];

    const state = this.state;
    this.path.push(state);
    return state;
  }

  // Set the color.
  // Note: Why not invoke the full `ink` / `color` parser from `disk` here?
  ink() {
    this.color = arguments.length === 3 ? [...arguments, 255] : [...arguments];
  }

  // Imagine a future forward position, turning an optional amount beforehand.
  peek(steps, turn) {
    return this.crawl(steps, true);
  }
}

// 🔴 Record and playback session data.
class Demo {
  startTick;
  currentTick;
  startDelay = 0n;
  frames = [];
  progress = 0n;

  constructor() {
    console.log("🔴 Recording a demo!");
  }

  // Update the demo tick. Should be tied to the end of each data update.
  sim(simCount) {
    if (this.startTick === undefined) {
      this.startTick = simCount;
      this.currentTick = simCount;
      this.progress = 0n;
    } else {
      this.currentTick = simCount;
      this.progress = this.currentTick - this.startTick - this.startDelay;
      // Offset any dead time before first interaction.
    }
  }

  // Save timestamped data to a demo frame.
  rec(label, data) {
    let frame;

    if (this.frames.length === 0) {
      this.startDelay = this.progress;
      this.progress = 0n;
    }

    if (Array.isArray(data)) {
      // Add data to a frame array, cutting any decimals to 6 places.
      frame = [
        this.progress,
        label,
        ...data.map((v) => {
          if (typeof v === "number") return parseFloat(v.toFixed(6));
          return v;
        }),
      ];
      this.frames.push(frame);
    } else {
      // Add data directly unless it's `undefined`.
      if (data === undefined) {
        frame = [this.progress, label]; // Don't send anything if data is empty.
      } else {
        frame = [this.progress, label, data]; // Make sure to keep Booleans though.
      }
      this.frames.push(frame);
    }

    if (label !== "wand")
      console.log("🔴 Recording:", frame, this.frames.length);
  }

  // Log the current results.
  print() {
    console.log("🔴 Demo frames:", this.frames);
  }

  // Clear any existing demo state / start a new demo.
  dump() {
    this.startTick = undefined;
    this.currentTick = undefined;
    this.frames = [];
    this.progress = 0n;
  }
}

class Player {
  frames;
  frameCount = 0n;
  frameIndex = 0;

  constructor(frames) {
    this.frames = frames;
  }

  sim(handler) {
    const collectedFrames = [];

    // TODO: Also cover skips here...

    let thisFrame = this.frames[this.frameIndex];

    if (!thisFrame) {
      console.log("🟡 Demo playback completed:", this.frameIndex);
      // Push a completed message with a negative frameCount to mark an ending.
      handler([[-1, "demo:complete"]]);
      return;
    }

    // Skip frames.
    if (thisFrame[0] < this.frameCount) {
      this.frameCount += 1n;
      return;
    }

    // Add any repeats / multiple actions that occur in the same frame.
    // While we have a next frame available, and the most recent
    // collected frame is the same as our current frameCount...
    while (thisFrame && thisFrame[0] === this.frameCount) {
      collectedFrames.push(thisFrame);
      this.frameIndex += 1;
      thisFrame = this.frames[this.frameIndex];
    }

    handler(collectedFrames, this.frameCount); // Run our action handler.
    this.frameCount += 1n; // Increase the frame count.
  }
}
// #endregion
