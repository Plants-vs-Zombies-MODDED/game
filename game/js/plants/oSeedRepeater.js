import { oPeashooter } from "./oPeashooter.js";

export var oSeedRepeater = InheritO(oPeashooter, {
	EName: "oSeedRepeater",
	CName: "Repeater",
	width: 73,
	height: 71,
	beAttackedPointR: 53,
	SunNum: 0,
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
		'Dual shooters can shoot two peas at once<p>Harm:<font color="#CC241D">Medium (per piece)</font><br>Launch speed:<font color="#CC241D">double</font></p>The dual shooter is fierce, and he grew up on the street. Hes not in now</font><br>Regardless of anyones opinion, whether its a plant or a zombie, he fights</font><br>Out of peas, is to keep others away from him. Actually, double</font><br>The launcher has been secretly longing for love.',
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
