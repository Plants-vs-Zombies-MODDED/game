import { oWallNut } from "./oWallNut.js";

export var oSeedTallNut = InheritO(oWallNut, {
	EName: "oSeedTallNut",
	CName: "Tall-nut",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 0,
	HP: 8e3,
	coolTime: 24.5,
	PicArr: [
		"images/Card/Plants/TallNut.webp",
		"images/Plants/TallNut/0.gif",
		"images/Plants/TallNut/TallNut.gif",
		"images/Plants/TallNut/TallnutCracked1.gif",
		"images/Plants/TallNut/TallnutCracked2.gif",
	],
	Tooltip: "Heavy-duty wall that can't be vaulted over",
	Produce:
		'高坚果是重型壁垒植物，而且不会被跳过。<p>Toughness:<font color="#CC241D">非常高</font><br>特殊：<font color="#CC241D">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高</font><br>坚果以男中音的声调大声笑了。“我们之间怎么</font><br>会存在竞争关系？我们是哥们儿。你知道坚果墙</font><br>为我做了什么吗……”高坚果的声音越来越小，</font><br>他狡黠地笑着。”',
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
	Stature: 1,
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
