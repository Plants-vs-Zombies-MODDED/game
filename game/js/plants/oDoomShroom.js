import { oFumeShroom } from "./oFumeShroom.js";

export var oDoomShroom = InheritO(oFumeShroom, {
	EName: "oDoomShroom",
	CName: "Doom-shroom",
	width: 102,
	height: 91,
	beAttackedPointR: 80,
	coolTime: 50,
	SunNum: 125,
	AlmanacGif: 1,
	AudioArr: ["doomshroom"],
	BookHandPosition: "48% 58%",
	PicArr: [
		"images/Card/Plants/DoomShroom.webp",
		"images/Plants/DoomShroom/0.gif",
		"images/Plants/DoomShroom/DoomShroom.gif",
		"images/Plants/DoomShroom/Sleep.gif",
		"images/Plants/DoomShroom/BeginBoom.gif",
		"images/Plants/DoomShroom/crater10.png",
		"images/Plants/DoomShroom/crater11.png",
		"images/Plants/DoomShroom/crater20.png",
		"images/Plants/DoomShroom/crater21.png",
		"images/Plants/DoomShroom/crater30.png",
		"images/Plants/DoomShroom/crater31.png",
		"images/Plants/DoomShroom/Boom.png",
	],
	Tooltip: "Destroys a large area, leaving a crater in its wake",
	Produce:
		'<font color="#28325A">Doom-shrooms destroy everything in a large area and leave a crater that can\'t be planted on.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">all zombies in a huge area</font><br>Usage: <font color="#CC241D">single use, instant</font><br>Special: <font color="#CC241D">leaves a crater</font><br><font color="#8832aa">Sleeps during the day</font></p>"You\'re lucky I\'m on your side," says Doom-shroom. "I could destroy everything you hold dear. It wouldn\'t be hard."',
	InitTrigger() {},
	BirthStyle(c, d, b, a) {
		oS.DKind
			? ((c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]))
			: ((c.Sleep = 0), (c.getHurt = function () {}), (b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif"), c.NormalAttack(d));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	WakeUP(a) {
		var b = a.id;
		a.Sleep = 0;
		a.getHurt = function () {};
		$(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
		a.NormalAttack(b);
	},
	NormalAttack(a) {
		oSym.addTask(
			50,
			(c) => {
				PlaySound2("doomshroom");
				var d = $P[c];
				var q = c + "_Boom";
				if (d) {
					var g = $(c);
					var l = d.R;
					var h = l > 3 ? l - 2 : 1;
					var f = Math.min(oS.R, l + 2);
					var n = d.pixelLeft - 240;
					var m = d.pixelRight + 240;
					var e;
					var k;
					var b = GetC(d.AttackedLX);
					var o;
					var r = l + "_" + b;
					var j = oGd.$;
					do {
						k = (e = oZ.getArZ(n, m, h)).length;
						while (k--) {
							e[k].getExplosion();
						}
					} while (h++ < f);
					d.Die();
					(o = j[r + "_" + 0]) && o.Die();
					(o = j[r + "_" + 2]) && o.Die();
					oGd.$Crater[r] = 2;
					NewEle(
						q,
						"div",
						"position:absolute;overflow:hidden;z-index:" +
							(d.zIndex + 2) +
							";width:283px;height:324px;left:" +
							(d.pixelLeft - 80) +
							"px;top:" +
							(d.pixelTop - 220) +
							"px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat",
						0,
						EDPZ
					);
					oSym.addTask(
						20,
						(i) => {
							ClearChild(i);
						},
						[
							NewEle(
								q,
								"div",
								"position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5",
								0,
								EDPZ
							),
						]
					);
					ImgSpriter(
						q,
						c,
						[
							["0 0", 10, 1],
							["-283px 0", 10, 2],
							["-566px 0", 10, 3],
							["-849px 0", 10, 4],
							["-1132px 0", 10, 5],
							["-1415px 0", 10, 6],
							["-1698px 0", 10, 7],
							["-1981px 0", 10, 8],
							["-2264px 0", 10, 9],
							["-2547px 0", 10, -1],
						],
						0,
						(i, p) => {
							ClearChild($(i));
							d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50);
						}
					);
				}
			},
			[a]
		);
	},
	setCrater(f, b, d, e, c) {
		var a;
		switch (oGd.$LF[b]) {
			case 1:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" +
						oS.DKind +
						".png) no-repeat;width:90px;height:61px;left:" +
						(e || GetX(d) - 45) +
						"px;top:" +
						(c || GetY(b) - 30) +
						"px",
					0,
					EDPZ
				);
				break;
			case 2:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" +
						oS.DKind +
						".png) no-repeat;width:85px;height:53px;left:" +
						(e || GetX(d) - 42) +
						"px;top:" +
						(c || GetY(b) - 26) +
						"px",
					0,
					EDPZ
				);
				break;
			case 3:
				a = NewEle(
					f,
					"div",
					"position:absolute;z-index:" +
						(3 * b - 1) +
						";overflow:hidden;background:url(images/Plants/DoomShroom/crater31.png) no-repeat;width:75px;height:77px;left:" +
						(e || GetX(d) - 37) +
						"px;top:" +
						(c || GetY(b) - 19) +
						"px",
					0,
					EDPZ
				);
				break;
			default:
		}
		oSym.addTask(
			9e3,
			(g) => {
				var h = b + "_" + d;
				g.style.backgroundPosition = "100% 0";
				oGd.$Crater[h] = 1;
				oSym.addTask(
					9e3,
					(i, j) => {
						ClearChild(i);
						delete oGd.$Crater[j];
					},
					[g, h]
				);
			},
			[a]
		);
	},
});
