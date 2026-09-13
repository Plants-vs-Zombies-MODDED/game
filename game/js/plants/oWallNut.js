export var oWallNut = InheritO(CPlants, {
	EName: "oWallNut",
	CName: "Wall-Nut",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: 50,
	coolTime: 15.5,
	HP: 4e3,
	PicArr: [
		"images/Card/Plants/WallNut.webp",
		"images/Plants/WallNut/0.webp",
		"images/Plants/WallNut/WallNut.webp",
		"images/Plants/WallNut/Wallnut_cracked1.webp",
		"images/Plants/WallNut/Wallnut_cracked2.webp",
	],
	Tooltip: "Blocks off zombies and protects your other plants",
	Produce:
		'<font color="#28325A">Wall-nuts have hard shells which you can use to protect your other plants.</font><p>Toughness: <font color="CC241D">high</font></p>"People wonder how I feel about getting constantly chewed on by zombies," says Wall-nut. "What they don\'t realize is that with my limited senses all I can feel is a kind of tingling, like a relaxing back rub."',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oWallNut"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/WallNut/Wallnut_cracked2.webp"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/WallNut/Wallnut_cracked1.webp"))
			: c.Die(1);
	},
});
