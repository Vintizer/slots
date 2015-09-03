/*global fabric*/

var settings = {
  firstColumn: 12,
  secondColumn: 16,
  thirdColumn: 10,
  picHeight: 100,
  picWidth: 100,
  firstPic: 'img/r1.gif',
  secondPic: 'img/r1.gif',
  thirdPic: 'img/r12.gif',
  duration: 5000
};

function mainFunction() {
  'use strict';
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
    fabric.Image.fromURL(name, function imgCb(img) {
        images[number + 1] = img;
        images[number + 1].set({ left: 0, top: settings.picHeight * (1.5 - number + 1) });
        images.forEach(function imgEach(pic) {
          imgGroup.add(pic);
        });
        cb(imgGroup);
      });
  }

  function imgToArr(x, images, number, placeInGroup, cb, img) {
    var chArr;
    images[x] = img;
    chArr = images.filter(function filter(n) { return n; }).length;
    if (chArr === number + 2) {
      settingImg(images, number, placeInGroup, cb);
    }
  }

  function generateGroupByCount(canvasNumber, cb) {
    var images = [];
    var j;
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
      default:
        break;
    }
    for (j = 0; j < number + 2; j++) {
      name = returnRandomFileName(0, 12);
      fabric.Image.fromURL(name, imgToArr.bind(null, j, images, number, placeInGroup, cb));
    }
  }
  function start() {
    generateGroupByCount(1, function cb(group) {
      canvas1.add(group);
      group1 = group;
    });
    generateGroupByCount(2, function cb(group) {
      canvas2.add(group);
      group2 = group;
    });
    generateGroupByCount(3, function cb(group) {
      canvas3.add(group);
      group3 = group;
    });
  }

  function animateRect() {
    group1.animate('top', '+=' + (settings.firstColumn - 2) * settings.picHeight, {
      duration: settings.duration,
      onChange: canvas1.renderAll.bind(canvas1)
    });
    group2.animate('top', '+=' + (settings.secondColumn - 2) * settings.picHeight, {
      duration: settings.duration,
      onChange: canvas2.renderAll.bind(canvas2)
    });
    group3.animate('top', '+=' + (settings.thirdColumn - 2) * settings.picHeight, {
      duration: settings.duration,
      onChange: canvas3.renderAll.bind(canvas3)
    });
  }
  start();

  document.getElementById('btn').addEventListener('click', animateRect);
}

window.addEventListener('load', mainFunction);
