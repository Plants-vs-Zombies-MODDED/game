export var oLaserBean = InheritO(CPlants, {
	EName: "oLaserBean",
	CName: "Laser Bean",
	width: 80,
	height: 80,
	beAttackedPointR: 80,
	SunNum: 75,
	SunNum: 250,
	coolTime: 30,
	HP: 4e3,
	BookHandPosition: "-18.5% 65%",
	PicArr: [
		"images/Card/Plants/LaserBean.webp",
		"images/Plants/LaserPea/0.gif",
		"images/Plants/LaserPea/LaserPea.gif",
		"images/Plants/LaserPea/LaserPeaSleep.gif",
		"images/Plants/LaserPea/LaserPeaAttack.gif",
		"images/Plants/LaserPea/LaserPeaBullet.gif",
	],
	AudioArr: ["LaserBean"],
	Tooltip: "Fires a high-powered laser at an entire row of zombies",
	Produce:
		'<font color="#28325A">Laser Beans fire down a lane, hitting all zombies ahead of it.</font><p>Damage: <font color="#CC241D">normal, penetrates an entire lane</font><br>Range: <font color="#CC241D">all zombies in a lane</font><p>After a laser eye surgery had gone horribly right, Laser Bean gained a sense of purpose and a new-found affinity for competitive staring contests.',
	CheckLoop(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		oSym.addTask(
			292,
			(e, f, h) => {
				var g;
				(g = $P[e]) && g.AttackCheck1(f, h);
			},
			[a, b, c]
		);
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
	},
	GetDY(b, c, a) {
		return a[0] ? -18 : -10;
	},
	GetDX() {
		return -68;
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
				"px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	PrivateDie(a) {
		ClearChild($(a.id + "_Bullet"));
	},
	getTriggerRange(a, b, c) {
		return [[b, Math.min(c + 686, oS.W), 0]];
	},
	NormalAttack() {
		PlaySound2("LaserBean");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getHit1(g, 850);
		}
		b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 4, 1],
				["0 -62px", 4, 2],
				["0 -124px", 5, 3],
				["0 -186px", 5, 4],
				["0 -248px", 5, 5],
				["0 -310px", 6, 6],
				["0 -372px", 6, 7],
				["0 -434px", 7, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif"), SetHidden($(i)));
			}
		);
	},
});
