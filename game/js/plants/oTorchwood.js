export var oTorchwood = InheritO(CPlants, {
	EName: "oTorchwood",
	CName: "Torchwood",
	width: 73,
	height: 83,
	beAttackedPointR: 53,
	SunNum: 175,
	BookHandPosition: "49% 60%",
	PicArr: [
		"images/Card/Plants/Torchwood.webp",
		"images/Plants/Torchwood/0.gif",
		"images/Plants/Torchwood/Torchwood.gif",
		"images/Plants/PB00.png",
		"images/Plants/PB01.png",
		"images/Plants/PB10.webp",
		"images/Plants/PB11.webp",
		"images/Plants/Torchwood/SputteringFire.gif",
	],
	AudioArr: ["firepea", "ignite", "ignite2"],
	Tooltip: "Peas that pass through it turn into fireballs",
	Produce:
		'<font color="#28325A">Torchwoods turn peas that pass through them into fireballs that deal twice as much damage.</font><p>Special: <font color="#CC241D">doubles the damage of peas that pass through it.  Fireballs deal damage to nearby zombies on impact</font><p>Everybody likes and respects Torchwood. They like him for his integrity, for his steadfast friendship, for his ability to greatly maximize pea damage. But Torchwood has a secret: he can\'t read.',
	PrivateBirth(c) {
		var a = c.R;
		var b = c.C;
		oGd.$Torch[a + "_" + b] = c.id;
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
	},
	InitTrigger() {},
	PrivateDie(c) {
		var a = c.R;
		var b = c.C;
		delete oGd.$Torch[a + "_" + b];
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
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
			function moveItem1(f, j, h, c, n, i, m, k, o, g) {
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
						}).src = "images/Plants/FireBulletHit.webp"),
						oSym.addTask(75, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, moveItem1, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
