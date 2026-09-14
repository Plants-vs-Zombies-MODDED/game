import { oNutBowling } from "./oNutBowling.js";

export var oHugeNutBowling = InheritO(oNutBowling, {
	EName: "oHugeNutBowling",
	CName: "Giant Wall-nut",
	width: 142,
	height: 142,
	beAttackedPointL: 5,
	beAttackedPointR: 137,
	HP: 8e3,
	Stature: 1,
	PicArr: ["images/Card/Plants/HugeWallNut.webp", "images/Plants/WallNut/2.webp", "images/Plants/WallNut/2.webp"],
	PrivateBirth(a) {
		PlaySound2("bowling");
		EditEle($(a.id).childNodes[1], {
			style: `animation: hugeWallnutSpin ${1.25 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		(function moveItem1(b, c, n, m, e, g) {
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
					oSym.addTask(1, moveItem1, [b, c, n, m, e, g]));
		})(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
	},
});
