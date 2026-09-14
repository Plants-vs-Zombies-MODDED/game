import { oFumeShroom } from "./oFumeShroom.js";

export var oGloomShroom = InheritO(oFumeShroom, {
	EName: "oGloomShroom",
	CName: "Gloom-shroom",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 150,
	BookHandPosition: "47% 60%",
	PicArr: [
		"images/Card/Plants/GloomShroom.webp",
		"images/Plants/GloomShroom/0.gif",
		"images/Plants/GloomShroom/GloomShroom.gif",
		"images/Plants/GloomShroom/GloomShroomSleep.gif",
		"images/Plants/GloomShroom/GloomShroomAttack.gif",
		"images/Plants/GloomShroom/GloomShroomBullet.gif",
	],
	AudioArr: ["kernelpult", "kernelpult2"],
	Tooltip: 'Releases heavy fumes in an area around itself  <p> <font color="red">(requires fume-shroom)</font>',
	Produce:
		'<font color="#28325A">Gloom-shrooms release heavy fumes in an area around themselves.</font><p>Must be planted on fume-shrooms<p>"I\'ve always enjoyed releasing heavy fumes," says Gloom Shroom. "I know a lot of people aren\'t cool with that. They say it\'s rude or that it smells bad. All I can say is, would you rather have your brain eaten by zombies?"',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oFumeShroom";
	},
	BirthStyle(c, d, b, a) {
		oGd.$[c.R + "_" + c.C + "_1"] && oGd.$[c.R + "_" + c.C + "_1"].Sleep && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[3]));
		EditEle(b, { id: d }, a, EDPZ);
	},
	GetDX() {
		return -58;
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
				"px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(c, d, e) {
		var f = GetX(this.C);
		var b = (this.MinX = f - 120);
		var a = (this.MaxX = f + 120);
		return [[b, a, 0]];
	},
	getTriggerR(c) {
		var b = (this.MinR = c > 2 ? c - 1 : 1);
		var a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
		return [b, a];
	},
	NormalAttack() {
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
			for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}
		}
		oSym.addTask(
			100,
			function soundLoop(i) {
				PlaySound2(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
				--i && oSym.addTask(100, soundLoop, [i]);
			},
			[4]
		);
		d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
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
				$P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
				SetHidden($(m));
			}
		);
	},
});
