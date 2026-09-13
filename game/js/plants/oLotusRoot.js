import { oPeashooter } from "./oPeashooter.js";

export var oLotusRoot = InheritO(oPeashooter, {
	EName: "oLotusRoot",
	CName: "Lotus Root",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 250,
	BookHandBack: "Pool",
	coolTime: 25,
	getShadow(a) {
		return "display:none";
	},
	BookHandPosition: "58% 75%",
	PicArr: [
		"images/Card/Plants/LotusRoot.webp",
		"images/Plants/LotusRoot/0.gif",
		"images/Plants/LotusRoot/Peashooter.gif",
		"images/Plants/LotusRoot/Missile.png",
		"images/Plants/LotusRoot/BulletHit.png",
	],
	Tooltip: "Fire high-powered rocket launchers, inflicting heavy damage",
	Produce:
		'The lotus root rocket launcher can launch high-fire rocket launchers, targeting warships and</font><br>The submarine inflicted heavy damage.<p>Harm:<font color="#CC241D">极高</font></p>What else can the lotus root rocket launcher do besides firing shells. Ok,</font><br>For this question, you should ask the intensive phobia patient</font><br>。”',
	CanGrow(c, b, d) {
		var a = b + "_" + d;
		return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a]);
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(o) => {
				$(a.id).childNodes[1].src = "images/Plants/LotusRoot/Peashooter.gif";
			},
			[this]
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function moveItem1(f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m === 0 && g[i + "_" + e] && k !== e && (PlaySound2("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/LotusRoot/Missile.png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/LotusRoot/BulletHit.png"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, moveItem1, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 500, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
