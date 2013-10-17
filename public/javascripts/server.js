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
    var x = data.beta,
        y = data.gamma,
        z = data.alpha;

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

    geometry = new THREE.CubeGeometry( 58.6 * 5, 7.6 * 5, 123.8 * 5 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $('body').html( renderer.domElement );
  }

  function animate(x, y, z) {

    mesh.rotation.x = x*Math.PI / 180;
    mesh.rotation.y = z*Math.PI / 180;
    mesh.rotation.z = -1 * (y*Math.PI / 180);

    renderer.render( scene, camera );
  }

});
