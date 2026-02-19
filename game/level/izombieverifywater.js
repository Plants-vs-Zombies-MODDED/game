pNameValue = [];
zNameValue = [];
// make sure everything in levelDataToLoad is defined
if (typeof levelDataToLoad === "undefined") {
	alert("Invalid level data!");
	SelectModal(0);
} else {
	// make sure its a table the one with {}
	if (typeof levelDataToLoad !== "object") {
		alert("Invalid level data!");
		SelectModal(0);
	}
	// make sure it has the right keys
	if (
		!Object.hasOwn(levelDataToLoad, "plants") ||
		!Object.hasOwn(levelDataToLoad, "music") ||
		!Object.hasOwn(levelDataToLoad, "sun") ||
		!Object.hasOwn(levelDataToLoad, "lfValue") ||
		!Object.hasOwn(levelDataToLoad, "stripeCol")
	) {
		/* alert("Invalid level data!");
		SelectModal(0); */
		levelDataToLoad = {
			lfValue: [0, 1, 1, 2, 2, 1, 1],
			music: "Cerebrawl",
			name: "Error",
			plants: [
				{
					plantCol: 2,
					plantName: "oWallNut",
					plantRow: 1,
					zIndex: 3,
				},
				{
					plantCol: 1,
					plantName: "oWallNut",
					plantRow: 1,
					zIndex: 3,
				},
				{
					plantCol: 1,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 1,
					plantName: "oLilyPad",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 1,
					plantName: "oWallNut",
					plantRow: 2,
					zIndex: 6,
				},
				{
					plantCol: 1,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 2,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 2,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 1,
					plantName: "oWallNut",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 1,
					plantName: "oWallNut",
					plantRow: 5,
					zIndex: 15,
				},
				{
					plantCol: 2,
					plantName: "oWallNut",
					plantRow: 5,
					zIndex: 15,
				},
				{
					plantCol: 4,
					plantName: "oWallNut",
					plantRow: 5,
					zIndex: 15,
				},
				{
					plantCol: 4,
					plantName: "oLilyPad",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 4,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 4,
					plantName: "oWallNut",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 4,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 5,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 5,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 7,
					plantName: "oWallNut",
					plantRow: 5,
					zIndex: 15,
				},
				{
					plantCol: 7,
					plantName: "oLilyPad",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 7,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 8,
					plantName: "oLilyPad",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 7,
					plantName: "oWallNut",
					plantRow: 4,
					zIndex: 12,
				},
				{
					plantCol: 7,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
				{
					plantCol: 8,
					plantName: "oWallNut",
					plantRow: 3,
					zIndex: 9,
				},
			],
			stripeCol: 9,
			sun: 0,
		};
	}
	// make sure the keys are the right types
	if (
		!Array.isArray(levelDataToLoad.plants) ||
		typeof levelDataToLoad.music !== "string" ||
		typeof levelDataToLoad.sun !== "number" ||
		typeof levelDataToLoad.name !== "string" ||
		!Array.isArray(levelDataToLoad.lfValue) ||
		typeof levelDataToLoad.stripeCol !== "number"
	) {
		alert("Invalid level data!");
		SelectModal(0);
	}
}
for (let i = 0; i < levelDataToLoad.plants.length; i++) {
	let plant = levelDataToLoad.plants[i];
	if (!pNameValue.includes(window[plant.plantName])) {
		pNameValue.push(window[plant.plantName]);
	}
}
if (levelDataToLoad.selectedZombies) {
	for (let i = 0; i < levelDataToLoad.selectedZombies.length; i++) {
		let zombie = levelDataToLoad.selectedZombies[i];
		if (!zNameValue.includes(window[zombie])) {
			zNameValue.push(window[zombie]);
		}
	}
}
// if lfValue is [0, 1, 1, 2, 2, 1, 1], then we use background4, otherwise background2
backgroundImage = levelDataToLoad.lfValue[3] === 2 ? "images/interface/background4.jpg" : "images/interface/background2.jpg";
// if its [0, 1, 1, 2, 2, 1, 1], then we use 6 brains, otherwise 5
brainsNum = levelDataToLoad.lfValue[3] === 2 ? 6 : 5;
CSpeed(1, 10, 1);
oS.Init(
	{
		PName: pNameValue,
		ZName:
			zNameValue.length === 0
				? [
						oIZombie,
						oIConeheadZombie,
						oIBucketheadZombie,
						oIDuckyTubeZombie1,
						oIDuckyTubeZombie2,
						oIDuckyTubeZombie3,
						oIScreenDoorZombie,
						oIPoleVaultingZombie,
						oIBalloonZombie,
					]
				: zNameValue,
		PicArr: [backgroundImage, "images/interface/trophy.png", "images/interface/Stripe.png"],
		backgroundImage,
		Coord: 2,
		DKind: 0,
		LF: levelDataToLoad.lfValue,
		ShowScroll: false,
		ProduceSun: false,
		SunNum: levelDataToLoad.sun,
		BrainsNum: 6,
		CardKind: 1,
		LevelName: "VERIFICATION: " + levelDataToLoad.name,
		LvlEName: "izombieverifywater",
		LoadMusic: levelDataToLoad.music,
		StartGameMusic: levelDataToLoad.music,
		ArP: {
			ArC: [1, levelDataToLoad.stripeCol - 1],
			ArR: [1, 6],
			Auto: 1,
			P: {
				Arr: [],
				Arr1: [],
				Arr2: [],
			},
		},
		RandomGrow(Point, Arr) {
			/*Point.sort(function () {
            return Math.random() - 0.5;
        });
        Arr.sort(function () {
            return Math.random() - 0.5;
        });
        while (Point.length && Arr.length)
            CustomSpecial(
                oS.PName[Arr[Arr.length - 1]],
                Point[Point.length - 1][1],
                Point[Point.length - 1][0],
                1
            ),
                Point.length--,
                Arr.length--;*/
		},
		LvlClearFunc() {
			$("dMenu0").style.display = "";
			SetVisible(document.querySelector("#dOptionsMenu > div[onclick='ShowSpeed()']"));
			SetVisible(document.querySelector("img[src='images/interface/icon_speed.png']"));
			document.querySelector("#dOptionsMenu > div[onclick='ShowSpeed()']").style.cssText = "";
		},
		RiddleAutoGrow() {
			var k = oS.ArP;
			var f = k.ArC;
			var j = k.ArR;
			var e = k.P;
			var d = oS.PName;
			var Arr = [];
			var SummonRange = function (Arr, l, r) {
				for (; l <= r; ++l) {
					for (var j = f[0]; j <= f[1]; ++j) {
						Arr.push([j, l]);
					}
				}
			};
			/*for (var i = f[0]; i <= f[1]; ++i)
            CustomSpecial(oILilyPad, 3, i), CustomSpecial(oLilyPad, 4, i); // 荷叶*/
			(SummonRange(Arr, 3, 4), oS.RandomGrow(Arr, e.Arr)); // 处理泳池的植物
			(SummonRange(Arr, 1, 2), SummonRange(Arr, 5, 6), oS.RandomGrow(Arr, e.Arr1), oS.RandomGrow(Arr, e.Arr)); // 处理剩余的植物
			(SummonRange(Arr, 1, 6), oS.RandomGrow(Arr, e.Arr2)); // 处理南瓜头
			for (var i = j[0]; i <= j[1]; ++i) {
				CustomSpecial(oBrains, i, 0);
			} // 脑子
			NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(levelDataToLoad.stripeCol)[0] - 11) + "px;top:65px", EDAll);
		},
		StartGame() {
			restoreToPlants(levelDataToLoad); // load the plants
			// clear all query parameters from the url without reloadng
			window.history.pushState({}, document.title, window.location.pathname);
			$("dMenu0").style.display = "none";
			SetHidden(document.querySelector("#dOptionsMenu > div[onclick='ShowSpeed()']"));
			SetHidden(document.querySelector("img[src='images/interface/icon_speed.png']"));
			document.querySelector("#dOptionsMenu > div[onclick='ShowSpeed()']").style.cursor = "url(images/interface/Cursor.cur) 0 0, auto";
			(oP.Monitor(), BeginCool());
			SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
			oS.RiddleAutoGrow();
		},
	},
	{
		FlagToEnd() {
			NewImg("imgSFNT", "images/interface/trophy.png", "left:417px;top:233px;z-index:255", EDAll, {
				onclick() {
					PlaySound2("winmusic");
					SetHidden(document.querySelector(".trophy"));
					let closeButton = document.createElement("input");
					closeButton.setAttribute("type", "button");
					closeButton.setAttribute("value", "EXIT");
					closeButton.id = "btnNextLevel"; // not actually a next level button, but it's the same style
					closeButton.style.top = "60%";
					closeButton.style.left = "calc(33.333% - 56.5px)"; // "calc(50% - 120px)";
					closeButton.onclick = function () {
						$("dAll").style.zIndex = "";
						let oldLv = oS.Lvl;
						SelectModal(0);
						SetBlock($("dSurface"), $("iSurfaceBackground"));
						oS.Lvl = oldLv;
					};
					closeButton.style.zIndex = "1000";
					closeButton.style.display = "none"; // hide the button until after upload is done
					$("dAll").appendChild(closeButton);
					let coverElement = document.createElement("div");
					coverElement.style.position = "absolute";
					coverElement.style.left = "0";
					coverElement.style.top = "0";
					coverElement.style.width = "100%";
					coverElement.style.height = "100%";
					coverElement.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
					coverElement.style.zIndex = "999";
					$("dAll").appendChild(coverElement);
					let titleElement = document.createElement("div");
					titleElement.style.position = "absolute";
					titleElement.style.left = "50%";
					titleElement.style.top = "30%";
					titleElement.style.transform = "translate(-50%, -50%)";
					titleElement.style.width = "40%";
					titleElement.style.height = "40px";
					titleElement.innerText = "Configuring...";
					titleElement.style.fontSize = "xx-large";
					titleElement.style.textAlign = "center";
					titleElement.style.color = "white";
					titleElement.style.zIndex = "1000";
					$("dAll").appendChild(titleElement);
					$("dAll").style.zIndex = "10000";
					const author = prompt("Author name:");
					const newLevelData = encodeIZL3(levelDataToLoad);
					let serverConfig;
					fetch(`${$User.Server.URL}/api/config`, {
						headers: {
							Accept: "application/msgpack",
						},
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error("Failed to get server configuration");
							}
							return response.arrayBuffer();
						})
						.then((config) => {
							serverConfig = msgpack.deserialize(config);
							let turnstileToken;
							let container;
							if (serverConfig.turnstileEnabled) {
								container = document.createElement("div");
								container.style.position = "absolute";
								container.style.left = "50%";
								container.style.top = "50%";
								container.style.transform = "translate(-50%, -50%)";
								container.style.zIndex = "1000";
								container.id = "turnstile-container";

								window.turnstile.render(container, {
									sitekey: serverConfig.turnstileSiteKey,
									callback(token) {
										turnstileToken = token;
									},
								});
							}
							titleElement.innerText = "Please complete the verification";
							$("dAll").appendChild(container);

							// function to wait for turnstile token if enabled
							function waitForTurnstileToken() {
								return new Promise((resolve) => {
									if (!serverConfig.turnstileEnabled) {
										resolve(null);
										return;
									}

									const checkToken = () => {
										if (turnstileToken) {
											resolve(turnstileToken);
										} else {
											setTimeout(checkToken, 500);
										}
									};
									checkToken();
								});
							}

							// wait for turnstile token or proceed immediately if disabled
							waitForTurnstileToken().then((token) => {
								titleElement.innerText = "Uploading...";

								// prepare query parameters
								const queryParams = new URLSearchParams();
								queryParams.append("author", author || "Anonymous");
								if (token) {
									queryParams.append("turnstileResponse", token);
								}

								// upload level data as octet-stream
								fetch(`${$User.Server.URL}/api/levels?${queryParams.toString()}`, {
									method: "POST",
									headers: {
										"Content-Type": "application/octet-stream",
									},
									body: newLevelData,
								})
									.then((response) => {
										if (!response.ok) {
											return response.json().then((data) => {
												throw new Error(data.error + (data.message ? ` (${data.message})` : "") || "Failed to upload level");
											});
										}
										return response.json();
									})
									.then((data) => {
										console.log("Level uploaded successfully:", data);
										titleElement.innerText = `Level uploaded successfully! ID: ${data.id}`;

										// show close button again
										closeButton.style.display = "";
										closeButton.style.top = "75%";
										closeButton.style.top = "50%";
										closeButton.style.left = "50%";
										closeButton.style.transform = "translate(-50%, -50%)";
									})
									.catch((error) => {
										console.error("Error uploading level:", error);
										titleElement.innerText = `Upload failed: ${error.message}`;

										// show close button again
										closeButton.style.display = "";
									})
									.finally(() => {
										// remove turnstile container if it exists
										const turnstileContainer = document.getElementById("turnstile-container");
										if (turnstileContainer) {
											turnstileContainer.remove();
										}
									});
							});
						})
						.catch((error) => {
							console.error("Error fetching server configuration:", error);
							titleElement.innerText = "Failed to load server configuration";

							setTimeout(() => {
								closeButton.style.display = "";
								uploadButton.style.display = "";
								downloadButton.style.display = "";
								levelDataElement.style.display = "";
								copyButtonElement.style.display = "";
								titleElement.innerText = "Here's your level data - keep this somewhere safe!";
							}, 3000);
						});
				},
			});
		},
	}
);
