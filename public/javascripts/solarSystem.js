// world
var scene;
var camera;
var renderer;
var controls;
var width = window.innerWidth;
var height = window.innerHeight;

//惑星
var meshEarth;
var meshMoon;
var meshVenus;
var meshMercury;
var meshMars;
var meshJupiter;
var meshSaturn;
var meshSaturnRing;

// 公転
var earthRot;
var moonRot;
var venusRot;
var mercuryRot;
var marsRot;
var jupiterRot;
var saturnRot;

// main
init();
animateRender();

// 初期処理
function init() {
  // three.jsの設定 シーン作成
  scene = new THREE.Scene();

  // カメラの設定
  // PerspectiveCamera(画角、アスペクト比、手前、奥行き) 
  width = window.innerWidth;
  height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
  camera.position.z = 2000;
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
  // スクロールで拡大&グリグリできるTrackballControls(cameraObject,element)
  controls = new THREE.TrackballControls(camera);

  //レンダラ設定
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // 中心の光源
  var DirectionaLight = new THREE.DirectionalLight(0xffffff, 1);
  DirectionaLight.position.set(0, 0, 0);
  scene.add(DirectionaLight);

  // // ライトの設定
  // var AmbientLight = new THREE.AmbientLight(0xffffff, 1);
  // // ライトを生成
  // scene.add(AmbientLight);

  // threeJSのヘルパークラス呼び出すよ
  // helperClass();
  // 惑星を作るよ
  CreatePranet();
  // 星つくるよ
  createStars();
  // datGUIつくるよ
  datGUI();
}


// // 固定表示描画処理
// function render() {
//   requestAnimationFrame(render);
//   // カメラをアップデート
//   controls.update();
//   renderer.render(scene, camera);
// }

// animation描画処理だよ
function animateRender() {
  // フレーム内処理
  requestAnimationFrame(animateRender);

  // 地球の位置と公転の計算だよ
  earthRot += 0.0015;
  meshEarth.position.x = Math.sin(earthRot) * 900;
  meshEarth.position.z = Math.cos(earthRot) * 900;
  // 自転計算だよ
  meshEarth.rotation.x = -Math.PI * (1 / 8);
  meshEarth.rotation.y += 0.008;

  // 月の位置と公転の計算だよ
  moonRot += 0.01;
  meshMoon.position.x = Math.sin(moonRot) * 120 + meshEarth.position.x;
  meshMoon.position.z = Math.cos(moonRot) * 120 + meshEarth.position.z;
  // 月の裏側は見えないよ
  meshMoon.rotation.y += 0.001;

  // 水星の位置と公転の計算だよ
  mercuryRot += 0.003;
  meshMercury.position.x = Math.sin(mercuryRot) * 380;
  meshMercury.position.z = Math.cos(mercuryRot) * 380;
  meshMercury.position.y = Math.sin(mercuryRot) * 60;
  meshMercury.rotation.x = -Math.PI * (1 / 8);
  meshMercury.rotation.y += 0.005;

  // 金星の位置と公転の計算だよ
  venusRot += 0.002;
  meshVenus.position.x = Math.sin(venusRot) * 650;
  meshVenus.position.z = Math.cos(venusRot) * 650;
  meshVenus.position.y = Math.sin(venusRot) * -30;
  meshVenus.rotation.x = -Math.PI * (1 / 8);
  meshVenus.rotation.y += 0.005;

  // 火星の位置と公転の計算だよ
  marsRot += 0.00075;
  meshMars.position.x = Math.sin(marsRot) * 1200;
  meshMars.position.z = Math.cos(marsRot) * 1200;
  meshMars.position.y = Math.sin(marsRot) * 30;
  meshMars.rotation.x = -Math.PI * (1 / 8);
  meshMars.rotation.y += 0.005;

  // 木星の位置と公転の計算だよ
  jupiterRot += 0.0005;
  meshJupiter.position.x = Math.sin(jupiterRot) * 1500;
  meshJupiter.position.z = Math.cos(jupiterRot) * 1500;
  meshJupiter.position.y = Math.sin(jupiterRot) * -60;
  meshJupiter.rotation.x = -Math.PI * (1 / 8);
  meshJupiter.rotation.y += 0.005;

  // 土星の位置と公転の計算だよ
  saturnRot += 0.0003;
  meshSaturn.position.x = Math.sin(saturnRot) * 1900;
  meshSaturn.position.z = Math.cos(saturnRot) * 1900;
  meshSaturn.position.y = Math.cos(saturnRot) * 80;
  meshSaturn.rotation.x = -Math.PI * (1 / 8);
  meshSaturn.rotation.y += 0.008;
  // ドーナッツの位置
  meshSaturnRing.position.x = meshSaturn.position.x;
  meshSaturnRing.position.z = meshSaturn.position.z;
  meshSaturnRing.position.y = meshSaturn.position.y;
  meshSaturnRing.rotation.x = 0.8;

  // カメラのコントローラーのアップデート
  controls.update();
  renderer.clear();
  renderer.render(scene, camera);

}

