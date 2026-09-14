export var oSeedSquash = InheritO(CPlants, {
	EName: "oSeedSquash",
	CName: "Squash",
	width: 100,
	height: 226,
	beAttackedPointR: 67,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Squash.webp",
		"images/Plants/Squash/0.gif",
		"images/Plants/Squash/Squash.gif",
		"images/Plants/Squash/SquashAttack.gif",
		"images/Plants/Squash/SquashL.png",
		"images/Plants/Squash/SquashR.png",
	],
	AudioArr: ["squash_hmm", "gargantuar_thump"],
	Tooltip: "Squashes zombies",
	Produce:
		'窝瓜会压扁第一个接近它的僵尸。<p>Harm:<font color="#CC241D">极高</font><br>Scope:<font color="#CC241D">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#CC241D">单独使用</font></p>“我准备好了!”窝瓜大吼道，“干吧!!算我</font><br>一份!没人比我厉害!我就是你要的人!来啊!</font><br>等啥啊？要的就是这个!”',
	GetDY(b, c, a) {
		return a[0] ? -21 : -10;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
	},
	getTriggerRange(a, b, c) {
		return [[b - 50, c + 80, 0]];
	},
	TriggerCheck(h, g, e) {
		var c = h.ZX;
		var b = this.id;
		var a = $(b).childNodes[1];
		var f = h.isAttacking;
		h.beAttacked &&
			h.Altitude > -1 &&
			h.Altitude < 2 &&
			(f || (!f && c - this.AttackedRX < 71)) &&
			(PlaySound2("squash_hmm"),
			oT.$[this.R].splice(e, 1),
			(a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png"),
			oSym.addTask(
				100,
				(d, j, i) => {
					var k = $P[d];
					k && k.NormalAttack(k, h.id, i);
				},
				[b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
			));
	},
	NormalAttack(d, c, b) {
		var a = $(d.id);
		var e = $Z[c];
		e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
		a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
		SetStyle(a, {
			left: b + "px",
		});
		d.Die(1);
		oSym.addTask(
			45,
			(f, l, j) => {
				PlaySound2("gargantuar_thump");
				var g = oZ.getArZ(l, l + 100, j);
				var h = g.length;
				var k;
				while (h--) {
					(k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
				}
				oSym.addTask(185, ClearChild, [f]);
			},
			[a, b, d.R]
		);
	},
});
