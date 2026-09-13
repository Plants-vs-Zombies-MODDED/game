import { oFlowerVase } from "./oFlowerVase.js";

export var oPlantern = InheritO(CPlants, {
	EName: "oPlantern",
	CName: "Plantern",
	width: 250,
	height: 242,
	beAttackedPointL: 105,
	beAttackedPointR: 145,
	canEat: 1,
	BookHandBack: "Night",
	SunNum: 25,
	BookHandPosition: "50% 20%",
	PicArr: ["images/Card/Plants/Plantern.webp", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif"],
	Tooltip: "Lights up an area, letting you see through fog",
	Produce:
		"<font color=\"#28325A\">Planterns light up an area, letting you see through fog.</font><p>Range: <font color=\"#CC241D\">one lane</font><br>Special: <font color=\"#CC241D\">lets you see through fog</font><p>Plantern defies science. He just does. Other plants eat light and excrete oxygen; Plantern eats darkness and excretes light. Plantern's cagey about how he does it. \"I'm not gonna say 'sorcery,' I wouldn't use the term 'dark forces,' I just... I think I've said enough.\"",
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
