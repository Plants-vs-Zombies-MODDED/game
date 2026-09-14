oS.Init(
	{
		PName: [oPeashooter],
		ZName: [oZombie],
		PicArr: (function () {
			var a = oSunFlower.prototype;
			var b = a.PicArr;
			return [
				"images/interface/SodRollCap.png",
				"images/interface/SodRoll.png",
				"images/interface/background1unsodded_1.jpg",
				"images/interface/background1unsodded.jpg",
				b[a.CardGif],
				b[a.NormalGif],
			];
		})(),
		SunNum: 150,
		backgroundImage: "images/interface/background1unsodded.jpg",
		LF: [0, 0, 0, 1, 0, 0],
		CanSelectCard: 0,
		LevelName: "Level 1-1",
		LvlEName: 1,
		AudioArr: ["dirt_rise"],
		InitLawnMower() {
			CustomSpecial(oLawnCleaner, 3, -1);
		},
		LargeWaveFlag: { 5: $("imgFlag1") },
		StartGame() {
			NewImg("imgSF", "images/interface/tiaoguo.png", "left:1px;top:75px", EDAll, {
				onclick() {
					SelectModal(3);
				},
			});
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			NewEle(
				"sod3row",
				"div",
				"position:absolute;left:-115px;top:0;height:600px;width:264px;z-index:0;background:url(images/interface/background1unsodded_1.jpg);over-flow:hidden",
				0,
				EDPZ
			);
			NewImg("SodRoll_1", "images/interface/SodRoll.png", "left:112px;top:244px;z-index:1", EDPZ);
			NewImg("SodRollCap_1", "images/interface/SodRollCap.png", "left:17px;top:322px;z-index:1", EDPZ);
			PlaySound2("dirt_rise");
			(function (e, h, b, d, c, g, a, f) {
				e += 15;
				h += 16;
				d += 16;
				$("sod3row").style.width = e + "px";
				SetStyle($("SodRoll_1"), {
					left: h + "px",
					width: --b + "px",
					height: "141px",
				});
				SetStyle($("SodRollCap_1"), {
					left: d + "px",
					width: --c + "px",
					height: --g + "px",
					top: ++a + "px",
				});
				e < 990
					? oSym.addTask(3, arguments.callee, [e, h, b, d, c, g, a, f])
					: (ClearChild($("SodRoll_1"), $("SodRollCap_1")),
						(function () {
							NewEle("DivTeachBar", "div", 0, 0, EDAll);
							oS.InitLawnMower();
							oP.Monitor({
								ar: [0],
								f(k) {
									var l = oS.C + 1;
									var i = oS.Chose;
									switch (k) {
										case 0:
											innerText($("DivTeachBar"), "Click on a seed packet to pick it up!");
											NewImg("PointerUD", "images/interface/PointerUP.gif", "top:60px;left:50px", EDAll);
											oSym.addTask(10, arguments.callee, [++k]);
											break;
										case 1:
											i > 0 &&
												(innerText($("DivTeachBar"), "Click on the grass to plant your seed!"),
												EditImg($("PointerUD"), "", "images/interface/PointerDown.gif", {
													left: "170px",
													top: "270px",
												}),
												++k);
											oSym.addTask(10, arguments.callee, [k]);
											break;
										case 2:
											var h = oGd.$;
											while (--l) {
												if (h["3_" + l + "_1"]) {
													SetHidden($("PointerUD"));
													innerText($("DivTeachBar"), "Click on falling sun to collect it!");
													AutoProduceSun(25);
													oSym.addTask(10, arguments.callee, [++k]);
													return;
												}
											}
											!i && (ClearChild($("PointerUD")), (k = 0));
											oSym.addTask(10, arguments.callee, [k]);
											break;
										case 3:
											oS.SunNum > 99 &&
												(innerText($("DivTeachBar"), "Click on the peashooter to plant  one!"),
												EditImg($("PointerUD"), "", "images/interface/PointerUP.gif", {
													left: "50px",
													top: "60px",
													visibility: "visible",
												}),
												++k);
											oSym.addTask(10, arguments.callee, [k]);
											break;
										default:
											var j = 0;
											var h = oGd.$;
											while (--l) {
												h["3_" + l + "_1"] && ++j;
											}
											j > 0
												? (SetHidden($("PointerUD")),
													innerText($("DivTeachBar"), "Don't let the zombies reach your house!"),
													oP.AddZombiesFlag(),
													oSym.addTask(500, SetNone, [$("DivTeachBar")]))
												: oSym.addTask(10, arguments.callee, [4]);
									}
								},
							});
							BeginCool();
							SetVisible($("dFlagMeter"), $("dTop"));
						})());
			})(283, 122, 68, 118, 73, 71, 322, 511);
		},
	},
	{
		AZ: [[oZombie, 5, 1]],
		FlagNum: 5,
		FlagToSumNum: { a1: [3], a2: [1, 2] },
		FlagToMonitor: { 4: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/Card/Plants/SunFlower.webp", "left:667px;top:330px;clip:rect(auto,auto,60px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oSunFlower, 2);
				},
			});
			EditImg($("PointerUD"), 0, "images/interface/PointerDown.gif", {
				left: "676px",
				top: "295px",
				visibility: "visible",
			});
		},
	}
);
