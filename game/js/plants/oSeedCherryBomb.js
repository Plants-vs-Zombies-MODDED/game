export var oSeedCherryBomb = InheritO(CPlants, {
	EName: "oSeedCherryBomb",
	CName: "Cherry Bomb",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 0,
	coolTime: 20,
	PicArr: [
		"images/Card/Plants/CherryBomb.webp",
		"images/Plants/CherryBomb/0.gif",
		"images/Plants/CherryBomb/CherryBomb.gif",
		"images/Plants/CherryBomb/Boom.gif" + $Random,
	],
	AudioArr: ["cherrybomb"],
	Tooltip: "Blows up all zombies in an area",
	Produce:
		'Cherry bomb can blow up all zombies in a certain area.</font><br>One will detonate immediately. So please plant them on zombies</font><br>around them.<p>Harm:<font color="#CC241D">huge</font><br>Scope:<font color="#CC241D">All zombies in a medium area</font><br>Instructions:<font color="#CC241D">Instant use, it explodes immediately</font></p>“I am going to explode. "Cherry No. 1 said. "No, we are</font><br>‘炸’开了!”Said its brother Cherry No. 2. After intense discussion</font><br>After discussion, they finally agreed on the term "explosion."”',
	InitTrigger() {},
	getHurt() {},
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(b) => {
				var c = $P[b];
				if (c) {
					PlaySound2("cherrybomb");
					var f = $(b);
					var j = c.R;
					var g = j > 2 ? j - 1 : 1;
					var e = j < oS.R ? j + 1 : oS.R;
					var l = c.pixelLeft - 80;
					var k = c.pixelLeft + 160;
					var d;
					var h;
					do {
						h = (d = oZ.getArZ(l, k, g)).length;
						while (h--) {
							d[h].getExplosion();
						}
					} while (g++ < e);
					c.Die(1);
					EditEle(
						f.childNodes[1],
						{
							src: c.PicArr[3] + Math.random(),
						},
						{
							width: "213px",
							height: "196px",
							left: "-50px",
							top: "-37px",
						}
					);
					oSym.addTask(120, ClearChild, [f]);
				}
			},
			[a.id]
		);
	},
});
