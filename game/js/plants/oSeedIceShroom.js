import { oSeedFumeShroom } from "./oSeedFumeShroom.js";

export var oSeedIceShroom = InheritO(oSeedFumeShroom, {
	EName: "oSeedIceShroom",
	CName: "Ice-shroom",
	width: 83,
	height: 75,
	beAttackedPointR: 63,
	SunNum: 0,
	coolTime: 50,
	PicArr: [
		"images/Card/Plants/IceShroom.webp",
		"images/Plants/IceShroom/0.gif",
		"images/Plants/IceShroom/IceShroom.gif",
		"images/Plants/IceShroom/IceShroomSleep.gif",
		"images/Plants/IceShroom/Snow.gif",
		"images/Plants/IceShroom/icetrap.gif",
	],
	AudioArr: ["frozen", "wakeup"],
	Tooltip: "Temporarily immobilizes all zombies on the screen",
	Produce:
		'寒冰菇，能短暂的冻结屏幕上所有僵尸。<p>Harm:<font color="#CC241D">非常低，冻结僵尸</font><br>Scope:<font color="#CC241D">屏幕上的所有僵尸</font><br>用法：<font color="#CC241D">单独使用，立即生效<br>白天睡觉</font></p>寒冰菇皱着眉头，倒不是因为它不高兴或不满</font><br>意，只是因为，它儿时因受创伤而</font><br>遗留下了面瘫。',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth(a) {
		!oS.DKind ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {})) : (a.getHurt = CPlants.prototype.getHurt);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		$(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			100,
			(c) => {
				var f = $P[c];
				if (f) {
					PlaySound2("frozen");
					var e;
					var d;
					var b = "Snow_" + Math.random();
					for (d in $Z) {
						(e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
					}
					oSym.addTask(
						40,
						(g) => {
							ClearChild(g);
						},
						[
							NewEle(
								b,
								"div",
								"position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " +
									(f.pixelLeft - 197) +
									"px " +
									(f.pixelTop - 80) +
									"px",
								0,
								EDPZ
							),
						]
					);
					f.Die();
				}
			},
			[a]
		);
	},
});
