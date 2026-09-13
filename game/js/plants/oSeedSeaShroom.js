import { oPuffShroom } from "./oPuffShroom.js";

export const oSeedSeaShroom = InheritO(oPuffShroom, {
	EName: "oSeedSeaShroom",
	CName: "Sea-shroom",
	width: 48,
	height: 99,
	beAttackedPointL: 10,
	beAttackedPointR: 40,
	coolTime: 30,
	BookHandBack: "Pool",
	Sleep: 0,
	getShadow(a) {
		return "display:none";
	},
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
		'海蘑菇，能够发射短程孢子的水生植物。<p>Harm:<font color="#CC241D">普通</font><br>射程：<font color="#CC241D">短<br>必须种在水上</font></p>海蘑菇从来没看到过大海，大海就在他的名字</font><br>里，他总听到关于大海的事。他只是没找到合适的</font><br>时间，总有一天……是的，他会见到海的。',
});
