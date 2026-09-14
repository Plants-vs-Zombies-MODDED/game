export var oPumpkinHead = InheritO(CPlants, {
	EName: "oPumpkinHead",
	CName: "Pumpkin",
	width: 97,
	height: 67,
	beAttackedPointL: 15,
	beAttackedPointR: 82,
	SunNum: 125,
	PKind: 2,
	HP: 4e3,
	coolTime: 30,
	zIndex: 1,
	BookHandPosition: "50% 76%",
	PicArr: [
		"images/Card/Plants/PumpkinHead.webp",
		"images/Plants/PumpkinHead/0.gif",
		"images/Plants/PumpkinHead/PumpkinHead.gif",
		"images/Plants/PumpkinHead/PumpkinHead1.gif",
		"images/Plants/PumpkinHead/PumpkinHead2.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage1.gif",
		"images/Plants/PumpkinHead/Pumpkin_damage2.gif",
		"images/Plants/PumpkinHead/Pumpkin_back.gif",
		"images/Plants/PumpkinHead/PumpkinHead1_static.webp",
	],
	Tooltip: "Protects plants that are within its shell",
	Produce:
		'<font color="#28325A">Pumpkins protect plants that are within their shells.</font><p>Toughness: <font color="#CC241D">high</font><br>Special: <font color="#CC241D">can be planted over another plant</font></p>Pumpkin hasn\'t heard from his cousin Renfield lately. Apparently Renfield\'s a big star, some kind of... what was it... sports hero? Peggle Master? Pumpkin doesn\'t really get it. He just does his job.',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return c[2] ? 1 : oGd.$LF[b] === 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
	},
	GetDY(b, c, a) {
		return a[0] ? -12 : -5;
	},
	HurtStatus: 0,
	getHurt(e, c, b) {
		var d = this;
		var f = d.id;
		var a = $(f);
		switch (true) {
			case c && c < 3:
				d.Die(1);
				break;
			case (d.HP -= b) < 1:
				d.Die();
				break;
			case d.HP < 1334:
				d.HurtStatus < 2 && ((d.HurtStatus = 2), (a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage2.gif"));
				break;
			case d.HP < 2667:
				d.HurtStatus < 1 &&
					((d.HurtStatus = 1),
					(a.childNodes[1].src = "images/Plants/PumpkinHead/Pumpkin_damage1.gif"),
					($(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif"));
		}
	},
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
		NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_2"));
	},
});
