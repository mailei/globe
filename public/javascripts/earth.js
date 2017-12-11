var container;
var scene;
var camera;
var renderer;
var earthRot;


var meshEarth;
var isMouseDown = false;

init();
animate();

function init() {

  // container = document.createElement('div');
  // document.body.appendChild(container);

  // three.jsの設定 シーン作成
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 2000;

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
  var geometryEarth = new THREE.SphereGeometry(140, 32, 32);
  var materialEarth = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/earth.jpg')
  });
  // 形と素材を引数として渡す
  meshEarth = new THREE.Mesh(geometryEarth, materialEarth);
  meshEarth.position.x = 500;
  meshEarth.position.y = 500;
  meshEarth.position.z = 500;
  scene.add(meshEarth);


  // 月
  var geometryMoon = new THREE.SphereGeometry(30, 30, 34);
  var materialMoon = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/moon.jpg')
  });
  meshMoon = new THREE.Mesh(geometryMoon, materialMoon);
  // 生成したオブジェクトの位置
  meshMoon.position.x = 400;
  meshMoon.position.y = 400;
  meshMoon.position.z = 400;
  scene.add(meshMoon);

  // 太陽
  var geometrySun = new THREE.SphereGeometry(100, 64, 64);
  var materialSun = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/sun.jpg')
  });
  meshSun = new THREE.Mesh(geometrySun, materialSun);
  // 生成したオブジェクトの位置
  // meshSun.position.x = 500;
  // meshSun.position.y = 500;
  // meshSun.position.z = 500;
  scene.add(meshSun);


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
    // meshEarth.scale.set(value, value, value);
    meshEarth.scale.set(value, value, value);
  });

  //　カメラを動かすためのオブジェクトコントロール
  controls = new THREE.OrbitControls(camera);

}

// // 描画処理
// function render() {
//   requestAnimationFrame(render);
//   // カメラをアップデート
//   controls.update();
//   renderer.render(scene, camera);
// }

// animations
function animate() {
  // フレーム内処理
  requestAnimationFrame(animate);

  // // 地球の位置
  // earthRot += 0.001;
  // meshEarth.position.x = Math.sin(earthRot) * 3800;
  // meshEarth.position.z = Math.cos(earthRot) * 3800;
  // meshEarth.rotation.x = -Math.PI * (1 / 8);
  // meshEarth.rotation.y += 0.008;

  // 月の位置
  // moonRot += 0.01;
  // meshMoon.position.x = Math.sin(moonRot) * 500 + meshEarth.position.x;
  // meshMoon.position.z = Math.cos(moonRot) * 500 + meshEarth.position.z;
  // meshMoon.rotation.y += 0.001;

  // カメラの位置
  // camera.position.x = -1000;
  // camera.position.z = -5000;
  // camera.position.y = 0;
  // camera.lookAt({ x: meshEarth.position.x, y: meshEarth.position.y, z: meshEarth.position.z });
  controls.update();
  renderer.render(scene, camera);

}

