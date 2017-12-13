var container;
var scene;
var camera;
var renderer;
var earthRot;
var moonRot;
var width = window.innerWidth;
var height = window.innerHeight;
var controls;


var meshEarth;
var isMouseDown = false;

init();
animate();

function init() {
  // three.jsの設定 シーン作成
  scene = new THREE.Scene();

  // カメラの設定
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
  camera.position.z = 2350;
  // カメラの上方向ベクトルの設定
  camera.up.set(0, 1, 0); 

  //　カメラを動かすためのオブジェクトコントロール
  // controls = new THREE.OrbitControls(camera);
  // controls.autoRotate=true;
  // controls.userZoom = true;
  // controls.userRotate = true;
  // controls.minDistance = 0;
  // controls.maxDistance = 5000;

  // Trackballコントロール
  // スクロールで拡大できるメソッド(cameraObject,element)
  controls = new THREE.TrackballControls(camera);         

  

  //レンダラ設定
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // ライトの設定
  var light = new THREE.AmbientLight(0xffffff, 1, 0, 0);
  light.position.set(0, 0, 0);
  // ライトを生成
  scene.add(light);


  // 地球
  var geometryEarth = new THREE.SphereGeometry(280, 64, 64);
  var materialEarth = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/earth.jpg')
  });
  // 形と素材を引数として渡す
  meshEarth = new THREE.Mesh(geometryEarth, materialEarth);
  // meshEarth.position.x = 500;
  // meshEarth.position.y = 500;
  // meshEarth.position.z = 500;
  scene.add(meshEarth);
  earthRot=0.0;

  // 月
  var geometryMoon = new THREE.SphereGeometry(60, 60, 68);
  var materialMoon = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/moon.jpg')
  });
  meshMoon = new THREE.Mesh(geometryMoon, materialMoon);
  // 生成したオブジェクトの位置
  // meshMoon.position.x = 400;
  // meshMoon.position.y = 400;
  // meshMoon.position.z = 400;
  scene.add(meshMoon);
  moonRot=0.0;

  // 太陽
  var geometrySun = new THREE.SphereGeometry(400, 256, 256);
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

  // 地球の位置
  earthRot += 0.001;
  meshEarth.position.x = Math.sin(earthRot) * 1800;
  meshEarth.position.z = Math.cos(earthRot) * 1800;
  meshEarth.rotation.x = -Math.PI * (1 / 8);
  meshEarth.rotation.y += 0.008;

  // 月の位置
  moonRot += 0.01;
  meshMoon.position.x = Math.sin(moonRot) * 500 + meshEarth.position.x;
  meshMoon.position.z = Math.cos(moonRot) * 500 + meshEarth.position.z;
  meshMoon.rotation.y += 0.001;

  // カメラのコントローラーのアップデート
  controls.update();
  renderer.clear();   
  renderer.render(scene, camera);

}

