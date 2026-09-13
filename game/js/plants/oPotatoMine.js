export var oPotatoMine = InheritO(CPlants, {
	EName: "oPotatoMine",
	CName: "Potato Mine",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 25,
	coolTime: 30,
	Stature: -1,
	HP: 1e3,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	BookHandPosition: "50% 70%",
	PicArr: [
		"images/Card/Plants/PotatoMine.webp",
		"images/Plants/PotatoMine/0.gif",
		"images/Plants/PotatoMine/PotatoMine.gif",
		"images/Plants/PotatoMine/PotatoMineNotReady.gif",
		"images/Plants/PotatoMine/PotatoMine_mashed.gif",
		"images/Plants/PotatoMine/ExplosionSpudow.gif",
	],
	Tooltip: "Explodes on contact, but takes time to arm itself",
	Produce:
		'<font color="#28325A">Potato Mines pack a powerful punch, but they need a while to arm themselves. You should plant them ahead of zombies. They will explode on contact.</font><p>Damage: <font color="CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a small area</font><br>Usage: <font color="#CC241D">single use, delayed activation</font></p>Some folks say Potato Mine is lazy, that he leaves everything to the last minute. Potato Mine says nothing. He\'s too busy thinking about his investment strategy.',
	Status: 0,
	AudioArr: ["potato_mine"],
	canTrigger: 0,
	BirthStyle(d, e, c, b, a) {
		c.childNodes[1].src = !a
			? "images/Plants/PotatoMine/PotatoMineNotReady.gif"
			: (~(function () {
					d.Status = 1;
					d.canTrigger = 1;
					d.getHurt = d.getHurt2;
				})(),
				"images/Plants/PotatoMine/PotatoMine.gif");
		EditEle(
			c,
			{
				id: e,
			},
			b,
			EDPZ
		);
	},
	getHurt2(d, b, a) {
		var c = this;
		b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
	},
	PrivateBirth(b, a) {
		!a &&
			oSym.addTask(
				1500,
				(d) => {
					var c = $P[d];
					c && (($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif"), (c.Status = 1), (c.canTrigger = 1), (c.getHurt = c.getHurt2));
				},
				[b.id]
			);
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	TriggerCheck(e, c) {
		var a = this.R;
		var b = this.C;
		e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
	},
	NormalAttack(j, h, e) {
		var g = this;
		var b = g.id;
		var d = $(b);
		var c = oZ.getArZ(j, h, e);
		var f = c.length;
		var a;
		while (f--) {
			(a = c[f]).Altitude < 2 && a.getThump();
		}
		g.Die(1);
		PlaySound2("potato_mine");
		EditEle(
			d.childNodes[1],
			{
				src: "images/Plants/PotatoMine/PotatoMine_mashed.gif",
			},
			{
				width: "132px",
				height: "93px",
				left: "-40px",
				top: "-20px",
			}
		);
		if (d.childNodes[1].classList.contains("cardboard")) {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d).classList.add("cardboard");
		} else {
			NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
		}
		oSym.addTask(
			200,
			(i) => {
				ClearChild(i.lastChild);
				oSym.addTask(100, ClearChild, [i]);
			},
			[d]
		);
	},
});
