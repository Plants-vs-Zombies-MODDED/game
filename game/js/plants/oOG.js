export var oOG = InheritO(CPlants, {
	EName: "oOG",
	CName: "Oxygen",
	width: 72,
	height: 68,
	beAttackedPointR: 52,
	SunNum: 0,
	canEat: 0,
	BookHandBack: "Undersea",
	PicArr: ["images/Card/Plants/Oxygen.webp", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen1.gif"],
	PKind: 0,
	Stature: -1,
	GetDY(b, c, a) {
		return -15;
	},
	getShadow(a) {
		return "display:none";
		return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
	},
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	Tooltip: "",
	Produce: "",
	InitTrigger() {},
});
