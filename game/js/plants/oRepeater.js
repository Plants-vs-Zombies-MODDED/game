import { oPeashooter } from "./oPeashooter.js";

export var oRepeater = InheritO(oPeashooter, {
	EName: "oRepeater",
	CName: "Repeater",
	width: 73,
	height: 71,
	beAttackedPointR: 53,
	SunNum: 200,
	PicArr: [
		"images/Card/Plants/Repeater.webp",
		"images/Plants/Repeater/0.gif",
		"images/Plants/Repeater/Repeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Fires two peas at a time",
	Produce:
		'<font color="#28325A">Repeaters fire two peas at a time.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Firing speed: <font color="#CC241D">2x</font></p>Repeater is fierce. He\'s from the streets. He doesn\'t take attitude from anybody, plant or zombie, and he shoots peas to keep people at a distance. Secretly, though, Repeater yearns for love.',
	NormalAttack1: oPeashooter.prototype.NormalAttack,
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
