export var ostar = InheritO(CPlants, {
	EName: "ostar",
	CName: "Sea Starfruit",
	width: 71,
	height: 71,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 75,
	HP: 4e3,
	canEat: 0,
	BookHandBack: "Undersea",
	Tooltip: "Sea Starfruit rolls and destroys any obstacles in its way",
	Produce:
		'<font color="#28325A">Sea Starfruits roll and ricochet on any obstacles in their way.</font><p>Damage: <font color="#CC241D">medium</font><br>Range: <font color="#CC241D">all zombies that it hits</font><br>Special: <font color="#CC241D">ricochets when it hits an obstacle</font></p>Sea Starfruit always has a charming smile. No one knows the secret of him not feeling dizzy despite always spinning in circles. Some say the reason being him looking at one fixed point cross-eyed.',
	AlmanacGif: 1,
	BookHandPosition: "50% 85%",
	PicArr: ["images/Card/Plants/star.webp", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
	AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
	CanAttack: 1,
	InitTrigger() {},
	getHurt() {},
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	NormalAttack: null,
	PrivateBirth(c) {
		var d = $(c.id);
		PlaySound2("seastar_roll");
		const moveRoll = function (z, y, q, r, p, x, e, g, b) {
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
				//           PlaySound2(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
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
				oSym.addTask(1, moveRoll, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
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
						oSym.addTask(1, moveRoll, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
			}
		};
		moveRoll(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
	},
});
