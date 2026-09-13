export var oSeedStarfruit = InheritO(CPlants, {
	EName: "oSeedStarfruit",
	CName: "Starfruit",
	width: 77,
	height: 70,
	beAttackedPointR: 57,
	SunNum: 0,
	GetDY(b, c, a) {
		return a[0] ? -17 : -10;
	},
	PicArr: ["images/Card/Plants/Starfruit.webp", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
	Tooltip: "Shoots stars in 5 directions",
	Produce:
		'Starfruit can fire small starfruits in five directions.<p>Harm:<font color="#CC241D">medium</font><br>Scope:<font color="#CC241D">five directions</font></p>Starfruit: "Hey man, I went to the dentist one day and he said</font><br>I have four cavities. When I count, I only have one tooth! one</font><br>Carambola: "Hey man, theres a tooth with four cavities? Why is that?" I went to the dentist and he said',
	getTriggerRange(e, g, f) {
		var a = this.R;
		var b = GetY(a);
		var c = oS.W;
		var j = this.ArFlyTime;
		var h = this.ArHitX;
		var i;
		var d = 0.5 * (g + f);
		!j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));
		switch (true) {
			case e < a:
				j[e] = [(i = b - GetY(e)) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
			case e === a:
				return [[100, g + 25, 4]];
			default:
				j[e] = [(i = GetY(e) - b) / 5, i / 3];
				h[e] = [d, d + (i / 3) * 4];
				return [[100, c, 0]];
		}
	},
	AttackCheck2(l) {
		var j = l.R;
		if (j === this.R) {
			return l.Altitude > 0;
		}
		var q = 0;
		var t = l.AttackedLX;
		var b = l.AttackedRX;
		var e;
		var g;
		var d = this.ArFlyTime;
		var c = this.ArHitX;
		var s = d[j];
		var r = c[j];
		var f = l.WalkDirection ? -1 : 1;
		var k = false;
		var m;
		var p;
		var n;
		var h;
		var a = l.Speed;
		while (q < s.length) {
			h = a * s[q] * f * 0.1;
			e = Math.floor(t - h);
			g = Math.floor(b - h);
			p = r[0];
			n = r[1];
			if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
				k = true;
				break;
			}
			++q;
		}
		return k && l.Altitude > 0;
	},
	getTriggerR(a) {
		return [1, oS.R];
	},
	PrivateBirth(d) {
		var c = d.pixelLeft + 38;
		var b = c - 15;
		var a = d.pixelTop + 20;
		d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	getHurt(d, b, a) {
		var c = this;
		b !== 3 && c.NormalAttack();
		(c.HP -= a) < 1 && c.Die();
	},
	NormalAttack() {
		var g = this;
		var f = g.pixelLeft + 38;
		var d = f - 15;
		var b = g.pixelTop + 20;
		var c = g.R;
		var e = f + 15;
		var a = function (j, i, h) {
			return j && j.Altitude === 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true;
		};
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function moveItem1(m, k, l, i, j) {
					j(oZ.getZ1(m, k), 4, i) &&
						((m -= 5) < 100 ? ClearChild(i) : ((i.style.left = (l -= 5) + "px"), oSym.addTask(1, moveItem1, [m, k, l, i, j])));
				},
				[
					f,
					c,
					d,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function moveItem2(m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 6, i) &&
						((k -= 5) < -15 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, moveItem2, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function moveItem3(m, n, l, k, i, j) {
					j(oZ.getRangeLeftZ(m, n, l), 2, i) &&
						((k += 5) > 600 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, moveItem3, [m, n, GetR(k + 15), k, i, j])));
				},
				[
					d,
					e,
					c,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function moveItem4(n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 7, i) &&
						((n += 4) > 900 || (k -= 3) < -15
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, moveItem4, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
		(function (h) {
			oSym.addTask(
				15,
				(j) => {
					var i = $(j);
					i && SetVisible(i);
				},
				[h]
			);
			oSym.addTask(
				1,
				function moveItem5(n, l, m, k, i, j) {
					j(oZ.getZ0(n, l), 1, i) &&
						((n += 4) > 900 || (k += 3) > 600
							? ClearChild(i)
							: (SetStyle(i, {
									left: (m += 4) + "px",
									top: k + "px",
								}),
								oSym.addTask(1, moveItem5, [n, GetR(k + 15), m, k, i, j])));
				},
				[
					f,
					c,
					d,
					b,
					EditEle(
						g.BulletEle.cloneNode(false),
						{
							id: h,
						},
						0,
						EDPZ
					),
					a,
				]
			);
		})("StarB" + Math.random());
	},
});
