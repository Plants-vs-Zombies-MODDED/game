import { oFumeShroom } from "./oFumeShroom.js";

export var oPuffShroom = InheritO(oFumeShroom, {
	EName: "oPuffShroom",
	CName: "Puff-shroom",
	width: 40,
	height: 66,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	SunNum: 0,
	Stature: -1,
	BookHandPosition: "49% 60%",
	PicArr: [
		"images/Card/Plants/PuffShroom.webp",
		"images/Plants/PuffShroom/0.gif",
		"images/Plants/PuffShroom/PuffShroom.gif",
		"images/Plants/PuffShroom/PuffShroomSleep.gif",
		"images/Plants/ShroomBullet.gif",
		"images/Plants/ShroomBulletHit.gif",
	],
	AudioArr: ["puff"],
	Tooltip: "Shoots short-ranged spores at the enemy",
	Produce:
		'<font color="#28325A">Puff-shrooms are cheap, but can only fire a short distance.</font><p>Damage: <font color="#CC241D">normal</font><br>Range: <font color="#CC241D">short</font><br><font color="#8832aa">Sleeps during the day</font></p>"I only recently became aware of the existence of zombies," says Puff-shroom. "Like many fungi, I\'d just assumed they were fairy tales or movie monsters. This whole experience has been a huge eye-opener for me."',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 250, oS.W), 0]];
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(
			0,
			"images/Plants/ShroomBullet.gif",
			"left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2)
		);
	},
	PrivateDie(a) {
		a.BulletEle = null;
	},
	NormalAttack() {
		PlaySound2("puff");
		var b = this;
		var c = "PSB" + Math.random();
		var a = b.AttackedLX;
		EditEle(
			b.BulletEle.cloneNode(false),
			{
				id: c,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(e) => {
				var d = $(e);
				d && SetVisible(d);
			},
			[c]
		);
		const moveBullet = function (j, d, e, f, g) {
			var i = GetC(e);
			var h = oZ.getZ0(e, f);
			h && h.Altitude === 1
				? (h.getPea(h, 20, 0),
					(SetStyle(d, {
						left: g + 38 + "px",
					}).src = "images/Plants/ShroomBulletHit.gif"),
					oSym.addTask(10, ClearChild, [d]))
				: (e += 5) < oS.W
					? ((d.style.left = (g += 5) + "px"), oSym.addTask(1, moveBullet, [j, d, e, f, g]))
					: ClearChild(d);
		};
		oSym.addTask(1, moveBullet, [c, $(c), a, b.R, a - 46]);
	},
});
