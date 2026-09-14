import { oSnowPea } from "./oSnowPea.js";

export var oSnowRepeater = InheritO(oSnowPea, {
	EName: "oSnowRepeater",
	CName: "Snow Repeater",
	SunNum: 250,
	PicArr: [
		"images/Card/Plants/SnowRepeater.webp",
		"images/Plants/SnowRepeater/0.gif",
		"images/Plants/SnowRepeater/SnowPea.gif",
		"images/Plants/PB-10.gif",
		"images/Plants/PeaBulletHit1.gif",
	],
	Tooltip: "Fires two frozen peas that damage and slow the enemy at a time",
	Produce:
		'<font color="#28325A">Snow Repeaters shoot 2 frozen peas that damage and slow the enemy.</font><p>Damage: <font color="#CC241D">normal, slows zombies</font><br>Firing Speed: <font color="#CC241D">2x</font></p>A Repeater that channels its inner Snow Pea. Fires two rapid, chilling peas that slow zombies to a crawl, because sometimes frostbite is better in bursts!',
	NormalAttack1: oSnowPea.prototype.NormalAttack,
	NormalAttack(a) {
		this.NormalAttack1();
		oSym.addTask(
			15,
			(c) => {
				var b = $P[c];
				b && b.NormalAttack1();
			},
			[this.id]
		);
	},
});
