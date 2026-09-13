import { oPeashooter } from "./oPeashooter.js";

export var oCattail = InheritO(oPeashooter, {
	EName: "oCattail",
	CName: "Cattail",
	width: 190,
	height: 90,
	beAttackedPointR: 100,
	SunNum: 225,
	coolTime: 50,
	AttackGif: 5,
	Attack: 20,
	BookHandBack: "Pool",
	getTriggerRange(a, b, c) {
		return [[0, oS.W, 0]];
	},
	getTriggerR(a) {
		return [1, oS.R];
	},
	InitTrigger(c, b, f, a, h, g) {
		var j = {};
		var i = c.getTriggerR(f);
		var e = i[0];
		var d = i[1];
		do {
			oT.add(e, (j[e] = c.getTriggerRange(e, h, g)), b);
		} while (e++ !== d);
		c.oTrigger = j;
	},
	getShadow(a) {
		return "display:none";
	},
	BookHandPosition: "50% 105%",
	AudioArr: ["CabbageAttack1", "CabbageAttack2"],
	PicArr: (function () {
		var a = "images/Plants/Cattail/";
		return [
			"images/Card/Plants/Cattail.webp",
			a + "0.gif",
			a + "cat.gif",
			"images/Plants/Cactus/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png",
			"images/interface/blank.png",
			a + "Attack.gif",
		];
	})(),
	Tooltip: 'Attacks any lane and shoots down balloon zombies <p> <font color="red">(requires lily pad)</font>',
	// another cool comment
	Produce:
		'<font color="#28325A">Cattails can attack any lane and shoot down balloon zombies too.</font><p>Must be planted on lily pads</p>"Woof!" says Cattail. "Woof woof woof! Does this confuse you? Do you expect me to say \'Meow\' like a cat just because the word \'cat\' is in my name and I also look like a cat? That\'s not how things work around here. I refuse to be pigeonholed."',
	TriggerCheck(b, a) {
		this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CanGrow(b, a, d) {
		var c = b[0];
		if (!b[1] && c && c.EName === "oLilyPad") {
			return 1;
		}
		return 0;
	},
	AttackCheck2(c) {
		var b = c.Altitude;
		return b === 1;
	},
	AttackCheckZ() {
		//查找僵尸
		var self = this;
		var z;
		var otarget;
		var llen;
		var lastx;
		var Target = -1;
		for (z in $Z) {
			otarget = $Z[z];
			if ((otarget.Altitude <= 0) | (otarget.PZ === 0)) {
				continue;
			}
			if (Target === -1 && otarget.Altitude > 0) {
				Target = otarget;
				continue;
			}
			llen = self.Plength1(self, otarget);
			if (otarget.Altitude === Target.Altitude && otarget.Altitude > 2 && llen < self.Plength1(self, Target)) {
				Target = otarget;
			} else {
				if (Target.Altitude > 2) {
					continue;
				}
				if (otarget.Altitude > 2) {
					Target = otarget;
				}
				if (llen < self.Plength1(self, Target)) {
					Target = otarget;
				}
			}
		}

		return Target;
	},
	Plength1(pid, zid) {
		//计算僵尸和磁力菇之间的距离 blehhhh :P
		var chang = Math.abs(zid.R - pid.R) * 100;
		var kuan = Math.abs(zid.X - GetX(pid.C));
		return Math.sqrt(chang * chang + kuan * kuan) + Math.abs(zid.R - pid.R) * 3;
	},
	PrivateBirth(a) {
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.pixelLeft + 50) + "px;top:" + (a.pixelTop + 10) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
		var p;
		var oBalloon;
		var self = a;
		for (p in $P) {
			oBalloon = $P[p];
			if (oBalloon.R === self.R && self.C === oBalloon.C && oBalloon.EName === "oLilyPad") {
				oBalloon.Die();
				break;
			}
		}
	},
	one(p1, p2, t) {
		return p1 * (1 - t) + p2 * t;
	},
	CheckLoop(zid, direction) {
		var self = this;
		var pid = self.id;
		if ($P[pid]) {
			self.NormalAttack(zid, 0);
			oSym.addTask(50 + 90 + 90, (_) => {
				$P[pid] && self.AttackCheck1(zid, direction);
			});
			oSym.addTask(90, (_) => {
				$P[pid] && self.NormalAttack(zid, 1);
			});
		}
	},
	HitZombie(zombieTarget, self) {
		if (zombieTarget.Altitude === 3) {
			zombieTarget.getPea(zombieTarget, 20);
			zombieTarget.Drop();
		} else {
			zombieTarget.getPea(zombieTarget, 0);
			zombieTarget.getHit2(zombieTarget, 20);
		}
	},
	AttackAnim(ele, self) {
		ele.childNodes[1].src = self.PicArr[self.AttackGif] + "?" + this.id;
	},
	getAngle(x, y, lastX, lastY) {
		return (180 / Math.PI) * Math.atan2(y - lastY, x - lastX);
	},
	catlen(x, y, last) {
		var ac = Math.abs(x - last[0]);
		var bc = Math.abs(y - last[1]);
		var ab = Math.sqrt(ac * ac, bc * bc) * 0.6;
		return ab;
	},
	NormalAttack(zid, fu) {
		var self = this;
		var ele = $(self.id);
		var zombieTarget = self.AttackCheckZ();
		if (zombieTarget === -1) {
			return;
		}
		if (!$Z[zombieTarget.id]) {
			return;
		}
		if (!$P[self.id]) {
			return;
		}
		var bullet = EditEle(
			self.BulletEle.cloneNode(false),
			{
				id: "CB" + Math.random(),
			},
			0,
			EDPZ
		);
		//alert(bullet);
		self.AttackAnim(ele, self);
		if (fu) {
			oSym.addTask(120, (_) => $P[self.id] && (ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id));
		}
		oSym.addTask(85, (_) => {
			//PlaySound2(self.AudioArr.slice(0, 2).random());
			if (!$P[self.id]) {
				return;
			}
			if (!$Z[zombieTarget.id]) {
				ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
				return;
			}
			SetVisible(bullet);
			var x = self.pixelLeft + 80;
			var y = self.pixelTop + 10;
			var x1 = x;
			var y1 = y;
			var zomRelativePos = zombieTarget.HeadPosition[zombieTarget.isAttacking]
				? zombieTarget.HeadPosition[zombieTarget.isAttacking]
				: zombieTarget.HeadPosition[0];
			var s =
				Number.parseInt(zombieTarget.Ele.style.left) +
				zomRelativePos.x -
				10 -
				x -
				!zombieTarget.isAttacking * zombieTarget.Speed * zombieTarget.DeltaDirectionSpeed[zombieTarget.FangXiang] * 10 * 1;
			var y3 = Number.parseInt(zombieTarget.Ele.style.top) + zomRelativePos.y + 20;
			var time = 1;
			var f = 0;
			var gravity = 0.2;
			var vy = -10;
			var vx = -(gravity * s) / (2 * vy);
			var x2 = x + 40;
			var y2 = y - 10;
			var last = [x, y];
			var defAngle = self.getAngle(x + vx, y + vy + gravity, last[0], last[1]);
			var x3 = x + s;
			var t = 0;
			var ws = 100;
			var fum = 0;
			(function drawFrame() {
				if (fum === 0) {
					x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
					y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
					var ab = self.catlen(x, y, last);
					while (t < ws / 2 && ab < 1.5) {
						t++;
						x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
						y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
						ab = self.catlen(x, y, last);
					}
					bullet.style.left = x + "px";
					bullet.style.top = y + "px";
					bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
					t++;

					if (t >= ws + 1) {
						bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
						$Z[zombieTarget.id] && self.HitZombie(zombieTarget, self);

						return;
					}

					if (!$Z[zombieTarget.id]) {
						fum = 1;
						ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
						oSym.addTask(1, drawFrame);
					} else {
						oSym.addTask(ab * 0.4, drawFrame);
					}
				} else {
					(function drawFrame() {
						if (fum === 1) {
							x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
							y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
							var ab = self.catlen(x, y, last);
							while (t < ws / 2 && ab < 1.5) {
								t++;
								x = self.one(self.one(x1, x2, t / ws), self.one(x2, x3, t / ws), t / ws);
								y = self.one(self.one(y1, y2, t / ws), self.one(y2, y3, t / ws), t / ws);
								ab = self.catlen(x, y, last);
							}
							bullet.style.left = x + "px";
							bullet.style.top = y + "px";
							bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
							t++;

							if (t >= ws + 1) {
								bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
								$Z[zombieTarget.id] && self.HitZombie(zombieTarget, self);

								return;
							}

							if (!$Z[zombieTarget.id]) {
								fum = 1;
								ele.childNodes[1].src = self.PicArr[self.NormalGif] + "?" + this.id;
								oSym.addTask(1, drawFrame);
							} else {
								oSym.addTask(ab * 0.4, drawFrame);
							}
						} else {
							bullet.style.left = (x -= 3) + "px";
							bullet.style.top = (y -= 3) + "px";
							bullet.style.transform = `rotate(${self.getAngle(x, y, last[0], last[1])}deg)`;
							if (x <= 0 || y <= 0) {
								bullet && ((bullet.src = self.PicArr[4]), (bullet.style.transform = `rotate(0deg)`), oSym.addTask(120, ClearChild, [bullet]));
								return;
							}
							oSym.addTask(1, drawFrame);
						}
						last = [x, y];
					})();
				}
				last = [x, y];
			})();
		});
	},
});
