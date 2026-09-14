import { oWallNut } from "./oWallNut.js";

export var oLing = InheritO(oWallNut, {
	EName: "oLing",
	CName: "Water-nut",
	width: 90,
	height: 72,
	beAttackedPointL: 15,
	beAttackedPointR: 80,
	BookHandBack: "Pool",
	HP: 1e4,
	getShadow(a) {
		return "display:none";
	},
	PicArr: ["images/Card/Plants/Ling.webp", "images/Plants/Ling/0.gif", "images/Plants/Ling/Ling.gif"],
	Tooltip: "Nanhu Ling is the first obstacle in the water",
	Produce:
		'Nanhu Ling is the first obstacle in the water<p>Toughness:<font color="CC241D">high</font></p>Look, how big is a cashew nut?</font><br>He said, but he didnt care. In Nanhulings head, every day only</font><br>think about one thing"If Qianlong didnt open the golden mouth, I wouldnt be able to use it</font><br>Horn to stab zombies? !"',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 1334
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Ling/Ling.gif"))
					: c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Ling/Ling.gif"))
			: c.Die(1);
	},
});
