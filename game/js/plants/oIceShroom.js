import { oFumeShroom } from "./oFumeShroom.js";

export var oIceShroom = InheritO(oFumeShroom, {
	EName: "oIceShroom",
	CName: "Ice-shroom",
	width: 83,
	height: 75,
	beAttackedPointR: 63,
	SunNum: 75,
	coolTime: 50,
	BookHandPosition: "48% 60%",
	PicArr: [
		"images/Card/Plants/IceShroom.webp",
		"images/Plants/IceShroom/0.gif",
		"images/Plants/IceShroom/IceShroom.gif",
		"images/Plants/IceShroom/IceShroomSleep.gif",
		"images/Plants/IceShroom/Snow.gif",
		"images/Plants/IceShroom/icetrap.gif",
	],
	AudioArr: ["frozen", "wakeup"],
	Tooltip: "Temporarily immobilizes all zombies on the screen",
	Produce:
		'<font color="#28325A">Ice-shrooms temporarily immobilize all zombies on the screen.</font><p>Damage: <font color="#CC241D">very light, immobilizes zombies</font><br>Range: <font color="#CC241D">all zombies on the screen</font><br>Usage: <font color="#CC241D">single use, instant</font><br><font color="#8832aa">Sleeps during the day</font></p>Ice-shroom frowns, not because he\'s unhappy or because he disapproves, but because of a childhood injury that left his facial nerves paralyzed.',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth(a) {
		!oS.DKind ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {})) : (a.getHurt = CPlants.prototype.getHurt);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		$(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			100,
			(c) => {
				var f = $P[c];
				if (f) {
					PlaySound2("frozen");
					var e;
					var d;
					var b = "Snow_" + Math.random();
					for (d in $Z) {
						(e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
					}
					oSym.addTask(
						40,
						(g) => {
							ClearChild(g);
						},
						[
							NewEle(
								b,
								"div",
								"position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " +
									(f.pixelLeft - 197) +
									"px " +
									(f.pixelTop - 80) +
									"px",
								0,
								EDPZ
							),
						]
					);
					f.Die();
				}
			},
			[a]
		);
	},
});
