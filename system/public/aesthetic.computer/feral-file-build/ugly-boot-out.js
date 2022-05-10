const updateFps = 120;
let renderFps = 165;
const updateRate = 1e3 / updateFps;
let renderRate = 1e3 / renderFps,
  updateTime = 0,
  renderTime = 0,
  lastNow,
  input,
  updateAndRender;
function loop(now) {
  input();
  var delta = now - lastNow;
  (updateTime += delta), (renderTime += delta), (lastNow = now);
  let updateTimes = 0;
  for (; updateTime >= updateRate; )
    (updateTimes += 1), (updateTime -= updateRate);
  let needsRender = !1;
  renderTime >= renderRate && ((needsRender = !0), (renderTime -= renderRate)),
    updateAndRender(needsRender, updateTimes),
    window.requestAnimationFrame(loop);
}
function start(inputFun, updateAndRenderFun) {
  (input = inputFun),
    (updateAndRender = updateAndRenderFun),
    (lastNow = performance.now()),
    window.requestAnimationFrame(loop);
}
function frameRate(n) {
  (renderFps = n), (renderRate = 1e3 / renderFps), (renderTime = 0);
}
var EPSILON = 1e-6,
  ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array,
  RANDOM = Math.random;
function create$2() {
  var out = new ARRAY_TYPE(16);
  return (
    ARRAY_TYPE != Float32Array &&
      ((out[1] = 0),
      (out[2] = 0),
      (out[3] = 0),
      (out[4] = 0),
      (out[6] = 0),
      (out[7] = 0),
      (out[8] = 0),
      (out[9] = 0),
      (out[11] = 0),
      (out[12] = 0),
      (out[13] = 0),
      (out[14] = 0)),
    (out[0] = 1),
    (out[5] = 1),
    (out[10] = 1),
    (out[15] = 1),
    out
  );
}
function clone$2(a) {
  var out = new ARRAY_TYPE(16);
  return (
    (out[0] = a[0]),
    (out[1] = a[1]),
    (out[2] = a[2]),
    (out[3] = a[3]),
    (out[4] = a[4]),
    (out[5] = a[5]),
    (out[6] = a[6]),
    (out[7] = a[7]),
    (out[8] = a[8]),
    (out[9] = a[9]),
    (out[10] = a[10]),
    (out[11] = a[11]),
    (out[12] = a[12]),
    (out[13] = a[13]),
    (out[14] = a[14]),
    (out[15] = a[15]),
    out
  );
}
function copy$3(out, a) {
  return (
    (out[0] = a[0]),
    (out[1] = a[1]),
    (out[2] = a[2]),
    (out[3] = a[3]),
    (out[4] = a[4]),
    (out[5] = a[5]),
    (out[6] = a[6]),
    (out[7] = a[7]),
    (out[8] = a[8]),
    (out[9] = a[9]),
    (out[10] = a[10]),
    (out[11] = a[11]),
    (out[12] = a[12]),
    (out[13] = a[13]),
    (out[14] = a[14]),
    (out[15] = a[15]),
    out
  );
}
function fromValues$2(
  m00,
  m01,
  m02,
  m03,
  m10,
  m11,
  m12,
  m13,
  m20,
  m21,
  m22,
  m23,
  m30,
  m31,
  m32,
  m33
) {
  var out = new ARRAY_TYPE(16);
  return (
    (out[0] = m00),
    (out[1] = m01),
    (out[2] = m02),
    (out[3] = m03),
    (out[4] = m10),
    (out[5] = m11),
    (out[6] = m12),
    (out[7] = m13),
    (out[8] = m20),
    (out[9] = m21),
    (out[10] = m22),
    (out[11] = m23),
    (out[12] = m30),
    (out[13] = m31),
    (out[14] = m32),
    (out[15] = m33),
    out
  );
}
function set$2(
  out,
  m00,
  m01,
  m02,
  m03,
  m10,
  m11,
  m12,
  m13,
  m20,
  m21,
  m22,
  m23,
  m30,
  m31,
  m32,
  m33
) {
  return (
    (out[0] = m00),
    (out[1] = m01),
    (out[2] = m02),
    (out[3] = m03),
    (out[4] = m10),
    (out[5] = m11),
    (out[6] = m12),
    (out[7] = m13),
    (out[8] = m20),
    (out[9] = m21),
    (out[10] = m22),
    (out[11] = m23),
    (out[12] = m30),
    (out[13] = m31),
    (out[14] = m32),
    (out[15] = m33),
    out
  );
}
function identity(out) {
  return (
    (out[0] = 1),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = 1),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = 1),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function transpose(out, a) {
  var a01, a02, a03, a12, a13, a23;
  return (
    out === a
      ? ((a01 = a[1]),
        (a02 = a[2]),
        (a03 = a[3]),
        (a12 = a[6]),
        (a13 = a[7]),
        (a23 = a[11]),
        (out[1] = a[4]),
        (out[2] = a[8]),
        (out[3] = a[12]),
        (out[4] = a01),
        (out[6] = a[9]),
        (out[7] = a[13]),
        (out[8] = a02),
        (out[9] = a12),
        (out[11] = a[14]),
        (out[12] = a03),
        (out[13] = a13),
        (out[14] = a23))
      : ((out[0] = a[0]),
        (out[1] = a[4]),
        (out[2] = a[8]),
        (out[3] = a[12]),
        (out[4] = a[1]),
        (out[5] = a[5]),
        (out[6] = a[9]),
        (out[7] = a[13]),
        (out[8] = a[2]),
        (out[9] = a[6]),
        (out[10] = a[10]),
        (out[11] = a[14]),
        (out[12] = a[3]),
        (out[13] = a[7]),
        (out[14] = a[11]),
        (out[15] = a[15])),
    out
  );
}
function invert(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11],
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a = a[15],
    b00 = a00 * a11 - a01 * a10,
    b01 = a00 * a12 - a02 * a10,
    b02 = a00 * a13 - a03 * a10,
    b03 = a01 * a12 - a02 * a11,
    b04 = a01 * a13 - a03 * a11,
    b05 = a02 * a13 - a03 * a12,
    b06 = a20 * a31 - a21 * a30,
    b07 = a20 * a32 - a22 * a30,
    b08 = a20 * a - a23 * a30,
    b09 = a21 * a32 - a22 * a31,
    b10 = a21 * a - a23 * a31,
    b11 = a22 * a - a23 * a32,
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  return det
    ? ((out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * (det = 1 / det)),
      (out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det),
      (out[2] = (a31 * b05 - a32 * b04 + a * b03) * det),
      (out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det),
      (out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det),
      (out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det),
      (out[6] = (a32 * b02 - a30 * b05 - a * b01) * det),
      (out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det),
      (out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det),
      (out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det),
      (out[10] = (a30 * b04 - a31 * b02 + a * b00) * det),
      (out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det),
      (out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det),
      (out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det),
      (out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det),
      (out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det),
      out)
    : null;
}
function adjoint(out, a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11],
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a = a[15];
  return (
    (out[0] =
      a11 * (a22 * a - a23 * a32) -
      a21 * (a12 * a - a13 * a32) +
      a31 * (a12 * a23 - a13 * a22)),
    (out[1] = -(
      a01 * (a22 * a - a23 * a32) -
      a21 * (a02 * a - a03 * a32) +
      a31 * (a02 * a23 - a03 * a22)
    )),
    (out[2] =
      a01 * (a12 * a - a13 * a32) -
      a11 * (a02 * a - a03 * a32) +
      a31 * (a02 * a13 - a03 * a12)),
    (out[3] = -(
      a01 * (a12 * a23 - a13 * a22) -
      a11 * (a02 * a23 - a03 * a22) +
      a21 * (a02 * a13 - a03 * a12)
    )),
    (out[4] = -(
      a10 * (a22 * a - a23 * a32) -
      a20 * (a12 * a - a13 * a32) +
      a30 * (a12 * a23 - a13 * a22)
    )),
    (out[5] =
      a00 * (a22 * a - a23 * a32) -
      a20 * (a02 * a - a03 * a32) +
      a30 * (a02 * a23 - a03 * a22)),
    (out[6] = -(
      a00 * (a12 * a - a13 * a32) -
      a10 * (a02 * a - a03 * a32) +
      a30 * (a02 * a13 - a03 * a12)
    )),
    (out[7] =
      a00 * (a12 * a23 - a13 * a22) -
      a10 * (a02 * a23 - a03 * a22) +
      a20 * (a02 * a13 - a03 * a12)),
    (out[8] =
      a10 * (a21 * a - a23 * a31) -
      a20 * (a11 * a - a13 * a31) +
      a30 * (a11 * a23 - a13 * a21)),
    (out[9] = -(
      a00 * (a21 * a - a23 * a31) -
      a20 * (a01 * a - a03 * a31) +
      a30 * (a01 * a23 - a03 * a21)
    )),
    (out[10] =
      a00 * (a11 * a - a13 * a31) -
      a10 * (a01 * a - a03 * a31) +
      a30 * (a01 * a13 - a03 * a11)),
    (out[11] = -(
      a00 * (a11 * a23 - a13 * a21) -
      a10 * (a01 * a23 - a03 * a21) +
      a20 * (a01 * a13 - a03 * a11)
    )),
    (out[12] = -(
      a10 * (a21 * a32 - a22 * a31) -
      a20 * (a11 * a32 - a12 * a31) +
      a30 * (a11 * a22 - a12 * a21)
    )),
    (out[13] =
      a00 * (a21 * a32 - a22 * a31) -
      a20 * (a01 * a32 - a02 * a31) +
      a30 * (a01 * a22 - a02 * a21)),
    (out[14] = -(
      a00 * (a11 * a32 - a12 * a31) -
      a10 * (a01 * a32 - a02 * a31) +
      a30 * (a01 * a12 - a02 * a11)
    )),
    (out[15] =
      a00 * (a11 * a22 - a12 * a21) -
      a10 * (a01 * a22 - a02 * a21) +
      a20 * (a01 * a12 - a02 * a11)),
    out
  );
}
function determinant(a) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11],
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a = a[15];
  return (
    (a00 * a11 - a01 * a10) * (a22 * a - a23 * a32) -
    (a00 * a12 - a02 * a10) * (a21 * a - a23 * a31) +
    (a00 * a13 - a03 * a10) * (a21 * a32 - a22 * a31) +
    (a01 * a12 - a02 * a11) * (a20 * a - a23 * a30) -
    (a01 * a13 - a03 * a11) * (a20 * a32 - a22 * a30) +
    (a02 * a13 - a03 * a12) * (a20 * a31 - a21 * a30)
  );
}
function multiply$3(out, a, b) {
  var a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11],
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a = a[15],
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  return (
    (out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30),
    (out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31),
    (out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32),
    (out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a),
    (b0 = b[4]),
    (b1 = b[5]),
    (b2 = b[6]),
    (b3 = b[7]),
    (out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30),
    (out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31),
    (out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32),
    (out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a),
    (b0 = b[8]),
    (b1 = b[9]),
    (b2 = b[10]),
    (b3 = b[11]),
    (out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30),
    (out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31),
    (out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32),
    (out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a),
    (b0 = b[12]),
    (b1 = b[13]),
    (b2 = b[14]),
    (b3 = b[15]),
    (out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30),
    (out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31),
    (out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32),
    (out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a),
    out
  );
}
function translate(out, a, v) {
  var a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    x = v[0],
    y = v[1],
    v = v[2];
  return (
    a === out
      ? ((out[12] = a[0] * x + a[4] * y + a[8] * v + a[12]),
        (out[13] = a[1] * x + a[5] * y + a[9] * v + a[13]),
        (out[14] = a[2] * x + a[6] * y + a[10] * v + a[14]),
        (out[15] = a[3] * x + a[7] * y + a[11] * v + a[15]))
      : ((a00 = a[0]),
        (a01 = a[1]),
        (a02 = a[2]),
        (a03 = a[3]),
        (a10 = a[4]),
        (a11 = a[5]),
        (a12 = a[6]),
        (a13 = a[7]),
        (a20 = a[8]),
        (a21 = a[9]),
        (a22 = a[10]),
        (a23 = a[11]),
        (out[0] = a00),
        (out[1] = a01),
        (out[2] = a02),
        (out[3] = a03),
        (out[4] = a10),
        (out[5] = a11),
        (out[6] = a12),
        (out[7] = a13),
        (out[8] = a20),
        (out[9] = a21),
        (out[10] = a22),
        (out[11] = a23),
        (out[12] = a00 * x + a10 * y + a20 * v + a[12]),
        (out[13] = a01 * x + a11 * y + a21 * v + a[13]),
        (out[14] = a02 * x + a12 * y + a22 * v + a[14]),
        (out[15] = a03 * x + a13 * y + a23 * v + a[15])),
    out
  );
}
function scale$2(out, a, v) {
  var x = v[0],
    y = v[1],
    v = v[2];
  return (
    (out[0] = a[0] * x),
    (out[1] = a[1] * x),
    (out[2] = a[2] * x),
    (out[3] = a[3] * x),
    (out[4] = a[4] * y),
    (out[5] = a[5] * y),
    (out[6] = a[6] * y),
    (out[7] = a[7] * y),
    (out[8] = a[8] * v),
    (out[9] = a[9] * v),
    (out[10] = a[10] * v),
    (out[11] = a[11] * v),
    (out[12] = a[12]),
    (out[13] = a[13]),
    (out[14] = a[14]),
    (out[15] = a[15]),
    out
  );
}
function rotate$1(out, a, rad, axis) {
  var t,
    a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    b01,
    b10,
    b11,
    b12,
    b20,
    b21,
    b22,
    x = axis[0],
    y = axis[1],
    axis = axis[2],
    len = Math.hypot(x, y, axis);
  return len < EPSILON
    ? null
    : ((x *= len = 1 / len),
      (y *= len),
      (axis *= len),
      (len = Math.sin(rad)),
      (rad = Math.cos(rad)),
      (a00 = a[0]),
      (a01 = a[1]),
      (a02 = a[2]),
      (a03 = a[3]),
      (a10 = a[4]),
      (a11 = a[5]),
      (a12 = a[6]),
      (a13 = a[7]),
      (a20 = a[8]),
      (a21 = a[9]),
      (a22 = a[10]),
      (a23 = a[11]),
      (b10 = x * y * (t = 1 - rad) - axis * len),
      (b11 = y * y * t + rad),
      (b12 = axis * y * t + x * len),
      (b20 = x * axis * t + y * len),
      (b21 = y * axis * t - x * len),
      (b22 = axis * axis * t + rad),
      (out[0] =
        a00 * (rad = x * x * t + rad) +
        a10 * (b01 = y * x * t + axis * len) +
        a20 * (axis = axis * x * t - y * len)),
      (out[1] = a01 * rad + a11 * b01 + a21 * axis),
      (out[2] = a02 * rad + a12 * b01 + a22 * axis),
      (out[3] = a03 * rad + a13 * b01 + a23 * axis),
      (out[4] = a00 * b10 + a10 * b11 + a20 * b12),
      (out[5] = a01 * b10 + a11 * b11 + a21 * b12),
      (out[6] = a02 * b10 + a12 * b11 + a22 * b12),
      (out[7] = a03 * b10 + a13 * b11 + a23 * b12),
      (out[8] = a00 * b20 + a10 * b21 + a20 * b22),
      (out[9] = a01 * b20 + a11 * b21 + a21 * b22),
      (out[10] = a02 * b20 + a12 * b21 + a22 * b22),
      (out[11] = a03 * b20 + a13 * b21 + a23 * b22),
      a !== out &&
        ((out[12] = a[12]),
        (out[13] = a[13]),
        (out[14] = a[14]),
        (out[15] = a[15])),
      out);
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad),
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  return (
    a !== out &&
      ((out[0] = a[0]),
      (out[1] = a[1]),
      (out[2] = a[2]),
      (out[3] = a[3]),
      (out[12] = a[12]),
      (out[13] = a[13]),
      (out[14] = a[14]),
      (out[15] = a[15])),
    (out[4] = a10 * rad + a20 * s),
    (out[5] = a11 * rad + a21 * s),
    (out[6] = a12 * rad + a22 * s),
    (out[7] = a13 * rad + a23 * s),
    (out[8] = a20 * rad - a10 * s),
    (out[9] = a21 * rad - a11 * s),
    (out[10] = a22 * rad - a12 * s),
    (out[11] = a23 * rad - a13 * s),
    out
  );
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad),
    a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  return (
    a !== out &&
      ((out[4] = a[4]),
      (out[5] = a[5]),
      (out[6] = a[6]),
      (out[7] = a[7]),
      (out[12] = a[12]),
      (out[13] = a[13]),
      (out[14] = a[14]),
      (out[15] = a[15])),
    (out[0] = a00 * rad - a20 * s),
    (out[1] = a01 * rad - a21 * s),
    (out[2] = a02 * rad - a22 * s),
    (out[3] = a03 * rad - a23 * s),
    (out[8] = a00 * s + a20 * rad),
    (out[9] = a01 * s + a21 * rad),
    (out[10] = a02 * s + a22 * rad),
    (out[11] = a03 * s + a23 * rad),
    out
  );
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad),
    a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3],
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  return (
    a !== out &&
      ((out[8] = a[8]),
      (out[9] = a[9]),
      (out[10] = a[10]),
      (out[11] = a[11]),
      (out[12] = a[12]),
      (out[13] = a[13]),
      (out[14] = a[14]),
      (out[15] = a[15])),
    (out[0] = a00 * rad + a10 * s),
    (out[1] = a01 * rad + a11 * s),
    (out[2] = a02 * rad + a12 * s),
    (out[3] = a03 * rad + a13 * s),
    (out[4] = a10 * rad - a00 * s),
    (out[5] = a11 * rad - a01 * s),
    (out[6] = a12 * rad - a02 * s),
    (out[7] = a13 * rad - a03 * s),
    out
  );
}
function fromTranslation(out, v) {
  return (
    (out[0] = 1),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = 1),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = 1),
    (out[11] = 0),
    (out[12] = v[0]),
    (out[13] = v[1]),
    (out[14] = v[2]),
    (out[15] = 1),
    out
  );
}
function fromScaling(out, v) {
  return (
    (out[0] = v[0]),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = v[1]),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = v[2]),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function fromRotation(out, rad, axis) {
  var t,
    x = axis[0],
    y = axis[1],
    axis = axis[2],
    len = Math.hypot(x, y, axis);
  return len < EPSILON
    ? null
    : ((x *= len = 1 / len),
      (y *= len),
      (axis *= len),
      (len = Math.sin(rad)),
      (rad = Math.cos(rad)),
      (out[0] = x * x * (t = 1 - rad) + rad),
      (out[1] = y * x * t + axis * len),
      (out[2] = axis * x * t - y * len),
      (out[3] = 0),
      (out[4] = x * y * t - axis * len),
      (out[5] = y * y * t + rad),
      (out[6] = axis * y * t + x * len),
      (out[7] = 0),
      (out[8] = x * axis * t + y * len),
      (out[9] = y * axis * t - x * len),
      (out[10] = axis * axis * t + rad),
      (out[11] = 0),
      (out[12] = 0),
      (out[13] = 0),
      (out[14] = 0),
      (out[15] = 1),
      out);
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad);
  return (
    (out[0] = 1),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = rad),
    (out[6] = s),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = -s),
    (out[10] = rad),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad);
  return (
    (out[0] = rad),
    (out[1] = 0),
    (out[2] = -s),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = 1),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = s),
    (out[9] = 0),
    (out[10] = rad),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad),
    rad = Math.cos(rad);
  return (
    (out[0] = rad),
    (out[1] = s),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = -s),
    (out[5] = rad),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = 1),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function fromRotationTranslation(out, q, v) {
  var x = q[0],
    y = q[1],
    z = q[2],
    q = q[3],
    x2 = x + x,
    y2 = y + y,
    z2 = z + z,
    xx = x * x2,
    xy = x * y2,
    x = x * z2,
    yy = y * y2,
    y = y * z2,
    z = z * z2,
    x2 = q * x2,
    y2 = q * y2,
    q = q * z2;
  return (
    (out[0] = 1 - (yy + z)),
    (out[1] = xy + q),
    (out[2] = x - y2),
    (out[3] = 0),
    (out[4] = xy - q),
    (out[5] = 1 - (xx + z)),
    (out[6] = y + x2),
    (out[7] = 0),
    (out[8] = x + y2),
    (out[9] = y - x2),
    (out[10] = 1 - (xx + yy)),
    (out[11] = 0),
    (out[12] = v[0]),
    (out[13] = v[1]),
    (out[14] = v[2]),
    (out[15] = 1),
    out
  );
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3),
    bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7],
    magnitude = bx * bx + by * by + bz * bz + bw * bw;
  return (
    0 < magnitude
      ? ((translation[0] =
          (2 * (ax * bw + aw * bx + ay * bz - az * by)) / magnitude),
        (translation[1] =
          (2 * (ay * bw + aw * by + az * bx - ax * bz)) / magnitude),
        (translation[2] =
          (2 * (az * bw + aw * bz + ax * by - ay * bx)) / magnitude))
      : ((translation[0] = 2 * (ax * bw + aw * bx + ay * bz - az * by)),
        (translation[1] = 2 * (ay * bw + aw * by + az * bx - ax * bz)),
        (translation[2] = 2 * (az * bw + aw * bz + ax * by - ay * bx))),
    fromRotationTranslation(out, a, translation),
    out
  );
}
function getTranslation(out, mat) {
  return (out[0] = mat[12]), (out[1] = mat[13]), (out[2] = mat[14]), out;
}
function getScaling(out, mat) {
  var m11 = mat[0],
    m12 = mat[1],
    m13 = mat[2],
    m21 = mat[4],
    m22 = mat[5],
    m23 = mat[6],
    m31 = mat[8],
    m32 = mat[9],
    mat = mat[10];
  return (
    (out[0] = Math.hypot(m11, m12, m13)),
    (out[1] = Math.hypot(m21, m22, m23)),
    (out[2] = Math.hypot(m31, m32, mat)),
    out
  );
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3),
    is1 = (getScaling(scaling, mat), 1 / scaling[0]),
    is2 = 1 / scaling[1],
    scaling = 1 / scaling[2],
    sm11 = mat[0] * is1,
    sm12 = mat[1] * is2,
    sm13 = mat[2] * scaling,
    sm21 = mat[4] * is1,
    sm22 = mat[5] * is2,
    sm23 = mat[6] * scaling,
    is1 = mat[8] * is1,
    is2 = mat[9] * is2,
    mat = mat[10] * scaling,
    scaling = sm11 + sm22 + mat,
    S = 0;
  return (
    0 < scaling
      ? ((S = 2 * Math.sqrt(1 + scaling)),
        (out[3] = 0.25 * S),
        (out[0] = (sm23 - is2) / S),
        (out[1] = (is1 - sm13) / S),
        (out[2] = (sm12 - sm21) / S))
      : sm22 < sm11 && mat < sm11
      ? ((S = 2 * Math.sqrt(1 + sm11 - sm22 - mat)),
        (out[3] = (sm23 - is2) / S),
        (out[0] = 0.25 * S),
        (out[1] = (sm12 + sm21) / S),
        (out[2] = (is1 + sm13) / S))
      : mat < sm22
      ? ((S = 2 * Math.sqrt(1 + sm22 - sm11 - mat)),
        (out[3] = (is1 - sm13) / S),
        (out[0] = (sm12 + sm21) / S),
        (out[1] = 0.25 * S),
        (out[2] = (sm23 + is2) / S))
      : ((S = 2 * Math.sqrt(1 + mat - sm11 - sm22)),
        (out[3] = (sm12 - sm21) / S),
        (out[0] = (is1 + sm13) / S),
        (out[1] = (sm23 + is2) / S),
        (out[2] = 0.25 * S)),
    out
  );
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0],
    y = q[1],
    z = q[2],
    q = q[3],
    x2 = x + x,
    y2 = y + y,
    z2 = z + z,
    xx = x * x2,
    xy = x * y2,
    x = x * z2,
    yy = y * y2,
    y = y * z2,
    z = z * z2,
    x2 = q * x2,
    y2 = q * y2,
    q = q * z2,
    z2 = s[0],
    sy = s[1],
    s = s[2];
  return (
    (out[0] = (1 - (yy + z)) * z2),
    (out[1] = (xy + q) * z2),
    (out[2] = (x - y2) * z2),
    (out[3] = 0),
    (out[4] = (xy - q) * sy),
    (out[5] = (1 - (xx + z)) * sy),
    (out[6] = (y + x2) * sy),
    (out[7] = 0),
    (out[8] = (x + y2) * s),
    (out[9] = (y - x2) * s),
    (out[10] = (1 - (xx + yy)) * s),
    (out[11] = 0),
    (out[12] = v[0]),
    (out[13] = v[1]),
    (out[14] = v[2]),
    (out[15] = 1),
    out
  );
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0],
    y = q[1],
    z = q[2],
    q = q[3],
    x2 = x + x,
    y2 = y + y,
    z2 = z + z,
    xx = x * x2,
    xy = x * y2,
    x = x * z2,
    yy = y * y2,
    y = y * z2,
    z = z * z2,
    x2 = q * x2,
    y2 = q * y2,
    q = q * z2,
    z2 = s[0],
    sy = s[1],
    s = s[2],
    ox = o[0],
    oy = o[1],
    o = o[2],
    out0 = (1 - (yy + z)) * z2,
    out1 = (xy + q) * z2,
    z2 = (x - y2) * z2,
    xy = (xy - q) * sy,
    q = (1 - (xx + z)) * sy,
    z = (y + x2) * sy,
    sy = (x + y2) * s,
    x = (y - x2) * s,
    y2 = (1 - (xx + yy)) * s;
  return (
    (out[0] = out0),
    (out[1] = out1),
    (out[2] = z2),
    (out[3] = 0),
    (out[4] = xy),
    (out[5] = q),
    (out[6] = z),
    (out[7] = 0),
    (out[8] = sy),
    (out[9] = x),
    (out[10] = y2),
    (out[11] = 0),
    (out[12] = v[0] + ox - (out0 * ox + xy * oy + sy * o)),
    (out[13] = v[1] + oy - (out1 * ox + q * oy + x * o)),
    (out[14] = v[2] + o - (z2 * ox + z * oy + y2 * o)),
    (out[15] = 1),
    out
  );
}
function fromQuat(out, q) {
  var x = q[0],
    y = q[1],
    z = q[2],
    q = q[3],
    x2 = x + x,
    y2 = y + y,
    z2 = z + z,
    x = x * x2,
    yx = y * x2,
    y = y * y2,
    zx = z * x2,
    zy = z * y2,
    z = z * z2,
    x2 = q * x2,
    y2 = q * y2,
    q = q * z2;
  return (
    (out[0] = 1 - y - z),
    (out[1] = yx + q),
    (out[2] = zx - y2),
    (out[3] = 0),
    (out[4] = yx - q),
    (out[5] = 1 - x - z),
    (out[6] = zy + x2),
    (out[7] = 0),
    (out[8] = zx + y2),
    (out[9] = zy - x2),
    (out[10] = 1 - x - y),
    (out[11] = 0),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = 0),
    (out[15] = 1),
    out
  );
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left),
    tb = 1 / (top - bottom),
    nf = 1 / (near - far);
  return (
    (out[0] = 2 * near * rl),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = 2 * near * tb),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = (right + left) * rl),
    (out[9] = (top + bottom) * tb),
    (out[10] = (far + near) * nf),
    (out[11] = -1),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = far * near * 2 * nf),
    (out[15] = 0),
    out
  );
}
function perspectiveNO(out, fovy, aspect, near, far) {
  fovy = 1 / Math.tan(fovy / 2);
  return (
    (out[0] = fovy / aspect),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = fovy),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[11] = -1),
    (out[12] = 0),
    (out[13] = 0),
    (out[15] = 0),
    null != far && far !== 1 / 0
      ? ((out[10] = (far + near) * (aspect = 1 / (near - far))),
        (out[14] = 2 * far * near * aspect))
      : ((out[10] = -1), (out[14] = -2 * near)),
    out
  );
}
Math.hypot ||
  (Math.hypot = function () {
    for (var y = 0, i = arguments.length; i--; )
      y += arguments[i] * arguments[i];
    return Math.sqrt(y);
  });
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  fovy = 1 / Math.tan(fovy / 2);
  return (
    (out[0] = fovy / aspect),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = fovy),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[11] = -1),
    (out[12] = 0),
    (out[13] = 0),
    (out[15] = 0),
    null != far && far !== 1 / 0
      ? ((out[10] = far * (aspect = 1 / (near - far))),
        (out[14] = far * near * aspect))
      : ((out[10] = -1), (out[14] = -near)),
    out
  );
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan((fov.upDegrees * Math.PI) / 180),
    downTan = Math.tan((fov.downDegrees * Math.PI) / 180),
    leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180),
    fov = Math.tan((fov.rightDegrees * Math.PI) / 180),
    xScale = 2 / (leftTan + fov),
    yScale = 2 / (upTan + downTan);
  return (
    (out[0] = xScale),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = yScale),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = -(leftTan - fov) * xScale * 0.5),
    (out[9] = (upTan - downTan) * yScale * 0.5),
    (out[10] = far / (near - far)),
    (out[11] = -1),
    (out[12] = 0),
    (out[13] = 0),
    (out[14] = (far * near) / (near - far)),
    (out[15] = 0),
    out
  );
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right),
    bt = 1 / (bottom - top),
    nf = 1 / (near - far);
  return (
    (out[0] = -2 * lr),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = -2 * bt),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = 2 * nf),
    (out[11] = 0),
    (out[12] = (left + right) * lr),
    (out[13] = (top + bottom) * bt),
    (out[14] = (far + near) * nf),
    (out[15] = 1),
    out
  );
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right),
    bt = 1 / (bottom - top),
    far = 1 / (near - far);
  return (
    (out[0] = -2 * lr),
    (out[1] = 0),
    (out[2] = 0),
    (out[3] = 0),
    (out[4] = 0),
    (out[5] = -2 * bt),
    (out[6] = 0),
    (out[7] = 0),
    (out[8] = 0),
    (out[9] = 0),
    (out[10] = far),
    (out[11] = 0),
    (out[12] = (left + right) * lr),
    (out[13] = (top + bottom) * bt),
    (out[14] = near * far),
    (out[15] = 1),
    out
  );
}
function lookAt(out, eye, center, up) {
  var x0,
    y1,
    y2,
    len,
    eyex = eye[0],
    eyey = eye[1],
    eye = eye[2],
    upx = up[0],
    upy = up[1],
    up = up[2],
    centerx = center[0],
    centery = center[1],
    center = center[2];
  return Math.abs(eyex - centerx) < EPSILON &&
    Math.abs(eyey - centery) < EPSILON &&
    Math.abs(eye - center) < EPSILON
    ? identity(out)
    : ((center = eye - center),
      (x0 =
        upy *
          (center *= len =
            1 /
            Math.hypot(
              (centerx = eyex - centerx),
              (centery = eyey - centery),
              center
            )) -
        up * (centery *= len)),
      (up = up * (centerx *= len) - upx * center),
      (upx = upx * centery - upy * centerx),
      (len = Math.hypot(x0, up, upx))
        ? ((x0 *= len = 1 / len), (up *= len), (upx *= len))
        : (upx = up = x0 = 0),
      (upy = centery * upx - center * up),
      (y1 = center * x0 - centerx * upx),
      (y2 = centerx * up - centery * x0),
      (len = Math.hypot(upy, y1, y2))
        ? ((upy *= len = 1 / len), (y1 *= len), (y2 *= len))
        : (y2 = y1 = upy = 0),
      (out[0] = x0),
      (out[1] = upy),
      (out[2] = centerx),
      (out[3] = 0),
      (out[4] = up),
      (out[5] = y1),
      (out[6] = centery),
      (out[7] = 0),
      (out[8] = upx),
      (out[9] = y2),
      (out[10] = center),
      (out[11] = 0),
      (out[12] = -(x0 * eyex + up * eyey + upx * eye)),
      (out[13] = -(upy * eyex + y1 * eyey + y2 * eye)),
      (out[14] = -(centerx * eyex + centery * eyey + center * eye)),
      (out[15] = 1),
      out);
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0],
    eyey = eye[1],
    eye = eye[2],
    upx = up[0],
    upy = up[1],
    up = up[2],
    z0 = eyex - target[0],
    z1 = eyey - target[1],
    target = eye - target[2],
    len = z0 * z0 + z1 * z1 + target * target,
    x0 =
      (0 < len &&
        ((z0 *= len = 1 / Math.sqrt(len)), (z1 *= len), (target *= len)),
      upy * target - up * z1),
    up = up * z0 - upx * target,
    upx = upx * z1 - upy * z0;
  return (
    0 < (len = x0 * x0 + up * up + upx * upx) &&
      ((x0 *= len = 1 / Math.sqrt(len)), (up *= len), (upx *= len)),
    (out[0] = x0),
    (out[1] = up),
    (out[2] = upx),
    (out[3] = 0),
    (out[4] = z1 * upx - target * up),
    (out[5] = target * x0 - z0 * upx),
    (out[6] = z0 * up - z1 * x0),
    (out[7] = 0),
    (out[8] = z0),
    (out[9] = z1),
    (out[10] = target),
    (out[11] = 0),
    (out[12] = eyex),
    (out[13] = eyey),
    (out[14] = eye),
    (out[15] = 1),
    out
  );
}
function str$2(a) {
  return (
    "mat4(" +
    a[0] +
    ", " +
    a[1] +
    ", " +
    a[2] +
    ", " +
    a[3] +
    ", " +
    a[4] +
    ", " +
    a[5] +
    ", " +
    a[6] +
    ", " +
    a[7] +
    ", " +
    a[8] +
    ", " +
    a[9] +
    ", " +
    a[10] +
    ", " +
    a[11] +
    ", " +
    a[12] +
    ", " +
    a[13] +
    ", " +
    a[14] +
    ", " +
    a[15] +
    ")"
  );
}
function frob(a) {
  return Math.hypot(
    a[0],
    a[1],
    a[2],
    a[3],
    a[4],
    a[5],
    a[6],
    a[7],
    a[8],
    a[9],
    a[10],
    a[11],
    a[12],
    a[13],
    a[14],
    a[15]
  );
}
function add$2(out, a, b) {
  return (
    (out[0] = a[0] + b[0]),
    (out[1] = a[1] + b[1]),
    (out[2] = a[2] + b[2]),
    (out[3] = a[3] + b[3]),
    (out[4] = a[4] + b[4]),
    (out[5] = a[5] + b[5]),
    (out[6] = a[6] + b[6]),
    (out[7] = a[7] + b[7]),
    (out[8] = a[8] + b[8]),
    (out[9] = a[9] + b[9]),
    (out[10] = a[10] + b[10]),
    (out[11] = a[11] + b[11]),
    (out[12] = a[12] + b[12]),
    (out[13] = a[13] + b[13]),
    (out[14] = a[14] + b[14]),
    (out[15] = a[15] + b[15]),
    out
  );
}
function subtract$2(out, a, b) {
  return (
    (out[0] = a[0] - b[0]),
    (out[1] = a[1] - b[1]),
    (out[2] = a[2] - b[2]),
    (out[3] = a[3] - b[3]),
    (out[4] = a[4] - b[4]),
    (out[5] = a[5] - b[5]),
    (out[6] = a[6] - b[6]),
    (out[7] = a[7] - b[7]),
    (out[8] = a[8] - b[8]),
    (out[9] = a[9] - b[9]),
    (out[10] = a[10] - b[10]),
    (out[11] = a[11] - b[11]),
    (out[12] = a[12] - b[12]),
    (out[13] = a[13] - b[13]),
    (out[14] = a[14] - b[14]),
    (out[15] = a[15] - b[15]),
    out
  );
}
function multiplyScalar(out, a, b) {
  return (
    (out[0] = a[0] * b),
    (out[1] = a[1] * b),
    (out[2] = a[2] * b),
    (out[3] = a[3] * b),
    (out[4] = a[4] * b),
    (out[5] = a[5] * b),
    (out[6] = a[6] * b),
    (out[7] = a[7] * b),
    (out[8] = a[8] * b),
    (out[9] = a[9] * b),
    (out[10] = a[10] * b),
    (out[11] = a[11] * b),
    (out[12] = a[12] * b),
    (out[13] = a[13] * b),
    (out[14] = a[14] * b),
    (out[15] = a[15] * b),
    out
  );
}
function multiplyScalarAndAdd(out, a, b, scale) {
  return (
    (out[0] = a[0] + b[0] * scale),
    (out[1] = a[1] + b[1] * scale),
    (out[2] = a[2] + b[2] * scale),
    (out[3] = a[3] + b[3] * scale),
    (out[4] = a[4] + b[4] * scale),
    (out[5] = a[5] + b[5] * scale),
    (out[6] = a[6] + b[6] * scale),
    (out[7] = a[7] + b[7] * scale),
    (out[8] = a[8] + b[8] * scale),
    (out[9] = a[9] + b[9] * scale),
    (out[10] = a[10] + b[10] * scale),
    (out[11] = a[11] + b[11] * scale),
    (out[12] = a[12] + b[12] * scale),
    (out[13] = a[13] + b[13] * scale),
    (out[14] = a[14] + b[14] * scale),
    (out[15] = a[15] + b[15] * scale),
    out
  );
}
function exactEquals$2(a, b) {
  return (
    a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3] &&
    a[4] === b[4] &&
    a[5] === b[5] &&
    a[6] === b[6] &&
    a[7] === b[7] &&
    a[8] === b[8] &&
    a[9] === b[9] &&
    a[10] === b[10] &&
    a[11] === b[11] &&
    a[12] === b[12] &&
    a[13] === b[13] &&
    a[14] === b[14] &&
    a[15] === b[15]
  );
}
function equals$2(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5],
    a6 = a[6],
    a7 = a[7],
    a8 = a[8],
    a9 = a[9],
    a10 = a[10],
    a11 = a[11],
    a12 = a[12],
    a13 = a[13],
    a14 = a[14],
    a = a[15],
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b = b[15];
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
    Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
    Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
    Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
    Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
    Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
    Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) &&
    Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) &&
    Math.abs(a10 - b10) <=
      EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) &&
    Math.abs(a11 - b11) <=
      EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) &&
    Math.abs(a12 - b12) <=
      EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) &&
    Math.abs(a13 - b13) <=
      EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) &&
    Math.abs(a14 - b14) <=
      EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) &&
    Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
  );
}
var mul$2 = multiply$3,
  sub$2 = subtract$2,
  mat4 = Object.freeze({
    __proto__: null,
    create: create$2,
    clone: clone$2,
    copy: copy$3,
    fromValues: fromValues$2,
    set: set$2,
    identity: identity,
    transpose: transpose,
    invert: invert,
    adjoint: adjoint,
    determinant: determinant,
    multiply: multiply$3,
    translate: translate,
    scale: scale$2,
    rotate: rotate$1,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    fromTranslation: fromTranslation,
    fromScaling: fromScaling,
    fromRotation: fromRotation,
    fromXRotation: fromXRotation,
    fromYRotation: fromYRotation,
    fromZRotation: fromZRotation,
    fromRotationTranslation: fromRotationTranslation,
    fromQuat2: fromQuat2,
    getTranslation: getTranslation,
    getScaling: getScaling,
    getRotation: getRotation,
    fromRotationTranslationScale: fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
    fromQuat: fromQuat,
    frustum: frustum,
    perspectiveNO: perspectiveNO,
    perspective: perspective,
    perspectiveZO: perspectiveZO,
    perspectiveFromFieldOfView: perspectiveFromFieldOfView,
    orthoNO: orthoNO,
    ortho: ortho,
    orthoZO: orthoZO,
    lookAt: lookAt,
    targetTo: targetTo,
    str: str$2,
    frob: frob,
    add: add$2,
    subtract: subtract$2,
    multiplyScalar: multiplyScalar,
    multiplyScalarAndAdd: multiplyScalarAndAdd,
    exactEquals: exactEquals$2,
    equals: equals$2,
    mul: mul$2,
    sub: sub$2,
  });
