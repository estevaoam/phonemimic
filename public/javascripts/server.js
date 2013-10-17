$(function(){
  var host = location.origin.replace(/^http/, 'ws');
  var socket = io.connect(host + '/' + sid);
  var firstTime = true;

  var xEl = $('#x'),
      yEl = $('#y'),
      zEl = $('#z');

  socket.on('connect', function(data) {
    socket.emit('registerKind', 'server');
  });

  socket.on('showMovements', function(data){
    var x = data.beta.toFixed(2),
        y = data.gamma.toFixed(2),
        z = data.alpha.toFixed(2);

    if (firstTime == true) {
      firstTime = false;
      init();
    }

    animate(x, y, z);
  });


  var camera, scene, renderer;
  var geometry, material, mesh;

  function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $('body').html( renderer.domElement );
  }

  function animate(x, y, z) {

    mesh.rotation.x = x;
    mesh.rotation.y = y;
    mesh.rotation.z = z;

    renderer.render( scene, camera );
  }
});
