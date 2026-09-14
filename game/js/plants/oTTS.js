export var oTTS = InheritO(CPlants, {
	EName: "oTTS",
	CName: "Thorn Seaweed",
	width: 75,
	height: 226,
	beAttackedPointR: 55,
	beAttackedPointR: 80,
	SunNum: 50,
	BookHandBack: "Undersea",
	GetDY(b, c, a) {
		return 5;
	},
	NormalGif: 1,
	BookHandPosition: "50% 150%",
	AudioArr: ["TTS"],
	PicArr: [
		"images/Card/Plants/TTS.webp",
		"images/Plants/TTS/0.gif",
		"images/Plants/TTS/Float.gif",
		"images/Plants/TTS/Grab.png",
		"images/Plants/TTS/splash.png",
	],
	Tooltip: "Grabs zombies in front of it",
	Produce:
		'<font color="#28325A">Thorn Seaweeds grab anything in front of them.</font><p>Damage: <font color="#CC241D">huge</font><br>Range: <font color="#CC241D">very short</font></p>Thorn Seaweed is Tangle Kelp’s overenthusiastic cousin. While Tangle Kelp claims to be "great at relationships," Thorn Seaweed’s idea of bonding involves spines, panic, and a barnacle who still owes him 10 sun. Gardeners appreciate his dedication, though submarines and confused starfish do not.',
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	getTriggerRange(a, b, c) {
		return [[b, c, 0]];
	},
	BirthStyle(c, d, b, a) {
		b.childNodes[1].src = "images/Plants/TTS/Float.gif";
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	getHurt(d, b, a) {
		var c = this;
		b === 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
	},
	TriggerCheck(b, a) {
		b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
	},
	NormalAttack(a, b) {
		PlaySound2("TTS");
		a.getHurt = function () {};
		b.getHurt = function () {};
		b.beAttacked = 0;
		b.isAttacking = 1;
		NewImg(0, "images/Plants/TTS/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
		oSym.addTask(
			50,
			(g, h) => {
				var e = g.id;
				var f = h.id;
				var d = e + "_splash";
				var c = f + "_splash";
				NewEle(
					c,
					"div",
					"position:absolute;background:url(images/Plants/TTS/splash.png);left:" +
						(h.AttackedLX - 10) +
						"px;top:" +
						(h.pixelTop + h.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					EDPZ
				);
				ImgSpriter(
					d,
					e,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				ImgSpriter(
					c,
					f,
					[
						["0 0", 9, 1],
						["-97px 0", 9, 2],
						["-194px 0", 9, 3],
						["-291px 0", 9, 4],
						["-388px 0", 9, 5],
						["-485px 0", 9, 6],
						["-582px 0", 9, 7],
						["-679px 0", 9, -1],
					],
					0,
					(i, j) => {
						ClearChild($(i));
					}
				);
				h.DisappearDie();
				g.Die();
			},
			[a, b]
		);
	},
});
