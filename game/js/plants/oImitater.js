export var oImitater = InheritO(CPlants, {
  EName: "oImitater",
  CName: "Imitater",
  width: 95,
  height: 81,
  beAttackedPointR: 92,
  SunNum: 20,
  AlmanacGif: 1,
  PicArr: [
    "images/Card/Plants/Imitater.png",
    "images/Plants/Imitater/0.webp",
    "images/Plants/Imitater/Idle.webp",
    "images/Plants/Imitater/Spin.webp",
  ],
  Tooltip: "imitater",
  Produce:
    '<font color="#28325A">imitater</font><p>imitate: <font color="#CC241D">imitater	</font><br>imitater: <font color="#CC241D">all imitaters in a medium imitater</font><br>Usage: <font color="#CC241D">single use, instant</font></p>"I wanna imitate," says imitator #1. "No, let\'s imitate instead!" says his brother, imitate #2. After intense imitation they agree to imitate.',
  InitTrigger() {},
  PrivateBirth(a) {
    oSym.addTask(
      170,
      (b) => {
		var c = $P[b];
		var f = $(b);
        EditEle(f.childNodes[1], {
          src: c.PicArr[3],
        });
      },
      [a.id],
    );
	oSym.addTask(
          320,
          (b) => {
            var c = $P[b];
            if (c) {
              var f = $(b);
              var j = c.R;
			  var g = c.C;
              
              oSym.addTask(0, ClearChild, [f]);
			  var spawnedPlant = CustomSpecial(oPeashooter, j, g);
			  console.log
            }
          },
          [a.id],
        );
  },
});
