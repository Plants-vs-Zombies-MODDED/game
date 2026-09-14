import { oPeashooter } from "./oPeashooter.js";

export var oThreepeater = InheritO(oPeashooter, {
	EName: "oThreepeater",
	CName: "Threepeater",
	width: 73,
	height: 80,
	beAttackedPointR: 53,
	SunNum: 325,
	BookHandPosition: "50% 60%",
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
		'<font color="#28325A">Threepeaters shoot peas in three lanes.</font><p>Damage: <font color="#CC241D">normal (for each pea)</font><br>Range: <font color="#CC241D">three lanes</font></p>Threepeater likes reading, backgammon and long periods of immobility in the park. Threepeater enjoys going to shows, particularly modern jazz. "I\'m just looking for that special someone," he says. Threepeater\'s favorite number is 5.',
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
			let bullet = NewO({
				X: e,
				R: b,
				D: 0,
				Attack: 20,
				Kind: 0,
				ChangeC: 0,
				pixelLeft: d,
				F: oGd.MB1,
			});
			f.BulletClass.push(bullet);
			if (oS.CardKind !== 1) {
				f.BulletEle.push(
					NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(f.R) - 65) + "px;visibility:hidden;z-index:" + (3 * b + 2))
				);
			} else {
				f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)));
			}
		}
		if (oS.CardKind !== 1) {
			let downBullet = f.BulletEle.at(-1);
			let upBullet = f.BulletEle[f.BulletEle.length - 3];
			try {
				downBullet.style.animation = "threepeaterDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
				upBullet.style.animation = "threepeaterUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
			} catch (e) {
				console.warn("Failed to animate threepeater bullets, retrying in 500ms\n" + e);
				setTimeout(() => {
					try {
						downBullet.style.animation = "threepeaterDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
						upBullet.style.animation = "threepeaterUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
					} catch (e) {
						console.warn("Failed to animate threepeater bullets\n", e);
					}
				}, 5e2);
			}
		} else {
			console.warn("Not animating threepeater bullets - I, Zombie levels are not supported");
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
