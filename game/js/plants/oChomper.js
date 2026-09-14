export var oChomper = InheritO(CPlants, {
	EName: "oChomper",
	CName: "Chomper",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 150,
	BookHandPosition: "56% 54%",
	AudioArr: ["bigchomp"],
	PicArr: [
		"images/Card/Plants/Chomper.webp",
		"images/Plants/Chomper/0.gif",
		"images/Plants/Chomper/Chomper.gif",
		"images/Plants/Chomper/ChomperAttack.gif",
		"images/Plants/Chomper/ChomperDigest.gif",
	],
	Tooltip: "Devours a zombie whole, but is vulnerable while chewing",
	Produce:
		'<font color="#28325A">Chompers can devour a zombie whole, but they are vulnerable while chewing.</font><p>Damage: <font color="#CC241D">massive</font><br>Range: <font color="#CC241D">very short</font><br>Special: <font color="#CC241D">long delay between chomps</font></p>Chomper almost got a gig doing stunts for The Little Shop of Horrors but it fell through when his agent demanded too much on the front end. Chomper\'s not resentful, though. He says it\'s just part of the business.',
	GetDX() {
		return -40;
	},
	getShadow(a) {
		return "top:" + (a.height - 22) + "px";
	},
	getTriggerRange(a, b, c) {
		return [[this.pixelLeft, c + 80, 0]];
	},
	TriggerCheck(a) {
		this.AttackCheck2(a) && ((this.canTrigger = 0), this.NormalAttack(this.id, a.id));
	},
	AttackCheck2(a) {
		return a.Altitude === 1 && a.beAttacked;
	},
	NormalAttack(a, b) {
		$(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(
			70,
			(c, d) => {
				PlaySound2("bigchomp");
				$P[c] &&
					oSym.addTask(
						18,
						(e, f) => {
							var g = $P[e];
							var h;
							g &&
								((h = $Z[f]) && h.beAttacked && h.PZ
									? ($(e).childNodes[1].src = h.getRaven(e, h)
											? (oSym.addTask(
													4200,
													(i) => {
														var j = $P[i];
														j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
													},
													[e]
												),
												"images/Plants/Chomper/ChomperDigest.gif")
											: ((g.canTrigger = 1), "images/Plants/Chomper/Chomper.gif"))
									: oSym.addTask(
											18,
											(i) => {
												var j = $P[i];
												j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
											},
											[e]
										));
						},
						[c, d]
					);
			},
			[a, b]
		);
	},
});