function create$1() {
  var out = new ARRAY_TYPE(2);
  return ARRAY_TYPE != Float32Array && ((out[0] = 0), (out[1] = 0)), out;
}
function clone$1(a) {
  var out = new ARRAY_TYPE(2);
  return (out[0] = a[0]), (out[1] = a[1]), out;
}
function fromValues$1(x, y) {
  var out = new ARRAY_TYPE(2);
  return (out[0] = x), (out[1] = y), out;
}
function copy$2(out, a) {
  return (out[0] = a[0]), (out[1] = a[1]), out;
}
function set$1(out, x, y) {
  return (out[0] = x), (out[1] = y), out;
}
function add$1(out, a, b) {
  return (out[0] = a[0] + b[0]), (out[1] = a[1] + b[1]), out;
}
function subtract$1(out, a, b) {
  return (out[0] = a[0] - b[0]), (out[1] = a[1] - b[1]), out;
}
function multiply$2(out, a, b) {
  return (out[0] = a[0] * b[0]), (out[1] = a[1] * b[1]), out;
}
function divide$1(out, a, b) {
  return (out[0] = a[0] / b[0]), (out[1] = a[1] / b[1]), out;
}
function ceil$2(out, a) {
  return (out[0] = Math.ceil(a[0])), (out[1] = Math.ceil(a[1])), out;
}
function floor$4(out, a) {
  return (out[0] = Math.floor(a[0])), (out[1] = Math.floor(a[1])), out;
}
function min$2(out, a, b) {
  return (out[0] = Math.min(a[0], b[0])), (out[1] = Math.min(a[1], b[1])), out;
}
function max$1(out, a, b) {
  return (out[0] = Math.max(a[0], b[0])), (out[1] = Math.max(a[1], b[1])), out;
}
function round$3(out, a) {
  return (out[0] = Math.round(a[0])), (out[1] = Math.round(a[1])), out;
}
function scale$1(out, a, b) {
  return (out[0] = a[0] * b), (out[1] = a[1] * b), out;
}
function scaleAndAdd$1(out, a, b, scale) {
  return (out[0] = a[0] + b[0] * scale), (out[1] = a[1] + b[1] * scale), out;
}
function distance$1(a, b) {
  var x = b[0] - a[0],
    b = b[1] - a[1];
  return Math.hypot(x, b);
}
function squaredDistance$1(a, b) {
  var x = b[0] - a[0],
    b = b[1] - a[1];
  return x * x + b * b;
}
function length$1(a) {
  var x = a[0],
    a = a[1];
  return Math.hypot(x, a);
}
function squaredLength$1(a) {
  var x = a[0],
    a = a[1];
  return x * x + a * a;
}
function negate$1(out, a) {
  return (out[0] = -a[0]), (out[1] = -a[1]), out;
}
function inverse$1(out, a) {
  return (out[0] = 1 / a[0]), (out[1] = 1 / a[1]), out;
}
function normalize$1(out, a) {
  var x = a[0],
    y = a[1],
    x = x * x + y * y;
  return (
    0 < x && (x = 1 / Math.sqrt(x)),
    (out[0] = a[0] * x),
    (out[1] = a[1] * x),
    out
  );
}
function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross$1(out, a, b) {
  a = a[0] * b[1] - a[1] * b[0];
  return (out[0] = out[1] = 0), (out[2] = a), out;
}
function lerp$2(out, a, b, t) {
  var ax = a[0],
    a = a[1];
  return (out[0] = ax + t * (b[0] - ax)), (out[1] = a + t * (b[1] - a)), out;
}
function random$1(out, scale) {
  scale = scale || 1;
  var r = 2 * RANDOM() * Math.PI;
  return (out[0] = Math.cos(r) * scale), (out[1] = Math.sin(r) * scale), out;
}
function transformMat2(out, a, m) {
  var x = a[0],
    a = a[1];
  return (out[0] = m[0] * x + m[2] * a), (out[1] = m[1] * x + m[3] * a), out;
}
function transformMat2d(out, a, m) {
  var x = a[0],
    a = a[1];
  return (
    (out[0] = m[0] * x + m[2] * a + m[4]),
    (out[1] = m[1] * x + m[3] * a + m[5]),
    out
  );
}
function transformMat3(out, a, m) {
  var x = a[0],
    a = a[1];
  return (
    (out[0] = m[0] * x + m[3] * a + m[6]),
    (out[1] = m[1] * x + m[4] * a + m[7]),
    out
  );
}
function transformMat4$1(out, a, m) {
  var x = a[0],
    a = a[1];
  return (
    (out[0] = m[0] * x + m[4] * a + m[12]),
    (out[1] = m[1] * x + m[5] * a + m[13]),
    out
  );
}
function rotate(out, a, b, rad) {
  var p0 = a[0] - b[0],
    a = a[1] - b[1],
    sinC = Math.sin(rad),
    rad = Math.cos(rad);
  return (
    (out[0] = p0 * rad - a * sinC + b[0]),
    (out[1] = p0 * sinC + a * rad + b[1]),
    out
  );
}
function angle(a, b) {
  var x1 = a[0],
    a = a[1],
    x2 = b[0],
    b = b[1],
    mag = Math.sqrt(x1 * x1 + a * a) * Math.sqrt(x2 * x2 + b * b);
  return Math.acos(Math.min(Math.max(mag && (x1 * x2 + a * b) / mag, -1), 1));
}
function zero$1(out) {
  return (out[0] = 0), (out[1] = 0), out;
}
function str$1(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals$1(a, b) {
  var a0 = a[0],
    a = a[1],
    b0 = b[0],
    b = b[1];
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
  );
}
var len$1 = length$1,
  sub$1 = subtract$1,
  mul$1 = multiply$2,
  div$1 = divide$1,
  dist$2 = distance$1,
  sqrDist$1 = squaredDistance$1,
  sqrLen$1 = squaredLength$1,
  forEach$1 = (function () {
    var vec = create$1();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      for (
        stride = stride || 2,
          offset = offset || 0,
          l = count ? Math.min(count * stride + offset, a.length) : a.length,
          i = offset;
        i < l;
        i += stride
      )
        (vec[0] = a[i]),
          (vec[1] = a[i + 1]),
          fn(vec, vec, arg),
          (a[i] = vec[0]),
          (a[i + 1] = vec[1]);
      return a;
    };
  })(),
  vec2 = Object.freeze({
    __proto__: null,
    create: create$1,
    clone: clone$1,
    fromValues: fromValues$1,
    copy: copy$2,
    set: set$1,
    add: add$1,
    subtract: subtract$1,
    multiply: multiply$2,
    divide: divide$1,
    ceil: ceil$2,
    floor: floor$4,
    min: min$2,
    max: max$1,
    round: round$3,
    scale: scale$1,
    scaleAndAdd: scaleAndAdd$1,
    distance: distance$1,
    squaredDistance: squaredDistance$1,
    length: length$1,
    squaredLength: squaredLength$1,
    negate: negate$1,
    inverse: inverse$1,
    normalize: normalize$1,
    dot: dot$1,
    cross: cross$1,
    lerp: lerp$2,
    random: random$1,
    transformMat2: transformMat2,
    transformMat2d: transformMat2d,
    transformMat3: transformMat3,
    transformMat4: transformMat4$1,
    rotate: rotate,
    angle: angle,
    zero: zero$1,
    str: str$1,
    exactEquals: exactEquals$1,
    equals: equals$1,
    len: len$1,
    sub: sub$1,
    mul: mul$1,
    div: div$1,
    dist: dist$2,
    sqrDist: sqrDist$1,
    sqrLen: sqrLen$1,
    forEach: forEach$1,
  });
