export var oSpikeweed = InheritO(CPlants, {
	EName: "oSpikeweed",
	CName: "Spikeweed",
	width: 85,
	height: 48,
	beAttackedPointL: 10,
	beAttackedPointR: 75,
	SunNum: 100,
	Stature: -1,
	canEat: 0,
	BookHandPosition: "50% 78%",
	PicArr: [
		"images/Card/Plants/Spikeweed.webp",
		"images/Plants/Spikeweed/0.png",
		"images/Plants/Spikeweed/Spikeweed.webp",
		"images/Plants/Spikeweed/SpikeweedAttack.webp",
	],
	Attack: 20,
	ArZ: {},
	Tooltip: "Pops tires and hurts zombies that step on it",
	Produce:
		'<font color="#28325A">Spikeweeds pop tires and hurt any zombies that step on them.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">all zombies that walk over it</font><br>Special: <font color="#CC241D">can\'t be eaten by zombies</font></p>Hockey is Spikeweed\'s obsession. He\'s got box seat season tickets. He keeps close track of his favorite players. And he consistently cleans up in the office hockey pool. Just one problem: he\'s terrified of pucks.',
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

		var id = this.id;
		var ele = $(id);

		ele.childNodes[1].src = this.PicArr[3];

		this.AttackState = (this.AttackState || 0) + 1;

		oSym.addTask(
			60,
			(plantId) => {
				var p = $P[plantId];
				if (p) {
					p.AttackState--;
					if (p.AttackState <= 0) {
						p.AttackState = 0;
						$(plantId).childNodes[1].src = p.PicArr[2];
					}
				}
			},
			[id]
		);
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
