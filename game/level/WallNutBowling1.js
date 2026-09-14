oS.Init(
	{
		PName: [oNutBowling, oBoomNutBowling],
		ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oPoleVaultingZombie],
		PicArr: ["images/interface/background1.jpg", "images/interface/Stripe.png"],
		backgroundImage: "images/interface/background1.jpg",
		LF: [0, 1, 1, 1, 1, 1],
		CanSelectCard: 0,
		DKind: 0,
		LevelName: "Wall-nut Bowling 1",
		LvlEName: "NutBowling1",
		LargeWaveFlag: {
			10: $("imgFlag3"),
			20: $("imgFlag1"),
		},
		StartGameMusic: "LoonSkirmish",
		StaticCard: 0,
		StartGame() {
			NewEle(
				0,
				"div",
				"width:22px;height:502px;margin:75px 0 0 485px;position:absolute;z-index:1;background:url(images/interface/Stripe.png)",
				0,
				$("tGround")
			);
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetHidden($("dSunNum"));
			oS.InitLawnMower();
			PrepareGrowPlants(() => {
				oP.Monitor({
					f() {
						(function () {
							var a = ArCard.length;
							if (a < 10) {
								var c = [oNutBowling, oNutBowling, oNutBowling, oNutBowling, oBoomNutBowling];
								var b = Math.floor(Math.random() * c.length);
								var e = c[b];
								var d = e.prototype;
								var f = "dCard" + Math.random();
								ArCard[a] = {
									DID: f,
									PName: e,
									PixelTop: 600,
								};
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
							oSym.addTask(500, arguments.callee, []);
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
				SetVisible($("dFlagMeter"));
			});
		},
	},
	{
		AZ: [
			[oZombie, 4, 1],
			[oZombie2, 2, 1],
			[oZombie3, 2, 1],
			[oConeheadZombie, 4, 1],
			[oBucketheadZombie, 4, 1],
			[oNewspaperZombie, 2, 1],
			[oPoleVaultingZombie, 2, 10],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19],
			a2: [4, 7, 12, 20, 13, 16, 21, 40],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowFinalWave, 0],
		},
		FlagToEnd() {
			NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
				onclick() {
					SelectModal(0);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:198px;left:269px", EDAll);
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
			var j = $("DivTeachBar");
			j && j.parentNode.removeChild(j);
			if (c > 347) {
				innerText(NewEle("DivTeachBar", "div", "line-height:40px", 0, EDAll), "Place your wall-nut to the left of the bowling line");
				return false;
			}
			var i = oS.ChoseCard;
			var g = ArCard[i];
			var h = g.PName;
			var k = h.prototype;
			var d = g.DID;
			var e;
			new h().Birth(c, b, f, a, l);
			ClearChild($("MovePlant"), $("MovePlantAlpha"));
			$("dCardList").removeChild((e = $(d)));
			e = null;
			ArCard.splice(i, 1);
			oS.ChoseCard = "";
			oS.Chose = 0;
			GroundOnmousemove = function () {};
		},
		ViewPlantTitle(a) {},
	}
);
