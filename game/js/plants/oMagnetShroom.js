export var oMagnetShroom = InheritO(CPlants, {
	EName: "oMagnetShroom",
	CName: "MagnetShroom",
	width: 102,
	beAttackedPointR: 98,
	height: 90,
	target: -1,
	SunNum: 100,
	BookHandBack: "Night",
	SleepGif: 3,
	cd: 15,
	cotcd: 1000,
	night: true,
	Tooltip: "可以用磁力吸取僵尸的头盔",
	Produce:
		'磁力菇可以用磁力吸取僵尸的头盔等其它金属物品。<p>范围：<font color="#CC241D">靠近的僵尸</font><br>特点：<font color="#CC241D">移除僵尸们所有的金属物品<br>白天睡觉</font></p>磁力是一种强大的力量，非常强大，强大到有时都吓到磁力菇自己了。能力越大，责任越大，他不知道自己能否肩负得起这责任。',
	InitTrigger() {},
	PicArr: ["images/Card/Plants/MagnetShroom.webp", "images/Plants/Ms/Ms.gif", "images/Plants/Ms/Ms.gif", "images/Plants/Ms/sleep.gif"],
	getTriggerRange: (R, LX, RX) => [[0, oS.W, 0]],
	AudioArr: ["blover"],
	BirthStyle(c, d, b, a) {
		oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
		const attackLoop = function (self) {
			self.NormalAttack();
			oSym.addTask(1, attackLoop, [self]);
		};
		oSym.addTask(1, attackLoop, [c]);
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	Die(a) {
		var b = this;
		var c = b.id;
		b.cd = 0;
		ClearChild(b.imgnn);
		b.target = "die";
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
		$P.length -= 1;
		!a && ClearChild($(c));
		b.PrivateDie(b);
	},
	getTriggerR: (selfR) => [selfR - 2 < 1 ? 1 : selfR - 2, selfR + 2 > oS.R ? oS.R : selfR + 2],
	PrivateBirth() {},
	Plength(pid, zid) {
		//判断僵尸是否在磁力菇的攻击范围内
		if (zid.Ifgc !== 0 || zid.OrnHP === 0) {
			return 0;
		}
		//alert(123);
		if (
			zid.EName !== "oScreenDoorZombie" &&
			zid.EName !== "oDuckyTubeZombie4" &&
			zid.EName !== "oSmallFootballZombie" &&
			zid.EName !== "oFootballZombie" &&
			zid.EName !== "oDuckyTubeZombie3" &&
			zid.EName !== "oJackinTheBoxZombie" &&
			zid.EName !== "oBucketheadZombie" &&
			zid.EName !== "oDiggerZombie" &&
			zid.EName !== "oIScreenDoorZombie" &&
			zid.EName !== "oIDuckyTubeZombie4" &&
			zid.EName !== "oISmallFootballZombie" &&
			zid.EName !== "oIFootballZombie" &&
			zid.EName !== "oIDuckyTubeZombie3" &&
			zid.EName !== "oIJackinTheBoxZombie" &&
			zid.EName !== "oIBucketheadZombie" &&
			zid.EName !== "oIDiggerZombie"
		) {
			return 0;
		}
		if (Math.abs(zid.R - pid.R) > 2) {
			return 0;
		}
		if (Math.abs(zid.X - pid.pixelLeft) > 200) {
			return 0;
		}
		return 1;
	},
	Plength1(pid, zid) {
		//计算僵尸和磁力菇之间的距离
		var chang = Math.abs(zid.R - pid.R) * 100;
		var kuan = Math.abs(zid.X - GetX(pid.C));
		return Math.sqrt(chang * chang + kuan * kuan);
	},
	AttackCheckZ() {
		//查找僵尸
		var self = this;
		var z;
		var otarget;
		var llen;
		var lastx;
		var Target = -1;
		for (z in $Z) {
			otarget = $Z[z];
			if (!self.Plength(self, otarget) || otarget.PZ === 0) {
				continue;
			}
			if (Target === -1) {
				Target = $Z[z];
				continue;
			}
			llen = self.Plength1(self, otarget);
			if (llen < self.Plength1(self, Target)) {
				Target = otarget;
			}
		}
		self.target = Target;
		if (self.target === -1) {
			return 0;
		}
		return 1;
	},
	Yesgif() {
		try {
			if (this.cd && $(this.id).childNodes[1].src !== "images/Plants/Ms/Ms.gif") {
				$(this.id).childNodes[1].src = "images/Plants/Ms/Ms.gif";
			}
		} catch (arr) {}
	},
	attackzombiest(zid) {
		if (zid.CName === "矿工僵尸") {
			//alert(1);
			zid.Stone_of_Sinan_Up();
		} else {
			zid.OrnHP = 0;
			zid.getHit0(zid, 0, 0);
		}
	},
	NormalAttack() {
		//alert(this.canTrigger);
		//alert(1);
		if (this.AttackCheckZ() && this.cd) {
			var self = this;
			var { id } = self;
			var zid = self.target;
			if (zid.Ifgc === 1) {
				return;
			}
			zid.Ifgc = 1;
			$(id).childNodes[1].src = "images/Plants/Ms/attack.gif" + "?" + Date.now() + Math.random();
			oSym.addTask(
				80,
				(zid, self) => {
					self.attackzombiest(zid);
				},
				[zid, self]
			);
			self.cd = 0;
			oSym.addTask(
				self.cotcd,
				(id) => {
					self.target = -1;
					self.cd = 1;
					self.Yesgif();
				},
				[id]
			);
		}
	},
});
