var settings = {
  firstColumn: 18,
  secondColumn: 26,
  thirdColumn: 46,
  picHeight: 100,
  picWidth: 100,
  firstPic: 'img/r1.gif',
  secondPic: 'img/r1.gif',
  thirdPic: 'img/r12.gif'
};

window.addEventListener('load', mainFunction);

function mainFunction(){
  var counterImg =0;
  var canvas1 = new fabric.Canvas('main1');
  var canvas2 = new fabric.Canvas('main2');
  var canvas3 = new fabric.Canvas('main3');
  var group1;
  var group2;
  var group3;

  function returnRandomFileName(min, max) {
    var rand;
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return 'img/r' + rand + '.gif';
  }

  function settingImg(images, number, name, cb) {
    var imgGroup = new fabric.Group();
    var place;
    var i;
    for (i = 0; i < number + 2; i++) {
      place = settings.picHeight * (1.5 - i);
      images[i].set({ left: 0, top: place });
    }
      fabric.Image.fromURL(name, function(img) {
        images[number + 1] = img;
        images[number + 1].set({ left: 0, top: settings.picHeight * (1.5 - number + 1) });
        images.forEach(function(img) {
          imgGroup.add(img);
        });
        cb(imgGroup);
      })
  }
  function checkArray(arr) {
    var v;
    return arr.reduce(function(sum, cur){
      if (cur) v = 1;
      else v =0;
      return sum + v
    })
  }
  function imgToArr(x, images, number, placeInGroup, cb, img) {
    images[x] = img;
    var chArr = images.filter(function (x) { return x; }).length;
    if (chArr=== number + 2) {
      counterImg = 0;
      settingImg(images, number, placeInGroup, cb);
    }
    }

  function generateGroupByCount(canvasNumber, cb) {
    var images = [];
    var i;
    var name;
    var number;
    var placeInGroup;
    switch (canvasNumber) {
      case 1: number = settings.firstColumn;
        placeInGroup = settings.firstPic;
        break;
      case 2: number = settings.secondColumn;
        placeInGroup = settings.secondPic;
        break;
      case 3: number = settings.thirdColumn;
        placeInGroup = settings.thirdPic;
        break;
    }
    for (var j = 0; j < number + 2; j++) {
      name = returnRandomFileName(0,12);
      fabric.Image.fromURL(name, imgToArr.bind(null, j, images, number, placeInGroup, cb));
    }
  }

  generateGroupByCount(1, function(group) {
    console.log('IT WORKS1' + group);
    canvas1.add(group);
    group1 = group;
  });
  generateGroupByCount(2, function(group) {
    console.log('IT WORKS2' + group);
    canvas2.add(group);
    group2 = group;
  });
  generateGroupByCount(3, function(group) {
    console.log('IT WORKS3' + group);
    canvas3.add(group);
    group3 = group;
  });
  document.getElementById('btn').addEventListener('click', animateRect);

  function animateRect(){
    group1.animate('top', '+=' + (settings.firstColumn - 2) * settings.picHeight, {
      duration: 5000,
      onChange: canvas1.renderAll.bind(canvas1)
          });
    group2.animate('top', '+=' + (settings.secondColumn - 2) * settings.picHeight, {
      duration: 5000,
      onChange: canvas2.renderAll.bind(canvas2)
    });
    group3.animate('top', '+=' + (settings.thirdColumn - 2) * settings.picHeight, {
      duration: 5000,
      onChange: canvas3.renderAll.bind(canvas3)
    });
  }
}