import { oFlowerPot } from "./oFlowerPot.js";

export var oILilyPad = InheritO(oFlowerPot, {
	BookHandBack: "Pool",
	Stature: -2,
	EName: "oILilyPad",
	CName: "LilyPad",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	HP: 1e3,
	PicArr: ["images/Card/Plants/LilyPad.webp", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
	getShadow(a) {
		return "left:-8px;top:25px";
	},
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	Tooltip: "Lilypads allow you to grow non-aquatic plants on them。",
	Produce:
		'Lilypads allow you to grow non-aquatic plants on top of them。<p>Features:<font color="#CC241D">Non-aquatic plants can be planted on it<br>Must be planted on water</font></p>Lilypad never complains, it never wants to know what happened</font><br> Plant a plant on it and it wont say anything.</font><br>，Does it have any surprising ideas or terrible secrets?？</font><br>Lotus Ye buries all these inside of her heart。',
});
