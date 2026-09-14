import { oRepeater } from "./oRepeater.js";

export var oSeedRepeater2 = InheritO(oRepeater, {
	EName: "oSeedRepeater2",
	CName: "Reverse Repeater",
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Repeater2.webp",
		"images/Plants/Repeater2/0.gif",
		"images/Plants/Repeater2/Repeater2.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
	],
	NormalAttack1() {
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
				m === 0 && g[i + "_" + e] && k !== e && (PlaySound2("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
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
							width: "52px",
							height: "46px",
						}).src = "images/Plants/PeaBulletHit.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, moveItem1, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 20, 1, a.AttackedLX + 30, a.R, 0, 0, a.AttackedRX, oGd.$Torch]
		);
	},
	getTriggerRange(a, b, c) {
		return [[100, b + 25, 1]];
	},
});
