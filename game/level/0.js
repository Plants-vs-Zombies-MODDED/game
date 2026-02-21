oS.Init({
	PicArr: (function () {
		var b = 32;
		var a = "images/interface/";
		return [
			ShadowPNG,
			a + "Sun.gif",
			a + "ZombieHand.png",
			a + "OptionsMenuback" + b + ".png",
			a + "OptionsBackButton" + b + ".png",
			a + "Sunflower_trophy" + b + ".png",
			a + "Surface.png",
			a + "Help.png",
			a + "WoodSign2_Top.png",
			a + "WoodSign2_Accountless.png",
			a + "WoodSign2_Account.png",
			a + "WoodSign2_Bottom",
			//      a + "SelectorScreenSurvival_" + b + ".png",
			a + "SelectorScreen_Almanac_" + b + ".png",
			a + "Logo.png",
			b + "LawnCleaner.png",
			a + "ZombiesWon.webp",
			a + "LargeWave.gif",
			a + "FinalWave.gif",
			a + "PrepareGrowPlants.png",
			a + "PointerUP.gif",
			a + "PointerDown.gif",
			a + "Shovel.png",
			a + "SunBack.png",
			a + "ShovelBack.png",
			a + "GrowSoil.gif",
			a + "GrowSpray.gif",
			a + "SeedChooser_Background.png",
			a + "Button.png",
			a + "Almanac_IndexBack.jpg",
			a + "Almanac_IndexButton.png",
			a + "Almanac_CloseButton.png",
			a + "Almanac_PlantBack.jpg",
			a + "Almanac_PlantCard.png",
			a + "Almanac_ZombieBack.jpg",
			a + "Almanac_ZombieCard.png",
			a + "ZombiesWon.webp",
			a + "AwardScreen_Back.jpg",
			a + "trophy.png",
			a + "splash.png",
			a + "brain.png",
			//      a + "SelectorScreen_Shadow_Adventure.png",
			//     a + "SelectorScreen_Shadow_Survival.png",
			//      a + "SelectorScreen_Shadow_Challenge.png",
			"images/interface/Almanac_Ground.png",
			a + "Almanac_ZombieWindow2.png",
			a + "Challenge_Background.jpg",
			a + "Challenge.png",
			a + "BZ.png",
			a + "PoolCleaner.png",
			a + "plantshadow32.png",
			a + "Dave2.gif",
			a + "Dave.gif",
			a + "Dave3.gif",
			//        a + "SelectorScreenChallenges_32.png",
			//        a + "SelectorScreenStartAdventure_32.png",
			a + "version.png",
			//     a + "TowerEntrance.png",
			a + "Tombstone_mounds.png",
			a + "Tombstones.png",
			"images/Zombies/Balloon/popped.png",
			"images/Zombies/Balloon/balloonidle.png",
			a + "Note.png",
			a + "NoteBG_DragonPalace.png",
			a + "NoteBG_Night.png",
			a + "NoteBG_WaterTown.png",
			a + "NoteBG.png",
			a + "ZombieNote1.png",
			a + "ZombieNote2.png",
			a + "ZombieNote3.png",
			a + "ZombieNote4.png",
			a + "ZombieNoteB.png",
			a + "ZombieNoteHelp.png",
			a + "ZombieNoteLG.png",
		];
	})(),
	LevelName: "Game initial interface",
	LevelEName: 0,
	ShowScroll: 1,
	LoadMusic: "MyScrapbook",
	StartGameMusic: "MyScrapbook",
	AudioArr: [
		"losemusic",
		"winmusic",
		"groan2",
		"scream",
		"awooga",
		"plantsgarden",
		"groan1",
		"groan3",
		"groan4",
		"groan5",
		"groan6",
		"scream",
		"siren",
		"readysetplant",
		"hugewave",
		"finalwave",
		"plant1",
		"plant2",
		"plant_water",
		"seedlift",
		"points",
		"buttonclick",
		"gravebutton",
		"pause",
		"shovel",
		"bleep",
		"chomp",
		"chompsoft",
		"tap",
		"crazydaveshort1",
		"crazydavelong1",
		"crazydavelong2",
		"crazydavelong3",
		"ZombiesOnYourLawn",
	],
	backgroundImage: "images/interface/Logo.png",
	LoadAccess(a) {
		NewEle(
			0,
			"div",
			"width:225px;height:44px;margin:550px 0 0 694px;position:absolute;z-index:1;background:url(images/interface/version.png)",
			0,
			$("tGround")
		);
		EBody = document.body;
		$User.Mouse.listener = EBody.addEventListener("mousemove", (event) => {
			var zoom = parseFloat(document.body.style.zoom) || 1;
			$User.Mouse.x = Math.floor((event.clientX / zoom - EDAlloffsetLeft) / 0.9);
			$User.Mouse.y = Math.floor((event.clientY / zoom - EDAlloffsetTop) / 0.9);
		});
		EElement = document.documentElement;
		EDAll.scrollLeft = 0;
		EDAll.innerHTML += WordUTF8;
		// document.getElementById("changelog").style.display="block";
		NewAudio({ source: "evillaugh" });
		(function () {
			var b = $("JSProcess");
			var c = $("dProcess2");
			b
				? ($User.Browser.IE
						? (b.onreadystatechange = function () {
								b.readyState === "loaded" && ClearChild(b);
							})
						: (b.onload = function () {
								ClearChild(b);
							}),
					(b.onerror = function () {
						ClearChild(this);
					}),
					(b.src = "" + Math.random()))
				: console.log("Version", oS.Version) /*$("").innerHTML = 4/* oS.Version */;
		})();
		$("dServer") && SetBlock($("dServer"));
	},
});
$("ZombieHand").style.display = "none";
StopSound2("jackinthebox");
$("dAdventureLevel").textContent = getLevelString(StorageUtil.getItem("level"));
