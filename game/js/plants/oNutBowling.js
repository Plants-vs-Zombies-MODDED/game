export var oNutBowling = InheritO(CPlants, {
	EName: "oNutBowling",
	CName: "Wall-nut",
	width: 71,
	height: 71,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 0,
	HP: 4e3,
	coolTime: 0,
	canEat: 0,
	Tooltip: "",
	PicArr: ["images/Card/Plants/WallNut.webp", "images/Plants/WallNut/0.webp", "images/Plants/WallNut/WallNut.webp"],
	AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
	Produce: "",
	CanAttack: 1,
	InitTrigger() {},
	getHurt() {},
	CanGrow(d, e, f) {
		return true;
	},
	NormalAttack: null,
	PrivateBirth(c) {
		var d = $(c.id);
		PlaySound2("bowling");
		EditEle(d.childNodes[1], {
			style: `animation: wallnutSpin ${0.75 * ($User.Visitor.TimeStep / 10)}s linear infinite`,
		});
		const moveNut = function (z, y, q, r, p, x, e, g, b) {
			var a = z.R;
			var l = z.C;
			var A;
			var u;
			var s;
			var v = 0;
			var w;
			var i;
			var t = false;
			if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
				u = A.id;
				PlaySound2(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
				switch (A.Ornaments) {
					case 0:
						A.NormalDie();
						break;
					case 1:
						A.getHit0(A, Math.min(A.OrnHP, 900), 0);
						break;
					default:
						z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
				}
				z.CanAttack = 0;
				switch (a) {
					case oS.R:
						e = -1;
						break;
					case 1:
						e = 1;
						break;
					default:
						switch (e) {
							case 1:
								e = -1;
								break;
							case -1:
								e = 1;
								break;
							default:
								e = Math.random() > 0.5 ? 1 : -1;
						}
				}
				oSym.addTask(1, moveNut, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
			} else {
				switch (e) {
					case 1:
						z.pixelBottom + 2 > b && (e = -1);
						break;
					case -1:
						z.pixelBottom - 2 < g && (e = 1);
						break;
				}
				q > y
					? z.Die()
					: ((i = GetC((z.pixelRight += 2))),
						(z.AttackedLX = q += 2),
						(z.AttackedRX = r += 2),
						(w = GetR((z.pixelBottom += e * 2))),
						SetStyle(x, {
							left: (z.pixelLeft = p += 2) + "px",
							top: (z.pixelTop += e * 2) + "px",
						}),
						w !== a && ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
						i !== l && ((z.C = i), (t = true)),
						t &&
							(oGd.del({
								R: a,
								C: l,
								PKind: 1,
							}),
							oGd.add(z, w + "_" + i + "_1")),
						oSym.addTask(1, moveNut, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
			}
		};
		moveNut(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
	},
});
