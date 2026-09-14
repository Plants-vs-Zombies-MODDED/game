import { oGloomShroom } from "./oGloomShroom.js";

export var oSeaAnemone = InheritO(oGloomShroom, {
	EName: "oSeaAnemone",
	CName: "Electric Anemone",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 300,
	coolTime: 15,
	BookHandBack: "Undersea",
	AudioArr: ["SeaAnemone"],
	BookHandPosition: "48.5% 60%",
	PicArr: [
		"images/Card/Plants/SeaAnemone.webp",
		"images/Plants/SeaAnemone/0.gif",
		"images/Plants/SeaAnemone/GloomShroom.gif",
		"images/Plants/SeaAnemone/GloomShroomSleep.gif",
		"images/Plants/SeaAnemone/GloomShroomAttack.gif",
		"images/Plants/SeaAnemone/GloomShroomBullet.gif",
	],
	AudioArr: ["kernelpult", "kernelpult2"],
	Tooltip: "Hurts zombies around it",
	Produce:
		"电海葵花可以对在他周围的僵尸造成巨大伤害</font></p>自信的电海葵花毫不畏惧任何困难，一头杀马</font><br>特式的发型是他引以为傲的事情，可他说这是上</font><br>次在村口找王师傅给剃的。",
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:210px;height:200px;left:" +
				(b.pixelLeft - 60) +
				"px;top:" +
				(b.pixelTop - 65) +
				"px;background:url(images/Plants/SeaAnemone/GloomShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	NormalAttack() {
		PlaySound2("SeaAnemone");
		var k = this;
		var g;
		var f = k.MaxR;
		var c = k.MinX;
		var b = k.MaxX;
		var e;
		var h;
		var a;
		var j = k.id;
		var d = $(j);
		var l = j + "_Bullet";
		for (g = k.MinR; g <= f; g++) {
			e = oZ.getArZ(c, b, g);
			for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 130)) {}
		}
		const soundLoop = function (i) {
			PlaySound2(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
			--i && oSym.addTask(100, soundLoop, [i]);
		};
		oSym.addTask(100, soundLoop, [4]);
		d.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroomAttack.gif";
		SetVisible($(l));
		ImgSpriter(
			l,
			j,
			[
				["0 0", 9, 1],
				["0 -200px", 9, 2],
				["0 -400px", 9, 3],
				["0 -600px", 9, 4],
				["0 -800px", 9, 5],
				["0 -1000px", 9, 6],
				["0 -1200px", 9, 7],
				["0 -1400px", 9, 8],
				["0 -1600px", 9, 9],
				["0 -1800px", 9, 10],
				["0 -2000px", 9, 11],
				["0 -2200px", 9, -1],
			],
			0,
			(m, n) => {
				var i = $(n);
				$P[n] && (i.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroom.gif");
				SetHidden($(m));
			}
		);
	},
});
