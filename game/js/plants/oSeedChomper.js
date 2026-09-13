export var oSeedChomper = InheritO(CPlants, {
	EName: "oSeedChomper",
	CName: "Chomper",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 0,
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
		'Big-mouthed flowers can swallow a whole zombie in one bite, but they are very fragile when digesting zombies.<p>Harm:<font color="#CC241D">huge</font><br>Scope:<font color="#CC241D">very close</font><br>Features:<font color="#CC241D">Digestion takes a long time</font></p>Big Mouth Flower can almost go to "Little Shop of Horrors"”，to perform its absolute best</font><br>Skilled, but his agent squeezed him too much money.</font><br>Because he didnt go. Despite this, Dazuihua has no complaints, only</font><br>Said it was just part of the deal.',
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