function CreatePranet() {
  // 地球
  //SphereGeometry(半径, 経度分割数, 緯度分割数, 開始経度, 経線中心角, 開始緯度, 緯線中心角)
  var geometryEarth = new THREE.SphereGeometry(60, 16, 16);
  var materialEarth = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/earth.jpg')
  });
  // 形と素材を引数として渡す(形,マテリアル)
  meshEarth = new THREE.Mesh(geometryEarth, materialEarth);
  // meshEarth.position.x = 500;
  // meshEarth.position.y = 500;
  // meshEarth.position.z = 500;
  scene.add(meshEarth);
  earthRot = 0.0;

  // 月
  var geometryMoon = new THREE.SphereGeometry(13, 15, 17);
  var materialMoon = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/moon.jpg')
  });
  meshMoon = new THREE.Mesh(geometryMoon, materialMoon);
  // 生成したオブジェクトの位置
  // meshMoon.position.x = 400;
  // meshMoon.position.y = 400;
  // meshMoon.position.z = 400;
  scene.add(meshMoon);
  moonRot = 0.0;

  // 水星
  var gometryMercury = new THREE.SphereGeometry(35, 32, 32);
  var materialMercury = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/mercury.jpg')
  });
  meshMercury = new THREE.Mesh(gometryMercury, materialMercury);
  scene.add(meshMercury);
  mercuryRot = 0.0;

  //金星
  var geometryVenus = new THREE.SphereGeometry(50, 16, 16);
  var materialVenus = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/venus.jpg')
  });
  meshVenus = new THREE.Mesh(geometryVenus, materialVenus);
  scene.add(meshVenus);
  venusRot = 0.0;

  // 火星
  var gometryMars = new THREE.SphereGeometry(40, 16, 16);
  var materialMars = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/mars.jpg')
  });
  meshMars = new THREE.Mesh(gometryMars, materialMars);
  scene.add(meshMars);
  marsRot = 0.0;

  // 木星
  var gometryJupiter = new THREE.SphereGeometry(130, 32, 32);
  var materialJupiter = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/jupiter.jpg')
  });
  meshJupiter = new THREE.Mesh(gometryJupiter, materialJupiter);
  scene.add(meshJupiter);
  jupiterRot = 0.0;

  // 土星
  var gometrySaturn = new THREE.SphereGeometry(90, 32, 32);
  var materialSaturn = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/saturn.jpg')
  });
  meshSaturn = new THREE.Mesh(gometrySaturn, materialSaturn);
  scene.add(meshSaturn);
  saturnRot = 0.0;
  // 土星のドーナッツ作る！
  createSaturnRing();

  // 太陽
  var geometrySun = new THREE.SphereGeometry(250, 128, 128);
  var materialSun = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/sun.jpg')
  });
  meshSun = new THREE.Mesh(geometrySun, materialSun);
  // 生成したオブジェクトの位置
  // meshSun.position.x = 500;
  // meshSun.position.y = 500;
  // meshSun.position.z = 500;
  scene.add(meshSun);
}


// dat.guiつくるよ
function datGUI() {
  //window設定
  var text = {
    "message": "setting",
    "size": 1,
    "display": true,
    "gridHeaperDisplay": true,
    "操作": function () {
      alert("ドラッグ:グリグリ  右クリック:カメラ平行移動  ホイール:拡大縮小");
    }
  };

  // dat.gui
  var gui = new dat.GUI();
  gui.add(text, "message");
  var saizu = gui.add(text, "size", 1, 5);
  var earthDisplay = gui.add(text, "display");
  var sumDisplay = gui.add(text, "gridHeaperDisplay");
  gui.add(text, "操作");

  // 地球の表示
  earthDisplay.onChange(function (value) {
    if (value) meshEarth.visible = true;
    if (!value) meshEarth.visible = false;
  });
  sumDisplay.onChange(function (value) {
    if (value) meshSun.visible = true;
    if (!value) meshSun.visible = false;
  });

  // 地球の大きさチェンジ
  saizu.onChange(function (value) {
    // meshEarth.scale.set(value, value, value);
    meshEarth.scale.set(value, value, value);
  });
}

function createStars() {
  geometryStar = new THREE.Geometry();
  for (var i = 0; i < 10000; i++) {
    // ランダムに位置と範囲決めるよ
    var vesctorStar = new THREE.Vector3(Math.random() * 4000 - 1000,
      Math.random() * 4000 - 1000,
      Math.random() * 4000 - 1000);
    geometryStar.vertices.push(vesctorStar);
  }
  for (var j = 0; j < 4; j++) {
    var materialStar = new THREE.ParticleBasicMaterial({
      color: "#acacff",
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    // 四角形しか作れないみたい;;
    var particleStars = new THREE.PointCloud(geometryStar, materialStar);
    particleStars.rotation.set(
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10);
    scene.add(particleStars);
  }
}

// windowのリサイズイベント
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  fixWidth = window.innerWidth / 2;
  fixHight = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createSaturnRing() {
  // ドーナッツ形にするよ(芯円半径、断面円半径、断面円分割、芯円分割)
  var gometrySaturnRing = new THREE.TorusGeometry(150, 35, 2, 800);
  // テクスチャを半透明にするよ
  var materialSaturnRing = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/saturnRing.jpg'),
    opacity: 0.7,
    transparent: true
  });
  meshSaturnRing = new THREE.Mesh(gometrySaturnRing, materialSaturnRing);
  scene.add(meshSaturnRing);
  saturnRingRot = 0.0;
}

// function helperClass() {
//   // グリッド表示
//   var gridHelper = new THREE.GridHelper(1500, 100);
//   scene.add(gridHelper);
//   // xyz軸表示
//   var axisHelper = new THREE.AxisHelper(1000);
//   scene.add(axisHelper);
//   // ライトヘルパー(太陽と同位置にあるため意味ないよん)
//   // var DirectionaLightHelper = new THREE.DirectionalLightHelper(DirectionaLight, 20); 
//   // scene.add(DirectionaLightHelper);
// }