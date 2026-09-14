export var oTenManNut = InheritO(CPlants, {
	EName: "oTenManNut",
	CName: "Vine-nut",
	width: 155,
	height: 130,
	beAttackedPointL: 63,
	beAttackedPointR: 75,
	SunNum: 150,
	HP: 11e3,
	Stature: 1,
	canEat: 1,
	BookHandPosition: "52% 114%",
	PicArr: ["images/Card/Plants/TenManNut.webp", "images/Plants/TenManNut/0.gif", "images/Plants/TenManNut/Spikeweed.gif"],
	Attack: 40,
	ArZ: {},
	Tooltip: "Damages zombies that eat it",
	Stature: 1,
	Produce:
		'<font color="#28325A">Vine-nuts are heavy-duty wall plants that can\'t be vaulted over and also damage zombies.</font><p>Damage: <font color="#CC241D">normal</font><br>Toughness: <font color="#CC241D">very high</font><p>Vine-Nut started as a plain Tall-Nut but became entangled in some wild jungle vines. Now, when zombies bite, thorny vines lash out, slowing them down. It\'s not just a nut, it\'s a vengeful nut!',
	getHurt(f, c, b) {
		var e = this;
		var d;
		var a = $(e.id).childNodes[1];
		switch (c) {
			case 2:
				f.flatTire();
				break;
			case 1:
				f.getHit2(f, 40, 0);
		}
		switch (true) {
			case (d = e.HP -= b) < 1:
				e.Die();
				break;
			case d < 101:
				a.src = "images/Plants/TenManNut/Spikeweed.gif";
				break;
			case d < 201:
				a.src = "images/Plants/TenManNut/Spikeweed.gif";
		}
	},
	NormalAttack(b, a) {
		var c = $Z[b];
		c.getHit2(c, this.Attack, 0);
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
	},
	TriggerCheck(i, h) {
		var c = i.id;
		var g = this.ArZ;
		var a;
		var b;
		var e;
		var f;
		i.PZ &&
			!g[c] &&
			((a = i.AttackedLX),
			(b = i.AttackedRX),
			(e = this.AttackedLX),
			(f = this.AttackedRX),
			(a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
			this.AttackCheck2(i) &&
			((g[c] = 1),
			this.NormalAttack(c),
			oSym.addTask(
				100,
				(d, j) => {
					var k = $P[d];
					k && delete k.ArZ[j];
				},
				[this.id, c]
			));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
});
