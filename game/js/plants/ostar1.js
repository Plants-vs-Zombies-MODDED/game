import { oNutBowling } from "./oNutBowling.js";

export var ostar1 = InheritO(oNutBowling, {
	EName: "ostar1",
	CName: "Sea Starfruitt",
	width: 71,
	height: 71,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 75,
	coolTime: 50,
	HP: 0,
	canEat: 0,
	BookHandBack: "Undersea",
	Stature: 1,
	PicArr: ["images/Card/Plants/star.webp", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
	Tooltip: "",
	Produce: "",
	PrivateBirth(a) {
		PlaySound2("bowling");
		const moveNut = function (b, c, n, m, e, g) {
			var d = oZ.getArZ(n, m, e);
			var f = d.length;
			var k;
			var j;
			var l = b.R;
			var h = b.C;
			while (f--) {
				(k = d[f]).getCrushed(b) && k.CrushDie();
			}
			n > c
				? b.Die()
				: ((j = GetC((b.pixelRight += 2))),
					(b.AttackedLX = n += 2),
					(b.AttackedRX = m += 2),
					(g.style.left = (b.pixelLeft += 2) + "px"),
					j !== h &&
						((b.C = j),
						oGd.del({
							R: l,
							C: h,
							PKind: 1,
						}),
						oGd.add(b, l + "_" + j + "_1")),
					oSym.addTask(1, moveNut, [b, c, n, m, e, g]));
		};
		moveNut(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
