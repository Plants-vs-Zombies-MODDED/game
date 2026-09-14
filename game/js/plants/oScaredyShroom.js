import { oFumeShroom } from "./oFumeShroom.js";

export var oScaredyShroom = InheritO(oFumeShroom, {
	EName: "oScaredyShroom",
	CName: "Scaredy-shroom",
	width: 57,
	height: 81,
	beAttackedPointR: 37,
	SunNum: 25,
	Cry: 0,
	ArZ: [],
	Attacking: 0,
	BookHandPosition: "46% 47%",
	PicArr: [
		"images/Card/Plants/ScaredyShroom.webp",
		"images/Plants/ScaredyShroom/0.gif",
		"images/Plants/ScaredyShroom/ScaredyShroom.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomSleep.gif",
		"images/Plants/ScaredyShroom/ScaredyShroomCry.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	Tooltip: "Long-ranged shooter that hides when enemies get near it",
	Produce:
		'<font color="#28325A">Scaredy-shrooms are long-ranged shooters that hide when enemies get near them.</font><p>Damage: <font color="#CC241D">normal, penetrates screen doors</font><br>Special: <font color="#CC241D">stops shooting when enemy is close</font><br><font color="#8832aa">Sleeps during the day</font></p>"Who\'s there?" whispers Scaredy-shroom, voice barely audible. "Go away. I don\'<|t want to see anybody. Unless it\'s the man from the circus."',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange: CPlants.prototype.getTriggerRange,
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	TriggerCheck(e, c) {
		var b = this;
		var a = b.id;
		e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked
			? (b.ArZ.push(e.id), !b.Cry && ((b.Cry = 1), ($(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif"), b.CryCheck(a)))
			: e.R === b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
	},
	PrivateBirth(c) {
		var b = c.AttackedLX;
		var a = b - 46;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2,
		});
		c.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2)
		);
		c.MX = b + 9;
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var c = this;
		var a = c.id;
		var d = "SSB" + Math.random();
		var b = c.AttackedLX;
		EditEle(
			c.BulletEle.cloneNode(false),
			{
				id: d,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			1,
			function moveShroom(k, e, f, g, h) {
				var j = GetC(f);
				var i = oZ.getZ0(f, g);
				i && i.Altitude === 1
					? (i.getPea(i, 20, 0),
						(SetStyle(e, {
							left: h + 38 + "px",
						}).src = "images/Plants/ShroomBulletHit.gif"),
						oSym.addTask(10, ClearChild, [e]))
					: (f += 5) < oS.W
						? ((e.style.left = (h += 5) + "px"), oSym.addTask(1, moveShroom, [k, e, f, g, h]))
						: ClearChild(e);
			},
			[d, $(d), b, c.R, b - 46]
		);
		c.Attacking = 1;
		oSym.addTask(
			10,
			(g, e) => {
				var f = $(g);
				f && SetVisible(f);
				oSym.addTask(
					130,
					(h) => {
						var i = $P[h];
						i && (i.Attacking = 0);
					},
					[e]
				);
			},
			[d, a]
		);
	},
	CryCheck(a) {
		oSym.addTask(
			140,
			(b) => {
				var d = $P[b];
				var c;
				var f;
				var e;
				if (d) {
					c = (f = d.ArZ).length;
					while (c--) {
						(!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1);
					}
					f.length ? d.CryCheck(b) : ((d.Cry = 0), ($(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif"));
				}
			},
			[a]
		);
	},
});
