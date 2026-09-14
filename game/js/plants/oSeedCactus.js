export const oSeedCactus = InheritO(CPlants, {
	EName: "oSeedCactus",
	CName: "Cactus",
	width: 122,
	height: 157,
	SunNum: 0,
	beAttackedPointL: 10,
	beAttackedPointR: 80,
	AudioArr: ["plantgrow"],
	Status: 0,
	PicArr: (function () {
		return [
			"images/Card/Plants/Cactus.webp",
			"images/Plants/Cactus/0.gif",
			"images/Plants/Cactus/Cactus.gif",
			"images/Plants/Cactus/Cactus2.gif",
			"images/Plants/Cactus/Attack.gif",
			"images/Plants/Cactus/Attack2.gif",
			"images/Plants/Cactus/Elongation.gif",
			"images/Plants/Cactus/Shorten.gif",
			"images/Plants/Cactus/Projectile32.png",
		];
	})(),
	Tooltip: "Shoots spikes that can pop balloons",
	Produce:
		'仙人掌发射的穿刺弹可以用来打击地面和空中</font><br>目标<p>Harm:<font color="#CC241D">中等</font><br>Scope:<font color="#CC241D">地面和空中</font></p>确实，仙人掌非常“刺儿”，但是她的刺下，隐</font><br>藏着颗温柔的心，充满着爱和善良。她只是想拥</font><br>抱别人，和被别人拥抱。大多数人都做不到这点</font><br>，但是仙人掌她并不介意。她盯着一只铠甲鼠好</font><br>一阵子了，这次好像真的可以抱抱了。',
	getShadow(a) {
		return "left:3px;top:132px";
	},
	PrivateBirth(a) {
		a.ES = a.Elongation;
	},
	TriggerCheck(b, a) {
		this.ES() && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CheckLoop(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		this.ES();
		this.Status === 0 &&
			oSym.addTask(
				140,
				(e, f, h) => {
					var g;
					(g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
				},
				[a, b, c]
			);
	},
	CheckLoop2(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		this.ES();
		this.Status &&
			oSym.addTask(
				150,
				(e, f, h) => {
					var g;
					(g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
				},
				[a, b, c]
			);
	},
	AttackCheck1(g, f) {
		var b = this;
		var c = b.oTrigger;
		var a = $Z[g];
		var h;
		var e;
		var k;
		var j;
		if (a && a.PZ && (h = c[a.R])) {
			k = a.ZX;
			e = h.length;
			while (e--) {
				j = h[e];
				if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
					b.CheckLoop(g, j[2]);
					return;
				}
			}
		}
		b.canTrigger = 1;
	},
	AttackCheck12(a, c) {
		var b = this;
		b.CheckLoop(a, c);
	},
	Elongation() {
		var a = this;
		var b = a.id;
		if (!oGd.$Balloon[a.R] > 0) {
			return true;
		}
		PlaySound2("plantgrow");
		a.canTrigger = 0;
		a.Status = 1;
		$(b).childNodes[1].src = "images/Plants/Cactus/Elongation.gif";
		oSym.addTask(
			1,
			(e) => {
				var d = $P[e];
				var c;
				if (d) {
					d.NormalGif = 3;
					$(e).childNodes[1].src = "images/Plants/Cactus/Cactus2.gif";
					c = d.CheckLoop;
					d.CheckLoop = d.CheckLoop2;
					d.CheckLoop2 = c;
					c = d.NormalAttack;
					d.NormalAttack = d.NormalAttack2;
					d.NormalAttack2 = c;
					d.ES = d.Shorten;
					d.canTrigger = 1;
				}
			},
			[b]
		);
		return false;
	},
	Shorten() {
		var a = this;
		var b = a.id;
		if (oGd.$Balloon[a.R] > 0) {
			return true;
		}
		a.canTrigger = 0;
		a.Status = 0;
		$(b).childNodes[1].src = "images/Plants/Cactus/Shorten.gif";
		oSym.addTask(
			1,
			(e) => {
				var d = $P[e];
				var c;
				if (d) {
					d.NormalGif = 2;
					$(e).childNodes[1].src = "images/Plants/Cactus/Cactus.gif";
					c = d.CheckLoop;
					d.CheckLoop = d.CheckLoop2;
					d.CheckLoop2 = c;
					c = d.NormalAttack;
					d.NormalAttack = d.NormalAttack2;
					d.NormalAttack2 = c;
					d.ES = d.Elongation;
					d.canTrigger = 1;
				}
			},
			[b]
		);
		return false;
	},
	NormalAttack() {
		var b = this;
		var c = "CB" + Math.random();
		var a = b.id;
		$(a).childNodes[1].src = "images/Plants/Cactus/Attack.gif";
		oSym.addTask(
			40,
			(e) => {
				var d = $(e);
				d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus.gif");
			},
			[a]
		);
		NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
		oSym.addTask(
			30,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		const movePea = function (g, i, d, k, h, l) {
			var j;
			var f = GetC(k);
			var e = oZ["getZ" + d](k, h);
			// oxlint-disable-next-line no-nested-ternary
			e && e.Altitude === 1
				? (e.getPea(e, 30, d), ClearChild(i))
				: (k += j = !d ? 5 : -5) < oS.W && k > 100
					? ((i.style.left = (l += j) + "px"), oSym.addTask(1, movePea, [g, i, d, k, h, l]))
					: ClearChild(i);
		};
		oSym.addTask(1, movePea, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
	},
	NormalAttack2() {
		var b = this;
		var c = "CB" + Math.random();
		var a = b.id;
		$(a).childNodes[1].src = "images/Plants/Cactus/Attack2.gif";
		oSym.addTask(
			50,
			(e) => {
				var d = $(e);
				d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus2.gif");
			},
			[a]
		);
		NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
		oSym.addTask(
			20,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		const movePea2 = function (g, i, d, k, h, l) {
			var j;
			var f = GetC(k);
			var e = oZ["getZ" + d](k, h);
			// oxlint-disable-next-line no-nested-ternary
			e && e.Altitude === 3
				? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i))
				: (k += j = !d ? 5 : -5) < oS.W && k > 100
					? ((i.style.left = (l += j) + "px"), oSym.addTask(1, movePea2, [g, i, d, k, h, l]))
					: ClearChild(i);
		};
		oSym.addTask(1, movePea2, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
	},
});
