import { oPeashooter } from "./oPeashooter.js";

export var oSplitPea = InheritO(oPeashooter, {
	EName: "oSplitPea",
	CName: "Split Pea",
	width: 92,
	height: 72,
	beAttackedPointR: 72,
	SunNum: 125,
	BookHandPosition: "46% 62%",
	PicArr: [
		"images/Card/Plants/SplitPea.webp",
		"images/Plants/SplitPea/0.gif",
		"images/Plants/SplitPea/SplitPea.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PB01.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Shoots peas forward and backwards",
	Produce:
		'<font color="#28325A">Split Peas shoot peas forward and backwards.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">forward and backwards</font><br>Firing speed: <font color="#CC241D">1x forward, 2x backwards</font></p>"Yeah, I\'m a Gemini," says Split Pea. "I know, big surprise. But having two heads --or really, one head with a large head-like growth on the back-- pays off big in my line of work."',
	GetDX() {
		return -55;
	},
	getShadow(a) {
		return "left:5px;top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [
			[100, b + 25, 1],
			[b + 26, oS.W, 0],
		];
	},
	PrivateBirth(c) {
		var b = c.PicArr;
		var a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
		((c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)]), (c.aTri = [0, 0]));
	},
	PrivateDie(a) {
		a.BulletEle.length = 0;
	},
	TriggerCheck(b, a) {
		if (this.aTri[a]) {
			return;
		}
		if (this.AttackCheck2(b)) {
			++this.aTri[a];
			this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
			this.CheckLoop(b.id, a);
		}
	},
	AttackCheck1(b, f) {
		var e = this;
		var c = $Z[b];
		var a;
		if (c && c.PZ && c.R === e.R) {
			a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
			f === a ? (e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f]) : (++e.aTri[a], --e.aTri[f]);
		} else {
			--e.aTri[f];
		}
		e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1;
	},
	CheckLoop(a, b) {
		this.NormalAttack(b);
		oSym.addTask(
			140,
			(c, e, g) => {
				var f;
				(f = $P[c]) && f.AttackCheck1(e, g);
			},
			[this.id, a, b]
		);
	},
	NormalAttack(c) {
		var d = this;
		var e;
		var a = c
			? (oSym.addTask(
					15,
					(f) => {
						$P[f] && b(1);
					},
					[d.id]
				),
				d.AttackedRX - 16)
			: d.AttackedLX - 40;
		var b = function () {
			EditEle(
				d.BulletEle[c].cloneNode(false),
				{
					id: (e = "PB" + Math.random()),
				},
				0,
				EDPZ
			);
			oSym.addTask(
				15,
				(g) => {
					var f = $(g);
					f && SetVisible(f);
				},
				[e]
			);
			const moveBullet = function (i, m, k, f, q, l, p, n, r, j) {
				var o;
				var h = GetC(q);
				var g = oZ["getZ" + f](q, l);
				p === 0 && j[l + "_" + h] && n !== h && (PlaySound2("firepea"), (p = 1), (k = 40), (n = h), (m.src = "images/Plants/PB" + p + f + ".png"));
				g && g.Altitude === 1
					? (g[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[p]
						](g, k, f),
						(SetStyle(m, {
							left: r + 28 + "px",
						}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][m]),
						oSym.addTask(10, ClearChild, [m]))
					: (q += o = !f ? 5 : -5) < oS.W && q > 100
						? ((m.style.left = (r += o) + "px"), oSym.addTask(1, moveBullet, [i, m, k, f, q, l, p, n, r, j]))
						: ClearChild(m);
			};
			oSym.addTask(1, moveBullet, [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch]);
		};
		b();
	},
});
