oS.Init(
	{
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper],
		ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oBucketheadZombie],
		PicArr: (function () {
			var a = oRepeater.prototype;
			var b = a.PicArr;
			return ["images/interface/background1.jpg", b[a.CardGif], b[a.NormalGif]];
		})(),
		backgroundImage: "images/interface/background1.jpg",
		CanSelectCard: 1,
		LevelName: "Level 1-8",
		LvlEName: 8,
		LargeWaveFlag: { 10: $("imgFlag1") },
	},
	{
		AZ: [
			[oZombie, 3, 1],
			[oZombie2, 2, 1],
			[oZombie3, 2, 1],
			[oConeheadZombie, 2, 1],
			[oBucketheadZombie, 1, 1],
		],
		FlagNum: 10,
		FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
		FlagToMonitor: { 9: [ShowFinalWave, 0] },
		FlagToEnd() {
			NewImg("imgSF", "images/Card/Plants/Repeater.webp", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
				onclick() {
					GetNewCard(this, oRepeater, 9);
				},
			});
			NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
		},
	}
);
