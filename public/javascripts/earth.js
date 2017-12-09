var container;
var scene;
var camera;
var renderer;
var earthRot;


var meshEarth;
var isMouseDown = false;

init();
render();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  // three.jsの設定 シーン作成
  scene = new THREE.Scene();

  //カメラ作成
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1000;

  //レンダラ設定
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //　背景設定
  renderer.setClearColor(0x000000, 1)


  // ライトの設定
  var light = new THREE.PointLight(0xffffff, 1, 0, 0);
  light.position.set(0, 0, 0);
  // ライトを生成
  scene.add(light);


  // 地球
  var geometryEarth = new THREE.SphereGeometry(280, 64, 64);
  var materialEarth = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture('../images/earth.jpg') });
  // 形と素材を引数として渡す
  meshEarth = new THREE.Mesh(geometryEarth, materialEarth);

  earthRot += 0.001;
  meshEarth.position.x = Math.sin(earthRot) * 3800;
  meshEarth.position.z = Math.cos(earthRot) * 3800;
  meshEarth.rotation.x = -Math.PI * (1 / 8);
  meshEarth.rotation.y += 0.008;
  scene.add(meshEarth);

  //window設定
  var text = {
    "message": "setting",
    "size": 2,
    "display": true,
    "explode": function () {
      alert("explode!");
    }
  };

  // dat.gui
  var gui = new dat.GUI();
  gui.add(text, "message");
  var saizu = gui.add(text, "size", 1, 5);
  var hyouji = gui.add(text, "display");
  gui.add(text, "explode");

  hyouji.onChange(function (value) {
    if (value) meshEarth.visible = true;

    if (!value) meshEarth.visible = false;
  });
  saizu.onChange(function (value) {
    meshEarth.scale.set(value, value, value);
  });

  // マウス、タッチ処理を呼び出すイベントリスナーをセット
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("touchstart", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("touchend", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onMouseMove);

}

// 描画処理
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// マウスを押したとき
function onMouseDown(event) {
  isMouseDown = true;
}

// マウスを動かした時
function onMouseMove(event) {
  if (isMouseDown) {
    // 3DモデルをX軸とY軸方向に回転させます
    if (meshEarth) {
      meshEarth.rotation.y = getMouseX(event) / 50;
      meshEarth.rotation.x = getMouseY(event) / 50;
    }
  }
}

// マウスを離したとき
function onMouseUp(event) {
  isMouseDown = false;
}

function getMouseX(event) {
  if (event.type.indexOf("touch") == -1)
    return event.clientX;
  else
    return event.touches[0].clientX;
}

function getMouseY(event) {
  if (event.type.indexOf("touch") == -1)
    return event.clientY;
  else
    return event.touches[0].clientY;
}