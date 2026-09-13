export var oIPotatoMine = InheritO(CPlants, {
	EName: "oIPotatoMine",
	CName: "Potato Mine",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 25,
	coolTime: 1,
	Stature: -1,
	HP: 13,
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
		'Potato mines are powerful, but they take time</font><br>to arm yourself. You should plant them in the way of zombies</font><br>, which explode when they are touched.<p>Harm:<font color="CC241D">huge</font><br>Scope:<font color="#CC241D">All zombies in a small area</font><br>Instructions:<font color="#CC241D">It takes some preparation time to use alone.</font></p>Some people say Potato Ray is lazy because he always puts everything</font><br>Save for last. Tudou Lei didnt have time to talk to them, he was busy with exams</font><br>Consider his investment strategy.',
	Status: 0,
	AudioArr: ["potato_mine"],
	canTrigger: 0,
	BirthStyle(d, e, c, b, a) {
		c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMine.gif" : (d.Status = 1);
		d.canTrigger = 1;
		d.getHurt = d.getHurt2;
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
