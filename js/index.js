window.addEventListener('load', mainFunction);
function mainFunction(){
  //function
  var funRect = [];
  function rectAnimate(rect, count) {
    var len = rect.length;
    for (var i = 0; i < len; i++) {
      rect[i].animate('top', '+=14', {
        onChange: canvas.renderAll.bind(canvas)
      })
    }
  }

  function sequence(fns, cb) {
    var fnLength = fns.length+1;
    done(0);
    function done(j){
      if (!--fnLength) cb();
      else {
        fns[j](function cb() {
          done(j+1)
        });
      }
    }
  }
  document.getElementById('btn').addEventListener('click', animateRect);
  var canvas = new fabric.Canvas('main');
  canvas.setWidth('350');
  canvas.setHeight('350');
  var rect = [];
  rect[0] = new fabric.Rect({
    left: 100,
    top: -25,
    fill: 'red',
    width: 20,
    height: 20
  });
  rect[1] = new fabric.Rect({
    left: 100,
    top: 0,
    fill: 'red',
    width: 20,
    height: 20
  });
  canvas.add(rect[0]);
  canvas.add(rect[1]);
  function animateRect(){
    rectAnimate(rect, 4);
  }
}