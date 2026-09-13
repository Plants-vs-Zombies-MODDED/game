export var oSeedGarlic = InheritO(CPlants, {
	EName: "oSeedGarlic",
	CName: "Garlic",
	width: 60,
	height: 59,
	beAttackedPointR: 40,
	SunNum: 0,
	HP: 400,
	PicArr: [
		"images/Card/Plants/Garlic.webp",
		"images/Plants/Garlic/0.gif",
		"images/Plants/Garlic/Garlic.gif",
		"images/Plants/Garlic/Garlic_body2.gif",
		"images/Plants/Garlic/Garlic_body3.gif",
	],
	Tooltip: "Diverts zombies into other lanes",
	Produce:
		'大蒜可以让僵尸改变前进的路线。<p>Scope:<font color="#CC241D">近距离接触</font><br>Features:<font color="#CC241D">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他</font><br>的热情所在。他在布鲁塞尔大学里，获得了转向</font><br>学的博士学位。他能把路线向量和反击阵列，讲</font><br>上一整天。他甚至会把家里的东西，推到街上去</font><br>。不知道为啥，他老婆还可以忍受这些。',
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
