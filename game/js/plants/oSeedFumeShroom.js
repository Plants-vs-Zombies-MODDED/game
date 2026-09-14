export var oSeedFumeShroom = InheritO(CPlants, {
	EName: "oSeedFumeShroom",
	CName: "Fume-shroom",
	width: 100,
	height: 88,
	beAttackedPointR: 80,
	SunNum: 0,
	BookHandBack: "Night",
	SleepGif: 3,
	night: true,
	PicArr: [
		"images/Card/Plants/FumeShroom.webp",
		"images/Plants/FumeShroom/0.gif",
		"images/Plants/FumeShroom/FumeShroom.gif",
		"images/Plants/FumeShroom/FumeShroomSleep.gif",
		"images/Plants/FumeShroom/FumeShroomAttack.gif",
		"images/Plants/FumeShroom/FumeShroomBullet.gif",
	],
	AudioArr: ["fume"],
	Tooltip: "Shoots fumes that can pass through screen doors",
	Produce:
		'大喷菇喷出的臭气可以穿透铁丝网门。<p>Harm:<font color="#CC241D">普通，可穿透铁丝网门</font><br>Scope:<font color="#CC241D">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
	GetDY(b, c, a) {
		return a[0] ? -18 : -10;
	},
	GetDX() {
		return -45;
	},
	BirthStyle(c, d, b, a) {
		oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
				b.AttackedRX +
				"px;top:" +
				(b.pixelTop + 5) +
				"px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 330, oS.W), 0]];
	},
	NormalAttack() {
		PlaySound2("fume");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getHit1(g, 20);
		}
		b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 9, 1],
				["0 -62px", 9, 2],
				["0 -124px", 9, 3],
				["0 -186px", 9, 4],
				["0 -248px", 9, 5],
				["0 -310px", 9, 6],
				["0 -372px", 9, 7],
				["0 -434px", 9, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif"), SetHidden($(i)));
			}
		);
	},
});
