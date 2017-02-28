var haveEvents = 'ongamepadconnected' in window;
if (!haveEvents) {
  setInterval(scan, 500);
}

function connecthandler(e) {
  add(e.gamepad);
}

function add(gamepad) {
  platform.controllers[gamepad.index] = gamepad;

  var menu = document.getElementById("menu-bar");

//   var d = document.createElement("div");
//   d.setAttribute("id", "controller" + gamepad.index);
//   d.innerHTML = gamepad.id;

//   var t = document.createElement("h1");
//   t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
//   d.appendChild(t);

//   var b = document.createElement("div");
//   b.className = "buttons";
//   for (var i = 0; i < gamepad.buttons.length; i++) {
//     var e = document.createElement("span");
//     e.className = "button";
//     //e.id = "b" + i;
//     e.innerHTML = i;
//     b.appendChild(e);
//   }

//   d.appendChild(b);

//   var a = document.createElement("div");
//   a.className = "axes";

//   for (var i = 0; i < gamepad.axes.length; i++) {
//     var p = document.createElement("progress");
//     p.className = "axis";
//     //p.id = "a" + i;
//     p.setAttribute("max", "2");
//     p.setAttribute("value", "1");
//     p.innerHTML = i;
//     a.appendChild(p);
//   }

//   d.appendChild(a);

  //create controller id on main menu
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", "#");
  li.appendChild(a);

  var img = document.createElement("img");
  img.setAttribute("src", "img/controller.png");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");
  img.setAttribute("title", "controller" + gamepad.index);
  img.setAttribute("id", "controller" + gamepad.index);
  a.appendChild(img);

  menu.appendChild(li);
  
  requestAnimationFrame(this.update);
}

function disconnecthandler(e) {
  remove(e.gamepad);
}

function remove(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  d.parentNode.parentNode.parentNode.removeChild(d.parentNode.parentNode);
  delete platform.controllers[gamepad.index];
}

function update() {
  if (!haveEvents) {
    scan();
  }

  var i = 0;
  var j;

//   for (j in controllers) {
//     var controller = controllers[j];
//     var d = document.getElementById("controller" + j);
//     var buttons = d.getElementsByClassName("button");

//     for (i = 0; i < controller.buttons.length; i++) {
//       var b = buttons[i];
//       var val = controller.buttons[i];
//       var pressed = val == 1.0;
//       if (typeof(val) == "object") {
//         pressed = val.pressed;
//         val = val.value;
//       }

//       var pct = Math.round(val * 100) + "%";
//       b.style.backgroundSize = pct + " " + pct;

//       if (pressed) {
//         b.className = "button pressed";
//       } else {
//         b.className = "button";
//       }
//     }

//     var axes = d.getElementsByClassName("axis");
//     for (i = 0; i < controller.axes.length; i++) {
//       var a = axes[i];
//       a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
//       a.setAttribute("value", controller.axes[i] + 1);
//     }
//   }

  requestAnimationFrame(update);
}

function scan() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in platform.controllers) {
        platform.controllers[gamepads[i].index] = gamepads[i];
      } else {
        add(gamepads[i]);
      }
    }
  }
  for(var i in platform.controllers)
  {
    var controller = platform.controllers[i];
      if(gamepads[controller.index] == null)
      {
        remove(controller);
      }
    
  }
  
}


//these events are not fired in chrome, only firefox
// window.addEventListener("gamepadconnected", connecthandler);
// window.addEventListener("gamepaddisconnected", disconnecthandler);




