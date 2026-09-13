import { oPuffShroom } from "./oPuffShroom.js";

export var oSeaShroom = InheritO(oPuffShroom, {
	EName: "oSeaShroom",
	CName: "Sea-shroom",
	width: 48,
	height: 99,
	beAttackedPointL: 10,
	beAttackedPointR: 40,
	coolTime: 30,
	BookHandBack: "NightPool",
	Sleep: 0,
	getShadow(a) {
		return "display:none";
	},
	BookHandPosition: "49% 90%",
	PicArr: [
		"images/Card/Plants/SeaShroom.webp",
		"images/Plants/SeaShroom/0.gif",
		"images/Plants/SeaShroom/SeaShroom.gif",
		"images/Plants/SeaShroom/SeaShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	Tooltip: "Aquatic plant that shoots short-ranged spores",
	Produce:
		'<font color="#28325A">Sea-shrooms are aquatic plants that shoot short ranged spores.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">short</font><br><font color="#0ca1db">Must be planted in water</font><br><font color="#8832aa">Sleeps during the day</font></p>Sea-shroom has never seen the sea. It\'s in his name, he\'s heard loads about it, but he\'s just never found the time. One day, though, it\'ll go down.',
});
