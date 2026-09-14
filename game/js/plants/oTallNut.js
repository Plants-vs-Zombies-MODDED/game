import { oWallNut } from "./oWallNut.js";

export var oTallNut = InheritO(oWallNut, {
	EName: "oTallNut",
	CName: "Tall-nut",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 125,
	HP: 8e3,
	coolTime: 24.5,
	Stature: 1,
	BookHandPosition: "50% 75%",
	PicArr: [
		"images/Card/Plants/TallNut.webp",
		"images/Plants/TallNut/0.gif",
		"images/Plants/TallNut/TallNut.gif",
		"images/Plants/TallNut/TallnutCracked1.gif",
		"images/Plants/TallNut/TallnutCracked2.gif",
	],
	Tooltip: "Heavy-duty wall that can't be vaulted over",
	Produce:
		'<font color="#28325A">Tall-nuts are heavy-duty wall plants that can\'t be vaulted over.</font><p>Toughness: <font color="#CC241D">very high</font><br>Special: <font color="#CC241D">can\'t be vaulted or jumped over</font><p>People wonder if there\'s a rivalry between Wall-nut and Tall-nut. Tall-nut laughs a rich, baritone laugh. "How could there be anything between us? We are brothers. If you knew what Wall-nut has done for me..." Tall-nut\'s voice trails off and he smiles knowingly.',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oTallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 2667
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/TallNut/TallnutCracked2.gif"))
					: c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/TallNut/TallnutCracked1.gif"))
			: c.Die(1);
	},
});
