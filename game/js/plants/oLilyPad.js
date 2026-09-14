import { oFlowerPot } from "./oFlowerPot.js";

export var oLilyPad = InheritO(oFlowerPot, {
	BookHandBack: "Pool",
	Stature: -1,
	EName: "oLilyPad",
	CName: "LilyPad",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	//     HP: 1e3,
	BookHandPosition: "50% 82.5%",
	PicArr: ["images/Card/Plants/LilyPad.webp", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
	getShadow(a) {
		return "display: none;";
	},
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	Tooltip: "Lilypads allow you to grow non-aquatic plants on them。",
	Produce:
		'<font color="#28325A">Lily pads let you plant non-aquatic plants on top of them.</font><p>Special: <font color="#CC241D">non-aquatic plants can be planted on top of it</font><br><font color="#0ca1db">Must be planted in water</font></p>Lily Pad never complains. Lily Pad never wants to know what\'s going on. Put a plant on top of Lily Pad, he won\'t say a thing. Does he have startling opinions or shocking secrets? Nobody knows. Lily Pad keeps it all inside.',
});
