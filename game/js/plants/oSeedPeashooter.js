export var oSeedPeashooter = InheritO(CPlants, {
	EName: "oSeedPeashooter",
	CName: "Peashooter",
	width: 71,
	height: 71,
	beAttackedPointR: 51,
	SunNum: 0,
	BKind: 0,
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	PicArr: [
		"images/Card/Plants/Peashooter.webp",
		"images/Plants/Peashooter/0.gif",
		"images/Plants/Peashooter/Peashooter.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	Tooltip: "Shoots peas at the enemy",
	Produce:
		'Pea shooters are your first line of defense. They shoot peas at attacking zombies.<p>Damage: <font color="#CC241D">normal</font></p>How can a single plant grow and shoot so many peas so quickly? Peashooter says, "Hard work, commitment, and a healthy, well-balanced breakfast of sunlight and high-fiber carbon dioxide make it all possible." ',
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function movePea(f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlaySound2("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][m]),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, movePea, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
