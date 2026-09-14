import { oFumeShroom } from "./oFumeShroom.js";

export var oSunShroom = InheritO(oFumeShroom, {
	EName: "oSunShroom",
	CName: "Sun-shroom",
	width: 59,
	height: 61,
	beAttackedPointL: 15,
	beAttackedPointR: 44,
	SunNum: 25,
	Stature: -1,
	Status: 0,
	AlmanacGif: 4,
	BookHandPosition: "49% 58%",
	PicArr: [
		"images/Card/Plants/SunShroom.webp",
		"images/Plants/SunShroom/0.gif",
		"images/Plants/SunShroom/SunShroom2.gif",
		"images/Plants/SunShroom/SunShroomSleep.gif",
		"images/Plants/SunShroom/SunShroom.gif",
	],
	Tooltip: "Gives small sun at first and normal sun later",
	Produce:
		'<font color="#28325A">Sun-shrooms give small sun at first and normal sun later.</font><p>Sun production: <font color="#CC241D">low</font><br><font color="#8832aa">Sleeps during the day</font></p>Sun-shroom hates sun. He hates it so much that when it builds up in his system, he spits it out as fast as he can. He just won\'t abide it. To him, sun is crass.',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger() {},
	PrivateDie(a) {},
	PrivateBirth() {},
	BirthStyle(c, d, b, a) {
		oS.DKind
			? ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif"))
			: (oSym.addTask(
					600,
					(h, g, f) => {
						var e = $P[h];
						e && e.ProduceSun(e, g, f);
					},
					[d, GetX(c.C) - 40, GetY(c.R)]
				),
				oSym.addTask(
					12e3,
					(f) => {
						var e = $P[f];
						e && ((e.Sleep = 0), ($(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (e.Status = 1));
					},
					[d]
				));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	ProduceSun(a, c, b) {
		(AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0),
			oSym.addTask(
				2400,
				(g, f, e) => {
					var d = $P[g];
					d && d.ProduceSun(d, f, e);
				},
				[a.id, c, b]
			));
	},
	WakeUP(a) {
		var b = a.id;
		a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
		$(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
		a.Sleep = 0;
		oSym.addTask(
			12e3,
			(d) => {
				var c = $P[d];
				c && (($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (c.Status = 1));
			},
			[b]
		);
	},
});
