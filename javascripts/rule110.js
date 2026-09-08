// Rule 110 cellular automaton, drawn as background texture.
//
// Seeded from a pseudo-random first row rather than a single cell: rule 110
// settles into a periodic "ether" that irregular structures tear diagonal
// cracks through, and that is the part worth looking at. The seed is fixed
// so the pattern is the same on every load and every device.
(function () {
  var canvas = document.getElementById('rule110');
  if (!canvas || !canvas.getContext) return;

  var CELL = 2;
  var SEED = 110110;
  var BURN_IN = 24; // generations to settle before the visible window starts

  function draw() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (!w || !h) return;

    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = getComputedStyle(canvas).color;

    var cols = Math.ceil(w / CELL);
    var rows = Math.ceil(h / CELL);

    // Park-Miller, kept small enough to stay exact in floating point
    var seed = SEED;
    function rnd() {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    }

    var row = new Uint8Array(cols);
    for (var i = 0; i < cols; i++) row[i] = rnd() < 0.5 ? 1 : 0;

    for (var y = -BURN_IN; y < rows; y++) {
      if (y >= 0) {
        for (var x = 0; x < cols; x++) {
          if (row[x]) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
        }
      }

      var next = new Uint8Array(cols);
      for (var j = 0; j < cols; j++) {
        var l = row[(j - 1 + cols) % cols];
        var c = row[j];
        var r = row[(j + 1) % cols];
        // rule 110: only 111, 100 and 000 die
        next[j] = (l && c && r) || (l && !c && !r) || (!l && !c && !r) ? 0 : 1;
      }
      row = next;
    }
  }

  draw();

  var pending;
  function redraw() {
    clearTimeout(pending);
    pending = setTimeout(draw, 200);
  }

  // the column is as tall as the page, so anything that reflows the content
  // (webfont swap, images loading) changes how many generations we need
  if (window.ResizeObserver) {
    new ResizeObserver(redraw).observe(canvas.parentNode);
  } else {
    window.addEventListener('resize', redraw);
    window.addEventListener('load', redraw);
  }
})();
