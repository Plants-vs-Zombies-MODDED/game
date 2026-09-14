import { oCherryBomb } from "./oCherryBomb.js";

export var oJalapeno = InheritO(oCherryBomb, {
	EName: "oJalapeno",
	CName: "Jalapeno",
	width: 68,
	height: 89,
	SunNum: 125,
	beAttackedPointR: 48,
	BookHandPosition: "50% 64%",
	PicArr: [
		"images/Card/Plants/Jalapeno.webp",
		"images/Plants/Jalapeno/0.gif",
		"images/Plants/Jalapeno/Jalapeno.gif",
		"images/Plants/Jalapeno/JalapenoAttack.gif",
	],
	AudioArr: ["jalapeno"],
	Tooltip: "Destroys an entire lane of zombies",
	Produce:
		'<font color="#28325A">Jalapenos destroy an entire lane of zombies.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a lane</font><br>Usage: <font color="#CC241D">single use, instant</font></p>"NNNNNGGGGGG!!!!!!!!" Jalapeno says. He\'s not going to explode, not this time. But soon. Oh, so soon. It\'s close. He knows it, he can feel it, his whole life\'s been leading up to this moment.',
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlaySound2("jalapeno");
					var b = $(j);
					var f = h.R;
					var c = oZ.getArZ(100, oS.W, f);
					var e = c.length;
					var g = oGd.$Ice[f];
					var d = oGd.$Crater;
					while (e--) {
						c[e].getExplosion();
					}
					h.Die(1);
					EditEle(
						b.childNodes[1],
						{
							src: "images/Plants/Jalapeno/JalapenoAttack.gif",
						},
						{
							width: "755px",
							height: "131px",
							left: 120 - h.pixelLeft + "px",
							top: "-42px",
						}
					);
					oSym.addTask(135, ClearChild, [b]);
					ClearChild($("dIceCar" + f));
					if (g) {
						for (e = g[1]; e < 11; e++) {
							delete d[f + "_" + e];
						}
					}
				}
			},
			[a.id]
		);
	},
});
