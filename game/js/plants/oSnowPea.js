import { oPeashooter } from "./oPeashooter.js";

export var oSnowPea = InheritO(oPeashooter, {
	EName: "oSnowPea",
	CName: "SnowPea",
	SunNum: 175,
	BKind: -1,
	PicArr: [
		"images/Card/Plants/SnowPea.webp",
		"images/Plants/SnowPea/0.gif",
		"images/Plants/SnowPea/SnowPea.gif",
		"images/Plants/PB-10.gif",
		"images/Plants/PeaBulletHit1.gif",
	],
	AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
	Tooltip: "Shoots frozen peas that damage and slow the enemy",
	Produce:
		'<font color="#28325A">Snow Peas shoot frozen peas that damage and slow the enemy.</font><p>Damage: <font color="#CC241D">normal, slows zombies</font></p>Folks often tell Snow Pea how "cool" he is, or exhort him to "chill out." They tell him to "stay frosty." Snow Pea just rolls his eyes. He\'s heard \'em al',
	NormalAttack() {
		var a = this;
		var b = "PB" + Math.random();
		EditEle(
			a.BulletEle.cloneNode(false),
			{
				id: b,
			},
			0,
			EDPZ
		);
		oSym.addTask(
			15,
			(d) => {
				var c = $(d);
				c && SetVisible(c);
			},
			[b]
		);
		oSym.addTask(
			1,
			function movePea(f, j, h, c, n, i, m, k, o, g) {
				var l;
				var e = GetC(n);
				var d = oZ["getZ" + c](n, i);
				m < 1 && g[i + "_" + e] && k !== e && (PlaySound2("firepea"), ++m && (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".png"));
				d && d.Altitude === 1
					? (d[
							{
								"-1": "getSnowPea",
								0: "getPea",
								1: "getFirePea",
							}[m]
						](d, h, c),
						(SetStyle(j, {
							left: o + 28 + "px",
						}).src = "images/Plants/PeaBulletHit1.gif"),
						oSym.addTask(10, ClearChild, [j]))
					: (n += l = !c ? 5 : -5) < oS.W && n > 100
						? ((j.style.left = (o += l) + "px"), oSym.addTask(1, movePea, [f, j, h, c, n, i, m, k, o, g]))
						: ClearChild(j);
			},
			[b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]
		);
	},
});
