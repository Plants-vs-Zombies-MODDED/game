import { oPuffShroom } from "./oPuffShroom.js";

export var oGun = InheritO(oPuffShroom, {
	EName: "oGun",
	CName: "Soak-shroom",
	Sleep: 0,
	width: 100,
	height: 100,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	BookHandBack: "Undersea",
	SunNum: 25,
	BookHandPosition: "49% 72%",
	PicArr: [
		"images/Card/Plants/gun.png",
		"images/Plants/gun/0.gif",
		"images/Plants/gun/SeaShroom.gif",
		"images/Plants/gun/SeaShroomSleep.gif",
		"images/Plants/gun/ShroomBullet.gif",
		"images/Plants/gun/ShroomBulletHit.gif",
	],
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2
			? b < 3
				? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c])
				: !(a || e[0] || oGd.$Crater[c])
			: 0;
	},
	Tooltip: "Spits short-ranged water at the enemy",
	Produce:
		'<font color="#28325A">Soak-shrooms are pretty cheap, but have a short range.</font><p>Damage: <font color="#CC241D">low</font><br>Range: <font color="#CC241D">short</font></p>Inhale, exhale; this anemone\'s unlocked zen breathing from ancient scrolls, training nonstop to blast its watergun past three tiles. Still a long shot, but its focus? Undeniable.',
	PrivateBirth(a) {
		a.BulletEle = NewImg(
			0,
			"images/Plants/gun/ShroomBullet.gif",
			"left:" +
			(a.AttackedLX - 46) +
			"px;top:" +
			(a.pixelTop + 40) +
			"px;visibility:hidden;z-index:" +
			(a.zIndex + 2),
		);
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ,
		);
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		PlaySound2("puff");
		var k = this;
		var b = this;
		var c = "PSB" + Math.random();
		var a = b.AttackedLX;
		var j = k.id;
		var d = $(j);

		EditEle(
			b.BulletEle.cloneNode(false),
			{
				id: c,
			},
			0,
			EDPZ,
		);
		oSym.addTask(
			15,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c],
		);
		const moveBullet = function (j, d, e, f, g) {
			var i = GetC(e);
			var h = oZ.getZ0(e, f);
			h && h.Altitude === 1
				? (h.getPea(h, 20, 0),
					(SetStyle(d, {
						left: g + 38 + "px",
					}).src = "images/Plants/gun/ShroomBulletHit.gif"),
					oSym.addTask(10, ClearChild, [d]))
				: (e += 5) < oS.W
					? ((d.style.left = (g += 5) + "px"),
						oSym.addTask(1, moveBullet, [j, d, e, f, g]))
					: ClearChild(d);
		};
		oSym.addTask(1, moveBullet, [c, $(c), a, b.R, a - 46]);
		d.childNodes[1].src = "images/Plants/gun/SeaShroomShoot.gif";
		ImgSpriter(
			k.id,
			j,
			[
				["0 0", 9, 1],
				["0 -200px", 9, 2],
				["0 -400px", 9, 3],
				["0 -600px", 9, 4],
				["0 -800px", 9, 5],
				["0 -1000px", 9, 6],
				["0 -1200px", 9, 7],
				["0 -1400px", 9, 8],
				["0 -1600px", 9, 9],
				["0 -1800px", 9, 10],
				["0 -2000px", 9, 11],
				["0 -2200px", 9, -1],
			],
			0,
			(m, n) => {
				var i = $(n);
				$P[n] && (i.childNodes[1].src = "images/Plants/gun/SeaShroom.gif");
			},
		);
	},
});
