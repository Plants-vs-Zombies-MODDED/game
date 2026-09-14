import { oNutBowling } from "./oNutBowling.js";

export var oBoomNutBowling = InheritO(oNutBowling, {
	EName: "oBoomNutBowling",
	CName: "Explode-o-nut",
	PicArr: [
		"images/Card/Plants/BoomWallNut.webp",
		"images/Plants/WallNut/1.gif",
		"images/Plants/WallNut/BoomWallNut.webp",
		"images/Plants/CherryBomb/Boom.gif",
	],
	AudioArr: ["cherrybomb", "bowling"],
	PrivateBirth(a) {
		PlaySound2("bowling");
		EditEle($(a.id).childNodes[1], {
			style: `animation: wallnutSpin ${0.75 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		const moveNut = function (s, q, b, c, m) {
			var v = s.R;
			var p = s.C;
			var t;
			var l;
			if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
				var j = v > 2 ? v - 1 : 1;
				var g = v < oS.R ? v + 1 : oS.R;
				var u = s.pixelLeft - 80;
				var r = s.pixelLeft + 160;
				var e;
				var k;
				EditEle($(a.id).childNodes[1], {
					style: "",
				});
				PlaySound2("cherrybomb");
				do {
					k = (e = oZ.getArZ(u, r, j)).length;
					while (k--) {
						e[k].ExplosionDie();
					}
				} while (j++ < g);
				s.Die(1);
				EditEle(
					m.childNodes[1],
					{
						src: "images/Plants/CherryBomb/Boom.gif",
					},
					{
						width: "213px",
						height: "160px",
						left: "-50px",
						top: "-30px",
					}
				);
				oSym.addTask(65, ClearChild, [m]);
			} else {
				b > q
					? s.Die()
					: ((l = GetC((s.pixelRight += 2))),
						(s.AttackedLX = b += 2),
						(s.AttackedRX = c += 2),
						SetStyle(m, {
							left: (s.pixelLeft += 2) + "px",
						}),
						l !== p &&
							((s.C = l),
							oGd.del({
								R: v,
								C: p,
								PKind: 1,
							}),
							oGd.add(s, v + "_" + l + "_1")),
						oSym.addTask(1, moveNut, [s, q, s.AttackedLX, s.AttackedRX, m]));
			}
		};
		moveNut(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id));
	},
});
