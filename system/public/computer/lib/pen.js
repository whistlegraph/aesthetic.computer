// ✍️ Pen

// TODO: Clean up this whole class and its connections to the system.

export class Pen {
  x;
  y;
  delta;
  pressure;
  pointerType;

  down = false;
  changed = false;

  event = "";
  events = [];

  cursorCode;
  penCursor = false;

  lastPenX;
  lastPenY;

  lastPenCursor;

  dragBox;

  #dragging = false;
  #lastPenDown;
  #penDragStartPos;

  constructor(point) {
    // Prevent touch events from scrolling the page.
    function absorbEvent(e) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
    }

    // TODO: Test for Apple Pencil touch down event?

    // Add pointer events.
    const pen = this;

    // Touch
    window.addEventListener("pointerdown", (e) => {
      if (!e.isPrimary) return;
      pen.pointerType = e.pointerType;

      Object.assign(pen, point(e.x, e.y));
      pen.pressure = e.pressure;

      pen.down = true;
      pen.#dragging = true;
      pen.#penDragStartPos = { x: pen.x, y: pen.y };
      pen.#event("touch");

      pen.changed = true;
      pen.penCursor = true;
      if (e.pointerType !== "mouse") pen.penCursor = false;
    });

    // Hover and Draw
    window.addEventListener("pointermove", (e) => {
      if (!e.isPrimary) return;
      pen.pointerType = e.pointerType;

      Object.assign(pen, point(e.x, e.y));
      pen.pressure = e.pressure;

      if (pen.#dragging) {
        // draw
        const penDragAmount = {
          x: pen.x - pen.#penDragStartPos.x,
          y: pen.y - pen.#penDragStartPos.y,
        };

        pen.dragBox = {
          x: pen.#penDragStartPos.x,
          y: pen.#penDragStartPos.y,
          w: penDragAmount.x,
          h: penDragAmount.y,
        };

        // TODO: Only set to draw if
        pen.#event("draw");
      } else {
        // move
        pen.#event("move");
      }

      pen.changed = true;
      pen.penCursor = true;
      if (e.pointerType !== "mouse") pen.penCursor = false;
    });

    // Lift
    window.addEventListener("pointerup", (e) => {
      if (!e.isPrimary) return;
      pen.pointerType = e.pointerType;

      pen.down = false;
      if (pen.#dragging) pen.#event("lift");

      pen.#dragging = false;

      pen.changed = true;
      pen.penCursor = true;
      if (e.pointerType !== "mouse") pen.penCursor = false;
    });

    return pen;
  }

  // TODO: Merge this logic into the above events & consolidate class properties.
  // Check the hardware for any changes.
  #event(name) {
    this.event = name;

    const delta = {
      x: this.x - this.lastPenX,
      y: this.y - this.lastPenY,
    };

    this.delta = delta;

    // If pressure doesn't exist then force it to be 1.
    this.pressure = this.pressure || 1;
    // Unless the device type is a pen, then make it 0. This assumes all pens
    // have pressure sensitivity.
    if (this.pointerType === "pen" && this.pressure === 1) {
      this.pressure = 0;
    }

    this.events.push({
      name: this.event,
      x: this.x,
      y: this.y,
      delta,
      pressure: this.pressure,
      drag: this.dragBox,
    });

    this.lastPenCursor = this.penCursor;
    this.#lastPenDown = this.down;
    this.lastPenX = this.x;
    this.lastPenY = this.y;
  }

  render({ plot, color }) {
    const { x, y } = this;
    if (!this.cursorCode || this.cursorCode === "precise") {
      color(255, 255, 255);
      // Center
      plot(x, y);
      // Crosshair
      color(0, 255, 255);

      // Over
      plot(x, y - 2);
      plot(x, y - 3);
      // Under
      plot(x, y + 2);
      plot(x, y + 3);
      // Left
      plot(x - 2, y);
      plot(x - 3, y);
      // Right
      plot(x + 2, y);
      plot(x + 3, y);
    } else if (this.cursorCode === "tiny") {
      color(255, 255, 0, 200);
      plot(x - 1, y);
      plot(x + 1, y);
      // plot(pen.x, pen.y);
      plot(x, y - 1);
      plot(x, y + 1);
    } else if (this.cursorCode === "dot") {
      // ...
      color(255, 0, 0, 128);
      plot(x, y);
    } else if (this.cursorCode === "none") {
      // ...
    }
    this.changed = false;
  }

  setCursorCode(code) {
    this.cursorCode = code;
  }
}
