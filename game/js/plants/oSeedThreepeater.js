import { oPeashooter } from "./oPeashooter.js";

export var oSeedThreepeater = InheritO(oPeashooter, {
	EName: "oSeedThreepeater",
	CName: "Threepeater",
	width: 73,
	height: 80,
	beAttackedPointR: 53,
	SunNum: 0,
	PicArr: [
		"images/Card/Plants/Threepeater.webp",
		"images/Plants/Threepeater/0.gif",
		"images/Plants/Threepeater/Threepeater.gif",
		"images/Plants/PB00.gif",
		"images/Plants/PeaBulletHit.gif",
		"images/Plants/FireBulletHit.webp",
	],
	AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
	Tooltip: "Shoots peas in three lanes",
	Produce:
		'A three-line shooter can shoot peas on three lines at the same time.<p>Harm:<font color="#CC241D">Ordinary (each)</font><br>Scope:<font color="#CC241D">three lines</font></p>The three-line shooter enjoys reading, playing chess and sitting in the park. he</font><br>Also enjoys performing, especially modern jazz. "Im looking for</font><br>The other half of my life," he said. The third-line shooters favorite number</font><br>The word is 5.',
	getTriggerR(a) {
		return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a];
	},
	PrivateBirth(f) {
		var e = f.AttackedLX;
		var d = e - 40;
		var a;
		var c = f.oTrigger;
		var b;
		f.BulletClass = [];
		f.BulletEle = [];
		for (b in c) {
			f.BulletClass.push(
				NewO({
					X: e,
					R: b,
					D: 0,
					Attack: 20,
					Kind: 0,
					ChangeC: 0,
					pixelLeft: d,
					F: oGd.MB1,
				})
			);
			f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)));
		}
	},
	PrivateDie(a) {
		a.BulletEle.length = 0;
	},
	NormalAttack() {
		var a;
		var c = this;
		var d;
		var b = 0;
		for (a in c.oTrigger) {
			EditEle(
				c.BulletEle[b++].cloneNode(false),
				{
					id: (d = "PB" + Math.random()),
				},
				0,
				EDPZ
			);
			oSym.addTask(
				15,
				(f) => {
					var e = $(f);
					e && SetVisible(e);
				},
				[d]
			);
			oSym.addTask(
				1,
				function moveItem1(h, l, j, e, p, k, o, m, q, i) {
					var n;
					var g = GetC(p);
					var f = oZ["getZ" + e](p, k);
					o === 0 && i[k + "_" + g] && m !== g && (PlaySound2("firepea"), (o = 1), (j = 40), (m = g), (l.src = "images/Plants/PB" + o + e + ".png"));
					f && f.Altitude === 1
						? (f[
								{
									"-1": "getSnowPea",
									0: "getPea",
									1: "getFirePea",
								}[o]
							](f, j, e),
							(SetStyle(l, {
								left: q + 28 + "px",
							}).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/FireBulletHit.webp"][o]),
							oSym.addTask(10, ClearChild, [l]))
						: (p += n = !e ? 5 : -5) < oS.W && p > 100
							? ((l.style.left = (q += n) + "px"), oSym.addTask(1, moveItem1, [h, l, j, e, p, k, o, m, q, i]))
							: ClearChild(l);
				},
				[d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch]
			);
		}
	},
});
