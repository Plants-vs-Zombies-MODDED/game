import { oFumeShroom } from "./oFumeShroom.js";

export var oHypnoShroom = InheritO(oFumeShroom, {
	EName: "oHypnoShroom",
	CName: "Hypno-shroom",
	width: 71,
	height: 78,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 75,
	coolTime: 30,
	HP: 0,
	BookHandPosition: "48% 61%",
	PicArr: [
		"images/Card/Plants/HypnoShroom.webp",
		"images/Plants/HypnoShroom/0.gif",
		"images/Plants/HypnoShroom/HypnoShroom.gif",
		"images/Plants/HypnoShroom/HypnoShroomSleep.gif",
	],
	Tooltip: "Makes a zombie fight for you",
	Produce:
		'<font color="#28325A">When eaten, Hypno-shrooms will make a zombie turn around and fight for you.</font><p>Usage: <font color="#CC241D">single use, on contact</font><br>Special: <font color="#CC241D">makes a zombie fight for you</font><br><font color="#8832aa">Sleeps during the day</font></p>"Zombies are our friends," asserts Hypno-shroom. "They\'re badly misunderstood creatures who play a valuable role in our ecology. We can and should do more to bring them round to our way of thinking."',
	InitTrigger() {},
	getHurt(d, b, a) {
		var c = this;
		switch (b) {
			case 3:
				(c.HP -= a) < 1 && c.Die();
				break;
			case 0:
				!c.Sleep && d.bedevil(d);
				d.EleBody.style.filter += " hue-rotate(180deg) saturate(2)";
				PlaySound2("mindcontrolled");
				c.Die();
				break;
			default:
				c.Die(1);
		}
	},
});
