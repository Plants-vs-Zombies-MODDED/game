import { oFumeShroom } from "./oFumeShroom.js";

export var oSeedHypnoShroom = InheritO(oFumeShroom, {
	EName: "oSeedHypnoShroom",
	CName: "Hypno-shroom",
	width: 71,
	height: 78,
	beAttackedPointL: 10,
	beAttackedPointR: 61,
	SunNum: 0,
	coolTime: 30,
	HP: 0,
	PicArr: [
		"images/Card/Plants/HypnoShroom.webp",
		"images/Plants/HypnoShroom/0.gif",
		"images/Plants/HypnoShroom/HypnoShroom.gif",
		"images/Plants/HypnoShroom/HypnoShroomSleep.gif",
	],
	Tooltip: "Makes a zombie fight for you",
	Produce:
		'当僵尸吃下魅惑菇后，他将会掉转方向为你作</font><br>战。<p>Instructions:<font color="#CC241D">单独使用，接触生效</font><br>Features:<font color="#CC241D">让一只僵尸为你作战<br>白天睡觉</font></p>魅惑菇声称：“僵尸们是我们的朋友，他们被</font><br>严重误解了，僵尸们在我们的生态环境里扮演着</font><br>重要角色。我们可以也应当更努力地让他们学</font><br>会用我们的方式来思考。”',
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
