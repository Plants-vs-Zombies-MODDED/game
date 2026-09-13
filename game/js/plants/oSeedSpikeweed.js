export var oSeedSpikeweed = InheritO(CPlants, {
	EName: "oSeedSpikeweed",
	CName: "Spikeweed",
	width: 85,
	height: 35,
	beAttackedPointL: 10,
	beAttackedPointR: 75,
	SunNum: 0,
	Stature: -1,
	canEat: 0,
	PicArr: ["images/Card/Plants/Spikeweed.webp", "images/Plants/Spikeweed/0.png", "images/Plants/Spikeweed/Spikeweed.webp"],
	Attack: 20,
	ArZ: {},
	Tooltip: "Pops tires and hurts zombies that step on it",
	Produce:
		'地刺可以扎破轮胎，并对踩到他的僵尸造成伤</font><br>害<p>Harm:<font color="#CC241D">普通</font><br>Scope:<font color="#CC241D">所有踩到他的僵尸</font><br>Features:<font color="#CC241D">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关</font><br>注着他喜欢的球员，他也始终如一的在赛后清理</font><br>冰球场。但只有一个问题：他害怕冰球。',
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		return d
			? e > 0 && e < d.ArC[1] && oGd.$LF[b] === 1 && !(c[1] || c[0])
			: !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 2:
				d.flatTire();
				c.Die();
				break;
			case 1:
				d.getHit2(d, 20, 0);
				c.Die();
				break;
			default:
				(c.HP -= a) < 1 && c.Die();
		}
	},
	NormalAttack(b, a) {
		var c = $Z[b];
		c.getHit2(c, this.Attack, 0);
	},
	GetDY(b, c, a) {
		return -2;
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
