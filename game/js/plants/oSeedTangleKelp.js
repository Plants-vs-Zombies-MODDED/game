export var oSeedTangleKelp = InheritO(CPlants, {
	EName: "oSeedTangleKelp",
	CName: "Tangle Kelp",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	coolTime: 30,
	SunNum: 0,
	BookHandBack: "Pool",
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
		'缠绕水草是一种可以把接近他的僵尸拉进水中</font><br>的水生植物。<p>Harm:<font color="#CC241D">极高</font><br>用法：<font color="#CC241D">单独使用，接触后生效</font><br>Features:<font color="#CC241D">必须种在水中</font></p>“我是完全隐形的，”缠绕水草自己想，“我就</font><br>藏在水面下，没人会看到我。”他的朋友告诉他</font><br>，他们可以清楚地看到他。不过，缠绕水草似</font><br>乎不想改变自己的看法。',
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
