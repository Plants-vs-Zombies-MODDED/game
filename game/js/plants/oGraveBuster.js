export var oGraveBuster = InheritO(CPlants, {
	EName: "oGraveBuster",
	CName: "Grave Buster",
	width: 99,
	height: 106,
	beAttackedPointR: 70,
	SunNum: 75,
	BookHandBack: "Night",
	canEat: 0,
	BookHandPosition: "48% 97%",
	PicArr: ["images/Card/Plants/GraveBuster.webp", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],
	AudioArr: ["gravebusterchomp"],
	CanGrow(b, a, d) {
		var c = oS.ArP;
		return c ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1] : a + "_" + d in oGd.$Tombstones && !b[1];
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
	},
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
	GetDY(b, c, a) {
		return -30;
	},
	InitTrigger() {},
	Tooltip: "Plant it on a grave to remove the grave",
	Produce:
		'<font color="#28325A">Plant Grave Busters on graves to remove the graves.</font><p>Usage: <font color="#CC241D">single use, must be planted on graves</font><br>Special: <font color="#CC241D">removes graves</font></p>Despite Grave Buster\'s fearsome appearance, he wants everyone to know that he loves kittens and spends his off hours volunteering at a local zombie rehabilitation center. "It\'s just the right thing to do," he says.',
	PrivateBirth(a) {
		PlaySound2("gravebusterchomp");
		oSym.addTask(
			420,
			(b) => {
				var e = $P[b];
				var c;
				var d;
				var f;
				e &&
					((d = e.R),
					(f = e.C),
					delete oGd.$Tombstones[(c = d + "_" + f)],
					e.Die(),
					ClearChild($("dTombstones" + c)),
					oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 25, 0));
			},
			[a.id]
		);
	},
});
