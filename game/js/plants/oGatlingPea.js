import { oPeashooter } from "./oPeashooter.js";

export var oGatlingPea = InheritO(oPeashooter, {
	EName: "oGatlingPea",
	CName: "Gatling Pea",
	width: 88,
	height: 84,
	beAttackedPointR: 68,
	SunNum: 250,
	BookHandPosition: "51% 57%",
	PicArr: [
		"images/Card/Plants/GatlingPea.webp",
		"images/Plants/GatlingPea/0.gif",
		"images/Plants/GatlingPea/GatlingPea.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: 'shoots four peas at a time <p> <font color="red">(requires repeater)</font>',
	Produce:
		'<font color="#28325A">Gatling Peas shoot four peas at a time.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Firing Speed: <font color="#CC241D">4x</font><br>Must be planted on repeaters<p>Gatling Pea\'s parents were concerned when he announced his intention to join the military. "But honey, it\'s so dangerous!" they said in unison. Gatling Pea refused to budge. "Life is dangerous," he replied, eyes glinting with steely conviction.',
	PrivateBirth(c) {
		var b = c.AttackedLX;
		var a = b - 40;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			D: 0,
			Attack: 20,
			Kind: c.BKind,
			ChangeC: 0,
			pixelLeft: a,
			F: oGd.MB1,
		});
		c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
	},
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oRepeater";
	},
	NormalAttack1: oPeashooter.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		const repeatAttack = function (d, b) {
			var c = $P[d];
			c && c.NormalAttack1();
			--b && oSym.addTask(15, repeatAttack, [d, b]);
		};
		oSym.addTask(15, repeatAttack, [this.id, 3]);
	},
});
