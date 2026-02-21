var CZombies = (function (b, a) {
	return (
		((a = function () {}).prototype = {
			name: "Zombies",
			HP: 270,
			Lvl: 1,
			NormalGif: 2,
			AlmanacGif: 9,
			CardGif: 0,
			StaticGif: 1,
			BookHandBack: "Day",
			AudioArr: [],
			CanSelect: 1,
			CanDisplay: 1,
			BookHandPosition: "50% 70%",
			AttackGif: 3,
			LostHeadGif: 4,
			LostHeadAttackGif: 5,
			HeadGif: 6,
			DieGif: 7,
			BoomDieGif: 8,
			width: 166,
			height: 144,
			beAttackedPointL: 82,
			beAttackedPointR: 156,
			BreakPoint: 90,
			SunNum: 50,
			coolTime: 0,
			Ornaments: 0,
			OrnHP: 0,
			OSpeed: 1.6,
			Speed: 1.6,
			FangXiang: "GoLeft",
			isGoingDie: 0,
			DeltaDirectionSpeed: {
				GoLeft: 1,
				GoRight: -1,
				GoUp: 0,
				GoDown: 0,
			},
			CSS_fliph: "",
			CSS_alpha: "",
			AKind: 0,
			beAttacked: 1,
			isAttacking: 0,
			Attack: 100,
			WalkDirection: 0,
			LivingArea: 1,
			Altitude: 1,
			FreeSetbodyTime: 0,
			FreeFreezeTime: 0,
			FreeSlowTime: 0,
			AudioArr: ["zombie_falling_1"],
			HeadPosition: [
				{
					x: 62,
					y: 16,
					width: 40,
					height: 40,
				},
				{
					x: 62,
					y: 16,
					width: 40,
					height: 40,
				},
			],
			Ifgc: 0,
			getButter(self, time = 400, img = null, wh = [1, 1], delta = [0, 0]) {
				if (!$Z[self.id] || self.HP < self.BreakPoint) {
					return;
				}
				if (img === null) {
					img = "images/Plants/KernelPult/butter.png";
				}
				var body = self._TMP_ELEBODY ? self._TMP_ELEBODY : self.EleBody;
				var bodyStyle = body.style;
				var oOpacity = bodyStyle.opacity;
				var canvas;
				var ctx;
				if (!self.FreeSetbodyTime) {
					canvas = NewEle(
						"Buttered_Zombie_" + Math.random(),
						"canvas",
						bodyStyle.cssText,
						{
							height: body.offsetHeight,
							width: body.offsetWidth,
						},
						self.Ele
					);
					ctx = canvas.getContext("2d");
					ctx.drawImage(self.EleBody, 0, 0, body.offsetWidth, body.offsetHeight);
					self._TMP_ELEBODY = self.EleBody;
					self.EleBody.style.opacity = 0;
					self.Speed = 0;
					self.EleBody = canvas;
					for (var i = 0; i < self._TMP_ELEBODY.attributes.length; i++) {
						var name = self._TMP_ELEBODY.attributes[i].nodeName;
						if (!/id|width|height|style/.test(name)) {
							self.EleBody.setAttribute(name, self._TMP_ELEBODY.attributes[i].nodeValue);
						}
					}
					oSym.addTask(1, function CheckSPC(last = null) {
						if (!$Z[self.id] || self.HP < self.BreakPoint) {
							if (self._FREESetBody_) {
								self._FREESetBody_();
							}
						} else if ($Z[self.id] && self.FreeSetbodyTime) {
							if (canvas.src) {
								self._TMP_ELEBODY.src = canvas.src;
								canvas.src = "";
							}
							if (last !== self._TMP_ELEBODY.src) {
								ctx.clearRect(0, 0, body.offsetWidth * 2, body.offsetHeight * 2);
								ctx.drawImage(self._TMP_ELEBODY, 0, 0, body.offsetWidth, body.offsetHeight);
								last = self._TMP_ELEBODY.src;
							}
							var position = self.HeadPosition.length > self.isAttacking ? self.HeadPosition[self.isAttacking] : self.HeadPosition[0];
							for (var i of self._Butter_Img_) {
								if (position.x !== Number.parseInt(i.style.left) || position.y !== Number.parseInt(i.style.top)) {
									i.style.left = position.x + delta[0] + "px";
									i.style.top = position.y + delta[1] + "px";
								}
							}
							oSym.addTask(1, CheckSPC, [last]);
						}
					});
					self._FREESetBody_ = function () {
						self.FreeSetbodyTime = 0;
						self.EleBody = self._TMP_ELEBODY;
						if (self.EleBody) {
							self.EleBody.style.opacity = oOpacity;
							for (var i = 0; i < canvas.attributes.length; i++) {
								var name = canvas.attributes[i].nodeName;
								if (!/id|width|height/.test(name)) {
									self.EleBody.setAttribute(name, canvas.attributes[i].nodeValue);
								}
							}
							canvas.src && (self.EleBody.src = canvas.src);
						}
						ClearChild(canvas);
						delete self._TMP_ELEBODY;
						for (var i = self._Butter_Img_.length - 1; i >= 0; i--) {
							ClearChild(self._Butter_Img_[i]);
						}
						delete self._Butter_Img_;
						if (!self.FreeFreezeTime) {
							self.Speed = self.FreeSlowTime ? self.OSpeed / 2 : self.OSpeed;
							self.isAttacking && self.JudgeAttack();
						}
						delete self._FREESetBody_;
					};
				} else {
					canvas = self.EleBody;
					ctx = canvas.getContext("2d");
				}
				if (!$("butter" + self.id + img)) {
					!self._Butter_Img_ && (self._Butter_Img_ = []);
					var position = self.HeadPosition.length > self.isAttacking ? self.HeadPosition[self.isAttacking] : self.HeadPosition[0];
					self._Butter_Img_.push(
						NewImg(
							"butter_" + self.id + img,
							img,
							(self.FangXiang === "GoRight" ? "transform:rotateY(180deg);" : "") +
								`position:absolute;left:${position.x + delta[0]}px;top:${position.y + delta[1]}px;width:${position.width * wh[0]}px;height:${
									position.height * wh[1]
								}px;`,
							self.Ele
						)
					);
				}
				oSym.addTask(
					time,
					(expectedFSBT) => {
						if ($Z[self.id] && self.FreeSetbodyTime === expectedFSBT && self._FREESetBody_) {
							self._FREESetBody_();
						}
					},
					[(self.FreeSetbodyTime = oSym.Now + time)]
				);
			},
			CanPass(d, c) {
				return c && c !== 2;
			},
			CanGrow(d, c, e) {
				return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1];
			},
			ChkActs(h, f, j, e) {
				var d;
				var c;
				var g;
				!(h.FreeFreezeTime || h.FreeSetbodyTime)
					? (h.beAttacked && !h.isAttacking && h.JudgeAttack(),
						!h.isAttacking
							? (c = h.AttackedRX -= d = h.Speed) < -50
								? (j.splice(e, 1), h.DisappearDie(), (g = 0))
								: (c < 100 &&
										!h.PointZombie &&
										((h.PointZombie = 1),
										!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
										h.ChangeR({
											R: f,
											ar: [oS.R - 1],
											CustomTop: 400 - h.height + h.GetDY(),
										})),
									(h.ZX = h.AttackedLX -= d),
									(h.Ele.style.left = Math.floor((h.X -= d)) + "px"),
									(g = 1))
							: (g = 1))
					: (g = 1);
				return g;
			},
			ChkActs1(g, e, h, d) {
				var c;
				var f;
				!(g.FreeFreezeTime || g.FreeSetbodyTime)
					? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
						!g.isAttacking
							? (g.AttackedLX += c = g.Speed) > oS.W
								? (h.splice(d, 1), g.DisappearDie(), (f = 0))
								: ((g.ZX = g.AttackedRX += c), (g.Ele.style.left = Math.ceil((g.X += c)) + "px"), (f = 1))
							: (f = 1))
					: (f = 1);
				return f;
			},
			GetDX() {
				return -110;
			},
			GetDY() {
				return -10;
			},
			GetDTop: 0,
			ChangeR(e) {
				var h = e.R;
				var g = e.ar || [];
				var j = e.CustomTop;
				var d = this;
				var q = h - 1;
				var l;
				var k = d.id;
				var m = -1;
				var f = d.Ele;
				var n = d.EleBody;
				var i = oGd.$LF;
				var c;
				!g.length && (d.CanPass(q, i[q]) && (g[++m] = q), d.CanPass((q += 2), i[q]) && (g[++m] = q));
				g.length
					? ((l = !d.WalkDirection ? -5 : 5),
						(d.ZX += l),
						(d.AttackedLX += l),
						(d.AttackedRX += l),
						(d.X += l),
						(q = g[Math.floor(Math.random() * g.length)]),
						SetStyle(f, {
							left: d.X + "px",
							top: (d.pixelTop = j === undefined ? GetY(q) - d.height + d.GetDY() : j) + "px",
							zIndex: (d.zIndex = 3 * q + 1),
						}),
						d.isAttacking && (n.src = d.PicArr[d.NormalGif]),
						oZ.moveTo(k, h, q))
					: (n.src = d.PicArr[d.NormalGif]);
				d.isAttacking = 0;
			},
			getShadow(c) {
				return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px";
			},
			Init(g, i, e, d) {
				var c = 0;
				var h = this;
				var f = [];
				i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;
				while (--d) {
					i.CanPass(d, e[d]) && (f[c++] = d);
				}
				i.ArR = f;
				i.ArHTML = [
					'<div id="',
					'" style="position:absolute;display:',
					";left:",
					"px;top:",
					"px;z-index:",
					'"><img src="' + ShadowPNG + '" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,',
					",0);top:",
					'px" src="',
					'"></div>',
				];
			},
			getHTML(d, g, i, h, f, k, j, c) {
				var e = this.ArHTML;
				return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8];
			},
			prepareBirth(f) {
				var h = this;
				var e = h.ArR;
				var d = e[Math.floor(Math.random() * e.length)];
				var g = GetY(d) + h.GetDY();
				var c = g - h.height;
				var j = 3 * d + 1;
				var i = (h.id = "Z_" + Math.random());
				h.R = d;
				h.pixelTop = c;
				h.zIndex = j;
				(h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
				return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif]);
			},
			CustomBirth(i, c, d, m) {
				var g = this;
				var f = GetY(i) + g.GetDY();
				var h = f - g.height;
				var k = 3 * i + 1;
				var e = (g.id = "Z_" + Math.random());
				var l = g.beAttackedPointL;
				var j = g.beAttackedPointR;
				g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * 0.5) - l) + j;
				g.R = i;
				g.pixelTop = h;
				g.zIndex = k;
				(g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
				return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif]);
			},
			BirthCallBack(f) {
				var e = f.delayT;
				var d = f.id;
				var c = (f.Ele = $(d));
				f.EleShadow = c.firstChild;
				f.EleBody = c.childNodes[1];
				e
					? oSym.addTask(
							e,
							(h, g) => {
								var i = $Z[h];
								i && ((i.FreeSetbodyTime = 0), SetBlock(g));
							},
							[d, c]
						)
					: SetBlock(c);
			},
			Birth() {
				var c = this;
				$Z[c.id] = c;
				oZ.add(c);
				c.BirthCallBack(c);
			},
			SequentialDeath(daDamage, deathFunction) {
				let damage = daDamage ?? 1800;

				if (this.OrnHP > 0) {
					if (this.OrnHP >= damage) {
						this.OrnHP -= damage;
						damage = 0;
					} else {
						damage -= this.OrnHP;
						this.OrnHP = 0;
					}
				}

				if (damage > 0) {
					this.HP -= damage;
				}

				if (this.HP <= 0) {
					deathFunction();
				}
			},
			getCrushed(c) {
				return true;
			},
			getRaven(chompingPlant, chompedZombie) {
				let chompDamage = 1800;
				let startChewing = 1;

				if (chompedZombie.EName === "oGargantuar") {
					chompDamage = 40;
					startChewing = 0;
				}

				return (this.SequentialDeath(chompDamage, () => this.DisappearDie()), startChewing);
			},
			getExplosion(explosionDamage) {
				this.SequentialDeath(explosionDamage, () => this.ExplosionDie());
				//  this.ExplosionDie();
			},
			getThump(thumpDamage) {
				this.SequentialDeath(thumpDamage, () => this.DisappearDie());
			},
			PlayNormalballAudio() {
				PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
			},
			PlayFireballAudio() {
				PlaySound2(["ignite", "ignite2"][Math.floor(Math.random() * 2)]);
			},
			PlaySlowballAudio() {
				PlaySound2("frozen");
			},
			getFireball(h, e, g) {
				h.FreeSlowTime = 0;
				h.Attack = 100;
				h.FreeFreezeTime || h.FreeSetbodyTime ? (h.PlayNormalballAudio(), (h.Speed = h.OSpeed)) : h.PlayFireballAudio();
				var f = h.AttackedLX;
				var j = h.AttackedRX;
				var c = !g ? oZ.getArZ(f, f + 40, h.R) : oZ.getArZ(j - 40, j, h.R);
				var d = c.length;
				while (d--) {
					c[d].getSputtering();
				}
			},
			getSputtering(c) {
				this.getHit2(this, c || 13, 0);
			},
			getSlow(h, f, g) {
				var d = oSym.Now + g;
				var e = h.FreeSlowTime;
				var c = 0;
				switch (true) {
					case !e:
						!(h.FreeFreezeTime || h.FreeSetbodyTime) && (h.Speed = 0.5 * h.OSpeed);
						h.Attack = 50;
						h.PlaySlowballAudio();
						h.FreeSlowTime = d;
						c = 1;
						break;
					case e < d:
						h.FreeSlowTime = d;
						h.PlayNormalballAudio();
						c = 1;
				}
				c &&
					oSym.addTask(
						g,
						(j, i) => {
							var k = $Z[j];
							k && k.FreeSlowTime === i && ((k.FreeSlowTime = 0), (k.Attack = 100), k.Speed && (k.Speed = k.OSpeed));
						},
						[f, d]
					);
			},
			getFreeze(d, c) {
				d.beAttacked && d.getHit0(d, 20, 0);
				d.Speed = 0;
				oSym.addTask(
					400,
					(g, f, e) => {
						ClearChild(e);
						var h = $Z[g];
						h &&
							h.FreeFreezeTime === f &&
							((h.FreeFreezeTime = 0),
							(h.Attack = 50),
							!h.FreeSetbodyTime && ((h.Speed = 0.5 * h.OSpeed), h.isAttacking && h.JudgeAttack()),
							oSym.addTask(
								1500,
								(j, i) => {
									var k = $Z[j];
									k && k.FreeSlowTime === i && ((k.FreeSlowTime = 0), (k.Attack = 100), !k.FreeSetbodyTime && (k.Speed = k.OSpeed));
								},
								[g, (h.FreeSlowTime = oSym.Now + 1500)]
							));
					},
					[c, (d.FreeFreezeTime = oSym.Now + 400), NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", d.getShadow(d), d.Ele)]
				);
			},
			NormalDie() {
				var c = this;
				PlaySound2("zombie_falling_1");
				c.EleBody.src = c.PicArr[c.DieGif];
				oSym.addTask(250, ClearChild, [c.Ele]);
				c.HP = 0;
				delete $Z[c.id];
				c.PZ && oP.MonPrgs();
			},
			ExplosionDie() {
				var c = this;
				c.EleBody.src = c.PicArr[c.BoomDieGif];
				oSym.addTask(300, ClearChild, [c.Ele]);
				c.HP = 0;
				delete $Z[c.id];
				c.PZ && oP.MonPrgs();
			},
			Die() {
				// todo: coins drop
				ClearChild(this.Ele);
				this.HP = 0;
				delete $Z[this.id];
				this.PZ && oP.MonPrgs();
			},
			DisappearDie() {
				this.Die();
			},
			CrushDie() {
				var c = this;
				c.GoingDieHead(c.id, c.PicArr, c);
				this.Die();
			},
			GoingDieHead(e, c, d) {
				oSym.addTask(200, ClearChild, [
					NewImg(0, c[d.HeadGif], "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ),
				]);
			},
			GoingDie(d) {
				var c = this;
				var e = c.id;
				c.EleBody.src = d;
				c.GoingDieHead(e, c.PicArr, c);
				c.beAttacked = 0;
				c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
				c.AutoReduceHP(e);
			},
			AutoReduceHP(c) {
				oSym.addTask(
					100,
					(e) => {
						var d = $Z[e];
						d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e));
					},
					[c]
				);
			},
			JudgeAttack() {
				var g = this;
				var d = g.ZX;
				var e = g.R + "_";
				var f = GetC(d);
				var h = oGd.$;
				var c;
				(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h))
					? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
					: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
			},
			JudgeLR(f, d, e, c, g) {
				return e > 10 || e < 1
					? false
					: (function () {
							d += --e + "_";
							var h = 3;
							var i;
							while (h--) {
								if ((i = g[d + h]) && i.canEat) {
									return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
								}
							}
						})();
			},
			JudgeSR(f, d, e, c, g) {
				return e > 9
					? false
					: (function () {
							d += e + "_";
							var h = 3;
							var i;
							while (h--) {
								if ((i = g[d + h]) && i.canEat) {
									return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
								}
							}
						})();
			},
			JudgeAttackH1() {
				var e = this;
				var d = oZ.getZ0(e.ZX, e.R);
				var c = e.id;
				d && d.beAttacked && d.AttackedLX < 900 && d.Altitude === 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c));
			},
			JudgeAttackH() {
				var e = this;
				var d = oZ.getZ0(e.ZX, e.R);
				var f = e.id;
				var c;
				d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude === 1
					? !e.isAttacking
						? ((e.isAttacking = 1),
							(e.EleBody.src = e.PicArr[e.AttackGif]),
							e.AttackZombie(f, (c = d.id)),
							!d.isAttacking && d.AttackZombie2(d, c, f))
						: e.AttackZombie(f, d.id, 1)
					: e.isAttacking && ((e.isAttacking = 0), (e.EleBody.src = e.PicArr[e.NormalGif]));
			},
			AttackZombie(d, c) {
				oSym.addTask(
					10,
					(f, e) => {
						var h = $Z[f];
						var g;
						h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH());
					},
					[d, c]
				);
			},
			AttackZombie2(e, d, c) {
				e.isAttacking = 1;
				e.EleBody.src = e.PicArr[e.AttackGif];
				oSym.addTask(
					10,
					function (g, f) {
						var i = $Z[g];
						var h;
						i &&
							i.beAttacked &&
							!i.FreeFreezeTime &&
							!i.FreeSetbodyTime &&
							((h = $Z[f])
								? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f]))
								: ((i.isAttacking = 0), (i.EleBody.src = i.PicArr[i.NormalGif])));
					},
					[d, c]
				);
			},
			NormalAttack(d, c) {
				PlaySound2(["chomp", "chomp2", "chompsoft"][Math.floor(Math.random() * 2)]);
				console.log("chomp");
				oSym.addTask(
					100,
					(f, e) => {
						var h = $Z[f];
						var g;
						h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack());
					},
					[d, c]
				);
			},
			PZ: 1,
			ExchangeLR(f, d) {
				var e = f.width;
				var h = f.beAttackedPointL;
				var c = f.beAttackedPointR;
				var g = f.Ele;
				g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
				f.beAttackedPointR = e - h;
				f.EleShadow.style.cssText = f.getShadow(f);
				f.ExchangeLR2(f, f.EleBody, d);
			},
			ExchangeLR2: $User.Browser.IE
				? function (e, c, d) {
						c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph" : "");
					}
				: function (e, c, d) {
						c.className = d ? "fliph" : "";
					},
			bedevil(c) {
				c.ExchangeLR(c, 1);
				c.JudgeAttack = c.JudgeAttackH;
				c.PZ = 0;
				c.WalkDirection = 1;
				c.ZX = c.AttackedRX;
				c.ChkActs = c.ChkActs1;
				oP.MonPrgs();
			},
			SetAlpha: $User.Browser.IE
				? function (f, d, e, c) {
						d.style.filter = (f.CSS_alpha = "alpha(opacity=" + e + ")") + f.CSS_fliph;
					}
				: function (f, d, e, c) {
						const currentFilter = d.style.filter || "";
						const withoutBrightness = currentFilter.replace(/brightness\([^)]+\)\s*/g, "").trim();
						if (c === 1) {
							d.style.filter = `${withoutBrightness} brightness(1)`.trim();
						} else {
							const newBrightness = c / 0.75 + 0.65;
							d.style.filter = `${withoutBrightness} brightness(${newBrightness})`.trim();
						}
					},
		}),
		a
	);
})();
var OrnNoneZombies = (function () {
	var a = function (c, b) {
		if ((c.HP -= b) < c.BreakPoint) {
			c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);
			c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {};
			return;
		}
		c.SetAlpha(c, c.EleBody, 50, 0.5);
		oSym.addTask(
			10,
			(e, d) => {
				(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
			},
			[c.id]
		);
	};

	return InheritO(CZombies, {
		getHit: a,
		getHit0: a,
		getHit1: a,
		getHit2: a,
		getHit3: a,
		getPea(e, b, c) {
			e.PlayNormalballAudio();
			e.getHit0(e, b, c);
		},
		getFirePea(g, c, j) {
			g.PlayFireballAudio();
			(g.FreeSlowTime || g.FreeFreezeTime) && ((g.Speed = g.OSpeed), (g.FreeSlowTime = 0), (g.FreeFreezeTime = 0));
			g.Attack = 100;
			var f = g.AttackedLX;
			var h = g.AttackedRX;
			var b = oZ.getArZ(f, f + 40, g.R);
			var e = b.length;
			while (e--) {
				b[e].getFirePeaSputtering();
			}
			g.getHit0(g, c, j);
		},
		getFirePeaSputtering() {
			this.getHit0(this, 13);
		},
		getSnowPea(f, c, g) {
			var e = f.FreeSlowTime;
			var b = oSym.Now + 1e3;
			e === 0 ? (f.PlaySlowballAudio(), (f.Speed = 0.5 * f.OSpeed), (f.Attack = 50)) : f.PlayNormalballAudio();
			e < b &&
				((f.FreeSlowTime = b),
				oSym.addTask(
					1e3,
					(h, d) => {
						var i = $Z[h];
						i && i.FreeSlowTime === d && ((i.FreeSlowTime = 0), (i.Attack = 100), i.Speed && (i.Speed = i.OSpeed));
					},
					[f.id, b]
				));
			f.getHit0(f, c, g);
		},
	});
})();
var oBackupDancer = InheritO(OrnNoneZombies, {
	EName: "oBackupDancer",
	CName: "Backup Dancer",
	OSpeed: 3.5,
	Speed: 3.5,
	Lvl: 1,
	StandGif: 9,
	CanSelect: 0,
	width: 126,
	height: 152,
	beAttackedPointL: 50,
	beAttackedPointR: 95,
	Speed: 3.5,
	OSpeed: 3.5,
	BookHandPosition: "60% 77.5%",
	PicArr: (function () {
		var a = "images/Zombies/BackupDancer/";
		return [
			"images/Card/Zombies/BackupDancer.png",
			a + "0.gif",
			a + "BackupDancer.gif",
			a + "Attack.gif",
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "BoomDie.gif" + $Random,
			a + "Dancing.gif" + $Random,
			a + "LostHeadDancing.gif" + $Random,
			a + "Mound.gif" + $Random,
		];
	})(),
	bedevil(a) {
		a.ExchangeLR(a, 1);
		a.JudgeAttack = a.JudgeAttackH;
		a.PZ = 0;
		a.WalkDirection = 1;
		a.ZX = a.AttackedRX;
		a.ChkActs = a.ChkActs1;
		a.Speed = 3.5;
		a.ChangeChkActsTo1(a, a.id, a.EleBody);
		oP.MonPrgs();
	},
	getSlow(f, d, e) {
		var b = oSym.Now + e;
		var c = f.FreeSlowTime;
		var a = 0;
		switch (true) {
			case !c:
				f.PlaySlowballAudio();
				f.Attack = 50;
				f.FreeSlowTime = b;
				a = 1;
				break;
			case c < b:
				f.PlayNormalballAudio();
				f.FreeSlowTime = b;
				a = 1;
		}
		a &&
			oSym.addTask(
				e,
				(h, g) => {
					var i = $Z[h];
					i && i.FreeSlowTime === g && ((i.FreeSlowTime = 0), (i.Attack = 100));
				},
				[d, b]
			);
	},
	getFreeze(b, a) {
		b.beAttacked && b.getHit0(b, 20, 0);
		oSym.addTask(
			400,
			(e, d, c) => {
				ClearChild(c);
				var f = $Z[e];
				f &&
					f.FreeFreezeTime === d &&
					((f.FreeFreezeTime = 0),
					(f.Attack = 50),
					!f.FreeSetbodyTime && f.isAttacking && f.JudgeAttack(),
					oSym.addTask(
						1500,
						(h, g) => {
							var i = $Z[h];
							i && i.FreeSlowTime === g && ((i.FreeSlowTime = 0), (i.Attack = 100));
						},
						[e, (f.FreeSlowTime = oSym.Now + 1500)]
					));
			},
			[a, (b.FreeFreezeTime = oSym.Now + 400), NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", b.getShadow(b), b.Ele)]
		);
	},
	CustomBirth(g, d, a, b, j) {
		var e = this;
		var c = GetY(g) + e.GetDY();
		var f = c - e.height;
		var i = e.beAttackedPointL;
		var h = e.beAttackedPointR;
		e.AttackedRX = (e.X = (e.ZX = e.AttackedLX = d - (h - i) * 0.5) - i) + h;
		e.R = g;
		(e.delayT = a) && (e.FreeSetbodyTime = oSym.Now);
		return e.getHTML((e.id = b), e.X, (e.pixelTop = f), (e.zIndex = 3 * g + 1), "none", j || 0, e.height + "px", e.PicArr[e.StandGif]);
	},
	Produce:
		'<font color="#28325A">These zombies appear in sets of four<br>whenever Dancing Zombie rocks out.</font><p>Toughness: <font color="#CC241D">low</font></p>Backup Dancer Zombie spent six years<br>perfecting his art at the Chewliard<br>Performing Arts School in Zombie New<br>York City.',
	BirthCallBack(e) {
		var d = e.delayT;
		var c = e.id;
		var b = (e.Ele = $(c));
		var a = (e.EleBody = b.childNodes[1]);
		e.EleShadow = b.firstChild;
		oSym.addTask(
			d,
			(g, f) => {
				var h = $Z[g];
				h && ((h.FreeSetbodyTime = 0), SetBlock(f));
			},
			[c, b]
		);
	},
	ChangeChkActsTo0(c, b, a) {
		if (!c.PZ) {
			c.ChangeChkActsTo1(c, b, a);
			return;
		}
		c.LostHeadGif = 10;
		c.NormalGif = 9;
		!c.isAttacking && (a.src = c.PicArr[9]);
		c.Speed = c.DZStep = 0;
		oSym.addTask(
			200,
			(e, d) => {
				var f = $Z[e];
				f && f.beAttacked && f.ChangeChkActsTo1(f, e, d);
			},
			[b, a]
		);
	},
	ChangeChkActsTo1(c, b, a) {
		c.LostHeadGif = 4;
		c.NormalGif = 2;
		c.DZStep = 1;
		!c.isAttacking && (a.src = c.PicArr[2]);
		c.PZ &&
			oSym.addTask(
				220,
				(e, d) => {
					var f = $Z[e];
					f && f.beAttacked && f.ChangeChkActsTo0(f, e, d);
				},
				[b, a]
			);
	},
	ChkActs(g, d, h, c) {
		var e;
		var b;
		var a;
		var f;
		!(g.FreeFreezeTime || g.FreeSetbodyTime)
			? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
				(e = g.id),
				!g.isAttacking
					? (a = g.AttackedRX -= b = g.Speed) < -50
						? (h.splice(c, 1), g.DisappearDie(), (f = 0))
						: (a < 100 &&
								!g.PointZombie &&
								((g.PointZombie = 1),
								!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
								g.ChangeR({
									R: d,
									ar: [oS.R - 1],
									CustomTop: 400 - g.height + g.GetDY(),
								})),
							(g.ZX = g.AttackedLX -= b),
							(g.Ele.style.left = Math.floor((g.X -= b)) + "px"),
							(f = 1))
					: (f = 1))
			: (f = 1);
		g.ChkSpeed(g);
		return f;
	},
	ChkSpeed(b) {
		if (!b.DZStep) {
			return;
		}
		var a = b.Speed;
		switch (true) {
			case (b.FreeFreezeTime || b.FreeSetbodyTime) === 1:
				a && (b.Speed = 0);
				break;
			case b.FreeSlowTime > 0:
				a !== 1.75 && (b.Speed = 1.75);
				break;
			default:
				a !== 3.5 && (b.Speed = 3.5);
		}
	},
});
var oDancingZombie = InheritO(OrnNoneZombies, {
	EName: "oDancingZombie",
	CName: "Dancing Zombie ",
	HP: 500,
	BreakPoint: 166,
	Lvl: 3,
	StandGif: 9,
	SunNum: 350,
	beAttackedPointL: 40,
	beAttackedPointR: 85,
	width: 184,
	height: 176,
	AudioArr: ["dancer"],
	OSpeed: 7.2,
	Speed: 7.2,
	NormalGif: 9,
	GetDTop: 5,
	getShadow(a) {
		return "left:30px;top:146px";
	},
	GetDX() {
		return -50;
	},
	GetDY() {
		return -5;
	},
	LostHeadGif: 14,
	addSpotlight: (function () {
		var a;
		var b;
		$User.Browser.IE6 ? ((a = "_8"), (b = "filter:alpha(opacity=30)")) : (a = b = "");
		return function (d, f, c) {
			var g = $Z[d];
			var e;
			NewEle(d + "_spotlightCon", "div", "position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden", 0, c).appendChild(
				(g.spotlight = NewImg(d + "_spotlight", "images/Zombies/DancingZombie/spotlight" + a + ".png", "left:0;top:0;width:920px;height:600px;" + b))
			);
			e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
			c.insertBefore(e, f.EleShadow);
			e.appendChild(
				(g.spotlight2 = NewImg(d + "_spotlight2", "images/Zombies/DancingZombie/spotlight2" + a + ".png", "left:0;top:0;width:920px;height:60px;" + b))
			);
		};
	})(),
	BookHandPosition: "86% 72%",
	PicArr: (function () {
		var d = "images/Zombies/DancingZombie/";
		var c = $User.Browser.IE6 ? "_8" : "";
		var a = d + "spotlight" + c + ".png" + $Random;
		var b = d + "spotlight2" + c + ".png" + $Random;
		return [
			"images/Card/Zombies/DancingZombie.png",
			d + "0.gif",
			d + "DancingZombie.gif",
			d + "Attack.gif",
			d + "LostHead.gif",
			d + "LostHeadAttack.gif",
			d + "Head.gif" + $Random,
			d + "Die.gif" + $Random,
			d + "BoomDie.gif" + $Random,
			d + "SlidingStep.gif" + $Random,
			d + "Dancing.gif" + $Random,
			d + "Summon1.gif",
			d + "Summon2.gif",
			d + "Summon3.gif",
			d + "LostHeadSlidingStep.gif" + $Random,
			d + "LostHeadDancing.gif" + $Random,
			d + "LostHeadSummon.gif" + $Random,
			a,
			b,
		];
	})(),
	Produce:
		'<font color="#28325A">Any resemblance between Dancing Zombie<br>and persons living or dead is purely<br>coincidental.</font><p>Toughness: <font color="#CC241D">medium</font><br>Special: <font color="#CC241D">summons back-up dancers</font></p>Dancing Zombie\'s latest album,<br>"GrarrBRAINSarblarbl," is already<br>rocketing up the undead charts.',
	getSnowPea() {
		this.PlaySlowballAudio();
	},
	NormalDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(300, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		this.ResetBackupDancer(this);
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.GoingDieHead(a.id, a.PicArr, a);
		ClearChild(a.Ele);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	bedevil(b) {
		var a = b.id;
		b.ExchangeLR(b, 1);
		b.JudgeAttack = b.JudgeAttackH;
		b.PZ = 0;
		b.WalkDirection = 1;
		b.ZX = b.AttackedRX;
		b.ChkActs = b.ChkActs1;
		b.ChangeChkActsTo1(b, a, b.EleBody);
		b.ResetBackupDancer(b);
		(($(a + "_spotlightCon").style.left = "20px"), ($(a + "_spotlight2Con").style.left = "25px"));
		oP.MonPrgs();
	},
	ResetBackupDancer(f) {
		var g = f.ArDZ;
		var d = g.length;
		var c;
		var b;
		var e;
		var a = f.DZStep;
		while (d--) {
			if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
				if (a > 0) {
					switch (true) {
						case (e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
							e.Speed = 0;
							break;
						case e.FreeSlowTime > 0:
							e.Speed = 1.75;
							break;
						default:
							e.Speed = 3.5;
					}
				}
			}
		}
		a > -1 &&
			oSym.addTask(
				f.DZStepT - oSym.Now,
				(o, j) => {
					var m = 4;
					var l;
					var k;
					var n;
					var h = "ChangeChkActsTo" + j;
					while (m--) {
						(l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && ((n.DZStep = j), n[h](n, k, n.EleBody));
					}
				},
				[g, [1, 0][a]]
			);
	},
	BirthCallBack(d) {
		var b = d.delayT;
		var l = d.id;
		var a = (d.Ele = $(l));
		var c = 320;
		var i = oGd.$LF;
		var g = d.R;
		var s = g - 1;
		var n = g + 1;
		var e;
		var r;
		var q = LX - 60;
		var m = LX + 100;
		var k = LX - 130;
		var j = LX - 70;
		var h = LX + 30;
		var f = (d.ArDZ = [0, 0, 0, 0]);
		d.EleShadow = a.firstChild;
		d.EleBody = a.childNodes[1];
		s > 0 &&
			(e = i[s]) &&
			e !== 2 &&
			(f[0] = [
				"",
				s,
				function (o) {
					return o;
				},
				3 * s + 2,
				function (o) {
					return o - 70;
				},
				GetY(s) - 155,
			]);
		n <= oS.R &&
			(e = i[n]) &&
			e !== 2 &&
			(f[2] = [
				"",
				n,
				function (o) {
					return o;
				},
				3 * n + 2,
				function (o) {
					return o - 70;
				},
				GetY(n) - 155,
			]);
		e = 3 * g + 2;
		r = GetY(g) - 155;
		f[3] = [
			"",
			g,
			function (o) {
				return o - 60;
			},
			e,
			function (o) {
				return o - 130;
			},
			r,
		];
		f[1] = [
			"",
			g,
			function (o) {
				return o + 100;
			},
			e,
			function (o) {
				return o + 30;
			},
			r,
		];
		func = function (t, o) {
			var u = $Z[t];
			u && (u.ExchangeLR(d, 1), (u.DZMSpeed = 7.2), (u.DZStep = -1), (u.DZStepT = oSym.Now + 220), (u.FreeSetbodyTime = 0), SetBlock(o));
		};
		b ? (oSym.addTask(b, func, [l, a]), (c += b)) : func(l, a);
		oSym.addTask(
			c,
			(o) => {
				var t = $Z[o];
				t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
			},
			[d.id]
		);
	},
	ChkActs1(e, b, f, a) {
		var c;
		var d;
		!(e.FreeFreezeTime || e.FreeSetbodyTime)
			? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
				(c = e.id),
				!e.isAttacking
					? (e.AttackedLX += 3.5) > oS.W
						? (f.splice(a, 1), e.DisappearDie(), (d = 0))
						: ((e.ZX = e.AttackedRX += 3.5), (e.Ele.style.left = Math.ceil((e.X += 3.5)) + "px"), (d = 1))
					: (d = 1))
			: (d = 1);
		return d;
	},
	ChkTmp(c, b, d, a) {
		c.ChkSpeed(c);
		return 0;
	},
	ChkActs(g, d, h, c) {
		var e;
		var b;
		var a;
		var f;
		!(g.FreeFreezeTime || g.FreeSetbodyTime)
			? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
				(e = g.id),
				!g.isAttacking
					? (a = g.AttackedRX -= b = g.Speed) < -50
						? (h.splice(c, 1), g.DisappearDie(), (f = 0))
						: (a < 100 &&
								!g.PointZombie &&
								((g.PointZombie = 1),
								!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
								g.ChangeR({
									R: d,
									ar: [oS.R - 1],
									CustomTop: 400 - g.height + g.GetDY(),
								})),
							(g.ZX = g.AttackedLX -= b),
							(g.Ele.style.left = Math.floor((g.X -= b)) + "px"),
							(f = 1))
					: (f = 1))
			: (f = 1);
		g.ChkSpeed(g);
		return f;
	},
	ChkSpeed(g) {
		if (!g.DZStep) {
			return;
		}
		var h = g.ArDZ;
		var d = 4;
		var c;
		var b;
		var e;
		var a = g.OSpeed;
		var f = [];
		switch (true) {
			case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) === 1:
				a = 0;
				break;
			case g.FreeSlowTime > 0:
				a !== 1.75 && (a = 1.75);
		}
		while (d--) {
			if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
				f.push(e);
				switch (true) {
					case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
						a = 0;
						break;
					case e.FreeSlowTime > 0:
						a !== 1.75 && (a = 1.75);
				}
			}
		}
		if (a !== g.DZMSpeed) {
			g.DZMSpeed = a;
			d = f.length;
			while (d--) {
				(e = f[d]).Speed !== a && (e.Speed = a);
			}
			g.Speed !== a && (g.Speed = a);
		}
	},
	AttackZombie(a) {
		this.ExchangeLR(this, 0);
		var b = this.id;
		this.isAttacking = 1;
		this.EleBody.src = this.PicArr[this.AttackGif];
		oSym.addTask(
			10,
			function (d, c) {
				var f = $Z[d];
				var e;
				f &&
					f.beAttacked &&
					!f.FreeFreezeTime &&
					!f.FreeSetbodyTime &&
					((e = $Z[c])
						? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c]))
						: ((f.isAttacking = 0), (f.EleBody.src = f.PicArr[f.NormalGif]), f.TurnLeft(f)));
			},
			[b, a]
		);
	},
	ChkBackupDancer(h, g, f) {
		if (!h.PZ) {
			h.ChangeChkActsTo1(h, g, f);
			return;
		}
		var b = h.ArDZ;
		var d = 4;
		var j = 1;
		var c;
		var e;
		var a;
		while (d--) {
			(e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : ((e[0] = ""), true))) && (d = j = 0);
		}
		!h.isAttacking && j ? (f.src = h.PicArr[10]) : h.Summon(h, g);
		h.ChangeChkActsTo0(h, g, f);
	},
	ChangeChkActsTo0(g, e, a) {
		if (!g.PZ) {
			g.ChangeChkActsTo1(g, e, a);
			return;
		}
		var d = 4;
		var h = g.ArDZ;
		var c;
		var b;
		var f;
		while (d--) {
			(b = h[d]) &&
				(c = b[0]) &&
				(f = $Z[c]) &&
				f.beAttacked &&
				((f.LostHeadGif = 10), (f.NormalGif = 9), !f.isAttacking && (f.EleBody.src = f.PicArr[9]), (f.Speed = 0));
		}
		g.LostHeadGif = 15;
		g.NormalGif = 10;
		g.Speed = g.DZMSpeed = g.DZStep = 0;
		g.DZStepT = oSym.Now + 200;
		oSym.addTask(
			200,
			(j, i) => {
				var k = $Z[j];
				k && k.beAttacked && k.ChangeChkActsTo1(k, j, i);
			},
			[e, a]
		);
	},
	ChangeChkActsTo1(g, e, a) {
		var d = 4;
		var h = g.ArDZ;
		var c;
		var b;
		var f;
		while (d--) {
			(b = h[d]) &&
				(c = b[0]) &&
				(f = $Z[c]) &&
				f.beAttacked &&
				((f.LostHeadGif = 4), (f.NormalGif = 2), !f.isAttacking && (f.EleBody.src = f.PicArr[2]));
		}
		g.LostHeadGif = 4;
		g.NormalGif = 2;
		g.DZStep = 1;
		g.DZStepT = oSym.Now + 220;
		!g.isAttacking && (a.src = g.PicArr[2]);
		g.PZ &&
			oSym.addTask(
				220,
				(j, i) => {
					var k = $Z[j];
					k && k.beAttacked && k.ChkBackupDancer(k, j, i);
				},
				[e, a]
			);
	},
	TurnLeft(c) {
		var a = CZombies.prototype;
		var b = c.id;
		c.AttackZombie = a.AttackZombie;
		c.NormalAttack = a.NormalAttack;
		c.OSpeed = 3.5;
		!(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
		c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
		c.getFreeze = CZombies.prototype.getFreeze;
		oSym.addTask(
			20,
			(d, e) => {
				$Z[d] &&
					e.beAttacked &&
					(e.addSpotlight(d, e, e.Ele),
					oSym.addTask(
						200,
						function (g, f, i, h, k) {
							var j = $Z[g];
							j &&
								(h > -736 ? (h -= 184) : (h = 0),
								(f.style.left = h + "px"),
								k > -736 ? (k -= 184) : (k = 0),
								(i.style.left = k + "px"),
								oSym.addTask(100, arguments.callee, [g, f, i, h, k]));
						},
						[d, e.spotlight, e.spotlight2, 0, 0]
					),
					oSym.addTask(
						200,
						(h, g) => {
							var f;
							$Z[g] &&
								h.beAttacked &&
								((f = h.EleBody), !h.isAttacking ? (f.src = h.PicArr[10]) : (h.isAttacking = 0), h.ChangeChkActsTo0(h, g, f));
						},
						[e, d]
					));
			},
			[b, c]
		);
		c.Summon(c, b);
	},
	NormalAttack(a) {
		var b = $Z[a];
		b.ExchangeLR(b, 0);
		b.TurnLeft(b);
	},
	Summon(d, c) {
		d.LostHeadGif = 16;
		var a = d.EleBody;
		var b = d.ChkActs;
		d.ChkActs = d.ChkTmp;
		d.ChkTmp = b;
		a.src = "images/Zombies/DancingZombie/Summon1.gif";
		PlaySound2("dancer");
		oSym.addTask(
			10,
			(f, e) => {
				var g = $Z[f];
				g &&
					g.beAttacked &&
					((e.src = "images/Zombies/DancingZombie/Summon2.gif"),
					oSym.addTask(
						// zombie existed here
						10,
						(t, s, x) => {
							var h = $Z[t];
							if (!h) {
								return;
							}
							var v = h.ZX;
							var m = h.ArDZ;
							var n = [];
							var k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random();
							var r = 4;
							var w = [];
							var u = [];
							var o = 0;
							var q;
							var l;
							if (h.beAttacked) {
								s.src = "images/Zombies/DancingZombie/Summon3.gif";
								while (r--) {
									(q = m[r]) &&
										(!(l = q[0]) || !$Z[l]) &&
										((u[o] = (w[o] = new oBackupDancer()).CustomBirth(q[1], q[2](v), 100, (q[0] = "Z_" + Math.random()))),
										n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)),
										++o);
								}
								oSym.addTask(
									220,
									function () {
										var i = arguments.length;
										while (i--) {
											ClearChild(arguments[i]);
										}
									},
									n
								);
								oSym.addTask(
									110,
									(A, y, z, i) => {
										var B = $Z[A];
										B &&
											B.beAttacked &&
											(oP.AppearUP(y, z, i),
											oSym.addTask(
												100,
												(D, C) => {
													var E = $Z[D];
													if (E && E.beAttacked) {
														return;
													}
													var j = C.length;
													var E;
													while (j--) {
														(E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody);
													}
												},
												[A, z]
											));
									},
									[t, u, w, o]
								);
								oSym.addTask(
									200,
									(y, i) => {
										var z = $Z[y];
										var j;
										z && z.beAttacked && ((j = z.ChkActs), (z.ChkActs = z.ChkTmp), (z.ChkTmp = j));
									},
									[t, s]
								);
							}
						},
						[f, e]
					));
			},
			[c, a]
		);
	},
});
var oIDancingZombie = InheritO(OrnNoneZombies, {
	EName: "oIDancingZombie",
	CName: "Dancing Zombie",
	HP: 500,
	BreakPoint: 166,
	Lvl: 3,
	StandGif: 9,
	SunNum: 350,
	beAttackedPointL: 40,
	beAttackedPointR: 85,
	width: 184,
	height: 176,
	BookHandPosition: "70% 70%",
	AudioArr: ["dancer"],
	OSpeed: 7.2,
	Speed: 7.2,
	NormalGif: 9,
	GetDTop: 5,
	getShadow(a) {
		return "left:30px;top:146px";
	},
	GetDX() {
		return -50;
	},
	GetDY() {
		return -5;
	},
	LostHeadGif: 14,
	addSpotlight: (function () {
		var a;
		var b;
		$User.Browser.IE6 ? ((a = "_8"), (b = "filter:alpha(opacity=30)")) : (a = b = "");
		return function (d, f, c) {
			var g = $Z[d];
			var e;
			NewEle(d + "_spotlightCon", "div", "position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden", 0, c).appendChild(
				(g.spotlight = NewImg(d + "_spotlight", "images/Zombies/DancingZombie/spotlight" + a + ".png", "left:0;top:0;width:920px;height:600px;" + b))
			);
			e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
			c.insertBefore(e, f.EleShadow);
			e.appendChild(
				(g.spotlight2 = NewImg(d + "_spotlight2", "images/Zombies/DancingZombie/spotlight2" + a + ".png", "left:0;top:0;width:920px;height:60px;" + b))
			);
		};
	})(),
	PicArr: (function () {
		var d = "images/Zombies/DancingZombie/";
		var c = $User.Browser.IE6 ? "_8" : "";
		var a = d + "spotlight" + c + ".png" + $Random;
		var b = d + "spotlight2" + c + ".png" + $Random;
		return [
			"images/Card/Zombies/IDancingZombie.png",
			d + "0.gif",
			d + "DancingZombie.gif",
			d + "Attack.gif",
			d + "LostHead.gif",
			d + "LostHeadAttack.gif",
			d + "Head.gif" + $Random,
			d + "Die.gif" + $Random,
			d + "BoomDie.gif" + $Random,
			d + "SlidingStep.gif" + $Random,
			d + "Dancing.gif" + $Random,
			d + "Summon1.gif",
			d + "Summon2.gif",
			d + "Summon3.gif",
			d + "LostHeadSlidingStep.gif" + $Random,
			d + "LostHeadDancing.gif" + $Random,
			d + "LostHeadSummon.gif" + $Random,
			a,
			b,
		];
	})(),
	Produce:
		'舞王僵尸和人类(在世或者死去的)如有雷同，纯属巧合。</p><p>韧性：<font color="#CC241D">中</font><br>特点：<font color="#CC241D">召唤伴舞僵尸</font></p>舞王僵尸的最新唱片“抓住脑子啃啊啃”在僵尸界的人气正急速飙升。',
	getSnowPea() {
		this.PlaySlowballAudio();
	},
	NormalDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(300, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		this.ResetBackupDancer(this);
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		var a = this;
		a.ResetBackupDancer(a);
		a.GoingDieHead(a.id, a.PicArr, a);
		ClearChild(a.Ele);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	bedevil(b) {
		var a = b.id;
		b.ExchangeLR(b, 1);
		b.JudgeAttack = b.JudgeAttackH;
		b.PZ = 0;
		b.WalkDirection = 1;
		b.ZX = b.AttackedRX;
		b.ChkActs = b.ChkActs1;
		b.ChangeChkActsTo1(b, a, b.EleBody);
		b.ResetBackupDancer(b);
		(($(a + "_spotlightCon").style.left = "20px"), ($(a + "_spotlight2Con").style.left = "25px"));
		oP.MonPrgs();
	},
	ResetBackupDancer(f) {
		var g = f.ArDZ;
		var d = g.length;
		var c;
		var b;
		var e;
		var a = f.DZStep;
		while (d--) {
			if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
				if (a > 0) {
					switch (true) {
						case (e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
							e.Speed = 0;
							break;
						case e.FreeSlowTime > 0:
							e.Speed = 1.75;
							break;
						default:
							e.Speed = 3.5;
					}
				}
			}
		}
		a > -1 &&
			oSym.addTask(
				f.DZStepT - oSym.Now,
				(o, j) => {
					var m = 4;
					var l;
					var k;
					var n;
					var h = "ChangeChkActsTo" + j;
					while (m--) {
						(l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && ((n.DZStep = j), n[h](n, k, n.EleBody));
					}
				},
				[g, [1, 0][a]]
			);
	},
	BirthCallBack(d) {
		var b = d.delayT;
		var l = d.id;
		var a = (d.Ele = $(l));
		var c = 320;
		var i = oGd.$LF;
		var g = d.R;
		var s = g - 1;
		var n = g + 1;
		var e;
		var r;
		var q = LX - 60;
		var m = LX + 100;
		var k = LX - 130;
		var j = LX - 70;
		var h = LX + 30;
		var f = (d.ArDZ = [0, 0, 0, 0]);
		d.EleShadow = a.firstChild;
		d.EleBody = a.childNodes[1];
		s > 0 &&
			(e = i[s]) &&
			e !== 2 &&
			(f[0] = [
				"",
				s,
				function (o) {
					return o;
				},
				3 * s + 2,
				function (o) {
					return o - 70;
				},
				GetY(s) - 155,
			]);
		n <= oS.R &&
			(e = i[n]) &&
			e !== 2 &&
			(f[2] = [
				"",
				n,
				function (o) {
					return o;
				},
				3 * n + 2,
				function (o) {
					return o - 70;
				},
				GetY(n) - 155,
			]);
		e = 3 * g + 2;
		r = GetY(g) - 155;
		f[3] = [
			"",
			g,
			function (o) {
				return o - 60;
			},
			e,
			function (o) {
				return o - 130;
			},
			r,
		];
		f[1] = [
			"",
			g,
			function (o) {
				return o + 100;
			},
			e,
			function (o) {
				return o + 30;
			},
			r,
		];
		func = function (t, o) {
			var u = $Z[t];
			u && (u.ExchangeLR(d, 1), (u.DZMSpeed = 7.2), (u.DZStep = -1), (u.DZStepT = oSym.Now + 220), (u.FreeSetbodyTime = 0), SetBlock(o));
		};
		b ? (oSym.addTask(b, func, [l, a]), (c += b)) : func(l, a);
		oSym.addTask(
			c,
			(o) => {
				var t = $Z[o];
				t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
			},
			[d.id]
		);
	},
	ChkActs1(e, b, f, a) {
		var c;
		var d;
		!(e.FreeFreezeTime || e.FreeSetbodyTime)
			? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
				(c = e.id),
				!e.isAttacking
					? (e.AttackedLX += 3.5) > oS.W
						? (f.splice(a, 1), e.DisappearDie(), (d = 0))
						: ((e.ZX = e.AttackedRX += 3.5), (e.Ele.style.left = Math.ceil((e.X += 3.5)) + "px"), (d = 1))
					: (d = 1))
			: (d = 1);
		return d;
	},
	ChkTmp(c, b, d, a) {
		c.ChkSpeed(c);
		return 0;
	},
	ChkActs(g, d, h, c) {
		var e;
		var b;
		var a;
		var f;
		!(g.FreeFreezeTime || g.FreeSetbodyTime)
			? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
				(e = g.id),
				!g.isAttacking
					? (a = g.AttackedRX -= b = g.Speed) < -50
						? (h.splice(c, 1), g.DisappearDie(), (f = 0))
						: (a < 100 &&
								!g.PointZombie &&
								((g.PointZombie = 1),
								!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
								g.ChangeR({
									R: d,
									ar: [oS.R - 1],
									CustomTop: 400 - g.height + g.GetDY(),
								})),
							(g.ZX = g.AttackedLX -= b),
							(g.Ele.style.left = Math.floor((g.X -= b)) + "px"),
							(f = 1))
					: (f = 1))
			: (f = 1);
		g.ChkSpeed(g);
		return f;
	},
	ChkSpeed(g) {
		if (!g.DZStep) {
			return;
		}
		var h = g.ArDZ;
		var d = 4;
		var c;
		var b;
		var e;
		var a = g.OSpeed;
		var f = [];
		switch (true) {
			case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) === 1:
				a = 0;
				break;
			case g.FreeSlowTime > 0:
				a !== 1.75 && (a = 1.75);
		}
		while (d--) {
			if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
				f.push(e);
				switch (true) {
					case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
						a = 0;
						break;
					case e.FreeSlowTime > 0:
						a !== 1.75 && (a = 1.75);
				}
			}
		}
		if (a !== g.DZMSpeed) {
			g.DZMSpeed = a;
			d = f.length;
			while (d--) {
				(e = f[d]).Speed !== a && (e.Speed = a);
			}
			g.Speed !== a && (g.Speed = a);
		}
	},
	AttackZombie(a) {
		this.ExchangeLR(this, 0);
		var b = this.id;
		this.isAttacking = 1;
		this.EleBody.src = this.PicArr[this.AttackGif];
		oSym.addTask(
			10,
			function (d, c) {
				var f = $Z[d];
				var e;
				f &&
					f.beAttacked &&
					!f.FreeFreezeTime &&
					!f.FreeSetbodyTime &&
					((e = $Z[c])
						? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c]))
						: ((f.isAttacking = 0), (f.EleBody.src = f.PicArr[f.NormalGif]), f.TurnLeft(f)));
			},
			[b, a]
		);
	},
	ChkBackupDancer(h, g, f) {
		if (!h.PZ) {
			h.ChangeChkActsTo1(h, g, f);
			return;
		}
		var b = h.ArDZ;
		var d = 4;
		var j = 1;
		var c;
		var e;
		var a;
		while (d--) {
			(e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : ((e[0] = ""), true))) && (d = j = 0);
		}
		!h.isAttacking && j ? (f.src = h.PicArr[10]) : h.Summon(h, g);
		h.ChangeChkActsTo0(h, g, f);
	},
	ChangeChkActsTo0(g, e, a) {
		if (!g.PZ) {
			g.ChangeChkActsTo1(g, e, a);
			return;
		}
		var d = 4;
		var h = g.ArDZ;
		var c;
		var b;
		var f;
		while (d--) {
			(b = h[d]) &&
				(c = b[0]) &&
				(f = $Z[c]) &&
				f.beAttacked &&
				((f.LostHeadGif = 10), (f.NormalGif = 9), !f.isAttacking && (f.EleBody.src = f.PicArr[9]), (f.Speed = 0));
		}
		g.LostHeadGif = 15;
		g.NormalGif = 10;
		g.Speed = g.DZMSpeed = g.DZStep = 0;
		g.DZStepT = oSym.Now + 200;
		oSym.addTask(
			200,
			(j, i) => {
				var k = $Z[j];
				k && k.beAttacked && k.ChangeChkActsTo1(k, j, i);
			},
			[e, a]
		);
	},
	ChangeChkActsTo1(g, e, a) {
		var d = 4;
		var h = g.ArDZ;
		var c;
		var b;
		var f;
		while (d--) {
			(b = h[d]) &&
				(c = b[0]) &&
				(f = $Z[c]) &&
				f.beAttacked &&
				((f.LostHeadGif = 4), (f.NormalGif = 2), !f.isAttacking && (f.EleBody.src = f.PicArr[2]));
		}
		g.LostHeadGif = 4;
		g.NormalGif = 2;
		g.DZStep = 1;
		g.DZStepT = oSym.Now + 220;
		!g.isAttacking && (a.src = g.PicArr[2]);
		g.PZ &&
			oSym.addTask(
				220,
				(j, i) => {
					var k = $Z[j];
					k && k.beAttacked && k.ChkBackupDancer(k, j, i);
				},
				[e, a]
			);
	},
	TurnLeft(c) {
		var a = CZombies.prototype;
		var b = c.id;
		c.AttackZombie = a.AttackZombie;
		c.NormalAttack = a.NormalAttack;
		c.OSpeed = 3.5;
		!(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
		c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
		c.getFreeze = CZombies.prototype.getFreeze;
		oSym.addTask(
			20,
			(d, e) => {
				$Z[d] &&
					e.beAttacked &&
					(e.addSpotlight(d, e, e.Ele),
					oSym.addTask(
						200,
						function (g, f, i, h, k) {
							var j = $Z[g];
							j &&
								(h > -736 ? (h -= 184) : (h = 0),
								(f.style.left = h + "px"),
								k > -736 ? (k -= 184) : (k = 0),
								(i.style.left = k + "px"),
								oSym.addTask(100, arguments.callee, [g, f, i, h, k]));
						},
						[d, e.spotlight, e.spotlight2, 0, 0]
					),
					oSym.addTask(
						200,
						(h, g) => {
							var f;
							$Z[g] &&
								h.beAttacked &&
								((f = h.EleBody), !h.isAttacking ? (f.src = h.PicArr[10]) : (h.isAttacking = 0), h.ChangeChkActsTo0(h, g, f));
						},
						[e, d]
					));
			},
			[b, c]
		);
		c.Summon(c, b);
	},
	NormalAttack(a) {
		var b = $Z[a];
		b.ExchangeLR(b, 0);
		b.TurnLeft(b);
	},
	Summon(d, c) {
		d.LostHeadGif = 16;
		var a = d.EleBody;
		var b = d.ChkActs;
		d.ChkActs = d.ChkTmp;
		d.ChkTmp = b;
		a.src = "images/Zombies/DancingZombie/Summon1.gif";
		PlaySound2("dancer");
		oSym.addTask(
			10,
			(f, e) => {
				var g = $Z[f];
				g &&
					g.beAttacked &&
					((e.src = "images/Zombies/DancingZombie/Summon2.gif"),
					oSym.addTask(
						10,
						(t, s, x) => {
							var h = $Z[t];
							var v = h.ZX;
							var m = h.ArDZ;
							var n = [];
							var k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random();
							var r = 4;
							var w = [];
							var u = [];
							var o = 0;
							var q;
							var l;
							if (h && h.beAttacked) {
								s.src = "images/Zombies/DancingZombie/Summon3.gif";
								while (r--) {
									(q = m[r]) &&
										(!(l = q[0]) || !$Z[l]) &&
										((u[o] = (w[o] = new oBackupDancer()).CustomBirth(q[1], q[2](v), 100, (q[0] = "Z_" + Math.random()))),
										n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)),
										++o);
								}
								oSym.addTask(
									220,
									function () {
										var i = arguments.length;
										while (i--) {
											ClearChild(arguments[i]);
										}
									},
									n
								);
								oSym.addTask(
									110,
									(A, y, z, i) => {
										var B = $Z[A];
										B &&
											B.beAttacked &&
											(oP.AppearUP(y, z, i),
											oSym.addTask(
												100,
												(D, C) => {
													var E = $Z[D];
													if (E && E.beAttacked) {
														return;
													}
													var j = C.length;
													var E;
													while (j--) {
														(E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody);
													}
												},
												[A, z]
											));
									},
									[t, u, w, o]
								);
								oSym.addTask(
									200,
									(y, i) => {
										var z = $Z[y];
										var j;
										z && z.beAttacked && ((j = z.ChkActs), (z.ChkActs = z.ChkTmp), (z.ChkTmp = j));
									},
									[t, s]
								);
							}
						},
						[f, e]
					));
			},
			[c, a]
		);
	},
});
var oZombie = InheritO(OrnNoneZombies, {
	EName: "oZombie",
	CName: "Zombie",
	StandGif: 9,
	HeadPosition: [
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
	],
	BookHandPosition: "35% 70%",
	PicArr: (function () {
		var a = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/Zombie.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif",
			a + "ZombieDie.gif",
			"images/Zombies/BoomDie.gif",
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Regular Garden-variety Zombie</font><p>Toughness: <font color="#CC241D">low</font></p>This zombie loves brains. Can\'t get<br>enough. Brains, brains, brains, day in and<br>night out. Old and stinky brains? Rotten<br>brains? Brains clearly past their prime?<br>Doesn\'t matter. Regular zombie wants \'em.',
});
var oIZombie = InheritO(OrnNoneZombies, {
	EName: "oIZombie",
	CName: "Zombie",
	StandGif: 9,
	PicArr: (function () {
		var a = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/IZombie.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'韧性：<font color="#CC241D">低</font></p>这种僵尸喜爱脑髓，贪婪而不知足。脑髓，脑髓，脑髓，夜以继日地追求着。老而臭的脑髓？腐烂的脑髓？都没关系。僵尸需要它们。',
});
var oZombie2 = InheritO(oZombie, { EName: "oZombie2" });
var oZombie3 = InheritO(oZombie, { EName: "oZombie3" });
var oMustacheZombie = InheritO(oZombie, {
	EName: "oMustacheZombie",
	CName: "Mustache Zombie",
	HP: 540,
	Produce:
		'<font color="#28325A">A mysterious zombie that appears in the<br>Evergreen Tower.</font><p>Toughness: <font color="#CC241D">high</font></p>"Ginger gets spicier with age" is a saying<br>that also exists in the zombie world.<br>Thus, some old zombies have also<br>gone to the battlefield.',
	PicArr: (function () {
		var a = "images/Zombies/Zombie/";
		var b = "images/Zombies/MustacheZombie/";
		return [
			"images/Card/Zombies/MustacheZombie.png",
			b + "0.gif",
			b + "Zombie.gif",
			b + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			b + "1.gif",
		];
	})(),
});
var oFlagZombie = InheritO(oZombie, {
	PicArr: (function () {
		var a = "images/Zombies/FlagZombie/";
		return [
			"images/Card/Zombies/FlagZombie.png",
			a + "0.gif",
			a + "FlagZombie.gif",
			a + "FlagZombieAttack.gif",
			a + "FlagZombieLostHead.gif",
			a + "FlagZombieLostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			"images/Zombies/Zombie/ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	EName: "oFlagZombie",
	CName: "Flag Zombie",
	OSpeed: 2.2,
	Speed: 2.2,
	beAttackedPointR: 101,
	AlmanacGif: 1,
	Produce:
		'<font color="#28325A">Flag Zombie marks the arrival of a huge<br>pile or "wave" of zombies.</font><p>Toughness: <font color="#CC241D">low</font></p>Make no mistake, Flag Zombie loves brains.<br>But somewhere down the line he also picked<br>up a fascination with flags. Maybe it\'s<br>because the flags always have brains on<br>them. Hard to say.',
});
var OrnIZombies = (function () {
	var a = function (f, b) {
		var d = f.OrnHP;
		var c = f.HP;
		var e = OrnNoneZombies.prototype;
		(d = f.OrnHP -= b) < 1 &&
			((f.HP += d),
			(f.Ornaments = 0),
			(f.EleBody.src = f.PicArr[[(f.NormalGif = f.OrnLostNormalGif), (f.AttackGif = f.OrnLostAttackGif)][f.isAttacking]]),
			(f.PlayNormalballAudio = e.PlayNormalballAudio),
			(f.PlayFireballAudio = e.PlayFireballAudio),
			(f.PlaySlowballAudio = e.PlaySlowballAudio),
			(f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = e.getHit));
		f.SetAlpha(f, f.EleBody, 50, 0.5);
		oSym.addTask(
			10,
			(h, g) => {
				(g = $Z[h]) && g.SetAlpha(g, g.EleBody, 100, 1);
			},
			[f.id]
		);
	};
	return InheritO(OrnNoneZombies, {
		Ornaments: 1,
		OrnLostNormalGif: 9,
		OrnLostAttackGif: 10,
		getHit: a,
		getHit0: a,
		getHit1: a,
		getHit2: a,
		getHit3: a,
	});
})();
var oConeheadZombie = InheritO(OrnIZombies, {
	EName: "oConeheadZombie",
	CName: "Conehead Zombie",
	OrnHP: 370,
	Lvl: 2,
	SunNum: 75,
	StandGif: 11,
	AlmanacGif: 11,
	BookHandPosition: "35% 70%",
	PicArr: (function () {
		var b = "images/Zombies/ConeheadZombie/";
		var a = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/ConeheadZombie.png",
			b + "0.gif",
			b + "ConeheadZombie.gif",
			b + "ConeheadZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			b + "1.gif",
		];
	})(),
	AudioArr: ["plastichit"],
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	Produce:
		'<font color="#28325A">His traffic cone headpiece makes him<br>twice as tough as normal zombies.</font><p>Toughness: <font color="#CC241D">medium</font></p>Conehead Zombie shuffled mindlessly<br>forward like every other zombie. But<br>something made him stop, made him pick up<br>a traffic cone and stick it on his head.<br>Oh yeah. He likes to party.',
});
var oIConeheadZombie = InheritO(OrnIZombies, {
	EName: "oIConeheadZombie",
	CName: "Conehead Zombie",
	OrnHP: 370,
	Lvl: 2,
	SunNum: 75,
	StandGif: 11,
	HeadPosition: [
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
	],
	PicArr: (function () {
		var b = "images/Zombies/ConeheadZombie/";
		var a = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/IConeheadZombie.png",
			b + "0.gif",
			b + "ConeheadZombie.gif",
			b + "ConeheadZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			b + "1.gif",
		];
	})(),
	AudioArr: ["plastichit"],
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	Produce:
		'他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#CC241D">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。',
});
var oLionDanceZombie = InheritO(oConeheadZombie, {
	EName: "oLionDanceZombie",
	CName: "Lion Dancer Zombie",
	HP: 370,
	OrnHP: 1100,
	Speed: 4.8,
	Attack: 550,
	width: 216,
	height: 164,
	beAttackedPointL: 60,
	beAttackedPointR: 130,
	HeadPosition: [
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
	],
	BookHandPosition: "100% 70%",
	PicArr: (function () {
		var b = "images/Zombies/LionDanceZombie/";
		var a = "images/Zombies/LionDanceZombie/";
		return [
			"images/Card/Zombies/LionDanceZombie.png",
			b + "0.gif",
			b + "ConeheadZombie.gif",
			b + "ConeheadZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			b + "1.gif",
		];
	})(),
	Produce: '<font color="#28325A">(not documented yet)</font>',
});
var oBucketheadZombie = InheritO(
	oConeheadZombie,
	{
		EName: "oBucketheadZombie",
		CName: "Buckethead Zombie",
		OrnHP: 1100,
		Lvl: 3,
		SunNum: 125,
		HeadPosition: [
			{
				x: 82,
				y: 30,
				width: 40,
				height: 40,
			},
			{
				x: 82,
				y: 30,
				width: 40,
				height: 40,
			},
		],
		PlayNormalballAudio() {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		},
		Produce:
			'<font color="#28325A">His bucket hat makes him extremely<br>resistant to damage.</font><p>Toughness: <font color="#CC241D">high</font><br>Weakness: <font color="#CC241D">magnet-shroom</font></p>Buckethead Zombie always wore a bucket.<br>Part of it was to assert his uniqueness<br>in an uncaring world. Mostly he just<br>forgot it was there in the first place.',
	},
	{
		PicArr: {
			0: "images/Card/Zombies/BucketheadZombie.png",
			1: "images/Zombies/BucketheadZombie/0.gif",
			2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
			3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
			9: "images/Zombies/Zombie/Zombie.gif",
			11: "images/Zombies/BucketheadZombie/1.gif",
		},
	}
);
var oIBucketheadZombie = InheritO(
	oConeheadZombie,
	{
		EName: "oIBucketheadZombie",
		CName: "Buckethead Zombie",
		OrnHP: 1100,
		Lvl: 3,
		SunNum: 125,
		PlayNormalballAudio() {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		},
		Produce:
			'他的铁桶头盔，能极大程度的承受伤害。<p>韧性：<font color="#CC241D">高</font><br>弱点：<font color="#CC241D">土豆雷</font></p>铁桶头僵尸经常戴着水桶，在冷漠的世界里显得独一无二。但事实上，他只是忘记了，那铁桶还在他头上而已。',
	},
	{
		PicArr: {
			0: "images/Card/Zombies/IBucketheadZombie.png",
			1: "images/Zombies/BucketheadZombie/0.gif",
			2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
			3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
			9: "images/Zombies/Zombie/Zombie.gif",
			11: "images/Zombies/BucketheadZombie/1.gif",
		},
	}
);
var oFootballZombie = InheritO(oConeheadZombie, {
	EName: "oFootballZombie",
	CName: "Football Zombie",
	OrnHP: 1400,
	Lvl: 3,
	SunNum: 175,
	StandGif: 11,
	width: 154,
	height: 160,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 40,
	beAttackedPointR: 134,
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	BookHandPosition: "71% 70%",
	PicArr: (function () {
		var a = "images/Zombies/FootballZombie/";
		return [
			"images/Card/Zombies/FootballZombie.png",
			a + "0.gif",
			a + "FootballZombie.gif",
			a + "Attack.gif",
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "OrnLost.gif",
			a + "OrnLostAttack.gif",
			a + "1.gif",
		];
	})(),
	getShadow(a) {
		return "left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px";
	},
	Produce:
		'<font color="#28325A">Football Zombie makes the big plays.</font><p>Toughness: <font color="#CC241D">very high</font><br>Speed: <font color="#CC241D">fast</font><br>Weakness: <font color="#CC241D">magnet-shroom</font></p>Football Zombie gives 110 percent whenever<br>he\'s on the field. He\'s a team player who <br>delivers both offensively and defensively.<br>He has no idea what a football is.',
});
var oIFootballZombie = InheritO(oConeheadZombie, {
	EName: "oIFootballZombie",
	CName: "Football Zombie",
	OrnHP: 1400,
	Lvl: 3,
	SunNum: 175,
	StandGif: 11,
	width: 154,
	height: 160,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 40,
	beAttackedPointR: 134,
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	PicArr: (function () {
		var a = "images/Zombies/FootballZombie/";
		return [
			"images/Card/Zombies/IFootballZombie.png",
			a + "0.gif",
			a + "FootballZombie.gif",
			a + "Attack.gif",
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "OrnLost.gif",
			a + "OrnLostAttack.gif",
			a + "1.gif",
		];
	})(),
	getShadow(a) {
		return "left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px";
	},
	Produce:
		'橄榄球僵尸的表演秀。<p>韧性：<font color="#CC241D">极高</font><br>速度：<font color="#CC241D">快</font></p>在球场上，橄榄球僵尸表现出110%的激情，他进攻防守样样在行。虽然他完全不知道橄榄球是什么。',
});
var oHeiFootballZombie = InheritO(oFootballZombie, {
	EName: "oHeiFootballZombie",
	CName: "Giga-Football Zombie",
	OrnHP: 2800,
	Lvl: 3,
	StandGif: 11,
	width: 154,
	height: 160,
	OSpeed: 3.3,
	Speed: 3.3,
	beAttackedPointL: 40,
	beAttackedPointR: 134,
	BookHandPosition: "68% 69%",
	PicArr: (function () {
		var a = "images/Zombies/HeiFootballZombie/";
		return [
			"images/Card/Zombies/HeiFootballZombie.png",
			a + "0.gif",
			a + "FootballZombie.gif",
			a + "Attack.gif",
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "OrnLost.gif",
			a + "OrnLostAttack.gif",
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Giga-Football Zombie makes the big plays.</font><p>Toughness: <font color="#CC241D">extremely high</font><br>Speed: <font color="#CC241D">fast</font><br>Weakness: <font color="#CC241D">chomper and magnet-shroom</font></p>He dresses in a low-key and dim fashion; He is the leading person of the field of zombie football, delivering both offensively and defensively even better. Yet he also has no idea what a football is.',
});
var oCFootballZombie = InheritO(oFootballZombie, {
	EName: "oCFootballZombie",
	CName: "元帅僵尸",
	PicArr: (function () {
		var a = "images/Zombies/wall/FootballZombie/";
		return [
			"images/Card/Zombies/FootballZombie.png",
			a + "0.gif",
			a + "FootballZombie.gif",
			a + "Attack.gif",
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "OrnLost.gif",
			a + "OrnLostAttack.gif",
			a + "1.gif",
		];
	})(),
	Produce: "",
});
var oPoleVaultingZombie = InheritO(OrnNoneZombies, {
	EName: "oPoleVaultingZombie",
	CName: "Pole Vaulting Zombie",
	HP: 270,
	width: 348,
	height: 218,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 215,
	beAttackedPointR: 260,
	StandGif: 13,
	AlmanacGif: 13,
	GetDX() {
		return -238;
	},
	GetDY() {
		return 2;
	},
	Lvl: 2,
	SunNum: 75,
	BookHandPosition: "120% 135%",
	PicArr: (function () {
		var a = "images/Zombies/PoleVaultingZombie/";
		return [
			"images/Card/Zombies/PoleVaultingZombie.png",
			a + "0.gif",
			a + "PoleVaultingZombie.gif",
			a + "PoleVaultingZombieAttack.gif",
			a + "PoleVaultingZombieLostHead.gif",
			a + "PoleVaultingZombieLostHeadAttack.gif",
			a + "PoleVaultingZombieHead.gif" + $Random,
			a + "PoleVaultingZombieDie.gif" + $Random,
			a + "BoomDie.gif" + $Random,
			a + "PoleVaultingZombieWalk.gif",
			a + "PoleVaultingZombieLostHeadWalk.gif",
			a + "PoleVaultingZombieJump.gif",
			a + "PoleVaultingZombieJump2.gif",
			a + "1.gif",
		];
	})(),
	AudioArr: ["polevault", "grassstep"],
	Produce:
		'<font color="#28325A">Pole Vaulting Zombie vaults with a pole.</font><p>Toughness: <font color="#CC241D">medium</font><br>Speed: <font color="#CC241D">fast, then normal (after jump)</font><br>Special: <font color="#CC241D">jumps the first plant he runs into</font></p>Some zombies take it further, aspire<br>more, push themselves beyond the normal<br>into greatness. That\'s Pole Vaulting<br>Zombie right there. That is so him.',
	getShadow(a) {
		return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
	},
	JudgeAttack() {
		var g = this;
		var b = g.ZX;
		var d = g.R + "_";
		var c = GetC(b);
		var h = oGd.$;
		var f;
		var a;
		var e = b - 74;
		for (f = c - 2; f <= c; f++) {
			if (f > 9) {
				continue;
			}
			for (
				a = 2;
				a > -1;
				(p = h[d + f + "_" + a--]) &&
				(p.EName !== "oBrains"
					? p.AttackedRX >= e &&
						p.AttackedLX < b &&
						p.canEat &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), g.NormalAttack(g.id, p.id, p.AttackedLX))
					: p.AttackedRX >= b &&
						p.AttackedLX < b &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))
			) {}
		}
	},
	getCrushed(a) {
		this.NormalAttack(this.id, a.id, a.AttackedLX);
		this.getCrushed = function () {
			return false;
		};
		a.Stature > 0 &&
			oSym.addTask(
				50,
				(c) => {
					var b = $Z[c];
					b && b.CrushDie();
				},
				[this.id]
			);
		return false;
	},
	getRaven(a) {
		return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
	},
	NormalAttack(d, b, g) {
		var f = $Z[d];
		var a = f.Ele;
		var c = f.EleShadow;
		var e = f.EleBody;
		e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
		PlaySound2("grassstep");
		SetHidden(c);
		f.isAttacking = 1;
		f.Altitude = 2;
		f.getFreeze = function () {
			f.getSnowPea(f, 20);
		};
		oSym.addTask(
			50,
			(h) => {
				$Z[h] && PlaySound2("polevault");
			},
			[d]
		);
		oSym.addTask(
			100,
			(m, j, i, l, n) => {
				var h = $Z[m];
				var k;
				var q;
				var r;
				h &&
					((k = $P[j]) && k.Stature > 0
						? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
							SetVisible(l),
							(h.isAttacking = 0),
							(h.Altitude = 1),
							(h.OSpeed = h.Speed = 1.6),
							(h.NormalGif = 9),
							(h.LostHeadGif = 10),
							(h.NormalAttack = (r = CZombies.prototype).NormalAttack),
							(h.getCrushed = r.getCrushed),
							(h.getFreeze = r.getFreeze),
							(h.getRaven = r.getRaven))
						: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random()),
							SetVisible(l),
							oSym.addTask(
								80,
								(s, v) => {
									var u = $Z[s];
									var t;
									u &&
										((v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
										(u.isAttacking = 0),
										(u.Altitude = 1),
										(u.OSpeed = u.Speed = 1.6),
										(u.NormalGif = 9),
										(u.LostHeadGif = 10),
										(u.NormalAttack = (t = CZombies.prototype).NormalAttack),
										(u.getCrushed = t.getCrushed),
										(u.getFreeze = t.getFreeze),
										(u.getRaven = t.getRaven));
								},
								[m, n]
							)));
			},
			[d, b, a, c, e]
		);
	},
});
var oIPoleVaultingZombie = InheritO(OrnNoneZombies, {
	EName: "oIPoleVaultingZombie",
	CName: "Pole Vaulting Zombie",
	HP: 270,
	width: 348,
	height: 218,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 215,
	beAttackedPointR: 260,
	StandGif: 13,
	GetDX() {
		return -238;
	},
	GetDY() {
		return 2;
	},
	Lvl: 2,
	SunNum: 75,
	PicArr: (function () {
		var a = "images/Zombies/PoleVaultingZombie/";
		return [
			"images/Card/Zombies/IPoleVaultingZombie.png",
			a + "0.gif",
			a + "PoleVaultingZombie.gif",
			a + "PoleVaultingZombieAttack.gif",
			a + "PoleVaultingZombieLostHead.gif",
			a + "PoleVaultingZombieLostHeadAttack.gif",
			a + "PoleVaultingZombieHead.gif" + $Random,
			a + "PoleVaultingZombieDie.gif" + $Random,
			a + "BoomDie.gif" + $Random,
			a + "PoleVaultingZombieWalk.gif",
			a + "PoleVaultingZombieLostHeadWalk.gif",
			a + "PoleVaultingZombieJump.gif",
			a + "PoleVaultingZombieJump2.gif",
			a + "1.gif",
		];
	})(),
	AudioArr: ["polevault", "grassstep"],
	Produce:
		'撑杆僵尸运用标杆高高地跃过障碍物。<p>韧性：<font color="#CC241D">中</font><Br>速度：<font color="#CC241D">快,而后慢(跳跃后)</font><BR>特点：<font color="#CC241D">跃过他所碰到的第一筑植物</font></p>一些僵尸渴望走得更远、得到更多，这也促使他们由普通成为非凡。那就是撑杆僵尸。',
	getShadow(a) {
		return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
	},
	JudgeAttack() {
		var g = this;
		var b = g.ZX;
		var d = g.R + "_";
		var c = GetC(b);
		var h = oGd.$;
		var f;
		var a;
		var e = b - 74;
		for (f = c - 2; f <= c; f++) {
			if (f > 9) {
				continue;
			}
			for (
				a = 2;
				a > -1;
				(p = h[d + f + "_" + a--]) &&
				(p.EName !== "oBrains"
					? p.AttackedRX >= e &&
						p.AttackedLX < b &&
						p.canEat &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), g.NormalAttack(g.id, p.id, p.AttackedLX))
					: p.AttackedRX >= b &&
						p.AttackedLX < b &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))
			) {}
		}
	},
	getCrushed(a) {
		this.NormalAttack(this.id, a.id, a.AttackedLX);
		this.getCrushed = function () {
			return false;
		};
		a.Stature > 0 &&
			oSym.addTask(
				50,
				(c) => {
					var b = $Z[c];
					b && b.CrushDie();
				},
				[this.id]
			);
		return false;
	},
	getRaven(a) {
		return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
	},
	NormalAttack(d, b, g) {
		var f = $Z[d];
		var a = f.Ele;
		var c = f.EleShadow;
		var e = f.EleBody;
		e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
		PlaySound2("grassstep");
		SetHidden(c);
		f.isAttacking = 1;
		f.Altitude = 2;
		f.getFreeze = function () {
			f.getSnowPea(f, 20);
		};
		oSym.addTask(
			50,
			(h) => {
				$Z[h] && PlaySound2("polevault");
			},
			[d]
		);
		oSym.addTask(
			100,
			(m, j, i, l, n) => {
				var h = $Z[m];
				var k;
				var q;
				var r;
				h &&
					((k = $P[j]) && k.Stature > 0
						? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
							SetVisible(l),
							(h.isAttacking = 0),
							(h.Altitude = 1),
							(h.OSpeed = h.Speed = 1.6),
							(h.NormalGif = 9),
							(h.LostHeadGif = 10),
							(h.NormalAttack = (r = CZombies.prototype).NormalAttack),
							(h.getCrushed = r.getCrushed),
							(h.getFreeze = r.getFreeze),
							(h.getRaven = r.getRaven))
						: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random()),
							SetVisible(l),
							oSym.addTask(
								80,
								(s, v) => {
									var u = $Z[s];
									var t;
									u &&
										((v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
										(u.isAttacking = 0),
										(u.Altitude = 1),
										(u.OSpeed = u.Speed = 1.6),
										(u.NormalGif = 9),
										(u.LostHeadGif = 10),
										(u.NormalAttack = (t = CZombies.prototype).NormalAttack),
										(u.getCrushed = t.getCrushed),
										(u.getFreeze = t.getFreeze),
										(u.getRaven = t.getRaven));
								},
								[m, n]
							)));
			},
			[d, b, a, c, e]
		);
	},
});
var oCPoleVaultingZombie = InheritO(oPoleVaultingZombie, {
	EName: "oCPoleVaultingZombie",
	CName: "棒子僵尸",
	PicArr: (function () {
		var b = "images/Zombies/PoleVaultingZombie/";
		var a = "images/Zombies/wall/PoleVaultingZombie/";
		return [
			"images/Card/Zombies/PoleVaultingZombie.png",
			a + "0.gif",
			a + "PoleVaultingZombie.gif",
			a + "PoleVaultingZombieAttack.gif",
			a + "PoleVaultingZombieLostHead.gif",
			a + "PoleVaultingZombieLostHeadAttack.gif",
			a + "PoleVaultingZombieHead.gif" + $Random,
			a + "PoleVaultingZombieDie.gif" + $Random,
			b + "BoomDie.gif" + $Random,
			a + "PoleVaultingZombieWalk.gif",
			a + "PoleVaultingZombieLostHeadWalk.gif",
			a + "PoleVaultingZombieJump.gif",
			a + "PoleVaultingZombieJump2.gif",
			a + "1.gif",
		];
	})(),
	NormalAttack(d, b, g) {
		var f = $Z[d];
		var a = f.Ele;
		var c = f.EleShadow;
		var e = f.EleBody;
		e.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
		PlaySound2("grassstep");
		SetHidden(c);
		f.isAttacking = 1;
		f.Altitude = 2;
		f.getFreeze = function () {
			f.getSnowPea(f, 20);
		};
		oSym.addTask(
			50,
			(h) => {
				$Z[h] && PlaySound2("polevault");
			},
			[d]
		);
		oSym.addTask(
			100,
			(m, j, i, l, n) => {
				var h = $Z[m];
				var k;
				var q;
				var r;
				h &&
					((k = $P[j]) && k.Stature > 0
						? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
							SetVisible(l),
							(h.isAttacking = 0),
							(h.Altitude = 1),
							(h.OSpeed = h.Speed = 1.6),
							(h.NormalGif = 9),
							(h.LostHeadGif = 10),
							(h.NormalAttack = (r = CZombies.prototype).NormalAttack),
							(h.getCrushed = r.getCrushed),
							(h.getFreeze = r.getFreeze),
							(h.getRaven = r.getRaven))
						: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random()),
							SetVisible(l),
							oSym.addTask(
								80,
								(s, v) => {
									var u = $Z[s];
									var t;
									u &&
										((v.src = "images/Zombies/wall/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
										(u.isAttacking = 0),
										(u.Altitude = 1),
										(u.OSpeed = u.Speed = 1.6),
										(u.NormalGif = 9),
										(u.LostHeadGif = 10),
										(u.NormalAttack = (t = CZombies.prototype).NormalAttack),
										(u.getCrushed = t.getCrushed),
										(u.getFreeze = t.getFreeze),
										(u.getRaven = t.getRaven));
								},
								[m, n]
							)));
			},
			[d, b, a, c, e]
		);
	},
});
var OrnIIZombies = InheritO(OrnNoneZombies, {
	Ornaments: 2,
	BreakPoint: 91,
	NormalGif: 2,
	AttackGif: 3,
	LostHeadGif: 4,
	LostHeadAttackGif: 5,
	OrnLostNormalGif: 6,
	OrnLostAttackGif: 7,
	OrnLostHeadNormalGif: 8,
	OrnLostHeadAttackGif: 9,
	HeadGif: 10,
	DieGif: 11,
	BoomDieGif: 12,
});
var oNewspaperZombie = InheritO(OrnIIZombies, {
	EName: "oNewspaperZombie",
	CName: "Newspaper Zombie",
	OrnHP: 150,
	Lvl: 2,
	LostPaperGif: 13,
	StandGif: 14,
	AlmanacGif: 14,
	width: 216,
	height: 164,
	beAttackedPointL: 60,
	beAttackedPointR: 130,
	LostPaperSpeed: 4.8,
	BookHandPosition: "73% 78%",
	PicArr: (function () {
		var a = "images/Zombies/NewspaperZombie/";
		return [
			"images/Card/Zombies/NewspaperZombie.png",
			a + "0.gif",
			a + "HeadWalk1.gif",
			a + "HeadAttack1.gif",
			a + "LostHeadWalk1.gif",
			a + "LostHeadAttack1.gif",
			a + "HeadWalk0.gif",
			a + "HeadAttack0.gif",
			a + "LostHeadWalk0.gif",
			a + "LostHeadAttack0.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "LostNewspaper.gif",
			a + "1.gif",
		];
	})(),
	AudioArr: ["newspaper_rarrgh2"],
	Produce:
		'<font color="#28325A">His newspaper provides limited defense.</font><p>Toughness: <font color="#CC241D">low</font><br>Newspaper Toughness: <font color="#CC241D">low</font><br>Speed: <font color="#CC241D">normal, then fast (after losing<br>newspaper)</font></p>Newspaper Zombie was *this* close to<br>finishing his sudoku puzzle. No wonder<br>he\'s freaking out.',
	getShadow(a) {
		return "left:75px;top:" + (a.height - 25) + "px";
	},
	GoingDie(b) {
		var a = this;
		var c = a.id;
		a.EleBody.src = b;
		oSym.addTask(200, ClearChild, [
			NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ),
		]);
		a.beAttacked = 0;
		a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
		a.AutoReduceHP(c);
	},
	getHurtOrnLost(j, a, g, m, c, l, k, i) {
		var e = this;
		if (!e.beAttacked) {
			k && e.DisappearDie();
			return;
		}
		var b = e.id;
		var h = e.HP;
		var d = e.PicArr;
		var f = e.isAttacking;
		switch (true) {
			case (h -= g) < 1:
				e.HP = 0;
				e.NormalDie();
				return;
			case h < 91:
				e.HP = h;
				e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
				return;
		}
		e.HP = h;
		switch (m) {
			case -1:
				e.getSlow(e, b, 1e3);
				break;
			case 1:
				e.getFireball(e, b, a);
				break;
			default:
				!i && j === -1 && e.PlayNormalballAudio();
		}
		SetAlpha(e.EleBody, 50, 0.5);
		oSym.addTask(
			10,
			(q) => {
				var n = $Z[q];
				n && SetAlpha(n.EleBody, 100, 1);
			},
			[b]
		);
	},
	getSnowPea(c, a, b) {
		PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
		c.getHit0(c, a, b);
	},
	getFirePea(f, b, e) {
		f.PlayFireballAudio();
		(f.FreeSlowTime || f.FreeFreezeTime) && ((f.Speed = f.OSpeed), (f.FreeSlowTime = 0), (f.FreeFreezeTime = 0));
		f.Attack = 100;
		var d = f.AttackedLX;
		var g = f.AttackedRX;
		var a = oZ.getArZ(d, d + 40, f.R);
		var c = a.length;
		var h;
		while (c--) {
			(h = a[c]) !== this && h.getFirePeaSputtering();
		}
		(f.HP -= b) < f.BreakPoint
			? ((f.getFirePea = OrnNoneZombies.prototype.getFirePea),
				f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]),
				(f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}))
			: (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0),
				f.SetAlpha(f, f.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(j, i) => {
						(i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
					},
					[f.id]
				));
	},
	getHit0(c, a, b) {
		b === c.WalkDirection
			? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
				c.SetAlpha(c, c.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(e, d) => {
						(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
					},
					[c.id]
				))
			: (c.HP -= a) < c.BreakPoint &&
				(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
				(c.getFirePea = OrnNoneZombies.prototype.getFirePea),
				(c.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
				(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
	},
	getHit1(b, a) {
		(b.HP -= a) < b.BreakPoint
			? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
				(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
				(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
				(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
			: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
				b.SetAlpha(b, b.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(d, c) => {
						(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
					},
					[b.id]
				));
	},
	getHit2(b, a) {
		(b.HP -= a) < b.BreakPoint
			? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
				(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
				(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
				(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
			: (b.SetAlpha(b, b.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(d, c) => {
						(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
					},
					[b.id]
				));
	},
	getHit3(b, a) {
		(b.HP -= a) < b.BreakPoint
			? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
				(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
				(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
				(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
			: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
				b.SetAlpha(b, b.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(d, c) => {
						(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
					},
					[b.id]
				));
	},
	CheckOrnHP(g, h, d, c, f, b, a) {
		var e = OrnNoneZombies.prototype;
		(g.OrnHP = d -= c) < 1 &&
			(a && (g.HP += d),
			(g.ChkActs = function () {
				return 1;
			}),
			(g.ChkActs1 = function () {
				return 1;
			}),
			(g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random()),
			(g.Ornaments = 0),
			(g.LostHeadGif = 8),
			(g.LostHeadAttackGif = 9),
			(g.getFirePea = e.getFirePea),
			(g.getSnowPea = e.getSnowPea),
			(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit),
			oSym.addTask(
				150,
				(m, l) => {
					var k = $Z[m];
					if (!k) {
						return;
					}
					var j = CZombies.prototype;
					var i = (k.OSpeed = k.LostPaperSpeed);
					k.ChkActs = j.ChkActs;
					k.ChkActs1 = j.ChkActs1;
					k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);
					if (!k.beAttacked) {
						return;
					}
					PlaySound2("newspaper_rarrgh2");
					k.EleBody.src = l;
					k.JudgeAttack();
				},
				[h, f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]]
			));
	},
});
var oCNewspaperZombie = InheritO(oNewspaperZombie, {
	EName: "oCNewspaperZombie",
});
var oScreenDoorZombie = InheritO(oNewspaperZombie, {
	EName: "oScreenDoorZombie",
	CName: "Screen Door Zombie",
	OrnHP: 1100,
	Lvl: 3,
	SunNum: 100,
	StandGif: 13,
	AlmanacGif: 13,
	width: 166,
	height: 144,
	beAttackedPointL: 60,
	beAttackedPointR: 116,
	BookHandPosition: "43.5% 90%",
	PicArr: (function () {
		var a = "images/Zombies/ScreenDoorZombie/";
		var b = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/ScreenDoorZombie.png",
			a + "0.gif",
			a + "HeadWalk1.gif",
			a + "HeadAttack1.gif",
			a + "LostHeadWalk1.gif",
			a + "LostHeadAttack1.gif",
			b + "Zombie.gif",
			b + "ZombieAttack.gif",
			b + "ZombieLostHead.gif",
			b + "ZombieLostHeadAttack.gif",
			b + "ZombieHead.gif" + $Random,
			b + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	PlayNormalballAudio() {
		PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
	},
	Produce:
		'<font color="#28325A">His screen door is an effective shield.</font><p>Toughness: <font color="#CC241D">medium</font><br>Screen Door Toughness: <font color="#CC241D">high</font><br>Weakness: <font color="#CC241D">fume-shroom and<br>magnet-shroom</font></p>He got his screen door from the last<br>inexpertly defended home he visited, after<br>he ATE THE HOMEOWNER\'S BRAINS.',
	GoingDie: CZombies.prototype.GoingDie,
	getFirePea(c, a, b) {
		PlaySound2(b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
		c.getHit0(c, a, b);
	},
	getFirePeaSputtering() {},
	getSnowPea(c, a, b) {
		PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		c.getHit0(c, a, b);
	},
	getPea(c, a, b) {
		PlaySound2(b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
		c.getHit0(c, a, b);
	},
	getHit0(c, a, b) {
		b === c.WalkDirection
			? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
				c.SetAlpha(c, c.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(e, d) => {
						(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
					},
					[c.id]
				))
			: (c.HP -= a) < c.BreakPoint &&
				(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
				(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
	},
	CheckOrnHP(g, h, d, c, f, b, a) {
		var e = OrnNoneZombies.prototype;
		(g.OrnHP = d -= c) < 1 &&
			(a && (g.HP += d),
			(g.Ornaments = 0),
			(g.EleBody.src = f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]),
			(g.LostHeadGif = 8),
			(g.LostHeadAttackGif = 9),
			(g.getPea = e.getPea),
			(g.getFirePea = e.getFirePea),
			(g.getFirePeaSputtering = e.getFirePeaSputtering),
			(g.getSnowPea = g.getSnowPea),
			(g.PlayNormalballAudio = e.PlayNormalballAudio),
			(g.PlayFireballAudio = e.PlayFireballAudio),
			(g.PlaySlowballAudio = e.PlaySlowballAudio),
			(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit));
	},
	getFireball(c, a, b) {
		b !== c.WalkDirection
			? ((c.FreeSlowTime = 0), (c.Attack = 100), c.Speed !== c.OSpeed ? (c.PlayNormalballAudio(), (c.Speed = c.OSpeed)) : c.PlayFireballAudio())
			: c.PlayNormalballAudio();
	},
	getSputtering() {},
	getSlow(d, a, c, b, e) {
		b !== d.WalkDirection || e !== -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
	},
});
var oIScreenDoorZombie = InheritO(oNewspaperZombie, {
	EName: "oIScreenDoorZombie",
	CName: "Screen Door Zombie",
	OrnHP: 1100,
	Lvl: 3,
	SunNum: 100,
	StandGif: 13,
	width: 166,
	height: 144,
	beAttackedPointL: 60,
	beAttackedPointR: 116,
	PicArr: (function () {
		var a = "images/Zombies/ScreenDoorZombie/";
		var b = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/IScreenDoorZombie.png",
			a + "0.gif",
			a + "HeadWalk1.gif",
			a + "HeadAttack1.gif",
			a + "LostHeadWalk1.gif",
			a + "LostHeadAttack1.gif",
			b + "Zombie.gif",
			b + "ZombieAttack.gif",
			b + "ZombieLostHead.gif",
			b + "ZombieLostHeadAttack.gif",
			b + "ZombieHead.gif" + $Random,
			b + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	PlayNormalballAudio() {
		PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
	},
	Produce:
		'他的铁栅门是有效的盾牌。<p>韧性：<font color="#CC241D">低</font><br>铁栅门韧性：<font color="#CC241D">高</font><br>弱点：大喷菇和磁力菇</p>门板僵尸上次拜访过的房主防守并不专业，在吃掉房主的脑子后拿走了他家的铁栅门。',
	GoingDie: CZombies.prototype.GoingDie,
	getFirePea(c, a, b) {
		PlaySound2(b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
		c.getHit0(c, a, b);
	},
	getFirePeaSputtering() {},
	getSnowPea(c, a, b) {
		PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		c.getHit0(c, a, b);
	},
	getPea(c, a, b) {
		PlaySound2(b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3));
		c.getHit0(c, a, b);
	},
	getHit0(c, a, b) {
		b === c.WalkDirection
			? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
				c.SetAlpha(c, c.EleBody, 50, 0.5),
				oSym.addTask(
					10,
					(e, d) => {
						(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
					},
					[c.id]
				))
			: (c.HP -= a) < c.BreakPoint &&
				(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
				(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
	},
	CheckOrnHP(g, h, d, c, f, b, a) {
		var e = OrnNoneZombies.prototype;
		(g.OrnHP = d -= c) < 1 &&
			(a && (g.HP += d),
			(g.Ornaments = 0),
			(g.EleBody.src = f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]),
			(g.LostHeadGif = 8),
			(g.LostHeadAttackGif = 9),
			(g.getPea = e.getPea),
			(g.getFirePea = e.getFirePea),
			(g.getFirePeaSputtering = e.getFirePeaSputtering),
			(g.getSnowPea = g.getSnowPea),
			(g.PlayNormalballAudio = e.PlayNormalballAudio),
			(g.PlayFireballAudio = e.PlayFireballAudio),
			(g.PlaySlowballAudio = e.PlaySlowballAudio),
			(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit));
	},
	getFireball(c, a, b) {
		b !== c.WalkDirection
			? ((c.FreeSlowTime = 0), (c.Attack = 100), c.Speed !== c.OSpeed ? (c.PlayNormalballAudio(), (c.Speed = c.OSpeed)) : c.PlayFireballAudio())
			: c.PlayNormalballAudio();
	},
	getSputtering() {},
	getSlow(d, a, c, b, e) {
		b !== d.WalkDirection || e !== -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
	},
});
var oTrashZombie = InheritO(oScreenDoorZombie, {
	EName: "oTrashZombie",
	CName: "Trash Can Zombie",
	PicArr: (function () {
		var a = "images/Zombies/TrashZombie/";
		var b = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/TrashZombie.png",
			a + "0.gif",
			a + "HeadWalk1.gif",
			a + "HeadAttack1.gif",
			a + "LostHeadWalk1.gif",
			a + "LostHeadAttack1.gif",
			b + "Zombie.gif",
			b + "ZombieAttack.gif",
			b + "ZombieLostHead.gif",
			b + "ZombieLostHeadAttack.gif",
			b + "ZombieHead.gif" + $Random,
			b + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">A zombie holding a trash can.</font><p>Toughness: <font color="#CC241D">high</font></p>Sadly the Trash Can Zombie isn\'t here to pick up litter, or offer helpful tips on how to recycle your vegetable peelings or glass. If you\'ve been closely studying this book, you will have realized by now that this zombie wants to eat your brains. He just uses the trash can to protect himself, not tidy up. What a shame.That said Trash Can Zombie is all about recycling waste. In this case he\'s eager for you to recycle the "waste" brains sloshing about in your skull into something better-- his dinner.',
});
var oAquaticZombie = InheritO(OrnNoneZombies, {
	StandGif: 4,
	AttackGif: 5,
	HeadGif: 6,
	DieGif: 7,
	WalkGif0: 2,
	WalkGif1: 3,
	CanPass(b, a) {
		return a === 2;
	},
	BirthCallBack(g) {
		var e = g.delayT;
		var c = g.id;
		var b = (g.Ele = $(c));
		var d = g.AttackedLX;
		var f;
		var a;
		var h;
		f = g.EleShadow = b.firstChild;
		g.EleBody = b.childNodes[1];
		switch (true) {
			case d > GetX(9):
				g.ChkActs = g.ChkActsL1;
				g.WalkStatus = 0;
				break;
			case d < GetX(0):
				g.ChkActs = g.ChkActsL3;
				g.WalkStatus = 0;
				break;
			default:
				g.ChkActs = g.ChkActsL2;
				g.WalkStatus = 1;
				g.EleBody.src = g.PicArr[(g.NormalGif = g.WalkGif1)];
				SetHidden(f);
				NewEle(
					(a = c + "_splash"),
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:61px;top:" +
						(g.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					b
				);
				ImgSpriter(
					a,
					c,
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
		}
		e
			? oSym.addTask(
					e,
					(j, i) => {
						var k = $Z[j];
						k && ((k.FreeSetbodyTime = 0), SetBlock(i));
					},
					[c, b]
				)
			: SetBlock(b);
	},
	ChkActsL1(f, e, g, d) {
		var c;
		var a;
		var b = f.id;
		!(f.FreeFreezeTime || f.FreeSetbodyTime) &&
			((f.AttackedRX -= c = f.Speed), (LX = f.ZX = f.AttackedLX -= c), (f.Ele.style.left = Math.floor((f.X -= c)) + "px"));
		f.AttackedLX < GetX(9) &&
			(PlaySound2("zombie_entering_water"),
			(f.WalkStatus = 1),
			(f.EleBody.src = f.PicArr[(f.NormalGif = f.WalkGif1)]),
			SetHidden(f.EleShadow),
			NewEle(
				(a = b + "_splash"),
				"div",
				"position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden",
				0,
				f.Ele
			),
			(f.ChkActs = f.ChkActsL2),
			ImgSpriter(
				a,
				b,
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
				(h, i) => {
					ClearChild($(h));
				}
			));
		return 1;
	},
	ChkActsL2(d, c, e, b) {
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
			!d.isAttacking && ((d.AttackedRX -= a = d.Speed), (d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px")));
		d.AttackedLX < GetX(0) &&
			((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActsL3));
		return 1;
	},
	ChkActsL3: CZombies.prototype.ChkActs,
	ChkActs1(d, c, e, b) {
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
			!d.isAttacking && ((d.AttackedLX += a = d.Speed), (d.ZX = d.AttackedRX += a), (d.Ele.style.left = Math.ceil((d.X += a)) + "px")));
		d.AttackedLX > GetX(9) &&
			((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActs2));
		return 1;
	},
	ChkActs2(e, c, f, b) {
		var a;
		var d;
		!(e.FreeFreezeTime || e.FreeSetbodyTime)
			? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
				!e.isAttacking
					? (e.AttackedLX += a = e.Speed) > oS.W
						? (f.splice(b, 1), e.DisappearDie(), (d = 0))
						: ((e.ZX = e.AttackedRX += a), (e.Ele.style.left = Math.ceil((e.X += a)) + "px"), (d = 1))
					: (d = 1))
			: (d = 1);
		return d;
	},
	ExchangeLR(d, b) {
		var c = d.width;
		var f = d.beAttackedPointL;
		var a = d.beAttackedPointR;
		var e = d.Ele;
		e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
		d.beAttackedPointR = c - f;
		d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
		d.ExchangeLR2(d, d.EleBody, b);
	},
	GoingDie() {
		var b = this;
		var c = b.id;
		var a = b.PicArr;
		b.EleBody.src = a[7];
		b.GoingDieHead(c, a, b);
		b.beAttacked = 0;
		b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
		b.AutoReduceHP(c);
	},
	AutoReduceHP(a) {
		oSym.addTask(
			100,
			function (c) {
				var b = $Z[c];
				b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
			},
			[a]
		);
	},
	ExplosionDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	NormalDie() {
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
});
var oDuckyTubeZombie1 = InheritO(oAquaticZombie, {
	EName: "oDuckyTubeZombie1",
	CName: "Ducky Tube Zombie",
	beAttackedPointR: 130,
	GetDY() {
		return 5;
	},
	Produce:
		'<font color="#28325A">The ducky tube allows this zombie to float<br>on water.</font><p>Toughness: <font color="#CC241D">low</font><br><font color="#0ca1db">Only appears in the pool</font></p>It takes a certain kind of zombie to be a<br>Ducky Tuber. Not every zombie can handle<br>it. Some crack. They can\'t take it. They<br>walk away and give up on brains forever.',
	AlmanacGif: 1,
	BookHandPosition: "34% 81%",
	PicArr: (function () {
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/DuckyTubeZombie1.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
});
var oIDuckyTubeZombie1 = InheritO(oAquaticZombie, {
	EName: "oIDuckyTubeZombie1",
	CName: "Ducky Tube Zombie",
	beAttackedPointR: 130,
	GetDY() {
		return 5;
	},
	Produce:
		'鸭子救生圈能让僵尸能浮在水面上。<p>韧性：<font color="#CC241D">低</font><br>只在水池Level出现</font></p>只有特定的僵尸才能成为救生圈僵尸。并不是每个僵尸都能胜任的。有些救生圈有点漏气，但他们没能注意到，所以他们离开并放弃了对脑子的渴求。',
	PicArr: (function () {
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/IDuckyTubeZombie1.png",
			a + "Walk2.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
});
var oWarshipsZombie = InheritO(oDuckyTubeZombie1, {
	EName: "oWarshipsZombie",
	CName: "Zombie Warship",
	HP: "5000",
	OSpeed: 0.1,
	Speed: 0.1,
	width: 464,
	height: 364,
	beAttackedPointL: 140,
	beAttackedPointR: 290,
	Attack: 550,
	BookHandBack: "Water",
	BookHandPosition: "0% 80%",
	getShadow(a) {
		return "display:none";
	},
	Produce:
		'<font color="#28325A">These zombies row their boat gently<br>down the stream.</font><p>Toughness: <font color="#CC241D">low</font><br><font color="#0ca1db">Only appears in the pool</font></p>You must be curious what it\'s like for the<br>three zombies on the warship to be hiding<br>in the water, watching their companions<br>fall into the sea, but none of that<br>matters: "Brains!".',
	PicArr: (function () {
		var a = "images/Zombies/WarshipsZombie/";
		return [
			"images/Card/Zombies/WarshipsZombie.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
		];
	})(),
});
var oDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
	EName: "oDuckyTubeZombie2",
	CName: "Ducky Tube Conehead Zombie",
	OrnHP: 370,
	Lvl: 2,
	SunNum: 75,
	CanDisplay: 0,
	OrnLostNormalGif: 9,
	OrnLostAttackGif: 10,
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	PicArr: (function () {
		var b = "images/Zombies/DuckyTubeZombie2/";
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/DuckyTubeZombie1.png",
			b + "0.gif",
			b + "Walk1.gif",
			b + "Walk2.gif",
			b + "1.gif",
			b + "Attack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
		];
	})(),
	AudioArr: ["plastichit", "zombie_entering_water"],
	getHit: OrnIZombies.prototype.getHit,
	getHit0: OrnIZombies.prototype.getHit0,
	getHit1: OrnIZombies.prototype.getHit1,
	getHit2: OrnIZombies.prototype.getHit2,
	getHit3: OrnIZombies.prototype.getHit3,
});
var oIDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
	EName: "oIDuckyTubeZombie2",
	CName: "Ducky Tube Conehead Zombie",
	OrnHP: 370,
	Lvl: 2,
	SunNum: 75,
	CanDisplay: 0,
	OrnLostNormalGif: 9,
	OrnLostAttackGif: 10,
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	PicArr: (function () {
		var b = "images/Zombies/DuckyTubeZombie2/";
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/IDuckyTubeZombie2.png",
			b + "Walk2.gif",
			b + "Walk1.gif",
			b + "Walk2.gif",
			b + "Walk2.gif",
			b + "Attack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
		];
	})(),
	AudioArr: ["plastichit", "zombie_entering_water"],
	getHit: OrnIZombies.prototype.getHit,
	getHit0: OrnIZombies.prototype.getHit0,
	getHit1: OrnIZombies.prototype.getHit1,
	getHit2: OrnIZombies.prototype.getHit2,
	getHit3: OrnIZombies.prototype.getHit3,
});
var oDuckyTubeZombie3 = InheritO(oDuckyTubeZombie2, {
	EName: "oDuckyTubeZombie3",
	CName: "Ducky Tube Buckethead Zombie",
	OrnHP: 1100,
	Lvl: 3,
	SunNum: 125,
	PlayNormalballAudio() {
		PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
	},
	AudioArr: ["shieldhit", "shieldhit2", "zombie_entering_water"],
	PicArr: (function () {
		var b = "images/Zombies/DuckyTubeZombie3/";
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/DuckyTubeZombie1.png",
			b + "0.gif",
			b + "Walk1.gif",
			b + "Walk2.gif",
			b + "1.gif",
			b + "Attack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
		];
	})(),
});
var oIDuckyTubeZombie3 = InheritO(oDuckyTubeZombie2, {
	EName: "oIDuckyTubeZombie3",
	CName: "Ducky Tube Buckethead Zombie",
	OrnHP: 1100,
	Lvl: 3,
	SunNum: 125,
	PlayNormalballAudio() {
		PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
	},
	AudioArr: ["shieldhit", "shieldhit2", "zombie_entering_water"],
	PicArr: (function () {
		var b = "images/Zombies/DuckyTubeZombie3/";
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/IDuckyTubeZombie3.png",
			b + "Walk2.gif",
			b + "Walk1.gif",
			b + "Walk2.gif",
			b + "Walk2.gif",
			b + "Attack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
		];
	})(),
});
var oDuckyTubeZombie4 = InheritO(oDuckyTubeZombie3, {
	EName: "oDuckyTubeZombie4",
	CName: "Ducky Tube Screen Door Zombie",
	PicArr: (function () {
		var b = "images/Zombies/DuckyTubeZombie4/";
		var a = "images/Zombies/DuckyTubeZombie1/";
		return [
			"images/Card/Zombies/DuckyTubeZombie1.png",
			b + "0.gif",
			b + "Walk1.gif",
			b + "Walk2.gif",
			b + "1.gif",
			b + "Attack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Attack.gif",
		];
	})(),
	getHit: OrnIIZombies.prototype.getHit,
	getHit0: oScreenDoorZombie.prototype.getHit0,
	getHit1: OrnIIZombies.prototype.getHit1,
	getHit2: OrnIIZombies.prototype.getHit2,
	getHit3: OrnIIZombies.prototype.getHit3,
	getSnowPea: oScreenDoorZombie.prototype.getSnowPea,
	CheckOrnHP: oScreenDoorZombie.prototype.CheckOrnHP,
});
var oAquaticZombie = InheritO(OrnNoneZombies, {
	StandGif: 4,
	AttackGif: 5,
	HeadGif: 6,
	DieGif: 7,
	WalkGif0: 2,
	WalkGif1: 3,
	CanPass(b, a) {
		return a === 2;
	},
	BirthCallBack(g) {
		var e = g.delayT;
		var c = g.id;
		var b = (g.Ele = $(c));
		var d = g.AttackedLX;
		var f;
		var a;
		var h;
		f = g.EleShadow = b.firstChild;
		g.EleBody = b.childNodes[1];
		switch (true) {
			case d > GetX(9):
				g.ChkActs = g.ChkActsL1;
				g.WalkStatus = 0;
				break;
			case d < GetX(0):
				g.ChkActs = g.ChkActsL3;
				g.WalkStatus = 0;
				break;
			default:
				g.ChkActs = g.ChkActsL2;
				g.WalkStatus = 1;
				g.EleBody.src = g.PicArr[(g.NormalGif = g.WalkGif1)];
				SetHidden(f);
				NewEle(
					(a = c + "_splash"),
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:61px;top:" +
						(g.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					b
				);
				ImgSpriter(
					a,
					c,
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
		}
		e
			? oSym.addTask(
					e,
					(j, i) => {
						var k = $Z[j];
						k && ((k.FreeSetbodyTime = 0), SetBlock(i));
					},
					[c, b]
				)
			: SetBlock(b);
	},
	ChkActsL1(f, e, g, d) {
		var c;
		var a;
		var b = f.id;
		!(f.FreeFreezeTime || f.FreeSetbodyTime) &&
			((f.AttackedRX -= c = f.Speed), (LX = f.ZX = f.AttackedLX -= c), (f.Ele.style.left = Math.floor((f.X -= c)) + "px"));
		f.AttackedLX < GetX(9) &&
			(PlaySound2("zombie_entering_water"),
			(f.WalkStatus = 1),
			(f.EleBody.src = f.PicArr[(f.NormalGif = f.WalkGif1)]),
			SetHidden(f.EleShadow),
			NewEle(
				(a = b + "_splash"),
				"div",
				"position:absolute;background:url(images/interface/splash.png);left:61px;top:" + (f.height - 88) + "px;width:97px;height:88px;over-flow:hidden",
				0,
				f.Ele
			),
			(f.ChkActs = f.ChkActsL2),
			ImgSpriter(
				a,
				b,
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
				(h, i) => {
					ClearChild($(h));
				}
			));
		return 1;
	},
	ChkActsL2(d, c, e, b) {
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
			!d.isAttacking && ((d.AttackedRX -= a = d.Speed), (d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px")));
		d.AttackedLX < GetX(0) &&
			((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActsL3));
		return 1;
	},
	ChkActsL3: CZombies.prototype.ChkActs,
	ChkActs1(d, c, e, b) {
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
			!d.isAttacking && ((d.AttackedLX += a = d.Speed), (d.ZX = d.AttackedRX += a), (d.Ele.style.left = Math.ceil((d.X += a)) + "px")));
		d.AttackedLX > GetX(9) &&
			((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActs2));
		return 1;
	},
	ChkActs2(e, c, f, b) {
		var a;
		var d;
		!(e.FreeFreezeTime || e.FreeSetbodyTime)
			? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
				!e.isAttacking
					? (e.AttackedLX += a = e.Speed) > oS.W
						? (f.splice(b, 1), e.DisappearDie(), (d = 0))
						: ((e.ZX = e.AttackedRX += a), (e.Ele.style.left = Math.ceil((e.X += a)) + "px"), (d = 1))
					: (d = 1))
			: (d = 1);
		return d;
	},
	ExchangeLR(d, b) {
		var c = d.width;
		var f = d.beAttackedPointL;
		var a = d.beAttackedPointR;
		var e = d.Ele;
		e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
		d.beAttackedPointR = c - f;
		d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
		d.ExchangeLR2(d, d.EleBody, b);
	},
	GoingDie() {
		var b = this;
		var c = b.id;
		var a = b.PicArr;
		b.EleBody.src = a[7];
		b.GoingDieHead(c, a, b);
		b.beAttacked = 0;
		b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
		b.AutoReduceHP(c);
	},
	AutoReduceHP(a) {
		oSym.addTask(
			100,
			function (c) {
				var b = $Z[c];
				b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
			},
			[a]
		);
	},
	ExplosionDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	NormalDie() {
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
});
var oSnorkelZombie = InheritO(oDuckyTubeZombie1, {
	EName: "oSnorkelZombie",
	CName: "Snorkel Zombie",
	Lvl: 1,
	SunNum: 75,
	width: 143,
	height: 200,
	beAttackedPointL: 40,
	beAttackedPointR: 100,
	OSpeed: 3.2,
	Speed: 3.2,
	Altitude: 1,
	AlmanacGif: 4,
	BirthCallBack(g) {
		var e = g.delayT;
		var c = g.id;
		var b = (g.Ele = $(c));
		var d = g.AttackedLX;
		var f;
		var a;
		var h;
		f = g.EleShadow = b.firstChild;
		g.EleBody = b.childNodes[1];
		switch (true) {
			case d > GetX(9):
				g.ChkActs = g.ChkActsL1;
				g.WalkStatus = 0;
				break;
			case d < GetX(0):
				g.ChkActs = g.ChkActsL3;
				g.WalkStatus = 0;
				break;
			default:
				g.ChkActs = g.ChkActsL2;
				g.WalkStatus = 1;
				g.EleBody.src = g.PicArr[(g.NormalGif = g.WalkGif1)];
				SetHidden(f);
				NewEle(
					(a = c + "_splash"),
					"div",
					"position:absolute;background:url(images/interface/splash.png);left:61px;top:" +
						(g.height - 88) +
						"px;width:97px;height:88px;over-flow:hidden",
					0,
					b
				);
				ImgSpriter(
					a,
					c,
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
		}
		e
			? oSym.addTask(
					e,
					(j, i) => {
						var k = $Z[j];
						k && ((k.FreeSetbodyTime = 0), SetBlock(i));
					},
					[c, b]
				)
			: SetBlock(b);
	},
	Produce:
		'<font color="#28325A">Snorkel zombies can swim underwater.</font><p>Toughness: <font color="#CC241D">low</font><br>Special: <font color="#CC241D">submerges to avoid attacks</font><br><font color="#0ca1db">Only appears in the pool</font></p>Zombies don\'t breathe. They don\'t need<br>air. So why does Snorkel Zombie need a<br>snorkel to swim underwater?<br>Answer: peer pressure.',
	JumpTime: 40,
	getShadow(a) {
		return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
	},
	BookHandPosition: "68% 15px",
	PicArr: (function () {
		var a = "images/Zombies/SnorkelZombie/";
		return [
			"images/Card/Zombies/SnorkelZombie.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Jump.gif" + $Random,
			a + "Risk.gif" + $Random,
			a + "Sink.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
	Jump(a) {
		a.beAttacked &&
			(PlaySound2("zombie_entering_water"),
			(a.Altitude = 2),
			SetHidden(a.EleShadow),
			(a.EleBody.src = a.PicArr[8]),
			oSym.addTask(
				160,
				(c, b) => {
					$Z[c] &&
						b.beAttacked &&
						((b.WalkStatus = 1),
						(b.Altitude = 0),
						(b.OSpeed = b.Speed = 2),
						(b.EleBody.src = b.PicArr[(b.NormalGif = b.WalkGif1)]),
						(b.ChkActs = b.ChkActsL2));
				},
				[a.id, a]
			),
			(a.ChkActs = function () {
				return 1;
			}));
	},
	ChkActsL1(d, c, e, b) {
		if (d.JumpTime <= 0) {
			d.Jump(d);
			return 1;
		}
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			((d.AttackedRX -= a = d.Speed), (LX = d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px"), --d.JumpTime);
		return 1;
	},
	ChkActsL2(d, c, e, b) {
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			(d.AttackedLX > GetX(0)
				? (d.beAttacked && !d.isAttacking && d.JudgeAttack(),
					!d.isAttacking && ((d.AttackedRX -= a = d.Speed), (d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px")))
				: d.beAttacked &&
					((d.WalkStatus = 0),
					(d.Altitude = 1),
					(d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]),
					SetVisible(d.EleShadow),
					(d.ChkActs = d.ChkActsL3)));
		return 1;
	},
	JudgeAttack() {
		var e = this;
		var b = e.ZX;
		var c = e.R + "_";
		var d = GetC(b);
		var g = oGd.$;
		var a;
		var f = e.id;
		(a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g))
			? !e.isAttacking
				? ((e.isAttacking = 1),
					(e.EleBody.src = e.PicArr[9]),
					oSym.addTask(
						50,
						(i, h) => {
							$Z[i] && h.beAttacked && ((h.EleBody.src = h.PicArr[h.AttackGif]), (h.Altitude = 1), h.NormalAttack(a[0], a[1]));
						},
						[f, e]
					))
				: e.NormalAttack(a[0], a[1])
			: e.isAttacking &&
				((e.EleBody.src = e.PicArr[10]),
				(e.Altitude = 0),
				oSym.addTask(
					70,
					(i, h) => {
						$Z[i] && h.beAttacked && ((h.isAttacking = 0), (h.EleBody.src = h.PicArr[h.NormalGif]));
					},
					[f, e]
				));
	},
	NormalAttack(b, a) {
		oSym.addTask(
			100,
			(d, c) => {
				var f = $Z[d];
				var e;
				f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack());
			},
			[b, a]
		);
	},
	JudgeAttackH() {
		var c = this;
		var b = oZ.getZ0(c.ZX, c.R);
		var d = c.id;
		var a;
		b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2
			? !c.isAttacking
				? ((c.isAttacking = 1),
					(c.EleBody.src = c.PicArr[9]),
					(a = b.id),
					!b.isAttacking && b.AttackZombie2(b, a, d),
					oSym.addTask(
						50,
						(g, h, f, e) => {
							$Z[h] &&
								g.beAttacked &&
								($Z[e] && f.beAttacked ? ((g.EleBody.src = g.PicArr[g.AttackGif]), (g.Altitude = 1), g.AttackZombie(h, e)) : g.JudgeAttackH());
						},
						[c, d, b, a]
					))
				: c.AttackZombie(d, a)
			: c.isAttacking &&
				((c.EleBody.src = c.PicArr[10]),
				(c.Altitude = 0),
				oSym.addTask(
					70,
					(f, e) => {
						$Z[f] && e.beAttacked && ((e.isAttacking = 0), (e.EleBody.src = e.PicArr[e.NormalGif]));
					},
					[d, c]
				));
	},
	AttackZombie2(c, b, a) {
		c.isAttacking = 1;
		c.EleBody.src = c.PicArr[9];
		oSym.addTask(
			50,
			(g, e, d, f) => {
				$Z[e] &&
					g.beAttacked &&
					((f = $Z[d]) && f.beAttacked
						? ((g.EleBody.src = g.PicArr[g.AttackGif]),
							(g.Altitude = 1),
							oSym.addTask(
								10,
								function (k, i, j, h) {
									$Z[i] &&
										k.beAttacked &&
										!k.FreeFreezeTime &&
										!k.FreeSetbodyTime &&
										($Z[h] && j.beAttacked
											? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h]))
											: ((k.EleBody.src = k.PicArr[10] + Math.random()),
												(k.Altitude = 0),
												oSym.addTask(
													70,
													(l, m) => {
														$Z[l] && m.beAttacked && ((m.isAttacking = 0), (m.EleBody.src = m.PicArr[m.NormalGif]));
													},
													[i, k]
												)));
								},
								[g, e, f, d]
							))
						: ((g.EleBody.src = g.PicArr[10]),
							(g.Altitude = 0),
							oSym.addTask(
								70,
								(h, i) => {
									$Z[h] && i.beAttacked && ((i.isAttacking = 0), (i.EleBody.src = i.PicArr[i.NormalGif]));
								},
								[e, g]
							)));
			},
			[c, b, a]
		);
	},
	AutoReduceHP(a) {
		oSym.addTask(
			100,
			function (c) {
				var b = $Z[c];
				b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
			},
			[a]
		);
	},
});
var oCSnorkelZombie = InheritO(oSnorkelZombie, {});
var oSubZombie = InheritO(oSnorkelZombie, {
	EName: "oSubZombie",
	CName: "Submarine Zombie",
	HP: "450",
	OSpeed: 0.9,
	Speed: 0.9,
	width: 464,
	height: 364,
	beAttackedPointL: 140,
	beAttackedPointR: 290,
	BookHandBack: "Pool",
	BookHandPosition: "12% 60%",
	Produce:
		'<font color="#28325A">A powerful mechanical submarine that<br>can dodge most attacks in water.</font><p>Toughness: <font color="#CC241D">extremely high</font><br>Special: <font color="#CC241D">submerges to avoid attacks</font><br><font color="#0ca1db">Only appears in the pool</font></p>This is an invincible submarine created by<br>the Author Zombie itself. Do not try to<br>destroy it. Its fierce attack will only<br>make your plants die faster!',
	PicArr: (function () {
		var a = "images/Zombies/SubZombie/";
		return [
			"images/Card/Zombies/SubZombie.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Jump.gif" + $Random,
			a + "Risk.gif" + $Random,
			a + "Sink.gif" + $Random,
		];
	})(),
});
var oSmallZombie = InheritO(oZombie, {
	EName: "oSmallZombie",
	CName: "Small Zombie",
	HP: 67,
	width: 83,
	height: 72,
	beAttackedPointL: 41,
	beAttackedPointR: 78,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:83px;height:72px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
	},
});
var oSmallFlagZombie = InheritO(oFlagZombie, {
	EName: "oSmallFlagZombie",
	CName: "Small Flag Zombie",
	HP: 67,
	width: 83,
	height: 72,
	beAttackedPointL: 41,
	beAttackedPointR: 78,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:83px;height:72px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
	},
});
var oSmallDuckyTubeZombie1 = InheritO(oDuckyTubeZombie1, {
	EName: "oSmallDuckyTubeZombie1",
	CName: "小鸭子救生圈僵尸",
	HP: 67,
	width: 83,
	height: 72,
	beAttackedPointL: 41,
	beAttackedPointR: 73,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:83px;height:72px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
	},
});
var oSmallConeheadZombie = InheritO(oConeheadZombie, {
	EName: "oSmallConeheadZombie",
	CName: "Small Conehead Zombie",
	OrnHP: 92,
	HP: 67,
	width: 83,
	height: 72,
	beAttackedPointL: 41,
	beAttackedPointR: 78,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:83px;height:72px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
	},
});
var oSmallFootballZombie = InheritO(oFootballZombie, {
	EName: "oSmallFootballZombie",
	CName: "小橄榄球僵尸",
	OrnHP: 350,
	HP: 67,
	width: 77,
	height: 80,
	beAttackedPointL: 20,
	beAttackedPointR: 77,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:77px;height:80px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px";
	},
});
var oSmallSnorkelZombie = InheritO(oSnorkelZombie, {
	EName: "oSmallSnorkelZombie",
	CName: "小潜水僵尸",
	HP: 67,
	width: 71,
	height: 100,
	beAttackedPointL: 20,
	beAttackedPointR: 50,
	BreakPoint: 25,
	Init(e, g, c, b) {
		var a = 0;
		var f = this;
		var d = [];
		g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
		while (--b) {
			g.CanPass(b, c[b]) && (d[a++] = b);
		}
		g.ArR = d;
		g.ArHTML = [
			'<div id="',
			'" style="position:absolute;display:',
			";left:",
			"px;top:",
			"px;z-index:",
			'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
			",0);width:71px;height:100px;top:",
			'px" src="',
			'"></div>',
		];
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [
			NewImg(0, a[b.HeadGif], "width:71px;height:105px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
		]);
	},
	getShadow(a) {
		return "width:43px;height:18px;left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
	},
});
var oZomboni = (function () {
	var a = function (d, b) {
		var c = d.HP;
		switch (true) {
			case (d.HP = c -= b) < 200:
				d.GoingDie();
				d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};
				return;
			case c < 391:
				d.EleBody.src = "images/Zombies/Zomboni/3.gif";
				break;
			case c < 871:
				d.EleBody.src = "images/Zombies/Zomboni/2.gif";
		}
		d.SetAlpha(d, d.EleBody, 50, 0.5);
		oSym.addTask(
			10,
			(f, e) => {
				(e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
			},
			[d.id]
		);
	};
	return InheritO(OrnNoneZombies, {
		EName: "oZomboni",
		CName: "Zomboni",
		HP: 1350,
		Lvl: 3,
		StandGif: 2,
		AlmanacGif: 2,
		DieGif: 6,
		BoomDieGif: 7,
		BookHandPosition: "40% 35%",
		width: 464,
		height: 364,
		GetDTop: 104,
		beAttackedPointL: 140,
		beAttackedPointR: 290,
		BreakPoint: 200,
		SunNum: 350,
		GetDY() {
			return 0;
		},
		OSpeed: 2.5,
		Speed: 2.5,
		AKind: 2,
		Attack: 50,
		Produce:
			'<font color="#28325A">The Zomboni applies ice, steam and<br>pressure to your plants.</font><p>Toughness: <font color="#CC241D">high</font><br>Special: <font color="#CC241D">crushes plants, leaves an ice trail</font></p>Often mistaken for a zombie driving an<br>ice machine, the Zomboni is a totally<br>different life-form more closely related<br>to a space ogre than a zombie.',
		BookHandBack: "Ice",
		BookHandPosition: "32% 52%",
		PicArr: (function () {
			var b = "images/Zombies/Zomboni/";
			return [
				"images/Card/Zombies/Zomboni.png",
				b + "0.gif",
				b + "1.gif",
				b + "2.gif",
				b + "3.gif",
				b + "4.gif",
				b + "5.gif" + $Random,
				b + "BoomDie.gif" + $Random,
				b + "ice.png",
				b + "ice_cap.png",
			];
		})(),
		AudioArr: ["zamboni", "explosion"],
		BirthCallBack(h) {
			var g = h.delayT;
			var e = h.id;
			var c = (h.Ele = $(e));
			var d = h.R;
			var f;
			var b = oGd.$Ice;
			h.EleShadow = c.firstChild;
			h.EleBody = c.childNodes[1];
			!b[d]
				? ((f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px", 0, EDPZ)),
					NewImg(
						"",
						"images/interface/blank.png",
						"position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/Zomboni/ice.png) repeat-x",
						f
					),
					NewImg("", "images/Zombies/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", f),
					(b[d] = [1, 11, h.AttackedLX]))
				: ++b[d][0];
			g
				? oSym.addTask(
						g,
						(j, i) => {
							var k = $Z[j];
							k && ((k.FreeSetbodyTime = 0), SetBlock(i), PlaySound2("zamboni"));
						},
						[e, c]
					)
				: (SetBlock(c), PlaySound2("zamboni"));
		},
		ChkActs(e, j, q, k) {
			var b;
			var r;
			var m;
			var g;
			var n = oGd.$Ice[j];
			var d;
			var h;
			var f;
			var c;
			var l = $("dIceCar" + j);
			e.JudgeAttack();
			(r = e.AttackedRX -= b = e.Speed) < -50
				? (q.splice(k, 1), e.DisappearDie(), (m = 0))
				: (r < 100 &&
						!e.PointZombie &&
						((e.PointZombie = 1),
						!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
						e.ChangeR({
							R: j,
							ar: [oS.R - 1],
							CustomTop: 400 - e.height + e.GetDY(),
						})),
					(e.ZX = e.AttackedLX -= b),
					(e.Ele.style.left = Math.floor((e.X -= b)) + "px"),
					(m = 1));
			d = e.X;
			h = d + 250;
			f = d + 100;
			c = GetC(h);
			c > -1 && c < n[1] && ((oGd.$Crater[j + "_" + c] = 1), (n[1] = c));
			h > 120 &&
				h < n[2] &&
				((n[2] = h), (l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)"), (l.childNodes[1].style.left = Math.max(0, f) + "px"));
			GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= 0.005);
			return m;
		},
		ChkActs1(f, d, g, c) {
			var b;
			var e;
			f.JudgeAttack();
			(f.AttackedLX += b = f.Speed) > oS.W
				? (g.splice(c, 1), f.DisappearDie(), (e = 0))
				: ((f.ZX = f.AttackedRX += b), (f.Ele.style.left = Math.ceil((f.X += b)) + "px"), (e = 1));
			return e;
		},
		getPea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getFirePea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getSnowPea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getFirePeaSputtering() {},
		getFreeze(c, b) {
			c.getHit0(c, 20);
		},
		getShadow(b) {
			return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px";
		},
		getHit: a,
		getHit0: a,
		getHit1: a,
		getHit2: a,
		getHit3: a,
		GoingDie() {
			var b = this;
			b.beAttacked = 0;
			b.AutoReduceHP(b.id);
		},
		NormalDie() {
			var b = this;
			PlaySound2("explosion");
			b.EleBody.src = b.PicArr[b.DieGif];
			oSym.addTask(70, ClearChild, [b.Ele]);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		DisappearDie() {
			var b = this;
			ClearChild(b.Ele);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		ExplosionDie() {
			var b = this;
			b.EleBody.src = b.PicArr[b.BoomDieGif];
			oSym.addTask(300, ClearChild, [b.Ele]);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		CrushDie() {
			this.NormalDie();
		},
		JudgeIce() {
			var d = this;
			var b = d.R;
			var e = $("dIceCar" + b);
			var c = oGd.$Ice[b];
			e && e.childNodes[1] && SetBlock(e.childNodes[1]);
			--c[0] <= 0 &&
				oSym.addTask(
					3e3,
					(k, h) => {
						var j = oGd.$Ice[h];
						var g;
						var f = oGd.$Crater;
						if (j && j[0] <= 0 && k) {
							ClearChild(k);
							g = j[1];
							while (g < 11) {
								delete f[h + "_" + g++];
								delete oGd.$Ice[h];
							}
						}
					},
					[e, b]
				);
		},
		flatTire() {
			var b = this;
			b.EleBody.src = "images/Zombies/Zomboni/4.gif";
			b.beAttacked = 0;
			b.HP = 0;
			b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};
			b.ChkActs = b.ChkActs1 = function () {};
			oSym.addTask(
				290,
				(e, c) => {
					var d = $Z[e];
					d && d.NormalDie();
				},
				[b.id, b.EleBody]
			);
		},
		JudgeAttack() {
			var f = this;
			var c = f.ZX;
			var d = f.R + "_";
			var e = GetC(c);
			var g = oGd.$;
			var b;
			(b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
		},
		JudgeLR(e, c, d, b, f) {
			return d > 10 || d < 1
				? false
				: (function () {
						c += --d + "_";
						var g = 3;
						var h;
						while (g--) {
							if ((h = f[c + g])) {
								return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
							}
						}
					})();
		},
		JudgeSR(e, c, d, b, f) {
			return d > 9
				? false
				: (function () {
						c += d + "_";
						var g = 3;
						var h;
						while (g--) {
							if ((h = f[c + g])) {
								return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
							}
						}
					})();
		},
		NormalAttack(c, b) {
			var d = $Z[c];
			$P[b].getHurt(d, 2, d.Attack);
		},
		getThump() {
			this.NormalDie();
		},
	});
})();
var oCZomboni = (function () {
	var a = function (d, b) {
		var c = d.HP;
		switch (true) {
			case (d.HP = c -= b) < 200:
				d.GoingDie();
				d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};
				return;
			case c < 391:
				d.EleBody.src = "images/Zombies/wall/Zomboni/3.gif";
				break;
			case c < 871:
				d.EleBody.src = "images/Zombies/wall/Zomboni/2.gif";
		}
		d.SetAlpha(d, d.EleBody, 50, 0.5);
		oSym.addTask(
			10,
			(f, e) => {
				(e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
			},
			[d.id]
		);
	};
	return InheritO(oZomboni, {
		EName: "oCZomboni",
		CName: "油车僵尸",
		HP: 1350,
		Lvl: 3,
		StandGif: 2,
		DieGif: 6,
		BoomDieGif: 7,
		BookHandPosition: "40% 35%",
		width: 464,
		height: 364,
		GetDTop: 104,
		beAttackedPointL: 140,
		beAttackedPointR: 290,
		BreakPoint: 200,
		SunNum: 350,
		GetDY() {
			return 0;
		},
		OSpeed: 2.5,
		Speed: 2.5,
		AKind: 2,
		Attack: 50,
		PicArr: (function () {
			var b = "images/Zombies/wall/Zomboni/";
			return [
				"images/Card/Zombies/Zomboni.png",
				b + "0.gif",
				b + "1.gif",
				b + "2.gif",
				b + "3.gif",
				b + "4.gif",
				b + "5.gif" + $Random,
				b + "BoomDie.gif" + $Random,
				b + "ice.png",
				b + "ice_cap.png",
			];
		})(),
		AudioArr: ["zamboni", "explosion"],
		BirthCallBack(h) {
			var g = h.delayT;
			var e = h.id;
			var c = (h.Ele = $(e));
			var d = h.R;
			var f;
			var b = oGd.$Ice;
			h.EleShadow = c.firstChild;
			h.EleBody = c.childNodes[1];
			!b[d]
				? ((f = NewEle("dIceCar" + d, "div", "position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px", 0, EDPZ)),
					NewImg(
						"",
						"images/interface/blank.png",
						"position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/wall/Zomboni/ice.png) repeat-x",
						f
					),
					NewImg("", "images/Zombies/wall/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", f),
					(b[d] = [1, 11, h.AttackedLX]))
				: ++b[d][0];
			g
				? oSym.addTask(
						g,
						(j, i) => {
							var k = $Z[j];
							k && ((k.FreeSetbodyTime = 0), SetBlock(i), PlaySound2("zamboni"));
						},
						[e, c]
					)
				: (SetBlock(c), PlaySound2("zamboni"));
		},
		ChkActs(e, j, q, k) {
			var b;
			var r;
			var m;
			var g;
			var n = oGd.$Ice[j];
			var d;
			var h;
			var f;
			var c;
			var l = $("dIceCar" + j);
			e.JudgeAttack();
			(r = e.AttackedRX -= b = e.Speed) < -50
				? (q.splice(k, 1), e.DisappearDie(), (m = 0))
				: (r < 100 &&
						!e.PointZombie &&
						((e.PointZombie = 1),
						!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
						e.ChangeR({
							R: j,
							ar: [oS.R - 1],
							CustomTop: 400 - e.height + e.GetDY(),
						})),
					(e.ZX = e.AttackedLX -= b),
					(e.Ele.style.left = Math.floor((e.X -= b)) + "px"),
					(m = 1));
			d = e.X;
			h = d + 250;
			f = d + 100;
			c = GetC(h);
			c > -1 && c < n[1] && ((oGd.$Crater[j + "_" + c] = 1), (n[1] = c));
			h > 120 &&
				h < n[2] &&
				((n[2] = h), (l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)"), (l.childNodes[1].style.left = Math.max(0, f) + "px"));
			GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= 0.005);
			return m;
		},
		ChkActs1(f, d, g, c) {
			var b;
			var e;
			f.JudgeAttack();
			(f.AttackedLX += b = f.Speed) > oS.W
				? (g.splice(c, 1), f.DisappearDie(), (e = 0))
				: ((f.ZX = f.AttackedRX += b), (f.Ele.style.left = Math.ceil((f.X += b)) + "px"), (e = 1));
			return e;
		},
		getPea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getFirePea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getSnowPea(c, b) {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
			c.getHit0(c, b);
		},
		getFirePeaSputtering() {},
		getFreeze(c, b) {
			c.getHit0(c, 20);
		},
		getShadow(b) {
			return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px";
		},
		getHit: a,
		getHit0: a,
		getHit1: a,
		getHit2: a,
		getHit3: a,
		GoingDie() {
			var b = this;
			b.beAttacked = 0;
			b.AutoReduceHP(b.id);
		},
		NormalDie() {
			var b = this;
			PlaySound2("explosion");
			b.EleBody.src = b.PicArr[b.DieGif];
			oSym.addTask(70, ClearChild, [b.Ele]);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		DisappearDie() {
			var b = this;
			ClearChild(b.Ele);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		ExplosionDie() {
			var b = this;
			b.EleBody.src = b.PicArr[b.BoomDieGif];
			oSym.addTask(300, ClearChild, [b.Ele]);
			b.HP = 0;
			delete $Z[b.id];
			b.JudgeIce();
			b.PZ && oP.MonPrgs();
		},
		CrushDie() {
			this.NormalDie();
		},
		JudgeIce() {
			var d = this;
			var b = d.R;
			var e = $("dIceCar" + b);
			var c = oGd.$Ice[b];
			e && e.childNodes[1] && SetBlock(e.childNodes[1]);
			--c[0] <= 0 &&
				oSym.addTask(
					3e3,
					(k, h) => {
						var j = oGd.$Ice[h];
						var g;
						var f = oGd.$Crater;
						if (j && j[0] <= 0 && k) {
							ClearChild(k);
							g = j[1];
							while (g < 11) {
								delete f[h + "_" + g++];
								delete oGd.$Ice[h];
							}
						}
					},
					[e, b]
				);
		},
		flatTire() {
			var b = this;
			b.EleBody.src = "images/Zombies/wall/Zomboni/4.gif";
			b.beAttacked = 0;
			b.HP = 0;
			b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};
			b.ChkActs = b.ChkActs1 = function () {};
			oSym.addTask(
				290,
				(e, c) => {
					var d = $Z[e];
					d && d.NormalDie();
				},
				[b.id, b.EleBody]
			);
		},
		JudgeAttack() {
			var f = this;
			var c = f.ZX;
			var d = f.R + "_";
			var e = GetC(c);
			var g = oGd.$;
			var b;
			(b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
		},
		JudgeLR(e, c, d, b, f) {
			return d > 10 || d < 1
				? false
				: (function () {
						c += --d + "_";
						var g = 3;
						var h;
						while (g--) {
							if ((h = f[c + g])) {
								return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
							}
						}
					})();
		},
		JudgeSR(e, c, d, b, f) {
			return d > 9
				? false
				: (function () {
						c += d + "_";
						var g = 3;
						var h;
						while (g--) {
							if ((h = f[c + g])) {
								return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
							}
						}
					})();
		},
		NormalAttack(c, b) {
			var d = $Z[c];
			$P[b].getHurt(d, 2, d.Attack);
		},
		getThump() {
			this.NormalDie();
		},
	});
})();
var oDolphinRiderZombie = InheritO(oAquaticZombie, {
	EName: "oDolphinRiderZombie",
	CName: "Dolphin Rider Zombie",
	HP: 270,
	Lvl: 2,
	BreakPoint: 167,
	width: 282,
	height: 210,
	Lvl: 2,
	getShadow(a) {
		return "left:105px;top:175px";
	},
	GetDX() {
		return -137;
	},
	GetDY() {
		return 0;
	},
	GetDTop: 0,
	Altitude: 1,
	haveDolphin: 1,
	JumpTime: 45,
	beAttackedPointL: 110,
	beAttackedPointR: 190,
	SunNum: 350,
	OSpeed: 3.2,
	Speed: 3.2,
	AlmanacGif: 4,
	BookHandPosition: "36% 82%",
	PicArr: (function () {
		var a = "images/Zombies/DolphinRiderZombie/";
		return [
			"images/Card/Zombies/DolphinRiderZombie.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Jump.gif" + $Random,
			a + "Jump2.gif" + $Random,
			a + "Walk3.gif",
			a + "Walk4.gif",
			a + "Die2.gif" + $Random,
			a + "Jump3.gif" + $Random,
		];
	})(),
	AudioArr: ["dolphin_before_jumping", "dolphin_appears", "zombie_entering_water"],
	Produce:
		'<font color="#28325A">Dolphin Rider Zombies use dolphins to<br>exploit weaknesses in your pool defense.</font><p>Toughness: <font color="#CC241D">medium</font><br>Speed: <font color="#CC241D">fast, then slow (after jump)</font><br>Special: <font color="#CC241D">jumps over the first plant he runs<br>into</font><br><font color="#0ca1db">Only appears in the pool</font></p>The dolphin is also a zombie.',
	BirthCallBack(a) {
		PlaySound2("dolphin_appears");
		oAquaticZombie.prototype.BirthCallBack(a);
	},
	Jump(a) {
		a.beAttacked &&
			(PlaySound2("zombie_entering_water"),
			(a.Altitude = 2),
			SetHidden(a.EleShadow),
			(a.EleBody.src = a.PicArr[8]),
			oSym.addTask(
				240,
				(d, b) => {
					var c;
					$Z[d] &&
						b.beAttacked &&
						((b.WalkStatus = 1),
						(b.Altitude = 1),
						(b.OSpeed = b.Speed = 10.8),
						SetStyle(b.Ele, { left: (c = b.X -= 140) + "px" }),
						(b.AttackedLX = c + (b.beAttackedPointL = 185)),
						(b.AttackedRX = c + (b.beAttackedPointR = 265)),
						(b.EleBody.src = b.PicArr[(b.NormalGif = b.WalkGif1)]),
						(b.ChkActs = b.ChkActsL2));
				},
				[a.id, a]
			),
			(a.ChkActs = function () {
				return 1;
			}));
	},
	ChkActsL1(d, c, e, b) {
		if (d.JumpTime <= 0) {
			d.Jump(d);
			return 1;
		}
		var a;
		!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
			((d.AttackedRX -= a = d.Speed), (LX = d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px"), --d.JumpTime);
		return 1;
	},
	getCrushed(a) {
		this.NormalAttack(this.id, a.id, a.AttackedLX);
		this.getCrushed = function () {
			return false;
		};
		a.Stature > 0 &&
			oSym.addTask(
				50,
				(c) => {
					var b = $Z[c];
					b && b.CrushDie();
				},
				[this.id]
			);
		return false;
	},
	getRaven(a) {
		return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
	},
	JudgeAttack() {
		var f = this;
		var b = f.ZX;
		var d = f.R + "_";
		var c = GetC(b);
		var g = oGd.$;
		var e;
		var a;
		for (e = c - 2; e <= c; e++) {
			if (e > 9) {
				continue;
			}
			for (
				a = 2;
				a > -1;
				(p = g[d + e + "_" + a--]) &&
				(p.EName !== "oBrains"
					? p.AttackedRX >= b &&
						p.AttackedLX < b &&
						((a = -1), (f.JudgeAttack = CZombies.prototype.JudgeAttack), f.NormalAttack(f.id, p.id, p.AttackedLX))
					: p.AttackedRX >= b &&
						p.AttackedLX < b &&
						((a = -1), (f.JudgeAttack = CZombies.prototype.JudgeAttack), (f.NormalAttack = CZombies.prototype.NormalAttack)(f.id, p.id)))
			) {}
		}
	},
	AttackZombie2(c, b, a) {
		c.NormalAttack(b, a, $Z[a].AttackedLX);
	},
	NormalAttack(d, b, g) {
		var f = $Z[d];
		var a = f.Ele;
		var c = f.EleShadow;
		var e = f.EleBody;
		e.src = f.PicArr[9];
		SetHidden(c);
		f.isAttacking = 1;
		f.Altitude = 2;
		f.haveDolphin = 0;
		PlaySound2("dolphin_before_jumping");
		f.getFreeze = function () {
			f.getSnow(f, 20, 0);
		};
		oSym.addTask(
			50,
			(m, j, i, l, q) => {
				var h = $Z[m];
				var k;
				var r;
				var s;
				var n = function () {
					q.src = h.PicArr[10];
					h.isAttacking = 0;
					h.Altitude = 1;
					h.OSpeed = h.Speed = 1.6;
					h.WalkGif0 = 11;
					h.NormalGif = h.WalkGif1 = 10;
					h.LostHeadGif = h.DieGif = 12;
					h.NormalAttack = (s = CZombies.prototype).NormalAttack;
					h.getCrushed = s.getCrushed;
					h.getFreeze = s.getFreeze;
					h.getRaven = s.getRaven;
					h.AttackZombie2 = s.AttackZombie2;
				};
				h &&
					((k = $P[j]) && k.Stature > 0
						? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = r = k.AttackedRX) - (h.beAttackedPointL = 45)) + (h.beAttackedPointR = 100)),
							SetStyle(i, { left: h.X + "px" }),
							(h.EleShadow.style.left = "45px"),
							n())
						: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - (h.beAttackedPointR = 100)) + (h.beAttackedPointL = 45)),
							SetStyle(i, { left: h.X + "px" }),
							(h.EleShadow.style.left = "45px"),
							(q.src = h.PicArr[13]),
							oSym.addTask(
								170,
								(t, w) => {
									var v = $Z[t];
									var u;
									v && n();
								},
								[m, q]
							)));
			},
			[d, b, a, c, e]
		);
	},
	GoingDie() {
		var b = this;
		var c = b.id;
		var a = b.PicArr;
		b.EleBody.src = a[b.haveDolphin ? 7 : 12];
		b.GoingDieHead(c, a, b);
		b.beAttacked = 0;
		b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
		b.AutoReduceHP(c);
	},
});
var oCDolphinRiderZombie = InheritO(oDolphinRiderZombie, {});
var oImp = InheritO(OrnNoneZombies, {
	EName: "oImp",
	CName: "Imp",
	HP: 270,
	Lvl: 4,
	StandGif: 9,
	OSpeed: 1.4,
	Speed: 1.4,
	BookHandPosition: "35% 85%",
	PicArr: (function () {
		var a = "images/Zombies/Imp/";
		return [
			"images/Card/Zombies/Imp.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Imps are tiny zombies hurled by<br>Gargantuar deep into your defenses.</font><p>Toughness: <font color="#CC241D">low</font></p>Imp may be small, but he\'s wiry. He\'s<br>proficient in zombie judo, zombie karate<br>and zombie bare-knuckle brawling. He also<br>plays the melodica.',
});
var oIImp = InheritO(OrnNoneZombies, {
	EName: "oIImp",
	CName: "Imp",
	HP: 270,
	Lvl: 4,
	StandGif: 9,
	OSpeed: 1.64,
	Speed: 1.4,
	PicArr: (function () {
		var a = "images/Zombies/Imp/";
		return [
			"images/Card/Zombies/IImp.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'小鬼僵尸会快速突破你的防线。</p><p>韧性：<font color="#CC241D">低</font><br>其实小鬼僵尸天生就能跑的很快，一些懒惰的小鬼僵尸喜欢粘着巨人僵尸，但是一些勤奋的，就会经常出门成群的跑马拉松。',
});
var oJX = InheritO(OrnNoneZombies, {
	EName: "oJX",
	CName: "Crab Imp",
	HP: 275,
	Lvl: 4,
	StandGif: 9,
	OSpeed: 1.2,
	Speed: 1.4,
	Attack: 120,
	BookHandPosition: "33% 82%",
	PicArr: (function () {
		var a = "images/Zombies/JX/";
		return [
			"images/Card/Zombies/JX.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Is this really what Imps have evolved to?<br>Really? Crabs?</font><p>Toughness: <font color="#CC241D">medium</font></p>Short as he is, he likes this scavenged<br>crab shell, and the V-shaped crab claws<br>make him excited, so much so that he<br>forgets his disadvantage in height.',
});
var oJackinTheBoxZombie = InheritO(OrnNoneZombies, {
	EName: "oJackinTheBoxZombie",
	CName: "Jack-in-the-Box Zombie",
	SunNum: 100,
	HP: 270,
	Lvl: 3,
	Status: 1,
	BookHandPosition: "30% 70%",
	width: 196,
	height: 181,
	beAttackedPointL: 120,
	beAttackedPointR: 170,
	StandGif: 5,
	NormalGif: 6,
	AlmanacGif: 5,
	DieGif: 3,
	BoomDieGif: 4,
	HeadGif: 11,
	LostHeadGif: 9,
	LostHeadAttackGif: 10,
	AttackGif: 2,
	OSpeed: 3.6,
	Speed: 3.6,
	Produce:
		'<font color="#28325A">This zombie carries an explosive surprise.</font><p>Toughness: <font color="#CC241D">medium</font><br>Speed: <font color="#CC241D">fast</font><br>Special: <font color="#CC241D">jack-in-the-box explodes</font><br>Weakness: <font color="#CC241D">magnet-shroom</font></p>This zombie shivers, not because he\'s cold<br>but because he\'s crazy.',
	BookHandPosition: "6px 80%",
	AudioArr: ["jackinthebox", "explosion"],
	PicArr: (function () {
		var a = "images/Zombies/JackinTheBoxZombie/";
		return [
			"images/Card/Zombies/JackboxZombie.png",
			a + "0.gif",
			a + "Attack.gif",
			a + "Die.gif" + $Random,
			a + "BoomDie.gif" + $Random,
			a + "1.gif",
			a + "Walk.gif",
			a + "OpenBox.gif",
			a + "Boom.gif" + $Random,
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
		];
	})(),
	RandomOpenBox(a) {
		oSym.addTask(
			Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301),
			(c) => {
				var b = $Z[c];
				b && b.beAttacked && b.OpenBox(c);
			},
			[a]
		);
	},
	OpenBox(b) {
		var a = $Z[b];
		a.EleBody.src = a.PicArr[7];
		a.ChkActs = a.ChkActs1 = function () {
			return 1;
		};
		a.JudgeAttack = function () {
			var g = this;
			var d = g.ZX;
			var e = g.R + "_";
			var f = GetC(d);
			var h = oGd.$;
			var c;
			(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h))
				? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
				: g.isAttacking && (g.isAttacking = 0);
		};
		a.JudgeAttackH = function () {
			var e = this;
			var d = oZ.getZ0(e.ZX, e.R);
			var f = e.id;
			var c;
			d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude === 1
				? !e.isAttacking
					? ((e.isAttacking = 1), (e.EleBody.src = e.PicArr[e.AttackGif]), e.AttackZombie(f, (c = d.id)), !d.isAttacking && d.AttackZombie2(d, c, f))
					: e.AttackZombie(f, d.id, 1)
				: e.isAttacking && (e.isAttacking = 0);
		};
		a.getPea =
			a.getSnowPea =
			a.getFirePeaSputtering =
			a.getFirePea =
			a.getHit =
			a.getHit0 =
			a.getHit1 =
			a.getHit2 =
			a.getHit3 =
			a.ChangeR =
			a.bedevil =
				function () {};
		oSym.addTask(
			50,
			(c) => {
				$Z[c] &&
					((a.Status = 0),
					!--oGd.$JackinTheBox && StopSound2("jackinthebox"),
					PlaySound2("jackinthebox"),
					oSym.addTask(
						90,
						(f) => {
							var e = $Z[f];
							var d;
							e &&
								((d = NewImg("", "", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20")),
								PlaySound2("explosion"),
								(d.src = e.PicArr[8]),
								EDPZ.appendChild(d),
								oSym.addTask(70, ClearChild, [d]),
								e.PZ
									? (function (k, g) {
											var q = Math.max(1, k - 1);
											var o = Math.min(oS.R, k + 1);
											var n = Math.max(1, g - 1);
											var h = Math.min(oS.C, g + 1);
											var r = oGd.$;
											var l;
											var j = "";
											var m;
											do {
												g = n;
												do {
													j = q + "_" + g + "_";
													for (l = 0; l < 4; l++) {
														(m = r[j + l]) && m.BoomDie();
													}
												} while (g++ < h);
											} while (q++ < o);
										})(e.R, GetC(e.ZX))
									: (function (j, l) {
											var m = j - 120;
											var o = j + 120;
											var h = Math.min(1, l - 1);
											var g = Math.max(oS.R, l + 1);
											var n;
											var k;
											do {
												k = (n = oZ.getArZ(m, o, h)).length;
												while (k--) {
													n[k].ExplosionDie();
												}
											} while (h++ < g);
										})(e.ZX, e.R),
								e.DisappearDie());
						},
						[c]
					));
			},
			[b]
		);
	},
	getShadow(a) {
		return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px";
	},
	BirthCallBack(d) {
		var c = d.delayT;
		var b = d.id;
		var a = (d.Ele = $(b));
		d.EleShadow = a.firstChild;
		d.EleBody = a.childNodes[1];
		c
			? oSym.addTask(
					c,
					(f, e) => {
						var g = $Z[f];
						g && (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, (g.FreeSetbodyTime = 0), SetBlock(e), g.RandomOpenBox(f));
					},
					[b, a]
				)
			: (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b));
	},
	NormalDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(300, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		this.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.GoingDieHead(a.id, a.PicArr, a);
		ClearChild(a.Ele);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
});
var oIJackinTheBoxZombie = InheritO(OrnNoneZombies, {
	EName: "oIJackinTheBoxZombie",
	CName: "Jack-in-the-Box Zombie",
	SunNum: 100,
	HP: 270,
	Lvl: 3,
	Status: 1,
	BookHandPosition: "30% 70%",
	width: 196,
	height: 181,
	beAttackedPointL: 120,
	beAttackedPointR: 170,
	StandGif: 5,
	NormalGif: 6,
	DieGif: 3,
	BoomDieGif: 4,
	HeadGif: 11,
	LostHeadGif: 9,
	LostHeadAttackGif: 10,
	AttackGif: 2,
	OSpeed: 3.2,
	Speed: 3.2,
	Produce:
		'这种僵尸带着个会爆炸的潘多拉盒子。</p><p>韧性：<font color="#CC241D">中</font><br>速度：<font color="#CC241D">快</font><br>特点：<font color="#CC241D">打开玩偶匣会爆炸</font><br>弱点：<font color="#CC241D">磁力菇</font><br>这种僵尸令人不寒而栗，不是因为他的冰冷身躯而是因为他的疯狂。',
	AudioArr: ["jackinthebox", "explosion"],
	PicArr: (function () {
		var a = "images/Zombies/JackinTheBoxZombie/";
		return [
			"images/Card/Zombies/IJackboxZombie.png",
			a + "0.gif",
			a + "Attack.gif",
			a + "Die.gif" + $Random,
			a + "BoomDie.gif" + $Random,
			a + "1.gif",
			a + "Walk.gif",
			a + "OpenBox.gif",
			a + "Boom.gif" + $Random,
			a + "LostHead.gif",
			a + "LostHeadAttack.gif",
			"images/Zombies/Zombie/ZombieHead.gif" + $Random,
		];
	})(),
	RandomOpenBox(a) {
		oSym.addTask(
			Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301),
			(c) => {
				var b = $Z[c];
				b && b.beAttacked && b.OpenBox(c);
			},
			[a]
		);
	},
	OpenBox(b) {
		var a = $Z[b];
		a.EleBody.src = a.PicArr[7];
		a.ChkActs = a.ChkActs1 = function () {
			return 1;
		};
		a.JudgeAttack = function () {
			var g = this;
			var d = g.ZX;
			var e = g.R + "_";
			var f = GetC(d);
			var h = oGd.$;
			var c;
			(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h))
				? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
				: g.isAttacking && (g.isAttacking = 0);
		};
		a.JudgeAttackH = function () {
			var e = this;
			var d = oZ.getZ0(e.ZX, e.R);
			var f = e.id;
			var c;
			d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude === 1
				? !e.isAttacking
					? ((e.isAttacking = 1), (e.EleBody.src = e.PicArr[e.AttackGif]), e.AttackZombie(f, (c = d.id)), !d.isAttacking && d.AttackZombie2(d, c, f))
					: e.AttackZombie(f, d.id, 1)
				: e.isAttacking && (e.isAttacking = 0);
		};
		a.getPea =
			a.getSnowPea =
			a.getFirePeaSputtering =
			a.getFirePea =
			a.getHit =
			a.getHit0 =
			a.getHit1 =
			a.getHit2 =
			a.getHit3 =
			a.ChangeR =
			a.bedevil =
				function () {};
		oSym.addTask(
			50,
			(c) => {
				$Z[c] &&
					((a.Status = 0),
					!--oGd.$JackinTheBox && StopSound2("jackinthebox"),
					PlaySound2("jackinthebox"),
					oSym.addTask(
						90,
						(f) => {
							var e = $Z[f];
							var d;
							e &&
								((d = NewImg("", "", "width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20")),
								PlaySound2("explosion"),
								(d.src = e.PicArr[8]),
								EDPZ.appendChild(d),
								oSym.addTask(70, ClearChild, [d]),
								e.PZ
									? (function (k, g) {
											var q = Math.max(1, k - 1);
											var o = Math.min(oS.R, k + 1);
											var n = Math.max(1, g - 1);
											var h = Math.min(oS.C, g + 1);
											var r = oGd.$;
											var l;
											var j = "";
											var m;
											do {
												g = n;
												do {
													j = q + "_" + g + "_";
													for (l = 0; l < 4; l++) {
														(m = r[j + l]) && m.BoomDie();
													}
												} while (g++ < h);
											} while (q++ < o);
										})(e.R, GetC(e.ZX))
									: (function (j, l) {
											var m = j - 120;
											var o = j + 120;
											var h = Math.min(1, l - 1);
											var g = Math.max(oS.R, l + 1);
											var n;
											var k;
											do {
												k = (n = oZ.getArZ(m, o, h)).length;
												while (k--) {
													n[k].ExplosionDie();
												}
											} while (h++ < g);
										})(e.ZX, e.R),
								e.DisappearDie());
						},
						[c]
					));
			},
			[b]
		);
	},
	getShadow(a) {
		return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px";
	},
	BirthCallBack(d) {
		var c = d.delayT;
		var b = d.id;
		var a = (d.Ele = $(b));
		d.EleShadow = a.firstChild;
		d.EleBody = a.childNodes[1];
		c
			? oSym.addTask(
					c,
					(f, e) => {
						var g = $Z[f];
						g && (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, (g.FreeSetbodyTime = 0), SetBlock(e), g.RandomOpenBox(f));
					},
					[b, a]
				)
			: (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b));
	},
	NormalDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(300, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	DisappearDie() {
		this.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
	},
	CrushDie() {
		var a = this;
		a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
		a.GoingDieHead(a.id, a.PicArr, a);
		ClearChild(a.Ele);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
});
var oCJackinTheBoxZombie = InheritO(oJackinTheBoxZombie, {
	EName: "oCJackinTheBoxZombie",
});
((oBalloonZombie = InheritO(OrnIZombies, {
	EName: "oBalloonZombie",
	CName: "Balloon Zombie",
	OrnHP: 10,
	StandGif: 2,
	AlmanacGif: 2,
	CardGif: 0,
	SunNum: 100,
	width: 207,
	height: 197,
	beAttackedPointL: 30,
	beAttackedPointR: 85,
	OSpeed: 3.2,
	Speed: 3.2,
	Altitude: 3,
	OrnLostNormalGif: 9,
	OrnLostAttackGif: 3,
	getShadow(c) {
		return "left:" + (c.beAttackedPointL - 0) + "px;top:" + (c.height - 22) + "px";
	},
	AudioArr: ["ballooninflate", "balloon_pop"],
	BookHandPosition: "85px 40px",
	PicArr: (function () {
		var a = "images/Zombies/BalloonZombie/";
		return [
			"images/Card/Zombies/Balloonzombie.png",
			a + "0.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "Walk2.gif",
			a + "Attack2.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Boom.gif",
			a + "Walk.gif",
			a + "Drop.gif",
			a + "Boom2.gif",
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Balloon Zombie floats above the fray,<br>immune to most attacks.</font><p>Toughness: <font color="#CC241D">low</font><br>Special: <font color="#CC241D">flying</font><br>Weakness: <font color="#CC241D">cactus and blover</font></p>Balloon Zombie really lucked out. The<br>balloon thing really works and none of<br>the other zombies have picked up on it.',
	GetDX() {
		return -10;
	},
	BirthCallBack(e) {
		var d = e.delayT;
		var c = e.id;
		var a = (e.Ele = $(c));
		var f = oGd.$Balloon;
		var b = e.R;
		e.EleShadow = a.firstChild;
		e.EleBody = a.childNodes[1];
		d
			? oSym.addTask(
					d,
					(i, g) => {
						var j = $Z[i];
						var k = oGd.$Balloon;
						var h = j.R;
						j && ((j.FreeSetbodyTime = 0), SetBlock(g));
						k[h] === undefined ? (k[h] = 1) : ++k[h];
						PlaySound2("ballooninflate");
					},
					[c, a]
				)
			: (SetBlock(a), f[b] === undefined ? (f[b] = 1) : ++f[b], PlaySound2("ballooninflate"));
	},
	ChkActs(f, d, g, c) {
		var b;
		var a;
		var e;
		!(f.FreeFreezeTime || f.FreeSetbodyTime)
			? (a = f.AttackedRX -= b = f.Speed) < -50
				? (g.splice(c, 1), f.DisappearDie(), (e = 0))
				: (a < 100 &&
						!f.PointZombie &&
						((f.PointZombie = 1),
						!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
						f.ChangeR({
							R: d,
							ar: [oS.R - 1],
							CustomTop: 400 - f.height + f.GetDY(),
						})),
					(f.ZX = f.AttackedLX -= b),
					(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
					(e = 1))
			: (e = 1);
		return e;
	},
	Drop() {
		var a = this;
		PlaySound2("balloon_pop");
		a.EleBody.src = "images/Zombies/BalloonZombie/Drop.gif" + $Random + Math.random();
		a.ChkActs = function () {
			return 1;
		};
		a.Altitude = 4;
		--oGd.$Balloon[a.R];
		oSym.addTask(
			120,
			(b) => {
				var c = $Z[b];
				if (c) {
					c.BoomDieGif = 11;
					c.Altitude = 1;
					c.OSpeed = c.Speed = 1.6;
					c.getFreeze = OrnIZombies.prototype.getFreeze;
					c.EleBody.src = "images/Zombies/BalloonZombie/Walk.gif";
					c.ChkActs = OrnIZombies.prototype.ChkActs;
					c.ExplosionDie = function () {
						var d = this;
						d.EleBody.src = d.PicArr[d.BoomDieGif];
						oSym.addTask(200, ClearChild, [d.Ele]);
						d.HP = 0;
						delete $Z[d.id];
						d.PZ && oP.MonPrgs();
					};
					c.DisappearDie = function () {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					};
					c.CrushDie = function () {
						var d = this;
						d.GoingDieHead(d.id, d.PicArr, d);
						ClearChild(d.Ele);
						d.HP = 0;
						delete $Z[d.id];
						d.PZ && oP.MonPrgs();
					};
				}
			},
			[a.id]
		);
	},
	getFreeze(b, a) {
		b.Attack = 50;
		b.Speed = 0.5 * b.OSpeed;
		oSym.addTask(
			1500,
			(d, c) => {
				var e = $Z[d];
				e && e.FreeSlowTime === c && ((e.FreeSlowTime = 0), (e.Attack = 100), (e.Speed = e.OSpeed));
			},
			[a, (b.FreeSlowTime = oSym.Now + 1500)]
		);
	},
	NormalDie() {
		var a = this;
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(200, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
		--oGd.$Balloon[a.R];
	},
	DisappearDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
		--oGd.$Balloon[this.R];
	},
	CrushDie() {
		this.DisappearDie();
	},
})),
	(oIBalloonZombie = InheritO(OrnIZombies, {
		EName: "oIBalloonZombie",
		CName: "Balloon Zombie",
		OrnHP: 20,
		StandGif: 2,
		SunNum: 100,
		width: 207,
		height: 197,
		beAttackedPointL: 30,
		beAttackedPointR: 85,
		OSpeed: 3.2,
		Speed: 3.2,
		Altitude: 3,
		OrnLostNormalGif: 9,
		OrnLostAttackGif: 3,
		BreakBall: false, // 气球是否被戳破
		MulBallNum() {
			// 减去气球数
			if (!this.BreakBall) {
				((this.BreakBall = true), (oGd.$Balloon[this.R] |= 0), --oGd.$Balloon[this.R]);
			}
		},
		getShadow(a) {
			return "left:" + (a.beAttackedPointL - 10) + "px;top:" + (a.height - 32) + "px";
		},
		CanPass(d, c) {
			return c;
		},
		AudioArr: ["ballooninflate", "balloon_pop"],
		BookHandPosition: "80% 80%",
		PicArr: (function () {
			var a = "images/Zombies/BalloonZombie/";
			return [
				"images/Card/Zombies/IBalloonzombie.png",
				a + "1.gif",
				a + "1.gif",
				a + "Attack.gif",
				a + "Walk2.gif",
				a + "Attack2.gif",
				a + "Head.gif" + $Random,
				a + "Die.gif" + $Random,
				a + "Boom.gif",
				a + "Walk.gif",
				a + "Drop.gif",
				a + "Boom2.gif",
			];
		})(),
		Produce:
			'气球僵尸漂浮在空中，躲过大多数攻击。<p>韧性：<font color="#CC241D">低</font><br>特点：<font color="#CC241D">飞行</font><br>弱点：<font color="#CC241D">仙人掌和三叶草</font></p>气球僵尸真幸运。气球有很多功效，而其他僵尸都不曾捡到过。',
		BirthCallBack(e) {
			var d = e.delayT;
			var c = e.id;
			var a = (e.Ele = $(c));
			var f = oGd.$Balloon;
			var b = e.R;
			e.EleShadow = a.firstChild;
			e.EleBody = a.childNodes[1];
			d
				? oSym.addTask(
						d,
						(i, g, c) => {
							var j = $Z[i];
							var k = oGd.$Balloon;
							j && ((j.FreeSetbodyTime = 0), SetBlock(g));
							((k[c] |= 0), ++k[c]); // 增加数量
							PlaySound2("ballooninflate");
						},
						[c, a, b]
					)
				: (SetBlock(a), f[b] === undefined ? (f[b] = 1) : ++f[b], PlaySound2("ballooninflate"));
		},
		ChkActs(f, d, g, c) {
			var b;
			var a;
			var e;
			if (f.Altitude === 3 && f.AttackedRX < GetX(1)) {
				// 气球掉落
				f.Drop();
				return 1;
			}
			!(f.FreeFreezeTime || f.FreeSetbodyTime)
				? (a = f.AttackedRX -= b = f.Speed) < -50
					? (g.splice(c, 1), f.DisappearDie(), (e = 0))
					: (a < 100 &&
							!f.PointZombie &&
							((f.PointZombie = 1),
							!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
							f.ChangeR({
								R: d,
								ar: [oS.R - 1],
								CustomTop: 400 - f.height + f.GetDY(),
							})),
						(f.ZX = f.AttackedLX -= b),
						(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
						(e = 1))
				: (e = 1);
			return e;
		},
		Drop() {
			var a = this;
			PlaySound2("balloon_pop");
			a.EleBody.src = "images/Zombies/BalloonZombie/Drop.gif" + $Random + Math.random();
			a.ChkActs = function () {
				return 1;
			};
			a.Altitude = 4;
			a.MulBallNum();
			oSym.addTask(
				120,
				(b) => {
					var c = $Z[b];
					if (c) {
						c.BoomDieGif = 11;
						c.Altitude = 1;
						c.OSpeed = c.Speed = 1.6;
						c.getFreeze = OrnIZombies.prototype.getFreeze;
						c.EleBody.src = "images/Zombies/BalloonZombie/Walk.gif";
						c.ChkActs = OrnIZombies.prototype.ChkActs;
						c.ExplosionDie = function () {
							var d = this;
							d.EleBody.src = d.PicArr[d.BoomDieGif];
							oSym.addTask(200, ClearChild, [d.Ele]);
							d.HP = 0;
							delete $Z[d.id];
							d.PZ && oP.MonPrgs();
							d.MulBallNum();
						};
						c.DisappearDie = function () {
							ClearChild(this.Ele);
							this.HP = 0;
							delete $Z[this.id];
							this.PZ && oP.MonPrgs();
							this.MulBallNum();
						};
						c.CrushDie = function () {
							var d = this;
							d.GoingDieHead(d.id, d.PicArr, d);
							ClearChild(d.Ele);
							d.HP = 0;
							delete $Z[d.id];
							d.PZ && oP.MonPrgs();
							d.MulBallNum();
						};
					}
				},
				[a.id]
			);
		},
		getFreeze(b, a) {
			b.Attack = 50;
			b.Speed = 0.5 * b.OSpeed;
			oSym.addTask(
				1500,
				(d, c) => {
					var e = $Z[d];
					e && e.FreeSlowTime === c && ((e.FreeSlowTime = 0), (e.Attack = 100), (e.Speed = e.OSpeed));
				},
				[a, (b.FreeSlowTime = oSym.Now + 1500)]
			);
		},
		NormalDie() {
			var a = this;
			a.EleBody.src = a.PicArr[a.DieGif];
			oSym.addTask(250, ClearChild, [a.Ele]);
			a.HP = 0;
			delete $Z[a.id];
			a.PZ && oP.MonPrgs();
			a.MulBallNum();
		},
		ExplosionDie() {
			var a = this;
			a.EleBody.src = a.PicArr[a.BoomDieGif];
			oSym.addTask(200, ClearChild, [a.Ele]);
			a.HP = 0;
			delete $Z[a.id];
			a.PZ && oP.MonPrgs();
			a.MulBallNum();
		},
		DisappearDie() {
			ClearChild(this.Ele);
			this.HP = 0;
			delete $Z[this.id];
			this.PZ && oP.MonPrgs();
			this.MulBallNum();
		},
		CrushDie() {
			this.DisappearDie();
		},
		getDispelled() {
			if (this.Altitude !== 3 || this.AttackedRX < GetX(0)) {
				return;
			}
			this.ChkActs = function () {
				return 1;
			};
			(function (id) {
				var o = $Z[id];
				if (!o) {
					return;
				}
				var d = (o.WalkDirection = 1);
				var { R } = o;
				var C = GetC(o.AttackedLX);
				var sx = 50;
				o.AttackedLX += sx;
				o.ZX += sx;
				o.X += sx;
				if (o.AttackedLX > oS.W) {
					o.DisappearDie();
					return;
				}
				SetStyle($(id), { left: o.X + "px" });
				oSym.addTask(2, arguments.callee, [id]);
			})(this.id);
		},
		getFirePeaSputtering() {
			this.Altitude === 1 && this.getHit0(this, 13);
		},
		prepareBirth: oZomboni.prototype.prepareBirth,
	})));
((oJY = InheritO(oBalloonZombie, {
	EName: "oJY",
	CName: "Fish Thrower Imp",
	OrnHP: 1,
	HP: 1,
	BookHandPosition: "125% 58px",
	PicArr: (function () {
		var a = "images/Zombies/JY/";
		return [
			"images/Card/Zombies/JY.png",
			a + "0.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "Walk2.gif",
			a + "Attack2.gif",
			a + "Head.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Boom.gif",
			a + "Walk.gif",
			a + "Drop.gif",
			a + "Boom2.gif",
			a + "BalloonZombie.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">The Fish Thrower Imp uses a fish-shaped<br>flying device to evade ground attacks.</font><p>Speed: <font color="#CC241D">fast</font><br>Special: <font color="#CC241D">flying</font><br>Weakness: <font color="#CC241D">cactus</font></p>Having once stood on the shoulders of<br>giants, he also wanted to experience the<br>feeling of being a giant. He tied the<br>fish-shaped flying device to his back, but<br>to his surprise, this.. thing actually made<br>him fly.',
	GetDX() {
		return -10;
	},
	BirthCallBack(e) {
		var d = e.delayT;
		var c = e.id;
		var a = (e.Ele = $(c));
		var f = oGd.$Balloon;
		var b = e.R;
		e.EleShadow = a.firstChild;
		e.EleBody = a.childNodes[1];
		d
			? oSym.addTask(
					d,
					(i, g) => {
						var j = $Z[i];
						var k = oGd.$Balloon;
						var h = j.R;
						j && ((j.FreeSetbodyTime = 0), SetBlock(g));
						k[h] === undefined ? (k[h] = 1) : ++k[h];
						PlaySound2("ballooninflate");
					},
					[c, a]
				)
			: (SetBlock(a), f[b] === undefined ? (f[b] = 1) : ++f[b], PlaySound2("ballooninflate"));
	},
	ChkActs(f, d, g, c) {
		var b;
		var a;
		var e;
		!(f.FreeFreezeTime || f.FreeSetbodyTime)
			? (a = f.AttackedRX -= b = f.Speed) < -50
				? (g.splice(c, 1), f.DisappearDie(), (e = 0))
				: (a < 100 &&
						!f.PointZombie &&
						((f.PointZombie = 1),
						!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
						f.ChangeR({
							R: d,
							ar: [oS.R - 1],
							CustomTop: 400 - f.height + f.GetDY(),
						})),
					(f.ZX = f.AttackedLX -= b),
					(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
					(e = 1))
			: (e = 1);
		return e;
	},
	Drop() {
		var a = this;
		PlaySound2("balloon_pop");
		a.EleBody.src = "images/Zombies/JY/Drop.gif" + $Random + Math.random();
		a.ChkActs = function () {
			return 1;
		};
		a.Altitude = 4;
		--oGd.$Balloon[a.R];
		oSym.addTask(
			120,
			(b) => {
				var c = $Z[b];
				if (c) {
					c.BoomDieGif = 11;
					c.Altitude = 1;
					c.OSpeed = c.Speed = 1.6;
					c.getFreeze = OrnIZombies.prototype.getFreeze;
					c.EleBody.src = "images/Zombies/JY/Walk.gif";
					c.ChkActs = OrnIZombies.prototype.ChkActs;
					c.ExplosionDie = function () {
						var d = this;
						d.EleBody.src = d.PicArr[d.BoomDieGif];
						oSym.addTask(200, ClearChild, [d.Ele]);
						d.HP = 0;
						delete $Z[d.id];
						d.PZ && oP.MonPrgs();
					};
					c.DisappearDie = function () {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					};
					c.CrushDie = function () {
						var d = this;
						d.GoingDieHead(d.id, d.PicArr, d);
						ClearChild(d.Ele);
						d.HP = 0;
						delete $Z[d.id];
						d.PZ && oP.MonPrgs();
					};
				}
			},
			[a.id]
		);
	},
	getFreeze(b, a) {
		b.Attack = 50;
		b.Speed = 0.5 * b.OSpeed;
		oSym.addTask(
			1500,
			(d, c) => {
				var e = $Z[d];
				e && e.FreeSlowTime === c && ((e.FreeSlowTime = 0), (e.Attack = 100), (e.Speed = e.OSpeed));
			},
			[a, (b.FreeSlowTime = oSym.Now + 1500)]
		);
	},
	NormalDie() {
		var a = this;
		a.EleBody.src = a.PicArr[a.DieGif];
		oSym.addTask(250, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
	},
	ExplosionDie() {
		var a = this;
		a.EleBody.src = a.PicArr[a.BoomDieGif];
		oSym.addTask(200, ClearChild, [a.Ele]);
		a.HP = 0;
		delete $Z[a.id];
		a.PZ && oP.MonPrgs();
		--oGd.$Balloon[a.R];
	},
	DisappearDie() {
		ClearChild(this.Ele);
		this.HP = 0;
		delete $Z[this.id];
		this.PZ && oP.MonPrgs();
		--oGd.$Balloon[this.R];
	},
	CrushDie() {
		this.DisappearDie();
	},
})),
	(oCZombie = InheritO(OrnNoneZombies, {
		EName: "oCZombie",
		CName: "Commoner Zombie",
		StandGif: 9,
		BookHandPosition: "35% 80%",
		PicArr: (function () {
			var a = "images/Zombies/wall/Zombie/";
			return [
				"images/Card/Zombies/CZombie.png",
				a + "0.gif",
				a + "Zombie.gif",
				a + "ZombieAttack.gif",
				a + "ZombieLostHead.gif",
				a + "ZombieLostHeadAttack.gif",
				a + "ZombieHead.gif" + $Random,
				a + "ZombieDie.gif" + $Random,
				"images/Zombies/BoomDie.gif" + $Random,
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">Your ordinary brain eater.</font><p>Toughness: <font color="#CC241D">low</font></p>Does his common-or-garden appearance<br>remind you of Zombie? Yes, he is Zombie\'s<br>distant relative on the journey to the west. Their family are all loyal<br>brain-lovers.',
	})),
	(oCZombie2 = InheritO(
		oCZombie,
		{ EName: "oCZombie2" },
		{
			PicArr: {
				2: "images/Zombies/wall/Zombie/Zombie.gif",
				9: "images/Zombies/wall/Zombie/1.gif",
			},
		}
	)),
	(oCZombie3 = InheritO(
		oCZombie,
		{ EName: "oCZombie3" },
		{
			PicArr: {
				2: "images/Zombies/wall/Zombie/Zombie.gif",
				9: "images/Zombies/wall/Zombie/1.gif",
			},
		}
	)));
oCConeheadZombie = InheritO(OrnIZombies, {
	EName: "oCConeheadZombie",
	CName: "Baskethead Zombie",
	OrnHP: 370,
	Lvl: 2,
	SunNum: 75,
	StandGif: 11,
	AlmanacGif: 11,
	BookHandPosition: "35% 80%",
	PicArr: (function () {
		var b = "images/Zombies/wall/ConeheadZombie/";
		var a = "images/Zombies/wall/Zombie/";
		return [
			"images/Card/Zombies/CConeheadZombie.png",
			b + "0.gif",
			b + "ConeheadZombie.gif",
			b + "ConeheadZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			b + "1.gif",
		];
	})(),
	AudioArr: ["plastichit"],
	PlayNormalballAudio() {
		PlaySound2("plastichit");
	},
	Produce:
		'<font color="#28325A">His bamboo basket helmet allows him to<br>take more damage from plants.</font><p>Toughness: <font color="#CC241D">medium</font></p>Baskethead Zombie is a good father who<br>lives a thrifty lifestyle, his favorite<br>activity is chasing behind others asking<br>where brains are on sale.',
});
oCBucketheadZombie = InheritO(
	oCConeheadZombie,
	{
		EName: "oCBucketheadZombie",
		CName: "Beggar Zombie",
		OrnHP: 1100,
		Lvl: 3,
		SunNum: 125,

		PlayNormalballAudio() {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		},
		Produce:
			'<font color="#28325A">His fine china can efficiently block projectiles.</font><p>Toughness: <font color="#CC241D">high</font></p>Zombies don\'t want to send him to the<br>battlefield, they are afraid of hearing<br>"One shattered, and another one..."',
	},
	{
		PicArr: {
			0: "images/Card/Zombies/CBucketheadZombie.png",
			1: "images/Zombies/wall/BucketheadZombie/0.gif",
			2: "images/Zombies/wall/BucketheadZombie/BucketheadZombie.gif",
			3: "images/Zombies/wall/BucketheadZombie/BucketheadZombieAttack.gif",
			9: "images/Zombies/wall/Zombie/Zombie.gif",
			11: "images/Zombies/wall/BucketheadZombie/1.gif",
		},
	}
);
((othugZombie = InheritO(OrnNoneZombies, {
	EName: "othugZombie",
	CName: "Assassin Zombie",
	HP: 550,
	width: 348,
	height: 218,
	AlmanacGif: 13,
	OSpeed: 1.5,
	Speed: 1.5,
	beAttackedPointL: 215,
	beAttackedPointR: 260,
	StandGif: 13,

	GetDX() {
		return -238;
	},
	GetDY() {
		return 2;
	},
	Lvl: 2,
	SunNum: 75,
	BookHandPosition: "-85px -25px",
	PicArr: (function () {
		var a = "images/Zombies/wall/thugZombie/";
		return [
			"images/Card/Zombies/thugZombie.png",
			a + "0.gif",
			a + "PoleVaultingZombie.gif",
			a + "PoleVaultingZombieAttack.gif",
			a + "PoleVaultingZombieLostHead.gif",
			a + "PoleVaultingZombieLostHeadAttack.gif",
			a + "PoleVaultingZombieHead.gif" + $Random,
			a + "PoleVaultingZombieDie.gif" + $Random,
			"images/Zombies/PoleVaultingZombie/BoomDie.gif" + $Random,
			a + "PoleVaultingZombieWalk.gif",
			a + "PoleVaultingZombieLostHeadWalk.gif",
			a + "PoleVaultingZombieJump.gif",
			a + "PoleVaultingZombieJump2.gif",
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Assassin Zombie can squeeze in between<br>your plants unexpectedly.</font><p>Toughness: <font color="#CC241D">high</font></p>Assassins underwent brutal training in<br>their lifetime; after death, although<br>they have forgotten their mission of<br>assassination, they still remember the<br>light-footed techniques they trained<br>repeatedly, and of course, they haven\'t<br>forgotten the delicious brains.',
	getShadow(a) {
		return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
	},
	GoingDieHead(c, a, b) {
		oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ)]);
	},
	JudgeAttack() {
		var g = this;
		var b = g.ZX;
		var d = g.R + "_";
		var c = GetC(b);
		var h = oGd.$;
		var f;
		var a;
		var e = b - 74;
		for (f = c - 2; f <= c; f++) {
			if (f > 9) {
				continue;
			}
			for (
				a = 2;
				a > -1;
				(p = h[d + f + "_" + a--]) &&
				(p.EName !== "oBrains"
					? p.AttackedRX >= e &&
						p.AttackedLX < b &&
						p.canEat &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), g.NormalAttack(g.id, p.id, p.AttackedLX))
					: p.AttackedRX >= b &&
						p.AttackedLX < b &&
						((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), (g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))
			) {}
		}
	},
	getCrushed(a) {
		this.NormalAttack(this.id, a.id, a.AttackedLX);
		this.getCrushed = function () {
			return false;
		};
		a.Stature > 0 &&
			oSym.addTask(
				50,
				(c) => {
					var b = $Z[c];
					b && b.CrushDie();
				},
				[this.id]
			);
		return false;
	},
	getRaven(a) {
		return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
	},
	NormalAttack(d, b, g) {
		var f = $Z[d];
		var a = f.Ele;
		var c = f.EleShadow;
		var e = f.EleBody;
		e.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
		SetHidden(c);
		f.isAttacking = 2;
		f.Altitude = 2;
		f.getFreeze = function () {
			f.getSnowPea(f, 20);
		};
		oSym.addTask(
			50,
			(h) => {
				$Z[h] && PlaySound2("polevault");
			},
			[d]
		);
		oSym.addTask(
			100,
			(m, j, i, l, n) => {
				var h = $Z[m];
				var k;
				var q;
				var r;
				h &&
					((k = $P[j]) && k.Stature > 0
						? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieWalk.gif"),
							SetVisible(l),
							(h.isAttacking = 0),
							(h.Altitude = 1),
							(h.OSpeed = h.Speed = 1.6),
							(h.NormalGif = 9),
							(h.LostHeadGif = 10),
							(h.NormalAttack = (r = CZombies.prototype).NormalAttack),
							(h.getCrushed = r.getCrushed),
							(h.getFreeze = r.getFreeze),
							(h.getRaven = r.getRaven))
						: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL),
							SetStyle(i, { left: h.X + "px" }),
							(n.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random()),
							SetVisible(l),
							oSym.addTask(
								80,
								(s, v) => {
									var u = $Z[s];
									var t;
									u &&
										((v.src = "images/Zombies/wall/thugZombie/PoleVaultingZombieWalk.gif"),
										(u.isAttacking = 0),
										(u.Altitude = 1),
										(u.OSpeed = u.Speed = 1.2),
										(u.NormalGif = 9),
										(u.LostHeadGif = 10),
										(u.NormalAttack = (t = CZombies.prototype).NormalAttack),
										(u.getCrushed = t.getCrushed),
										(u.getFreeze = t.getFreeze),
										(u.getRaven = t.getRaven));
								},
								[m, n]
							)));
			},
			[d, b, a, c, e]
		);
	},
})),
	(oEunZombie = InheritO(OrnIIZombies, {
		EName: "oEunZombie",
		CName: "Talisman Zombie",
		OrnHP: 500,
		HP: 270,
		Lvl: 2,
		LostPaperGif: 13,
		StandGif: 14,
		width: 216,
		height: 164,
		beAttackedPointL: 60,
		beAttackedPointR: 130,
		Speed: 1.5,
		LostPaperSpeed: 1.5,
		BookHandPosition: "50% 80%",
		PicArr: (function () {
			var a = "images/Zombies/wall/EunZombie/";
			return [
				"images/Card/Zombies/EunZombie.png",
				a + "0.gif",
				a + "HeadWalk1.gif",
				a + "HeadAttack1.gif",
				a + "LostHeadWalk1.gif",
				a + "LostHeadAttack1.gif",
				a + "HeadWalk0.gif",
				a + "HeadAttack0.gif",
				a + "LostHeadWalk0.gif",
				a + "LostHeadAttack0.gif",
				a + "Head.gif" + $Random,
				a + "Die.gif" + $Random,
				"images/Zombies/NewspaperZombie/BoomDie.gif" + $Random,
				a + "LostNewspaper.gif",
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">Unlike other zombies, this ones a little<br>different.</font><p>Toughness: <font color="#CC241D">high</font><br>Special: <font color="#CC241D">becomes enranged (after losing<br>talisman)</font></p>This spirit-talisman zombie held the<br>rank of First Class during his lifetime.<br>So even though he can no longer walk<br>properly, he constantly reminds himself:<br>wear your robe properly, keep your<br>official cap on...',
		getShadow(a) {
			return "left:75px;top:" + (a.height - 25) + "px";
		},
		GoingDie(b) {
			var a = this;
			var c = a.id;
			a.EleBody.src = b;
			oSym.addTask(200, ClearChild, [
				NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ),
			]);
			a.beAttacked = 0;
			a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
			a.AutoReduceHP(c);
		},
		getHurtOrnLost(j, a, g, m, c, l, k, i) {
			var e = this;
			if (!e.beAttacked) {
				k && e.DisappearDie();
				return;
			}
			var b = e.id;
			var h = e.HP;
			var d = e.PicArr;
			var f = e.isAttacking;
			switch (true) {
				case (h -= g) < 1:
					e.HP = 0;
					e.NormalDie();
					return;
				case h < 91:
					e.HP = h;
					e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
					return;
			}
			e.HP = h;
			switch (m) {
				case -1:
					e.getSlow(e, b, 1e3);
					break;
				case 1:
					e.getFireball(e, b, a);
					break;
				default:
					!i && j === -1 && e.PlayNormalballAudio();
			}
			SetAlpha(e.EleBody, 50, 0.5);
			oSym.addTask(
				10,
				(q) => {
					var n = $Z[q];
					n && SetAlpha(n.EleBody, 100, 1);
				},
				[b]
			);
		},
		getSnowPea(c, a, b) {
			PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
			c.getHit0(c, a, b);
		},
		getFirePea(f, b, e) {
			f.PlayFireballAudio();
			(f.FreeSlowTime || f.FreeFreezeTime) && ((f.Speed = f.OSpeed), (f.FreeSlowTime = 0), (f.FreeFreezeTime = 0));
			f.Attack = 110;
			var d = f.AttackedLX;
			var g = f.AttackedRX;
			var a = oZ.getArZ(d, d + 40, f.R);
			var c = a.length;
			var h;
			while (c--) {
				(h = a[c]) !== this && h.getFirePeaSputtering();
			}
			(f.HP -= b) < f.BreakPoint
				? ((f.getFirePea = OrnNoneZombies.prototype.getFirePea),
					f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]),
					(f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}))
				: (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0),
					f.SetAlpha(f, f.EleBody, 50, 0.5),
					oSym.addTask(
						10,
						(j, i) => {
							(i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
						},
						[f.id]
					));
		},
		getHit0(c, a, b) {
			b === c.WalkDirection
				? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
					c.SetAlpha(c, c.EleBody, 50, 0.5),
					oSym.addTask(
						10,
						(e, d) => {
							(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
						},
						[c.id]
					))
				: (c.HP -= a) < c.BreakPoint &&
					(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
					(c.getFirePea = OrnNoneZombies.prototype.getFirePea),
					(c.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
					(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
		},
		getHit1(b, a) {
			(b.HP -= a) < b.BreakPoint
				? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
					(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
					(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
					(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
				: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
					b.SetAlpha(b, b.EleBody, 50, 0.5),
					oSym.addTask(
						10,
						(d, c) => {
							(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
						},
						[b.id]
					));
		},
		getHit2(b, a) {
			(b.HP -= a) < b.BreakPoint
				? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
					(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
					(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
					(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
				: (b.SetAlpha(b, b.EleBody, 50, 0.5),
					oSym.addTask(
						10,
						(d, c) => {
							(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
						},
						[b.id]
					));
		},
		getHit3(b, a) {
			(b.HP -= a) < b.BreakPoint
				? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
					(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
					(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
					(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
				: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
					b.SetAlpha(b, b.EleBody, 50, 0.5),
					oSym.addTask(
						10,
						(d, c) => {
							(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
						},
						[b.id]
					));
		},
		CheckOrnHP(g, h, d, c, f, b, a) {
			var e = OrnNoneZombies.prototype;
			(g.OrnHP = d -= c) < 1 &&
				(a && (g.HP += d),
				(g.ChkActs = function () {
					return 1;
				}),
				(g.ChkActs1 = function () {
					return 1;
				}),
				(g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random()),
				(g.Ornaments = 0),
				(g.LostHeadGif = 8),
				(g.LostHeadAttackGif = 9),
				(g.getFirePea = e.getFirePea),
				(g.getSnowPea = e.getSnowPea),
				(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit),
				oSym.addTask(
					150,
					(m, l) => {
						var k = $Z[m];
						if (!k) {
							return;
						}
						var j = CZombies.prototype;
						var i = (k.OSpeed = k.LostPaperSpeed);
						k.ChkActs = j.ChkActs;
						k.ChkActs1 = j.ChkActs1;
						k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);
						if (!k.beAttacked) {
							return;
						}
						PlaySound2("newspaper_rarrgh2");
						k.EleBody.src = l;
						k.JudgeAttack();
					},
					[h, f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]]
				));
		},
	})));
((oZZ = InheritO(OrnNoneZombies, {
	EName: "oZZ",
	CName: "Wraith Zombie",
	Lvl: 4,
	HP: 500,
	StandGif: 9,
	OSpeed: 1.5,
	Speed: 1.5,
	width: 216,
	height: 164,
	beAttackedPointL: 60,
	beAttackedPointR: 130,
	getShadow(a) {
		return "display:none";
	},
	BookHandPosition: "35% 15px",
	PicArr: (function () {
		var a = "images/Zombies/wall/ZZ/";
		return [
			"images/Card/Zombies/ZZ.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "ZombieDie.gif" + $Random,
			"images/Zombies/NewspaperZombie/BoomDie.gif" + $Random,
			a + "1.gif",
		];
	})(),
	Produce:
		'<font color="#28325A">Wraith Zombie always reads your texts<br>but never replies, how rude.</font><p>Toughness: <font color="#CC241D">medium</font><br>Special: <font color="#CC241D">projectiles may pass through</font></p>Some ghosts managed to break free,<br>but couldn\'t go to heaven, and can<br>only play tricks in the human world.<br>Since zombies appeared, the wraith has<br>also become excited, as if she found her<br>own kind. However, she is still afraid<br>of light.',
})),
	(oEmperor = InheritO(oCZombie, {
		EName: "oEmperor",
		CName: "Emperor Zombot",
		HP: 15e3,
		width: 464,
		height: 364,
		beAttackedPointL: 140,
		beAttackedPointR: 290,
		OSpeed: 1,
		Speed: 1,
		Attack: 3600,
		BookHandPosition: "25% 45%",
		PlayNormalballAudio() {
			PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
		},
		PicArr: (function () {
			var a = "images/Zombies/wall/Emperor/";
			return [
				"images/Card/Zombies/Emperor.png",
				a + "0.gif",
				a + "Zombie.gif",
				a + "ZombieAttack.gif",
				a + "ZombieLostHead.gif",
				a + "ZombieLostHeadAttack.gif",
				"images/Zombies/Imp/ZombieHead.gif" + $Random,
				a + "ZombieDie.gif" + $Random,
				"images/Zombies/BoomDie.gif" + $Random,
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">Isn\'t the emperor\'s zombie form<br>magnificent?</font><p>Toughness: <font color="#CC241D">very high</font><br>Speed: <font color="#CC241D">slow</font></p>The emperor dreamed of immortality!<br>After becoming a zombie and eating<br>three plates of brains a day, he somehow<br>actually achieved immortaility! He<br>patiently sits on top of the endless<br>Great wall hunting for brains...',
	})),
	(oWJY = InheritO(oEunZombie, {
		EName: "oWJY",
		CName: "Author Zombie",
		HP: 17e3,
		OrnHP: 1e4,
		lvl: 8,
		OSpeed: 0.3,
		Speed: 0.3,
		Attack: 550,
		LostPaperSpeed: 1.5,
		AlmanacGif: 14,
		PicArr: (function () {
			var a = "images/Zombies/WJY/";
			return [
				"images/Card/Zombies/WJY.png",
				a + "0.gif",
				a + "HeadWalk1.gif",
				a + "HeadAttack1.gif",
				a + "LostHeadWalk1.gif",
				a + "LostHeadAttack1.gif",
				a + "HeadWalk0.gif",
				a + "HeadAttack0.gif",
				a + "LostHeadWalk0.gif",
				a + "LostHeadAttack0.gif",
				a + "Head.gif" + $Random,
				a + "Die.gif" + $Random,
				"images/Zombies/BoomDie.gif" + $Random,
				a + "LostNewspaper.gif",
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">The new generation of Dr. Zombie King<br>makes his entrance.</font><p>Toughness: <font color="#CC241D">immortal</font></p>"Hey! How did you end up in the game?"<br>	Well, it\'s all thanks to a guy named Yan Qilun.',
	})));
((oWJY1 = InheritO(oDuckyTubeZombie1, {
	EName: "oWJY1",
	CName: "Author Zombie-Water",
	OSpeed: 0.1,
	Speed: 0.1,
	HP: 2e4,
	width: 216,
	height: 164,
	beAttackedPointL: 60,
	beAttackedPointR: 130,
	getShadow(a) {
		return "display:none";
	},
	PicArr: (function () {
		var a = "images/Zombies/WJY/water/";
		return [
			"images/Card/Zombies/DuckyTubeZombie1.png",
			a + "0.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "1.gif",
			a + "Attack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "Die.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
})),
	(oXBZombie = InheritO(OrnNoneZombies, {
		EName: "oXBZombie",
		CName: "Lobsterhead Jogger Zombie",
		Lvl: 4,
		StandGif: 9,
		OSpeed: 3.2,
		Speed: 3.2,
		BookHandPosition: "57% 91%",
		PicArr: (function () {
			var a = "images/Zombies/XB/";
			return [
				"images/Card/Zombies/XB.png",
				a + "0.gif",
				a + "Zombie.gif",
				a + "ZombieAttack.gif",
				a + "ZombieLostHead.gif",
				a + "ZombieLostHeadAttack.gif",
				a + "ZombieHead.gif" + $Random,
				a + "ZombieDie.gif" + $Random,
				"images/Zombies/BoomDie.gif" + $Random,
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">Its streamlined shrimp head gives it a<br>speed twice as fast as other zombies.</font><p>Toughness: <font color="#CC241D">low</font></p>Having floated at the bottom of the sea<br>for a long time, he developed the illusion<br>that he could fly. He firmly believes that<br>wearing a lobster on his head will allow him<br>to fly farther and higher.',
	})),
	(oCXZombie = InheritO(oZombie, {
		EName: "oCXZombie",
		CName: "Tortoise Zombie",
		Lvl: 4,
		HP: 1300,
		OSpeed: 0.5,
		Speed: 0.5,
		width: 216,
		height: 164,
		beAttackedPointL: 60,
		beAttackedPointR: 130,
		BookHandPosition: "85% 77%",
		PicArr: (function () {
			var a = "images/Zombies/CX/";
			return [
				"images/Card/Zombies/CX.png",
				a + "0.gif",
				a + "Zombie.gif",
				a + "ZombieAttack.gif",
				a + "ZombieLostHead.gif",
				a + "ZombieLostHeadAttack.gif",
				a + "ZombieHead.gif" + $Random,
				a + "ZombieDie.gif" + $Random,
				"images/Zombies/NewspaperZombie/BoomDie.gif" + $Random,
				a + "1.gif",
			];
		})(),
		Produce:
			'<font color="#28325A">Tortoise Zombie\'s hard shell reduces most damage.</font><p>Toughness: <font color="#CC241D">very high</font><br>Weakness: <font color="#CC241D">sea starfruit</font></font></p>In order to get into the shell that<br>doesn\'t suit him at all, he abandoned his<br>dignity as a zombie and learnt how to<br>crawl like a tortoise. After 100 tries, he<br>finally squeezed himself into the shell and<br>could never get out.',
	})),
	(oICXZombie = InheritO(oZombie, {
		EName: "oICXZombie",
		CName: "Tortoise Zombie",
		Lvl: 4,
		SunNum: 300,
		HP: 1300,
		OSpeed: 0.64,
		Speed: 0.64,
		width: 216,
		height: 164,
		beAttackedPointL: 60,
		beAttackedPointR: 130,
		PicArr: (function () {
			var a = "images/Zombies/CX/";
			return [
				"images/Card/Zombies/ICX.png",
				a + "0.gif",
				a + "Zombie.gif",
				a + "ZombieAttack.gif",
				a + "ZombieLostHead.gif",
				a + "ZombieLostHeadAttack.gif",
				a + "ZombieHead.gif" + $Random,
				a + "ZombieDie.gif" + $Random,
				"images/Zombies/NewspaperZombie/BoomDie.gif" + $Random,
				a + "1.gif",
			];
		})(),
		Produce:
			'他坚硬的龟壳能减小大部分伤害。<p>韧性：<font color="#CC241D">很高</font><br>弱点：<font color="#CC241D">海星果</font></p>为了爬进与自己身形不符的龟壳，他不惜舍弃作为僵尸的尊严，最终在第一百次尝试之后成功把自己挤进了龟壳，再也出不来啦。',
	})),
	(oLGBOSS = (function () {
		var a = function (d, b) {
			var c = d.HP;
			switch (true) {
				case (d.HP = c -= b) < 1e3:
					d.GoingDie();
					d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};
					return;
				case c < 3e3:
					d.EleBody.src = "images/Zombies/LGBOSS/3.gif";
					break;
				case c < 5e3:
					d.EleBody.src = "images/Zombies/LGBOSS/2.gif";
			}
			d.SetAlpha(d, d.EleBody, 50, 0.5);
			oSym.addTask(
				10,
				(f, e) => {
					(e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
				},
				[d.id]
			);
		};
		return InheritO(oZomboni, {
			EName: "oLGBOSS",
			CName: "Dragon King Zombie",
			HP: 6e3,
			width: 464,
			height: 377,
			beAttackedPointL: 140,
			beAttackedPointR: 300,
			BookHandPosition: "0% 39%",
			Produce:
				'<font color="#28325A">Dr. Zomboss\'s latest enormous<br>creation: the dragon king mech!</font><p>Toughness: <font color="#CC241D">extremely high</font></p>Dr. Zomboss’s ambitions are not only<br>limited to land; he also strives to create<br>massive underwater machinery.<br>Hence, the latest aquatic robot, the<br>dragon king mech, was born. He used his<br>brain too much when creating this robot,<br>and now he plans to have a restock.',
			PicArr: (function () {
				var b = "images/Zombies/LGBOSS/";
				return [
					"images/Card/Zombies/LGBOSS.png",
					b + "0.gif",
					b + "1.gif",
					b + "2.gif",
					b + "3.gif",
					b + "5.gif" + $Random,
					b + "BoomDie.gif" + $Random,
					b + "ice.png",
					b + "ice_cap.png",
				];
			})(),
			AudioArr: ["zamboni", "explosion"],
			BirthCallBack(h) {
				var g = h.delayT;
				var e = h.id;
				var c = (h.Ele = $(e));
				var d = h.R;
				var f;
				var b = oGd.$Ice;
				h.EleShadow = c.firstChild;
				h.EleBody = c.childNodes[1];
				!b[d]
					? ((f = NewEle(
							"dIceCar" + d,
							"div",
							"position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:205px",
							0,
							EDPZ
						)),
						NewImg(
							"",
							"images/interface/blank.png",
							"position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:205px;left:0px;background:url(images/Zombies/LGBOSS/ice.png) repeat-x",
							f
						),
						NewImg("", "images/Zombies/LGBOSS/ice_cap.png", "position:absolute;display:none;left:0", f),
						(b[d] = [1, 11, h.AttackedLX]))
					: ++b[d][0];
				g
					? oSym.addTask(
							g,
							(j, i) => {
								var k = $Z[j];
								k && ((k.FreeSetbodyTime = 0), SetBlock(i), PlaySound2("zamboni"));
							},
							[e, c]
						)
					: (SetBlock(c), PlaySound2("zamboni"));
			},
			ChkActs(e, j, q, k) {
				var b;
				var r;
				var m;
				var g;
				var n = oGd.$Ice[j];
				var d;
				var h;
				var f;
				var c;
				var l = $("dIceCar" + j);
				e.JudgeAttack();
				(r = e.AttackedRX -= b = e.Speed) < -50
					? (q.splice(k, 1), e.DisappearDie(), (m = 0))
					: (r < 100 &&
							!e.PointZombie &&
							((e.PointZombie = 1),
							!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
							e.ChangeR({
								R: j,
								ar: [oS.R - 1],
								CustomTop: 400 - e.height + e.GetDY(),
							})),
						(e.ZX = e.AttackedLX -= b),
						(e.Ele.style.left = Math.floor((e.X -= b)) + "px"),
						(m = 1));
				d = e.X;
				h = d + 250;
				f = d + 100;
				c = GetC(h);
				c > -1 && c < n[1] && ((oGd.$Crater[j + "_" + c] = 1), (n[1] = c));
				h > 120 &&
					h < n[2] &&
					((n[2] = h), (l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)"), (l.childNodes[1].style.left = Math.max(0, f) + "px"));
				GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= 0.005);
				return m;
			},
			ChkActs1(f, d, g, c) {
				var b;
				var e;
				f.JudgeAttack();
				(f.AttackedLX += b = f.Speed) > oS.W
					? (g.splice(c, 1), f.DisappearDie(), (e = 0))
					: ((f.ZX = f.AttackedRX += b), (f.Ele.style.left = Math.ceil((f.X += b)) + "px"), (e = 1));
				return e;
			},
			getPea(c, b) {
				PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
				c.getHit0(c, b);
			},
			getFirePea(c, b) {
				PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
				c.getHit0(c, b);
			},
			getSnowPea(c, b) {
				PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
				c.getHit0(c, b);
			},
			getFirePeaSputtering() {},
			getFreeze(c, b) {
				c.getHit0(c, 20);
			},
			getShadow(b) {
				return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px";
			},
			getHit: a,
			getHit0: a,
			getHit1: a,
			getHit2: a,
			getHit3: a,
			GoingDie() {
				var b = this;
				b.beAttacked = 0;
				b.AutoReduceHP(b.id);
			},
			NormalDie() {
				var b = this;
				PlaySound2("explosion");
				b.EleBody.src = b.PicArr[b.DieGif];
				oSym.addTask(70, ClearChild, [b.Ele]);
				b.HP = 0;
				delete $Z[b.id];
				b.JudgeIce();
				b.PZ && oP.MonPrgs();
			},
			DisappearDie() {
				var b = this;
				ClearChild(b.Ele);
				b.HP = 0;
				delete $Z[b.id];
				b.JudgeIce();
				b.PZ && oP.MonPrgs();
			},
			ExplosionDie() {
				var b = this;
				b.EleBody.src = b.PicArr[b.BoomDieGif];
				oSym.addTask(300, ClearChild, [b.Ele]);
				b.HP = 0;
				delete $Z[b.id];
				b.JudgeIce();
				b.PZ && oP.MonPrgs();
			},
			CrushDie() {
				this.NormalDie();
			},
			JudgeIce() {
				var d = this;
				var b = d.R;
				var e = $("dIceCar" + b);
				var c = oGd.$Ice[b];
				e && e.childNodes[1] && SetBlock(e.childNodes[1]);
				--c[0] <= 0 &&
					oSym.addTask(
						3e3,
						(k, h) => {
							var j = oGd.$Ice[h];
							var g;
							var f = oGd.$Crater;
							if (j && j[0] <= 0 && k) {
								ClearChild(k);
								g = j[1];
								while (g < 11) {
									delete f[h + "_" + g++];
									delete oGd.$Ice[h];
								}
							}
						},
						[e, b]
					);
			},
			flatTire() {
				var b = this;
				b.EleBody.src = "images/Zombies/LGBOSS/5.gif";
				b.beAttacked = 0;
				b.HP = 0;
				b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};
				b.ChkActs = b.ChkActs1 = function () {};
				oSym.addTask(
					290,
					(e, c) => {
						var d = $Z[e];
						d && d.NormalDie();
					},
					[b.id, b.EleBody]
				);
			},
			JudgeAttack() {
				var f = this;
				var c = f.ZX;
				var d = f.R + "_";
				var e = GetC(c);
				var g = oGd.$;
				var b;
				(b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
			},
			JudgeLR(e, c, d, b, f) {
				return d > 10 || d < 1
					? false
					: (function () {
							c += --d + "_";
							var g = 3;
							var h;
							while (g--) {
								if ((h = f[c + g])) {
									return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
								}
							}
						})();
			},
			JudgeSR(e, c, d, b, f) {
				return d > 9
					? false
					: (function () {
							c += d + "_";
							var g = 3;
							var h;
							while (g--) {
								if ((h = f[c + g])) {
									return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
								}
							}
						})();
			},
			NormalAttack(c, b) {
				var d = $Z[c];
				$P[b].getHurt(d, 2, d.Attack);
			},
			getThump() {
				this.NormalDie();
				var CZombies = (function (b, a) {
					return (
						((a = function () {}).prototype = {
							name: "Zombies",
							HP: 270,
							Lvl: 1,
							NormalGif: 2,
							CardGif: 0,
							StaticGif: 1,
							StandGif: 2,
							BookHandBack: "Day",
							AudioArr: [],
							CanSelect: 1,
							CanDisplay: 1,
							BookHandPosition: "50% 70%",
							AttackGif: 3,
							LostHeadGif: 4,
							LostHeadAttackGif: 5,
							HeadGif: 6,
							DieGif: 7,
							BoomDieGif: 8,
							width: 166,
							height: 144,
							beAttackedPointL: 82,
							beAttackedPointR: 156,
							BreakPoint: 90,
							SunNum: 50,
							coolTime: 0,
							Ornaments: 0,
							OrnHP: 0,
							OSpeed: 1.6,
							Speed: 1.6,
							CSS_fliph: "",
							CSS_alpha: "",
							AKind: 0,
							beAttacked: 1,
							isAttacking: 0,
							Attack: 100,
							WalkDirection: 0,
							LivingArea: 1,
							Altitude: 1,
							FreeSetbodyTime: 0,
							FreeFreezeTime: 0,
							FreeSlowTime: 0,
							CanPass(d, c) {
								return c && c !== 2;
							},
							CanGrow(d, c, e) {
								return this.CanPass(c, oGd.$LF[c]) && (oS.ArP ? e > oS.ArP.ArC[1] : true);
							},
							ChkActs(h, f, j, e) {
								var d;
								var c;
								var g;
								!(h.FreeFreezeTime || h.FreeSetbodyTime)
									? (h.beAttacked && !h.isAttacking && h.JudgeAttack(),
										!h.isAttacking
											? (c = h.AttackedRX -= d = h.Speed) < -50
												? (j.splice(e, 1), h.DisappearDie(), (g = 0))
												: (c < 100 &&
														!h.PointZombie &&
														((h.PointZombie = 1),
														!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
														h.ChangeR({
															R: f,
															ar: [oS.R - 1],
															CustomTop: 400 - h.height + h.GetDY(),
														})),
													(h.ZX = h.AttackedLX -= d),
													(h.Ele.style.left = Math.floor((h.X -= d)) + "px"),
													(g = 1))
											: (g = 1))
									: (g = 1);
								return g;
							},
							ChkActs1(g, e, h, d) {
								var c;
								var f;
								!(g.FreeFreezeTime || g.FreeSetbodyTime)
									? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
										!g.isAttacking
											? (g.AttackedLX += c = g.Speed) > oS.W
												? (h.splice(d, 1), g.DisappearDie(), (f = 0))
												: ((g.ZX = g.AttackedRX += c), (g.Ele.style.left = Math.ceil((g.X += c)) + "px"), (f = 1))
											: (f = 1))
									: (f = 1);
								return f;
							},
							GetDX() {
								return -110;
							},
							GetDY() {
								return -10;
							},
							GetDTop: 0,
							ChangeR(e) {
								var h = e.R;
								var g = e.ar || [];
								var j = e.CustomTop;
								var d = this;
								var q = h - 1;
								var l;
								var k = d.id;
								var m = -1;
								var f = d.Ele;
								var n = d.EleBody;
								var i = oGd.$LF;
								var c;
								!g.length && (d.CanPass(q, i[q]) && (g[++m] = q), d.CanPass((q += 2), i[q]) && (g[++m] = q));
								g.length
									? ((l = !d.WalkDirection ? -5 : 5),
										(d.ZX += l),
										(d.AttackedLX += l),
										(d.AttackedRX += l),
										(d.X += l),
										(q = g[Math.floor(Math.random() * g.length)]),
										SetStyle(f, {
											left: d.X + "px",
											top: (d.pixelTop = j === undefined ? GetY(q) - d.height + d.GetDY() : j) + "px",
											zIndex: (d.zIndex = 3 * q + 1),
										}),
										d.isAttacking && (n.src = d.PicArr[d.NormalGif]),
										oZ.moveTo(k, h, q))
									: (n.src = d.PicArr[d.NormalGif]);
								d.isAttacking = 0;
							},
							getShadow(c) {
								return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px";
							},
							Init(g, i, e, d) {
								var c = 0;
								var h = this;
								var f = [];
								i.AttackedRX = (i.X = (i.ZX = i.AttackedLX = g) - i.beAttackedPointL) + i.beAttackedPointR;
								while (--d) {
									i.CanPass(d, e[d]) && (f[c++] = d);
								}
								i.ArR = f;
								i.ArHTML = [
									'<div id="',
									'" style="position:absolute;display:',
									";left:",
									"px;top:",
									"px;z-index:",
									'"><img src="' + ShadowPNG + '" style="' + i.getShadow(i) + '"><img style="position:absolute;clip:rect(0,auto,',
									",0);top:",
									'px" src="',
									'"></div>',
								];
							},
							getHTML(d, g, i, h, f, k, j, c) {
								var e = this.ArHTML;
								return e[0] + d + e[1] + f + e[2] + g + e[3] + i + e[4] + h + e[5] + k + e[6] + j + e[7] + c + e[8];
							},
							prepareBirth(f) {
								var h = this;
								var e = h.ArR;
								var d = e[Math.floor(Math.random() * e.length)];
								var g = GetY(d) + h.GetDY();
								var c = g - h.height;
								var j = 3 * d + 1;
								var i = (h.id = "Z_" + Math.random());
								h.R = d;
								h.pixelTop = c;
								h.zIndex = j;
								(h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
								return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif]);
							},
							CustomBirth(i, c, d, m) {
								var g = this;
								var f = GetY(i) + g.GetDY();
								var h = f - g.height;
								var k = 3 * i + 1;
								var e = (g.id = "Z_" + Math.random());
								var l = g.beAttackedPointL;
								var j = g.beAttackedPointR;
								g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (j - l) * 0.5) - l) + j;
								g.R = i;
								g.pixelTop = h;
								g.zIndex = k;
								(g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
								return g.getHTML(e, g.X, h, k, "none", m || 0, g.GetDTop, g.PicArr[g.NormalGif]);
							},
							BirthCallBack(f) {
								var e = f.delayT;
								var d = f.id;
								var c = (f.Ele = $(d));
								f.EleShadow = c.firstChild;
								f.EleBody = c.childNodes[1];
								e
									? oSym.addTask(
											e,
											(h, g) => {
												var i = $Z[h];
												i && ((i.FreeSetbodyTime = 0), SetBlock(g));
											},
											[d, c]
										)
									: SetBlock(c);
							},
							Birth() {
								var c = this;
								$Z[c.id] = c;
								oZ.add(c);
								c.BirthCallBack(c);
							},
							getCrushed(c) {
								return true;
							},
							getRaven() {
								return (this.DisappearDie(), 1);
							},
							getExplosion() {
								this.ExplosionDie();
							},
							getThump() {
								this.DisappearDie();
							},
							PlayNormalballAudio() {
								PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
							},
							PlayFireballAudio() {
								PlaySound2(["ignite", "ignite2"][Math.floor(Math.random() * 2)]);
							},
							PlaySlowballAudio() {
								PlaySound2("frozen");
							},
							getFireball(h, e, g) {
								h.FreeSlowTime = 0;
								h.Attack = 100;
								h.FreeFreezeTime || h.FreeSetbodyTime ? (h.PlayNormalballAudio(), (h.Speed = h.OSpeed)) : h.PlayFireballAudio();
								var f = h.AttackedLX;
								var j = h.AttackedRX;
								var c = !g ? oZ.getArZ(f, f + 40, h.R) : oZ.getArZ(j - 40, j, h.R);
								var d = c.length;
								while (d--) {
									c[d].getSputtering();
								}
							},
							getSputtering(c) {
								this.getHit2(this, c || 13, 0);
							},
							getSlow(h, f, g) {
								var d = oSym.Now + g;
								var e = h.FreeSlowTime;
								var c = 0;
								switch (true) {
									case !e:
										!(h.FreeFreezeTime || h.FreeSetbodyTime) && (h.Speed = 0.5 * h.OSpeed);
										h.Attack = 50;
										h.PlaySlowballAudio();
										h.FreeSlowTime = d;
										c = 1;
										break;
									case e < d:
										h.FreeSlowTime = d;
										h.PlayNormalballAudio();
										c = 1;
								}
								c &&
									oSym.addTask(
										g,
										(j, i) => {
											var k = $Z[j];
											k && k.FreeSlowTime === i && ((k.FreeSlowTime = 0), (k.Attack = 100), k.Speed && (k.Speed = k.OSpeed));
										},
										[f, d]
									);
							},
							getFreeze(d, c) {
								d.beAttacked && d.getHit0(d, 20, 0);
								d.Speed = 0;
								oSym.addTask(
									400,
									(g, f, e) => {
										ClearChild(e);
										var h = $Z[g];
										h &&
											h.FreeFreezeTime === f &&
											((h.FreeFreezeTime = 0),
											(h.Attack = 50),
											!h.FreeSetbodyTime && ((h.Speed = 0.5 * h.OSpeed), h.isAttacking && h.JudgeAttack()),
											oSym.addTask(
												1500,
												(j, i) => {
													var k = $Z[j];
													k &&
														k.FreeSlowTime === i &&
														((k.FreeSlowTime = 0), (k.Attack = 100), !k.FreeSetbodyTime && (k.Speed = k.OSpeed));
												},
												[g, (h.FreeSlowTime = oSym.Now + 1500)]
											));
									},
									[
										c,
										(d.FreeFreezeTime = oSym.Now + 400),
										NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", d.getShadow(d), d.Ele),
									]
								);
							},
							NormalDie() {
								var c = this;
								c.EleBody.src = c.PicArr[c.DieGif];
								oSym.addTask(250, ClearChild, [c.Ele]);
								c.HP = 0;
								delete $Z[c.id];
								c.PZ && oP.MonPrgs();
							},
							ExplosionDie() {
								var c = this;
								c.EleBody.src = c.PicArr[c.BoomDieGif];
								oSym.addTask(300, ClearChild, [c.Ele]);
								c.HP = 0;
								delete $Z[c.id];
								c.PZ && oP.MonPrgs();
							},
							DisappearDie() {
								ClearChild(this.Ele);
								this.HP = 0;
								delete $Z[this.id];
								this.PZ && oP.MonPrgs();
							},
							CrushDie() {
								var c = this;
								c.GoingDieHead(c.id, c.PicArr, c);
								ClearChild(c.Ele);
								c.HP = 0;
								delete $Z[c.id];
								c.PZ && oP.MonPrgs();
							},
							GoingDieHead(e, c, d) {
								oSym.addTask(200, ClearChild, [
									NewImg(0, c[d.HeadGif], "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDPZ),
								]);
							},
							GoingDie(d) {
								var c = this;
								var e = c.id;
								c.EleBody.src = d;
								c.GoingDieHead(e, c.PicArr, c);
								c.beAttacked = 0;
								c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = 0;
								c.AutoReduceHP(e);
							},
							AutoReduceHP(c) {
								oSym.addTask(
									100,
									(e) => {
										var d = $Z[e];
										d && ((d.HP -= 60) < 1 ? d.NormalDie() : d.AutoReduceHP(e));
									},
									[c]
								);
							},
							JudgeAttack() {
								var g = this;
								var d = g.ZX;
								var e = g.R + "_";
								var f = GetC(d);
								var h = oGd.$;
								var c;
								(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h))
									? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
									: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
							},
							JudgeLR(f, d, e, c, g) {
								return e > 10 || e < 1
									? false
									: (function () {
											d += --e + "_";
											var h = 3;
											var i;
											while (h--) {
												if ((i = g[d + h]) && i.canEat) {
													return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
												}
											}
										})();
							},
							JudgeSR(f, d, e, c, g) {
								return e > 9
									? false
									: (function () {
											d += e + "_";
											var h = 3;
											var i;
											while (h--) {
												if ((i = g[d + h]) && i.canEat) {
													return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
												}
											}
										})();
							},
							JudgeAttackH1() {
								var e = this;
								var d = oZ.getZ0(e.ZX, e.R);
								var c = e.id;
								d && d.beAttacked && d.AttackedLX < 900 && d.Altitude === 1 && (e.AttackZombie(d.id), !d.isAttacking && d.AttackZombie(c));
							},
							JudgeAttackH() {
								var e = this;
								var d = oZ.getZ0(e.ZX, e.R);
								var f = e.id;
								var c;
								d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude === 1
									? !e.isAttacking
										? ((e.isAttacking = 1),
											(e.EleBody.src = e.PicArr[e.AttackGif]),
											e.AttackZombie(f, (c = d.id)),
											!d.isAttacking && d.AttackZombie2(d, c, f))
										: e.AttackZombie(f, d.id, 1)
									: e.isAttacking && ((e.isAttacking = 0), (e.EleBody.src = e.PicArr[e.NormalGif]));
							},
							AttackZombie(d, c) {
								oSym.addTask(
									10,
									(f, e) => {
										var h = $Z[f];
										var g;
										h && h.beAttacked && !h.FreeFreezeTime && !h.FreeSetbodyTime && ((g = $Z[e]) && g.getHit0(g, 10, 0), h.JudgeAttackH());
									},
									[d, c]
								);
							},
							AttackZombie2(e, d, c) {
								e.isAttacking = 1;
								e.EleBody.src = e.PicArr[e.AttackGif];
								oSym.addTask(
									10,
									function (g, f) {
										var i = $Z[g];
										var h;
										i &&
											i.beAttacked &&
											!i.FreeFreezeTime &&
											!i.FreeSetbodyTime &&
											((h = $Z[f])
												? (h.getHit0(h, 10, 0), oSym.addTask(10, arguments.callee, [g, f]))
												: ((i.isAttacking = 0), (i.EleBody.src = i.PicArr[i.NormalGif])));
									},
									[d, c]
								);
							},
							NormalAttack(d, c) {
								PlaySound2(["chomp", "chomp2", "chompsoft"][Math.floor(Math.random() * 2)]);
								oSym.addTask(85, console.log("chomp"));
								oSym.addTask(
									100,
									(f, e) => {
										var h = $Z[f];
										var g;
										h &&
											h.beAttacked &&
											!h.FreeFreezeTime &&
											!h.FreeSetbodyTime &&
											((g = $P[e]) && g.getHurt(h, h.AKind, h.Attack), h.JudgeAttack());
									},
									[d, c]
								);
							},
							PZ: 1,
							ExchangeLR(f, d) {
								var e = f.width;
								var h = f.beAttackedPointL;
								var c = f.beAttackedPointR;
								var g = f.Ele;
								g.style.left = (f.X = f.AttackedLX - (f.beAttackedPointL = e - c)) + "px";
								f.beAttackedPointR = e - h;
								f.EleShadow.style.cssText = f.getShadow(f);
								f.ExchangeLR2(f, f.EleBody, d);
							},
							ExchangeLR2: $User.Browser.IE
								? function (e, c, d) {
										c.style.filter = e.CSS_alpha + (e.CSS_fliph = d ? " fliph" : "");
									}
								: function (e, c, d) {
										c.className = d ? "fliph" : "";
									},
							bedevil(c) {
								c.ExchangeLR(c, 1);
								c.JudgeAttack = c.JudgeAttackH;
								c.PZ = 0;
								c.WalkDirection = 1;
								c.ZX = c.AttackedRX;
								c.ChkActs = c.ChkActs1;
								oP.MonPrgs();
							},
							SetAlpha: $User.Browser.IE
								? function (f, d, e, c) {
										d.style.filter = (f.CSS_alpha = "alpha(opacity=" + e + ")") + f.CSS_fliph;
									}
								: function (f, d, e, c) {
										d.style.opacity = c;
									},
						}),
						a
					);
				})();
				var OrnNoneZombies = (function () {
					var a = function (c, b) {
						if ((c.HP -= b) < c.BreakPoint) {
							c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);
							c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {};
							return;
						}
						c.SetAlpha(c, c.EleBody, 50, 0.5);
						oSym.addTask(
							10,
							(e, d) => {
								(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
							},
							[c.id]
						);
					};
					return InheritO(CZombies, {
						getHit: a,
						getHit0: a,
						getHit1: a,
						getHit2: a,
						getHit3: a,
						getPea(e, b, c) {
							e.PlayNormalballAudio();
							e.getHit0(e, b, c);
						},
						getFirePea(g, c, j) {
							g.PlayFireballAudio();
							(g.FreeSlowTime || g.FreeFreezeTime) && ((g.Speed = g.OSpeed), (g.FreeSlowTime = 0), (g.FreeFreezeTime = 0));
							g.Attack = 100;
							var f = g.AttackedLX;
							var h = g.AttackedRX;
							var b = oZ.getArZ(f, f + 40, g.R);
							var e = b.length;
							while (e--) {
								b[e].getFirePeaSputtering();
							}
							g.getHit0(g, c, j);
						},
						getFirePeaSputtering() {
							this.getHit0(this, 13);
						},
						getSnowPea(f, c, g) {
							var e = f.FreeSlowTime;
							var b = oSym.Now + 1000;
							e === 0 ? (f.PlaySlowballAudio(), (f.Speed = 0.5 * f.OSpeed), (f.Attack = 50)) : f.PlayNormalballAudio();
							e < b &&
								((f.FreeSlowTime = b),
								oSym.addTask(
									1000,
									(h, d) => {
										var i = $Z[h];
										i && i.FreeSlowTime === d && ((i.FreeSlowTime = 0), (i.Attack = 100), i.Speed && (i.Speed = i.OSpeed));
									},
									[f.id, b]
								));
							f.getHit0(f, c, g);
						},
					});
				})();
				var oBackupDancer = InheritO(OrnNoneZombies, {
					EName: "oBackupDancer",
					CName: "Backup Dancer",
					OSpeed: 3.5,
					Speed: 3.5,
					Lvl: 1,
					StandGif: 9,
					CanSelect: 0,
					width: 126,
					height: 152,
					beAttackedPointL: 50,
					beAttackedPointR: 95,
					Speed: 3.5,
					OSpeed: 3.5,
					PicArr: (function () {
						var a = "images/Zombies/BackupDancer/";
						return [
							"images/Card/Zombies/BackupDancer.png",
							a + "0.gif",
							a + "BackupDancer.gif",
							a + "Attack.gif",
							a + "LostHead.gif",
							a + "LostHeadAttack.gif",
							a + "Head.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "Dancing.gif" + $Random,
							a + "LostHeadDancing.gif" + $Random,
							a + "Mound.gif" + $Random,
						];
					})(),
					bedevil(a) {
						a.ExchangeLR(a, 1);
						a.JudgeAttack = a.JudgeAttackH;
						a.PZ = 0;
						a.WalkDirection = 1;
						a.ZX = a.AttackedRX;
						a.ChkActs = a.ChkActs1;
						a.Speed = 3.5;
						a.ChangeChkActsTo1(a, a.id, a.EleBody);
						oP.MonPrgs();
					},
					getSlow(f, d, e) {
						var b = oSym.Now + e;
						var c = f.FreeSlowTime;
						var a = 0;
						switch (true) {
							case !c:
								f.PlaySlowballAudio();
								f.Attack = 50;
								f.FreeSlowTime = b;
								a = 1;
								break;
							case c < b:
								f.PlayNormalballAudio();
								f.FreeSlowTime = b;
								a = 1;
						}
						a &&
							oSym.addTask(
								e,
								(h, g) => {
									var i = $Z[h];
									i && i.FreeSlowTime === g && ((i.FreeSlowTime = 0), (i.Attack = 100));
								},
								[d, b]
							);
					},
					getFreeze(b, a) {
						b.beAttacked && b.getHit0(b, 20, 0);
						oSym.addTask(
							400,
							(e, d, c) => {
								ClearChild(c);
								var f = $Z[e];
								f &&
									f.FreeFreezeTime === d &&
									((f.FreeFreezeTime = 0),
									(f.Attack = 50),
									!f.FreeSetbodyTime && f.isAttacking && f.JudgeAttack(),
									oSym.addTask(
										1500,
										(h, g) => {
											var i = $Z[h];
											i && i.FreeSlowTime === g && ((i.FreeSlowTime = 0), (i.Attack = 100));
										},
										[e, (f.FreeSlowTime = oSym.Now + 1500)]
									));
							},
							[
								a,
								(b.FreeFreezeTime = oSym.Now + 400),
								NewImg("icetrap_" + Math.random(), "images/Plants/IceShroom/icetrap.gif", b.getShadow(b), b.Ele),
							]
						);
					},
					CustomBirth(g, d, a, b, j) {
						var e = this;
						var c = GetY(g) + e.GetDY();
						var f = c - e.height;
						var i = e.beAttackedPointL;
						var h = e.beAttackedPointR;
						e.AttackedRX = (e.X = (e.ZX = e.AttackedLX = d - (h - i) * 0.5) - i) + h;
						e.R = g;
						(e.delayT = a) && (e.FreeSetbodyTime = oSym.Now);
						return e.getHTML((e.id = b), e.X, (e.pixelTop = f), (e.zIndex = 3 * g + 1), "none", j || 0, e.height + "px", e.PicArr[e.StandGif]);
					},
					Produce:
						'<font color="#28325A">These zombies appear in sets of four whenever Dancing Zombie rocks out.</font><p>Toughness: <font color="#CC241D">low</font></p>Backup Dancer Zombie spent six years perfecting his art at the Chewliard Performing Arts School in Zombie New York City.',
					BirthCallBack(e) {
						var d = e.delayT;
						var c = e.id;
						var b = (e.Ele = $(c));
						var a = (e.EleBody = b.childNodes[1]);
						e.EleShadow = b.firstChild;
						oSym.addTask(
							d,
							(g, f) => {
								var h = $Z[g];
								h && ((h.FreeSetbodyTime = 0), SetBlock(f));
							},
							[c, b]
						);
					},
					ChangeChkActsTo0(c, b, a) {
						if (!c.PZ) {
							c.ChangeChkActsTo1(c, b, a);
							return;
						}
						c.LostHeadGif = 10;
						c.NormalGif = 9;
						!c.isAttacking && (a.src = c.PicArr[9]);
						c.Speed = c.DZStep = 0;
						oSym.addTask(
							200,
							(e, d) => {
								var f = $Z[e];
								f && f.beAttacked && f.ChangeChkActsTo1(f, e, d);
							},
							[b, a]
						);
					},
					ChangeChkActsTo1(c, b, a) {
						c.LostHeadGif = 4;
						c.NormalGif = 2;
						c.DZStep = 1;
						!c.isAttacking && (a.src = c.PicArr[2]);
						c.PZ &&
							oSym.addTask(
								220,
								(e, d) => {
									var f = $Z[e];
									f && f.beAttacked && f.ChangeChkActsTo0(f, e, d);
								},
								[b, a]
							);
					},
					ChkActs(g, d, h, c) {
						var e;
						var b;
						var a;
						var f;
						!(g.FreeFreezeTime || g.FreeSetbodyTime)
							? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
								(e = g.id),
								!g.isAttacking
									? (a = g.AttackedRX -= b = g.Speed) < -50
										? (h.splice(c, 1), g.DisappearDie(), (f = 0))
										: (a < 100 &&
												!g.PointZombie &&
												((g.PointZombie = 1),
												!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
												g.ChangeR({
													R: d,
													ar: [oS.R - 1],
													CustomTop: 400 - g.height + g.GetDY(),
												})),
											(g.ZX = g.AttackedLX -= b),
											(g.Ele.style.left = Math.floor((g.X -= b)) + "px"),
											(f = 1))
									: (f = 1))
							: (f = 1);
						g.ChkSpeed(g);
						return f;
					},
					ChkSpeed(b) {
						if (!b.DZStep) {
							return;
						}
						var a = b.Speed;
						switch (true) {
							case (b.FreeFreezeTime || b.FreeSetbodyTime) === 1:
								a && (b.Speed = 0);
								break;
							case b.FreeSlowTime > 0:
								a !== 1.75 && (b.Speed = 1.75);
								break;
							default:
								a !== 3.5 && (b.Speed = 3.5);
						}
					},
				});
				var oDancingZombie = InheritO(OrnNoneZombies, {
					EName: "oDancingZombie",
					CName: "Dancing Zombie ",
					HP: 500,
					BreakPoint: 166,
					Lvl: 3,
					StandGif: 9,
					SunNum: 350,
					beAttackedPointL: 40,
					beAttackedPointR: 85,
					width: 184,
					height: 176,
					BookHandPosition: "70% 70%",
					AudioArr: ["dancer"],
					OSpeed: 7.2,
					Speed: 7.2,
					NormalGif: 9,
					GetDTop: 5,
					getShadow(a) {
						return "left:30px;top:146px";
					},
					GetDX() {
						return -50;
					},
					GetDY() {
						return -5;
					},
					LostHeadGif: 14,
					addSpotlight: (function () {
						var a;
						var b;
						$User.Browser.IE6 ? ((a = "_8"), (b = "filter:alpha(opacity=30)")) : (a = b = "");
						return function (d, f, c) {
							var g = $Z[d];
							var e;
							NewEle(
								d + "_spotlightCon",
								"div",
								"position:absolute;left:-30px;top:-400px;width:184px;height:600px;overflow:hidden",
								0,
								c
							).appendChild(
								(g.spotlight = NewImg(
									d + "_spotlight",
									"images/Zombies/DancingZombie/spotlight" + a + ".png",
									"left:0;top:0;width:920px;height:600px;" + b
								))
							);
							e = NewEle(d + "_spotlight2Con", "div", "position:absolute;left:-25px;top:135px;width:184px;height:60px;overflow:hidden", 0);
							c.insertBefore(e, f.EleShadow);
							e.appendChild(
								(g.spotlight2 = NewImg(
									d + "_spotlight2",
									"images/Zombies/DancingZombie/spotlight2" + a + ".png",
									"left:0;top:0;width:920px;height:60px;" + b
								))
							);
						};
					})(),
					PicArr: (function () {
						var d = "images/Zombies/DancingZombie/";
						var c = $User.Browser.IE6 ? "_8" : "";
						var a = d + "spotlight" + c + ".png" + $Random;
						var b = d + "spotlight2" + c + ".png" + $Random;
						return [
							"images/Card/Zombies/DancingZombie.png",
							d + "0.gif",
							d + "DancingZombie.gif",
							d + "Attack.gif",
							d + "LostHead.gif",
							d + "LostHeadAttack.gif",
							d + "Head.gif" + $Random,
							d + "Die.gif" + $Random,
							d + "BoomDie.gif" + $Random,
							d + "SlidingStep.gif" + $Random,
							d + "Dancing.gif" + $Random,
							d + "Summon1.gif",
							d + "Summon2.gif",
							d + "Summon3.gif",
							d + "LostHeadSlidingStep.gif" + $Random,
							d + "LostHeadDancing.gif" + $Random,
							d + "LostHeadSummon.gif" + $Random,
							a,
							b,
						];
					})(),
					Produce:
						'舞王僵尸和人类(在世或者死去的)如有雷同，纯属巧合。</p><p>韧性：<font color="#CC241D">中</font><br>特点：<font color="#CC241D">召唤伴舞僵尸</font></p>舞王僵尸的最新唱片“抓住脑子啃啊啃”在僵尸界的人气正急速飙升。',
					getSnowPea() {
						this.PlaySlowballAudio();
					},
					NormalDie() {
						var a = this;
						a.ResetBackupDancer(a);
						a.EleBody.src = a.PicArr[a.DieGif];
						oSym.addTask(250, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					ExplosionDie() {
						var a = this;
						a.ResetBackupDancer(a);
						a.EleBody.src = a.PicArr[a.BoomDieGif];
						oSym.addTask(300, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					DisappearDie() {
						this.ResetBackupDancer(this);
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
					CrushDie() {
						var a = this;
						a.ResetBackupDancer(a);
						a.GoingDieHead(a.id, a.PicArr, a);
						ClearChild(a.Ele);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					bedevil(b) {
						var a = b.id;
						b.ExchangeLR(b, 1);
						b.JudgeAttack = b.JudgeAttackH;
						b.PZ = 0;
						b.WalkDirection = 1;
						b.ZX = b.AttackedRX;
						b.ChkActs = b.ChkActs1;
						b.ChangeChkActsTo1(b, a, b.EleBody);
						b.ResetBackupDancer(b);
						(($(a + "_spotlightCon").style.left = "20px"), ($(a + "_spotlight2Con").style.left = "25px"));
						oP.MonPrgs();
					},
					ResetBackupDancer(f) {
						var g = f.ArDZ;
						var d = g.length;
						var c;
						var b;
						var e;
						var a = f.DZStep;
						while (d--) {
							if ((c = g[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
								if (a > 0) {
									switch (true) {
										case (e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
											e.Speed = 0;
											break;
										case e.FreeSlowTime > 0:
											e.Speed = 1.75;
											break;
										default:
											e.Speed = 3.5;
									}
								}
							}
						}
						a > -1 &&
							oSym.addTask(
								f.DZStepT - oSym.Now,
								(o, j) => {
									var m = 4;
									var l;
									var k;
									var n;
									var h = "ChangeChkActsTo" + j;
									while (m--) {
										(l = o[m]) && (k = l[0]) && (n = $Z[k]) && n.beAttacked && ((n.DZStep = j), n[h](n, k, n.EleBody));
									}
								},
								[g, [1, 0][a]]
							);
					},
					BirthCallBack(d) {
						var b = d.delayT;
						var l = d.id;
						var a = (d.Ele = $(l));
						var c = 320;
						var i = oGd.$LF;
						var g = d.R;
						var s = g - 1;
						var n = g + 1;
						var e;
						var r;
						var q = LX - 60;
						var m = LX + 100;
						var k = LX - 130;
						var j = LX - 70;
						var h = LX + 30;
						var f = (d.ArDZ = [0, 0, 0, 0]);
						d.EleShadow = a.firstChild;
						d.EleBody = a.childNodes[1];
						s > 0 &&
							(e = i[s]) &&
							e !== 2 &&
							(f[0] = [
								"",
								s,
								function (o) {
									return o;
								},
								3 * s + 2,
								function (o) {
									return o - 70;
								},
								GetY(s) - 155,
							]);
						n <= oS.R &&
							(e = i[n]) &&
							e !== 2 &&
							(f[2] = [
								"",
								n,
								function (o) {
									return o;
								},
								3 * n + 2,
								function (o) {
									return o - 70;
								},
								GetY(n) - 155,
							]);
						e = 3 * g + 2;
						r = GetY(g) - 155;
						f[3] = [
							"",
							g,
							function (o) {
								return o - 60;
							},
							e,
							function (o) {
								return o - 130;
							},
							r,
						];
						f[1] = [
							"",
							g,
							function (o) {
								return o + 100;
							},
							e,
							function (o) {
								return o + 30;
							},
							r,
						];
						func = function (t, o) {
							var u = $Z[t];
							u && (u.ExchangeLR(d, 1), (u.DZMSpeed = 7.2), (u.DZStep = -1), (u.DZStepT = oSym.Now + 220), (u.FreeSetbodyTime = 0), SetBlock(o));
						};
						b ? (oSym.addTask(b, func, [l, a]), (c += b)) : func(l, a);
						oSym.addTask(
							c,
							(o) => {
								var t = $Z[o];
								t && t.beAttacked && !t.isAttacking && t.NormalAttack(o);
							},
							[d.id]
						);
					},
					ChkActs1(e, b, f, a) {
						var c;
						var d;
						!(e.FreeFreezeTime || e.FreeSetbodyTime)
							? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
								(c = e.id),
								!e.isAttacking
									? (e.AttackedLX += 3.5) > oS.W
										? (f.splice(a, 1), e.DisappearDie(), (d = 0))
										: ((e.ZX = e.AttackedRX += 3.5), (e.Ele.style.left = Math.ceil((e.X += 3.5)) + "px"), (d = 1))
									: (d = 1))
							: (d = 1);
						return d;
					},
					ChkTmp(c, b, d, a) {
						c.ChkSpeed(c);
						return 0;
					},
					ChkActs(g, d, h, c) {
						var e;
						var b;
						var a;
						var f;
						!(g.FreeFreezeTime || g.FreeSetbodyTime)
							? (g.beAttacked && !g.isAttacking && g.JudgeAttack(),
								(e = g.id),
								!g.isAttacking
									? (a = g.AttackedRX -= b = g.Speed) < -50
										? (h.splice(c, 1), g.DisappearDie(), (f = 0))
										: (a < 100 &&
												!g.PointZombie &&
												((g.PointZombie = 1),
												!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
												g.ChangeR({
													R: d,
													ar: [oS.R - 1],
													CustomTop: 400 - g.height + g.GetDY(),
												})),
											(g.ZX = g.AttackedLX -= b),
											(g.Ele.style.left = Math.floor((g.X -= b)) + "px"),
											(f = 1))
									: (f = 1))
							: (f = 1);
						g.ChkSpeed(g);
						return f;
					},
					ChkSpeed(g) {
						if (!g.DZStep) {
							return;
						}
						var h = g.ArDZ;
						var d = 4;
						var c;
						var b;
						var e;
						var a = g.OSpeed;
						var f = [];
						switch (true) {
							case (g.isAttacking || g.FreeFreezeTime || g.FreeSetbodyTime) === 1:
								a = 0;
								break;
							case g.FreeSlowTime > 0:
								a !== 1.75 && (a = 1.75);
						}
						while (d--) {
							if ((c = h[d]) && (b = c[0]) && (e = $Z[b]) && e.beAttacked) {
								f.push(e);
								switch (true) {
									case (e.isAttacking || e.FreeFreezeTime || e.FreeSetbodyTime) === 1:
										a = 0;
										break;
									case e.FreeSlowTime > 0:
										a !== 1.75 && (a = 1.75);
								}
							}
						}
						if (a !== g.DZMSpeed) {
							g.DZMSpeed = a;
							d = f.length;
							while (d--) {
								(e = f[d]).Speed !== a && (e.Speed = a);
							}
							g.Speed !== a && (g.Speed = a);
						}
					},
					AttackZombie(a) {
						this.ExchangeLR(this, 0);
						var b = this.id;
						this.isAttacking = 1;
						this.EleBody.src = this.PicArr[this.AttackGif];
						oSym.addTask(
							10,
							function (d, c) {
								var f = $Z[d];
								var e;
								f &&
									f.beAttacked &&
									!f.FreeFreezeTime &&
									!f.FreeSetbodyTime &&
									((e = $Z[c])
										? (e.getHit0(e, 10, 0), oSym.addTask(10, arguments.callee, [d, c]))
										: ((f.isAttacking = 0), (f.EleBody.src = f.PicArr[f.NormalGif]), f.TurnLeft(f)));
							},
							[b, a]
						);
					},
					ChkBackupDancer(h, g, f) {
						if (!h.PZ) {
							h.ChangeChkActsTo1(h, g, f);
							return;
						}
						var b = h.ArDZ;
						var d = 4;
						var j = 1;
						var c;
						var e;
						var a;
						while (d--) {
							(e = b[d]) && (!(c = e[0]) || !(a = $Z[c]) || (a.PZ ? false : ((e[0] = ""), true))) && (d = j = 0);
						}
						!h.isAttacking && j ? (f.src = h.PicArr[10]) : h.Summon(h, g);
						h.ChangeChkActsTo0(h, g, f);
					},
					ChangeChkActsTo0(g, e, a) {
						if (!g.PZ) {
							g.ChangeChkActsTo1(g, e, a);
							return;
						}
						var d = 4;
						var h = g.ArDZ;
						var c;
						var b;
						var f;
						while (d--) {
							(b = h[d]) &&
								(c = b[0]) &&
								(f = $Z[c]) &&
								f.beAttacked &&
								((f.LostHeadGif = 10), (f.NormalGif = 9), !f.isAttacking && (f.EleBody.src = f.PicArr[9]), (f.Speed = 0));
						}
						g.LostHeadGif = 15;
						g.NormalGif = 10;
						g.Speed = g.DZMSpeed = g.DZStep = 0;
						g.DZStepT = oSym.Now + 200;
						oSym.addTask(
							200,
							(j, i) => {
								var k = $Z[j];
								k && k.beAttacked && k.ChangeChkActsTo1(k, j, i);
							},
							[e, a]
						);
					},
					ChangeChkActsTo1(g, e, a) {
						var d = 4;
						var h = g.ArDZ;
						var c;
						var b;
						var f;
						while (d--) {
							(b = h[d]) &&
								(c = b[0]) &&
								(f = $Z[c]) &&
								f.beAttacked &&
								((f.LostHeadGif = 4), (f.NormalGif = 2), !f.isAttacking && (f.EleBody.src = f.PicArr[2]));
						}
						g.LostHeadGif = 4;
						g.NormalGif = 2;
						g.DZStep = 1;
						g.DZStepT = oSym.Now + 220;
						!g.isAttacking && (a.src = g.PicArr[2]);
						g.PZ &&
							oSym.addTask(
								220,
								(j, i) => {
									var k = $Z[j];
									k && k.beAttacked && k.ChkBackupDancer(k, j, i);
								},
								[e, a]
							);
					},
					TurnLeft(c) {
						var a = CZombies.prototype;
						var b = c.id;
						c.AttackZombie = a.AttackZombie;
						c.NormalAttack = a.NormalAttack;
						c.OSpeed = 3.5;
						!(c.FreeSlowTime || c.FreeFreezeTime || c.FreeSetbodyTime) && (c.Speed = 3.5);
						c.getSnowPea = OrnNoneZombies.prototype.getSnowPea;
						c.getFreeze = CZombies.prototype.getFreeze;
						oSym.addTask(
							20,
							(d, e) => {
								$Z[d] &&
									e.beAttacked &&
									(e.addSpotlight(d, e, e.Ele),
									oSym.addTask(
										200,
										function (g, f, i, h, k) {
											var j = $Z[g];
											j &&
												(h > -736 ? (h -= 184) : (h = 0),
												(f.style.left = h + "px"),
												k > -736 ? (k -= 184) : (k = 0),
												(i.style.left = k + "px"),
												oSym.addTask(100, arguments.callee, [g, f, i, h, k]));
										},
										[d, e.spotlight, e.spotlight2, 0, 0]
									),
									oSym.addTask(
										200,
										(h, g) => {
											var f;
											$Z[g] &&
												h.beAttacked &&
												((f = h.EleBody), !h.isAttacking ? (f.src = h.PicArr[10]) : (h.isAttacking = 0), h.ChangeChkActsTo0(h, g, f));
										},
										[e, d]
									));
							},
							[b, c]
						);
						c.Summon(c, b);
					},
					NormalAttack(a) {
						var b = $Z[a];
						b.ExchangeLR(b, 0);
						b.TurnLeft(b);
					},
					Summon(d, c) {
						d.LostHeadGif = 16;
						var a = d.EleBody;
						var b = d.ChkActs;
						d.ChkActs = d.ChkTmp;
						d.ChkTmp = b;
						a.src = "images/Zombies/DancingZombie/Summon1.gif";
						PlaySound2("dancer");
						oSym.addTask(
							10,
							(f, e) => {
								var g = $Z[f];
								g &&
									g.beAttacked &&
									((e.src = "images/Zombies/DancingZombie/Summon2.gif"),
									oSym.addTask(
										10,
										(t, s, x) => {
											var h = $Z[t];
											var v = h.ZX;
											var m = h.ArDZ;
											var n = [];
											var k = "images/Zombies/BackupDancer/Mound.gif" + $Random + Math.random();
											var r = 4;
											var w = [];
											var u = [];
											var o = 0;
											var q;
											var l;
											if (h && h.beAttacked) {
												s.src = "images/Zombies/DancingZombie/Summon3.gif";
												while (r--) {
													(q = m[r]) &&
														(!(l = q[0]) || !$Z[l]) &&
														((u[o] = (w[o] = new oBackupDancer()).CustomBirth(q[1], q[2](v), 100, (q[0] = "Z_" + Math.random()))),
														n.push(NewImg("", k, "z-index:" + q[3] + ";left:" + q[4](v) + "px;top:" + q[5] + "px", EDPZ)),
														++o);
												}
												oSym.addTask(
													220,
													function () {
														var i = arguments.length;
														while (i--) {
															ClearChild(arguments[i]);
														}
													},
													n
												);
												oSym.addTask(
													110,
													(A, y, z, i) => {
														var B = $Z[A];
														B &&
															B.beAttacked &&
															(oP.AppearUP(y, z, i),
															oSym.addTask(
																100,
																(D, C) => {
																	var E = $Z[D];
																	if (E && E.beAttacked) {
																		return;
																	}
																	var j = C.length;
																	var E;
																	while (j--) {
																		(E = C[j]).ChangeChkActsTo0(E, E.id, E.EleBody);
																	}
																},
																[A, z]
															));
													},
													[t, u, w, o]
												);
												oSym.addTask(
													200,
													(y, i) => {
														var z = $Z[y];
														var j;
														z && z.beAttacked && ((j = z.ChkActs), (z.ChkActs = z.ChkTmp), (z.ChkTmp = j));
													},
													[t, s]
												);
											}
										},
										[f, e]
									));
							},
							[c, a]
						);
					},
				});
				var oZombie = InheritO(OrnNoneZombies, {
					EName: "oZombie",
					CName: "领带僵尸",
					StandGif: 9,
					PicArr: (function () {
						var a = "images/Zombies/Zombie/";
						return [
							"images/Card/Zombies/Zombie.png",
							a + "0.gif",
							a + "Zombie.gif",
							a + "ZombieAttack.gif",
							a + "ZombieLostHead.gif",
							a + "ZombieLostHeadAttack.gif",
							a + "ZombieHead.gif" + $Random,
							a + "ZombieDie.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "1.gif",
						];
					})(),
					Produce:
						'韧性：<font color="#CC241D">低</font></p>这种僵尸喜爱脑髓，贪婪而不知足。脑髓，脑髓，脑髓，夜以继日地追求着。老而臭的脑髓？腐烂的脑髓？都没关系。僵尸需要它们。',
				});
				var oZombie2 = InheritO(
					oZombie,
					{
						EName: "oZombie2",
					},
					{
						PicArr: {
							2: "images/Zombies/Zombie/Zombie2.gif",
							9: "images/Zombies/Zombie/2.gif",
						},
					}
				);
				var oZombie3 = InheritO(
					oZombie,
					{
						EName: "oZombie3",
					},
					{
						PicArr: {
							2: "images/Zombies/Zombie/Zombie3.gif",
							9: "images/Zombies/Zombie/3.gif",
						},
					}
				);
				var oFlagZombie = InheritO(oZombie, {
					PicArr: (function () {
						var a = "images/Zombies/FlagZombie/";
						return [
							"images/Card/Zombies/FlagZombie.png",
							a + "0.gif",
							a + "FlagZombie.gif",
							a + "FlagZombieAttack.gif",
							a + "FlagZombieLostHead.gif",
							a + "FlagZombieLostHeadAttack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
							"images/Zombies/Zombie/ZombieDie.gif" + $Random,
							"images/Zombies/Zombie/BoomDie.gif" + $Random,
							a + "1.gif",
						];
					})(),
					EName: "oFlagZombie",
					CName: "旗帜僵尸",
					OSpeed: 2.2,
					Speed: 2.2,
					beAttackedPointR: 101,
					Produce:
						'旗帜僵尸标志着即将来袭的一大堆僵尸"流"。<p>韧性：<font color="#CC241D">低</font></p>毫无疑问，摇旗僵尸喜爱脑髓。但在私下里他也迷恋旗帜。也许是因为旗帜上也画有脑子吧，这很难说。',
				});
				var OrnIZombies = (function () {
					var a = function (f, b) {
						var d = f.OrnHP;
						var c = f.HP;
						var e = OrnNoneZombies.prototype;
						(d = f.OrnHP -= b) < 1 &&
							((f.HP += d),
							(f.Ornaments = 0),
							(f.EleBody.src = f.PicArr[[(f.NormalGif = f.OrnLostNormalGif), (f.AttackGif = f.OrnLostAttackGif)][f.isAttacking]]),
							(f.PlayNormalballAudio = e.PlayNormalballAudio),
							(f.PlayFireballAudio = e.PlayFireballAudio),
							(f.PlaySlowballAudio = e.PlaySlowballAudio),
							(f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = e.getHit));
						f.SetAlpha(f, f.EleBody, 50, 0.5);
						oSym.addTask(
							10,
							(h, g) => {
								(g = $Z[h]) && g.SetAlpha(g, g.EleBody, 100, 1);
							},
							[f.id]
						);
					};
					return InheritO(OrnNoneZombies, {
						Ornaments: 1,
						OrnLostNormalGif: 9,
						OrnLostAttackGif: 10,
						getHit: a,
						getHit0: a,
						getHit1: a,
						getHit2: a,
						getHit3: a,
					});
				})();
				var oConeheadZombie = InheritO(OrnIZombies, {
					EName: "oConeheadZombie",
					CName: "路障僵尸",
					OrnHP: 370,
					Lvl: 2,
					SunNum: 75,
					StandGif: 11,
					PicArr: (function () {
						var b = "images/Zombies/ConeheadZombie/";
						var a = "images/Zombies/Zombie/";
						return [
							"images/Card/Zombies/ConeheadZombie.png",
							b + "0.gif",
							b + "ConeheadZombie.gif",
							b + "ConeheadZombieAttack.gif",
							a + "ZombieLostHead.gif",
							a + "ZombieLostHeadAttack.gif",
							a + "ZombieHead.gif" + $Random,
							a + "ZombieDie.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "Zombie.gif",
							a + "ZombieAttack.gif",
							b + "1.gif",
						];
					})(),
					AudioArr: ["plastichit"],
					PlayNormalballAudio() {
						PlaySound2("plastichit");
					},
					Produce:
						'他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#CC241D">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。',
				});
				var oBucketheadZombie = InheritO(
					oConeheadZombie,
					{
						EName: "oBucketheadZombie",
						CName: "铁桶僵尸",
						OrnHP: 1100,
						Lvl: 3,
						SunNum: 125,
						PlayNormalballAudio() {
							PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
						},
						Produce:
							'他的铁桶头盔，能极大程度的承受伤害。<p>韧性：<font color="#CC241D">高</font><br>弱点：<font color="#CC241D">磁力菇</font></p>铁桶头僵尸经常戴着水桶，在冷漠的世界里显得独一无二。但事实上，他只是忘记了，那铁桶还在他头上而已。',
					},
					{
						PicArr: {
							0: "images/Card/Zombies/BucketheadZombie.png",
							1: "images/Zombies/BucketheadZombie/0.gif",
							2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
							3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
							9: "images/Zombies/Zombie/Zombie2.gif",
							11: "images/Zombies/BucketheadZombie/1.gif",
						},
					}
				);
				var oFootballZombie = InheritO(oConeheadZombie, {
					EName: "oFootballZombie",
					CName: "橄榄球僵尸",
					OrnHP: 1400,
					Lvl: 3,
					SunNum: 175,
					StandGif: 11,
					width: 154,
					height: 160,
					OSpeed: 3.2,
					Speed: 3.2,
					beAttackedPointL: 40,
					beAttackedPointR: 134,
					PlayNormalballAudio() {
						PlaySound2("plastichit");
					},
					PicArr: (function () {
						var a = "images/Zombies/FootballZombie/";
						return [
							"images/Card/Zombies/FootballZombie.png",
							a + "0.gif",
							a + "FootballZombie.gif",
							a + "Attack.gif",
							a + "LostHead.gif",
							a + "LostHeadAttack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "OrnLost.gif",
							a + "OrnLostAttack.gif",
							a + "1.gif",
						];
					})(),
					getShadow(a) {
						return "left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px";
					},
					Produce:
						'橄榄球僵尸的表演秀。<p>韧性：<font color="#CC241D">极高</font><br>速度：<font color="#CC241D">快</font><br>弱点：<font color="#CC241D">磁力菇</font></p>在球场上，橄榄球僵尸表现出110%的激情，他进攻防守样样在行。虽然他完全不知道橄榄球是什么。',
				});
				var oPoleVaultingZombie = InheritO(OrnNoneZombies, {
					EName: "oPoleVaultingZombie",
					CName: "撑杆僵尸",
					HP: 500,
					width: 348,
					height: 218,
					OSpeed: 3.2,
					Speed: 3.2,
					beAttackedPointL: 215,
					beAttackedPointR: 260,
					StandGif: 13,
					GetDX() {
						return -238;
					},
					GetDY() {
						return 2;
					},
					Lvl: 2,
					SunNum: 75,
					BookHandPosition: "-30px 70%",
					PicArr: (function () {
						var a = "images/Zombies/PoleVaultingZombie/";
						return [
							"images/Card/Zombies/PoleVaultingZombie.png",
							a + "0.gif",
							a + "PoleVaultingZombie.gif",
							a + "PoleVaultingZombieAttack.gif",
							a + "PoleVaultingZombieLostHead.gif",
							a + "PoleVaultingZombieLostHeadAttack.gif",
							a + "PoleVaultingZombieHead.gif" + $Random,
							a + "PoleVaultingZombieDie.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "PoleVaultingZombieWalk.gif",
							a + "PoleVaultingZombieLostHeadWalk.gif",
							a + "PoleVaultingZombieJump.gif",
							a + "PoleVaultingZombieJump2.gif",
							a + "1.gif",
						];
					})(),
					AudioArr: ["polevault", "grassstep"],
					Produce:
						'撑杆僵尸运用标杆高高地跃过障碍物。<p>韧性：<font color="#CC241D">中</font><Br>速度：<font color="#CC241D">快,而后慢(跳跃后)</font><BR>特点：<font color="#CC241D">跃过他所碰到的第一筑植物</font></p>一些僵尸渴望走得更远、得到更多，这也促使他们由普通成为非凡。那就是撑杆僵尸。',
					getShadow(a) {
						return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px";
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(0, a[b.HeadGif], "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDPZ),
						]);
					},
					JudgeAttack() {
						var g = this;
						var b = g.ZX;
						var d = g.R + "_";
						var c = GetC(b);
						var h = oGd.$;
						var f;
						var a;
						var e = b - 74;
						for (f = c - 2; f <= c; f++) {
							if (f > 9) {
								continue;
							}
							for (
								a = 2;
								a > -1;
								(p = h[d + f + "_" + a--]) &&
								(p.EName !== "oBrains"
									? p.AttackedRX >= e &&
										p.AttackedLX < b &&
										p.canEat &&
										((a = -1), (g.JudgeAttack = CZombies.prototype.JudgeAttack), g.NormalAttack(g.id, p.id, p.AttackedLX))
									: p.AttackedRX >= b &&
										p.AttackedLX < b &&
										((a = -1),
										(g.JudgeAttack = CZombies.prototype.JudgeAttack),
										(g.NormalAttack = CZombies.prototype.NormalAttack)(g.id, p.id)))
							) {}
						}
					},
					getCrushed(a) {
						this.NormalAttack(this.id, a.id, a.AttackedLX);
						this.getCrushed = function () {
							return false;
						};
						a.Stature > 0 &&
							oSym.addTask(
								50,
								(c) => {
									var b = $Z[c];
									b && b.CrushDie();
								},
								[this.id]
							);
						return false;
					},
					getRaven(a) {
						return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
					},
					NormalAttack(d, b, g) {
						var f = $Z[d];
						var a = f.Ele;
						var c = f.EleShadow;
						var e = f.EleBody;
						e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
						PlaySound2("grassstep");
						SetHidden(c);
						f.isAttacking = 1;
						f.Altitude = 2;
						f.getFreeze = function () {
							f.getSnowPea(f, 20);
						};
						oSym.addTask(
							50,
							(h) => {
								$Z[h] && PlaySound2("polevault");
							},
							[d]
						);
						oSym.addTask(
							100,
							(m, j, i, l, n) => {
								var h = $Z[m];
								var k;
								var q;
								var r;
								h &&
									((k = $P[j]) && k.Stature > 0
										? ((h.AttackedRX = (h.X = (h.AttackedLX = h.ZX = q = k.AttackedRX) - h.beAttackedPointL) + h.beAttackedPointR),
											SetStyle(i, {
												left: h.X + "px",
											}),
											(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
											SetVisible(l),
											(h.isAttacking = 0),
											(h.Altitude = 1),
											(h.OSpeed = h.Speed = 1.6),
											(h.NormalGif = 9),
											(h.LostHeadGif = 10),
											(h.NormalAttack = (r = CZombies.prototype).NormalAttack),
											(h.getCrushed = r.getCrushed),
											(h.getFreeze = r.getFreeze),
											(h.getRaven = r.getRaven))
										: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - h.beAttackedPointR) + h.beAttackedPointL),
											SetStyle(i, {
												left: h.X + "px",
											}),
											(n.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random()),
											SetVisible(l),
											oSym.addTask(
												80,
												(s, v) => {
													var u = $Z[s];
													var t;
													u &&
														((v.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif"),
														(u.isAttacking = 0),
														(u.Altitude = 1),
														(u.OSpeed = u.Speed = 1.6),
														(u.NormalGif = 9),
														(u.LostHeadGif = 10),
														(u.NormalAttack = (t = CZombies.prototype).NormalAttack),
														(u.getCrushed = t.getCrushed),
														(u.getFreeze = t.getFreeze),
														(u.getRaven = t.getRaven));
												},
												[m, n]
											)));
							},
							[d, b, a, c, e]
						);
					},
				});
				var OrnIIZombies = InheritO(OrnNoneZombies, {
					Ornaments: 2,
					BreakPoint: 91,
					NormalGif: 2,
					AttackGif: 3,
					LostHeadGif: 4,
					LostHeadAttackGif: 5,
					OrnLostNormalGif: 6,
					OrnLostAttackGif: 7,
					OrnLostHeadNormalGif: 8,
					OrnLostHeadAttackGif: 9,
					HeadGif: 10,
					DieGif: 11,
					BoomDieGif: 12,
				});
				var oNewspaperZombie = InheritO(OrnIIZombies, {
					EName: "oNewspaperZombie",
					CName: "读报僵尸",
					OrnHP: 150,
					Lvl: 2,
					LostPaperGif: 13,
					StandGif: 14,
					width: 216,
					height: 164,
					beAttackedPointL: 60,
					beAttackedPointR: 130,
					LostPaperSpeed: 4.8,
					PicArr: (function () {
						var a = "images/Zombies/NewspaperZombie/";
						return [
							"images/Card/Zombies/NewspaperZombie.png",
							a + "0.gif",
							a + "HeadWalk1.gif",
							a + "HeadAttack1.gif",
							a + "LostHeadWalk1.gif",
							a + "LostHeadAttack1.gif",
							a + "HeadWalk0.gif",
							a + "HeadAttack0.gif",
							a + "LostHeadWalk0.gif",
							a + "LostHeadAttack0.gif",
							a + "Head.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "LostNewspaper.gif",
							a + "1.gif",
						];
					})(),
					AudioArr: ["newspaper_rarrgh2"],
					Produce:
						'他的报纸只能提供有限的防御。<p>韧性：<font color="#CC241D">低</font><br>报纸韧性：<font color="#CC241D">低</font><br>速度：正常，而后快(失去报纸后)</p>读报僵尸，他正痴迷于完成他的数独难题。难怪他这么反常。',
					getShadow(a) {
						return "left:75px;top:" + (a.height - 25) + "px";
					},
					GoingDie(b) {
						var a = this;
						var c = a.id;
						a.EleBody.src = b;
						oSym.addTask(200, ClearChild, [
							NewImg(0, a.PicArr[a.HeadGif], "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDPZ),
						]);
						a.beAttacked = 0;
						a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = 0;
						a.AutoReduceHP(c);
					},
					getHurtOrnLost(j, a, g, m, c, l, k, i) {
						var e = this;
						if (!e.beAttacked) {
							k && e.DisappearDie();
							return;
						}
						var b = e.id;
						var h = e.HP;
						var d = e.PicArr;
						var f = e.isAttacking;
						switch (true) {
							case (h -= g) < 1:
								e.HP = 0;
								e.NormalDie();
								return;
							case h < 91:
								e.HP = h;
								e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
								return;
						}
						e.HP = h;
						switch (m) {
							case -1:
								e.getSlow(e, b, 1000);
								break;
							case 1:
								e.getFireball(e, b, a);
								break;
							default:
								!i && j === -1 && e.PlayNormalballAudio();
						}
						SetAlpha(e.EleBody, 50, 0.5);
						oSym.addTask(
							10,
							(q) => {
								var n = $Z[q];
								n && SetAlpha(n.EleBody, 100, 1);
							},
							[b]
						);
					},
					getSnowPea(c, a, b) {
						PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
						c.getHit0(c, a, b);
					},
					getFirePea(f, b, e) {
						f.PlayFireballAudio();
						(f.FreeSlowTime || f.FreeFreezeTime) && ((f.Speed = f.OSpeed), (f.FreeSlowTime = 0), (f.FreeFreezeTime = 0));
						f.Attack = 100;
						var d = f.AttackedLX;
						var g = f.AttackedRX;
						var a = oZ.getArZ(d, d + 40, f.R);
						var c = a.length;
						var h;
						while (c--) {
							(h = a[c]) !== this && h.getFirePeaSputtering();
						}
						(f.HP -= b) < f.BreakPoint
							? ((f.getFirePea = OrnNoneZombies.prototype.getFirePea),
								f.GoingDie(f.PicArr[[f.LostHeadGif, f.LostHeadAttackGif][f.isAttacking]]),
								(f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = function () {}))
							: (f.CheckOrnHP(f, f.id, f.OrnHP, b, f.PicArr, f.isAttacking, 0),
								f.SetAlpha(f, f.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(j, i) => {
										(i = $Z[j]) && i.SetAlpha(i, i.EleBody, 100, 1);
									},
									[f.id]
								));
					},
					getHit0(c, a, b) {
						b === c.WalkDirection
							? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
								c.SetAlpha(c, c.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(e, d) => {
										(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
									},
									[c.id]
								))
							: (c.HP -= a) < c.BreakPoint &&
								(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
								(c.getFirePea = OrnNoneZombies.prototype.getFirePea),
								(c.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
								(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
					},
					getHit1(b, a) {
						(b.HP -= a) < b.BreakPoint
							? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
								(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
								(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
								(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
							: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
								b.SetAlpha(b, b.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(d, c) => {
										(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
									},
									[b.id]
								));
					},
					getHit2(b, a) {
						(b.HP -= a) < b.BreakPoint
							? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
								(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
								(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
								(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
							: (b.SetAlpha(b, b.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(d, c) => {
										(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
									},
									[b.id]
								));
					},
					getHit3(b, a) {
						(b.HP -= a) < b.BreakPoint
							? (b.GoingDie(b.PicArr[[b.LostHeadGif, b.LostHeadAttackGif][b.isAttacking]]),
								(b.getFirePea = OrnNoneZombies.prototype.getFirePea),
								(b.getSnowPea = OrnNoneZombies.prototype.getSnowPea),
								(b.getHit = b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {}))
							: (b.CheckOrnHP(b, b.id, b.OrnHP, a, b.PicArr, b.isAttacking, 0),
								b.SetAlpha(b, b.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(d, c) => {
										(c = $Z[d]) && c.SetAlpha(c, c.EleBody, 100, 1);
									},
									[b.id]
								));
					},
					CheckOrnHP(g, h, d, c, f, b, a) {
						var e = OrnNoneZombies.prototype;
						(g.OrnHP = d -= c) < 1 &&
							(a && (g.HP += d),
							(g.ChkActs = function () {
								return 1;
							}),
							(g.ChkActs1 = function () {
								return 1;
							}),
							(g.EleBody.src = f[g.LostPaperGif] + $Random + Math.random()),
							(g.Ornaments = 0),
							(g.LostHeadGif = 8),
							(g.LostHeadAttackGif = 9),
							(g.getFirePea = e.getFirePea),
							(g.getSnowPea = e.getSnowPea),
							(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit),
							oSym.addTask(
								150,
								(m, l) => {
									var k = $Z[m];
									if (!k) {
										return;
									}
									var j = CZombies.prototype;
									var i = (k.OSpeed = k.LostPaperSpeed);
									k.ChkActs = j.ChkActs;
									k.ChkActs1 = j.ChkActs1;
									k.Speed && (k.Speed = !k.FreeSlowTime ? i : 0.5 * i);
									if (!k.beAttacked) {
										return;
									}
									PlaySound2("newspaper_rarrgh2");
									k.EleBody.src = l;
									k.JudgeAttack();
								},
								[h, f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]]
							));
					},
				});
				var oScreenDoorZombie = InheritO(oNewspaperZombie, {
					EName: "oScreenDoorZombie",
					CName: "铁栅门僵尸",
					OrnHP: 1100,
					Lvl: 3,
					SunNum: 100,
					StandGif: 13,
					width: 166,
					height: 144,
					beAttackedPointL: 60,
					beAttackedPointR: 116,
					PicArr: (function () {
						var a = "images/Zombies/ScreenDoorZombie/";
						var b = "images/Zombies/Zombie/";
						return [
							"images/Card/Zombies/ScreenDoorZombie.png",
							a + "0.gif",
							a + "HeadWalk1.gif",
							a + "HeadAttack1.gif",
							a + "LostHeadWalk1.gif",
							a + "LostHeadAttack1.gif",
							b + "Zombie2.gif",
							b + "ZombieAttack.gif",
							b + "ZombieLostHead.gif",
							b + "ZombieLostHeadAttack.gif",
							b + "ZombieHead.gif" + $Random,
							b + "ZombieDie.gif" + $Random,
							b + "BoomDie.gif" + $Random,
							a + "1.gif",
						];
					})(),
					PlayNormalballAudio() {
						PlaySound2("splat" + Math.floor(1 + Math.random() * 3));
					},
					Produce:
						'他的铁栅门是有效的盾牌。<p>韧性：<font color="#CC241D">低</font><br>铁栅门韧性：<font color="#CC241D">高</font><br>弱点：大喷菇和磁力菇</p>门板僵尸上次拜访过的房主防守并不专业，在吃掉房主的脑子后拿走了他家的铁栅门。',
					GoingDie: CZombies.prototype.GoingDie,
					getFirePea(c, a, b) {
						PlaySound2(
							b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3)
						);
						c.getHit0(c, a, b);
					},
					getFirePeaSputtering() {},
					getSnowPea(c, a, b) {
						PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
						c.getHit0(c, a, b);
					},
					getPea(c, a, b) {
						PlaySound2(
							b === c.WalkDirection ? ["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)] : "splat" + Math.floor(1 + Math.random() * 3)
						);
						c.getHit0(c, a, b);
					},
					getHit0(c, a, b) {
						b === c.WalkDirection
							? (c.CheckOrnHP(c, c.id, c.OrnHP, a, c.PicArr, c.isAttacking, 1),
								c.SetAlpha(c, c.EleBody, 50, 0.5),
								oSym.addTask(
									10,
									(e, d) => {
										(d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1);
									},
									[c.id]
								))
							: (c.HP -= a) < c.BreakPoint &&
								(c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]),
								(c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = function () {}));
					},
					CheckOrnHP(g, h, d, c, f, b, a) {
						var e = OrnNoneZombies.prototype;
						(g.OrnHP = d -= c) < 1 &&
							(a && (g.HP += d),
							(g.Ornaments = 0),
							(g.EleBody.src = f[[(g.NormalGif = g.OrnLostNormalGif), (g.AttackGif = g.OrnLostAttackGif)][b]]),
							(g.LostHeadGif = 8),
							(g.LostHeadAttackGif = 9),
							(g.getPea = e.getPea),
							(g.getFirePea = e.getFirePea),
							(g.getFirePeaSputtering = e.getFirePeaSputtering),
							(g.getSnowPea = g.getSnowPea),
							(g.PlayNormalballAudio = e.PlayNormalballAudio),
							(g.PlayFireballAudio = e.PlayFireballAudio),
							(g.PlaySlowballAudio = e.PlaySlowballAudio),
							(g.getHit = g.getHit0 = g.getHit1 = g.getHit2 = g.getHit3 = e.getHit));
					},
					getFireball(c, a, b) {
						b !== c.WalkDirection
							? ((c.FreeSlowTime = 0),
								(c.Attack = 100),
								c.Speed !== c.OSpeed ? (c.PlayNormalballAudio(), (c.Speed = c.OSpeed)) : c.PlayFireballAudio())
							: c.PlayNormalballAudio();
					},
					getSputtering() {},
					getSlow(d, a, c, b, e) {
						b !== d.WalkDirection || e !== -1 ? CZombies.prototype.getSlow(d, a, c) : d.PlayNormalballAudio();
					},
				});
				var oAquaticZombie = InheritO(OrnNoneZombies, {
					StandGif: 4,
					AttackGif: 5,
					HeadGif: 6,
					DieGif: 7,
					WalkGif0: 2,
					WalkGif1: 3,
					CanPass(b, a) {
						return a === 2;
					},
					BirthCallBack(g) {
						var e = g.delayT;
						var c = g.id;
						var b = (g.Ele = $(c));
						var d = g.AttackedLX;
						var f;
						var a;
						var h;
						f = g.EleShadow = b.firstChild;
						g.EleBody = b.childNodes[1];
						switch (true) {
							case d > GetX(9):
								g.ChkActs = g.ChkActsL1;
								g.WalkStatus = 0;
								break;
							case d < GetX(0):
								g.ChkActs = g.ChkActsL3;
								g.WalkStatus = 0;
								break;
							default:
								g.ChkActs = g.ChkActsL2;
								g.WalkStatus = 1;
								g.EleBody.src = g.PicArr[(g.NormalGif = g.WalkGif1)];
								SetHidden(f);
								NewEle(
									(a = c + "_splash"),
									"div",
									"position:absolute;background:url(images/interface/splash.png);left:61px;top:" +
										(g.height - 88) +
										"px;width:97px;height:88px;over-flow:hidden",
									0,
									b
								);
								ImgSpriter(
									a,
									c,
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
						}
						e
							? oSym.addTask(
									e,
									(j, i) => {
										var k = $Z[j];
										k && ((k.FreeSetbodyTime = 0), SetBlock(i));
									},
									[c, b]
								)
							: SetBlock(b);
					},
					ChkActsL1(f, e, g, d) {
						var c;
						var a;
						var b = f.id;
						!(f.FreeFreezeTime || f.FreeSetbodyTime) &&
							((f.AttackedRX -= c = f.Speed), (LX = f.ZX = f.AttackedLX -= c), (f.Ele.style.left = Math.floor((f.X -= c)) + "px"));
						f.AttackedLX < GetX(9) &&
							(PlaySound2("zombie_entering_water"),
							(f.WalkStatus = 1),
							(f.EleBody.src = f.PicArr[(f.NormalGif = f.WalkGif1)]),
							SetHidden(f.EleShadow),
							NewEle(
								(a = b + "_splash"),
								"div",
								"position:absolute;background:url(images/interface/splash.png);left:61px;top:" +
									(f.height - 88) +
									"px;width:97px;height:88px;over-flow:hidden",
								0,
								f.Ele
							),
							(f.ChkActs = f.ChkActsL2),
							ImgSpriter(
								a,
								b,
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
								(h, i) => {
									ClearChild($(h));
								}
							));
						return 1;
					},
					ChkActsL2(d, c, e, b) {
						var a;
						!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
							(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
							!d.isAttacking && ((d.AttackedRX -= a = d.Speed), (d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px")));
						d.AttackedLX < GetX(0) &&
							((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActsL3));
						return 1;
					},
					ChkActsL3: CZombies.prototype.ChkActs,
					ChkActs1(d, c, e, b) {
						var a;
						!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
							(d.beAttacked && !d.isAttacking && d.JudgeAttack(),
							!d.isAttacking && ((d.AttackedLX += a = d.Speed), (d.ZX = d.AttackedRX += a), (d.Ele.style.left = Math.ceil((d.X += a)) + "px")));
						d.AttackedLX > GetX(9) &&
							((d.WalkStatus = 0), (d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]), SetVisible(d.EleShadow), (d.ChkActs = d.ChkActs2));
						return 1;
					},
					ChkActs2(e, c, f, b) {
						var a;
						var d;
						!(e.FreeFreezeTime || e.FreeSetbodyTime)
							? (e.beAttacked && !e.isAttacking && e.JudgeAttack(),
								!e.isAttacking
									? (e.AttackedLX += a = e.Speed) > oS.W
										? (f.splice(b, 1), e.DisappearDie(), (d = 0))
										: ((e.ZX = e.AttackedRX += a), (e.Ele.style.left = Math.ceil((e.X += a)) + "px"), (d = 1))
									: (d = 1))
							: (d = 1);
						return d;
					},
					ExchangeLR(d, b) {
						var c = d.width;
						var f = d.beAttackedPointL;
						var a = d.beAttackedPointR;
						var e = d.Ele;
						e.style.left = (d.X = d.AttackedLX - (d.beAttackedPointL = c - a)) + "px";
						d.beAttackedPointR = c - f;
						d.EleShadow.style.cssText = "visibility:hidden;left:" + (d.beAttackedPointL - 10) + "px;top:" + (d.height - 22) + "px";
						d.ExchangeLR2(d, d.EleBody, b);
					},
					GoingDie() {
						var b = this;
						var c = b.id;
						var a = b.PicArr;
						b.EleBody.src = a[7];
						b.GoingDieHead(c, a, b);
						b.beAttacked = 0;
						b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
						b.AutoReduceHP(c);
					},
					AutoReduceHP(a) {
						oSym.addTask(
							100,
							function (c) {
								var b = $Z[c];
								b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(50, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
							},
							[a]
						);
					},
					ExplosionDie() {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
					DisappearDie() {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
					CrushDie() {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
					NormalDie() {
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
				});
				var oDuckyTubeZombie1 = InheritO(oAquaticZombie, {
					EName: "oDuckyTubeZombie1",
					CName: "鸭子救生圈僵尸",
					beAttackedPointR: 130,
					GetDY() {
						return 5;
					},
					Produce:
						'鸭子救生圈能让僵尸能浮在水面上。<p>韧性：<font color="#CC241D">低</font><br>只在水池关卡出现</font></p>只有特定的僵尸才能成为救生圈僵尸。并不是每个僵尸都能胜任的。有些救生圈有点漏气，但他们没能注意到，所以他们离开并放弃了对脑子的渴求。',
					PicArr: (function () {
						var a = "images/Zombies/DuckyTubeZombie1/";
						return [
							"images/Card/Zombies/DuckyTubeZombie1.png",
							a + "0.gif",
							a + "Walk1.gif",
							a + "Walk2.gif",
							a + "1.gif",
							a + "Attack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
							a + "Die.gif" + $Random,
						];
					})(),
					AudioArr: ["zombie_entering_water"],
				});
				var oDuckyTubeZombie2 = InheritO(oDuckyTubeZombie1, {
					EName: "oDuckyTubeZombie2",
					CName: "路障鸭子救生圈僵尸",
					OrnHP: 370,
					Lvl: 2,
					SunNum: 75,
					CanDisplay: 0,
					OrnLostNormalGif: 9,
					OrnLostAttackGif: 10,
					PlayNormalballAudio() {
						PlaySound2("plastichit");
					},
					PicArr: (function () {
						var b = "images/Zombies/DuckyTubeZombie2/";
						var a = "images/Zombies/DuckyTubeZombie1/";
						return [
							"images/Card/Zombies/DuckyTubeZombie1.png",
							b + "0.gif",
							b + "Walk1.gif",
							b + "Walk2.gif",
							b + "1.gif",
							b + "Attack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "Walk1.gif",
							a + "Walk2.gif",
							a + "Attack.gif",
						];
					})(),
					AudioArr: ["plastichit", "zombie_entering_water"],
					getHit: OrnIZombies.prototype.getHit,
					getHit0: OrnIZombies.prototype.getHit0,
					getHit1: OrnIZombies.prototype.getHit1,
					getHit2: OrnIZombies.prototype.getHit2,
					getHit3: OrnIZombies.prototype.getHit3,
				});
				var oDuckyTubeZombie3 = InheritO(oDuckyTubeZombie2, {
					EName: "oDuckyTubeZombie3",
					CName: "铁桶鸭子救生圈僵尸",
					OrnHP: 1100,
					Lvl: 3,
					SunNum: 125,
					PlayNormalballAudio() {
						PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
					},
					AudioArr: ["shieldhit", "shieldhit2", "zombie_entering_water"],
					PicArr: (function () {
						var b = "images/Zombies/DuckyTubeZombie3/";
						var a = "images/Zombies/DuckyTubeZombie1/";
						return [
							"images/Card/Zombies/DuckyTubeZombie1.png",
							b + "0.gif",
							b + "Walk1.gif",
							b + "Walk2.gif",
							b + "1.gif",
							b + "Attack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "Walk1.gif",
							a + "Walk2.gif",
							a + "Attack.gif",
						];
					})(),
				});
				var oSnorkelZombie = InheritO(oDuckyTubeZombie1, {
					EName: "oSnorkelZombie",
					CName: "潜水僵尸",
					Lvl: 1,
					SunNum: 75,
					width: 143,
					height: 200,
					beAttackedPointL: 40,
					beAttackedPointR: 100,
					OSpeed: 3.2,
					Speed: 3.2,
					Altitude: 1,
					AlmanacGif: 4,
					Produce:
						'潜水僵尸可以在水下前行。<p>韧性：<font color="#CC241D">低</font><br>特点：<font color="#CC241D">潜泳以避免遭到攻击<br>只在水池关卡出现</font></p>僵尸不呼吸。他们不需要空气。那么为什么潜水僵尸需要一套潜水装置来潜水呢？<br>答案：同行的压力。',
					JumpTime: 40,
					getShadow(a) {
						return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
					},
					PicArr: (function () {
						var a = "images/Zombies/SnorkelZombie/";
						return [
							"images/Card/Zombies/SnorkelZombie.png",
							a + "0.gif",
							a + "Walk1.gif",
							a + "Walk2.gif",
							a + "1.gif",
							a + "Attack.gif",
							a + "Head.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "Jump.gif" + $Random,
							a + "Risk.gif" + $Random,
							a + "Sink.gif" + $Random,
						];
					})(),
					AudioArr: ["zombie_entering_water"],
					BirthCallBack(a) {
						(oAquaticZombie.prototype.BirthCallBack(a), GetC(this.ZX) <= 9 && this.Jump(this));
					},
					Jump(a) {
						a.beAttacked &&
							(PlaySound2("zombie_entering_water"),
							(a.Altitude = 2),
							SetHidden(a.EleShadow),
							(a.EleBody.src = a.PicArr[8]),
							oSym.addTask(
								160,
								(c, b) => {
									$Z[c] &&
										b.beAttacked &&
										((b.WalkStatus = 1),
										(b.Altitude = 0),
										(b.OSpeed = b.Speed = 2),
										(b.EleBody.src = b.PicArr[(b.NormalGif = b.WalkGif1)]),
										(b.ChkActs = b.ChkActsL2));
								},
								[a.id, a]
							),
							(a.ChkActs = function () {
								return 1;
							}));
					},
					ChkActsL1(d, c, e, b) {
						if (d.JumpTime <= 0) {
							d.Jump(d);
							return 1;
						}
						var a;
						!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
							((d.AttackedRX -= a = d.Speed), (LX = d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px"), --d.JumpTime);
						return 1;
					},
					ChkActsL2(d, c, e, b) {
						var a;
						!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
							(d.AttackedLX > GetX(0)
								? (d.beAttacked && !d.isAttacking && d.JudgeAttack(),
									!d.isAttacking &&
										((d.AttackedRX -= a = d.Speed), (d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px")))
								: d.beAttacked &&
									((d.WalkStatus = 0),
									(d.Altitude = 1),
									(d.EleBody.src = d.PicArr[(d.NormalGif = d.WalkGif0)]),
									SetVisible(d.EleShadow),
									(d.ChkActs = d.ChkActsL3)));
						return 1;
					},
					JudgeAttack() {
						var e = this;
						var b = e.ZX;
						var c = e.R + "_";
						var d = GetC(b);
						var g = oGd.$;
						var a;
						var f = e.id;
						(a = e.JudgeLR(e, c, d, b, g) || e.JudgeSR(e, c, d, b, g))
							? !e.isAttacking
								? ((e.isAttacking = 1),
									(e.EleBody.src = e.PicArr[9]),
									oSym.addTask(
										50,
										(i, h) => {
											$Z[i] && h.beAttacked && ((h.EleBody.src = h.PicArr[h.AttackGif]), (h.Altitude = 1), h.NormalAttack(a[0], a[1]));
										},
										[f, e]
									))
								: e.NormalAttack(a[0], a[1])
							: e.isAttacking &&
								((e.EleBody.src = e.PicArr[10]),
								(e.Altitude = 0),
								oSym.addTask(
									70,
									(i, h) => {
										$Z[i] && h.beAttacked && ((h.isAttacking = 0), (h.EleBody.src = h.PicArr[h.NormalGif]));
									},
									[f, e]
								));
					},
					NormalAttack(b, a) {
						oSym.addTask(
							100,
							(d, c) => {
								var f = $Z[d];
								var e;
								f && f.beAttacked && !f.FreeFreezeTime && !f.FreeSetbodyTime && ((e = $P[c]) && e.getHurt(f, 0, 100), f.JudgeAttack());
							},
							[b, a]
						);
					},
					JudgeAttackH() {
						var c = this;
						var b = oZ.getZ0(c.ZX, c.R);
						var d = c.id;
						var a;
						b && b.beAttacked && b.AttackedLX < 900 && b.Altitude < 2
							? !c.isAttacking
								? ((c.isAttacking = 1),
									(c.EleBody.src = c.PicArr[9]),
									(a = b.id),
									!b.isAttacking && b.AttackZombie2(b, a, d),
									oSym.addTask(
										50,
										(g, h, f, e) => {
											$Z[h] &&
												g.beAttacked &&
												($Z[e] && f.beAttacked
													? ((g.EleBody.src = g.PicArr[g.AttackGif]), (g.Altitude = 1), g.AttackZombie(h, e))
													: g.JudgeAttackH());
										},
										[c, d, b, a]
									))
								: c.AttackZombie(d, a)
							: c.isAttacking &&
								((c.EleBody.src = c.PicArr[10]),
								(c.Altitude = 0),
								oSym.addTask(
									70,
									(f, e) => {
										$Z[f] && e.beAttacked && ((e.isAttacking = 0), (e.EleBody.src = e.PicArr[e.NormalGif]));
									},
									[d, c]
								));
					},
					AttackZombie2(c, b, a) {
						c.isAttacking = 1;
						c.EleBody.src = c.PicArr[9];
						oSym.addTask(
							50,
							(g, e, d, f) => {
								$Z[e] &&
									g.beAttacked &&
									((f = $Z[d]) && f.beAttacked
										? ((g.EleBody.src = g.PicArr[g.AttackGif]),
											(g.Altitude = 1),
											oSym.addTask(
												10,
												function (k, i, j, h) {
													$Z[i] &&
														k.beAttacked &&
														!k.FreeFreezeTime &&
														!k.FreeSetbodyTime &&
														($Z[h] && j.beAttacked
															? (j.getHit0(j, 10, 0), oSym.addTask(10, arguments.callee, [k, i, j, h]))
															: ((k.EleBody.src = k.PicArr[10] + Math.random()),
																(k.Altitude = 0),
																oSym.addTask(
																	70,
																	(l, m) => {
																		$Z[l] && m.beAttacked && ((m.isAttacking = 0), (m.EleBody.src = m.PicArr[m.NormalGif]));
																	},
																	[i, k]
																)));
												},
												[g, e, f, d]
											))
										: ((g.EleBody.src = g.PicArr[10] + Math.random()),
											(g.Altitude = 0),
											oSym.addTask(
												70,
												(h, i) => {
													$Z[h] && i.beAttacked && ((i.isAttacking = 0), (i.EleBody.src = i.PicArr[i.NormalGif]));
												},
												[e, g]
											)));
							},
							[c, b, a]
						);
					},
					AutoReduceHP(a) {
						oSym.addTask(
							100,
							function (c) {
								var b = $Z[c];
								b && ((b.HP -= 60) < 1 ? (b.NormalDie(), oSym.addTask(200, ClearChild, [b.Ele])) : oSym.addTask(100, arguments.callee, [c]));
							},
							[a]
						);
					},
				});
				var oSmallZombie = InheritO(oZombie, {
					EName: "oSmallZombie",
					CName: "小领带僵尸",
					HP: 67,
					width: 83,
					height: 72,
					beAttackedPointL: 41,
					beAttackedPointR: 78,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:83px;height:72px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
					},
				});
				var oSmallFlagZombie = InheritO(oFlagZombie, {
					EName: "oSmallFlagZombie",
					CName: "小旗帜僵尸",
					HP: 67,
					width: 83,
					height: 72,
					beAttackedPointL: 41,
					beAttackedPointR: 78,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:83px;height:72px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
					},
				});
				var oSmallDuckyTubeZombie1 = InheritO(oDuckyTubeZombie1, {
					EName: "oSmallDuckyTubeZombie1",
					CName: "小鸭子救生圈僵尸",
					HP: 67,
					width: 83,
					height: 72,
					beAttackedPointL: 41,
					beAttackedPointR: 73,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:83px;height:72px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
					},
				});
				var oSmallConeheadZombie = InheritO(oConeheadZombie, {
					EName: "oSmallConeheadZombie",
					CName: "小路障僵尸",
					OrnHP: 92,
					HP: 67,
					width: 83,
					height: 72,
					beAttackedPointL: 41,
					beAttackedPointR: 78,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:83px;height:72px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + (a.beAttackedPointL - 5) + "px;top:" + (a.height - 15) + "px";
					},
				});
				var oSmallFootballZombie = InheritO(oFootballZombie, {
					EName: "oSmallFootballZombie",
					CName: "小橄榄球僵尸",
					OrnHP: 350,
					HP: 67,
					width: 77,
					height: 80,
					beAttackedPointL: 20,
					beAttackedPointR: 77,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:77px;height:80px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:75px;height:93px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + (a.beAttackedPointL + 15) + "px;top:" + (a.height - 22) + "px";
					},
				});
				var oSmallSnorkelZombie = InheritO(oSnorkelZombie, {
					EName: "oSmallSnorkelZombie",
					CName: "小潜水僵尸",
					HP: 67,
					width: 71,
					height: 100,
					beAttackedPointL: 20,
					beAttackedPointR: 50,
					BreakPoint: 25,
					Init(e, g, c, b) {
						var a = 0;
						var f = this;
						var d = [];
						g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = e) - g.beAttackedPointL) + g.beAttackedPointR;
						while (--b) {
							g.CanPass(b, c[b]) && (d[a++] = b);
						}
						g.ArR = d;
						g.ArHTML = [
							'<div id="',
							'" style="position:absolute;display:',
							";left:",
							"px;top:",
							"px;z-index:",
							'"><img src="' + ShadowPNG + '" style="' + g.getShadow(g) + '"><img style="position:absolute;clip:rect(0,auto,',
							",0);width:71px;height:100px;top:",
							'px" src="',
							'"></div>',
						];
					},
					GoingDieHead(c, a, b) {
						oSym.addTask(200, ClearChild, [
							NewImg(
								0,
								a[b.HeadGif],
								"width:71px;height:105px;left:" + b.AttackedLX + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex,
								EDPZ
							),
						]);
					},
					getShadow(a) {
						return "width:43px;height:18px;left:" + a.beAttackedPointL + "px;top:" + (a.height - 45) + "px";
					},
				});
				var oZomboni = (function () {
					var a = function (d, b) {
						var c = d.HP;
						switch (true) {
							case (d.HP = c -= b) < 200:
								d.GoingDie();
								d.getHit0 = d.getHit1 = d.getHit2 = d.getHit3 = function () {};
								return;
							case c < 391:
								d.EleBody.src = "images/Zombies/Zomboni/3.gif";
								break;
							case c < 871:
								d.EleBody.src = "images/Zombies/Zomboni/2.gif";
						}
						d.SetAlpha(d, d.EleBody, 50, 0.5);
						oSym.addTask(
							10,
							(f, e) => {
								(e = $Z[f]) && e.SetAlpha(e, e.EleBody, 100, 1);
							},
							[d.id]
						);
					};
					return InheritO(OrnNoneZombies, {
						EName: "oZomboni",
						CName: "冰车僵尸",
						HP: 1350,
						Lvl: 3,
						StandGif: 2,
						DieGif: 6,
						BoomDieGif: 7,
						BookHandPosition: "40% 35%",
						width: 464,
						height: 364,
						GetDTop: 104,
						beAttackedPointL: 140,
						beAttackedPointR: 290,
						BreakPoint: 200,
						SunNum: 350,
						GetDY() {
							return 0;
						},
						OSpeed: 2.5,
						Speed: 2.5,
						AKind: 2,
						Attack: 50,
						Produce:
							'冰车僵尸运用冰雪，碾过你的植物。<p>韧性：<font color="#CC241D">高</font><br>特点：<font color="#CC241D">碾压植物，留下条冰道</font></p>经常被误以为是在驾驶着冰车的僵尸，但事实上冰车僵尸是种完全不同的生物形式，他与太空兽人联系更紧密而不是僵尸。',
						PicArr: (function () {
							var b = "images/Zombies/Zomboni/";
							return [
								"images/Card/Zombies/Zomboni.png",
								b + "0.gif",
								b + "1.gif",
								b + "2.gif",
								b + "3.gif",
								b + "4.gif",
								b + "5.gif" + $Random,
								b + "BoomDie.gif" + $Random,
								b + "ice.png",
								b + "ice_cap.png",
							];
						})(),
						AudioArr: ["zamboni", "explosion"],
						BirthCallBack(h) {
							var g = h.delayT;
							var e = h.id;
							var c = (h.Ele = $(e));
							var d = h.R;
							var f;
							var b = oGd.$Ice;
							h.EleShadow = c.firstChild;
							h.EleBody = c.childNodes[1];
							!b[d]
								? ((f = NewEle(
										"dIceCar" + d,
										"div",
										"position:absolute;z-index:1;left:145px;top:" + (GetY(d) - 65) + "px;width:800px;height:72px",
										0,
										EDPZ
									)),
									NewImg(
										"",
										"images/interface/blank.png",
										"position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/Zomboni/ice.png) repeat-x",
										f
									),
									NewImg("", "images/Zombies/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", f),
									(b[d] = [1, 11, h.AttackedLX]))
								: ++b[d][0];
							g
								? oSym.addTask(
										g,
										(j, i) => {
											var k = $Z[j];
											k && ((k.FreeSetbodyTime = 0), SetBlock(i), PlaySound2("zamboni"));
										},
										[e, c]
									)
								: (SetBlock(c), PlaySound2("zamboni"));
						},
						ChkActs(e, j, q, k) {
							var b;
							var r;
							var m;
							var g;
							var n = oGd.$Ice[j];
							var d;
							var h;
							var f;
							var c;
							var l = $("dIceCar" + j);

							if (l == null) {
								// 对没有冰道的情况下特判
								l = NewEle(
									"dIceCar" + j,
									"div",
									"position:absolute;z-index:1;left:145px;top:" + (GetY(e.R) - 65) + "px;width:800px;height:72px",
									0,
									EDPZ
								); // 生成新的冰道
								NewImg(
									"",
									"images/interface/blank.png",
									"position:absolute;clip:rect(0,auto,auto,800px);width:800px;height:72px;left:5px;background:url(images/Zombies/Zomboni/ice.png) repeat-x",
									l
								);
								NewImg("", "images/Zombies/Zomboni/ice_cap.png", "position:absolute;display:none;left:0", l);
								n = oGd.$Ice[j] = [1, 11, e.AttackedLX];
							}

							e.JudgeAttack();
							(r = e.AttackedRX -= b = e.Speed) < -50
								? (q.splice(k, 1), e.DisappearDie(), (m = 0))
								: (r < 100 &&
										!e.PointZombie &&
										((e.PointZombie = 1),
										!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
										e.ChangeR({
											R: j,
											ar: [oS.R - 1],
											CustomTop: 400 - e.height + e.GetDY(),
										})),
									(e.ZX = e.AttackedLX -= b),
									(e.Ele.style.left = Math.floor((e.X -= b)) + "px"),
									(m = 1));
							d = e.X;
							h = d + 250;
							f = d + 100;
							c = GetC(h);
							c > -1 && c < n[1] && ((oGd.$Crater[j + "_" + c] = 1), (n[1] = c));
							h > 120 &&
								h < n[2] &&
								((n[2] = h), (l.firstChild.style.clip = "rect(0,auto,auto," + f + "px)"), (l.childNodes[1].style.left = Math.max(0, f) + "px"));
							GetC(e.AttackedLX) > 5 && (e.OSpeed = e.Speed -= 0.005);
							return m;
						},
						ChkActs1(f, d, g, c) {
							var b;
							var e;
							f.JudgeAttack();
							(f.AttackedLX += b = f.Speed) > oS.W
								? (g.splice(c, 1), f.DisappearDie(), (e = 0))
								: ((f.ZX = f.AttackedRX += b), (f.Ele.style.left = Math.ceil((f.X += b)) + "px"), (e = 1));
							return e;
						},
						getPea(c, b) {
							PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
							c.getHit0(c, b);
						},
						getFirePea(c, b) {
							PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
							c.getHit0(c, b);
						},
						getSnowPea(c, b) {
							PlaySound2(["shieldhit", "shieldhit2"][Math.floor(Math.random() * 2)]);
							c.getHit0(c, b);
						},
						getFirePeaSputtering() {},
						getFreeze(c, b) {
							c.getHit0(c, 20);
						},
						getShadow(b) {
							return "left:" + (b.beAttackedPointL - 10) + "px;top:" + (b.height - 22) + "px";
						},
						getHit: a,
						getHit0: a,
						getHit1: a,
						getHit2: a,
						getHit3: a,
						GoingDie() {
							var b = this;
							b.beAttacked = 0;
							b.AutoReduceHP(b.id);
						},
						NormalDie() {
							var b = this;
							PlaySound2("explosion");
							b.EleBody.src = b.PicArr[b.DieGif];
							oSym.addTask(70, ClearChild, [b.Ele]);
							b.HP = 0;
							delete $Z[b.id];
							b.JudgeIce();
							b.PZ && oP.MonPrgs();
						},
						DisappearDie() {
							var b = this;
							ClearChild(b.Ele);
							b.HP = 0;
							delete $Z[b.id];
							b.JudgeIce();
							b.PZ && oP.MonPrgs();
						},
						ExplosionDie() {
							var b = this;
							b.EleBody.src = b.PicArr[b.BoomDieGif];
							oSym.addTask(300, ClearChild, [b.Ele]);
							b.HP = 0;
							delete $Z[b.id];
							b.JudgeIce();
							b.PZ && oP.MonPrgs();
						},
						CrushDie() {
							this.NormalDie();
						},
						JudgeIce() {
							var d = this;
							var b = d.R;
							var e = $("dIceCar" + b);
							var c = oGd.$Ice[b];

							if (d.PointZombie) {
								return;
							} // 如果冰车已经进入家门，则不产冰

							e && e.childNodes[1] && SetBlock(e.childNodes[1]);
							--c[0] <= 0 &&
								oSym.addTask(
									3000,
									(k, h) => {
										var j = oGd.$Ice[h];
										var g;
										var f = oGd.$Crater;
										if (j && j[0] <= 0 && k) {
											ClearChild(k);
											g = j[1];
											while (g < 11) {
												delete f[h + "_" + g++];
												delete oGd.$Ice[h];
											}
										}
									},
									[e, b]
								);
						},
						flatTire() {
							var b = this;
							b.EleBody.src = "images/Zombies/Zomboni/4.gif";
							b.beAttacked = 0;
							b.HP = 0;
							b.getHit0 = b.getHit1 = b.getHit2 = b.getHit3 = function () {};
							b.ChkActs = b.ChkActs1 = function () {};
							oSym.addTask(
								290,
								(e, c) => {
									var d = $Z[e];
									d && d.NormalDie();
								},
								[b.id, b.EleBody]
							);
						},
						JudgeAttack() {
							var f = this;
							var c = f.ZX;
							var d = f.R + "_";
							var e = GetC(c);
							var g = oGd.$;
							var b;
							(b = f.JudgeLR(f, d, e, c, g) || f.JudgeSR(f, d, e, c, g)) && f.NormalAttack(b[0], b[1]);
						},
						JudgeLR(e, c, d, b, f) {
							return d > 10 || d < 1
								? false
								: (function () {
										c += --d + "_";
										var g = 3;
										var h;
										while (g--) {
											if ((h = f[c + g])) {
												return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
											}
										}
									})();
						},
						JudgeSR(e, c, d, b, f) {
							return d > 9
								? false
								: (function () {
										c += d + "_";
										var g = 3;
										var h;
										while (g--) {
											if ((h = f[c + g])) {
												return h.AttackedRX >= b && h.AttackedLX <= b ? [e.id, h.id] : false;
											}
										}
									})();
						},
						NormalAttack(c, b) {
							var d = $Z[c];
							$P[b].getHurt(d, 2, d.Attack);
						},
						getThump() {
							this.NormalDie();
						},
						prepareBirth(f, R) {
							var h = this;
							var e = h.ArR;
							var d = R || e[Math.floor(Math.random() * e.length)];
							var g = GetY(d) + h.GetDY();
							var c = g - h.height;
							var j = 3 * d + 1;
							var i = (h.id = "Z_" + Math.random());

							((h.R = d), (h.pixelTop = c), (h.zIndex = j), (h.delayT = 0)); // 设置其本身不受 delayT 影响

							return h.getHTML(i, h.X, c, j, "none", "auto", h.GetDTop, h.PicArr[h.NormalGif]);
						},
					});
				})();
				var oDolphinRiderZombie = InheritO(oAquaticZombie, {
					EName: "oDolphinRiderZombie",
					CName: "海豚骑士僵尸",
					HP: 500,
					Lvl: 2,
					BreakPoint: 167,
					width: 282,
					height: 210,
					Lvl: 2,
					getShadow(a) {
						return "left:105px;top:175px";
					},
					GetDX() {
						return -137;
					},
					GetDY() {
						return 0;
					},
					GetDTop: 0,
					Altitude: 1,
					haveDolphin: 1,
					JumpTime: 45,
					beAttackedPointL: 110,
					beAttackedPointR: 190,
					SunNum: 75,
					OSpeed: 3.2,
					Speed: 3.2,
					PicArr: (function () {
						var a = "images/Zombies/DolphinRiderZombie/";
						return [
							"images/Card/Zombies/DolphinRiderZombie.png",
							a + "0.gif",
							a + "Walk1.gif",
							a + "Walk2.gif",
							a + "1.gif",
							a + "Attack.gif",
							a + "Head.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "Jump.gif" + $Random,
							a + "Jump2.gif" + $Random,
							a + "Walk3.gif",
							a + "Walk4.gif",
							a + "Die2.gif" + $Random,
							a + "Jump3.gif" + $Random,
						];
					})(),
					AudioArr: ["dolphin_before_jumping", "dolphin_appears", "zombie_entering_water"],
					Produce:
						'海豚骑士僵尸善于利用你水池防御的弱点。<p>韧性：<font color="#CC241D">中</font><br>速度：<font color="#CC241D">快，慢（跳越后）</font><br>特点：<font color="#CC241D">跃过他所遇到的第一株植物</font><br>只在水池关卡出现</font></p>那海豚其实也是个僵尸。',
					BirthCallBack(a) {
						PlaySound2("dolphin_appears");
						(oAquaticZombie.prototype.BirthCallBack(a), GetC(this.ZX) <= 9 && this.Jump(this));
					},
					Jump(a) {
						a.beAttacked &&
							(PlaySound2("zombie_entering_water"),
							(a.Altitude = 2),
							SetHidden(a.EleShadow),
							(a.EleBody.src = a.PicArr[8]),
							oSym.addTask(
								240,
								(d, b) => {
									var c;
									$Z[d] &&
										b.beAttacked &&
										((b.WalkStatus = 1),
										(b.Altitude = 1),
										(b.OSpeed = b.Speed = 10.8),
										SetStyle(b.Ele, {
											left: (c = b.X -= 140) + "px",
										}),
										(b.AttackedLX = c + (b.beAttackedPointL = 185)),
										(b.AttackedRX = c + (b.beAttackedPointR = 265)),
										(b.EleBody.src = b.PicArr[(b.NormalGif = b.WalkGif1)]),
										(b.ChkActs = b.ChkActsL2));
								},
								[a.id, a]
							),
							(a.ChkActs = function () {
								return 1;
							}));
					},
					ChkActsL1(d, c, e, b) {
						if (d.JumpTime <= 0) {
							d.Jump(d);
							return 1;
						}
						var a;
						!(d.FreeFreezeTime || d.FreeSetbodyTime) &&
							((d.AttackedRX -= a = d.Speed), (LX = d.ZX = d.AttackedLX -= a), (d.Ele.style.left = Math.floor((d.X -= a)) + "px"), --d.JumpTime);
						return 1;
					},
					getCrushed(a) {
						this.NormalAttack(this.id, a.id, a.AttackedLX);
						this.getCrushed = function () {
							return false;
						};
						a.Stature > 0 &&
							oSym.addTask(
								50,
								(c) => {
									var b = $Z[c];
									b && b.CrushDie();
								},
								[this.id]
							);
						return false;
					},
					getRaven(a) {
						return (!this.isAttacking && this.NormalAttack(this.id, a, $P[a].AttackedLX), 0);
					},
					JudgeAttack() {
						var f = this;
						var b = f.ZX;
						var d = f.R + "_";
						var c = GetC(b);
						var g = oGd.$;
						var e;
						var a;
						for (e = c - 2; e <= c; e++) {
							if (e > 9) {
								continue;
							}
							for (
								a = 2;
								a > -1;
								(p = g[d + e + "_" + a--]) &&
								(p.EName !== "oBrains"
									? p.AttackedRX >= b &&
										p.AttackedLX < b &&
										((a = -1), (f.JudgeAttack = CZombies.prototype.JudgeAttack), f.NormalAttack(f.id, p.id, p.AttackedLX))
									: p.AttackedRX >= b &&
										p.AttackedLX < b &&
										((a = -1),
										(f.JudgeAttack = CZombies.prototype.JudgeAttack),
										(f.NormalAttack = CZombies.prototype.NormalAttack)(f.id, p.id)))
							) {}
						}
					},
					AttackZombie2(c, b, a) {
						c.NormalAttack(b, a, $Z[a].AttackedLX);
					},
					NormalAttack(d, b, g) {
						var f = $Z[d];
						var a = f.Ele;
						var c = f.EleShadow;
						var e = f.EleBody;
						e.src = f.PicArr[9];
						SetHidden(c);
						f.isAttacking = 1;
						f.Altitude = 2;
						f.haveDolphin = 0;
						PlaySound2("dolphin_before_jumping");
						f.getFreeze = function () {
							f.getSnow(f, 20, 0);
						};
						oSym.addTask(
							50,
							(m, j, i, l, q) => {
								var h = $Z[m];
								var k;
								var r;
								var s;
								var n = function () {
									q.src = h.PicArr[10];
									h.isAttacking = 0;
									h.Altitude = 1;
									h.OSpeed = h.Speed = 1.6;
									h.WalkGif0 = 11;
									h.NormalGif = h.WalkGif1 = 10;
									h.LostHeadGif = h.DieGif = 12;
									h.NormalAttack = (s = CZombies.prototype).NormalAttack;
									h.getCrushed = s.getCrushed;
									h.getFreeze = s.getFreeze;
									h.getRaven = s.getRaven;
									h.AttackZombie2 = s.AttackZombie2;
								};
								h &&
									((k = $P[j]) && k.Stature > 0
										? ((h.AttackedRX =
												(h.X = (h.AttackedLX = h.ZX = r = k.AttackedRX) - (h.beAttackedPointL = 45)) + (h.beAttackedPointR = 100)),
											SetStyle(i, {
												left: h.X + "px",
											}),
											(h.EleShadow.style.left = "45px"),
											n())
										: ((h.ZX = h.AttackedLX = (h.X = (h.AttackedRX = g) - (h.beAttackedPointR = 100)) + (h.beAttackedPointL = 45)),
											SetStyle(i, {
												left: h.X + "px",
											}),
											(h.EleShadow.style.left = "45px"),
											(q.src = h.PicArr[13] + Math.random()),
											oSym.addTask(
												170,
												(t, w) => {
													var v = $Z[t];
													var u;
													v && n();
												},
												[m, q]
											)));
							},
							[d, b, a, c, e]
						);
					},
					GoingDie() {
						var b = this;
						var c = b.id;
						var a = b.PicArr;
						b.EleBody.src = a[b.haveDolphin ? 7 : 12];
						b.GoingDieHead(c, a, b);
						b.beAttacked = 0;
						b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
						b.AutoReduceHP(c);
					},
				});
				var oImp = InheritO(OrnNoneZombies, {
					EName: "oImp",
					CName: "小鬼僵尸",
					HP: 70,
					BreakPoint: 23,
					beAttackedPointL: 30,
					beAttackedPointR: 60,
					width: 81,
					height: 110,
					StandGif: 5,
					NormalGif: 5,
					DieGif: 3,
					BoomDieGif: 4,
					AttackGif: 2,
					OSpeed: 5.4,
					Speed: 5.4,
					GetDX() {
						return -50;
					},
					GetDY() {
						return 0;
					},
					getShadow(a) {
						return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 32) + "px";
					},
					Produce:
						'小淘气们是一群小型僵尸，他们被伽刚特尔用来投掷进你的防御体系。</p><p>韧性：<font color="#CC241D">低</font><br>小淘气虽然瘦小，却很结实。他精通僵尸柔道，僵尸空手道和僵尸关节技。另外，他还会吹口琴。',
					GoingDie() {
						var b = this;
						var c = b.id;
						var a = b.PicArr;
						b.EleBody.src = a[3];
						b.beAttacked = 0;
						b.FreeFreezeTime = b.FreeSetbodyTime = b.FreeSlowTime = 0;
						b.AutoReduceHP(c);
					},
					NormalDie() {
						var a = this;
						oSym.addTask(250, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					CrushDie() {
						var a = this;
						ClearChild(a.Ele);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					PicArr: (function () {
						var a = "images/Zombies/Imp/";
						return [
							"images/Card/Zombies/Imp.png",
							a + "0.gif",
							a + "Attack.gif",
							a + "Die.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "1.gif",
						];
					})(),
				});
				var oJackinTheBoxZombie = InheritO(OrnNoneZombies, {
					EName: "oJackinTheBoxZombie",
					CName: "小丑僵尸",
					SunNum: 100,
					HP: 500,
					Lvl: 3,
					Status: 1,
					BookHandPosition: "30% 70%",
					width: 196,
					height: 181,
					beAttackedPointL: 120,
					beAttackedPointR: 170,
					StandGif: 5,
					NormalGif: 6,
					DieGif: 3,
					BoomDieGif: 4,
					HeadGif: 11,
					LostHeadGif: 9,
					LostHeadAttackGif: 10,
					AttackGif: 2,
					OSpeed: 3.6,
					Speed: 3.6,
					Produce:
						'这种僵尸带着个会爆炸的潘多拉盒子。</p><p>韧性：<font color="#CC241D">中</font><br>速度：<font color="#CC241D">快</font><br>特点：<font color="#CC241D">打开玩偶匣会爆炸</font><br>弱点：<font color="#CC241D">磁力菇</font><br>这种僵尸令人不寒而栗，不是因为他的冰冷身躯而是因为他的疯狂。',
					AudioArr: ["jackinthebox", "jack_surprise", "explosion"],
					PicArr: (function () {
						var a = "images/Zombies/JackinTheBoxZombie/";
						return [
							"images/Card/Zombies/JackboxZombie.png",
							a + "0.gif",
							a + "Attack.gif",
							a + "Die.gif" + $Random,
							a + "BoomDie.gif" + $Random,
							a + "1.gif",
							a + "Walk.gif",
							a + "OpenBox.gif",
							a + "Boom.gif" + $Random,
							a + "LostHead.gif",
							a + "LostHeadAttack.gif",
							"images/Zombies/Zombie/ZombieHead.gif" + $Random,
						];
					})(),
					RandomOpenBox(a) {
						oSym.addTask(
							Math.floor(Math.random() * 100) > 4 ? Math.floor(1325 + Math.random() * 976) : Math.floor(450 + Math.random() * 301),
							(c) => {
								var b = $Z[c];
								b && b.beAttacked && b.OpenBox(c);
							},
							[a]
						);
					},
					OpenBox(b) {
						var a = $Z[b];
						a.EleBody.src = a.PicArr[7];
						a.ChkActs = a.ChkActs1 = function () {
							return 1;
						};
						a.JudgeAttack = function () {
							var g = this;
							var d = g.ZX;
							var e = g.R + "_";
							var f = GetC(d);
							var h = oGd.$;
							var c;
							(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h))
								? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
								: g.isAttacking && (g.isAttacking = 0);
						};
						a.JudgeAttackH = function () {
							var e = this;
							var d = oZ.getZ0(e.ZX, e.R);
							var f = e.id;
							var c;
							d && d.beAttacked && d.AttackedLX < oS.W && d.Altitude === 1
								? !e.isAttacking
									? ((e.isAttacking = 1),
										(e.EleBody.src = e.PicArr[e.AttackGif]),
										e.AttackZombie(f, (c = d.id)),
										!d.isAttacking && d.AttackZombie2(d, c, f))
									: e.AttackZombie(f, d.id, 1)
								: e.isAttacking && (e.isAttacking = 0);
						};
						a.getPea =
							a.getSnowPea =
							a.getFirePeaSputtering =
							a.getFirePea =
							a.getHit =
							a.getHit0 =
							a.getHit1 =
							a.getHit2 =
							a.getHit3 =
							a.ChangeR =
							a.bedevil =
								function () {};
						oSym.addTask(
							50,
							(c) => {
								$Z[c] &&
									((a.Status = 0),
									!--oGd.$JackinTheBox && StopSound2("jackinthebox"),
									PlaySound2("jack_surprise"),
									oSym.addTask(
										90,
										(f) => {
											var e = $Z[f];
											var d;
											e &&
												((d = NewImg(
													"",
													"images/interface/blank.png",
													"width:306px;height:300px;left:" + (e.X - 16) + "px;top:" + (e.pixelTop - 90) + "px;z-index:20"
												)),
												PlaySound2("explosion"),
												(d.src = e.PicArr[8] + Math.random()),
												EDPZ.appendChild(d),
												oSym.addTask(70, ClearChild, [d]),
												e.PZ
													? (function (k, g) {
															var q = Math.max(1, k - 1);
															var o = Math.min(oS.R, k + 1);
															var n = Math.max(1, g - 1);
															var h = Math.min(oS.C, g + 1);
															var r = oGd.$;
															var l;
															var j = "";
															var m;
															do {
																g = n;
																do {
																	j = q + "_" + g + "_";
																	for (l = 0; l < 4; l++) {
																		(m = r[j + l]) && m.BoomDie();
																	}
																} while (g++ < h);
															} while (q++ < o);
														})(e.R, GetC(e.ZX))
													: (function (j, l) {
															var m = j - 120;
															var o = j + 120;
															var h = Math.max(1, l - 1);
															var g = Math.min(oS.R, l + 1);
															var n;
															var k;
															do {
																k = (n = oZ.getArZ(m, o, h)).length;
																while (k--) {
																	n[k].ExplosionDie();
																}
															} while (h++ < g);
														})(e.ZX, e.R),
												e.DisappearDie());
										},
										[c]
									));
							},
							[b]
						);
					},
					getShadow(a) {
						return "left:" + (a.beAttackedPointL - 8) + "px;top:" + (a.height - 32) + "px";
					},
					BirthCallBack(d) {
						var c = d.delayT;
						var b = d.id;
						var a = (d.Ele = $(b));
						d.EleShadow = a.firstChild;
						d.EleBody = a.childNodes[1];
						c
							? oSym.addTask(
									c,
									(f, e) => {
										var g = $Z[f];
										g && (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, (g.FreeSetbodyTime = 0), SetBlock(e), g.RandomOpenBox(f));
									},
									[b, a]
								)
							: (PlaySound2("jackinthebox", true), ++oGd.$JackinTheBox, SetBlock(a), d.RandomOpenBox(b));
					},
					NormalDie() {
						var a = this;
						a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
						a.EleBody.src = a.PicArr[a.DieGif];
						oSym.addTask(250, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					ExplosionDie() {
						var a = this;
						a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
						a.EleBody.src = a.PicArr[a.BoomDieGif];
						oSym.addTask(300, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
					DisappearDie() {
						this.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
					},
					CrushDie() {
						var a = this;
						a.Status && !--oGd.$JackinTheBox && StopSound2("jackinthebox");
						a.GoingDieHead(a.id, a.PicArr, a);
						ClearChild(a.Ele);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
					},
				});
				var oBalloonZombie = InheritO(OrnIZombies, {
					EName: "oBalloonZombie",
					CName: "气球僵尸",
					OrnHP: 20,
					SunNum: 100,
					width: 207,
					height: 197,
					beAttackedPointL: 30,
					beAttackedPointR: 85,
					OSpeed: 3.2,
					Speed: 3.2,
					Altitude: 3,
					OrnLostNormalGif: 9,
					OrnLostAttackGif: 3,
					BreakBall: false, // 气球是否被戳破
					MulBallNum() {
						// 减去气球数
						if (!this.BreakBall) {
							((this.BreakBall = true), (oGd.$Balloon[this.R] |= 0), --oGd.$Balloon[this.R]);
						}
					},
					getShadow(a) {
						return "left:" + (a.beAttackedPointL - 10) + "px;top:" + (a.height - 32) + "px";
					},
					CanPass(d, c) {
						return c;
					},
					AudioArr: ["ballooninflate", "balloon_pop"],
					BookHandPosition: "80% 80%",
					PicArr: (function () {
						var a = "images/Zombies/BalloonZombie/";
						return [
							"images/Card/Zombies/Balloonzombie.png",
							a + "0.gif",
							a + "1.gif",
							a + "Attack.gif",
							a + "Walk2.gif",
							a + "Attack2.gif",
							a + "Head.gif" + $Random,
							a + "Die.gif" + $Random,
							a + "Boom.gif",
							a + "Walk.gif",
							a + "Drop.gif",
							a + "Boom2.gif",
						];
					})(),
					Produce:
						'气球僵尸漂浮在空中，躲过大多数攻击。<p>韧性：<font color="#CC241D">低</font><br>特点：<font color="#CC241D">飞行</font><br>弱点：<font color="#CC241D">仙人掌和三叶草</font></p>气球僵尸真幸运。气球有很多功效，而其他僵尸都不曾捡到过。',
					BirthCallBack(e) {
						var d = e.delayT;
						var c = e.id;
						var a = (e.Ele = $(c));
						var f = oGd.$Balloon;
						var b = e.R;
						e.EleShadow = a.firstChild;
						e.EleBody = a.childNodes[1];
						d
							? oSym.addTask(
									d,
									(i, g, c) => {
										var j = $Z[i];
										var k = oGd.$Balloon;
										j && ((j.FreeSetbodyTime = 0), SetBlock(g));
										((k[c] |= 0), ++k[c]); // 增加数量
										PlaySound2("ballooninflate");
									},
									[c, a, b]
								)
							: (SetBlock(a), f[b] === undefined ? (f[b] = 1) : ++f[b], PlaySound2("ballooninflate"));
					},
					ChkActs(f, d, g, c) {
						var b;
						var a;
						var e;
						if (f.Altitude === 3 && f.AttackedRX < GetX(1)) {
							// 气球掉落
							f.Drop();
							return 1;
						}
						!(f.FreeFreezeTime || f.FreeSetbodyTime)
							? (a = f.AttackedRX -= b = f.Speed) < -50
								? (g.splice(c, 1), f.DisappearDie(), (e = 0))
								: (a < 100 &&
										!f.PointZombie &&
										((f.PointZombie = 1),
										!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
										f.ChangeR({
											R: d,
											ar: [oS.R - 1],
											CustomTop: 400 - f.height + f.GetDY(),
										})),
									(f.ZX = f.AttackedLX -= b),
									(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
									(e = 1))
							: (e = 1);
						return e;
					},
					Drop() {
						var a = this;
						PlaySound2("balloon_pop");
						a.EleBody.src = "images/Zombies/BalloonZombie/Drop.gif" + $Random + Math.random();
						a.ChkActs = function () {
							return 1;
						};
						a.Altitude = 4;
						a.MulBallNum();
						oSym.addTask(
							120,
							(b) => {
								var c = $Z[b];
								if (c) {
									c.BoomDieGif = 11;
									c.Altitude = 1;
									c.OSpeed = c.Speed = 1.6;
									c.getFreeze = OrnIZombies.prototype.getFreeze;
									c.EleBody.src = "images/Zombies/BalloonZombie/Walk.gif";
									c.ChkActs = OrnIZombies.prototype.ChkActs;
									c.ExplosionDie = function () {
										var d = this;
										d.EleBody.src = d.PicArr[d.BoomDieGif];
										oSym.addTask(200, ClearChild, [d.Ele]);
										d.HP = 0;
										delete $Z[d.id];
										d.PZ && oP.MonPrgs();
										d.MulBallNum();
									};
									c.DisappearDie = function () {
										ClearChild(this.Ele);
										this.HP = 0;
										delete $Z[this.id];
										this.PZ && oP.MonPrgs();
										this.MulBallNum();
									};
									c.CrushDie = function () {
										var d = this;
										d.GoingDieHead(d.id, d.PicArr, d);
										ClearChild(d.Ele);
										d.HP = 0;
										delete $Z[d.id];
										d.PZ && oP.MonPrgs();
										d.MulBallNum();
									};
								}
							},
							[a.id]
						);
					},
					getFreeze(b, a) {
						b.Attack = 50;
						b.Speed = 0.5 * b.OSpeed;
						oSym.addTask(
							1500,
							(d, c) => {
								var e = $Z[d];
								e && e.FreeSlowTime === c && ((e.FreeSlowTime = 0), (e.Attack = 100), (e.Speed = e.OSpeed));
							},
							[a, (b.FreeSlowTime = oSym.Now + 1500)]
						);
					},
					NormalDie() {
						var a = this;
						a.EleBody.src = a.PicArr[a.DieGif];
						oSym.addTask(250, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
						a.MulBallNum();
					},
					ExplosionDie() {
						var a = this;
						a.EleBody.src = a.PicArr[a.BoomDieGif];
						oSym.addTask(200, ClearChild, [a.Ele]);
						a.HP = 0;
						delete $Z[a.id];
						a.PZ && oP.MonPrgs();
						a.MulBallNum();
					},
					DisappearDie() {
						ClearChild(this.Ele);
						this.HP = 0;
						delete $Z[this.id];
						this.PZ && oP.MonPrgs();
						this.MulBallNum();
					},
					CrushDie() {
						this.DisappearDie();
					},
					getDispelled() {
						if (this.Altitude !== 3 || this.AttackedRX < GetX(0)) {
							return;
						}
						this.ChkActs = function () {
							return 1;
						};
						(function (id) {
							var o = $Z[id];
							if (!o) {
								return;
							}
							var d = (o.WalkDirection = 1);
							var { R } = o;
							var C = GetC(o.AttackedLX);
							var sx = 50;
							o.AttackedLX += sx;
							o.ZX += sx;
							o.X += sx;
							if (o.AttackedLX > oS.W) {
								o.DisappearDie();
								return;
							}
							SetStyle($(id), { left: o.X + "px" });
							oSym.addTask(2, arguments.callee, [id]);
						})(this.id);
					},
					getFirePeaSputtering() {
						this.Altitude === 1 && this.getHit0(this, 13);
					},
					prepareBirth: oZomboni.prototype.prepareBirth,
				});
			},
		});
	})()));
oDiggerZombie = InheritO(OrnNoneZombies, {
	EName: "oDiggerZombie",
	CName: "Digger Zombie",
	Lvl: 4,
	SunNum: 125,
	HP: 500,
	BreakPoint: 70,
	width: 167,
	height: 170,
	GetDTop: 20,
	beAttackedPointL: 65,
	beAttackedPointR: 90,
	OrnHP: 100,
	OSpeed: 6,
	Speed: 6,
	Altitude: 0, // 挖矿
	CardGif: 0,
	StandGif: 1,
	StaticGif: 2,
	NormalGif: 3,
	WalkGif0: 3,
	WalkGif1: 4,
	WalkGif2: 5,
	AttackGif: 3,
	AttackGif_Up0: 6,
	AttackGif_Up1: 7,
	HeadGif: 8,
	DieGif: 9,
	UpGif: 10,
	DownGif: 11,
	BoomDieGif: 8,
	LostHeadGif: 5,
	LostHeadAttackGif: 5,

	Produce:
		'这种僵尸通过挖地来绕过防线。<p>韧性：<font color="#CC241D">中</font><Br>速度：<font color="#CC241D">快,而后慢</font><BR>特点：<font color="#CC241D">挖地道，然后在草地的左侧现身</font><BR>弱点：<font color="#CC241D">分裂射手，磁力菇</font></p>最近，他一直在听奥特曼的主题曲，据他所述，他好像是在某一处听到这首歌，觉得很好听，于是他现在也不挖土了，天天循环播放这首歌',
	BirthCallBack(f) {
		var e = f.delayT;
		var d = f.id;
		var c = (f.Ele = $(d));
		((f.EleShadow = c.firstChild), (f.EleBody = c.childNodes[1]), SetHidden(f.EleShadow));
		e
			? oSym.addTask(
					e,
					(h, g) => {
						var i = $Z[h];
						i && ((i.FreeSetbodyTime = 0), SetBlock(g));
					},
					[d, c]
				)
			: SetBlock(c);
	},
	HeadPosition: [
		{
			x: 42,
			y: 146,
		},
		{
			x: 40,
			y: 147,
		},
	],
	getShadow(a) {
		return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 20) + "px";
	},
	isUp: 0,
	JudgeLR(f, d, e, c, g) {
		return e > 10 || e < 1
			? false
			: (function () {
					d += --e + "_";
					var h = 3;
					var i;
					while (h--) {
						if ((i = g[d + h]) && i.canEat) {
							return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
						}
					}
				})();
	},
	JudgeSR(f, d, e, c, g) {
		return e > 9
			? false
			: (function () {
					d += e + "_";
					var h = 3;
					var i;
					while (h--) {
						if ((i = g[d + h]) && i.canEat) {
							return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
						}
					}
				})();
	},
	PicArr: (function () {
		var a = "images/Zombies/Diggerzombie/";
		return [
			"images/Card/Zombies/Diggerzombie.png",
			a + "0.gif",
			a + "DiggerZombie.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Walk3.gif",
			a + "Attack1.gif",
			a + "Attack2.gif",
			"images/Plants/Peashooter/NonePeashooter.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Up.gif" + $Random,
			a + "Down.gif" + $Random,
			a + "BoomDie.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
	Go_Up(a, WD) {
		// WD: 方向，1右0左
		a.isUp = 1; //a.Ifgc=0;
		(a.beAttacked &&
			((a.WalkDirection = WD),
			(a.BoomDieGif = 12),
			PlaySound2("zombie_entering_water"),
			(a.Altitude = 4),
			SetVisible(a.EleShadow),
			(a.EleBody.src = a.PicArr[a.UpGif]),
			(a.OSpeed = a.Speed = 0)),
			(a.ChkActs = function () {
				return 1;
			})); // 跳起来
		oSym.addTask(
			100,
			(c, b) => {
				WD
					? ((b.AttackGif = b.AttackGif_Up0),
						(b.AttackedRX += 30),
						(b.beAttackedPointL = 70),
						(b.beAttackedPointR = 130),
						(b.Ele.lastChild.style.left = "40px"),
						(b.JudgeAttack = b.JudgeAttack_Up1))
					: (b.AttackGif = b.AttackGif_Up1); // GIF
				$Z[c] &&
					b.beAttacked &&
					(WD && b.ExchangeLR(b, WD), (b.Altitude = 1), (b.isAttacking = 0), (b.EleBody.src = b.PicArr[(b.NormalGif = b.DownGif)])); // 眩晕
				$Z[c] &&
					b.beAttacked &&
					oSym.addTask(
						WD ? 400 : 0,
						(c, b) => {
							// 行走
							((b.EleBody.src = b.PicArr[(b.NormalGif = WD ? b.WalkGif1 : b.WalkGif2)]),
								(b.OSpeed = b.Speed = 1.6),
								(b.ChkActs = OrnNoneZombies.prototype[WD ? "ChkActs1" : "ChkActs"]));
						},
						[c, b]
					);
			},
			[a.id, a]
		);
	},
	ChkActs(f, d, g, c) {
		// 到了左边自己钻出来
		if (f.Altitude === 0 && f.AttackedRX < GetX(1) - 40) {
			return (f.Go_Up(f, 1), 1);
		}

		var b;
		var a;
		var e;
		!(f.FreeFreezeTime || f.FreeSetbodyTime)
			? (f.beAttacked && !f.isAttacking && f.JudgeAttack_Dig(),
				!f.isAttacking
					? (a = f.AttackedRX -= b = f.Speed) < -50
						? (g.splice(c, 1), f.DisappearDie(), (e = 0))
						: (a < 80 &&
								!f.PointZombie &&
								((f.PointZombie = 1),
								!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
								f.ChangeR({
									R: d,
									ar: [oS.R - 1],
									CustomTop: 400 - f.height + f.GetDY(),
								})),
							(f.ZX = f.AttackedLX -= b),
							(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
							(e = 1))
					: (e = 1))
			: (e = 1);
		return e;
	},
	CanDig: {
		oPotatoMine: true,
	},
	JudgeAttack_Dig() {
		var g = this;
		var d = g.ZX;
		var e = g.R + "_";
		var f = GetC(d);
		var h = oGd.$;
		var c;
		(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) && g.CanDig[$P[c[1]].EName]
			? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
			: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
	},
	JudgeAttack_Up1() {
		var g = this;
		var d = g.AttackedRX;
		var e = g.R + "_";
		var f = GetC(d);
		var h = oGd.$;
		var c;
		(c = g.JudgeSR(g, e, f, d, h) || g.JudgeLR(g, e, f, d, h))
			? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
			: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
	},
	Stone_of_Sinan_Up() {
		// 被磁铁吸了镐子调用的函数
		var g = this; //alert(1);
		if (g.isUp) {
			g.EleBody.src = g.PicArr[g.isAttacking ? (g.AttackGif = g.AttackGif_Up1) : (g.NormalGif = g.WalkGif2)];
		} else {
			g.Go_Up(g, 0);
		}
		g.Stone_of_Sinan_Up = function () {};
	},
});
((oIDiggerZombie = InheritO(OrnNoneZombies, {
	EName: "oIDiggerZombie",
	CName: "Digger Zombie",
	Lvl: 4,
	SunNum: 125,
	HP: 500,
	BreakPoint: 70,
	width: 167,
	height: 170,
	GetDTop: 20,
	beAttackedPointL: 65,
	beAttackedPointR: 90,
	OrnHP: 100,
	OSpeed: 7.8,
	Speed: 7.8,
	Altitude: 0, // 挖矿
	CardGif: 0,
	StandGif: 1,
	StaticGif: 2,
	NormalGif: 3,
	WalkGif0: 3,
	WalkGif1: 4,
	WalkGif2: 5,
	AttackGif: 3,
	AttackGif_Up0: 6,
	AttackGif_Up1: 7,
	HeadGif: 8,
	DieGif: 9,
	UpGif: 10,
	DownGif: 11,
	BoomDieGif: 8,
	LostHeadGif: 5,
	LostHeadAttackGif: 5,

	Produce:
		'这种僵尸通过挖地来绕过防线。<p>韧性：<font color="#CC241D">中</font><Br>速度：<font color="#CC241D">快,而后慢</font><BR>特点：<font color="#CC241D">挖地道，然后在草地的左侧现身</font><BR>弱点：<font color="#CC241D">分裂射手，磁力菇</font></p>最近，他一直在听奥特曼的主题曲，据他所述，他好像是在某一处听到这首歌，觉得很好听，于是他现在也不挖土了，天天循环播放这首歌',
	BirthCallBack(f) {
		var e = f.delayT;
		var d = f.id;
		var c = (f.Ele = $(d));
		((f.EleShadow = c.firstChild), (f.EleBody = c.childNodes[1]), SetHidden(f.EleShadow));
		e
			? oSym.addTask(
					e,
					(h, g) => {
						var i = $Z[h];
						i && ((i.FreeSetbodyTime = 0), SetBlock(g));
					},
					[d, c]
				)
			: SetBlock(c);
	},
	HeadPosition: [
		{
			x: 42,
			y: 146,
		},
		{
			x: 40,
			y: 147,
		},
	],
	getShadow(a) {
		return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 20) + "px";
	},
	isUp: 0,
	JudgeLR(f, d, e, c, g) {
		return e > 10 || e < 1
			? false
			: (function () {
					d += --e + "_";
					var h = 3;
					var i;
					while (h--) {
						if ((i = g[d + h]) && i.canEat) {
							return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
						}
					}
				})();
	},
	JudgeSR(f, d, e, c, g) {
		return e > 9
			? false
			: (function () {
					d += e + "_";
					var h = 3;
					var i;
					while (h--) {
						if ((i = g[d + h]) && i.canEat) {
							return i.AttackedRX >= c && i.AttackedLX <= c ? [f.id, i.id] : false;
						}
					}
				})();
	},
	PicArr: (function () {
		var a = "images/Zombies/Diggerzombie/";
		return [
			"images/Card/Zombies/IDiggerzombie.png",
			a + "0.gif",
			a + "DiggerZombie.gif",
			a + "Walk1.gif",
			a + "Walk2.gif",
			a + "Walk3.gif",
			a + "Attack1.gif",
			a + "Attack2.gif",
			"images/Plants/Peashooter/NonePeashooter.gif" + $Random,
			a + "Die.gif" + $Random,
			a + "Up.gif" + $Random,
			a + "Down.gif" + $Random,
			a + "BoomDie.gif" + $Random,
		];
	})(),
	AudioArr: ["zombie_entering_water"],
	Go_Up(a, WD) {
		// WD: 方向，1右0左
		a.isUp = 1; //a.Ifgc=0;
		(a.beAttacked &&
			((a.WalkDirection = WD),
			(a.BoomDieGif = 12),
			PlaySound2("zombie_entering_water"),
			(a.Altitude = 4),
			SetVisible(a.EleShadow),
			(a.EleBody.src = a.PicArr[a.UpGif]),
			(a.OSpeed = a.Speed = 0)),
			(a.ChkActs = function () {
				return 1;
			})); // 跳起来
		oSym.addTask(
			100,
			(c, b) => {
				WD
					? ((b.AttackGif = b.AttackGif_Up0),
						(b.AttackedRX += 30),
						(b.beAttackedPointL = 70),
						(b.beAttackedPointR = 130),
						(b.Ele.lastChild.style.left = "40px"),
						(b.JudgeAttack = b.JudgeAttack_Up1))
					: (b.AttackGif = b.AttackGif_Up1); // GIF
				$Z[c] &&
					b.beAttacked &&
					(WD && b.ExchangeLR(b, WD), (b.Altitude = 1), (b.isAttacking = 0), (b.EleBody.src = b.PicArr[(b.NormalGif = b.DownGif)])); // 眩晕
				$Z[c] &&
					b.beAttacked &&
					oSym.addTask(
						WD ? 400 : 0,
						(c, b) => {
							// 行走
							((b.EleBody.src = b.PicArr[(b.NormalGif = WD ? b.WalkGif1 : b.WalkGif2)]),
								(b.OSpeed = b.Speed = 1.6),
								(b.ChkActs = OrnNoneZombies.prototype[WD ? "ChkActs1" : "ChkActs"]));
						},
						[c, b]
					);
			},
			[a.id, a]
		);
	},
	ChkActs(f, d, g, c) {
		// 到了左边自己钻出来
		if (f.Altitude === 0 && f.AttackedRX < GetX(1) - 40) {
			return (f.Go_Up(f, 1), 1);
		}

		var b;
		var a;
		var e;
		!(f.FreeFreezeTime || f.FreeSetbodyTime)
			? (f.beAttacked && !f.isAttacking && f.JudgeAttack_Dig(),
				!f.isAttacking
					? (a = f.AttackedRX -= b = f.Speed) < -50
						? (g.splice(c, 1), f.DisappearDie(), (e = 0))
						: (a < 80 &&
								!f.PointZombie &&
								((f.PointZombie = 1),
								!oS.CardKind && (StopMusic(), PlaySound2("losemusic", false)),
								f.ChangeR({
									R: d,
									ar: [oS.R - 1],
									CustomTop: 400 - f.height + f.GetDY(),
								})),
							(f.ZX = f.AttackedLX -= b),
							(f.Ele.style.left = Math.floor((f.X -= b)) + "px"),
							(e = 1))
					: (e = 1))
			: (e = 1);
		return e;
	},
	CanDig: {
		oPotatoMine: true,
	},
	JudgeAttack_Dig() {
		var g = this;
		var d = g.ZX;
		var e = g.R + "_";
		var f = GetC(d);
		var h = oGd.$;
		var c;
		(c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) && g.CanDig[$P[c[1]].EName]
			? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
			: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
	},
	JudgeAttack_Up1() {
		var g = this;
		var d = g.AttackedRX;
		var e = g.R + "_";
		var f = GetC(d);
		var h = oGd.$;
		var c;
		(c = g.JudgeSR(g, e, f, d, h) || g.JudgeLR(g, e, f, d, h))
			? (!g.isAttacking && ((g.isAttacking = 1), (g.EleBody.src = g.PicArr[g.AttackGif])), g.NormalAttack(c[0], c[1]))
			: g.isAttacking && ((g.isAttacking = 0), (g.EleBody.src = g.PicArr[g.NormalGif]));
	},
	Stone_of_Sinan_Up() {
		// 被磁铁吸了镐子调用的函数
		var g = this; //alert(1);
		if (g.isUp) {
			g.EleBody.src = g.PicArr[g.isAttacking ? (g.AttackGif = g.AttackGif_Up1) : (g.NormalGif = g.WalkGif2)];
		} else {
			g.Go_Up(g, 0);
		}
		g.Stone_of_Sinan_Up = function () {};
	},
})),
	(oJalapenoZombie = InheritO(oZombie, {
		EName: "oJalapenoZombie",
		CName: "Jalapeno Zombie",
		HP: 500,
		PicArr: (function () {
			var a = "images/Zombies/JalapenoZombie/";
			return [
				"images/Card/Zombies/JalapenoZombie.png",
				a + "0.png",
				a + "Zombie.png",
				a + "ZombieAttack.png",
				"images/Zombies/Zombie/ZombieLostHead.gif",
				"images/Zombies/Zombie/ZombieLostHeadAttack.gif",
				a + "JalapenoHead.png" + $Random,
				"images/Zombies/Zombie/ZombieDie.gif" + $Random,
				"images/Zombies/BoomDie.gif",
				a + "1.png",
			];
		})(),
		Produce:
			'Toughness: <font color="#FF0000">medium</font></p>A rebellious hot pepper from the plant family, codenamed 47, often self-destructs to destroy plants.',
		BirthCallBack(f) {
			var e = f.delayT;
			var d = f.id;
			var c = (f.Ele = $(d));
			f.EleShadow = c.firstChild;
			f.EleBody = c.childNodes[1];
			e
				? oSym.addTask(
						e,
						(h, g) => {
							var i = $Z[h];
							i && ((i.FreeSetbodyTime = 0), SetBlock(g));
						},
						[d, c]
					)
				: SetBlock(c);
			f.CheckBoomFire(f);
		},
		CheckBoomFire(f) {
			oSym.addTask(
				1000,
				function (f) {
					// 生成1到100之间的随机整数
					let randomNumber = Math.floor(Math.random() * 100) + 1;

					$Z[f.id] && randomNumber <= 10 && f.BoomFire(f.R);
					oSym.addTask(100, arguments.callee, [f]);
				},
				[f]
			);
		},
		BoomFire(y) {
			PlaySound2("jalapeno");
			fireid = "fire_" + Math.random();
			NewImg(fireid, "images/Plants/Jalapeno/JalapenoAttack.gif", "width:755px;height:131px;left:120px;top:" + (GetY(y - 1) - 42) + "px", EDAll);
			oSym.addTask(
				135,
				(id) => {
					ClearChild($(id));
				},
				[fireid]
			);
			for (let i = 1; i <= oS.C; i++) {
				for (let j = 0; j < 4; j++) {
					let g = oGd.$[y + "_" + i + "_" + j];
					g && g.BoomDie();
				}
			}
			this.DisappearDie();
		},
	})));
oPeaZombie = InheritO(oZombie, {
	EName: "oPeaZombie",
	CName: "Peashooter Zombie",
	HeadPosition: [
		{ x: 82, y: 30, width: 40, height: 40 },
		{ x: 82, y: 30, width: 40, height: 40 },
	],
	PicArr: (function () {
		var a = "images/Zombies/Zombie/";
		return [
			"images/Card/Zombies/Zombie.png",
			a + "0.gif",
			a + "Zombie.gif",
			a + "ZombieAttack.gif",
			"images/Zombies/Zombie/ZombieLostHead.gif",
			"images/Zombies/Zombie/ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif",
			"images/Zombies/Zombie/ZombieDie.gif",
			"images/Zombies/BoomDie.gif",
			a + "1.gif",
		];
	})(),
	Produce: "peashootr",
});
var oGargantuar = InheritO(OrnIZombies, {
	EName: "oGargantuar",
	CName: "Gargantuar",
	OrnHP: 2000,
	HP: 1000,
	Lvl: 2,
	width: 390,
	height: 275,
	beAttackedPointL: 150,
	beAttackedPointR: 300,
	SunNum: 300,
	StandGif: 11,
	AlmanacGif: 11,
	Attack: 1800,
	HeadPosition: [
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
		{
			x: 82,
			y: 30,
			width: 40,
			height: 40,
		},
	],
	BookHandPosition: "35% 70%",
	PicArr: (function () {
		var a = "images/Zombies/Gargantuar/";
		return [
			"images/Card/Zombies/Gargantuar.png",
			a + "0.png",
			a + "Walk.webp",
			a + "Attack.webp",
			a + "ZombieLostHead.gif",
			a + "ZombieLostHeadAttack.gif",
			a + "ZombieHead.gif" + $Random,
			a + "Death.webp" + $Random,
			"images/Zombies/BoomDie.gif" + $Random,
			a + "WalkNoImp.webp",
			a + "Attack.webp",
			a + "Idle.webp",
		];
	})(),
	AudioArr: ["plastichit"],
	GetDX() {
		return -200;
	},
	getShadow(a) {
		return "left:200px;top:250px";
	},
	Produce:
		'他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#CC241D">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。',
});
