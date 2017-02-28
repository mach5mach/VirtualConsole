function game1() {
    var scene = new THREE.Scene();
    var canvas = document.getElementById("game-preview");
    var camera = new THREE.PerspectiveCamera( 75, 640/480, 0.1, 1000 );


    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( 640, 480 );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        //controller test
        if(platform.controllers[0])
        {
            //L joystick
            if(platform.controllers[0].axes[0] > 0.1 || platform.controllers[0].axes[0] < -0.1)
            {
                cube.applyMatrix( new THREE.Matrix4().makeTranslation(platform.controllers[0].axes[0], 0, 0) );
            }
            if(platform.controllers[0].axes[1] > 0.1 || platform.controllers[0].axes[1] < -0.1)
            {
                cube.applyMatrix( new THREE.Matrix4().makeTranslation(0, -platform.controllers[0].axes[1], 0) );
            }
            //R joystick
            if(platform.controllers[0].axes[2] > 0.1 || platform.controllers[0].axes[2] < -0.1)
            {
                cube.applyMatrix( new THREE.Matrix4().makeTranslation(platform.controllers[0].axes[2], 0, 0) );
            }
            if(platform.controllers[0].axes[3] > 0.1 || platform.controllers[0].axes[3] < -0.1)
            {
                cube.applyMatrix( new THREE.Matrix4().makeTranslation(0, -platform.controllers[0].axes[3], 0) );
            }
            
        }
        //if dpad/joystick moves
//         if()
//         {
//             //move object
//         }

        renderer.render(scene, camera);
    };

    render();
}