export var oCoffeeBean = InheritO(CPlants, {
	EName: "oCoffeeBean",
	CName: "Coffee Bean",
	width: 39,
	height: 97,
	beAttackedPointL: 10,
	beAttackedPointR: 29,
	SunNum: 75,
	PKind: 3,
	canEat: 0,
	BookHandPosition: "50% 95%",
	PicArr: [
		"images/Card/Plants/CoffeeBean.webp",
		"images/Plants/CoffeeBean/0.gif",
		"images/Plants/CoffeeBean/CoffeeBean.gif",
		"images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random,
	],
	AudioArr: ["coffee", "wakeup"],
	Tooltip: "Plant it on a mushroom to wake it up",
	Produce:
		'<font color="#28325A">Use Coffee Beans to wake up sleeping mushrooms.</font><p>Usage: <font color="#CC241D">single use, instant</font><br>Special: <font color="#CC241D">can be planted over another plant, wakes up mushrooms</font><p>"Hey, guys, hey!" says Coffee Bean. "Hey! What\'s up? Who\'s that? Hey! Didja see that thing? What thing? Whoa! Lions!" Yep, Coffee Bean sure does get excited.',
	InitTrigger() {},
	GetDBottom() {
		return 49;
	},
	GetDY() {
		return -30;
	},
	CanGrow(a, b) {
		return (b = a[1]) && b.Sleep && !a[3];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = this.PicArr[3] + Math.random();
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(a) {
		SetHidden($(a.id).firstChild);
		PlaySound2("coffee");
		oSym.addTask(
			240,
			(c) => {
				PlaySound2("wakeup");
				var d = oGd.$[c];
				var b;
				d && ((b = d.WakeUP), !b ? (($(d.id).childNodes[1].src = d.PicArr[d.NormalGif]), (d.canTrigger = 1), (d.Sleep = 0)) : b(d));
				a.Die();
			},
			[a.R + "_" + a.C + "_1"]
		);
	},
});
