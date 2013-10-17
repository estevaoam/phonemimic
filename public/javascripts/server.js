$(function(){
  var host = location.origin.replace(/^http/, 'ws');
  var socket = io.connect(host + '/' + sid);
  var firstTime = true;
  var camera, scene, renderer;
  var geometry, material, mesh;
  var mouseX = 0, mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;


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
      animate();
    }

    mesh.rotation.x = x*Math.PI / 180;
    mesh.rotation.y = z*Math.PI / 180;
    mesh.rotation.z = -1 * (y*Math.PI / 180);
  });

  function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 500;

    scene = new THREE.Scene();


    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );

    var loader = new THREE.OBJMTLLoader();
    loader.load('/iPhone5.obj', '/iPhone5.mtl', function(object){
      mesh = object;
      mesh.position.y = -80;
      scene.add(mesh);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $('body').html( renderer.domElement );
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    console.log(mouseX, mouseY);
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
  }


  function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
  }

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  init();
  animate();
});

