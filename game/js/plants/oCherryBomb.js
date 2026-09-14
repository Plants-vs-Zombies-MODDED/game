export var oCherryBomb = InheritO(CPlants, {
	EName: "oCherryBomb",
	CName: "Cherry Bomb",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 150,
	coolTime: 20,
	AlmanacGif: 1,
	PicArr: [
		"images/Card/Plants/CherryBomb.webp",
		"images/Plants/CherryBomb/0.gif",
		"images/Plants/CherryBomb/CherryBomb.gif",
		"images/Plants/CherryBomb/Boom.gif" + $Random,
	],
	AudioArr: ["cherrybomb"],
	Tooltip: "Blows up all zombies in an area",
	Produce:
		'<font color="#28325A">Cherry Bombs can blow up all zombies in an area. They have a short fuse so plant them near zombies.</font><p>Harm: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a medium area</font><br>Usage: <font color="#CC241D">single use, instant</font></p>"I wanna explode," says Cherry #1. "No, let\'s detonate instead!" says his brother, Cherry #2. After intense consultation they agree to explodonate.',
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
