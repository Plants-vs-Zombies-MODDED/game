export var oSeedBlover = InheritO(CPlants, {
	EName: "oSeedBlover",
	CName: "Blover",
	width: 146,
	beAttackedPointR: 98,
	height: 110,
	SunNum: 0,
	PicArr: ["images/Card/Plants/Blover.webp", "images/Plants/Blover/0.gif", "images/Plants/Blover/Blover.gif"],
	Tooltip: "Blows away all balloon zombies and fog",
	Produce:
		'三叶草，能吹走所有的气球僵尸，也可以把雾吹散。<p>使用方法：<font color="#CC241D">单独使用，立即生效</font><br>特点：<font color="#CC241D">吹走屏幕上所有的气球僵尸</font></p>当三叶草五岁生日的时候，他得到了一个闪亮的生日蛋糕。他许好愿，然后深吸一口气却只吹灭了60%的蜡烛。然而他没有放弃，小时候的那次失败促使他更加努力直到现在。',
	AudioArr: ["blover"],
	InitTrigger() {},
	PrivateBirth(o) {
		// 种植后0.5秒开始吹风
		oSym.addTask(
			50,
			(id) => {
				(PlaySound2("blover"), ($(id).childNodes[1].src = "images/Plants/Blover/BloverBlow.gif"), $P[id].Dispel());
			},
			[o.id]
		);
	},
	Dispel() {
		// 吹风
		var { id } = this;
		var z;
		var oBalloon;

		for (z in $Z) {
			((oBalloon = $Z[z]), oBalloon.EName === "oBalloonZombie" && oBalloon.getDispelled());
		} //把气球吹跑

		if (oS.HaveFog) {
			// 如果场地上有雾，驱散
			oGd.MoveFogRight(); // 驱散雾
			oSym.addTask(2400 + 150, oGd.MoveFogLeft, []); // 24s后恢复
		}

		oSym.addTask(
			150,
			(id) => {
				var p = $P[id];
				p && p.Die();
			},
			[id]
		);
	},
});
