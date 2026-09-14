import { oSunFlower } from "./oSunFlower.js";

export var oTwinSunflower = InheritO(oSunFlower, {
	EName: "oTwinSunflower",
	CName: "Twin Sunflower",
	width: 83,
	height: 84,
	beAttackedPointR: 63,
	SunNum: 150,
	BookHandPosition: "49% 60%",
	PicArr: [
		"images/Card/Plants/TwinSunflower.webp",
		"images/Plants/TwinSunflower/0.gif",
		"images/Plants/TwinSunflower/TwinSunflower1.gif",
		"images/Plants/TwinSunflower/TwinSunflower.gif",
	],
	Tooltip: 'Gives twice as much sun as a sunflower  <p> <font color="red">(requires sunflower)</font>',
	Produce:
		'<font color="#28325A">Twin Sunflowers give twice as much sun as a normal sunflower.</font><p>Sun production: <font color="#CC241D">double</font><br>Must be planted on sunflowers<p>It was a crazed night of forbidden science that brought Twin Sunflower into existence. Thunder crashed overhead, strange lights flickered, even the very roaring wind seemed to hiss its angry denial. But to no avail. Twin Sunflower was alive, ALIVE!',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oSunFlower";
	},
	/*
BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
    d.style.clip = "rect(0,auto,84px,0)";
    d.style.height = "168px";
    EditEle(
        b,
        {
            id: e,
        },
        a,
        EDPZ
    );
},
*/ // same thing here
	ChangePosition(c, a) {
		var b = c.childNodes[1];
		a
			? SetStyle(b, {
					clip: "rect(84px,auto,auto,auto)",
					top: "-84px",
				})
			: SetStyle(b, {
					clip: "rect(auto,auto,84px,auto)",
					top: 0,
				});
	},
	PrivateBirth(a) {
		var b = GetX(a.C);
		const produceLoop = function (f, d, c, e, recurse) {
			$P[f] &&
				(a.ChangePosition($(f), 0),
				oSym.addTask(
					100,
					(k, h, g, j, i) => {
						(AppearSun(Math.floor(h + Math.random() * 21), j, 25, 0),
							AppearSun(Math.floor(g + Math.random() * 21), j, 25, 0),
							oSym.addTask(
								100,
								(l) => {
									$P[l] && a.ChangePosition($(l), 0);
								},
								[k]
							),
							oSym.addTask(2400, i, [k, h, g, j]));
					},
					[f, d, c, e, recurse]
				));
		};
		oSym.addTask(500, produceLoop, [a.id, b - 40, b - 20, GetY(a.R), produceLoop]);
	},
});
