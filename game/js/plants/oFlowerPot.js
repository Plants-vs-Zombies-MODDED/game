export var oFlowerPot = InheritO(CPlants, {
	EName: "oFlowerPot",
	CName: "Flower Pot",
	width: 72,
	height: 68,
	beAttackedPointR: 52,
	SunNum: 25,
	BookHandBack: "Roof",
	//	HP: 1e3,
	BookHandPosition: "49% 67%",
	PicArr: ["images/Card/Plants/FlowerPot.webp", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
	PKind: 0,
	Stature: -1,
	GetDY(b, c, a) {
		return 6;
	},
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	Tooltip: "Lets you plant on the roof",
	Produce:
		'<font color="#28325A">Flower Pots let you plant on the roof.</font><p>Special: <font color="#CC241D">allows you to plant on the roof</font></p>"I\'m a pot for planting. Yet I\'m also a plant. HAS YOUR MIND EXPLODED YET?"',
	InitTrigger() {},
});
