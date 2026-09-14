export var oTangleKlep = InheritO(CPlants, {
	EName: "oTangleKlep",
	CName: "Tangle Kelp",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	coolTime: 30,
	SunNum: 25,
	BookHandBack: "Pool",
	BookHandPosition: "50% 85%",
	GetDY(b, c, a) {
		return 5;
	},
	NormalGif: 1,
	AudioArr: ["TangleKlep"],
	PicArr: [
		"images/Card/Plants/TangleKlep.webp",
		"images/Plants/TangleKlep/0.gif",
		"images/Plants/TangleKlep/Float.gif",
		"images/Plants/TangleKlep/Grab.png",
		"images/interface/splash.png",
	],
	Tooltip: "Aquatic plant that pulls a zombie underwater",
	Produce:
		'<font color="#28325A">Tangle Kelp are aquatic plants that pull the first zombie that nears them underwater.</font><p>Damage: <font color="#CC241D">massive</font><br>Usage: <font color="#CC241D">single use, on contact</font><br><font color="#0ca1db">Must be planted in water</font></p>"I\'m totally invisible," Tangle Kelp thinks to himself. "I\'ll hide here just below the surface and nobody will see me." His friends tell him they can see him perfectly well, but he\'ll never change.',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(oGd.$LF[b] !== 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1] || oGd.$Tombstones[a]);
	},
	getShadow(a) {
		return "display:none";
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	getHurt(d, b, a) {
		var c = this;
		b === 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
	},
	TriggerCheck(b, a) {
		b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
	},
	NormalAttack(a, b) {
		a.getHurt = function () {};
		b.getHurt = function () {};
		b.beAttacked = 0;
		b.isAttacking = 1;
		NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
		oSym.addTask(
			50,
			(g, h) => {
				PlaySound2("TangleKlep");
				var e = g.id;
				var f = h.id;
				var d = e + "_splash";
				var c = f + "_splash";
				NewEle(
					d,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(g.pixelLeft - 4) +
						"px;top:" +
						(g.pixelTop - 16) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				NewEle(
					c,
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:" +
						(h.AttackedLX - 10) +
						"px;top:" +
						(h.pixelTop + h.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				ImgSpriter(
					d,
					e,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				ImgSpriter(
					c,
					f,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				h.DisappearDie();
				g.Die();
			},
			[a, b]
		);
	},
});
