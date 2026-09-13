import { oFumeShroom } from "./oFumeShroom.js";

export var oSeedPuffShroom = InheritO(oFumeShroom, {
	EName: "oSeedPuffShroom",
	CName: "Puff-shroom",
	width: 40,
	height: 66,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	SunNum: 0,
	Stature: -1,
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
		'小喷菇是免费的，不过射程很近。<p>Harm: <font color="#CC241D">中等</font><br>Scope:<font color="#CC241D">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和</font><br>很多蘑菇一样，我只是把他们想象成童话和电</font><br>影里的怪物。不过这次的经历已经让我大开眼</font><br>界了。',
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
