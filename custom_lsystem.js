var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

canvas.style.width = '600px';
canvas.style.height = '600px';

const scale = 10;
canvas.width = canvas.clientWidth * scale;
canvas.height = canvas.clientHeight * scale;

ctx.translate(canvas.width / 5.5, canvas.height * 0.8);
ctx.scale(scale, scale);
ctx.rotate(Math.PI);

var tree = new LSystem({
  axiom: '+X',
  productions: {
    'X': 'F-[[X]+X]+F[+FX]-X',
    'F': 'FF'
  },
  finals: {
    'F': () => {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, 12 / (tree.iterations + 1))
      ctx.stroke()
      ctx.translate(0, 12 / (tree.iterations + 1))
    },
    '+': () => { ctx.rotate((Math.PI / 180) * 22) },
    '-': () => { ctx.rotate((Math.PI / 180) * -22) },
    '[': () => { ctx.save() },
    ']': () => { ctx.restore() }
  }
})

tree.iterate(7);
tree.final();