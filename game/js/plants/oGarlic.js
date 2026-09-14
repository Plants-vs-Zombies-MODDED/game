export var oGarlic = InheritO(CPlants, {
	EName: "oGarlic",
	CName: "Garlic",
	width: 60,
	height: 59,
	beAttackedPointR: 40,
	SunNum: 50,
	HP: 400,
	BookHandPosition: "49% 67%",
	PicArr: [
		"images/Card/Plants/Garlic.webp",
		"images/Plants/Garlic/0.gif",
		"images/Plants/Garlic/Garlic.gif",
		"images/Plants/Garlic/Garlic_body2.gif",
		"images/Plants/Garlic/Garlic_body3.gif",
	],
	Tooltip: "Diverts zombies into other lanes",
	Produce:
		'<font color="#28325A">Garlic diverts zombies into other lanes.</font><p>Usage: <font color="#CC241D">on contact</font><br>Special: <font color="#CC241D">diverts zombies into other lanes</font><p>Lane-diversion isn\'t just Garlic\'s profession. It\'s his passion. He carries an advanced Doctorate in Redirection from the Brussels University. He\'ll talk all day about lane vectors and repulse arrays. He even pushes things into alternate avenues at home. Somehow his wife puts up with it.',
	CanGrow(c, b, f) {
		var a = b + "_" + f;
		var d = c[1];
		var e = oS.ArP;
		return e
			? oGd.$LF[b] === 1
				? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
				: c[0] && !d
			: d && d.EName === "oGarlic"
				? 1
				: oGd.$LF[b] === 1
					? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
					: c[0] && !d;
	},
	InitTrigger() {},
	HurtStatus: 0,
	getHurt(e, b, a) {
		let yuckrng = Math.floor(Math.random() * 2) + 1; // note the uppercase M in Math
		if (yuckrng === 1) {
			PlaySound2("yuck");
		} else if (yuckrng === 2) {
			PlaySound2("yuck2");
		}
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= 20) < 1
				? c.Die()
				: (e.ChangeR({
						R: c.R,
					}),
					c.HP < 134
						? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Garlic/Garlic_body3.gif"))
						: c.HP < 267 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Garlic/Garlic_body2.gif")))
			: c.Die(1);
	},
});