function create() {
  var out = new ARRAY_TYPE(4);
  return (
    ARRAY_TYPE != Float32Array &&
      ((out[0] = 0), (out[1] = 0), (out[2] = 0), (out[3] = 0)),
    out
  );
}
function clone(a) {
  var out = new ARRAY_TYPE(4);
  return (
    (out[0] = a[0]), (out[1] = a[1]), (out[2] = a[2]), (out[3] = a[3]), out
  );
}
function fromValues(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  return (out[0] = x), (out[1] = y), (out[2] = z), (out[3] = w), out;
}
function copy$1(out, a) {
  return (
    (out[0] = a[0]), (out[1] = a[1]), (out[2] = a[2]), (out[3] = a[3]), out
  );
}
function set(out, x, y, z, w) {
  return (out[0] = x), (out[1] = y), (out[2] = z), (out[3] = w), out;
}
function add(out, a, b) {
  return (
    (out[0] = a[0] + b[0]),
    (out[1] = a[1] + b[1]),
    (out[2] = a[2] + b[2]),
    (out[3] = a[3] + b[3]),
    out
  );
}
function subtract(out, a, b) {
  return (
    (out[0] = a[0] - b[0]),
    (out[1] = a[1] - b[1]),
    (out[2] = a[2] - b[2]),
    (out[3] = a[3] - b[3]),
    out
  );
}
function multiply$1(out, a, b) {
  return (
    (out[0] = a[0] * b[0]),
    (out[1] = a[1] * b[1]),
    (out[2] = a[2] * b[2]),
    (out[3] = a[3] * b[3]),
    out
  );
}
function divide(out, a, b) {
  return (
    (out[0] = a[0] / b[0]),
    (out[1] = a[1] / b[1]),
    (out[2] = a[2] / b[2]),
    (out[3] = a[3] / b[3]),
    out
  );
}
function ceil$1(out, a) {
  return (
    (out[0] = Math.ceil(a[0])),
    (out[1] = Math.ceil(a[1])),
    (out[2] = Math.ceil(a[2])),
    (out[3] = Math.ceil(a[3])),
    out
  );
}
function floor$3(out, a) {
  return (
    (out[0] = Math.floor(a[0])),
    (out[1] = Math.floor(a[1])),
    (out[2] = Math.floor(a[2])),
    (out[3] = Math.floor(a[3])),
    out
  );
}
function min$1(out, a, b) {
  return (
    (out[0] = Math.min(a[0], b[0])),
    (out[1] = Math.min(a[1], b[1])),
    (out[2] = Math.min(a[2], b[2])),
    (out[3] = Math.min(a[3], b[3])),
    out
  );
}
function max(out, a, b) {
  return (
    (out[0] = Math.max(a[0], b[0])),
    (out[1] = Math.max(a[1], b[1])),
    (out[2] = Math.max(a[2], b[2])),
    (out[3] = Math.max(a[3], b[3])),
    out
  );
}
function round$2(out, a) {
  return (
    (out[0] = Math.round(a[0])),
    (out[1] = Math.round(a[1])),
    (out[2] = Math.round(a[2])),
    (out[3] = Math.round(a[3])),
    out
  );
}
function scale(out, a, b) {
  return (
    (out[0] = a[0] * b),
    (out[1] = a[1] * b),
    (out[2] = a[2] * b),
    (out[3] = a[3] * b),
    out
  );
}
function scaleAndAdd(out, a, b, scale) {
  return (
    (out[0] = a[0] + b[0] * scale),
    (out[1] = a[1] + b[1] * scale),
    (out[2] = a[2] + b[2] * scale),
    (out[3] = a[3] + b[3] * scale),
    out
  );
}
function distance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1],
    z = b[2] - a[2],
    b = b[3] - a[3];
  return Math.hypot(x, y, z, b);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1],
    z = b[2] - a[2],
    b = b[3] - a[3];
  return x * x + y * y + z * z + b * b;
}
function length(a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    a = a[3];
  return Math.hypot(x, y, z, a);
}
function squaredLength(a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    a = a[3];
  return x * x + y * y + z * z + a * a;
}
function negate(out, a) {
  return (
    (out[0] = -a[0]), (out[1] = -a[1]), (out[2] = -a[2]), (out[3] = -a[3]), out
  );
}
function inverse(out, a) {
  return (
    (out[0] = 1 / a[0]),
    (out[1] = 1 / a[1]),
    (out[2] = 1 / a[2]),
    (out[3] = 1 / a[3]),
    out
  );
}
function normalize(out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    a = a[3],
    len = x * x + y * y + z * z + a * a;
  return (
    0 < len && (len = 1 / Math.sqrt(len)),
    (out[0] = x * len),
    (out[1] = y * len),
    (out[2] = z * len),
    (out[3] = a * len),
    out
  );
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
    B = v[0] * w[2] - v[2] * w[0],
    C = v[0] * w[3] - v[3] * w[0],
    D = v[1] * w[2] - v[2] * w[1],
    E = v[1] * w[3] - v[3] * w[1],
    v = v[2] * w[3] - v[3] * w[2],
    w = u[0],
    H = u[1],
    I = u[2],
    u = u[3];
  return (
    (out[0] = H * v - I * E + u * D),
    (out[1] = -w * v + I * C - u * B),
    (out[2] = w * E - H * C + u * A),
    (out[3] = -w * D + H * B - I * A),
    out
  );
}
function lerp$1(out, a, b, t) {
  var ax = a[0],
    ay = a[1],
    az = a[2],
    a = a[3];
  return (
    (out[0] = ax + t * (b[0] - ax)),
    (out[1] = ay + t * (b[1] - ay)),
    (out[2] = az + t * (b[2] - az)),
    (out[3] = a + t * (b[3] - a)),
    out
  );
}
function random(out, scale) {
  var v1, v2, v3, v4, s1, s2;
  for (
    scale = scale || 1;
    1 <= (s1 = (v1 = 2 * RANDOM() - 1) * v1 + (v2 = 2 * RANDOM() - 1) * v2);

  );
  for (
    ;
    1 <= (s2 = (v3 = 2 * RANDOM() - 1) * v3 + (v4 = 2 * RANDOM() - 1) * v4);

  );
  var d = Math.sqrt((1 - s1) / s2);
  return (
    (out[0] = scale * v1),
    (out[1] = scale * v2),
    (out[2] = scale * v3 * d),
    (out[3] = scale * v4 * d),
    out
  );
}
function transformMat4(out, a, m) {
  var x = a[0],
    y = a[1],
    z = a[2],
    a = a[3];
  return (
    (out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * a),
    (out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * a),
    (out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * a),
    (out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * a),
    out
  );
}
function transformQuat(out, a, q) {
  var x = a[0],
    y = a[1],
    z = a[2],
    qx = q[0],
    qy = q[1],
    qz = q[2],
    q = q[3],
    ix = q * x + qy * z - qz * y,
    iy = q * y + qz * x - qx * z,
    iz = q * z + qx * y - qy * x,
    x = -qx * x - qy * y - qz * z;
  return (
    (out[0] = ix * q + x * -qx + iy * -qz - iz * -qy),
    (out[1] = iy * q + x * -qy + iz * -qx - ix * -qz),
    (out[2] = iz * q + x * -qz + ix * -qy - iy * -qx),
    (out[3] = a[3]),
    out
  );
}
function zero(out) {
  return (out[0] = 0), (out[1] = 0), (out[2] = 0), (out[3] = 0), out;
}
function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals(a, b) {
  var a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a = a[3],
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b = b[3];
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
    Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
  );
}
var sub = subtract,
  mul = multiply$1,
  div = divide,
  dist$1 = distance,
  sqrDist = squaredDistance,
  len = length,
  sqrLen = squaredLength,
  forEach = (function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      for (
        stride = stride || 4,
          offset = offset || 0,
          l = count ? Math.min(count * stride + offset, a.length) : a.length,
          i = offset;
        i < l;
        i += stride
      )
        (vec[0] = a[i]),
          (vec[1] = a[i + 1]),
          (vec[2] = a[i + 2]),
          (vec[3] = a[i + 3]),
          fn(vec, vec, arg),
          (a[i] = vec[0]),
          (a[i + 1] = vec[1]),
          (a[i + 2] = vec[2]),
          (a[i + 3] = vec[3]);
      return a;
    };
  })(),
  vec4 = Object.freeze({
    __proto__: null,
    create: create,
    clone: clone,
    fromValues: fromValues,
    copy: copy$1,
    set: set,
    add: add,
    subtract: subtract,
    multiply: multiply$1,
    divide: divide,
    ceil: ceil$1,
    floor: floor$3,
    min: min$1,
    max: max,
    round: round$2,
    scale: scale,
    scaleAndAdd: scaleAndAdd,
    distance: distance,
    squaredDistance: squaredDistance,
    length: length,
    squaredLength: squaredLength,
    negate: negate,
    inverse: inverse,
    normalize: normalize,
    dot: dot,
    cross: cross,
    lerp: lerp$1,
    random: random,
    transformMat4: transformMat4,
    transformQuat: transformQuat,
    zero: zero,
    str: str,
    exactEquals: exactEquals,
    equals: equals,
    sub: sub,
    mul: mul,
    div: div,
    dist: dist$1,
    sqrDist: sqrDist,
    len: len,
    sqrLen: sqrLen,
    forEach: forEach,
  });
