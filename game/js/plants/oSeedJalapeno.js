import { oCherryBomb } from "./oCherryBomb.js";

export var oSeedJalapeno = InheritO(oCherryBomb, {
	EName: "oSeedJalapeno",
	CName: "Jalapeno",
	width: 68,
	height: 89,
	SunNum: 0,
	beAttackedPointR: 48,
	PicArr: [
		"images/Card/Plants/Jalapeno.webp",
		"images/Plants/Jalapeno/0.gif",
		"images/Plants/Jalapeno/Jalapeno.gif",
		"images/Plants/Jalapeno/JalapenoAttack.gif",
	],
	AudioArr: ["jalapeno"],
	Tooltip: "Destroys an entire lane of zombies",
	Produce:
		'火爆辣椒可以摧毁一整条线上的敌人。<p>Harm:<font color="#CC241D">极高</font><br>Scope:<font color="#CC241D">整条线上的僵尸</font><br>用法：<font color="#CC241D">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎!!!”火爆辣椒说。他现在</font><br>不会爆炸，还不到时候，不过快了，喔~，快了快</font><br>了，快来了。他知道，他感受到了，他一生都是</font><br>在等待这个时刻!',
	PrivateBirth(a) {
		oSym.addTask(
			40,
			(j) => {
				var h = $P[j];
				if (h) {
					PlaySound2("jalapeno");
					var b = $(j);
					var f = h.R;
					var c = oZ.getArZ(100, oS.W, f);
					var e = c.length;
					var g = oGd.$Ice[f];
					var d = oGd.$Crater;
					while (e--) {
						c[e].getExplosion();
					}
					h.Die(1);
					EditEle(
						b.childNodes[1],
						{
							src: "images/Plants/Jalapeno/JalapenoAttack.gif",
						},
						{
							width: "755px",
							height: "131px",
							left: 120 - h.pixelLeft + "px",
							top: "-42px",
						}
					);
					oSym.addTask(135, ClearChild, [b]);
					ClearChild($("dIceCar" + f));
					if (g) {
						for (e = g[1]; e < 11; e++) {
							delete d[f + "_" + e];
						}
					}
				}
			},
			[a.id]
		);
	},
});
