oS.Init(
	{
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom],
		ZName: [oZombie, oZombie2, oZombie3, oScreenDoorZombie],
		PicArr: (function () {
			var a = oFumeShroom.prototype;
			var b = a.PicArr;
			return [
				"images/interface/background2.jpg",
				"images/interface/Tombstones.png",
				"images/interface/Tombstone_mounds.png",
				b[a.CardGif],
				b[a.NormalGif],
			];
		})(),
		backgroundImage: "images/interface/background2.jpg",
		CanSelectCard: 1,
		DKind: 0,
		SunNum: 375,
		LevelName: "2-5 Special Pass: Mass Burial Mound",
		LvlEName: 15,
		LargeWaveFlag: { 10: $("imgFlag1") },
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
						innerText(c, "Dude, have you ever imagined you being alone in a cemetery one night?");
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
						innerText(c, "Of course, there have to be zombies in the cemetery.");
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
						innerText(c, "Don't relax too much, zombies will pop out of tombstones at any time! .");
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
						innerText(c, "Hmm, we might need some quick plants!");
						break;
					case 4:
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
		Monitor: { f: AppearTombstones, ar: [7, 9, 12] },
		UserDefinedFlagFunc(b) {
			var a = oP.FlagZombies;
			switch (true) {
				case a > 8:
					oP.SetTimeoutTomZombie([oZombie]);
					break;
				case a > 5:
					oP.SetTimeoutTomZombie([oZombie]);
			}
		},
		StartGameMusic: "Moongrains",
	},
	{
		AZ: [
			[oZombie, 2, 1],
			[oZombie2, 2, 1],
			[oZombie3, 1, 1],
			[oScreenDoorZombie, 1, 1],
		],
		FlagNum: 10,
		FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
		FlagToMonitor: { 9: [ShowLargeWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/Card/Plants/HypnoShroom.webp", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oHypnoShroom, 16);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
		},
	}
);
