var scene, camera, renderer;
var moonRot;
var earthRot;
var CameraRot;


// -----------------------------------------------
// 実行部
init();
// animate();
// -----------------------------------------------

// initialize
function init() {
    // three.jsの設定 シーン作成
    scene = new THREE.Scene();

    //カメラ作成
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 20, 100);
    //　OrbitControlsの設定
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;

    //レンダラ設定
    render = new THREE.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);
    //　背景設定
    render.setClearColor(0x000000, 1)


    // ライトの設定
    var light = new THREE.PointLight(0xffffff, 1, 0, 0);
    light.position.set(0, 0, 0);
    // ライトを生成
    scene.add(light);

    // // 太陽
    // geometrySun = new THREE.SphereGeometry(500, 64, 64);
    // materialSun = new THREE.MeshBasicMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture('../images/sun.jpg') });
    // meshSun = new THREE.Mesh(geometrySun, materialSun);
    // scene.add(meshSun);


    // 地球
    geometryEarth = new THREE.SphereGeometry(280, 64, 64);
    materialEarth = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture('../images/earth.jpg') });
    // 形と素材を引数として渡す
    meshEarth = new THREE.Mesh(geometryEarth, materialEarth);
    scene.add(meshEarth);
    earthRot = 0.0;

    // 月
    // geometryMoon = new THREE.SphereGeometry(60, 64, 64);
    // materialMoon = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture('../images/moon.jpg') });
    // meshMoon = new THREE.Mesh(geometryMoon, materialMoon);
    // scene.add(meshMoon);
    // moonRot = 0.0;

    // 星
    // geometryStar = new THREE.SphereGeometry(20, 1, 1);
    // for (i = 0; i < 0x1000; i++) {
    //     cl = (Math.random() * 0x1000000) & 0xff00ff;
    //     cl = ((Math.random() * 0x20) * 0x000100) | cl;
    //     materialStar = new THREE.MeshBasicMaterial({ color: cl });
    //     meshStar = new THREE.Mesh(geometryStar, materialStar);
    //     x = Math.random();
    //     z = Math.random();
    //     y = Math.random();
    //     if (Math.random() > 0.5) { x *= -1; }
    //     if (Math.random() > 0.5) { z *= -1; }
    //     if (Math.random() > 0.5) { y *= -1; }
    //     // ベクトルの正規化
    //     l = Math.sqrt(x * x + y * y + z * z);
    //     if (l != 0.0) {
    //         x = x / l;
    //         y = y / l;
    //         z = z / l;
    //     }
    //     // ベクトルのスカラー倍
    //     l = Math.random() * 50000 + 20000;
    //     x = x * l;
    //     y = y * l;
    //     z = z * l;
    //     meshStar.position.x = x;
    //     meshStar.position.y = y;
    //     meshStar.position.z = z;
    //     scene.add(meshStar);
    // }
    // レンダラー
    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0x101010, 1.0);
    // document.body.appendChild(renderer.domElement);

    animate();

}

// animations
function animate() {
    // フレーム内処理
    requestAnimationFrame(animate);

    // 地球の位置
    earthRot += 0.001;
    meshEarth.position.x = Math.sin(earthRot) * 3800;
    meshEarth.position.z = Math.cos(earthRot) * 3800;
    meshEarth.rotation.x = -Math.PI * (1 / 8);
    meshEarth.rotation.y += 0.008;

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

    render.render(scene, camera);
    controls.update();

}
