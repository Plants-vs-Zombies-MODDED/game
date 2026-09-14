oS.Init(
	{
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
		ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie],
		PicArr: (function () {
			var a = oPotatoMine.prototype;
			var b = a.PicArr;
			return ["images/interface/background1.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
		})(),
		backgroundImage: "images/interface/background1.jpg",
		CanSelectCard: 0,
		LevelName: "1-5 Special Off: Meteor Crater",
		LvlClearFunc() {
			oSym.TimeStep = 10;
		},
		LvlEName: 5,
		LargeWaveFlag: { 10: $("imgFlag1") },
		StartGameMusic: "LoonSkirmish",
		LoadAccess(a) {
			NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
			NewEle("DivTeach", "div", 0, 0, EDAll);
			(function (d) {
				var b = arguments.callee;
				var c = $("DivTeach");
				switch (d) {
					case 0:
						PlaySound2("crazydaveshort1");
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							1,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						innerText(c, "Neighbors, we managed to fight off some zombies after all the hard work! congratulations");
						break;
					case 1:
						PlaySound2("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [2]);
								};
							},
							[]
						);
						innerText(c, "Now, I have a surprise for you.");
						break;
					case 2:
						PlaySound2("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [3]);
								};
							},
							[]
						);
						innerText(c, "But first, you must clean your lawn.");
						break;
					case 3:
						PlaySound2("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [4]);
								};
							},
							[]
						);
						innerText(c, "Dig out those plants with your shovel!");
						break;
					case 4:
						PlaySound2("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							2,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [5]);
								};
							},
							[]
						);
						innerText(c, "Start digging!");
						break;
					case 5:
						$("dDave").src = "images/interface/Dave2.gif";
						ClearChild($("DivTeach"));
						oSym.addTask(
							5,
							() => {
								ClearChild($("dDave"));
								a(0);
							},
							[]
						);
				}
			})(0);
		},
		StartGame() {
			SetHidden($("dSunNum"));
			SetVisible($("tdShovel"), $("dTop"));
			NewEle("DivTeachBar", "div", 0, 0, EDAll);
			oP.Monitor(
				{
					ar: [0],
					f(c) {
						var d;
						var a = oGd.$;
						var b = oS.Chose;
						switch (c) {
							case 0:
								innerText($("DivTeachBar"), "Click on the shovel to pick it up!");
								NewImg("PointerUD", "images/interface/PointerUP.gif", "top:36px;left:250px", EDAll);
								oSym.addTask(10, arguments.callee, [++c]);
								break;
							case 1:
								b < 0 && (innerText($("DivTeachBar"), "Click on a plant to remove it!"), ++c);
								oSym.addTask(10, arguments.callee, [c]);
								break;
							case 2:
								!(a["2_6_1"] && a["3_8_1"] && a["4_7_1"])
									? (innerText($("DivTeachBar"), "Keep digging until your lawn is clear of plants!"), ++c)
									: b > -1 && (innerText($("DivTeachBar"), "Click on those plants to remove them!"), (c = 1));
								oSym.addTask(10, arguments.callee, [c]);
								break;
							default:
								!(a["2_6_1"] || a["3_8_1"] || a["4_7_1"])
									? (function () {
											SetHidden($("DivTeachBar"), $("PointerUD"));
											SetVisible($("dSunNum"), $("dFlagMeter"), $("dTop"));
											StopMusic();
											PlayMusic((oS.LoadMusic = oS.StartGameMusic));
											oS.InitLawnMower();
											PrepareGrowPlants(() => {
												BeginCool();
												AutoProduceSun(25);
												oSym.addTask(
													2e3,
													() => {
														oP.AddZombiesFlag();
														SetVisible($("dFlagMeterContent"));
													},
													[]
												);
											});
										})()
									: oSym.addTask(10, arguments.callee, [3]);
						}
					},
				},
				() => {
					var c = Math.floor(1 + Math.random() * 5);
					var f = Math.floor(1 + Math.random() * 9);
					var g = GetX(f) - 55;
					var e = GetY(c) - 60;
					var b = c + "_" + f;
					var a = oP.FlagZombies;
					var d;
					switch (true) {
						case a > 3:
							SetStyle((d = $("imgCrater")), {
								left: g + "px",
								top: e + "px",
								zIndex: 3 * c,
							});
							delete oGd.$Crater[d.getAttribute("S")];
							oGd.$Crater[b] = 2;
							d.setAttribute("S", b);
							(d = oGd.$[b + "_1"]) && d.Die();
							break;
						case a > 2:
							NewImg("imgCrater", "images/interface/crater1.png", "left:" + g + "px;top:" + e + "px;z-index:" + 3 * c, EDAll).setAttribute(
								"S",
								b
							);
							(d = oGd.$[b + "_1"]) && d.Die();
							oGd.$Crater[b] = 2;
					}
				}
			);
			SetVisible($("dFlagMeter"));
			CustomPlants(0, 2, 6);
			CustomPlants(0, 3, 8);
			CustomPlants(0, 4, 7);
		},
	},
	{
		AZ: [
			[oZombie, 3, 1],
			[oZombie2, 2, 1],
			[oZombie3, 2, 1],
			[oConeheadZombie, 3, 1],
		],
		FlagNum: 10,
		FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
		FlagToMonitor: { 9: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/Card/Plants/PotatoMine.webp", "left:587px;top:270px;clip:rect(auto,auto,60px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oPotatoMine, 6);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:235px;left:596px", EDAll);
		},
	}
);