function even(n) {
  return n % 2 == 0;
}
function byteInterval17(i16) {
  return Math.min(16 * i16, 255);
}
function randInt(n) {
  return Math.floor(Math.random() * (n + 1));
}
function randIntArr(n, count) {
  return Array(count).fill(n).map(randInt);
}
function randIntRange(low, high) {
  return low + randInt(high - low);
}
function multiply(operands, n) {
  return Array.isArray(operands) ? operands.map((o) => o * n) : operands * n;
}
function dist() {
  let x1, y1, x2, y2;
  4 === arguments.length
    ? ((x1 = arguments[0]),
      (y1 = arguments[1]),
      (x2 = arguments[2]),
      (y2 = arguments[3]))
    : 2 === arguments.length &&
      ((x1 = arguments[0].x),
      (y1 = arguments[0].y),
      (x2 = arguments[1].x),
      (y2 = arguments[1].y));
  var dx = x2 - x1,
    dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
function radians(deg) {
  return deg * (Math.PI / 180);
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function lerp(a, b, amount) {
  return a + (b - a) * clamp(amount, 0, 1);
}
function timestamp() {
  const d = new Date();
  var pad = (n) => n.toString().padStart(2, "0");
  return (
    `
    ${d.getFullYear()}.
    ${d.getMonth() + 1}.
    ${pad(d.getDate())}.
    ${pad(d.getHours())}.
    ${pad(d.getMinutes())}.
    ` + pad(d.getSeconds())
  ).replace(/\s/g, "");
}
class Track {
  #values;
  #result;
  #quantize;
  constructor(values, result) {
    (this.#values = values),
      (this.#result = result),
      (this.#quantize = Array.isArray(values));
  }
  step(progress) {
    var index;
    this.#quantize
      ? ((index = Math.min(
          Math.floor(progress * this.#values.length),
          this.#values.length - 1
        )),
        this.#result(this.#values[index]))
      : this.#result(lerp(this.#values.from, this.#values.to, progress));
  }
}
const { abs: abs$1, floor: floor$2 } = Math;
class Circle {
  x;
  y;
  radius;
  constructor(x, y, radius = 8) {
    (this.x = x), (this.y = y), (this.radius = radius);
  }
  random() {
    var sq = [-this.radius, this.radius],
      sq = { x: this.x + randIntRange(...sq), y: this.y + randIntRange(...sq) };
    return dist(this.x, this.y, sq.x, sq.y) < this.radius
      ? sq
      : this.random(this.radius);
  }
}
class Box {
  x = 0;
  y = 0;
  w = 1;
  h = 1;
  constructor(x, y, w, h = w) {
    (this.x = x),
      (this.y = y),
      (this.w = w),
      (this.h = h),
      0 === this.w && (this.w = 1),
      0 === this.h && (this.h = 1);
  }
  static copy(box) {
    return new Box(box.x, box.y, box.w, box.h);
  }
  get area() {
    return abs$1(this.w * this.h);
  }
  get abs() {
    let { x, y, w, h } = this;
    return (
      w < 0 && ((x += w), (w = Math.abs(w))),
      h < 0 && ((y += h), (h = Math.abs(h))),
      new Box(x, y, w, h)
    );
  }
  get bottom() {
    return 1 === this.h ? this.y : this.y + this.h;
  }
  get right() {
    return 1 === this.w ? this.x : this.x + this.w;
  }
  crop(toX, toY, toW, toH) {
    let { x, y, w, h } = this;
    if (!(x >= toW || y >= toH))
      return (
        x < toX && ((w += x), (x = toX)),
        x + w > toW && (w = toW - x),
        y < toY && ((h += y), (y = toY)),
        y + h > toH && (h = toH - y),
        new Box(x, y, w, h)
      );
  }
  move({ x, y }) {
    (this.x += x), (this.y += y);
  }
  contains({ x, y }) {
    return (
      this.x <= x && x < this.x + this.w && this.y <= y && y < this.y + this.h
    );
  }
  misses(o) {
    return !this.contains(o);
  }
}
class Point {
  static equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }
}
class Grid {
  box;
  scale;
  #halfScale;
  centerOffset;
  constructor(x, y, w, h, s) {
    (this.box = new Box(x, y, w, h)),
      (this.scale = s),
      (this.#halfScale = this.scale / 2),
      (this.centerOffset = floor$2(this.#halfScale));
  }
  under({ x, y }, cb) {
    var { scale, box } = this,
      gx = floor$2((x - box.x) / scale),
      gy = floor$2((y - box.y) / scale),
      box = {
        x: box.x + gx * scale,
        y: box.y + gy * scale,
        w: scale,
        h: scale,
        gx: gx,
        gy: gy,
        in: this.scaled.contains({ x: x, y: y }),
      };
    return box.in && cb && cb(box), box;
  }
  get(x, y) {
    return [this.box.x + x * this.scale, this.box.y + y * this.scale];
  }
  get scaled() {
    return new Box(
      this.box.x,
      this.box.y,
      this.box.w * this.scale,
      this.box.h * this.scale
    );
  }
  center(x, y) {
    const scaled = this.get(x, y);
    return (
      (scaled[0] += Math.floor(this.#halfScale)),
      (scaled[1] += Math.floor(this.#halfScale)),
      scaled
    );
  }
  get centers() {
    var o = this.centerOffset;
    let points = [];
    return (
      this.#halfScale % 1 == 0.5 && 0.5 < this.#halfScale
        ? points.push({ x: o, y: o })
        : 4 <= this.scale &&
          points.push(
            { x: o, y: o },
            { x: o - 1, y: o - 1 },
            { x: o - 1, y: o },
            { x: o, y: o - 1 }
          ),
      points
    );
  }
}
class DirtyBox {
  box;
  #left;
  #top;
  #right;
  #bottom;
  soiled = !1;
  constructor() {
    this.box = new Box(0, 0, 0);
  }
  soil({ x, y }) {
    void 0 === this.#left && ((this.#left = x), (this.#right = this.#left)),
      void 0 === this.#top && ((this.#top = y), (this.#bottom = this.#top)),
      x < this.#left && (this.#left = x),
      y < this.#top && (this.#top = y),
      x > this.#right && (this.#right = x),
      y > this.#bottom && (this.#bottom = y),
      (this.box.x = this.#left),
      (this.box.y = this.#top),
      (this.box.w = this.#right - this.#left + 1),
      (this.box.h = this.#bottom - this.#top + 1),
      (this.soiled = !0);
  }
  crop(image) {
    var b = this.croppedBox(image);
    const p = image.pixels,
      newP = new Uint8ClampedArray(b.w * b.h * 4);
    for (let row = 0; row < b.h; row += 1) {
      var index = 4 * (b.x + (b.y + row) * image.width);
      newP.set(p.subarray(index, index + 4 * b.w), row * b.w * 4);
    }
    return newP;
  }
  croppedBox(image) {
    return this.box.crop(0, 0, image.width, image.height);
  }
}
const assign$1 = Object["assign"],
  round$1 = Math["round"];
class Pen {
  x;
  y;
  delta;
  pressure;
  pointerType;
  untransformedPosition;
  point;
  changedInPiece = !1;
  #lastP;
  down = !1;
  changed = !1;
  event = "";
  events = [];
  cursorCode;
  penCursor = !1;
  lastPenX;
  lastPenY;
  lastPenCursor;
  dragBox;
  #dragging = !1;
  #lastPenDown;
  #penDragStartPos;
  constructor(point) {
    this.point = point;
    const pen = this;
    let forceTouchPressure = 0,
      forceTouchEnabled = !1;
    function pointerMoveEvent(type) {
      Point.equals(pen, { x: pen.lastPenX, y: pen.lastPenY }) ||
        pen.#event(type);
    }
    function reportPressure(e) {
      let pressure;
      return (
        forceTouchEnabled
          ? (pressure = forceTouchPressure)
          : ((pressure = e.pressure || 1),
            "pen" === pen.pointerType && 1 === pressure && (pressure = 0),
            "mouse" === pen.pointerType && (pressure = 1)),
        pressure
      );
    }
    return (
      window.addEventListener(
        "touchend",
        (event) => {
          !1 === document.body.classList.contains("native-cursor") &&
            (event.preventDefault(), event.stopImmediatePropagation());
        },
        { passive: !1 }
      ),
      window.addEventListener("pointerdown", (e) => {
        e.isPrimary &&
          ((pen.pointerType = e.pointerType),
          assign$1(pen, point(e.x, e.y)),
          (this.untransformedPosition = { x: e.x, y: e.y }),
          (pen.pressure = reportPressure(e)),
          (pen.down = !0),
          (pen.#dragging = !0),
          (pen.#penDragStartPos = { x: pen.x, y: pen.y }),
          pen.#event("touch"),
          (pen.changed = !0),
          (pen.penCursor = !0),
          "mouse" !== e.pointerType && (pen.penCursor = !1));
      }),
      window.addEventListener("pointermove", (e) => {
        var penDragAmount;
        e.isPrimary &&
          ((pen.pointerType = e.pointerType),
          assign$1(pen, point(e.x, e.y)),
          (this.untransformedPosition = { x: e.x, y: e.y }),
          (pen.pressure = reportPressure(e)),
          pen.#dragging
            ? ((penDragAmount = {
                x: pen.x - pen.#penDragStartPos.x,
                y: pen.y - pen.#penDragStartPos.y,
              }),
              (pen.dragBox = {
                x: pen.#penDragStartPos.x,
                y: pen.#penDragStartPos.y,
                w: penDragAmount.x,
                h: penDragAmount.y,
              }),
              pointerMoveEvent("draw"))
            : pointerMoveEvent("move"),
          (pen.changed = !0),
          (pen.penCursor = !0),
          "mouse" !== e.pointerType && (pen.penCursor = !1));
      }),
      window.addEventListener("pointerup", (e) => {
        e.isPrimary &&
          ((pen.pointerType = e.pointerType),
          (pen.down = !1),
          pen.#dragging && pen.#event("lift"),
          (pen.#dragging = !1),
          (pen.changed = !0),
          (pen.penCursor = !0),
          "mouse" !== e.pointerType && (pen.penCursor = !1));
      }),
      window.addEventListener("webkitmouseforcechanged", (e) => {
        (forceTouchEnabled = !0),
          (forceTouchPressure =
            2 <= e.webkitForce ? 0 : Math.max(0, e.webkitForce - 1));
      }),
      pen
    );
  }
  retransformPosition() {
    assign$1(
      this,
      this.point(this.untransformedPosition?.x, this.untransformedPosition?.y)
    );
  }
  normalizedPosition(rect) {
    return this.untransformedPosition
      ? {
          x: (this.untransformedPosition.x - rect.x) / rect.width,
          y: (this.untransformedPosition.y - rect.y) / rect.height,
        }
      : { x: void 0, y: void 0 };
  }
  #event(name) {
    this.event = name;
    name = { x: this.x - this.lastPenX || 0, y: this.y - this.lastPenY || 0 };
    (this.delta = name),
      (this.changedInPiece = 0 !== name.x || 0 !== name.y),
      this.events.push({
        name: this.event,
        device: this.pointerType,
        x: this.x,
        y: this.y,
        delta: name,
        penChanged: this.changedInPiece,
        pressure: this.pressure,
        drag: this.dragBox,
      }),
      (this.lastPenCursor = this.penCursor),
      (this.#lastPenDown = this.down),
      (this.lastPenX = this.x),
      (this.lastPenY = this.y);
  }
  render(ctx, bouRect) {
    var p = this.untransformedPosition;
    p &&
      ((bouRect = bouRect),
      this.#lastP
        ? ctx.clearRect(
            this.#lastP.x - bouRect.x - 14,
            this.#lastP.y - bouRect.y - 14,
            28,
            28
          )
        : (this.#lastP = { x: p.x, y: p.y }),
      assign$1(this.#lastP, p),
      "native" != this.cursorCode &&
        document.body.classList.contains("native-cursor") &&
        document.body.classList.remove("native-cursor"),
      this.cursorCode && "precise" !== this.cursorCode
        ? "tiny" === this.cursorCode
          ? (ctx.save(),
            ctx.translate(round$1(p.x - bouRect.x), round$1(p.y - bouRect.y)),
            ctx.beginPath(),
            ctx.moveTo(0, -4),
            ctx.lineTo(0, -4),
            ctx.moveTo(0, 4),
            ctx.lineTo(0, 4),
            ctx.moveTo(-4, 0),
            ctx.lineTo(-4, 0),
            ctx.moveTo(4, 0),
            ctx.lineTo(4, 0),
            (ctx.strokeStyle = "rgba(255, 255, 0, 0.75)"),
            (ctx.lineWidth = 4),
            ctx.stroke(),
            ctx.restore())
          : "dot" === this.cursorCode
          ? (ctx.save(),
            ctx.translate(round$1(p.x - bouRect.x), round$1(p.y - bouRect.y)),
            ctx.beginPath(),
            ctx.lineTo(0, 0),
            (ctx.strokeStyle = "rgba(255, 0, 0, 0.9)"),
            (ctx.lineWidth = 4),
            ctx.stroke(),
            ctx.restore())
          : "none" !== this.cursorCode &&
            "native" === this.cursorCode &&
            !1 === document.body.classList.contains("native-cursor") &&
            document.body.classList.add("native-cursor")
        : ((ctx.lineCap = "round"),
          ctx.save(),
          ctx.translate(round$1(p.x - bouRect.x), round$1(p.y - bouRect.y)),
          ctx.beginPath(),
          ctx.arc(0, 0, 2, 0, 2 * Math.PI),
          (ctx.fillStyle = "white"),
          ctx.fill(),
          ctx.beginPath(),
          ctx.moveTo(0, -7.5),
          ctx.lineTo(0, -10),
          ctx.moveTo(0, 7.5),
          ctx.lineTo(0, 10),
          ctx.moveTo(-7.5, 0),
          ctx.lineTo(-10, 0),
          ctx.moveTo(7.5, 0),
          ctx.lineTo(10, 0),
          (ctx.strokeStyle = "rgb(0, 255, 255)"),
          (ctx.lineWidth = 4),
          ctx.stroke(),
          ctx.restore()),
      (this.changed = !1));
  }
  setCursorCode(code) {
    this.cursorCode = code;
  }
}
class Keyboard {
  events = [];
  constructor() {
    window.addEventListener("keydown", (e) => {
      this.events.push({
        name: "keyboard:down",
        key: e.key,
        shift: e.shiftKey,
        alt: e.altKey,
        ctrl: e.ctrlKey,
      });
    }),
      window.addEventListener("keyup", (e) => {
        this.events.push({ name: "keyboard:up", key: e.key });
      });
  }
}
const round = Math["round"];
function spinner(ctx, timePassed) {
  ctx.save(),
    ctx.translate(18, 18),
    ctx.rotate(+radians(timePassed % 360)),
    ctx.beginPath(),
    ctx.moveTo(-6, -6),
    ctx.lineTo(6, 6),
    (ctx.strokeStyle = "rgb(255, 255, 0)"),
    (ctx.lineWidth = 4),
    (ctx.lineCap = "round"),
    ctx.stroke(),
    ctx.restore();
}
function cached(ctx) {
  ctx.save(),
    ctx.translate(round(2) + 6, round(2) + 4),
    ctx.beginPath(),
    ctx.moveTo(4, 4),
    ctx.lineTo(4, 20),
    ctx.moveTo(14, 4),
    ctx.lineTo(14, 20),
    (ctx.strokeStyle = "rgb(0, 255, 255)"),
    (ctx.lineWidth = 4),
    (ctx.lineCap = "round"),
    ctx.stroke(),
    ctx.restore();
}
class Button {
  box;
  down = !1;
  icon;
  constructor() {
    this.box =
      1 === arguments.length ? Box.copy(arguments[0]) : new Box(...arguments);
  }
  act(e, pushCb) {
    e.is("touch") && this.box.contains(e) && (this.down = !0),
      e.is("draw") && !this.box.contains(e) && (this.down = !1),
      e.is("lift") &&
        this.down &&
        (this.box.contains(e) && pushCb(), (this.down = !1));
  }
}
const uniforms = {};
function apiObject() {
  const obj = {};
  for (const key of arguments) obj[key] = void 0;
  return Object.seal(obj);
}
function extension(filename) {
  return /(?:\.([^.]+))?$/.exec(filename)[1];
}
function notArray(obj) {
  return !Array.isArray(obj);
}
function wrapNotArray(any) {
  return null != any && notArray(any) ? [any] : Array.isArray(any) ? any : [];
}
function pathEnd(path) {
  return path.substring(path.lastIndexOf("/") + 1);
}
(uniforms.digitpain0 = {}),
  (uniforms.prompt = {
    "1i:fogIterations": 20,
    "1i:shadowIterations": 5,
    "1f:focalLength": 1,
    "1f:screenScale": 1,
    "1f:shadowRange": 1,
    "1f:cameraDistance": 2.236,
    "1f:volumeRadius": 0.005,
    "1f:inputRadius": 0.005,
    "1f:innerDensity": 20,
    "1f:outerDensity": 10.1,
    "1f:anisotropy": -0.123,
    "1f:lightPower": 4,
    "3f:lightColor": [1, 1, 1],
    "3f:lightDirection": [-1, -1, -0.05],
    "3f:bgColor": [0.084, 0.0533, 0.078],
  });
const keys = Object["keys"];
class Glaze {
  loaded = !1;
  shadersLoaded = !1;
  uniformNames;
  frag;
  #uniforms;
  #type;
  constructor(type = "prompt") {
    (this.#type = type),
      (this.#uniforms = uniforms[type]),
      (this.uniformNames = keys(this.#uniforms).map((id) => id.split(":")[1]));
  }
  async load(callback) {
    var names = [
        `./glazes/${this.#type}/${this.#type}-frag`,
        `./glazes/${this.#type}/${this.#type}-compute`,
        `./glazes/${this.#type}/${this.#type}-display`,
      ],
      shaders = await preloadShaders(names);
    (this.frag = shaders[pathEnd(names[0])]),
      (this.compute = shaders[pathEnd(names[1])]),
      (this.display = shaders[pathEnd(names[2])]),
      (this.shadersLoaded = !0),
      callback();
  }
  setCustomUniforms(locations, gl) {
    keys(this.#uniforms).forEach((uniformIdentifier) => {
      var [type, name] = uniformIdentifier.split(":");
      gl["uniform" + type](
        locations[name],
        ...wrapNotArray(this.#uniforms[uniformIdentifier])
      );
    });
  }
}
let gl, canvas, glaze, passthrough;
function init(wrapper) {
  ((canvas = document.createElement("canvas")).dataset.type = "glaze"),
    (gl = canvas.getContext("webgl2", {
      alpha: !0,
      depth: !1,
      stencil: !1,
      desynchronized: !0,
      antialias: !1,
    })).enable(gl.BLEND),
    gl.blendEquation(gl.FUNC_ADD),
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA),
    wrapper.append(canvas);
}
let customProgram,
  computeProgram,
  displayProgram,
  fb,
  texSurf,
  texFbSurfA,
  texFbSurfB,
  texSurfWidth,
  texSurfHeight,
  vao;
const defaultUniformNames = [
  "iTexture",
  "iTexturePost",
  "iTime",
  "iMouse",
  "iResolution",
];
let customUniformLocations = {};
const displayUniformLocations = {};
let offed = !1;
function frame(w, h, rect, nativeWidth, nativeHeight, wrapper) {
  if (!1 !== glaze.shadersLoaded) {
    void 0 === canvas && init(wrapper),
      (canvas.width = nativeWidth * window.devicePixelRatio),
      (canvas.height = nativeHeight * window.devicePixelRatio),
      (canvas.style.width = rect.width + "px"),
      (canvas.style.height = rect.height + "px");
    (wrapper = createShader(gl.VERTEX_SHADER, passthrough)),
      (nativeWidth = createShader(gl.FRAGMENT_SHADER, glaze.frag)),
      (nativeHeight =
        ((customProgram = createProgram(wrapper, nativeWidth)),
        createShader(gl.VERTEX_SHADER, passthrough))),
      (rect = createShader(gl.FRAGMENT_SHADER, glaze.compute)),
      (wrapper =
        ((computeProgram = createProgram(nativeHeight, rect)),
        createShader(gl.VERTEX_SHADER, passthrough))),
      (nativeWidth = createShader(gl.FRAGMENT_SHADER, glaze.display));
    (displayProgram = createProgram(wrapper, nativeWidth)),
      (texSurf = gl.createTexture()),
      (texSurfWidth = w),
      (texSurfHeight = h);
    const buffer = new Uint8Array(4 * w * h);
    for (let i = 0; i < buffer.length; i += 4)
      (buffer[i] = (255 * i) / buffer.length),
        (buffer[i + 1] = (255 * i) / buffer.length),
        (buffer[i + 2] = (255 * i) / buffer.length),
        (buffer[i + 3] = 255);
    gl.bindTexture(gl.TEXTURE_2D, texSurf),
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        buffer
      ),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
      (texFbSurfA = gl.createTexture());
    const buffer2 = new Uint8Array(4 * w * h);
    buffer2.fill(0),
      (texFbSurfB = gl.createTexture()),
      gl.bindTexture(gl.TEXTURE_2D, texFbSurfB),
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        buffer2
      ),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
      gl.bindTexture(gl.TEXTURE_2D, texFbSurfA),
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        buffer2
      ),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
      (fb = gl.createFramebuffer()),
      (vao = gl.createVertexArray()),
      gl.bindVertexArray(vao);
    (nativeHeight = gl.getAttribLocation(customProgram, "a_position")),
      (rect = gl.createBuffer()),
      (wrapper =
        (gl.bindBuffer(gl.ARRAY_BUFFER, rect),
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        ),
        gl.vertexAttribPointer(nativeHeight, 2, gl.FLOAT, !1, 0, 0),
        gl.vertexAttribDivisor(nativeHeight, 0),
        gl.enableVertexAttribArray(nativeHeight),
        gl.getAttribLocation(customProgram, "a_texc"))),
      (nativeWidth = gl.createBuffer()),
      (w =
        (gl.bindBuffer(gl.ARRAY_BUFFER, nativeWidth),
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]),
          gl.STATIC_DRAW
        ),
        gl.vertexAttribPointer(wrapper, 2, gl.FLOAT, !1, 0, 0),
        gl.vertexAttribDivisor(wrapper, 0),
        gl.enableVertexAttribArray(wrapper),
        gl.createBuffer()));
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, w),
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      ),
      defaultUniformNames.forEach(function (item, index) {
        displayUniformLocations[item] = gl.getUniformLocation(
          displayProgram,
          item
        );
      }),
      (customUniformLocations = {}),
      glaze.uniformNames
        .concat(defaultUniformNames)
        .forEach(function (item, index) {
          customUniformLocations[item] = gl.getUniformLocation(
            customProgram,
            item
          );
        }),
      (glaze.loaded = !0);
  }
}
function off() {
  offed && canvas && (canvas.style.opacity = 0), (offed = !0);
}
async function on(w, h, rect, nativeWidth, nativeHeight, wrapper, type) {
  return (
    (glaze = new Glaze(type)),
    (passthrough = (await preloadShaders(["glazes/passthrough-vert"]))[
      "passthrough-vert"
    ]),
    await glaze.load(() => {
      frame(w, h, rect, nativeWidth, nativeHeight, wrapper), (offed = !1);
    }),
    glaze
  );
}
function update(texture, x = 0, y = 0) {
  void 0 !== glaze &&
    !1 !== glaze.loaded &&
    (gl.bindTexture(gl.TEXTURE_2D, texSurf),
    gl.texSubImage2D(
      gl.TEXTURE_2D,
      0,
      x,
      y,
      texture.width,
      texture.height,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      texture
    ));
}
function freeze(fCtx) {
  fCtx.drawImage(canvas, 0, 0, fCtx.canvas.width, fCtx.canvas.height),
    clear$1(),
    (canvas.style.opacity = 0);
}
function unfreeze() {
  canvas && canvas.style.removeProperty("opacity");
}
function render(canvasTexture, time, mouse) {
  void 0 !== glaze &&
    !1 !== glaze.loaded &&
    (gl.useProgram(customProgram),
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb),
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texFbSurfA,
      0
    ),
    gl.viewport(0, 0, texSurfWidth, texSurfHeight),
    gl.activeTexture(gl.TEXTURE0),
    gl.bindTexture(gl.TEXTURE_2D, texSurf),
    gl.activeTexture(gl.TEXTURE1),
    gl.bindTexture(gl.TEXTURE_2D, texFbSurfB),
    gl.uniform1i(customUniformLocations.iTexture, 0),
    gl.uniform1i(customUniformLocations.iTexturePost, 1),
    gl.uniform1f(customUniformLocations.iTime, time),
    gl.uniform2f(customUniformLocations.iMouse, mouse.x, mouse.y),
    gl.uniform2f(
      customUniformLocations.iResolution,
      texSurfWidth,
      texSurfHeight
    ),
    glaze.setCustomUniforms(customUniformLocations, gl),
    gl.bindVertexArray(vao),
    gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, 1),
    gl.useProgram(computeProgram),
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb),
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texFbSurfB,
      0
    ),
    gl.viewport(0, 0, texSurfWidth, texSurfHeight),
    gl.activeTexture(gl.TEXTURE0),
    gl.bindTexture(gl.TEXTURE_2D, texSurf),
    gl.activeTexture(gl.TEXTURE1),
    gl.bindTexture(gl.TEXTURE_2D, texFbSurfA),
    gl.uniform1i(gl.getUniformLocation(computeProgram, "iTexture"), 0),
    gl.uniform1i(gl.getUniformLocation(computeProgram, "iTexturePost"), 1),
    gl.uniform1f(gl.getUniformLocation(computeProgram, "iTime"), time),
    gl.uniform2f(
      gl.getUniformLocation(computeProgram, "iMouse"),
      mouse.x,
      mouse.y
    ),
    gl.uniform2f(
      gl.getUniformLocation(computeProgram, "iResolution"),
      texSurfWidth,
      texSurfHeight
    ),
    gl.bindVertexArray(vao),
    gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, 1),
    gl.useProgram(displayProgram),
    gl.bindFramebuffer(gl.FRAMEBUFFER, null),
    gl.activeTexture(gl.TEXTURE0),
    gl.bindTexture(gl.TEXTURE_2D, texSurf),
    gl.activeTexture(gl.TEXTURE1),
    gl.bindTexture(gl.TEXTURE_2D, texFbSurfB),
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height),
    gl.uniform1i(displayUniformLocations.iTexture, 0),
    gl.uniform1i(displayUniformLocations.iTexturePost, 1),
    gl.uniform2f(displayUniformLocations.iMouse, mouse.x, mouse.y),
    gl.uniform2f(
      displayUniformLocations.iResolution,
      gl.canvas.width,
      gl.canvas.height
    ),
    gl.uniform1f(displayUniformLocations.iTime, time),
    gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, 1));
}
function createShader(type, source) {
  var type = gl.createShader(type),
    success =
      (gl.shaderSource(type, source),
      gl.compileShader(type),
      gl.getShaderParameter(type, gl.COMPILE_STATUS));
  if (success) return type;
  console.error(gl.getShaderInfoLog(type), source), gl.deleteShader(type);
}
function createProgram(vertShader, fragShader) {
  var program = gl.createProgram(),
    vertShader =
      (gl.attachShader(program, vertShader),
      gl.attachShader(program, fragShader),
      gl.linkProgram(program),
      gl.getProgramParameter(program, gl.LINK_STATUS));
  if (vertShader) return program;
  console.error(gl.getProgramInfoLog(program)), gl.deleteProgram(program);
}
async function preloadShaders(pathArray) {
  const sources = await Promise.all(
      pathArray.map((path) =>
        fetch("aesthetic.computer/lib/" + path + ".glsl").then((file) =>
          file.text()
        )
      )
    ),
    lib = {};
  return pathArray.forEach((path, i) => (lib[pathEnd(path)] = sources[i])), lib;
}
function clear$1(r = 0, g = 1, b = 0) {
  gl?.clearColor(r, g, b, 1), gl?.clear(gl.COLOR_BUFFER_BIT);
}
const assign = Object["assign"],
  { floor: floor$1, min } = Math;
async function boot$1(
  path = "index",
  bpm = 60,
  host = window.location.host,
  resolution,
  debug
) {
  console.log(
    "%caesthetic.computer",
    `background: rgb(10, 20, 40);
     color: rgb(120, 120, 170);
     font-size: 120%;
     padding: 0 0.25em;
     border-radius: 0.15em;
     border-bottom: 0.75px solid rgb(120, 120, 170);
     border-right: 0.75px solid rgb(120, 120, 170);`
  ),
    console.log(
      "%cFullscreen: C-x, Prompt: ~",
      `background-color: black;
     color: grey;
     padding: 0 0.25em;
     border-left: 0.75px solid rgb(60, 60, 60);
     border-right: 0.75px solid rgb(60, 60, 60);`
    ),
    console.log(
      "%cgithub.com/digitpain/aesthetic.computer",
      `color: rgb(100, 100, 100);
     background-color: black;
     padding: 0 0.25em;
     border-left: 0.75px solid rgb(60, 60, 60);
     border-right: 0.75px solid rgb(60, 60, 60);`
    ),
    debug &&
      (window.isSecureContext
        ? console.log("🔒 Secure")
        : console.warn("🔓 Insecure"));
  let pen,
    keyboard,
    timePassed = 0,
    diskSupervisor,
    currentPiece = null;
  const videos = [],
    wrapper = document.createElement("div"),
    canvas =
      ((wrapper.id = "aesthetic-computer"), document.createElement("canvas")),
    ctx = canvas.getContext("2d"),
    uiCanvas = document.createElement("canvas"),
    uiCtx = uiCanvas.getContext("2d"),
    freezeFrameCan =
      ((uiCanvas.dataset.type = "ui"), document.createElement("canvas")),
    ffCtx = freezeFrameCan.getContext("2d");
  freezeFrameCan.dataset.type = "freeze";
  let imageData,
    fixedWidth,
    fixedHeight,
    projectedWidth,
    projectedHeight,
    canvasRect,
    glaze = { on: !1 },
    needsReframe = !1,
    needsReappearance = !1,
    freezeFrame = !1,
    freezeFrameGlaze = !1;
  const screen = apiObject("pixels", "width", "height"),
    REFRAME_DELAY = 250;
  let curReframeDelay = REFRAME_DELAY,
    gap = 0,
    density = 1;
  function frame(width, height) {
    freezeFrame &&
      imageData &&
      (console.log(
        "🥶 Freezing:",
        freezeFrame,
        imageData.width,
        imageData.height
      ),
      (freezeFrameCan.width = imageData.width),
      (freezeFrameCan.height = imageData.height),
      (freezeFrameCan.style.width = canvas.getBoundingClientRect().width),
      (freezeFrameCan.style.height = canvas.getBoundingClientRect().height),
      (freezeFrameCan.style.left = canvasRect.x + "px"),
      (freezeFrameCan.style.top = canvasRect.y + "px"),
      freezeFrameGlaze
        ? (console.log("Freeze glaze!"), freeze(ffCtx), (freezeFrameGlaze = !1))
        : ffCtx.putImageData(imageData, 0, 0),
      wrapper.contains(freezeFrameCan)
        ? freezeFrameCan.style.removeProperty("opacity")
        : wrapper.append(freezeFrameCan),
      (canvas.style.opacity = 0)),
      (width = width || fixedWidth),
      (height = height || fixedHeight);
    var subdivisions,
      gapSize = gap * window.devicePixelRatio;
    if (
      ((projectedHeight =
        void 0 === width && void 0 === height
          ? ((subdivisions =
              (density = 1 === window.devicePixelRatio ? 2 : density) +
              window.devicePixelRatio),
            (width = floor$1(window.innerWidth / subdivisions)),
            (height = floor$1(window.innerHeight / subdivisions)),
            (projectedWidth = width * subdivisions - gapSize),
            height * subdivisions - gapSize)
          : ((fixedWidth = width),
            (fixedHeight = height),
            (subdivisions = min(
              window.innerWidth / width,
              window.innerHeight / height
            )),
            console.log(window.innerWidth, window.innerHeight),
            (projectedWidth = floor$1(width * subdivisions - gapSize)),
            floor$1(height * subdivisions - gapSize))),
      debug &&
        console.info(
          "🔭 View:",
          width,
          height,
          "🖥 Window:",
          window.innerWidth,
          window.innerHeight
        ),
      (canvas.width = width),
      (canvas.height = height),
      (uiCanvas.width = projectedWidth * window.devicePixelRatio),
      (uiCanvas.height = projectedHeight * window.devicePixelRatio),
      (canvas.style.width = `calc(100vw - ${gapSize}px)`),
      (canvas.style.height = `calc(calc(${
        height / width
      } * 100vw) - ${gapSize}px)`),
      (canvas.style.maxHeight = `calc(100vh - ${gapSize}px)`),
      (canvas.style.maxWidth = `calc(calc(${
        width / height
      } * 100vh) - ${gapSize}px)`),
      (uiCanvas.style.width = `calc(100vw - ${gapSize}px)`),
      (uiCanvas.style.height = `calc(calc(${
        height / width
      } * 100vw) - ${gapSize}px)`),
      (uiCanvas.style.maxHeight = `calc(100vh - ${gapSize}px)`),
      (uiCanvas.style.maxWidth = `calc(calc(${
        width / height
      } * 100vh) - ${gapSize}px)`),
      imageData && ctx.putImageData(imageData, 0, 0),
      (imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)),
      assign(screen, { pixels: imageData.data, width: width, height: height }),
      !wrapper.contains(canvas))
    ) {
      wrapper.append(canvas),
        wrapper.append(uiCanvas),
        document.body.append(wrapper);
      let timeout;
      window.addEventListener("resize", (e) => {
        !1 === document.body.classList.contains("native-cursor") &&
          wrapper.classList.add("hidden"),
          window.clearTimeout(timeout),
          (timeout = setTimeout(() => {
            (needsReframe = !0), (curReframeDelay = REFRAME_DELAY);
          }, curReframeDelay));
      }),
        canvas.addEventListener(
          "touchstart",
          function (event) {
            event.preventDefault();
          },
          !1
        );
    }
    (canvasRect = canvas.getBoundingClientRect()),
      clear$1(),
      glaze.on
        ? (on(
            canvas.width,
            canvas.height,
            canvasRect,
            projectedWidth,
            projectedHeight,
            wrapper,
            glaze.type
          ),
          (canvas.style.opacity = 0))
        : off(),
      (needsReframe = !1),
      (needsReappearance = !0),
      send({ type: "needs-paint" });
  }
  const sound = { bpm: new Float32Array(1) };
  let updateMetronome,
    updateSquare,
    updateBubble,
    attachMicrophone,
    audioContext;
  var search = new URL(self.location).search;
  const worker = new Worker(new URL("./ugly-disk-out.js", import.meta.url), {
      type: "module",
    }),
    params = path.split(":");
  path = params[0];
  params.shift();
  const firstMessage = {
    path: path,
    params: params,
    host: host,
    search: search,
    debug: debug,
  };
  worker.onerror = async (err) => {
    if (
      "SyntaxError: import declarations may only appear at top level of a module" ===
      err.message
    ) {
      console.error(
        "🟡 Disk module workers unsupported. Continuing with dynamic import..."
      );
      const module = await Promise.resolve().then(function () {
        return disk;
      });
      (module.noWorker.postMessage = (e) => onMessage(e)),
        (send = (e) => module.noWorker.onMessage(e))(firstMessage);
    } else console.error("🛑 Disk error:", err);
  };
  let send = (e) => worker.postMessage(e),
    onMessage = function (e) {
      if (!0 === e.data.loaded) {
        (onMessage = receivedChange),
          (diskSupervisor = {
            requestBeat: requestBeat,
            requestFrame: requestFrame,
          }),
          (pen = new Pen((x, y) => ({
            x: floor$1(((x - canvasRect.x) / projectedWidth) * screen.width),
            y: floor$1(((y - canvasRect.y) / projectedHeight) * screen.height),
          }))),
          (keyboard = new Keyboard());
        {
          const input = document.createElement("input");
          (input.id = "software-keyboard-input"),
            (input.type = "text"),
            (input.style.opacity = 0),
            (input.style.width = 0),
            (input.style.height = 0),
            (input.style.position = "absolute"),
            wrapper.append(input),
            input.addEventListener("input", (e) => (e.target.value = null));
          let touching = !1,
            keyboardOpen = !1,
            down =
              (window.addEventListener("touchstart", () => (touching = !0)),
              window.addEventListener("focusout", (e) => {
                keyboardOpen &&
                  (keyboard.events.push({ name: "keyboard:close" }),
                  (keyboardOpen = !1));
              }),
              !1),
            downPos,
            inTime = !1;
          window.addEventListener("pointerdown", (e) => {
            "aesthetic.computer/disks/prompt" === currentPiece &&
              ((down = !0),
              (downPos = { x: e.x, y: e.y }),
              (inTime = !0),
              setTimeout(() => (inTime = !1), 250),
              e.preventDefault());
          }),
            window.addEventListener("pointerup", (e) => {
              down &&
                dist(downPos.x, downPos.y, e.x, e.y) < 8 &&
                inTime &&
                "aesthetic.computer/disks/prompt" === currentPiece &&
                document.activeElement !== input &&
                (input.focus(),
                touching &&
                  ((touching = !1),
                  keyboard.events.push({ name: "keyboard:open" }),
                  (keyboardOpen = !0)),
                (down = !1),
                e.preventDefault());
            }),
            input.addEventListener("focus", (e) => {
              keyboard.events.push({ name: "typing-input-ready" });
            });
        }
        frame(resolution?.width, resolution?.height),
          window.addEventListener(
            "pointerdown",
            function () {
              "running" ===
                (audioContext = new AudioContext({
                  latencyHint: "interactive",
                  sampleRate: 44100,
                })).state && audioContext.suspend(),
                (attachMicrophone = async (data) => {
                  console.log("Attaching microphone:", data);
                  data = await navigator.mediaDevices.getUserMedia({
                    audio: {
                      echoCancellation: !1,
                      latency: 0,
                      noiseSuppression: !1,
                      autoGainControl: !1,
                    },
                  });
                  const micNode = new MediaStreamAudioSourceNode(audioContext, {
                      mediaStream: data,
                    }),
                    playerNode =
                      (await audioContext.audioWorklet.addModule(
                        "aesthetic.computer/lib/microphone.js"
                      ),
                      new AudioWorkletNode(audioContext, "microphone", {
                        outputChannelCount: [2],
                      }));
                  micNode.connect(playerNode),
                    playerNode.connect(audioContext.destination);
                }),
                (async () => {
                  await audioContext.audioWorklet.addModule(
                    "aesthetic.computer/lib/speaker.js"
                  );
                  const soundProcessor = new AudioWorkletNode(
                    audioContext,
                    "sound-processor",
                    {
                      outputChannelCount: [2],
                      processorOptions: { bpm: sound.bpm[0] },
                    }
                  );
                  (updateMetronome = function (newBPM) {
                    soundProcessor.port.postMessage({
                      type: "new-bpm",
                      data: newBPM,
                    });
                  }),
                    (updateSquare = function (square) {
                      soundProcessor.port.postMessage({
                        type: "square",
                        data: square,
                      });
                    }),
                    (updateBubble = function (bubble) {
                      soundProcessor.port.postMessage({
                        type: "bubble",
                        data: bubble,
                      });
                    }),
                    (soundProcessor.port.onmessage = (e) => {
                      e = e.data;
                      diskSupervisor.requestBeat?.(e);
                    }),
                    soundProcessor.connect(audioContext.destination);
                })(),
                window.addEventListener("pointerdown", async () => {
                  ["suspended", "interrupted"].includes(audioContext.state) &&
                    audioContext.resume();
                }),
                window.addEventListener("keydown", async () => {
                  ["suspended", "interrupted"].includes(audioContext.state) &&
                    audioContext.resume();
                });
            },
            { once: !0 }
          ),
          start(
            () => {},
            function (needsRender, updateTimes) {
              diskSupervisor.requestFrame?.(needsRender, updateTimes);
            }
          );
      }
    };
  function requestBeat(time) {
    send({ type: "beat", content: { time: time, bpm: sound.bpm } }, [
      sound.bpm,
    ]);
  }
  (worker.onmessage = (e) => onMessage(e)),
    send(firstMessage),
    sound.bpm.fill(bpm);
  let frameAlreadyRequested = !1;
  function requestFrame(needsRender, updateCount) {
    needsReframe && (frame(), pen.retransformPosition()),
      frameAlreadyRequested ||
        ((frameAlreadyRequested = !0),
        performance.now(),
        send({
          type: "frame",
          content: {
            needsRender: needsRender,
            updateCount: updateCount,
            inFocus: document.hasFocus(),
            audioTime: audioContext?.currentTime,
            audioBpm: sound.bpm[0],
            width: canvas.width,
            height: canvas.height,
            pen: pen.events,
            keyboard: keyboard.events,
          },
        }),
        (pen.events.length = 0),
        (keyboard.events.length = 0));
  }
  let frameCached = !1,
    pixelsDidChange = !1,
    contentFrame;
  async function receivedChange({ data: { type, content } }) {
    if ("content-create" === type) {
      if (!contentFrame) {
        ((contentFrame = document.createElement("div")).id = "content"),
          wrapper.appendChild(contentFrame),
          (contentFrame.innerHTML += content.content);
        const script = contentFrame.querySelector("script");
        if (script.src) {
          const s = document.createElement("script");
          (s.type = "module"),
            (s.src = script.src + "#" + Date.now()),
            contentFrame.appendChild(s),
            script.remove();
        } else window.eval(script.innerText);
      }
      send({
        type: "content-created",
        content: { id: content.id, response: "Content was made!" },
      });
    } else if ("title" === type) document.title = content;
    else if ("refresh" === type) window.location.reload();
    else if ("web" === type) window.location.href = content;
    else if ("beat" === type)
      !(function (content) {
        sound.bpm[0] !== content.bpm[0] &&
          ((sound.bpm = new Float32Array(content.bpm)),
          updateMetronome(sound.bpm[0]));
        for (const square of content.squares) updateSquare(square);
        for (const bubble of content.bubbles) updateBubble(bubble);
      })(content);
    else if ("download" === type) {
      var { filename, data } = [content][0];
      let MIME = "application/octet-stream";
      "json" === extension(filename) && (MIME = "application/json");
      const a = document.createElement("a");
      (a.href = URL.createObjectURL(new Blob([data], { type: MIME }))),
        (a.download = filename),
        a.click(),
        URL.revokeObjectURL(a.href);
    } else if ("upload" === type)
      !(function (type) {
        const input = document.createElement("input");
        (input.type = "file"),
          (input.accept = type),
          (input.onchange = (e) => {
            const file = e.target.files[0];
            if (
              type
                .split(",")
                .every(
                  (t) => t !== file.type && t !== "." + extension(file.name)
                )
            )
              send({
                type: "upload",
                content: {
                  result: "error",
                  data: `Chosen file was not of type "${type}"`,
                },
              });
            else {
              const reader = new FileReader();
              reader.readAsText(file),
                (reader.onload = (e) => {
                  send({
                    type: "upload",
                    content: { result: "success", data: e.target.result },
                  });
                }),
                (reader.onerror = () => {
                  send({
                    type: "upload",
                    content: { result: "error", data: reader.error },
                  });
                });
            }
          }),
          input.click();
      })(content);
    else if ("microphone" === type)
      !(function (data) {
        attachMicrophone?.(data);
      })(content);
    else if ("video" === type)
      !(function ({ type, options }) {
        if ((console.log("🎥", type, options), "camera" === type)) {
          const video = document.createElement("video"),
            buffer = document.createElement("canvas");
          let animationRequest;
          videos.push({
            video: video,
            buffer: buffer,
            getAnimationRequest: function () {
              return animationRequest;
            },
          }),
            (buffer.width = options.width || 1280),
            (buffer.height = options.height || 720);
          const bufferCtx = buffer.getContext("2d");
          function process() {
            bufferCtx.drawImage(
              video,
              0,
              0,
              bufferCtx.canvas.width,
              bufferCtx.canvas.height
            );
            var pixels = bufferCtx.getImageData(
              0,
              0,
              buffer.clientWidth,
              buffer.clientHeight
            );
            send(
              {
                type: "video-frame",
                content: {
                  width: pixels.width,
                  height: pixels.height,
                  pixels: pixels.data,
                },
              },
              [pixels.data]
            ),
              (animationRequest = requestAnimationFrame(process));
          }
          wrapper.appendChild(video),
            wrapper.appendChild(buffer),
            (video.style = `position: absolute;
                     top: 0;
                     left: 0;
                     width: 300px;
                     opacity: 0;`),
            (buffer.style = `position: absolute;
                      opacity: 0;`),
            navigator.mediaDevices
              .getUserMedia({
                video: { width: { min: 1280 }, height: { min: 720 } },
                audio: !1,
              })
              .then((stream) => {
                (video.srcObject = stream), video.play(), process();
              })
              .catch((err) => {
                console.log(err);
              });
        }
      })(content);
    else if ("load-bitmap" === type)
      fetch(content).then(async (response) => {
        if (response.ok) {
          (response = await response.blob()),
            (response = await createImageBitmap(response));
          const ctx = document.createElement("canvas").getContext("2d");
          (ctx.canvas.width = response.width),
            (ctx.canvas.height = response.height),
            ctx.drawImage(response, 0, 0);
          response = ctx.getImageData(0, 0, response.width, response.height);
          send(
            {
              type: "loaded-bitmap-success",
              content: {
                url: content,
                img: {
                  width: response.width,
                  height: response.height,
                  pixels: response.data,
                },
              },
            },
            [response.data]
          );
        } else
          send({ type: "loaded-bitmap-rejection", content: { url: content } });
      });
    else {
      if ("fullscreen-toggle" === type)
        return (
          (curReframeDelay = 0),
          void (document.fullscreenElement || document.webkitFullscreenElement
            ? exitFullscreen()
            : requestFullscreen
                .apply(document.body)
                ?.catch((e) => console.error(e)))
        );
      if ("fps-change" === type)
        return console.log("🎞️ FPS:", content), void frameRate(content);
      if ("gap-change" === type)
        return (
          debug && console.log("🕳️ Gap:", content),
          void (gap !== content && ((gap = content), (needsReframe = !0)))
        );
      if ("density-change" === type)
        return (
          debug && console.log("💻️ Density:", content),
          void (
            density !== content && ((density = content), (needsReframe = !0))
          )
        );
      if ("glaze" === type)
        return (
          debug &&
            console.log(
              "🪟 Glaze:",
              content,
              "Type:",
              content.type || "prompt"
            ),
          void (
            !1 === (glaze = content).on &&
            (off(), canvas.style.removeProperty("opacity"))
          )
        );
      if ("disk-loaded" === type) {
        if (0 < content.pieceCount) {
          let url =
            content.path === content.firstPiece
              ? ""
              : "#" + content.path.substring(content.path.lastIndexOf("/") + 1);
          0 < content.params.length && (url += ":" + content.params.join(" ")),
            !1 === content.fromHistory &&
              history.pushState("", document.title, url);
        }
        currentPiece = content.path;
      } else {
        if ("back-to-piece" === type) return history.back(), !1;
        if ("disk-unload" === type)
          return (
            contentFrame?.remove(),
            (contentFrame = void 0),
            videos.forEach(({ video, buffer, getAnimationRequest }) => {
              console.log("🎥 Removing:", video, buffer, getAnimationRequest()),
                video.remove(),
                buffer.remove(),
                cancelAnimationFrame(getAnimationRequest());
            }),
            fixedWidth &&
              fixedHeight &&
              ((freezeFrame = !0),
              (freezeFrameGlaze = glaze.on),
              (fixedWidth = void 0),
              (fixedHeight = void 0),
              (needsReframe = !0)),
            0 !== gap && ((gap = 0), (needsReframe = !0)),
            (glaze.on = !1),
            canvas.style.removeProperty("opacity"),
            (pen.events.length = 0),
            (keyboard.events.length = 0),
            void document.querySelector("#software-keyboard-input")?.blur()
          );
        if ("update" === type) frameAlreadyRequested = !1;
        else {
          if (
            (content.reframe &&
              (frame(content.reframe.width, content.reframe.height),
              pen.retransformPosition()),
            content.cursorCode && pen.setCursorCode(content.cursorCode),
            void 0 === content.dirtyBox &&
              void 0 !== content.pixels?.length &&
              content.pixels?.length !== screen.pixels.length)
          )
            return (
              console.warn("Aborted render. Pixel buffers did not match."),
              console.log(
                "Content pixels:",
                content.pixels.length,
                "Screen:",
                screen.pixels.length,
                content.didntRender,
                content.reframe,
                "Freeze:",
                freezeFrame
              ),
              void (frameAlreadyRequested = !1)
            );
          let dirtyBoxBitmapCan;
          if (content.dirtyBox) {
            const imageData = new ImageData(
                content.pixels,
                content.dirtyBox.w,
                content.dirtyBox.h
              ),
              dbCtx =
                (((dirtyBoxBitmapCan = document.createElement("canvas")).width =
                  imageData.width),
                (dirtyBoxBitmapCan.height = imageData.height),
                dirtyBoxBitmapCan.getContext("2d"));
            dbCtx.putImageData(imageData, 0, 0);
          } else
            content.paintChanged &&
              (imageData = new ImageData(
                content.pixels,
                canvas.width,
                canvas.height
              ));
          function draw() {
            var db = content.dirtyBox,
              db =
                (db
                  ? (ctx.drawImage(dirtyBoxBitmapCan, db.x, db.y),
                    glaze.on && update(dirtyBoxBitmapCan, db.x, db.y))
                  : pixelsDidChange &&
                    (ctx.putImageData(imageData, 0, 0),
                    glaze.on && update(imageData)),
                glaze.on
                  ? render(
                      ctx.canvas,
                      timePassed,
                      pen.normalizedPosition(canvasRect)
                    )
                  : off(),
                window.devicePixelRatio);
            uiCtx.scale(db, db),
              uiCtx.clearRect(0, 0, 64, 64),
              pen.render(uiCtx, canvasRect),
              !0 === content.loading && spinner(uiCtx, timePassed),
              debug && frameCached && !0 !== content.loading && cached(uiCtx),
              uiCtx.resetTransform();
          }
          (pixelsDidChange = content.paintChanged || !1) || pen.changedInPiece
            ? ((frameCached = !1), (pen.changedInPiece = !1), draw())
            : !1 === frameCached
            ? ((frameCached = !0), draw())
            : !0 === content.loading && draw(),
            freezeFrame &&
              (glaze.on,
              freezeFrameCan.remove(),
              (freezeFrame = !1),
              (freezeFrameGlaze = !1)),
            glaze.on ? unfreeze() : canvas.style.removeProperty("opacity"),
            needsReappearance &&
              wrapper.classList.contains("hidden") &&
              (wrapper.classList.remove("hidden"), (needsReappearance = !1)),
            (timePassed = performance.now()),
            (frameAlreadyRequested = !1);
        }
      }
    }
  }
  (window.signal = function (message) {
    debug && console.log("🚨 Signal:", message),
      send({ type: "signal", content: message });
  }),
    (window.onpopstate = function (e) {
      send({
        type: "history-load",
        content: document.location.hash.substring(1),
      });
    });
  const requestFullscreen =
      document.body.requestFullscreen || wrapper.webkitRequestFullscreen,
    exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
  document.body.onfullscreenchange = (event) => {
    var fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    fullscreenElement
      ? console.log("😱 Entered fullscreen mode!", fullscreenElement)
      : console.log("😱 Leaving fullscreen mode!");
  };
}
let host, debug$1;
if (
  (!0 === window.acDEBUG || !1 === window.acDEBUG
    ? (debug$1 = window.acDEBUG)
    : ((debug$1 = !0), (window.acDEBUG = debug$1)),
  "aesthetic.computer" === window.location.hostname)
)
  (host = "aesthetic.computer"), (debug$1 = !1), (window.acDEBUG = debug$1);
else if (
  ((host = window.location.hostname), 1 < window.location.pathname.length)
) {
  const pathSegments = window.location.pathname.split("/");
  pathSegments[pathSegments.length - 1].endsWith(".html") && pathSegments.pop(),
    (host += pathSegments.join("/"));
}
const bpm = 120;
function receive(event) {
  "figma-image-input" === event.data.type &&
    console.log("Bytes:", event.data.bytes.length);
}
0 < window.location.hash.length
  ? boot$1(window.location.hash.slice(1), bpm, host, void 0, debug$1)
  : window.acSTARTING_PIECE
  ? boot$1(window.acSTARTING_PIECE, bpm, host, void 0, debug$1)
  : boot$1("prompt", bpm, host, void 0, debug$1),
  window.addEventListener("message", receive);
const { abs, sign, ceil, floor, sin, cos } = Math;
let width, height, pixels;
const depthBuffer = [],
  c = [255, 255, 255, 255],
  panTranslation = { x: 0, y: 0 },
  skips = [];
function makeBuffer(width, height, fillProcess, painting) {
  var savedBuffer,
    rc,
    imageData = new ImageData(width, height),
    imageData = {
      pixels: imageData.data,
      width: imageData.width,
      height: imageData.height,
    };
  return (
    "function" == typeof fillProcess &&
      ((savedBuffer = getBuffer()),
      (rc = c),
      setBuffer(imageData),
      (width = { width: width, height: height, pixels: pixels }),
      Object.assign(width, painting.api),
      fillProcess(width),
      painting.paint(),
      setBuffer(savedBuffer),
      color(...rc)),
    imageData
  );
}
function getBuffer() {
  return { width: width, height: height, pixels: pixels };
}
function setBuffer(buffer) {
  ({ width, height, pixels } = buffer);
}
function color(r, g, b, a = 255) {
  (c[0] = floor(r)), (c[1] = floor(g)), (c[2] = floor(b)), (c[3] = floor(a));
}
function clear() {
  for (let i = 0; i < pixels.length; i += 4)
    (pixels[i] = c[0]),
      (pixels[i + 1] = c[1]),
      (pixels[i + 2] = c[2]),
      (pixels[i + 3] = c[3]);
}
function plot() {
  let x, y;
  if (
    (([x, y] = 1 === arguments.length ? arguments[0] : arguments),
    (x = floor(x)),
    (y = floor(y)),
    !(x < 0 || x >= width || y < 0 || y >= height))
  ) {
    for (const s of skips) if (x === s.x && y === s.y) return;
    var i = 4 * (x + y * width),
      alpha = c[3];
    255 === alpha
      ? ((pixels[i] = c[0]),
        (pixels[1 + i] = c[1]),
        (pixels[2 + i] = c[2]),
        (pixels[3 + i] = c[3]))
      : 0 !== alpha &&
        ((pixels[i] = lerp(pixels[i], c[0], alpha / 255)),
        (pixels[1 + i] = lerp(pixels[1 + i], c[1], alpha / 255)),
        (pixels[2 + i] = lerp(pixels[2 + i], c[2], alpha / 255)),
        (pixels[3 + i] = Math.min(255, pixels[3 + i] + c[3])));
  }
}
function skip(...args) {
  null === args[0]
    ? (skips.length = 0)
    : args.forEach((p) => {
        skips.push({
          x: floor(p.x) + panTranslation.x,
          y: floor(p.y) + panTranslation.y,
        });
      });
}
function point(...args) {
  let x, y;
  1 === args.length
    ? ((x = args[0].x), (y = args[0].y))
    : 2 === args.length && ((x = args[0]), (y = args[1])),
    (x += panTranslation.x),
    (y += panTranslation.y),
    plot(x, y);
}
function pan(x, y) {
  void 0 === y && (y = x),
    (panTranslation.x += floor(x)),
    (panTranslation.y += floor(y));
}
function unpan() {
  (panTranslation.x = 0), (panTranslation.y = 0);
}
function copy(destX, destY, srcX, srcY, src, alpha = 1) {
  (destX = Math.round(destX)),
    (destY = Math.round(destY)),
    (srcX = Math.round(srcX)),
    (srcY = Math.round(srcY)),
    destX < 0 ||
      destX >= width ||
      destY < 0 ||
      destY >= height ||
      srcX < 0 ||
      srcX >= src.width ||
      srcY < 0 ||
      srcY >= src.height ||
      ((destX = 4 * (destX + destY * width)),
      (destY = 4 * (srcX + srcY * src.width)),
      (srcX = src.pixels[3 + destY] / 255),
      (pixels[destX] = lerp(pixels[destX], src.pixels[destY], srcX) * alpha),
      (pixels[1 + destX] =
        lerp(pixels[1 + destX], src.pixels[1 + destY], srcX) * alpha),
      (pixels[2 + destX] =
        lerp(pixels[2 + destX], src.pixels[2 + destY], srcX) * alpha),
      (pixels[3 + destX] = 255));
}
function paste(from, destX = 0, destY = 0) {
  if (from.crop)
    for (let x = 0; x < from.crop.w; x += 1)
      for (let y = 0; y < from.crop.h; y += 1)
        copy(
          destX + x,
          destY + y,
          from.crop.x + x,
          from.crop.y + y,
          from.painting
        );
  else
    for (let x = 0; x < from.width; x += 1)
      for (let y = 0; y < from.height; y += 1)
        copy(destX + x, destY + y, x, y, from);
}
function line() {
  let x0, y0, x1, y1;
  if (
    (4 === arguments.length
      ? ((x0 = arguments[0]),
        (y0 = arguments[1]),
        (x1 = arguments[2]),
        (y1 = arguments[3]))
      : 2 === arguments.length
      ? (y1 = Array.isArray(arguments[0])
          ? ((x0 = arguments[0][0]),
            (x1 = arguments[0][1]),
            (y0 = arguments[1][0]),
            arguments[1][1])
          : ((x0 = arguments[0].x),
            (y0 = arguments[0].y),
            (x1 = arguments[1].x),
            arguments[1].y))
      : console.warn(
          "Line did not use the correct number of arguments:",
          arguments
        ),
    isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1))
  )
    return console.error("Invalid line arguments:", x0, y0, x1, y1);
  (x0 += panTranslation.x),
    (y0 += panTranslation.y),
    (x1 += panTranslation.x),
    (y1 += panTranslation.y),
    bresenham(x0, y0, x1, y1).forEach((p) => plot(p.x, p.y));
}
function circle(x0, y0, radius) {
  (x0 = floor(x0)), (y0 = floor(y0));
  let f = 1 - (radius = floor(radius)),
    ddF_x = 0,
    ddF_y = -2 * radius,
    x = 0,
    y = radius;
  for (
    plot(x0, y0 + radius),
      plot(x0, y0 - radius),
      plot(x0 + radius, y0),
      plot(x0 - radius, y0);
    x < y;

  )
    0 <= f && (--y, (ddF_y += 2), (f += ddF_y)),
      (x += 1),
      (ddF_x += 2),
      (f += ddF_x + 1),
      plot(x0 + x, y0 + y),
      plot(x0 - x, y0 + y),
      plot(x0 + x, y0 - y),
      plot(x0 - x, y0 - y),
      plot(x0 + y, y0 + x),
      plot(x0 - y, y0 + x),
      plot(x0 + y, y0 - x),
      plot(x0 - y, y0 - x);
}
function poly(coords) {
  let last = coords[0];
  coords.forEach((current, i) => {
    i < coords.length - 1 && skip(current),
      line(last, current),
      skip(null),
      (last = current);
  });
}
function bresenham(x0, y0, x1, y1) {
  const points = [];
  (x0 = floor(x0)), (y0 = floor(y0)), (x1 = floor(x1)), (y1 = floor(y1));
  var dx = abs(x1 - x0),
    dy = abs(y1 - y0),
    sx = x0 < x1 ? 1 : -1,
    sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  for (;;) {
    if ((points.push({ x: x0, y: y0 }), x0 === x1 && y0 === y1)) break;
    var e2 = 2 * err;
    -dy < e2 && ((err -= dy), (x0 += sx)), e2 < dx && ((err += dx), (y0 += sy));
  }
  return points;
}
const BOX_CENTER = "*center";
function box() {
  let x,
    y,
    w,
    h,
    mode = "fill";
  if (1 === arguments.length) {
    if (Array.isArray(arguments[0]))
      (x = arguments[0][0]),
        (y = arguments[0][1]),
        (w = arguments[0][2]),
        (h = arguments[0][3]);
    else if (
      ((x = arguments[0].x),
      (y = arguments[0].y),
      (w = arguments[0].w),
      (h = arguments[0].h || arguments[0].w),
      void 0 === x || void 0 === y || void 0 === w)
    )
      return console.error(
        "Could not make a box {x,y,w,h} from:",
        arguments[0]
      );
  } else if (2 === arguments.length)
    (x = arguments[0].x),
      (y = arguments[0].y),
      (w = arguments[0].w),
      (h = arguments[0].h),
      (mode = arguments[1]);
  else if (3 === arguments.length)
    (x = arguments[0]),
      (y = arguments[1]),
      (w = arguments[2]),
      (h = arguments[2]);
  else if (4 === arguments.length)
    "number" == typeof arguments[3]
      ? ((x = arguments[0]),
        (y = arguments[1]),
        (w = arguments[2]),
        (h = arguments[3]))
      : ((x = arguments[0]),
        (y = arguments[1]),
        (w = arguments[2]),
        (h = arguments[2]),
        (mode = arguments[3]));
  else {
    if (5 !== arguments.length) return console.error("Invalid box call.");
    (x = arguments[0]),
      (y = arguments[1]),
      (w = arguments[2]),
      (h = arguments[3]),
      (mode = arguments[4]);
  }
  if (
    (mode.endsWith(BOX_CENTER) &&
      ((x -= w / 2), (y -= h / 2), (mode = mode.slice(0, -BOX_CENTER.length))),
    "outline" === mode)
  )
    line(x - 1, y - 1, x + w, y - 1),
      line(x - 1, y + h, x + w, y + h),
      line(x - 1, y, x - 1, y + h - 1),
      line(x + w, y, x + w, y + h - 1);
  else if ("inline" === mode)
    line(x, y, x + w - 1, y),
      line(x, y + h - 1, x + w - 1, y + h - 1),
      line(x, y + 1, x, y + h - 2),
      line(x + w - 1, y + 1, x + w - 1, y + h - 2);
  else if ("fill" === mode)
    if ((--w, 1 === sign(height)))
      for (let row = 0; row < h; row += 1) line(x, y + row, x + w, y + row);
    else for (let row = 0; row > h; --row) line(x, y + row, x + w, y + row);
}
function shape() {
  if (arguments % 2 != 0) {
    let points = [];
    for (let p = 0; p < arguments.length; p += 2)
      points.push([arguments[p], arguments[p + 1]]);
    points.forEach((p, i) => {
      color(0, 255, 0, 100);
      i = i < points.length - 1 ? points[i + 1] : points[0];
      line(...p, ...i), color(255, 255, 255), point(...p);
    });
  } else
    console.error("Shape requires an even number of arguments: x,y,x,y...");
}
function grid({ box: { x, y, w: cols, h: rows }, scale, centers }, buffer) {
  const oc = c.slice();
  var w = cols * scale,
    h = rows * scale,
    colPix = floor(w / cols),
    rowPix = floor(h / rows);
  if (buffer)
    for (let j = 0; j < rows; j += 1) {
      var plotY = y + rowPix * j;
      for (let i = 0; i < cols; i += 1) {
        var plotX = x + colPix * i,
          repeatX = i % buffer.width,
          repeatY = j % buffer.height,
          repeatX = 4 * (repeatX + buffer.width * repeatY);
        repeatX < buffer.pixels.length &&
          (color(...buffer.pixels.subarray(repeatX, 4 + repeatX)),
          box(plotX, plotY, scale));
      }
    }
  else {
    (w = x + w - 1), (h = y + h - 1);
    color(64, 64, 64),
      plot(x, y),
      plot(w, y),
      plot(x, h),
      plot(w, h),
      color(...oc);
    for (let i = 0; i < cols; i += 1) {
      const plotX = x + colPix * i;
      for (let j = 0; j < rows; j += 1) {
        const plotY = y + rowPix * j;
        var alphaMod = oc[3] / 255;
        color(oc[0], oc[1], oc[2], even(i + j) ? 50 * alphaMod : 75 * alphaMod),
          box(plotX, plotY, scale),
          centers.forEach((p) => {
            color(oc[0], oc[1], oc[2], 100), plot(plotX + p.x, plotY + p.y);
          });
      }
    }
    color(...oc);
  }
}
function draw(drawing, x, y, scale = 1, angle = 0) {
  if (void 0 !== drawing) {
    angle = radians(angle);
    const s = sin(angle),
      c = cos(angle);
    pan(x, y),
      drawing.commands.forEach(({ name, args }) => {
        var x1, y1, x2, y2;
        (args = args.map((a) => a * scale)),
          "line" === name
            ? ((x1 = args[0]),
              (y1 = args[1]),
              (x2 = args[2]),
              (y2 = args[3]),
              line(
                x1 * c - y1 * s,
                x1 * s + y1 * c,
                x2 * c - y2 * s,
                x2 * s + y2 * c
              ))
            : "point" === name && point(...args);
      }),
      unpan();
  }
}
function printLine(
  text,
  font,
  startX,
  startY,
  width = 6,
  scale = 1,
  xOffset = 0
) {
  [...text.toString()].forEach((char, i) => {
    draw(font[char], startX + width * scale * i + xOffset, startY, scale);
  });
}
function noise16() {
  for (let i = 0; i < pixels.length; i += 4)
    (pixels[i] = byteInterval17(randInt(16))),
      (pixels[i + 1] = byteInterval17(randInt(16))),
      (pixels[i + 2] = byteInterval17(randInt(16))),
      (pixels[i + 3] = 255);
}
function noise16DIGITPAIN() {
  for (let i = 0; i < pixels.length; i += 4)
    (pixels[i] = 0.6 * byteInterval17(randInt(16))),
      (pixels[i + 1] = 0.15 * byteInterval17(randInt(16))),
      (pixels[i + 2] = 0.55 * byteInterval17(randInt(16))),
      (pixels[i + 3] = 255);
}
function noiseTinted(tint, amount, saturation) {
  for (let i = 0; i < pixels.length; i += 4) {
    var grayscale = randInt(255);
    (pixels[i] = lerp(
      lerp(grayscale, randInt(255), saturation),
      tint[0],
      amount
    )),
      (pixels[i + 1] = lerp(
        lerp(grayscale, randInt(255), saturation),
        tint[1],
        amount
      )),
      (pixels[i + 2] = lerp(
        lerp(grayscale, randInt(255), saturation),
        tint[2],
        amount
      )),
      (pixels[i + 3] = 255);
  }
}
const X = 0,
  Y = 1,
  Z = 2,
  W = 3;
class Camera {
  matrix;
  x = 0;
  y = 0;
  #z = 0;
  #perspectiveMatrix;
  #transformMatrix;
  constructor(fov) {
    this.#perspective(fov),
      this.#transform(),
      (this.matrix = this.#transformMatrix);
  }
  set z(n) {
    (this.#z = n), this.#transform(), (this.matrix = this.#transformMatrix);
  }
  get z() {
    return this.#z;
  }
  forward(n) {
    (this.#z -= n), this.#transform(), (this.matrix = this.#transformMatrix);
  }
  #perspective(fov) {
    this.#perspectiveMatrix = perspective(
      create$2(),
      radians(fov),
      width / height,
      0.1,
      1e3
    );
    (this.#perspectiveMatrix[10] = -1000.1 / -999.9),
      (this.#perspectiveMatrix[14] = 200 / -999.9),
      (this.#perspectiveMatrix[11] = 1);
  }
  #transform() {
    this.#transformMatrix = translate(create$2(), this.#perspectiveMatrix, [
      this.x,
      this.y,
      this.#z,
    ]);
  }
}
class Form {
  vertices = [];
  indices;
  texture;
  #gradientColors = [
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
  ];
  position = [0, 0, 0];
  rotation = [0, 0, 0];
  scale = [1, 1, 1];
  alpha = 1;
  constructor(
    { positions, indices },
    fill,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1]
  ) {
    for (let i = 0; i < positions.length; i++) {
      var texCoord = [
        positions[i][X] / 2 + 0.5,
        positions[i][Y] / 2 + 0.5,
        0,
        0,
      ];
      this.vertices.push(
        new Vertex(positions[i], this.#gradientColors[i % 3], texCoord)
      );
    }
    (this.indices = indices),
      fill.texture && (this.texture = fill.texture),
      (this.position = position),
      (this.rotation = rotation),
      (this.scale = scale);
  }
  graph({ matrix: cameraMatrix }) {
    var translate = fromTranslation(create$2(), this.position),
      rotateY = fromYRotation(create$2(), radians(this.rotation[Y])),
      rotateX = fromXRotation(create$2(), radians(this.rotation[X])),
      rotateZ = fromZRotation(create$2(), radians(this.rotation[Z])),
      rotateY = mul$2(create$2(), rotateY, rotateX);
    mul$2(rotateY, rotateY, rotateZ);
    const matrix = mul$2(create$2(), translate, rotateY),
      transformedVertices =
        (scale$2(matrix, matrix, this.scale),
        mul$2(matrix, cameraMatrix, matrix),
        []);
    this.vertices.forEach((vertex) => {
      transformedVertices.push(vertex.transform(matrix));
    });
    for (let i = 0; i < this.indices.length; i += 3)
      drawTriangle(
        transformedVertices[i],
        transformedVertices[i + 1],
        transformedVertices[i + 2],
        this.texture,
        this.alpha
      );
  }
  angle(x, y, z) {
    (this.rotation[X] = x), (this.rotation[Y] = y), (this.rotation[Z] = z);
  }
}
class Vertex {
  pos;
  color;
  texCoords;
  get x() {
    return this.pos[X];
  }
  get y() {
    return this.pos[Y];
  }
  get color24bit() {
    return this.color.map((c) => floor(255 * c));
  }
  constructor(pos = [0, 0, 0, 1], color = [...c, 1], texCoords = [0, 0, 0, 0]) {
    (this.pos = fromValues(...pos)),
      (this.color = fromValues(...color)),
      (this.texCoords = fromValues(...texCoords));
  }
  transform(matrix) {
    return new Vertex(
      transformMat4(create(), this.pos, matrix),
      this.color,
      this.texCoords
    );
  }
  perspectiveDivide() {
    return new Vertex(
      fromValues(
        this.pos[X] / this.pos[W],
        this.pos[Y] / this.pos[W],
        this.pos[Z] / this.pos[W],
        this.pos[W]
      ),
      this.color,
      this.texCoords
    );
  }
}
function initScreenSpaceTransformMatrix(halfWidth, halfHeight) {
  var m = create$2();
  return (
    translate(m, m, [halfWidth - 0.5, halfHeight - 0.5, 0]),
    scale$2(m, m, [halfWidth, -halfHeight, 1]),
    m
  );
}
function isInsideViewFrustum(v4) {
  return (
    abs(v4[X]) <= abs(v4[W]) &&
    abs(v4[Y]) <= abs(v4[W]) &&
    abs(v4[Z]) <= abs(v4[W])
  );
}
class Edge {
  #x;
  #yStart;
  #yEnd;
  color;
  #colorStep;
  texCoordX;
  #texCoordXStep;
  texCoordY;
  #texCoordYStep;
  oneOverZ;
  #oneOverZStep;
  depth;
  #depthStep;
  get x() {
    return this.#x;
  }
  get yStart() {
    return this.#yStart;
  }
  get yEnd() {
    return this.#yEnd;
  }
  #xStep;
  constructor(gradients, minYVert, maxYVert, minYVertIndex) {
    (this.#yStart = ceil(minYVert.y)), (this.#yEnd = ceil(maxYVert.y));
    var yDist = maxYVert.y - minYVert.y,
      maxYVert = maxYVert.x - minYVert.x,
      yPrestep = this.#yStart - minYVert.y,
      maxYVert =
        ((this.#xStep = maxYVert / yDist),
        (this.#x = minYVert.x + yPrestep * this.#xStep),
        this.#x - minYVert.x),
      yDist =
        ((this.texCoordX =
          gradients.texCoordX[minYVertIndex] +
          gradients.texCoordXXStep * maxYVert +
          gradients.texCoordXYStep * yPrestep),
        (this.#texCoordXStep =
          gradients.texCoordXYStep + gradients.texCoordXXStep * this.#xStep),
        (this.texCoordY =
          gradients.texCoordY[minYVertIndex] +
          gradients.texCoordYXStep * maxYVert +
          gradients.texCoordYYStep * yPrestep),
        (this.#texCoordYStep =
          gradients.texCoordYYStep + gradients.texCoordYXStep * this.#xStep),
        (this.oneOverZ =
          gradients.oneOverZ[minYVertIndex] +
          gradients.oneOverZXStep * maxYVert +
          gradients.oneOverZYStep * yPrestep),
        (this.#oneOverZStep =
          gradients.oneOverZYStep + gradients.oneOverZXStep * this.#xStep),
        (this.depth =
          gradients.depth[minYVertIndex] +
          gradients.depthXStep * maxYVert +
          gradients.depthYStep * yPrestep),
        (this.#depthStep =
          gradients.depthYStep + gradients.depthXStep * this.#xStep),
        gradients.color[minYVertIndex].slice());
    add(yDist, yDist, scale(create(), gradients.colorYStep, yPrestep)),
      add(yDist, yDist, scale(create(), gradients.colorXStep, maxYVert)),
      (this.color = yDist);
    {
      const vec = gradients.colorYStep.slice();
      add(vec, vec, scale(create(), gradients.colorXStep, this.#xStep)),
        (this.#colorStep = vec);
    }
  }
  step() {
    (this.#x += this.#xStep),
      add(this.color, this.color, this.#colorStep),
      (this.texCoordX += this.#texCoordXStep),
      (this.texCoordY += this.#texCoordYStep),
      (this.oneOverZ += this.#oneOverZStep),
      (this.depth += this.#depthStep);
  }
}
class Gradients {
  oneOverZ;
  texCoordX;
  texCoordY;
  depth;
  texCoordXXStep;
  texCoordXYStep;
  texCoordYXStep;
  texCoordYYStep;
  oneOverZXStep;
  oneOverZYStep;
  depthXStep;
  depthYStep;
  color;
  colorYStep;
  colorXStep;
  constructor(minYVert, midYVert, maxYVert) {
    this.color = [minYVert.color, midYVert.color, maxYVert.color];
    var oneOverdX =
        1 /
        ((midYVert.x - maxYVert.x) * (minYVert.y - maxYVert.y) -
          (minYVert.x - maxYVert.x) * (midYVert.y - maxYVert.y)),
      oneOverdY = -oneOverdX,
      a =
        ((this.oneOverZ = [
          1 / minYVert.pos[W],
          1 / midYVert.pos[W],
          1 / maxYVert.pos[W],
        ]),
        (this.texCoordX = [
          minYVert.texCoords[X] * this.oneOverZ[0],
          midYVert.texCoords[X] * this.oneOverZ[1],
          maxYVert.texCoords[X] * this.oneOverZ[2],
        ]),
        (this.texCoordY = [
          minYVert.texCoords[Y] * this.oneOverZ[0],
          midYVert.texCoords[Y] * this.oneOverZ[1],
          maxYVert.texCoords[Y] * this.oneOverZ[2],
        ]),
        (this.depth = [minYVert.pos[Z], midYVert.pos[Z], maxYVert.pos[Z]]),
        (this.texCoordXXStep = Gradients.calcXStep(
          this.texCoordX,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdX
        )),
        (this.texCoordXYStep = Gradients.calcYStep(
          this.texCoordX,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdY
        )),
        (this.texCoordYXStep = Gradients.calcXStep(
          this.texCoordY,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdX
        )),
        (this.texCoordYYStep = Gradients.calcYStep(
          this.texCoordY,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdY
        )),
        (this.oneOverZXStep = Gradients.calcXStep(
          this.oneOverZ,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdX
        )),
        (this.oneOverZYStep = Gradients.calcYStep(
          this.oneOverZ,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdY
        )),
        (this.depthXStep = Gradients.calcXStep(
          this.depth,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdX
        )),
        (this.depthYStep = Gradients.calcYStep(
          this.depth,
          minYVert,
          midYVert,
          maxYVert,
          oneOverdY
        )),
        sub(create(), this.color[1], this.color[2])),
      b = minYVert.y - maxYVert.y,
      c = sub(create(), this.color[0], this.color[2]),
      d = midYVert.y - maxYVert.y,
      a = scale(create(), a, b),
      b = scale(create(), c, d),
      c = sub(create(), a, b);
    this.colorXStep = scale(create(), c, oneOverdX);
    {
      const a = sub(create(), this.color[1], this.color[2]),
        b = minYVert.x - maxYVert.x,
        c = sub(create(), this.color[0], this.color[2]),
        d = midYVert.x - maxYVert.x,
        left = scale(create(), a, b),
        right = scale(create(), c, d),
        sub$1 = sub(create(), left, right);
      this.colorYStep = scale(create(), sub$1, oneOverdY);
    }
  }
  static calcXStep(values, minYVert, midYVert, maxYVert, oneOverdX) {
    return (
      ((values[1] - values[2]) * (minYVert.y - maxYVert.y) -
        (values[0] - values[2]) * (midYVert.y - maxYVert.y)) *
      oneOverdX
    );
  }
  static calcYStep(values, minYVert, midYVert, maxYVert, oneOverdY) {
    return (
      ((values[1] - values[2]) * (minYVert.x - maxYVert.x) -
        (values[0] - values[2]) * (midYVert.x - maxYVert.x)) *
      oneOverdY
    );
  }
}
function drawTriangle(v1, v2, v3, texture, alpha) {
  isInsideViewFrustum(v1.pos) &&
    isInsideViewFrustum(v2.pos) &&
    isInsideViewFrustum(v3.pos) &&
    fillTriangle(v1, v2, v3, texture, alpha);
}
function fillTriangle(minYVert, midYVert, maxYVert, texture, alpha) {
  var screenMatrix = initScreenSpaceTransformMatrix(width / 2, height / 2);
  if (
    ((minYVert = minYVert.transform(screenMatrix).perspectiveDivide()),
    (midYVert = midYVert.transform(screenMatrix).perspectiveDivide()),
    (maxYVert = maxYVert.transform(screenMatrix).perspectiveDivide()).y <
      midYVert.y &&
      ((screenMatrix = maxYVert),
      (maxYVert = midYVert),
      (midYVert = screenMatrix)),
    midYVert.y < minYVert.y)
  ) {
    const temp = midYVert;
    (midYVert = minYVert), (minYVert = temp);
  }
  if (maxYVert.y < midYVert.y) {
    const temp = maxYVert;
    (maxYVert = midYVert), (midYVert = temp);
  }
  scanTriangle(
    minYVert,
    midYVert,
    maxYVert,
    0 <= triangleAreaDouble(minYVert, maxYVert, midYVert),
    texture,
    alpha
  );
}
function triangleAreaDouble(a, b, c) {
  var x1 = b.x - a.x,
    b = b.y - a.y,
    x2 = c.x - a.x;
  return x1 * (c.y - a.y) - x2 * b;
}
function scanTriangle(
  minYVert,
  midYVert,
  maxYVert,
  handedness,
  texture,
  alpha
) {
  var gradients = new Gradients(minYVert, midYVert, maxYVert),
    topToBottom = new Edge(gradients, minYVert, maxYVert, 0),
    minYVert = new Edge(gradients, minYVert, midYVert, 0),
    midYVert = new Edge(gradients, midYVert, maxYVert, 1);
  scanEdges(gradients, topToBottom, minYVert, handedness, texture, alpha),
    scanEdges(gradients, topToBottom, midYVert, handedness, texture, alpha);
}
function scanEdges(gradients, a, b, handedness, texture, alpha) {
  let left = a,
    right = b;
  handedness && ((a = left), (left = right), (right = a));
  var handedness = b.yStart,
    yEnd = b.yEnd;
  for (let i = handedness; i < yEnd; i += 1)
    drawScanLine(gradients, left, right, i, texture, alpha),
      left.step(),
      right.step();
}
function drawScanLine(gradients, left, right, j, texture, alpha) {
  var xMin = ceil(left.x),
    xMax = ceil(right.x),
    xPrestep = xMin - left.x,
    xDist = right.x - left.x,
    texCoordXXStep = (right.texCoordX - left.texCoordX) / xDist,
    texCoordYXStep = (right.texCoordY - left.texCoordY) / xDist,
    oneOverZXStep = (right.oneOverZ - left.oneOverZ) / xDist,
    depthXStep = (right.depth - left.depth) / xDist;
  let texCoordX = left.texCoordX + texCoordXXStep * xPrestep,
    texCoordY = left.texCoordY + texCoordYXStep * xPrestep,
    oneOverZ = left.oneOverZ + oneOverZXStep * xPrestep,
    depth = left.depth + depthXStep * xPrestep;
  var gradientColor = add(
    create(),
    left.color,
    scale(create(), gradients.colorXStep, xPrestep)
  );
  for (let i = xMin; i < xMax; i += 1) {
    var srcX,
      index = i + j * width;
    depth < depthBuffer[index] &&
      ((depthBuffer[index] = depth),
      (index = 1 / oneOverZ),
      (srcX = texCoordX * index * (texture.width - 1) + 0.5),
      (index = texCoordY * index * (texture.height - 1) + 0.5),
      copy(i, j, srcX, index, texture, alpha)),
      add(gradientColor, gradientColor, gradients.colorXStep),
      (texCoordX += texCoordXXStep),
      (texCoordY += texCoordYXStep),
      (oneOverZ += oneOverZXStep),
      (depth += depthXStep);
  }
}
class Hourglass {
  ticks = 0;
  max = 1;
  complete = !1;
  #completedCb;
  #flippedCb;
  #autoFlip = !1;
  constructor(
    max = 1,
    { completed, flipped, autoFlip = !1 } = {},
    startingTicks = 0
  ) {
    (this.max = max),
      (this.ticks = startingTicks),
      (this.#autoFlip = autoFlip),
      (this.#completedCb = completed),
      (this.#flippedCb = flipped);
  }
  step() {
    if (!0 === this.complete) return console.log("⌛ Already complete.");
    (this.ticks += 1),
      this.ticks === this.max &&
        ((this.complete = !0),
        this.#completedCb?.(this),
        this.#autoFlip && this.flip());
  }
  get progress() {
    return this.ticks / this.max;
  }
  flip() {
    (this.ticks = 0), (this.complete = !1), this.#flippedCb?.(...arguments);
  }
}
function choose() {
  return arguments[randInt(arguments.length - 1)];
}
function every(obj, value) {
  Object.keys(obj).forEach((k) => (obj[k] = value));
}
function any(obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
function each(obj, fn) {
  Object.entries(obj).forEach(([key, obj]) => fn(obj, key));
}
function repeat(n, fn) {
  for (let i = 0; i < n; i += 1) fn(i);
}
class Socket {
  #killSocket = !1;
  #ws;
  #reconnectTime = 1e3;
  constructor(host, receive, reload) {
    this.#connect(host, receive, reload);
  }
  #connect(host, receive, reload) {
    this.#ws = new WebSocket("wss://" + host);
    const ws = this.#ws;
    (ws.onopen = (e) => {
      console.log("📡 Connected"), (this.#reconnectTime = 1e3);
    }),
      (ws.onmessage = (e) => {
        e = JSON.parse(e.data);
        this.#preReceive(e, receive, reload);
      }),
      (ws.onclose = (e) => {
        console.log("📡 Disconnected...", e.reason),
          !1 === this.#killSocket &&
            (console.log("📡 Reconnecting in:", this.#reconnectTime, "ms"),
            setTimeout(() => {
              this.#connect(host, receive, reload);
            }, this.#reconnectTime),
            (this.#reconnectTime = Math.min(2 * this.#reconnectTime, 32e3)));
      }),
      (ws.onerror = (err) => {
        console.error("📡 Error:", err), ws.close();
      });
  }
  send(type, content) {
    this.#ws.readyState === WebSocket.OPEN &&
      this.#ws.send(JSON.stringify({ type: type, content: content }));
  }
  kill() {
    (this.#killSocket = !0), this.#ws.close();
  }
  #preReceive({ id, type, content }, receive, reload) {
    "message" === type
      ? console.log("📡 " + content)
      : "reload" === type && reload
      ? "disk" === content
        ? (console.log("💾️ Reloading disk..."), this.kill(), reload())
        : "system" === content &&
          reload &&
          (console.log("💥️ Restarting system..."), reload("refresh"))
      : receive?.(id, type, content);
  }
}
const servers = {
  main: "server.aesthetic.computer",
  local: "localhost:8082",
  julias: "192.168.1.120:8082",
  lucias: "192.168.1.245:8082",
  ashland_mbp: "192.168.1.18",
};
let debug = !1;
const defaults = {
  boot: ($) => {
    $.cursor("native"), $.gap(0);
  },
  sim: () => !1,
  paint: ($) => {
    $.wipe(0, 0, 0);
  },
  beat: () => !1,
  act: () => !1,
};
let boot = defaults.boot,
  sim = defaults.sim,
  paint = defaults.paint,
  beat = defaults.beat,
  act = defaults.act,
  currentPath,
  currentHost,
  currentSearch,
  currentParams,
  loading = !1,
  reframe,
  screen,
  cursorCode,
  pieceHistoryIndex = -1,
  paintCount = 0n,
  simCount = 0n,
  initialSim = !0,
  noPaint = !1,
  socket,
  penX,
  penY;
const store = {};
let upload,
  activeVideo,
  bitmapPromises = {},
  inFocus,
  loadFailure;
const $commonApi = {
    num: {
      randInt: randInt,
      randIntArr: randIntArr,
      randIntRange: randIntRange,
      multiply: multiply,
      dist: dist,
      radians: radians,
      lerp: lerp,
      Track: Track,
      timestamp: timestamp,
      vec2: vec2,
      vec4: vec4,
      mat4: mat4,
    },
    geo: { Box: Box, DirtyBox: DirtyBox, Grid: Grid, Circle: Circle },
    ui: { Button: Button },
    help: {
      choose: choose,
      repeat: repeat,
      every: every,
      any: any,
      each: each,
    },
    gizmo: { Hourglass: Hourglass },
    net: {},
    needsPaint: () => (noPaint = !1),
    store: store,
    pieceCount: -1,
    debug: debug,
  },
  $updateApi = {},
  SQUARE = {
    positions: [
      [-1, -1, 0, 1],
      [-1, 1, 0, 1],
      [1, 1, 0, 1],
      [-1, -1, 0, 1],
      [1, -1, 0, 1],
      [1, 1, 0, 1],
    ],
    indices: [0, 1, 2, 3, 4, 5],
  },
  TRIANGLE = {
    positions: [
      [-1, -1, 0, 1],
      [0, 1, 0, 1],
      [1, -1, 0, 1],
    ],
    indices: [0, 1, 2],
  };
function ink() {
  let args = arguments;
  if (1 === args.length) {
    var isNumber = () => "number" == typeof args[0],
      isArray = () => Array.isArray(args[0]);
    if (!isNumber() && !isArray()) return ink(any(args[0]));
    if (isNumber()) (args = Array.from(args)).push(args[0], args[0]);
    else if (isArray()) return ink(...args[0]);
  } else
    2 === args.length &&
      (args = [arguments[0], arguments[0], arguments[0], arguments[1]]);
  color(...args);
}
const $paintApi = {
    Camera: Camera,
    Form: Form,
    TRIANGLE: TRIANGLE,
    SQUARE: SQUARE,
  },
  $paintApiUnwrapped = {
    page: setBuffer,
    ink: ink,
    wipe: function () {
      0 < arguments.length && ink(...arguments), clear();
    },
    copy: copy,
    paste: paste,
    plot: function () {
      1 === arguments.length
        ? plot(arguments[0].x, arguments[0].y)
        : plot(...arguments);
    },
    point: point,
    line: line,
    circle: circle,
    poly: poly,
    box: box,
    shape: shape,
    grid: grid,
    draw: draw,
    printLine: printLine,
    form: function (f, cam) {
      f.graph(cam);
    },
    pan: pan,
    unpan: unpan,
    skip: skip,
    noise16: noise16,
    noise16DIGITPAIN: noise16DIGITPAIN,
    noiseTinted: noiseTinted,
  };
class Painting {
  #layers = [];
  #layer = 0;
  api = {};
  constructor() {
    Object.assign(this.api, $paintApi);
    const p = this;
    for (const k in $paintApiUnwrapped)
      "function" == typeof $paintApiUnwrapped[k] &&
        (p.api[k] = function () {
          return (
            notArray(p.#layers[p.#layer]) && (p.#layers[p.#layer] = []),
            p.#layers[p.#layer].push(() => $paintApiUnwrapped[k](...arguments)),
            p.api
          );
        });
    (this.api.painting = function () {
      return makeBuffer(...arguments, new Painting());
    }),
      (this.api.layer = function (n) {
        return (p.#layer = n), p.api;
      }),
      (this.api.abstract = { bresenham: bresenham });
  }
  paint() {
    this.#layers.forEach((layer) => {
      layer.forEach((paint) => paint());
    }),
      (this.#layers.length = 0),
      (this.#layer = 0);
  }
}
const painting = new Painting();
let glazeAfterReframe;
const { send, noWorker } = (() => {
  let loadHost,
    firstLoad = !0,
    firstPiece,
    firstParams;
  async function load(
    path,
    host = loadHost,
    search = "",
    params = [],
    fromHistory = !1
  ) {
    if (
      ((loadFailure = void 0),
      (host = host.replace(/\/$/, "")),
      (loadHost = host),
      (pieceHistoryIndex += !0 === fromHistory ? -1 : 1),
      socket?.kill(),
      (path = "" === path ? firstPiece || "prompt" : path) === firstPiece &&
        0 === params.length &&
        (params = firstParams),
      debug && console.log("💾", path, "🌐", host),
      (path =
        -1 === path.indexOf("/") ? "aesthetic.computer/disks/" + path : path) &&
        debug &&
        console.log("🟡 Development"),
      !1 !== loading)
    )
      console.warn("Already loading another disk:", path);
    else {
      loading = !0;
      var fullUrl = "https://" + host + "/" + path + ".js";
      fullUrl += "#" + Date.now();
      const module = await import(fullUrl).catch((err) => {
        (loading = !1),
          console.error(`😡 "${path}" load failure:`, err),
          (loadFailure = err);
      });
      if (void 0 === module) loading = !1;
      else {
        if (
          (($commonApi.reload = (type) => {
            "refresh" === type
              ? send({ type: "refresh" })
              : load(currentPath, currentHost, currentSearch, currentParams);
          }),
          ($commonApi.title = (title) => {
            send({ type: "title", content: title });
          }),
          ($commonApi.net.host = host),
          ($commonApi.net.web = (url) => {
            send({ type: "web", content: url });
          }),
          debug)
        ) {
          let receiver;
          (socket = new Socket(
            servers.local,
            (id, type, content) => receiver?.(id, type, content),
            $commonApi.reload
          )),
            ($commonApi.net.socket = function (receive) {
              return (receiver = receive), socket;
            });
        } else
          $commonApi.net.socket = function (
            receive,
            host = debug ? servers.local : servers.main
          ) {
            return (socket = new Socket(host, receive));
          };
        setTimeout(() => {
          (paintCount = 0n),
            (simCount = 0n),
            (initialSim = !0),
            (activeVideo = null),
            (bitmapPromises = {}),
            (noPaint = !1),
            (currentPath = path),
            (currentHost = host),
            (currentSearch = search),
            (currentParams = params),
            (boot = module.boot || defaults.boot),
            (sim = module.sim || defaults.sim),
            (paint = module.paint || defaults.paint),
            (beat = module.beat || defaults.beat),
            (act = module.act || defaults.act),
            ($commonApi.query = search),
            ($commonApi.params = params || []),
            ($commonApi.load = load),
            ($commonApi.pieceCount += 1),
            ($commonApi.content = new Content()),
            (cursorCode = "precise"),
            (loading = !1),
            (penX = void 0),
            (penY = void 0),
            send({
              type: "disk-loaded",
              content: {
                path: path,
                params: params,
                pieceCount: $commonApi.pieceCount,
                firstPiece: firstPiece,
                fromHistory: fromHistory,
              },
            }),
            !1 === firstLoad
              ? send({ type: "disk-unload" })
              : ((firstLoad = !1), (firstPiece = path), (firstParams = params));
        }, 100);
      }
    }
  }
  const isWorker = "function" == typeof importScripts,
    noWorker = { onMessage: void 0, postMessage: void 0 };
  function send(data) {
    isWorker ? postMessage(data) : noWorker.postMessage({ data: data });
  }
  return (
    isWorker
      ? (onmessage = async function (e) {
          (debug = e.data.debug),
            await load(e.data.path, e.data.host, e.data.search, e.data.params),
            (onmessage = makeFrame),
            send({ loaded: !0 });
        })
      : (noWorker.onMessage = async (e) => {
          (e = { data: e }),
            (debug = e.data.debug),
            await load(e.data.path, e.data.host, e.data.search, e.data.params),
            (noWorker.onMessage = (d) => makeFrame({ data: d })),
            send({ loaded: !0 });
        }),
    { load: load, send: send, noWorker: noWorker }
  );
})();
class Content {
  nodes = [];
  #id = 0;
  constructor() {}
  add(content) {
    return (
      this.nodes.push({ id: this.#id }),
      (this.#id = this.nodes.length - 1),
      send({
        type: "content-create",
        content: { id: this.#id, content: content },
      }),
      this.nodes[this.nodes.length - 1]
    );
  }
  receive({ id, response }) {
    this.nodes[id].response = response;
  }
  update({ id, msg }) {
    send({ type: "content-update", content: { id: id, msg: msg } });
  }
}
let signal;
function makeFrame({ data: { type, content } }) {
  if ("signal" === type) signal = content;
  else if ("content-created" === type) $commonApi.content.receive(content);
  else {
    if ("beat" === type) {
      const $api = {},
        squares =
          (Object.assign($api, $commonApi),
          ($api.graph = painting.api),
          ($api.sound = {
            time: content.time,
            bpm: function (newBPM) {
              return newBPM && (content.bpm[0] = newBPM), content.bpm[0];
            },
          }),
          ($api.sound.microphone = function (options) {
            send({ type: "microphone", content: options });
          }),
          []),
        bubbles = [];
      return (
        ($api.sound.square = function ({
          tone = 440,
          beats = Math.random(),
          attack = 0,
          decay = 0,
          volume = 1,
          pan = 0,
        } = {}) {
          squares.push({
            tone: tone,
            beats: beats,
            attack: attack,
            decay: decay,
            volume: volume,
            pan: pan,
          });
          const seconds = (60 / content.bpm) * beats,
            end = content.time + seconds;
          return {
            progress: function (time) {
              return 1 - Math.max(0, end - time) / seconds;
            },
          };
        }),
        ($api.sound.bubble = function ({
          radius,
          rise,
          volume = 1,
          pan = 0,
        } = {}) {
          bubbles.push({
            radius: radius,
            rise: rise,
            volume: volume,
            pan: pan,
          });
        }),
        beat($api),
        send(
          {
            type: "beat",
            content: { bpm: content.bpm, squares: squares, bubbles: bubbles },
          },
          [content.bpm]
        ),
        (squares.length = 0),
        void (bubbles.length = 0)
      );
    }
    if ("upload" === type && upload)
      return (
        "success" === content.result
          ? upload?.resolve(content.data)
          : "error" === content.result &&
            (console.error("File failed to load:", content.data),
            upload?.reject(content.data)),
        void (upload = void 0)
      );
    if ("video-frame" === type) activeVideo = content;
    else {
      if ("history-load" === type) {
        debug &&
          console.log(
            "Load from history:",
            content,
            currentSearch,
            currentParams
          );
        const params = content.split(":");
        var program = params[0];
        return (
          params.shift(),
          void $commonApi.load(program, void 0, void 0, params, !0)
        );
      }
      if ("loaded-bitmap-success" === type)
        return (
          bitmapPromises[content.url].resolve(content.img),
          void delete bitmapPromises[content]
        );
      if ("loaded-bitmap-rejection" === type)
        return (
          console.error("Bitmap load failure:", content),
          bitmapPromises[content.url].reject(content.url),
          void delete bitmapPromises[content.url]
        );
      if ("needs-paint" === type) noPaint = !1;
      else if ("frame" === type) {
        if (0n < paintCount) {
          const $api = {};
          if (
            (Object.assign($api, $commonApi),
            Object.assign($api, $updateApi),
            Object.assign($api, painting.api),
            ($api.inFocus = content.inFocus),
            ($api.sound = { time: content.audioTime, bpm: content.audioBpm }),
            ($api.screen = { width: content.width, height: content.height }),
            ($api.cursor = (code) => (cursorCode = code)),
            ($api.seconds = function (s) {
              return 120 * s;
            }),
            initialSim)
          )
            (simCount += 1n),
              ($api.simCount = simCount),
              sim($api),
              (initialSim = !1);
          else if (0 < content.updateCount && 0n < paintCount)
            for (let i = content.updateCount; i--; )
              (simCount += 1n), ($api.simCount = simCount), sim($api);
          if (
            (($api.download = (dl) => send({ type: "download", content: dl })),
            ($api.upload = (type) => (
              send({ type: "upload", content: type }),
              new Promise((resolve, reject) => {
                upload = { resolve: resolve, reject: reject };
              })
            )),
            loadFailure &&
              (($api.event = {
                error: loadFailure,
                is: (e) => "load-error" === e,
              }),
              act($api),
              (loadFailure = void 0)),
            signal &&
              ((program = { signal: signal }),
              Object.assign(program, {
                device: "none",
                is: (e) => "signal" === e,
              }),
              ($api.event = program),
              act($api),
              (signal = void 0)),
            content.inFocus !== inFocus)
          ) {
            inFocus = content.inFocus;
            const data = {};
            Object.assign(data, {
              device: "none",
              is: (e) => e === (!0 === inFocus ? "focus" : "defocus"),
            }),
              ($api.event = data),
              act($api);
          }
          content.pen.forEach((data) => {
            Object.assign(data, {
              device: data.device,
              is: (e) => e === data.name,
            }),
              (penX = data.x),
              (penY = data.y),
              ($api.event = data),
              act($api);
          }),
            content.keyboard.forEach((data) => {
              Object.assign(data, {
                device: "keyboard",
                is: (e) => e === data.name,
              }),
                ($api.event = data),
                act($api),
                "keyboard:down" === data.name &&
                  ("Escape" === data.key &&
                    "computer/disks/prompt" !== currentPath &&
                    0 < pieceHistoryIndex &&
                    send({ type: "back-to-piece" }),
                  "~" === data.key && $api.load("prompt"),
                  "x" === data.key &&
                    data.ctrl &&
                    send({ type: "fullscreen-toggle" }));
            });
        }
        if (content.needsRender) {
          const $api = {};
          Object.assign($api, $commonApi),
            Object.assign($api, painting.api),
            ($api.paintCount = Number(paintCount)),
            ($api.inFocus = content.inFocus),
            ($api.glaze = function (content) {
              glazeAfterReframe = { type: "glaze", content: content };
            }),
            (screen &&
              screen.width === content.width &&
              screen.height === content.height) ||
              (screen = {
                pixels: new Uint8ClampedArray(
                  content.width * content.height * 4
                ),
                width: content.width,
                height: content.height,
              }),
            ($api.screen = screen),
            ($api.fps = function (newFps) {
              send({ type: "fps-change", content: newFps });
            }),
            ($api.gap = function (newGap) {
              send({ type: "gap-change", content: newGap });
            }),
            ($api.density = function (newDensity) {
              send({ type: "density-change", content: newDensity });
            }),
            ($api.resize = function (width, height) {
              console.log(
                "🔭 Resize to:",
                width,
                height,
                "from",
                screen.width,
                screen.height
              ),
                (screen.width === width && screen.height === height) ||
                  ((screen.width = width),
                  (screen.height = height),
                  (screen.pixels = new Uint8ClampedArray(
                    screen.width * screen.height * 4
                  )),
                  setBuffer(screen),
                  (reframe = { width: width, height: height }));
            }),
            ($api.cursor = (code) => (cursorCode = code)),
            ($api.pen = { x: penX, y: penY }),
            ($api.video = function (type, options) {
              return (
                send({
                  type: "video",
                  content: { type: type, options: options },
                }),
                function () {
                  return activeVideo;
                }
              );
            }),
            setBuffer(screen),
            ($api.net.preload = function (path) {
              var extension = path.split(".").pop();
              "json" === extension && (path = encodeURIComponent(path));
              try {
                var url = new URL(path);
                "demo:" === url.protocol
                  ? (path = "/demo/" + url.pathname)
                  : url.protocol;
              } catch {
                path = `https://${$api.net.host}/` + path;
              }
              return "json" === extension
                ? new Promise((resolve, reject) => {
                    fetch(path)
                      .then(async (response) => {
                        if (response.ok) return response.json();
                        reject(response.status);
                      })
                      .then((json) => resolve(json))
                      .catch(reject);
                  })
                : "webp" === extension ||
                  "jpg" === extension ||
                  "png" === extension
                ? new Promise((resolve, reject) => {
                    send({ type: "load-bitmap", content: path }),
                      (bitmapPromises[path] = {
                        resolve: resolve,
                        reject: reject,
                      });
                  })
                : void 0;
            }),
            0n === paintCount && ((inFocus = content.inFocus), boot($api)),
            delete $api.net.preload;
          let painted = !1,
            dirtyBox;
          !1 === noPaint &&
            ((type = paint($api)),
            (noPaint = !1 === type || (void 0 !== type && !0 !== type)),
            painting.paint(),
            (painted = !0),
            (paintCount += 1n),
            type && (dirtyBox = type));
          let sendData = {},
            transferredPixels;
          program = dirtyBox?.croppedBox?.(screen);
          0 < program?.w && 0 < program?.h
            ? ((transferredPixels = dirtyBox.crop(screen)),
              (sendData = { pixels: transferredPixels, dirtyBox: program }))
            : !0 === painted &&
              ((transferredPixels = screen.pixels),
              (sendData = { pixels: transferredPixels })),
            !0 === painted && (sendData.paintChanged = !0),
            !0 === loading && (sendData.loading = !0),
            (reframe || glazeAfterReframe) &&
              ((sendData.reframe = reframe || void 0 !== glazeAfterReframe),
              glazeAfterReframe &&
                (send(glazeAfterReframe), (glazeAfterReframe = void 0))),
            cursorCode && (sendData.cursorCode = cursorCode),
            send({ type: "render", content: sendData }, [transferredPixels]),
            (reframe = reframe && void 0),
            (cursorCode = cursorCode && void 0);
        } else
          send({
            type: "update",
            content: { didntRender: !0, loading: loading },
          });
      }
    }
  }
}
var disk = Object.freeze({ __proto__: null, noWorker: noWorker });
