import { oFlowerVase } from "./oFlowerVase.js";

export var oSeedPlantern = InheritO(CPlants, {
	EName: "oSeedPlantern",
	CName: "Plantern",
	width: 250,
	height: 237,
	beAttackedPointL: 105,
	beAttackedPointR: 145,
	coolTime: 30,
	BookHandBack: "Night",
	SunNum: 0,
	PicArr: ["images/Card/Plants/Plantern.webp", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif", "images/Plants/Plantern/light.gif"],
	Tooltip: "照亮一片区域, 让玩家可以看穿战场迷雾",
	Produce:
		'灯笼草，能照亮一片区域，让你看清战场迷雾<p>范围：<font color="#CC241D">一片圆形区域</font><br>特点：<font color="#CC241D">使你看清战场迷雾</font></p>灯笼草拒绝科学，他只会埋头苦干。其他植物吃的是光，挤出的是氧气。灯笼草吃的是黑暗，挤出的却是光。对于他如何能产生光这件事，灯笼草持谨慎态度。“我不会说这是‘巫术’，我也不会使用‘黑暗力量’，我只是……我想我说得够多的了。”',
	PrivateBirth(c) {
		var a = c.R;
		var b = c.C;
		oGd.$Plantern[a + "_" + b] = c.id;
		NewImg("", "images/Plants/Plantern/light.gif", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
		(oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0), oFlowerVase.prototype.FreshXRay()); // 刷新场地上花瓶 XRAY
	},
	InitTrigger() {},
	PrivateDie(c) {
		var a = c.R;
		var b = c.C;
		delete oGd.$Plantern[a + "_" + b];
		(oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1), oFlowerVase.prototype.FreshXRay()); // 刷新场地上花瓶 XRAY
	},
	GetDY(b, c, a) {
		return a[0] ? 70 : 74;
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px";
	},
});
