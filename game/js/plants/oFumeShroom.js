export var oFumeShroom = InheritO(CPlants, {
	EName: "oFumeShroom",
	CName: "Fume-shroom",
	width: 100,
	height: 88,
	beAttackedPointR: 80,
	SunNum: 75,
	BookHandBack: "Night",
	SleepGif: 3,
	night: true,
	BookHandPosition: "53% 60%",
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
		'<font color="#28325A">Fume-shrooms shoot fumes that can pass through screen doors.</font><p>Damage: <font color="#CC241D">normal, penetrates screen doors</font><br>Range: <font color="#CC241D">all zombies in the fume cloud	</font><br><font color="#8832aa">Sleeps during the day</font></p>"I was in a dead-end job producing yeast spores for a bakery," says Fume-shroom. "Then Puff-shroom, bless \'im, told me about this great opportunity blasting zombies. Now I really feel like I\'m making a difference."',
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
