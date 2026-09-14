oS.Init(
	{
		PName: [oOxygen, oGun, oSeaAnemone, oGatlingPea],
		ZName: [oZombie, oConeheadZombie, oXBZombie, oBucketheadZombie, oCXZombie, oJX, oLGBOSS],
		PicArr: ["images/interface/backgroundLG.jpg"],
		backgroundImage: "images/interface/backgroundLG.jpg",
		LF: [0, 3, 3, 3, 3, 3],
		CanSelectCard: 0,
		DKind: 0,
		LevelName: "3-10 Battle of the Dragon King",
		LvlEName: "40",
		InitLawnMower() {},
		LargeWaveFlag: { 15: $("imgFlag2"), 25: $("imgFlag1") },
		StartGameMusic: "Zombieboss",
		StaticCard: 0,
		StartGame() {
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			SetHidden($("dSunNum"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				oP.Monitor({
					f() {
						(function () {
							var a = ArCard.length;
							if (a < 10) {
								var c = oS.PName;
								var b =
									oP.FlagZombies < 6
										? Math.floor(1 + Math.random() * 10) < 4
											? 1
											: Math.floor(Math.random() * c.length)
										: Math.floor(1 + Math.random() * 10) < 3
											? 0
											: Math.floor(Math.random() * c.length);
								var e = c[b];
								var d = e.prototype;
								var f = "dCard" + Math.random();
								ArCard[a] = { DID: f, PName: e, PixelTop: 600 };
								NewImg(
									f,
									d.PicArr[d.CardGif],
									"top:600px;width:100px;height:120px;cursor:url(images/interface/Pointer.cur),pointer;clip:rect(auto,auto,60px,auto)",
									$("dCardList"),
									{
										onmouseover(g) {
											ViewPlantTitle(GetChoseCard(f), g);
										},
										onmouseout() {
											SetHidden($("dTitle"));
										},
										onclick(g) {
											ChosePlant(g, oS.ChoseCard, f);
										},
									}
								);
							}
							oSym.addTask(600, arguments.callee, []);
						})();
						(function () {
							var b = ArCard.length;
							var a;
							var c;
							while (b--) {
								(c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px");
							}
							oSym.addTask(5, arguments.callee, []);
						})();
					},
					ar: [],
				});
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"));
			});
		},
		LoadAccess(a) {
			NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
			NewEle("DivTeach", "div", 0, 0, EDAll);
			(function (d) {
				var b = arguments.callee;
				var c = $("DivTeach");
				switch (d) {
					case 0:
						PlaySound2("crazydavelong" + Math.floor(1 + Math.random() * 3));
						c.onclick = null;
						$("dDave").src = "images/interface/Dave3.gif";
						oSym.addTask(
							200,
							() => {
								$("dDave").src = "images/interface/Dave.gif";
								c.onclick = function () {
									oSym.addTask(10, b, [1]);
								};
							},
							[]
						);
						c.innerHTML = '<span style="font-size:22px">Listen - whats that sound?</span>';
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
						c.innerHTML = '<span style="font-size:22px">What seems to be a rumbling mechanical sound</span>';
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
						c.innerHTML = '<span style="font-size:22px">What might happen, you gotta hold on</span>';
						break;
					case 3:
						$("dDave").src = "images/interface/Dave2.gif";
						ClearChild($("DivTeach"));
						oSym.addTask(
							5,
							() => {
								ClearChild($("dDave"));
								a(0);
								StopMusic();
								PlayMusic((oS.LoadMusic = "ChooseYourSeeds"));
							},
							[]
						);
				}
			})(0);
		},
	},
	{
		AZ: [
			[oZombie, 5, 1],
			[oConeheadZombie, 2, 10],
			[oXBZombie, 2, 10],
			[oBucketheadZombie, 1, 15],
			[oCXZombie, 3, 7],
			[oJX, 1, 1],
			[oLGBOSS, 1, 25, [25]],
		],
		FlagNum: 25,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 30],
			a2: [4, 7, 12, 20, 13, 16, 21, 30],
		},
		FlagToMonitor: { 14: [ShowLargeWave, 0], 24: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/interface/0.gif", "left:667px;top:330px;clip:rect(auto,auto,237px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oGoldenPrize, 41);
				},
			});
		},
	},
	{
		GetChoseCard(b) {
			var a = ArCard.length;
			while (a--) {
				ArCard[a].DID === b && ((oS.ChoseCard = a), (a = 0));
			}
			return oS.ChoseCard;
		},
		ChosePlant(a, b) {
			PlaySound2("seedlift");
			a = window.event || a;
			var f = ArCard[oS.ChoseCard];
			var e = a.clientX - EDAlloffsetLeft + (EBody.scrollLeft || EElement.scrollLeft);
			var d = a.clientY - EDAlloffsetTop + (EBody.scrollTop || EElement.scrollTop);
			var c = f.PName.prototype;
			oS.Chose = 1;
			EditImg(
				NewImg(
					"MovePlant",
					c.PicArr[c.StaticGif],
					`left:${e - 0.5 * (c.beAttackedPointL + c.beAttackedPointR)}px;top:${d + 20 - c.height}px;z-index:254`,
					EDAll
				).cloneNode(false),
				"MovePlantAlpha",
				"",
				{
					visibility: "hidden",
					filter: "alpha(opacity=40)",
					opacity: 0.4,
					zIndex: 30,
				},
				EDAll
			);
			SetAlpha($(f.DID), 50, 0.5);
			SetHidden($("dTitle"));
			GroundOnmousemove = GroundOnmousemove1;
		},
		CancelPlant() {
			ClearChild($("MovePlant"), $("MovePlantAlpha"));
			oS.Chose = 0;
			SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
			oS.ChoseCard = "";
			GroundOnmousemove = function () {};
		},
		GrowPlant(l, c, b, f, a) {
			var j = oS.ChoseCard;
			var g = ArCard[j];
			var i = g.PName;
			var k = i.prototype;
			var d = g.DID;
			var e;
			var h = oGd.$LF[f];
			k.CanGrow(l, f, a) &&
				(function () {
					PlaySound2(h !== 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");
					new i().Birth(c, b, f, a, l);
					oSym.addTask(20, SetNone, [
						SetStyle($("imgGrowSoil"), {
							left: c - 30 + "px",
							top: b - 40 + "px",
							zIndex: 3 * f,
							visibility: "visible",
						}),
					]);
					ClearChild($("MovePlant"), $("MovePlantAlpha"));
					$("dCardList").removeChild((e = $(d)));
					e = null;
					ArCard.splice(j, 1);
					oS.ChoseCard = "";
					oS.Chose = 0;
					GroundOnmousemove = function () {};
				})();
		},
		ViewPlantTitle(a) {},
	}
);
