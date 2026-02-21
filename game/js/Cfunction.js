/* eslint-disable complexity */
var $User = (function () {
	const platform = navigator.platform;
	const userAgent = navigator.userAgent;
	const isWin = platform === "Win32" || platform === "Windows";
	const isMac = platform === "Mac68K" || platform === "MacPPC" || platform === "Macintosh";
	const isUnix = platform === "X11" && !isWin && !isMac;
	const isPC = isWin || isMac || isUnix;

	const isIE = !!(window.attachEvent && !window.opera);
	const isIE6 = isIE && !window.XMLHttpRequest;
	const isHTTP = location.protocol.toLowerCase() === "http:" ? 1 : 0;

	// Global Random Helper
	$Random = isHTTP ? "#" : "?";

	// Text setting helper
	innerText = function (element, text) {
		element.textContent = text;
	};

	// PNG fix for IE6
	if (isIE6) {
		document.execCommand("BackgroundImageCache", false, true);
		ShadowPNG = "";
	} else {
		ShadowPNG = "images/interface/plantshadow32.png";
	}

	innerHTML = function (element, content) {
		if (element) {
			// Use textContent for plain text, innerHTML only when HTML tags are present
			if (/<[^>]*>/.test(content)) {
				element.innerHTML = content;
			} else {
				console.log("innerHTML called with plain text, using textContent instead.");
				element.textContent = content;
			}
		}
	};

	return {
		Browser: {
			IE: isIE,
			IE6: isIE6,
			IE9: isIE && userAgent.indexOf("MSIE 9.0") > 0,
			Opera: !!window.opera,
			WebKit: userAgent.includes("AppleWebKit/"),
			Gecko: userAgent.includes("Gecko") && !userAgent.includes("KHTML"),
		},
		Server: {
			URL: "https://backend.pvzm.net",
		},
		HTML5: (function () {
			return !!document.createElement("canvas").getContext;
		})(),
		System: { Win: isWin, Mac: isMac, Unix: isUnix },
		Client: { PC: isPC, Mobile: !isPC },
		HTTP: isHTTP,
		AuthorWebsite: "",
		isAuthorWebsite: false,
		Visitor: {
			UserName: "",
			UserAuthority: 0,
			Progress: 1,
			SelectServerT: 0,
			NowStep: 1,
			TimeStep: 10,
			SaveLvl: 1,
			SaveLvlCallBack: null,
		},
		Mouse: { x: 0, y: 0 },
	};
})();

var oSym = {
	// Initialize the symbol object
	Init(callback, args) {
		this.Now = 0; // Current time
		this.Timer = null;
		this.execTask = null;
		// Task Queue: { Time, Function, Arguments }
		this.TQ = [{ T: 0, f: callback, ar: args || [] }];
		this.NowStep = 1; // Time increment step
		this.TimeStep = 10; // Real-time ms per step
		this.Start();
	},
	// Clear all tasks
	Clear() {
		this.TQ.length = 0;
	},
	// Start timers
	Start() {
		document.body.classList.remove("game-paused");
		if (this.Timer == null) {
			// Timer 1: Advance internal game time (Now)
			(function stepTime() {
				try {
					oSym.Now += oSym.NowStep;
				} catch (e) {
					alert("Timeout to quit the game");
					location.reload();
				}
				oSym.Timer = setTimeout(stepTime, oSym.TimeStep);
			})();

			// Timer 2: Execute tasks based on game time
			(function runTasks() {
				const sym = oSym;
				const queue = sym.TQ;
				let len = queue.length;
				let task, func;

				// Iterate backwards to allow safe removal
				while (len--) {
					task = queue[len];
					if (sym.Now >= task.T) {
						try {
							func = task.f;
							func.apply(func, task.ar);
						} catch (err) {
							console.error(err);
						}
						sym.removeTask(len);
					}
				}
				sym.execTask = setTimeout(runTasks, sym.TimeStep);
			})();
		}
	},
	// Stop timers
	Stop() {
		clearTimeout(oSym.Timer);
		clearTimeout(oSym.execTask);
		oSym.Timer = null;
		oSym.execTask = null;
		document.body.classList.add("game-paused");
	},
	// Add task to queue
	addTask(delay, func, args) {
		const queue = this.TQ;
		queue[queue.length] = {
			T: this.Now + delay,
			f: func,
			ar: args,
		};
		return this;
	},
	// Remove task by index
	removeTask(index) {
		this.TQ.splice(index, 1);
		return this;
	},
};

var oS = {
	Version: 5,
	W: 880,
	H: 600,
	C: 9, // Columns
	B: atob,
	LawnMowerX: 70,
	Lvl: 0,
	GlobalVariables: {},
	LvlVariables: {},
	SelfVariables: [],
	LvlClearFunc: null,
	AutoSun: 0,

	// Initialize Level
	Init(config, prototypeData, savedData, sunNum) {
		const win = window;

		// Handle Music
		if (config.LoadMusic) {
			PlayMusic(config.LoadMusic);
			NewAudio({ source: "ChooseYourSeeds", loop: true });
		} else {
			PlayMusic((config.LoadMusic = "ChooseYourSeeds"));
		}

		// Restore/Save Variables
		if (savedData !== sunNum) {
			for (let key in savedData) {
				if (win[key] !== sunNum) {
					this.GlobalVariables[key] = win[key];
					win[key] = savedData[key];
				} else {
					this.LvlVariables[key] = win[key] = savedData[key];
				}
			}
		}

		// Reset Global Lists
		ArCard = [];
		ArPCard = [];
		ArSun = [];
		$Pn = [];
		$Z = [];
		$P = [];

		// DOM Element setup
		EDAll = $("dAll");
		EDPZ = $("dPZ");
		// Use getBoundingClientRect to get actual visual position after CSS transforms
		function updateEDAllOffset() {
			const rect = EDAll.getBoundingClientRect();
			EDAlloffsetLeft = rect.left;
			EDAlloffsetTop = rect.top;
		}
		updateEDAllOffset();
		window.addEventListener("resize", updateEDAllOffset);
		EDNewAll = EDAll.cloneNode(true);
		EDNewFlagMeter = $("dFlagMeter").cloneNode(true);
		ESSunNum = $("sSunNum");

		this.AudioArr = [];
		this.MustAllReady = true;
		this.LoadAccess = null;
		this.InitLawnMower = null;
		this.StartGame = null;
		this.ChoseCard = this.MPID = "";
		this.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
		this.Monitor = null;
		this.UserDefinedFlagFunc = null;
		this.SunNum = sunNum;
		this.BrainsNum = sunNum; // Logic implies sunNum is passed as argument d
		this.HaveFog = 0;

		// AutoSun Logic
		const savedAutoSun = StorageUtil.getItem("JSPVZAutoSun");
		if (savedAutoSun !== null) {
			this.AutoSun = parseInt(savedAutoSun);
			if (this.AutoSun) {
				AutoClickSun();
			}
		}
		const checkbox = document.getElementById("cAutoSun");
		if (checkbox) {
			checkbox.checked = !!this.AutoSun;
		}

		// Load Config into this object
		for (let key in config) {
			this.SelfVariables.push(key);
			this[key] = config[key];
		}

		// Save Position Logic
		if ($User.isAuthorWebsite && oS.LevelEName !== 0) {
			ClearChild($("JSPVZAjax"));
			NewEle(
				"JSPVZAjax",
				"script",
				0,
				{
					src: $User.Server.DataURL + "asp/SaveUserPosition.asp?l=" + escape(oS.LevelName),
					type: "text/javascript",
				},
				document.body
			);
		}

		// Defaults
		if (!this.PicArr) {
			this.PicArr = [];
		}
		if (!this.PName) {
			this.PName = [];
		}
		if (!this.ZName) {
			this.ZName = [];
		}
		if (!this.backgroundImage) {
			this.backgroundImage = "images/interface/background1.jpg";
		}
		if (!this.LF) {
			this.LF = [0, 1, 1, 1, 1, 1];
		} // Lane types
		if (!this.ZF) {
			this.ZF = this.LF;
		} // Zombie spawn lanes
		if (!this.LargeWaveFlag) {
			this.LargeWaveFlag = {};
		}
		if (!this.StartGameMusic) {
			this.StartGameMusic = "Grasswalk";
		}

		this.ArCard = this.CardKind === sunNum ? config.PName : config.ZName;

		if (this.SunNum === sunNum) {
			this.SunNum = 50;
		}
		if (this.CanSelectCard === sunNum) {
			this.CanSelectCard = 1;
		}
		if (this.DKind === sunNum) {
			this.DKind = 1;
		}
		if (this.StaticCard === sunNum) {
			this.StaticCard = 1;
		}
		if (this.ShowScroll === sunNum) {
			this.ShowScroll = true;
		}
		if (this.ProduceSun === sunNum) {
			this.ProduceSun = true;
		}
		if (this.Coord === sunNum) {
			this.Coord = 1;
		}

		// Initialize Systems
		oCoord[this.Coord]();
		oP.Init(prototypeData);
		oT.Init(this.R);
		oZ.Init(this.R);
		oGd.Init();
		this.LoadTips();
		this.LoadProgress();
	},
	LoadTips() {
		const tipsDiv = NewEle("dTips", "div", "position:absolute;color:#fff;top:450px;width:100%;text-align:center;font-size:16px", "", EDAll);
		const tips = [
			"Some zombies wear hats, strong hats.",
			"Clicking on Balloonatics gives you extra sun! Get ready for those little suckers at the start of every wave!",
			'There have been rumors about "Alien Balloons" wandering around Neighborville and their "Green Glow", but I personally dont believe them.',
			"Did you know that Dolphin Riders ride on a dolphin? Pretty self-explanatory. But what if I told you that the dolphin is also a zombie?",
			"The Laser Bean can see your dreams.",
			"Did you know that the Balloonatic face was made at 3AM? It doesn't really matter though, hes cute regardless (and silly)",
			"Sunflowers produce sun.",
			"Peashooters shoot peas",
		];
		tipsDiv.innerHTML = `<span style="font-weight:bold"></span><span>${tips[Math.floor(Math.random() * tips.length)]}</span>`;
	},
	LoadProgress(r, l, a, t, b) {
		SetVisible($("dFlagMeter"));
		SetHidden($("imgGQJC"));

		const self = oS;
		const picArr = self.PicArr;
		const pNames = self.PName;
		const zNames = self.ZName;
		const backgroundWidth = GetX(11);
		const zLanes = oGd.$ZF;
		const maxR = oS.R + 1;
		const titleDiv = $("dFlagMeterTitle");

		// Brain and Cleaner Elements
		NewImg(0, "images/interface/brain.png", "", ($Pn.oBrains = NewEle(0, "div", "position:absolute")));
		switch (self.Coord) {
			case 2:
				NewImg(0, "images/interface/PoolCleaner.png", "", ($Pn.oPoolCleaner = NewEle(0, "div", "position:absolute")));
			// fallthrough
			case 1:
				NewImg(0, "images/interface/LawnCleaner.png", "", ($Pn.oLawnCleaner = NewEle(0, "div", "position:absolute")));
				break;
		}

		// Load Plant Resources
		let i = pNames.length;
		while (i--) {
			let proto = pNames[i].prototype;
			Array.prototype.push.apply(picArr, proto.PicArr.slice(0));
			if ($User.HTML5) {
				let audioArr = proto.AudioArr;
				let audioLen = audioArr.length;
				while (audioLen--) {
					NewAudio({ source: audioArr[audioLen] });
				}
			}
		}

		// Ensure Flag Zombie exists for large waves
		for (let flag in oS.LargeWaveFlag) {
			zNames[zNames.length] = oS.FlagZombie || oFlagZombie;
			break;
		}

		// Load Zombie Resources and Init
		let j = zNames.length;
		while (j--) {
			let zombieClass = zNames[j];
			let proto = zombieClass.prototype;
			Array.prototype.push.apply(picArr, proto.PicArr.slice(0));
			if ($User.HTML5) {
				let audioArr = proto.AudioArr;
				let audioLen = audioArr.length;
				while (audioLen--) {
					NewAudio({ source: audioArr[audioLen] });
				}
			}
			proto.Init.call(zombieClass, backgroundWidth, proto, zLanes, maxR);
		}

		self.PicNum = picArr.length;
		let k = picArr.length;

		// Setup Start Click
		titleDiv.setAttribute("title", "");
		titleDiv.style.cursor = "url(images/interface/Pointer.cur),pointer";
		titleDiv.onclick = function () {
			oS.MustAllReady = false;
			oS.LoadReady(oS);
		};

		// Preload Images
		while (k--) {
			self.LoadImage(picArr[k], self.CheckImg);
		}

		oS.LoadAudio();
	},
	LoadAudio: $User.HTML5
		? function () {
				let i = oS.AudioArr.length;
				while (i--) {
					NewAudio({ source: oS.AudioArr[i] });
				}
			}
		: function () {},
	InitPn(arr) {
		const ele = ($Pn[arr[0]] = NewEle(0, "div", "position:absolute"));
		NewImg(0, ShadowPNG, arr[2], ele);
		NewImg(0, arr[1], "", ele);
		oS.CheckImg();
	},
	LoadImage: $User.Browser.IE
		? function (src, callback, args) {
				const img = new Image();
				img.onreadystatechange = function () {
					if (img.readyState === "complete") {
						callback(args, 1);
					}
				};
				img.onerror = function () {
					img.onreadystatechange = null;
					img.title = src;
					callback(args, 0);
				};
				img.src = src;
			}
		: function (src, callback, args) {
				const img = new Image();
				img.src = src;
				if (img.complete) {
					callback(args, 1);
				} else {
					img.onload = function () {
						if (img.complete) {
							callback(args, 1);
						}
					};
					img.onerror = function () {
						img.title = src;
						callback(args, 0);
					};
				}
			},
	LoadScript: $User.Browser.IE
		? function (id, src, callback, parent, args) {
				const script = NewEle(id, "script", 0, { type: "text/javascript" });
				script.onreadystatechange = function () {
					if (script.readyState === "loaded" || script.readyState === "complete") {
						script.onreadystatechange = null;
						callback(args, 1);
					}
				};
				script.onerror = function () {
					script.onreadystatechange = null;
					callback(args, 0);
				};
				script.src = src;
				parent.appendChild(script);
			}
		: function (id, src, callback, parent, args) {
				const script = NewEle(id, "script", 0, { type: "text/javascript" });
				script.onload = function () {
					callback(args, 1);
				};
				script.onerror = function () {
					callback(args, 0);
				};
				script.src = src;
				parent.appendChild(script);
			},
	CheckImg(b, a) {
		const self = oS;
		if (self.AccessNum > self.PicNum || !self.MustAllReady) {
			return;
		}
		// Calculate progress bar position
		const pos = 139 - (self.AccessNum++ * 140) / self.PicNum - 11;
		$("imgFlagHead").style.left = pos + "px";
		$("sFlagMeterTitleF").innerHTML =
			`<span style="cursor:url(images/interface/Pointer.cur),pointer;font-family:Tahoma;color:#fff">Loading...(${self.AccessNum}/${self.PicNum})</span>`;
		$("imgFlagMeterFull").style.clip = "rect(0,auto,21px," + (pos + 11) + "px)";

		if (self.AccessNum === self.PicNum) {
			if (self.MustAllReady) {
				self.LoadReady(self);
			}
		}
	},
	LoadReady(config) {
		const titleDiv = $("dFlagMeterTitle");
		if (titleDiv.onclick == null) {
			return;
		}

		ClearChild($("dTips"));
		oSym.NowStep = $User.Visitor.NowStep;
		oSym.TimeStep = $User.Visitor.TimeStep;
		titleDiv.onclick = null;
		titleDiv.title = null;
		titleDiv.style.cursor = "url(images/interface/Cursor.cur),default";

		SetHidden($("dFlagMeterContent"), dFlagMeter);
		$("dFlagMeter").style.top = "490px";
		$("sFlagMeterTitleF").innerHTML = $("dFlagMeterTitleB").innerHTML = config.LevelName;
		$("imgFlagHead").style.left = "139px";
		$("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)";

		// Cleanup config object
		delete config.PicArr;
		delete config.Coord;
		delete config.LF;
		delete config.ZF;

		const bgStyle = {
			background: "url(" + config.backgroundImage + ") no-repeat",
			visibility: "visible",
		};
		if (!config.ShowScroll) {
			bgStyle.left = "-115px";
		}

		SetStyle($("tGround"), bgStyle);
		$("tGround").innerHTML = oS.GifHTML;

		const startGame = function (delay, zombies) {
			const self = oS;
			NewImg("imgGrowSoil", "images/interface/GrowSoil.gif", "visibility:hidden;z-index:50", EDAll);
			NewImg("imgGrowSpray", "images/interface/GrowSpray.gif", "visibility:hidden;z-index:50", EDAll);
			innerText(ESSunNum, self.SunNum);
			if (zombies) {
				InitZCard();
			} else {
				InitPCard();
			}

			if (self.ShowScroll) {
				oSym.addTask(
					delay === undefined ? 200 : delay,
					(div) => {
						ClearChild(div);
						self.ScrollScreen();
					},
					[NewEle("DivParty", "div", "line-height:50px;color:#FFFFFF;font-size:50px;font-family:Tahoma", {}, EDAll)]
				);
			} else {
				SetVisible($("dMenu"));
				AutoSelectCard();
				LetsGO();
			}
		};

		config.LoadAccess ? config.LoadAccess(startGame) : startGame();
	},
	ScrollScreen() {
		DisplayZombie();
		var startScroll = EDAll.scrollLeft;
		var progress = 0;
		var steps = 60;
		(function scrollStep() {
			progress += 1 / steps;
			if (progress < 1) {
				EDAll.scrollLeft = interpolate(startScroll, 500, progress, easeInOutSine);
				oSym.addTask(2, scrollStep, []);
			} else {
				EDAll.scrollLeft = 500;
				SetVisible($("dMenu"));
				if (oS.CanSelectCard) {
					SetVisible($("dTop"), $("dCardList"));
					if ($("dSelectCard").className === "zombies") {
						$("dSelectCard").className = "show";
						$("dSelectCard").classList.add("zombies");
					} else {
						$("dSelectCard").className = "show";
					}
					$("dSelectCard")
						.getAnimations()
						.forEach((a) => (a.playbackRate = oSym.NowStep));
				} else {
					AutoSelectCard();
					oSym.addTask(200, oS.ScrollBack, [LetsGO]);
				}
			}
		})();
	},
	ScrollBack(callback) {
		SetHidden($("dTitle"), $("dCardList"));
		SetHidden($("dTop"));
		if ($("dSelectCard").className === "show") {
			$("dSelectCard").className = "hide";
			$("dSelectCard")
				.getAnimations()
				.forEach((a) => (a.playbackRate = oSym.NowStep));
		}

		EDAll.scrollLeft = 500;
		var tGround = $("tGround");
		var progress = 0;
		var steps = 60;
		(function scrollStep(cb) {
			progress += 1 / steps;
			if (progress < 1) {
				EDAll.scrollLeft = interpolate(500, 0, progress, easeInOutSine);
				tGround.style.transform = "translateX(" + interpolate(0, -115, progress, easeInOutSine) + "px)";
				$("dZombie").style.transform = "translateX(" + interpolate(0, -115, progress, easeInOutSine) + "px)";
				oSym.addTask(2, scrollStep, [cb]);
			} else {
				EDAll.scrollLeft = 0;
				tGround.style.transform = "";
				$("dZombie").style.transform = "";
				tGround.style.left = "-115px";
				if (oS.CanSelectCard) {
					SetVisible($("dTop"));
				}
				SetHidden($("dZombie"));
				$("dZombie").innerHTML = "";
				cb();
			}
		})(callback);
	},
};

var oCoord = {
	// 5-Row Layout
	1() {
		oS.R = 5;
		ChosePlantX = function (x) {
			return Compare(GetC(x), 1, oS.C, GetX);
		};
		ChosePlantY = function (y) {
			return $SSml(
				y,
				[86, 181, 281, 386, 476],
				[
					[75, 0],
					[175, 1],
					[270, 2],
					[380, 3],
					[470, 4],
					[575, 5],
				]
			);
		};
		GetC = function (x) {
			return $SSml(x, [-50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		};
		GetR = function (y) {
			return $SSml(y, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5]);
		};
		GetX = function (c) {
			return $SEql(c, {
				"-2": -50,
				"-1": 100,
				0: 140,
				1: 187,
				2: 267,
				3: 347,
				4: 427,
				5: 507,
				6: 587,
				7: 667,
				8: 747,
				9: 827,
				10: 865,
				11: 950,
			});
		};
		GetY = function (r) {
			return $SEql(r, { 0: 75, 1: 175, 2: 270, 3: 380, 4: 470, 5: 575 });
		};
		GetY1Y2 = function (r) {
			return $SEql(r, {
				0: [0, 85],
				1: [86, 180],
				2: [181, 280],
				3: [281, 385],
				4: [386, 475],
				5: [476, 600],
			});
		};
		GetX1X2 = function (c) {
			return $SEql(c, {
				"-2": [-100, -49],
				"-1": [-50, 99],
				0: [100, 139],
				1: [140, 219],
				2: [220, 294],
				3: [295, 378],
				4: [379, 459],
				5: [460, 539],
				6: [540, 624],
				7: [625, 694],
				8: [695, 774],
				9: [775, 854],
				10: [855, 934],
				11: [950, 1030],
			});
		};
		getRowColumnFromPixels = function (pixelX, pixelY) {
			let rowWidth = 129;
			let columnWidth = 170;
			return [Math.floor(pixelX / rowWidth) + 1, Math.floor(pixelY / columnWidth) + 1];
		};
		if (!oS.InitLawnMower) {
			oS.InitLawnMower = function () {
				let r = 6;
				while (--r) {
					CustomSpecial(oLawnCleaner, r, -1);
				}
			};
		}
		oS.GifHTML = "";
	},
	// 6-Row Layout (Pool)
	2() {
		oS.R = 6;
		ChosePlantX = function (x) {
			return Compare(GetC(x), 1, oS.C, GetX);
		};
		ChosePlantY = function (y) {
			return $SSml(
				y,
				[86, 171, 264, 368, 440, 532],
				[
					[75, 0],
					[161, 1],
					[254, 2],
					[358, 3],
					[430, 4],
					[524, 5],
					[593, 6],
				]
			);
		};
		GetC = function (x) {
			return $SSml(x, [-50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		};
		GetR = function (y) {
			return $SSml(y, [86, 171, 264, 368, 440, 532], [0, 1, 2, 3, 4, 5, 6]);
		};
		GetX = function (c) {
			return $SEql(c, {
				"-2": -50,
				"-1": 100,
				0: 140,
				1: 187,
				2: 267,
				3: 347,
				4: 427,
				5: 507,
				6: 587,
				7: 667,
				8: 747,
				9: 827,
				10: 865,
				11: 950,
			});
		};
		GetY = function (r) {
			return $SEql(r, { 0: 75, 1: 165, 2: 253, 3: 355, 4: 430, 5: 522, 6: 587 });
		};
		GetY1Y2 = function (r) {
			return $SEql(r, {
				0: [0, 85],
				1: [86, 170],
				2: [171, 263],
				3: [264, 367],
				4: [368, 439],
				5: [440, 531],
				6: [532, 600],
			});
		};
		GetX1X2 = function (c) {
			return $SEql(c, {
				"-2": [-100, -49],
				"-1": [-50, 99],
				0: [100, 139],
				1: [140, 219],
				2: [220, 294],
				3: [295, 378],
				4: [379, 459],
				5: [460, 539],
				6: [540, 624],
				7: [625, 694],
				8: [695, 774],
				9: [775, 854],
				10: [855, 934],
				11: [950, 1030],
			});
		};
		if (!oS.InitLawnMower) {
			oS.InitLawnMower = function () {
				CustomSpecial(oLawnCleaner, 1, -1);
				CustomSpecial(oLawnCleaner, 2, -1);
				CustomSpecial(oPoolCleaner, 3, -1);
				CustomSpecial(oPoolCleaner, 4, -1);
				CustomSpecial(oLawnCleaner, 5, -1);
				CustomSpecial(oLawnCleaner, 6, -1);
			};
		}
		oS.GifHTML = '<img style="position:absolute;left:253px;top:278px" src="">';
		if (!oS.DKind) {
			oGd.MakeFog();
		}
	},
};

var oP = {
	Init(config) {
		const self = this;
		self.NumZombies = self.FlagZombies = 0;
		self.AZ = [];
		self.ArZ = [];
		self.MustShowAtFlag = {};
		if (config) {
			for (let key in config) {
				self[key] = config[key];
			}
			if (config.AZ) {
				// Parse AZ (Array Zombies) configuration
				let rawAZ = config.AZ;
				let schedule = {};
				let azList = [];
				let i = rawAZ.sort((a, b) => a[2] - b[2]).length;

				while (i--) {
					let entry = rawAZ[i];
					let zombieType = entry[0];
					let count = entry[1];
					let weight = entry[2];
					let flags = entry[3];

					while (count--) {
						azList.push([zombieType, weight]);
					}
					if (flags) {
						let fLen = flags.length;
						while (fLen--) {
							let flagNum = flags[fLen];
							schedule[flagNum] ? schedule[flagNum].push(zombieType) : (schedule[flagNum] = [zombieType]);
						}
					}
				}
				self.AZ = azList;
				self.MustShowAtFlag = schedule;
			}
		}

		if (config && config.FlagNum) {
			self.FlagHeadStep = Math.floor(140 / (config.FlagNum - 1));
			self.MonPrgs = function () {
				const p = oP;
				let curFlag = p.FlagZombies;
				const user = $User.Visitor;

				if (!--p.NumZombies) {
					if (curFlag < p.FlagNum) {
						p.ReadyFlag = ++curFlag;
						oSym.addTask(500, p.FlagPrgs, []);
					} else {
						p.FlagToEnd();
						if ($User.isAuthorWebsite && $User.Visitor.UserName !== "") {
							ClearChild($("JSPVZAjax"));
							if (user.SaveLvl) {
								NewEle("JSPVZAjax", "script", 0, {}, document.body);
							}
						}
						if (user.SaveLvlCallBack) {
							user.SaveLvlCallBack({
								UserName: user.UserName,
								SunNum: oS.SunNum,
								Lvl: oS.Lvl,
								T: oSym.Now - oS.StartTime,
							});
						}

						// Update Progress Display
						if (!isNaN(Math.floor(oS.Lvl))) {
							let advDiv = $("dAdventure");
							$User.Visitor.Progress = ++oS.Lvl;
							if (advDiv && advDiv.firstChild && advDiv.childNodes && advDiv.childNodes[1]) {
								advDiv.firstChild.innerHTML = Math.ceil(oS.Lvl / 10);
								let subLvl = oS.Lvl - Math.floor(oS.Lvl / 10) * 10;
								advDiv.childNodes[1].innerHTML = subLvl ? subLvl : subLvl + 1;
							}
						}

						NewEle(
							"DivA",
							"div",
							"position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:255",
							0,
							EDAll
						);
						PauseGame($("dMenu0"), 1);
					}
				}
			};
		} else {
			self.MonPrgs = function () {};
		}

		if (!config || !config.FlagToEnd) {
			self.FlagToEnd = function () {
				NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px;z-index:255", EDAll, {
					onclick() {
						PlaySound2("winmusic");
						SelectModal(0);
						HiddenOptions();
						SetBlock($("dSurface"), $("iSurfaceBackground"));
						ShowNameDiv();
					},
				});
			};
		}
	},
	AddZombiesFlag(d) {
		if (Math.floor(Math.random() * 5) === 1 && $("dSunNum").style.visibility === "") {
			oBalloon.prototype.Birth();
		}
		const self = oP;
		const largeFlags = oS.LargeWaveFlag;
		const step = self.FlagHeadStep;
		const totalFlags = self.FlagNum;

		SetVisible($("imgGQJC"), $("dFlagMeterContent"));

		for (let flagIdx in largeFlags) {
			Math.floor(flagIdx) < totalFlags
				? SetStyle(largeFlags[flagIdx], {
						visibility: "visible",
						left: 150 - (flagIdx - 1) * step + "px",
					})
				: SetVisible(largeFlags[flagIdx]);
		}

		PlaySound2("awooga");

		if ($User.HTML5) {
			(function playGroans() {
				oSym.addTask(
					2e3,
					function () {
						const randomGroan = [
							() => PlaySound2(["groan1", "groan2"][Math.floor(Math.random() * 2)]),
							() => PlaySound2(["groan3", "groan4"][Math.floor(Math.random() * 2)]),
							() => PlaySound2(["groan5", "groan6"][Math.floor(Math.random() * 2)]),
							() => {
								PlaySound2("groan1");
								oSym.addTask(150, () => PlaySound2("groan5"), []);
							},
							() => {
								PlaySound2("groan2");
								oSym.addTask(150, () => PlaySound2("groan6"), []);
							},
						][Math.floor(Math.random() * 3)];

						randomGroan();
						oSym.addTask(2e3, playGroans, []);
					},
					[]
				);
			})();
		}

		self.ReadyFlag = 1;
		self.FlagPrgs(d);
	},
	SelectFlagZombie(totalLvl, flag) {
		const self = oP;
		const az = self.AZ || (self.AZ = []);
		let azLen = az.length;
		const zombiesToSpawn = [];
		let count = 0;
		const isLargeWave = oS.LargeWaveFlag[flag];
		let remainingLvl = totalLvl;

		const delay = !isLargeWave
			? 150
			: (PlaySound2("siren"), (isLargeWave.style.top = "5px"), --remainingLvl, (zombiesToSpawn[count++] = oS.FlagZombie || oFlagZombie), 30);

		const availableZombies = [];
		let hasNew = false;

		// Filter zombies available for this wave
		while (azLen--) {
			let entry = az[azLen];
			let entryFlag = entry[1];
			if (entryFlag > flag) {
				break;
			} else {
				availableZombies.push(entry[0]);
				--az.length;
				hasNew = true;
			}
		}

		if (hasNew) {
			if (!self.ArZ) {
				self.ArZ = [];
			}
			self.ArZ.push(...availableZombies);
			self.ArZ.sort((a, b) => a.prototype.Lvl - b.prototype.Lvl);
		}

		// Add forced zombies for this flag
		const forcedMap = self.MustShowAtFlag || (self.MustShowAtFlag = {});
		const forced = forcedMap[flag];
		if (forced) {
			let fLen = forced.length;
			while (fLen--) {
				remainingLvl -= (zombiesToSpawn[count++] = forced[fLen]).prototype.Lvl;
			}
		}

		// Fill remaining level with random zombies
		let zombiePool = self.ArZ;
		if (!zombiePool || zombiePool.length === 0) {
			zombiePool = self.ArZ = oS.ZName && oS.ZName.slice ? oS.ZName.slice(0) : [];
			if (zombiePool.length) {
				zombiePool.sort((a, b) => a.prototype.Lvl - b.prototype.Lvl);
			}
		}
		if (!zombiePool.length) {
			// No available zombies configured; avoid throwing.
			return;
		}
		let poolLen = zombiePool.length;
		let maxIdx = poolLen - 1;
		let maxLvl = zombiePool[maxIdx].prototype.Lvl;

		while (remainingLvl > 0) {
			if (maxIdx && maxLvl > remainingLvl) {
				while (--maxIdx && zombiePool[maxIdx].prototype.Lvl > remainingLvl) {}
				poolLen = maxIdx + 1;
				maxLvl = zombiePool[maxIdx].prototype.Lvl;
			}
			remainingLvl -= (zombiesToSpawn[count++] = zombiePool[Math.floor(Math.random() * poolLen)]).prototype.Lvl;
		}

		self.NumZombies += count;
		self.SetTimeoutZombie(zombiesToSpawn, delay);
	},
	SelectFlagZombie1(lvl) {
		const self = oP;
		const zombies = [];
		let count = 0;
		const pool = self.ArZ;
		const isLargeWave = oS.LargeWaveFlag[self.FlagZombies];
		const sumToZombie = self.SumToZombie;
		const delay = !isLargeWave ? 150 : ((isLargeWave.style.top = "5px"), --lvl, (zombies[count++] = oS.FlagZombie || oFlagZombie), 30);

		while (lvl > 0) {
			lvl -= (zombies[count++] = pool[Math.floor(Math.random() * $SEql(lvl, sumToZombie))]).prototype.Lvl;
		}
		self.NumZombies += count;
		self.SetTimeoutZombie(zombies, delay);
	},
	SetTimeoutTomZombie(classes) {
		const zombieList = [];
		const protoList = [];
		let count = 0;
		const classLen = classes.length;

		for (let key in oGd.$Tombstones) {
			let coords = key.split("_");
			let zombie = new classes[Math.floor(Math.random() * classLen)]();
			protoList[count] = zombie;
			zombieList[count] = zombie.CustomBirth(coords[0], coords[1], 100);
			++count;
		}
		this.AppearUP(zombieList, protoList, count);
	},
	SetTimeoutWaterZombie(rowStart, rowEnd, count, classes) {
		const laneTypes = oGd.$LF;
		const validRows = [];
		let i = laneTypes.length;
		while (--i) {
			if (laneTypes[i] === 2) {
				validRows.push(i);
			}
		}

		const rowLen = validRows.length;
		const zombies = [];
		const protos = [];
		const classLen = classes.length;
		const range = rowEnd - rowStart + 1;

		let c = count;
		while (c--) {
			let zombie = new classes[Math.floor(Math.random() * classLen)]();
			protos[c] = zombie;
			zombies[c] = zombie.CustomBirth(validRows[Math.floor(Math.random() * rowLen)], Math.floor(rowStart + Math.random() * range));
		}
		this.AppearUP(zombies, protos, count);
	},
	AppearUP(htmlList, objList, count) {
		oP.NumZombies += count;
		asyncInnerHTML(
			htmlList.join(""),
			(fragment, list) => {
				EDPZ.appendChild(fragment);
				let i = list.length;
				while (i--) {
					let zombie = list[i];
					zombie.Birth.call(zombie);
					SetBlock(zombie.Ele);
					oSym.addTask(
						10,
						function (ele, top, clipHeight, step) {
							top = Math.max(top - step, 0);
							SetStyle(ele, {
								top: top + "px",
								clip: "rect(0,auto," + (clipHeight += step) + "px,0)",
							});
							if (top) {
								oSym.addTask(10, arguments.callee, [ele, top, clipHeight, step]);
							}
						},
						[zombie.EleBody, zombie.height, 0, zombie.height * 0.1]
					);
				}
			},
			objList
		);
	},
	SetZombie(rowStart, rowEnd, count, classes) {
		// Redundant with SetTimeoutWaterZombie but keeping for legacy compatibility
		const laneTypes = [];
		const validRows = [];
		let i = laneTypes.length;
		// Logic seems broken in original script (f undefined), fixing assumption it uses oGd.$LF
		const realLanes = oGd.$LF;
		let j = realLanes.length;
		while (--j) {
			if (realLanes[j] === 2) {
				validRows.push(j);
			}
		}

		const rowLen = validRows.length;
		const zombies = [];
		const protos = [];
		const classLen = classes.length;
		const range = rowEnd - rowStart + 1;

		let c = count;
		while (c--) {
			let zombie = new classes[Math.floor(Math.random() * classLen)]();
			protos[c] = zombie;
			zombies[c] = zombie.CustomBirth(validRows[Math.floor(Math.random() * rowLen)], Math.floor(rowStart + Math.random() * range));
		}
		this.AppearUP1(zombies, protos, count);
	},
	AppearUP1(htmlList, objList, count) {
		oP.NumZombies += count;
		asyncInnerHTML(
			htmlList.join(""),
			(fragment, list) => {
				EDPZ.appendChild(fragment);
				let i = list.length;
				while (i--) {
					let zombie = list[i];
					zombie.Birth.call(zombie);
					SetBlock(zombie.Ele);
					oSym.addTask(
						10,
						function (ele, top, clipHeight, step) {
							top = Math.max(top - step, 0);
							SetStyle(ele, {
								top: top + "px",
								clip: "rect(0,auto," + (clipHeight += step) + "px,0)",
							});
							if (top) {
								oSym.addTask(10, arguments.callee, [ele, top, clipHeight, step]);
							}
						},
						[zombie.EleBody, zombie.height, 0, zombie.height * 0.1]
					);
				}
			},
			objList
		);
	},
	SetTimeoutZombie(zombieList, delay) {
		const htmlBuffer = [];
		const zombieObjs = [];
		let idx = 0;
		let timeOffset = 0;
		const len = zombieList.length;

		while (idx < len) {
			const zombie = new zombieList[idx]();
			htmlBuffer[idx] = zombie.prepareBirth(timeOffset);
			zombieObjs[idx] = zombie;
			timeOffset += delay;
			++idx;
		}

		asyncInnerHTML(
			htmlBuffer.join(""),
			(fragment, list) => {
				EDPZ.appendChild(fragment);
				let i = list.length;
				while (i--) {
					list[i].Birth();
				}
			},
			zombieObjs
		);
	},
	FlagPrgs() {
		const self = oP;
		let curFlag = self.FlagZombies;
		const flagSum = self.FlagToSumNum;
		const headPos = 139 - curFlag * self.FlagHeadStep;
		const lvl = $SSml(curFlag, flagSum.a1, flagSum.a2);

		if (self.FlagNum > (curFlag = ++self.FlagZombies)) {
			$("imgFlagHead").style.left = headPos + "px";
			$("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (headPos + 11) + "px)";

			// Monitor Flag
			let monitorFunc = $SEql(curFlag, self.FlagToMonitor);
			if (monitorFunc) {
				oSym.addTask(
					1690,
					(args) => {
						if (!args[1]) {
							args[0]();
							args[1] = 1;
						}
					},
					[monitorFunc]
				);
			}

			oSym.addTask(
				1990,
				(flag) => {
					const p = oP;
					if (p.ReadyFlag === flag++) {
						p.ReadyFlag = flag;
						p.FlagPrgs();
					}
				},
				[curFlag]
			);
		} else {
			$("imgFlagHead").style.left = "-1px";
			$("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)";
		}

		self.SelectFlagZombie.call(self, lvl, curFlag);
		if (self.UserDefinedFlagFunc) {
			self.UserDefinedFlagFunc();
		}
	},
	Monitor(config, userFunc) {
		if (config) {
			config.f.apply(config.f, config.ar);
		}
		oP.UserDefinedFlagFunc = userFunc ? userFunc : null;

		(function loop() {
			oZ.traversalOf();
			oSym.addTask(10, loop, []);
		})();
	},
};

var oGd = {
	Init() {
		this.$ = [];
		this.$Crater = [];
		this.$Tombstones = {};
		this.$Torch = [];
		this.$Plantern = [];
		this.$LF = oS.LF;
		this.$ZF = oS.ZF;
		this.$Ice = [];
		this.$JackinTheBox = 0;
		this.$Balloon = new Array(oS.R + 1);
		this.$Fog = [];
	},
	add(obj, c, r, dict) {
		let old = (dict = this.$)[c];
		if (old) {
			old.Die();
		}
		dict[c] = obj;
	},
	del(obj) {
		delete this.$[obj.R + "_" + obj.C + "_" + obj.PKind];
	},
	MakeFog() {
		let html = "";
		let tx = 0,
			ri = 0,
			ci = 0,
			left = 0;
		const fogDict = oGd.$Fog;
		const maxCol = 2 * oS.HaveFog + 3;
		const isIE = $User.Browser.IE && !$User.Browser.IE9;

		const addFog = function (id) {
			html += `<img id="${id}" src="images/interface/fog${Math.floor(Math.random() * 4)}.${isIE ? "gif" : "png"}" style="left:${left}px;top:${tx}px">`;
		};

		for (ri = 1, tx = 0; ri < 7; left = 0, ri++) {
			for (ci = 0; ci <= maxCol; ci++) {
				let key = ri + "_" + ci;
				fogDict[key] = "Fog" + key;
				addFog(fogDict[key]);
				left += 35;
			}
			tx += 90;
		}
		NewEle("dFog", "div", "", { innerHTML: html }, EDAll);
	},
	MoveFogLeft(callback) {
		(function (ele, currentX, limitX, cb) {
			currentX -= 50;
			if (currentX > limitX) {
				ele.style.left = currentX + "px";
				oSym.addTask(5, arguments.callee, [ele, currentX, limitX, cb]);
			} else {
				ele.style.left = limitX + "px";
				if (cb) {
					cb();
				}
			}
		})($("dFog"), 900, GetX(oS.C - oS.HaveFog) - 30, callback);
	},
	MoveFogRight() {
		if (arguments.callee.caller.caller == null) {
			return;
		}
		(function (ele, currentX) {
			if ((currentX += 50) < 901) {
				ele.style.left = currentX + "px";
				oSym.addTask(5, arguments.callee, [ele, currentX]);
			} else {
				ele.style.left = "900px";
			}
		})($("dFog"), GetX(oS.C - oS.HaveFog) - 3);
	},
	GatherFog(r, c, rRange, cRange, mode) {
		// mode 0 = SetNone (clear), 1 = SetBlock (restore)
		const rowStart = r - rRange;
		const rowEnd = r + rRange;
		const colStart = c - cRange;
		const colEnd = c + cRange;
		const func = [SetNone, SetBlock][mode];

		const cols = oS.C;
		const rows = oS.R;
		const maxCol = cols + 1;
		const fogCount = oS.HaveFog * 2;
		const list = [];

		const mapCol = function (i) {
			return (i - cols) * 2 + fogCount;
		};
		const mapColRev = function (i) {
			return (i - cols) * 2 + fogCount - 2;
		};

		// Collect fog elements to modify
		let i, j;

		if (rowStart > 0) {
			i = mapColRev(colStart > 0 ? colStart + 1 : 1);
			j = mapCol(colEnd > maxCol ? maxCol : colEnd - 1);
			do {
				if (i > -1) {
					list.push("Fog" + rowStart + "_" + i);
				}
			} while (i++ < j);
		}

		if (rowEnd <= rows) {
			i = mapColRev(colStart > 0 ? colStart + 1 : 1);
			j = mapCol(colEnd > maxCol ? maxCol : colEnd - 1);
			do {
				if (i > -1) {
					list.push("Fog" + rowEnd + "_" + i);
				}
			} while (i++ < j);
		}

		let curRow = rowStart + 1;
		let limitRow = rowEnd - 1;
		let startI = mapColRev(colStart < 1 ? 1 : colStart);
		let endJ = mapCol(colEnd > maxCol ? maxCol : colEnd);

		while (curRow <= limitRow) {
			i = startI;
			do {
				if (i > -1) {
					list.push("Fog" + curRow + "_" + i);
				}
			} while (i++ <= endJ);
			curRow++;
		}

		for (let k = 0; k < list.length; k++) {
			func($(list[k]));
		}

		// Recursive clear for Torchwood logic
		if (mode) {
			const torches = oGd.$Torch;
			for (let u in torches) {
				let p = $P[torches[u]];
				this.GatherFog(p.R, p.C, 1, 1, 0);
			}
		}
	},
};

var oZ = {
	Init(rows) {
		this.$ = [];
		this.$R = [];
		let i = rows;
		while (i) {
			this.$[i] = [];
			this.$R[i--] = [];
		}
	},
	add(zombie, list) {
		list = oZ.$[zombie.R];
		list.push(zombie);
		list.sort((a, b) => a.AttackedLX - b.AttackedLX);
		list.RefreshTime = oSym.Now;
	},
	getZ0(lx, row) {
		if (row < 1 || row > oS.R) {
			return;
		}
		const list = this.$[row];
		let i = 0,
			len = list.length,
			zombie;
		while (i < len && (zombie = list[i++]).AttackedLX <= lx) {
			if (zombie.PZ && zombie.HP && zombie.AttackedRX >= lx) {
				return zombie;
			}
		}
	},
	getZ1(rx, row) {
		if (row < 1 || row > oS.R) {
			return;
		}
		const list = this.$[row];
		const rightList = this.$R[row];
		let sortedList;

		if (list.RefreshTime === rightList.RefreshTime) {
			sortedList = rightList;
		} else {
			sortedList = (this.$R[row] = list.slice(0)).sort((a, b) => b.AttackedRX - a.AttackedRX);
			sortedList.RefreshTime = list.RefreshTime;
		}

		let i = 0,
			len = sortedList.length,
			zombie;
		while (i < len && (zombie = sortedList[i++]).AttackedRX >= rx) {
			if (zombie.PZ && zombie.HP && zombie.AttackedLX <= rx) {
				return zombie;
			}
		}
	},
	getArZ(lx, rx, row) {
		const list = this.$[row];
		const result = [];
		let i = 0,
			len = list.length,
			zombie,
			zLX;
		while (i < len && (zLX = (zombie = list[i++]).AttackedLX) < rx) {
			if (zombie.PZ && zombie.HP && (zLX > lx || zombie.AttackedRX > lx)) {
				result.push(zombie);
			}
		}
		return result;
	},
	getRangeLeftZ(lx, rx, row) {
		if (row < 1 || row > oS.R) {
			return;
		}
		const list = this.$[row];
		let i = 0,
			len = list.length,
			zombie,
			zLX;
		while (i < len && (zLX = (zombie = list[i++]).AttackedLX) < rx) {
			if (zombie.PZ && zombie.HP && (zLX > lx || zombie.AttackedRX > lx)) {
				return zombie;
			}
		}
	},
	moveTo(id, oldR, newR) {
		const oldList = this.$[oldR];
		const newList = this.$[newR];
		let i = oldList.length;
		while (i--) {
			let z = oldList[i];
			if (z.id === id) {
				oldList.splice(i, 1);
				z.R = newR;
				newList.push(z);
				newList.sort((a, b) => a.AttackedLX - b.AttackedLX);
				newList.RefreshTime = oldList.RefreshTime = oSym.Now;
				return;
			}
		}
	},
	traversalOf() {
		const zRows = this.$;
		let needsSort = 0;
		let needsRef = 0;
		let maxLX = 1000;
		let curLX;

		// Handlers for zombie status
		const handlers = [
			function (z) {
				// Dead
				needsRef = 1;
				maxLX = curLX;
			},
			function (z) {
				// Alive/Moved
				if ((curLX = z.AttackedLX) > maxLX) {
					needsSort = needsRef = 1;
				}
				maxLX = curLX;
			},
		];

		// Process rows recursively to avoid blocking
		(function processRow(r) {
			const list = zRows[r];
			let i = list.length;
			const triggers = oT.$[r];
			const triggersL = oT.$L[r];

			while (i--) {
				let zombie = list[i];
				if (zombie.HP && zombie.PZ && zombie.ZX < 901) {
					oT["chkD" + zombie.WalkDirection](zombie, r, triggers, triggersL);
				}

				if (!zombie.HP) {
					list.splice(i, 1);
					handlers[0](zombie);
				} else {
					handlers[zombie.ChkActs(zombie, r, list, i)](zombie);
				}
			}

			if (needsSort) {
				needsSort = needsRef = 0;
				list.sort((a, b) => a.AttackedLX - b.AttackedLX);
				list.RefreshTime = oSym.Now;
			} else if (needsRef) {
				needsRef = 0;
				list.RefreshTime = oSym.Now;
			}

			if (--r) {
				oSym.addTask(0, processRow, [r]);
			}
		})(zRows.length - 1);
	},
};

var oT = {
	Init(rows) {
		this.$ = [];
		this.$L = [];
		let i = rows;
		while (i) {
			this.$[i] = [];
			this.$L[i--] = [];
		}
	},
	add(row, triggerBox, id) {
		if (row <= 0 || row > oS.R) {
			return;
		}
		const list = this.$[row];
		// triggerBox: [left, right, type?, id]
		let i = triggerBox.length;
		while (i--) {
			let t = triggerBox[i];
			list.push([t[0], t[1], t[2], id]);
		}
		list.sort((a, b) => b[1] - a[1]);
		list.RefreshTime = new Date();
	},
	chkD0(zombie, row, triggers, triggersL) {
		// Check triggers moving Right? (Normal Direction)
		const attackLX = zombie.AttackedLX;
		let i = 0;
		const len = triggers.length;
		let t;
		while (i < len) {
			t = triggers[i];
			if (!t) {
				++i;
				continue;
			}
			if (t[1] < attackLX) {
				break;
			}
			let plant = $P[t[3]];
			if (plant && plant.canTrigger && t[0] <= attackLX) {
				plant.TriggerCheck(zombie, t[2], i);
			}
			++i;
		}
	},
	chkD1(zombie, row, triggers, triggersL) {
		// Check triggers moving Left?
		const attackRX = zombie.AttackedRX;
		let i = 0,
			t;

		// Sync triggersL if stale
		if (triggers.RefreshTime !== triggersL.RefreshTime) {
			triggersL = (this.$L[row] = triggers.slice(0)).sort((a, b) => a[0] - b[0]);
			triggersL.RefreshTime = triggers.RefreshTime;
		}

		while (i < triggersL.length) {
			t = triggersL[i];
			if (!t) {
				++i;
				continue;
			}
			if (t[0] > attackRX) {
				break;
			}
			let plant = $P[t[3]];
			if (plant && plant.canTrigger && t[1] >= attackRX) {
				plant.TriggerCheck(zombie, t[2], i);
			}
			++i;
		}
	},
	delP(plant) {
		const triggers = plant.oTrigger;
		const id = plant.id;
		for (let row in triggers) {
			const list = this.$[row];
			let i = list.length;
			while (i--) {
				if (list[i][3] === id) {
					list.splice(i, 1);
				}
			}
			list.RefreshTime = new Date();
		}
	},
	indexOf(arr, val) {
		// Custom regex-based index finder (legacy implementation kept intact)
		const re = new RegExp(val + ",", "g");
		const str = (arr.toString() + ",").replace(re, "┢,").replace(/[^,┢]/g, "");
		let idx = 0,
			pos = 0;
		const indices = [];
		while ((pos = str.indexOf("┢", pos)) > 0) {
			indices.push((pos++ - idx++ - 2) / 3);
		}
		return indices;
	},
};

var asyncInnerHTML = function (html, callback, args) {
	const div = $n("div");
	const frag = document.createDocumentFragment();
	div.innerHTML = html;

	(function processNodes(count) {
		if (count--) {
			frag.appendChild(div.firstChild);
			setTimeout(() => processNodes(count), 0);
		} else {
			callback(frag, args);
		}
	})(div.childNodes.length);
};

var WhichMouseButton = function (e) {
	e = window.event || e;
	const b = $User.Browser;
	// Map buttons to 1 (left), 2 (right), 3 (middle)
	if (!b.Gecko) {
		return $SEql(e.button, { 1: 1, 0: b.IE ? 2 : 1, 2: 2, default: 1 });
	}
	return $SEql(e.which, { 1: 1, 3: 2, default: 1 });
};

var GroundOnmousedown = function (e) {
	e = window.event || e;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const x = (e.clientX / zoom - EDAlloffsetLeft) / 0.9;
	const y = (e.clientY / zoom - EDAlloffsetTop) / 0.9;

	const cellX = ChosePlantX(x);
	const cellY = ChosePlantY(y);
	const c = cellX[0];
	const r = cellY[0];
	const rType = cellY[1];
	const cType = cellX[1];

	const ap = GetAP(x, y, rType, cType);

	switch (oS.Chose) {
		case 1: // Planting
			WhichMouseButton(e) < 2 ? GrowPlant(ap[0], c, r, rType, cType) : (PlaySound2("tap"), CancelPlant());
			break;
		case -1: // Shoveling
			WhichMouseButton(e) < 2 ? (PlaySound2("plant2"), ShovelPlant(ap)) : (PlaySound2("tap"), CancelShovel());
	}
};

var GetAP = function (x, y, r, c) {
	const grid = oGd.$;
	let i = 0,
		plant,
		result = [],
		topPlant;

	while (i < 4) {
		plant = grid[r + "_" + c + "_" + i++];
		if (plant && !(x < plant.pixelLeft || x > plant.pixelRight || y < plant.pixelTop || y > plant.pixelBottom)) {
			topPlant = plant;
		}
		result.push(plant);
	}
	return [result, topPlant];
};

var GroundOnkeydown = function (e) {
	e = e || window.event;

	if (e.key === "Escape") {
		switch (oS.Chose) {
			case 1:
				CancelPlant();
				break;
			case -1:
				CancelShovel();
				break;
		}
		return false;
	}

	if (!oS.Chose) {
		KeyBoardGrowPlant(e);
	}
};

var KeyBoardGrowPlant = function (e, mode) {
	mode = mode || 0;
	let plantIndex = -1;

	if (/^Digit[0-9]$/.test(e.code)) {
		plantIndex = parseInt(e.code.replace("Digit", ""));
	} else if (/^Numpad[0-9]$/.test(e.code)) {
		plantIndex = parseInt(e.code.replace("Numpad", ""));
	}

	if (plantIndex !== -1 && mode === 0) {
		plantIndex = plantIndex === 0 ? 9 : plantIndex - 1;
		ChosePlant({ clientX: 450, clientY: 300 }, plantIndex.toString());
	}
};

var GroundOnmousemove = function () {};

var GroundOnmousemove1 = function (e) {
	e = window.event || e;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const x = (e.clientX / zoom - EDAlloffsetLeft) / 0.9;
	const y = (e.clientY / zoom - EDAlloffsetTop) / 0.9;

	const cardIdx = oS.ChoseCard;
	const cellX = ChosePlantX(x);
	const cellY = ChosePlantY(y);
	const c = cellX[0];
	const r = cellY[0];
	const rType = cellY[1];
	const cType = cellX[1];

	const ap = GetAP(x, y, rType, cType);
	const proto = ArCard[cardIdx].PName.prototype;

	SetStyle($("MovePlant"), {
		left: x - 0.5 * (proto.beAttackedPointL + proto.beAttackedPointR) + "px",
		top: y + 20 - proto.height + "px",
	});

	if (proto.CanGrow(ap[0], rType, cType)) {
		SetStyle($("MovePlantAlpha"), {
			visibility: "visible",
			left: c + proto.GetDX() + "px",
			top: r - proto.height + proto.GetDY(rType, cType, ap[0]) + "px",
		});
	} else {
		SetHidden($("MovePlantAlpha"));
	}
};

var GroundOnmousemove2 = function (e) {
	e = window.event || e;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const x = (e.clientX / zoom - EDAlloffsetLeft) / 0.9;
	const y = (e.clientY / zoom - EDAlloffsetTop) / 0.9;

	const cellX = ChosePlantX(x);
	const cellY = ChosePlantY(y);
	const rType = cellY[1];
	const cType = cellX[1];

	const ap = GetAP(x, y, rType, cType);
	const plant = ap[1];
	const plantId = plant ? plant.id : "";
	const prevId = oS.MPID;

	if (prevId !== plantId) {
		if (prevId) {
			SetAlpha($(prevId).childNodes[1], 100, 1);
		}
		if ((oS.MPID = plantId)) {
			SetAlpha($(plantId).childNodes[1], 60, 0.6);
		}
	}

	SetStyle($("tShovel"), {
		left: x - 15 + "px",
		top: y - 16 + "px",
	});
};

var DisplayZombie = function () {
	SetVisible($("bShowHandBook"));

	const azCopy = oP.AZ.slice(0);
	let i = azCopy.length;
	const zombieDiv = $("dZombie");
	const positions = [];
	const htmlList = [];

	while (i--) {
		if (azCopy[i][0].prototype.CanDisplay === 0) {
			azCopy.splice(i, 1);
		}
	}

	let count = (i = azCopy.length);
	while (count--) {
		positions.push(Math.floor(150 + Math.random() * 444));
	}
	positions.sort((a, b) => a - b);

	while (i) {
		let randIdx = Math.floor(Math.random() * i);
		let proto = azCopy[randIdx][0].prototype;

		if (proto.CanDisplay) {
			azCopy.splice(randIdx, 1);
			htmlList[i--] = proto.getHTML(
				"",
				Math.floor(50 + Math.random() * 201) - proto.width * 0.5,
				positions[i] - proto.height,
				1,
				"block",
				"auto",
				proto.GetDTop,
				proto.PicArr[proto.StandGif]
			);
		} else {
			--i;
		}
	}

	asyncInnerHTML(htmlList.join(""), (frag) => {
		zombieDiv.appendChild(frag);
	});
};

var AutoSelectCard = function () {
	const cards = oS.ArCard;
	let i = -1;
	const len = cards.length;
	while (++i < len) {
		SelectCard(cards[i].prototype.EName, undefined, false);
	}
};

var InitPCard = function () {
	let html = "";
	const cards = oS.ArCard;
	const len = cards.length;
	let i = 0;

	while (i < len) {
		let card = cards[i];
		let proto = card.prototype;
		if (!proto.CanSelect) {
			++i;
			continue;
		}
		let name = proto.EName;
		ArPCard[name] = { Select: 0, PName: card };
		html += `<div class="span1" id="Card${name}" onmouseout="SetHidden($('dTitle'))" onmousemove="ViewCardTitle(${name},event)" onclick="SelectCard('${name}')"><img src="${proto.PicArr[0]}"><span class="span2">${proto.SunNum}</span></div>`;
		if (i++ % 6 === 5) {
			html += "<br>";
		}
	}
	$("dPCard").innerHTML = html;
};

var InitHandBookPCard = function () {
	PlaySound2("gravebutton");
	let html = "";
	let i = 0;
	const len = allPlantsArray().length;

	while (i < len) {
		let proto = allPlantsArray()[i].prototype;
		let name = proto.EName;
		html += `<div class="span1" onclick="ViewProducePlant(${name})"><img src="${proto.PicArr[0]}"><div class="span2">${proto.SunNum}</div></div>`;
		if (i++ % 6 === 5) {
			html += "<br>";
		}
	}

	$("dHandBookPCard").innerHTML = html;
	ViewProducePlant(allPlantsArray()[0]);
	$("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
	SetVisible($("dHandBookPZ"));
	SetNone($("dHandBookZ"));
	SetBlock($("dHandBookP"));
};

var InitHandBookZCard = function () {
	PlaySound2("gravebutton");
	let html = "";
	const zombies = [
		oZombie,
		oFlagZombie,
		oConeheadZombie,
		oPoleVaultingZombie,
		oBucketheadZombie,
		oNewspaperZombie,
		oScreenDoorZombie,
		oFootballZombie,
		oDancingZombie,
		oBackupDancer,
		oDuckyTubeZombie1,
		oSnorkelZombie,
		oZomboni,
		oDolphinRiderZombie,
		oJackinTheBoxZombie,
		oBalloonZombie,
		oImp,
		oHeiFootballZombie,
		oCZombie,
		oCConeheadZombie,
		oCBucketheadZombie,
		oEunZombie,
		othugZombie,
		oZZ,
		oEmperor,
		oCXZombie,
		oXBZombie,
		oJX,
		oJY,
		oLGBOSS,
		oWarshipsZombie,
		oSubZombie,
		oWJY,
		oMustacheZombie,
		oTrashZombie,
		oLionDanceZombie,
	];
	let i = 0;
	const len = zombies.length;

	while (i < len) {
		let proto = zombies[i].prototype;
		let name = proto.EName;
		html += `<div class="span1" onclick="ViewProduceZombie(${name})"><img src="${proto.PicArr[0]}"><div class="span2">${proto.SunNum}</div></div>`;
		i++;
	}

	$("dHandBookZCard").innerHTML = html;
	ViewProduceZombie(zombies[0]);
	$("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
	SetVisible($("dHandBookPZ"));
	SetNone($("dHandBookP"));
	SetBlock($("dHandBookZ"));
};

var lastB;
var ViewProducePlant = function (plantClass) {
	if (lastB !== plantClass) {
		lastB = plantClass;
		const proto = plantClass.prototype;
		PlaySound2("tap");
		$("pHandBookPlant").style.backgroundImage = "url(" + proto.PicArr[proto.AlmanacGif] + ")";
		$("pHandBookPlant").style.backgroundPosition = proto.BookHandPosition || "50% " + (45 + proto.height / 4) + "%";
		$("dProducePlant").innerHTML = proto.Produce;
		$("dProducePlant").scrollTop = 0;
		innerText($("dHandBookPlantName"), proto.CName);
		innerText($("spSunNum"), proto.SunNum);
		innerText($("spCoolTime"), proto.coolTime + "s");
		$("pPlantBack").style.background = "url('images/interface/Almanac_Ground" + proto.BookHandBack + ".jpg')";
	}
};

var ViewProduceZombie = function (zombieClass) {
	PlaySound2("tap");
	const proto = zombieClass.prototype;
	$("pHandBookZombie").style.background = "url(" + proto.PicArr[proto.AlmanacGif] + ") no-repeat scroll " + proto.BookHandPosition;
	$("dProduceZombie").innerHTML = proto.Produce;
	$("dProduceZombie").scrollTop = 0;
	innerText($("dHandBookZombieName"), proto.CName);
	$("pZombieBack").style.background = "url('images/interface/Almanac_Ground" + proto.BookHandBack + ".jpg')";
};

var ViewCardTitle = function (plantClass, e, showCooldown = true, showProduce = true) {
	e = e || window.event;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const titleDiv = $("dTitle");
	const proto = plantClass.prototype;
	let html = proto.CName + "<br>" + (showCooldown ? "cooldown: " + proto.coolTime + "s<br>" : "");

	if (oS.DKind && proto.night) {
		html += '<span style="color:#F00">Nocturnal - sleeps during the day</span><br>' + proto.Tooltip;
	} else {
		html += proto.Tooltip || (showProduce ? '<span style="text-align:left">' + proto.Produce + "</span>" : "");
	}

	titleDiv.innerHTML = html;
	SetStyle(titleDiv, {
		left: e.clientX / zoom + (EBody.scrollLeft || EElement.scrollLeft) + "px",
		top: e.clientY / zoom + 18 + (EBody.scrollTop || EElement.scrollTop) + "px",
		visibility: "visible",
	});
};

var ViewGenericMouseover = function (content, e) {
	e = e || window.event;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const titleDiv = $("dTitle");
	titleDiv.innerHTML = content;
	SetStyle(titleDiv, {
		left: e.clientX / zoom + (EBody.scrollLeft || EElement.scrollLeft) + "px",
		top: e.clientY / zoom + 18 + (EBody.scrollTop || EElement.scrollTop) + "px",
		visibility: "visible",
	});
};

var SelectCard = function (name, retry, playTap = true) {
	if (playTap) {
		PlaySound2("tap");
	}
	retry |= 0;

	const cardDom = $("Card" + name);
	const btnOK = $("btnOK");
	const cardObj = ArPCard && ArPCard[name];

	if (!cardDom || !btnOK || !cardObj || !cardObj.PName) {
		if (retry < 50 && typeof oSym !== "undefined" && oSym && typeof oSym.addTask === "function") {
			oSym.addTask(1, SelectCard, [name, retry + 1]);
		}
		return;
	}

	const cardEle = cardDom.childNodes;
	const imgEle = cardEle && cardEle[0];
	const proto = cardObj.PName.prototype;
	if (!imgEle) {
		return;
	}

	if (!cardObj.Select) {
		if (!(ArPCard.SelNum |= 0)) {
			btnOK.disabled = "";
			btnOK.style.color = "#FC6";
		} else if (ArPCard.SelNum > 9) {
			return;
		}
		++ArPCard.SelNum;
		cardObj.Select = 1;

		if (oS.StaticCard) {
			const cardList = $("dCardList");
			if (!cardList) {
				return;
			}
			const newCard = NewEle(
				"dCard" + name,
				"div",
				"",
				{
					onclick() {
						SelectCard(name);
					},
				},
				cardList
			);
			NewImg(0, imgEle.src, "width:100px;height:120px", newCard);
			innerText(NewEle("sSunNum" + name, "span", 0, 0, newCard), proto.SunNum);
			imgEle.style.filter = "grayscale(1) brightness(1.15)";
		}
	} else {
		cardObj.Select = 0;
		if (!--ArPCard.SelNum) {
			btnOK.disabled = "disabled";
			btnOK.style.color = "#888";
		}
		const newCard = $("dCard" + name);
		if (newCard) {
			newCard.onclick = null;
			ClearChild(newCard.firstChild, newCard.childNodes[1], newCard.lastChild, newCard);
		}
		imgEle.style.filter = "grayscale(0) brightness(1)";
	}
};

var ResetSelectCard = function () {
	const btnOK = $("btnOK");
	for (let name in ArPCard) {
		if (ArPCard[name].Select) {
			SelectCard(name);
		}
	}
	btnOK.disabled = "disalbed";
	btnOK.style.color = "#888";
};

var LetsGO = function () {
	const cardListDiv = $("dCardList");
	let i = 0;
	const len = cardListDiv.childNodes.length;
	const body = document.body;

	SetStyle($("dTop"), { left: "105px", top: 0 });
	cardListDiv.style.left = 0;
	SetVisible(cardListDiv);

	while (i < len) {
		(function (idx) {
			const ele = cardListDiv.childNodes[idx];
			const name = ele.id.substr(5);
			const cardData = ArPCard[name].PName;
			const proto = cardData.prototype;

			ele.onclick = function (e) {
				ChosePlant(e, idx);
			};
			ele.onmouseover = function () {
				SetVisible($("dTitle"));
				ViewPlantTitle((oS.MCID = idx));
			};
			ele.onmouseout = function () {
				SetHidden($("dTitle"));
			};

			ele.firstChild.style.filter = "grayscale(1) brightness(1.15)";
			ele.lastChild.id = "sSunNum" + idx;
			innerText(ele.lastChild, proto.SunNum);
			ArCard.push({ DID: ele.id, CDReady: 0, SunReady: 0, PName: cardData });
		})(i++);
	}

	body.onkeydown = function (e) {
		GroundOnkeydown(e);
	};
	body.onmousedown = function (e) {
		GroundOnmousedown(e);
	};
	body.onmousemove = function (e) {
		GroundOnmousemove(e);
	};

	SetVisible(cardListDiv);
	if (!oS.BrainsNum) {
		CustomSpecial(oBrains, oS.R - 1, -2);
	}

	(
		oS.StartGame ||
		function () {
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			NewMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			oS.InitLawnMower();

			PrepareGrowPlants(() => {
				oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
				BeginCool();
				if (oS.DKind) {
					AutoProduceSun(25);
				}
				oSym.addTask(
					1500,
					() => {
						oP.AddZombiesFlag();
						SetVisible($("dFlagMeterContent"));
					},
					[]
				);
			});
		}
	)();

	oS.StartTime = oSym.Now;
};

var ViewPlantTitle = function (index) {
	const titleDiv = $("dTitle");
	const card = ArCard[index];
	const proto = card.PName.prototype;
	let html = proto.CName;

	if (!oS.CardKind) {
		html += "<br>cooldown: " + proto.coolTime + "s<br>" + proto.Tooltip;
		if (!card.CDReady) {
			html += '<br><span style="color:#F00">recharging</span>';
		}
	}
	if (!card.SunReady) {
		html += '<br><span style="color:#F00">not enough sun</span>';
	}

	titleDiv.innerHTML = html;
	SetStyle(titleDiv, {
		top: 60 * index + "px",
		left: EDAlloffsetLeft + 100 + "px",
	});
};

var BeginCool = function () {
	let i = ArCard.length;
	while (i--) {
		const card = ArCard[i];
		const proto = card.PName.prototype;
		const coolTime = typeof proto.coolTime === "string" ? 0 : proto.coolTime;
		const sunCost = proto.SunNum;

		switch (coolTime) {
			case 0:
			case 7.5:
				card.CDReady = 1;
				if (sunCost <= oS.SunNum) {
					card.SunReady = 1;
					$(card.DID).childNodes[0].style.filter = "grayscale(0) brightness(1)";
				}
				break;
			case 30:
				DoCoolTimer(i, 20);
				break;
			default:
				DoCoolTimer(i, 35);
		}
	}
};

var ImmediatelyCool = function () {
	let i = ArCard.length;
	while (i--) {
		const card = ArCard[i];
		card.CDReady = 1;
		card.SunReady = 1;
		$(card.DID).childNodes[0].style.filter = "grayscale(0) brightness(1)";
	}
};

var MonitorCard = function (card) {
	let i = ArCard.length;
	const currentSunHTML = Number(ESSunNum.innerHTML);

	if (currentSunHTML !== oS.SunNum) {
		oS.SunNum = Math.min(currentSunHTML, oS.SunNum);
	}

	if (oS.Chose < 1) {
		while (i--) {
			card = ArCard[i];
			let proto = card.PName.prototype;

			if (proto.SunNum > oS.SunNum) {
				if (card.SunReady) {
					card.SunReady = 0;
				}
				$(card.DID).childNodes[0].style.filter = "grayscale(1) brightness(1.15)";
			} else {
				if (!card.SunReady) {
					card.SunReady = 1;
				}
				if (card.CDReady) {
					$(card.DID).childNodes[0].style.filter = "grayscale(0) brightness(1)";
				}
			}
		}
	} else {
		while (i--) {
			card = ArCard[i];
			let proto = card.PName.prototype;
			if (proto.SunNum > oS.SunNum) {
				if (card.SunReady) {
					card.SunReady = 0;
				}
			} else {
				if (!card.SunReady) {
					card.SunReady = 1;
				}
			}
		}
	}
	ViewPlantTitle(oS.MCID);
};

var DoCoolTimer = function (index, duration) {
	const ele = $(ArCard[index].DID);
	NewEle("dCD1" + index, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", ele);
	NewEle("dCD2" + index, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", ele);

	(function tick(timeLeft, idx) {
		if (timeLeft > 0) {
			innerText($("dCD1" + idx), timeLeft);
			innerText($("dCD2" + idx), timeLeft);
			oSym.addTask(50, tick, [(timeLeft - 0.5).toFixed(1), idx]);
		} else {
			ClearChild($("dCD1" + idx), $("dCD2" + idx));
			ArCard[idx].CDReady = 1;
			MonitorCard();
		}
	})(duration, index);
};

var ChosePlant = function (e, index) {
	const card = ArCard[(oS.ChoseCard = index)];
	if (!(card.CDReady && card.SunReady)) {
		PlaySound2("buzzer");
		return;
	}
	PlaySound2("seedlift");
	e = window.event || e;
	var zoom = parseFloat(document.body.style.zoom) || 1;
	const x = (e.clientX / zoom - EDAlloffsetLeft) / 0.9;
	const y = (e.clientY / zoom - EDAlloffsetTop) / 0.9;

	const proto = card.PName.prototype;
	const len = ArCard.length;

	oS.Chose = 1;

	if (!oS.CardKind) {
		EditImg(
			NewImg(
				"MovePlant",
				proto.PicArr[proto.StaticGif],
				`left:${x - 0.5 * (proto.beAttackedPointL + proto.beAttackedPointR)}px;top:${y + 20 - proto.height}px;z-index:254`,
				EDAll
			).cloneNode(false),
			"MovePlantAlpha",
			"",
			{ visibility: "hidden", filter: "alpha(opacity=40)", opacity: 0.4, zIndex: 30 },
			EDAll
		);
	} else {
		NewImg(
			"MovePlant",
			proto.PicArr[proto.StandGif],
			`left:${x - 0.5 * (proto.beAttackedPointL + proto.beAttackedPointR)}px;top:${y + 20 - proto.height}px;z-index:254`,
			EDAll
		);
		NewImg("MovePlantAlpha", proto.PicArr[proto.StandGif], "visibility:hidden;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll);
	}

	for (let i = 0; i < len; i++) {
		$(ArCard[i].DID).childNodes[0].style.filter = "grayscale(1) brightness(1.15)";
	}
	SetHidden($("dTitle"));
	GroundOnmousemove = GroundOnmousemove1;
};

var CancelPlant = function () {
	ClearChild($("MovePlant"), $("MovePlantAlpha"));
	oS.Chose = 0;
	MonitorCard();
	GroundOnmousemove = function () {};
};

var ShovelPlant = function (data) {
	PlaySound2("plant2");
	const plants = data[0];
	const topPlant = data[1];
	if (topPlant && (topPlant.PKind || !(plants[1] || plants[2]))) {
		topPlant.Die();
		oS.MPID = "";
	}
	CancelShovel();
};

var ChoseShovel = function (e) {
	PlaySound2("shovel");
	if (WhichMouseButton(e) < 2) {
		var zoom = parseFloat(document.body.style.zoom) || 1;
		const x = (e.clientX / zoom - EDAlloffsetLeft) / 0.9;
		const y = (e.clientY / zoom - EDAlloffsetTop) / 0.9;
		SetHidden($("imgShovel"));
		NewImg("tShovel", "images/interface/Shovel/0.gif", `left:${x - 10}px;top:${y - 17}px;z-index:1`, EDAll);
		oS.Chose = -1;
		GroundOnmousemove = GroundOnmousemove2;
		StopBubble(e);
	}
};

var CancelShovel = function (e) {
	const prevId = oS.MPID;
	ClearChild($("tShovel"));
	oS.Chose = 0;
	$("imgShovel").style = "";
	if (prevId) {
		SetAlpha($(prevId).childNodes[1], 100, 1);
	}
	GroundOnmousemove = function () {};
};

var StopBubble = function (e) {
	window.event ? (event.cancelBubble = true) : e.stopPropagation();
};

var GrowPlant = function (plants, c, r, rType, cType) {
	const cardIdx = oS.ChoseCard;
	const card = ArCard[cardIdx];
	const PlantClass = card.PName;
	const proto = PlantClass.prototype;
	const coolTime = proto.coolTime;
	const laneType = oGd.$LF[rType];

	// Check if the plant can grow at the selected location
	if (proto.CanGrow(plants, rType, cType)) {
		// Play planting audio based on soil type
		PlaySound2(laneType !== 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");

		// Plant the selected plant at the specified location
		if (!oS.CardKind) {
			new PlantClass().Birth(c, r, rType, cType, plants);
		} else {
			let tempPlant = new PlantClass();
			asyncInnerHTML(
				tempPlant.CustomBirth(rType, cType, 0, "auto"),
				(ele, instance) => {
					EDPZ.appendChild(ele);
					instance.Birth();
				},
				tempPlant
			);
		}

		// Deduct sun points
		innerText(ESSunNum, (oS.SunNum -= proto.SunNum));

		// Start cooldown
		if (coolTime) {
			card.CDReady = 0;
			DoCoolTimer(cardIdx, coolTime);
		}

		// Show planting animation
		oSym.addTask(20, SetHidden, [
			SetStyle(laneType !== 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
				left: c - 30 + "px",
				top: r - 30 + "px",
				zIndex: 3 * rType + 1,
				visibility: "visible",
			}),
		]);

		const seedPlants = [
			oSeedPeashooter,
			oSeedSnowPea,
			oSeedSquash,
			oSeedPotatoMine,
			oSeedWallNut,
			oSeedRepeater2,
			oSeedHypnoShroom,
			oSeedPuffShroom,
			oSeedPumpkinHead,
			oSeedPlantern,
			oSeedThreepeater,
			oSeedTallNut,
			oSeedTorchwood,
			oSeedLilyPad,
			oSeedCherryBomb,
			oSeedChomper,
			oSeedRepeater,
			oSeedGarlic,
			oSeedScaredyShroom,
			oSeedBlover,
			oSeedStarfruit,
			oSeedCactus,
			oSeedFumeShroom,
			oSeedDoomShroom,
			oSeedSeaShroom,
			oSeedJalapeno,
			oSeedTangleKelp,
			oSeedIceShroom,
			oSeedGloomShroom,
		];

		if (seedPlants.includes(PlantClass)) {
			SetHidden($(card.DID));
		}
	}

	CancelPlant();
};

var AutoProduceSun = function (amount) {
	AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), amount, 1);
	oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [amount]);
};

var AppearSun = function (x, y, amount, isDrop) {
	let sizeDiff, endTop;
	const id = "Sun" + Math.random();
	let style = `cursor:url(images/interface/Pointer.cur),pointer;z-index:25;left:${x}px;`;

	switch (amount) {
		case 25:
			style += "width:78px;height:78px";
			sizeDiff = 39;
			break;
		case 15:
			style += "width:46px;height:46px";
			sizeDiff = 23;
			break;
		default:
			style += "width:100px;height:100px";
			sizeDiff = 55;
	}

	if (isDrop) {
		endTop = 0;
		oSym.addTask(10, MoveDropSun, [id, y, 0]);
	} else {
		endTop = y - sizeDiff - 20;
		style += ";top:" + endTop + "px";

		// Parabolic arc movement for produced sun
		oSym.addTask(
			1,
			function (sunId, offsetX, offsetY, xStep, ySteps, dir, stepsLeft, tick) {
				if (ArSun[sunId] && ArSun[sunId].C) {
					offsetX += xStep * dir;
					offsetY += Number(ySteps[0]);
					$(sunId).style.transform = "translate(" + offsetX + "px," + offsetY + "px)";
					ySteps.shift();
					--stepsLeft;
					if (stepsLeft > 0) {
						if (ySteps.length === 0) {
							ySteps = [8, 16, 24, 32];
						}
						oSym.addTask(tick, arguments.callee, [sunId, offsetX, offsetY, xStep, ySteps, dir, stepsLeft, ++tick]);
					} else {
						ArSun[sunId].offsetX = offsetX;
						ArSun[sunId].offsetY = offsetY;
					}
				}
			},
			[id, 0, 0, Math.floor(Math.random() * 4), [-32, -24, -16, -8], [-1, 1][Math.floor(Math.random() * 2)], 8, 2]
		);
		oSym.addTask(800, DisappearSun, [id], 3);
	}

	ArSun[id] = { id: id, N: amount, C: 1, left: x, top: endTop };
	NewImg(id, "images/interface/Sun.webp", style, EDAll, {
		onclick() {
			if (!oS.AutoSun) {
				ClickSun(id);
			}
		},
	});

	if (oS.AutoSun) {
		oSym.addTask(100, ClickSun, [id]);
	}

	return id;
};

var MoveDropSun = function (id, targetY, offsetY) {
	const sun = ArSun[id];
	if (sun && sun.C) {
		const endOffset = targetY - 53;
		if (offsetY < endOffset) {
			offsetY += 3;
			sun.offsetY = offsetY;
			$(id).style.transform = "translateY(" + offsetY + "px)";
			oSym.addTask(5, MoveDropSun, [id, targetY, offsetY]);
		} else {
			sun.offsetY = offsetY;
			oSym.addTask(800, DisappearSun, [id]);
		}
	}
};

var DisappearSun = function (id) {
	const sun = ArSun[id];
	if (sun && sun.C) {
		delete ArSun[id];
		ClearChild($(id));
	}
};

var ClickSun = function (id) {
	$(id).onclick = null;
	PlaySound2("points");
	const sun = ArSun[id];
	if (sun && sun.C) {
		sun.C = 0;
		oSym.addTask(0, MoveClickSun, [id]);
	}
};

var MoveClickSun = function (id) {
	const sun = ArSun[id];
	const destX = 85;
	const destY = -20;
	const cssX = sun.left;
	const cssY = sun.top;
	const startX = sun.offsetX || 0;
	const startY = sun.offsetY || 0;

	const el = $(id);
	el.style.setProperty("--sun-start", startX + "px " + startY + "px");
	el.style.setProperty("--sun-end", destX - cssX + "px " + (destY - cssY) + "px");
	el.classList.add("sun-collect");
	el.getAnimations().forEach((a) => (a.playbackRate = oSym.NowStep));

	el.addEventListener("animationend", function onEnd() {
		el.removeEventListener("animationend", onEnd);
		if (Number(ESSunNum.innerHTML) !== oS.SunNum) {
			oS.SunNum = Math.min(Number(ESSunNum.innerHTML), oS.SunNum);
		}
		innerText(ESSunNum, (oS.SunNum = Math.min(oS.SunNum + sun.N, 9990)));
		MonitorCard();
		delete ArSun[id];
		oSym.addTask(20, ClearChild, [el]);
	});
};

var AutoClickSun = function () {
	for (let id in ArSun) {
		if (ArSun[id].C) {
			ClickSun(id);
		}
	}
};

var ShowLargeWave = function (callback) {
	PlaySound2("hugewave");
	NewImg("LargeWave", "images/interface/LargeWave.gif", "left:71px;top:249px;width:400px;height:200px;z-index:50", EDAll);
	oSym.addTask(
		4,
		function (w, h, cb) {
			SetStyle($("LargeWave"), {
				width: (w -= 57.2) + "px",
				height: (h -= 6.8) + "px",
				left: 500 - w * 0.5 + "px",
				top: 300 - h * 0.5 + "px",
			});
			if (w > 286) {
				oSym.addTask(4, arguments.callee, [w, h, cb]);
			} else {
				oSym.addTask(460, () => ClearChild($("LargeWave")), []);
				if (cb) {
					cb();
				}
			}
		},
		[858, 102, callback]
	);
};

var ShowFinalWave = function () {
	const playAnim = function (delay) {
		PlaySound2("finalwave");
		NewImg("FinalWave", "images/interface/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
		oSym.addTask(
			4,
			function (w, h, duration) {
				SetStyle($("FinalWave"), {
					width: (w -= 50.4) + "px",
					height: (h -= 14.2) + "px",
					left: 500 - w * 0.5 + "px",
					top: 300 - h * 0.5 + "px",
				});
				if (w > 252) {
					oSym.addTask(4, arguments.callee, [w, h, duration]);
				} else {
					oSym.addTask(duration, () => ClearChild($("FinalWave")), []);
				}
			},
			[756, 213, delay]
		);
	};

	oP.FlagNum in oS.LargeWaveFlag ? ShowLargeWave(() => oSym.addTask(560, playAnim, [150])) : playAnim(500);
};

var ShowBOSS = function (callback) {
	PlaySound2("finalwave");
	NewImg("ShowBOSS", "images/interface/BOSSWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
	oSym.addTask(
		4,
		function (w, h, cb) {
			SetStyle($("LargeWave"), {
				width: (w -= 57.2) + "px",
				height: (h -= 6.8) + "px",
				left: 500 - w * 0.5 + "px",
				top: 300 - h * 0.5 + "px",
			});
			if (w > 286) {
				oSym.addTask(4, arguments.callee, [w, h, cb]);
			} else {
				oSym.addTask(460, () => ClearChild($("ShowBOSS")), []);
				if (cb) {
					cb();
				}
			}
		},
		[858, 102, callback]
	);
};

var GameOver = function () {
	PlaySound2("scream");
	NewImg("iGameOver", "images/interface/ZombiesWon.webp", "width:900px;height:600px;z-index:255", EDAll, {
		onclick() {
			SelectModal(oS.Lvl);
		},
	});
	oSym.Stop();
};

var GameOverZombies = function (c, a) {
	StopMusic();
	PlaySound2("losemusic");
	oSym.Stop();
	SetBlock($("dSurface"), $("dZombieFail"));
	oSym.Stop();
};

var PrepareGrowPlants = function (callback) {
	const run = function () {
		PlaySound2("readysetplant");
		oSym.addTask(
			60,
			(ele, cb) => {
				const style = ele.style;
				style.backgroundPosition = "0 -108px";
				oSym.addTask(
					40,
					(e, s, c) => {
						s.backgroundPosition = "0 -216px";
						oSym.addTask(
							100,
							(el, call) => {
								ClearChild(el);
								call();
							},
							[e, c]
						);
					},
					[ele, style, cb]
				);
			},
			[
				NewEle(
					0,
					"div",
					`position:absolute;overflow:hidden;background:url(images/interface/PrepareGrowPlants.png) no-repeat;width:255px;height:108px;z-index:50;left:${oS.W * 0.5 - 77}px;top:${oS.H * 0.5 - 54}px`,
					0,
					EDAll
				),
				callback,
			]
		);
	};
	oS.HaveFog ? oGd.MoveFogLeft(run) : run();
};

var CustomPlants = function (idx, c, r) {
	new ArCard[idx].PName().Birth(GetX(r), GetY(c), c, r, []);
};

var CustomSpecial = function (Class, r, c, args) {
	let plant = new Class();
	plant.Birth(GetX(c), GetY(r), r, c, [], args);
	return plant;
};

var CheckAutoSun = function (checkbox) {
	PlaySound2("buttonclick");
	const val = checkbox.checked ? 1 : 0;
	if (val !== oS.AutoSun) {
		oS.AutoSun = val;
		StorageUtil.setItem("JSPVZAutoSun", val);
		if (val) {
			AutoClickSun();
		}
	}
};

var GetNewCard = function (ele, plantClass, nextLvl) {
	StopMusic();
	PlaySound2("winmusic");
	oSym.Clear();
	ele.style.transition = "all 3s ease-out";
	ele.style.width = "100px";
	ele.style.height = "120px";
	ele.style.clip = "";
	ele.style.clipPath = "inset(0 0 60px 0)";
	// force reflow
	void ele.offsetWidth;
	SetStyle(ele, {
		left: "350px",
		top: "131px",
		width: "200px",
		height: "240px",
		clipPath: "inset(0 0 120px 0)",
		cursor: "url(images/interface/Cursor.cur),default",
	}).onclick = null;

	oSym.Init(
		function (opacity, element) {
			if (++opacity < 100) {
				SetAlpha(element, opacity, opacity * 0.01);
				oSym.addTask(4, arguments.callee, [opacity, element]);
			} else {
				StopSound2("winmusic");
				PlaySound2("plantsgarden", true);
				SetHidden(EDAll, $("dTop"));

				const proto = plantClass.prototype;
				$("iNewPlantCard").src = proto.PicArr[proto.CardGif];
				$("iNewPlantCard").style.width = "100px";
				$("iNewPlantCard").style.height = "120px";
				innerText($("dNewPlantName"), proto.CName);
				$("dNewPlantTooltip").innerHTML = proto.Tooltip;

				$("btnNextLevel").onclick = function () {
					StopSound2("plantsgarden");
					SetHidden($("bMainMenu"));
					SelectModal(nextLvl);
				};

				SetStyle($("dNewPlant"), {
					visibility: "visible",
					zIndex: 255,
				});
				SetVisible($("bMainMenu"));
			}
		},
		[0, $("DivA")]
	);
};

var getCookie1 = function (key, subKey) {
	const cookie = document.cookie;
	const list = cookie.split(";");
	let i = list.length;

	while (i--) {
		let entry = list[i].split("=");
		if (entry[0].replace(" ", "") === key) {
			if (entry.length === 2) {
				return unescape(entry[1]);
			}

			entry.shift();
			let subEntries = entry.join("=").split("&");
			if (subKey === undefined) {
				return unescape(subEntries);
			}

			let j = subEntries.length;
			while (j--) {
				let sub = subEntries[j].split("=");
				if (sub[0].replace(" ", "") === subKey) {
					return unescape(sub[1]);
				}
			}
		}
	}
	return 0;
};

var getCookie = function (key) {
	const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
	if (match != null) {
		return unescape(match[2]);
	}
	return 0;
};

var addCookie = function (key, val, expireHours) {
	let str = key + "=" + escape(val);
	if (expireHours) {
		const date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1e3);
		str += ";expire=" + date.toGMTString();
	}
	document.cookie = str;
};

var deleteCookie = function (key) {
	document.cookie = key + "=0;";
};

var WordUTF8 = `<div id="dLogo" style="position:absolute;width:900px;height:600px;z-index:1"><span id="commit" style="position: absolute;color: #ffffff0f;bottom: 0;user-select: none;"></span><div id="LogoWord" style="position:absolute;color:#FF0;top:300px;width:100%;height:100px"><span style="position:absolute;width:305px;height:150px;left:285px;top:5px;cursor:url(images/interface/Pointer.cur),pointer" onclick="PlaySound2('gravebutton');SetBlock($('dSurface'),$('iSurfaceBackground'));ShowNameDiv();CheckIzlParameter();"></span><div style="position:absolute;font-size:14px;left:660px;text-align:center;width:140px;top:185px;line-height:1.5;font-weight:bold"><span style="cursor:url(images/interface/Pointer.cur),pointer"><span id="" style=""></span></span></div></div><div style="position:absolute;width:74px;height:41px;left:807px;top:502px;cursor:url(images/interface/Pointer.cur),pointer;z-index:300" onclick="SetVisible($('dProcess'))"></div><img src="" style="position:absolute;left:550px;top:-40px"></div>`;

var CheckIzlParameter = function () {
	// check if izl_id query parameter exists
	let urlParams = new URLSearchParams(window.location.search);
	let izlId = urlParams.get("izl_id");
	if (izlId) {
		fetch(`${$User.Server.URL}/api/levels/${izlId}/download`, {
			method: "GET",
		})
			.then((response) => response.arrayBuffer())
			.then(async (arrayBuffer) => {
				// load the level
				levelDataToLoad = await decodeBytes(new Uint8Array(arrayBuffer));
				// load the izombiecustomlevel level
				if (levelDataToLoad.lfValue[3] === 2) {
					SelectModal("izombiecustomlevelwater");
				} else {
					SelectModal("izombiecustomlevelnormal");
				}
			})
			.catch((e) => {
				console.error(e);
				alert("There was an error loading the level. Please try again later.");
			});
	}
};
var ShowNameDiv = function () {
	oSym.Start();
	$("dNameDiv0").className = "";
	// trigger reflow to restart the animation
	void $("dNameDiv0").offsetWidth;
	$("dNameDiv0").className = "animate";
};

var ShowLoginDiv = function () {
	$User.isAuthorWebsite ? PlaySound2("tap") : GotoAuthorWebsite("");
};

var CheckLogin = function () {
	const user = $("txtName").value;
	const pass = $("txtPass").value;
	const regUser1 = /^\w{3,10}$/;
	const regUser2 = /^[\u4e00-\u9fa5\w]{3,10}$/;
	const regPass = /^\w{3,20}$/;
	return !!((regUser1.exec(user) || regUser2.exec(user)) && regPass.exec(pass));
};

var SelectModal = function (level) {
	HiddenLevel();
	HiddenMiniGame(1);
	HiddenRiddleGame(1);
	StopMusic();
	PausedAudioArr = [];

	if (level === undefined) {
		level = $User.Visitor.Progress;
	}
	if (oS.LvlClearFunc) {
		oS.LvlClearFunc();
	}
	// check if loadedMenus exists - if it does, clear it
	if (window.loadedMenus) {
		window.loadedMenus.length = 0;
	}

	const globals = oS.GlobalVariables;
	const lvls = oS.LvlVariables;
	const selfs = oS.SelfVariables;
	const win = window;

	for (let key in globals) {
		win[key] = globals[key];
	}
	for (let key in lvls) {
		win[key] = null;
	}
	let i = selfs.length;
	while (i--) {
		delete oS[selfs[i]];
	}
	for (let key in $Pn) {
		$Pn[key] = null;
	}

	oS.GlobalVariables = {};
	oS.LvlVariables = {};
	oS.SelfVariables.length = 0;

	SetHidden($("dCardList"), $("tGround"), $("dSelectCard"), $("dTop"), $("dMenu"), $("dHandBook"), $("dNewPlant"), $("dProcess"));
	SetNone($("dSurface"), $("iSurfaceBackground"));
	ClearChild($("dFlagMeterTitleB").firstChild);

	EDAll = $("dBody").replaceChild(EDNewAll, EDAll);
	$("dBody").replaceChild(EDNewFlagMeter, $("dFlagMeter"));
	LoadLvl(level);
};

var GotoAuthorWebsite = function () {
	window.open("https://github.com/Plants-vs-Zombies-MODDED/game");
};

var InitGame = function () {
	const serverDiv = NewEle(
		"dServer",
		"div",
		"position:absolute;line-height:28px;left:706px;top:245px;width:700px;height:100px;font-size:16px;color:#040;font-family:Tahoma;font-weight:bold;z-index:2;display:none",
		0,
		$("dAll")
	);
	const procDiv = $("dProcess");

	if (!$("dText1")) {
		procDiv.insertBefore(
			NewEle(
				"dText1",
				"div",
				0,
				{
					innerHTML: atob(
						"PHNwYW4gc3R5bGU9ImZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7Y29sb3I6I2JiYjt3aWR0aDo4NSU7ZGlzcGxheTpibG9jazttYXJnaW46MTVweCBhdXRvIDAgYXV0byI+PHNwYW4gc3R5bGU9ImNvbG9yOiNmNjA7Ij5XZWxjb21lIHRvIFBsYW50cyB2cy4gWm9tYmllczogTU9EREVEPGJyPjwvc3Bhbj48c3BhbiBzdHlsZT0iY29sb3I6I2VlZTsiPlBsYW50cyB2cy4gWm9tYmllcyBNT0RERUQgJmNvcHk7IDIwMjUgYnkgUk9CbE5FVDEzIGlzIGxpY2Vuc2VkIHVuZGVyIDxhIGhyZWY9Imh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy1uZC80LjAvZGVlZC5lbiI+Q0MgQlktTkMtTkQgNC4wPC9hPi4gVGhpcyBsaWNlbnNlIGFwcGxpZXMgb25seSB0byBvcmlnaW5hbCBjb2RlL2NvbnRlbnQgY3JlYXRlZCBieSB0aGUgbW9kZGluZyB0ZWFtLiBBbGwgUGxhbnRzIHZzLiBab21iaWVzIGludGVsbGVjdHVhbCBwcm9wZXJ0eSByZW1haW5zIHRoZSBleGNsdXNpdmUgcHJvcGVydHkgb2YgUG9wQ2FwIEdhbWVzIGFuZCBFbGVjdHJvbmljIEFydHMgKEVBKS48L3NwYW4+PGJyPjxicj5QbGFudHMgdnMuIFpvbWJpZXMgTU9EREVEIGlzIGFuIHVub2ZmaWNpYWwgbW9kaWZpY2F0aW9uIGFuZCBpcyBub3QgYWZmaWxpYXRlZCB3aXRoLCBlbmRvcnNlZCBieSwgb3IgYXNzb2NpYXRlZCB3aXRoIFBvcENhcCBHYW1lcywgRWxlY3Ryb25pYyBBcnRzIChFQSksIG9yIHRoZSBvZmZpY2lhbCBQbGFudHMgdnMuIFpvbWJpZXMgZ2FtZS4gQWxsIGludGVsbGVjdHVhbCBwcm9wZXJ0eSwgdHJhZGVtYXJrcywgYW5kIGNvcHlyaWdodHMgcmVsYXRlZCB0byB0aGUgb3JpZ2luYWwgUGxhbnRzIHZzLiBab21iaWVzIGdhbWUgYXJlIHRoZSBwcm9wZXJ0eSBvZiBQb3BDYXAgR2FtZXMgYW5kIEVBLiBBbGwgY29kZSBpbiB0aGlzIGZhbmdhbWUgaXMgb3JpZ2luYWwsIGJhc2VkIG9uIGEgUHZaIHdlYmdhbWUgb3JpZ2luYWxseSBjcmVhdGVkIGJ5IEppYW5nTmFuIEdhbWUgRGV2ZWxvcG1lbnQgQ29tcGFueSBhbmQgTG9uZWx5U3Rhci4gVGhpcyBtb2QgZG9lcyBub3QgdXNlIGFueSBjb2RlIHdyaXR0ZW4gb3Igb3duZWQgYnkgUG9wQ2FwIEdhbWVzIG9yIEVBLiBUaGlzIG1vZCBpcyBjcmVhdGVkIGJ5IGZhbnMgZm9yIGVudGVydGFpbm1lbnQgcHVycG9zZXMgb25seSwgYW5kIG5vIGNvbW1lcmNpYWwgZ2FpbiBpcyBzb3VnaHQgb3Igb2J0YWluZWQgZnJvbSBpdHMgZGlzdHJpYnV0aW9uLiBVc2Ugb2YgdGhpcyBtb2QgaXMgYXQgeW91ciBvd24gcmlzaywgYW5kIHRoZSBjcmVhdG9ycyBvZiB0aGUgbW9kIGFyZSBub3QgbGlhYmxlIGZvciBhbnkgZGFtYWdlcyBvciBpc3N1ZXMgdGhhdCBtYXkgYXJpc2UgZnJvbSBpdHMgdXNlLjxicj48YnI+VXNlcyBvZiB0aGUgUG9wQ2FwIEdhbWVzIG9yIEVsZWN0cm9uaWMgQXJ0cyAoRUEpIG5hbWVzIGFyZSBmb3IgaWRlbnRpZmljYXRpb24gcHVycG9zZXMgb25seSBhbmQgZG8gbm90IGltcGx5IGFuIGVuZG9yc2VtZW50IGJ5IFBvcENhcCBHYW1lcyBvciBFQS48YnI+PGJyPjx1PkRvIG5vdCByZW1vdmUgdGhpcyB3YXJuaW5nLjwvdT4gRG9pbmcgc28gPHNwYW4gc3R5bGU9ImNvbG9yOnJlZCI+dmlvbGF0ZXM8L3NwYW4+IHRoZSB0ZXJtcyBvZiB0aGUgbGVnYWxseS1iaW5kaW5nIENyZWF0aXZlIENvbW1vbnMgTGljZW5zZSwgaWYgb3JpZ2luYWwgY29kZS9jb250ZW50IGNyZWF0ZWQgYnkgdGhlIG1vZGRpbmcgdGVhbSBpcyBpbmNsdWRlZC48YnI+PGJyPjxiPklmIHJlcXVlc3RlZCBieSBhbiBvZmZpY2lhbCBzb3VyY2UsIHdlIHdpbGwgcHJvbXB0bHkgdGFrZSBkb3duIHRoaXMgZmFuIGdhbWUgYW5kIHRoZSBhc3NvY2lhdGVkIEdpdEh1YiByZXBvLiBZb3UgbWF5IGNvbnRhY3QgdXMgdXNpbmcgdGhlIGVtYWlsIGxpc3RlZCBvbiA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20vUk9CbE5FVDEzL3B2ei9ibG9iL21haW4vUkVBRE1FLm1kI2xlZ2FsLWluZm8iPmh0dHBzOi8vZ2l0aHViLmNvbS9ST0JsTkVUMTMvcHZ6L2Jsb2IvbWFpbi9SRUFETUUubWQjbGVnYWwtaW5mbzwvYT4uPC9iPjwvc3Bhbj4="
					),
				},
				0
			),
			procDiv.firstChild
		);
	}
	LoadLvl();
};

var LoadLvl = function (level, startTime) {
	if (oSym.Timer) {
		oSym.Stop();
	}
	const isReplay = oSym.Now === startTime;
	const user = $User;

	if (oS.CenterContent && ((level === 0 && isReplay) || level !== 0)) {
		oS.DisplayAD = true;
	}

	level = level || 0;
	if ($("dServer") && level !== 0) {
		SetNone($("dServer"));
	}

	oSym.Init(
		(lvl) => {
			const script = $("JSPVZ");
			if (script) {
				ClearChild(script);
			}
			NewEle(
				"JSPVZ",
				"script",
				0,
				{
					src: "level/" + (oS.Lvl = lvl) + ".js",
					type: "text/javascript",
				},
				document.getElementsByTagName("head").item(0)
			);
		},
		[level && isReplay ? 0 : level]
	);
};

var AppearTombstones = function (minR, maxR, count) {
	const tombs = oGd.$Tombstones;
	const candidates = [];
	let r = oS.R + 1;

	// Find valid locations
	while (--r) {
		let c = maxR;
		while (c >= minR) {
			if (!tombs[r + "_" + c]) {
				candidates.push([r, c]);
			}
			--c;
		}
	}

	while (count--) {
		let randIdx = Math.floor(Math.random() * candidates.length);
		let coord = candidates[randIdx];
		let tr = coord[0];
		let tc = coord[1];
		let key = tr + "_" + tc;

		tombs[key] = 1;

		// Kill existing plants at location
		for (let i = 0; i < 4; i++) {
			let p = oGd.$[key + "_" + i];
			if (p) {
				p.Die();
			}
		}

		candidates.splice(randIdx, 1);

		const div = NewEle("dTombstones" + key, "div", `position:absolute;width:86px;height:91px;left:${GetX(tc) - 43}px;top:${GetY(tr) - 91}px`, 0, EDAll);
		const bgX = Math.floor(Math.random() * 4);
		const bgY = Math.floor(Math.random() * 2);

		div.appendChild(NewEle("", "div", `background-position:-${86 * bgX}px -${91 * bgY}px`, { className: "Tom1" }, div).cloneNode(false)).className = "Tom2";
	}
};

var ResetGame = function (menuBtn) {
	AllAudioPauseCanceled();
	oSym.Start();
	innerText(menuBtn, "Speed");
	$("dMenu1").onclick = ClickMenu;
	$("dMenu0").onclick = ShowSpeed;
	SetNone($("dSurface"), $("dPause"));
	$("dPauseAD").innerHTML = "";
};

var PauseGame = function (menuBtn, showAd) {
	AllAudioPaused();
	oSym.Stop();
	innerText(menuBtn, "Speed");
	$("dMenu1").onclick = null;
	$("dMenu0").onclick = null;
	if (!showAd) {
		SetBlock($("dSurface"), $("dPause"));
	}
};

var ClickMenu = function (e, btn) {
	if (oSym.Timer) {
		AllAudioPaused();
		PlaySound2("pause");
		oSym.Stop();
		SetBlock($("dSurface"));
		innerText($("dMenu0"), "Speed");
		ShowOptions();
	}
	$("sOptionsMenu").textContent = "Back To Game";
	$("pauseHome").textContent = "Home";
	$("pauseHome").onclick = function () {
		let oldLv = oS.Lvl;
		SelectModal(0);
		SetBlock($("dSurface"), $("iSurfaceBackground"));
		ShowNameDiv();
		oS.Lvl = oldLv;
	};
	SetVisible($("pauseHomeIcon"));
	if (ArCard[oS.ChoseCard] && ArCard[oS.ChoseCard].DID != null) {
		CancelPlant();
	}
};

var OptionsMenuDown = function (ele, wrapper) {
	ele.className = "OptionsMenuButtonDown";
	wrapper.style.paddingTop = "2px";
};

var OptionsMenuUP = function (ele, wrapper) {
	ele.className = "OptionsMenuButton";
	wrapper.style.paddingTop = "0px";
};

var ShowSpeed = function () {
	oSym.Stop();
	PlaySound2("gravebutton");
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	SetBlock($("dSpeedContainer").parentElement);
};

var HiddenSpeed = function () {
	PlaySound2("tap");
	SetNone($("dSpeedContainer").parentElement);
	if (oS.Lvl) {
		ResetGame($("dMenu0"));
	}
};

var CSpeed = function (nowStep, timeStep, displayLabel) {
	$User.Visitor.NowStep = oSym.NowStep = nowStep;
	$User.Visitor.TimeStep = oSym.TimeStep = timeStep;
	$("dDisplaySpeed").innerHTML = displayLabel;
	document.getAnimations().forEach((anim) => (anim.playbackRate = nowStep));
};

var ShowLevel = function () {
	PlaySound2("gravebutton");
	SetNone($("dOptionsMenu"));
	SetBlock($("dAdvSmallContainer"));
};

var HiddenLevel = function () {
	PlaySound2("tap");
	SetNone($("dOptionsMenuback"), $("dAdvSmallContainer"));
	if (oS.Lvl) {
		SetNone($("dSurface"));
		ResetGame($("dMenu0"));
	}
};

var ShowMiniGame = function () {
	PlaySound2("gravebutton");
	SetBlock($("dMiniSmallContainer"));
};

var HiddenMiniGame = function (isSilent) {
	if (!isSilent) {
		PlaySound2("tap");
	}
	SetNone($("dMiniSmallContainer"));
};

var ShowRiddleGame = function () {
	PlaySound2("gravebutton");
	SetBlock($("dRiddleSmallContainer"));
};

var HiddenRiddleGame = function (isSilent) {
	if (!isSilent) {
		PlaySound2("tap");
	}
	SetNone($("dRiddleSmallContainer"));
};

var ShowOptions = function () {
	$("sOptionsMenu").textContent = "OK";
	$("pauseHome").textContent = "Credits";
	SetHidden($("pauseHomeIcon"));
	$("pauseHome").onclick = function () {
		PlaySound2("tap");
		LoadMenu("credits");
	};
	PlaySound2(oS.Lvl ? "gravebutton" : "tap");
	SetBlock($("dOptionsMenuback"), $("dOptionsMenu"));
};

var HiddenOptions = function () {
	PlaySound2("gravebutton");
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	if (oS.Lvl) {
		SetNone($("dSurface"));
		ResetGame($("dMenu0"));
	}
};

var ViewHandBook = function () {
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	if (oS.Lvl) {
		AllAudioPaused();
		PlaySound2("gravebutton");
		SetNone($("dSurface"));
		oSym.Stop();
		innerText($("dMenu0"), "back to game");
		$("dMenu1").onclick = null;
	} else {
		AllAudioPaused();
		PlaySound2("tap");
	}
	PlaySound2("ChooseYourSeeds", true);
	SetVisible($("dHandBook"));
};

var ReturnHandBookInx = function () {
	PlaySound2("tap");
	SetNone($("dHandBookP"), $("dHandBookZ"));
	SetHidden($("dHandBookPZ"));
};

var CloseHandBook = function () {
	PlaySound2("tap");
	StopSound2("ChooseYourSeeds");
	if (oS.Lvl) {
		ResetGame($("dMenu0"));
	} else {
		AllAudioPauseCanceled();
	}
	SetNone($("dHandBookP"), $("dHandBookZ"));
	SetHidden($("dHandBookPZ"), $("dHandBook"));
};

var ShowHelp = function (ele) {
	LoadMenu(
		"note",
		"images/interface/NoteBG.png",
		{
			overlayImage: "images/interface/ZombieNoteHelp.png",
			callback: HiddenHelp,
		},
		ele
	);
};

var HiddenHelp = function () {
	PlaySound2("tap");
	AllAudioPauseCanceled();
	ShowNameDiv();
	UnloadMenu("note");
};

var $ = function (id) {
	return document.getElementById(id);
};

var $n = function (tag) {
	return document.createElement(tag);
};

var ClearChild = function () {
	let i = arguments.length;
	while (i--) {
		try {
			let child = arguments[i];
			child.parentNode.removeChild(child);
			child = null;
		} catch (e) {}
	}
};

var SetBlock = function () {
	let i = arguments.length;
	while (i--) {
		if (arguments[i]) {
			arguments[i].style.display = "block";
		}
	}
};

var SetNone = function () {
	let i = arguments.length;
	while (i--) {
		if (arguments[i] && arguments[i].style) {
			arguments[i].style.display = "none";
		}
	}
};

var SetHidden = function () {
	let i = arguments.length;
	while (i--) {
		if (arguments[i]) {
			arguments[i].style.visibility = "hidden";
		}
	}
};

var SetVisible = function () {
	let i = arguments.length;
	while (i--) {
		if (arguments[i]) {
			arguments[i].style.visibility = "visible";
		}
	}
};

var SetAlpha = $User.Browser.IE6
	? function (ele, val, opacity) {
			ele.style.filter = "alpha(opacity=" + val + ")";
		}
	: function (ele, val, opacity) {
			ele.style.opacity = opacity;
		};

var SetStyle = function (ele, styles) {
	const s = ele.style;
	for (let key in styles) {
		s[key] = styles[key];
	}
	return ele;
};

var NewImg = function (id, src, cssText, parent, props) {
	const img = $n("img");
	img.src = src;
	if (cssText) {
		img.style.cssText = cssText;
	}
	if (props) {
		for (let key in props) {
			img[key] = props[key];
		}
	}
	if (id) {
		img.id = id;
	}
	if (parent) {
		parent.appendChild(img);
	}
	return img;
};

var EditImg = function (img, id, src, styles, parent) {
	if (id) {
		img.id = id;
	}
	if (src) {
		img.src = src;
	}
	if (styles) {
		SetStyle(img, styles);
	}
	if (parent) {
		parent.appendChild(img);
	}
	return img;
};

var NewEle = function (id, tag, cssText, props, parent, attrs) {
	const ele = $n(tag);
	if (id) {
		ele.id = id;
	}
	if (cssText) {
		ele.style.cssText = cssText;
	}
	if (props) {
		for (let key in props) {
			ele[key] = props[key];
		}
	}
	if (attrs) {
		for (let key in attrs) {
			ele.setAttribute(key, attrs[key]);
		}
	}
	if (parent) {
		parent.appendChild(ele);
	}
	return ele;
};

var EditEle = function (ele, attrs, styles, props, parent) {
	// Backward/forward compatibility:
	// Many call sites use EditEle(ele, attrs, styles, parent) or
	// EditEle(ele, attrs, styles, parent, props). Detect and normalize.
	if (props && props.nodeType && parent && !parent.nodeType) {
		// (ele, attrs, styles, parentEle, propsObj)
		const realParent = props;
		props = parent;
		parent = realParent;
	} else if (!parent && props && props.nodeType) {
		// (ele, attrs, styles, parentEle)
		parent = props;
		props = null;
	}
	if (attrs) {
		for (let key in attrs) {
			ele.setAttribute(key, attrs[key]);
		}
	}
	if (styles) {
		SetStyle(ele, styles);
	}
	if (props) {
		for (let key in props) {
			if (key === "outerText" && !ele.parentNode) {
				ele.textContent = props[key];
			} else {
				ele[key] = props[key];
			}
		}
	}
	if (parent) {
		parent.appendChild(ele);
	}
	return ele;
};

var NewO = function (proto, constructor) {
	constructor = function () {};
	constructor.prototype = proto;
	return constructor;
};

var SetPrototype = function (child, parent) {
	const p = child.prototype;
	for (let key in parent) {
		p[key] = parent[key];
	}
};

var InheritO = function (Parent, properties, arrayProps, child, parentArr, childArr) {
	const Child = function () {};
	Child.prototype = new Parent();
	if (properties) {
		SetPrototype(Child, properties);
	}

	if (arrayProps) {
		const proto = Child.prototype;
		for (let key in arrayProps) {
			parentArr = proto[key].slice(0);
			childArr = arrayProps[key];
			for (let k in childArr) {
				parentArr[k] = childArr[k];
			}
			Child.prototype[key] = parentArr;
		}
	}
	return Child;
};

var Compare = function (val, min, max, func, arg) {
	const result = val < min ? min : val > max ? max : val;
	return func ? [func(result), result] : [result];
};

var $Switch = function (val, cases, comparer, result, len) {
	let i = 0;
	len = cases.length;
	while (i < len) {
		if (comparer(val, cases[i])) {
			break;
		}
		++i;
	}
	return result[i];
};

var $SEql = function (key, map) {
	return key in map ? map[key] : map.default;
};

var $SSml = function (val, thresholds, results) {
	let i = 0;
	window.LX = thresholds.length;
	while (i < LX) {
		if (val < thresholds[i]) {
			break;
		}
		++i;
	}
	return results[i];
};

var $SGrt = function (val, thresholds, results) {
	let i = 0;
	window.LX = thresholds.length;
	while (i < LX) {
		if (val > thresholds[i]) {
			break;
		}
		++i;
	}
	return results[i];
};

var ImgSpriter = function (id, cardId, config, frameIdx, callback) {
	const frame = config[frameIdx];
	const nextIdx = frame[2];
	const ele = $(id);

	if (ele) {
		ele.style.backgroundPosition = frame[0];
		oSym.addTask(
			frame[1],
			(idx) => {
				idx > -1 ? ImgSpriter(id, cardId, config, idx, callback) : callback(id, cardId);
			},
			[nextIdx]
		);
	}
};

var Ajax = function () {};

Date.prototype.format = function (fmt) {
	const o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds(),
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return fmt;
};

var NewMusic = $User.HTML5
	? function (src) {
			NewAudio({ autoplay: true, loop: true, source: src });
		}
	: function (src) {
			if (!oS.Silence) {
				$("oEmbed").innerHTML = "";
			}
		};

var PauseMusic = $User.HTML5
	? function () {
			const audio = oAudio[oS.LoadMusic];
			if (audio) {
				audio.currentTime = 0;
				audio.pause();
			}
		}
	: function () {
			$("oEmbed").innerHTML = "";
		};

var StartAdventure = function (level) {
	const handDiv = $("ZombieHand");
	const advDiv = $("dAdventure");
	const handImg = NewImg("", "images/interface/ZombieHand.png", "position:absolute;left:0", handDiv);

	advDiv.onclick = advDiv.onmouseover = advDiv.onmouseout = null;
	SetBlock(handDiv);
	StopMusic();
	PlaySound2("losemusic");

	oSym.addTask(
		120,
		() => {
			PlaySound2("evillaugh");
		},
		[]
	);

	oSym.addTask(
		7,
		function (count, ele, left) {
			ele.style.left = (left -= 330) + "px";
			if (--count) {
				oSym.addTask(7, arguments.callee, [count, ele, left]);
			}
		},
		[6, handImg, 0]
	);

	const animation = function (ele, frame, count) {
		if (--count) {
			ele.style.backgroundPosition = ["top", "bottom"][frame];
			oSym.addTask(10, arguments.callee, [ele, frame ? 0 : 1, count]);
		} else {
			ele.style.backgroundPosition = "top";
			ele.onclick = StartAdventure;
			ele.onmouseover = function () {
				this.style.backgroundPosition = "bottom";
			};
			ele.onmouseout = function () {
				this.style.backgroundPosition = "top";
			};

			if ($User.HTML5) {
				StopSound2("evillaugh");
			}
			SelectModal(level);
			handDiv.innerHTML = "";
		}
	};

	if ($User.HTML5) {
		animation(advDiv, 1, 50);
	} else {
		NewMusic("evillaugh");
		animation(advDiv, 1, 50);
	}
};

var oAudio = {};
var PausedAudioArr = [];

var NewAudio = $User.HTML5
	? function (config) {
			const src = config.source;
			if (oAudio[src]) {
				return;
			}

			const audio = document.createElement("audio");
			const types = { mp3: "audio/mpeg" };
			const formats = ["mp3"];
			let i = formats.length;

			audio.autoplay = !!config.autoplay;

			if (config.loop) {
				audio.addEventListener(
					"ended",
					() => {
						audio.play();
					},
					false
				);
			}

			while (i--) {
				let source = document.createElement("source");
				source.type = types[formats[i]];
				source.src = "audio/" + src + ".mp3";
				audio.appendChild(source);
			}

			audio.preload = config.preload === undefined ? "auto" : ["auto", "meta", "none"][config.preload];
			audio.muted = oS.Silence;

			if (config.callback) {
				audio.addEventListener("canplaythrough", config.callback, false);
			}

			return (oAudio[src] = audio);
		}
	: function () {};

var PlayMusic = $User.HTML5
	? function (src) {
			let audio = oAudio[src];
			if (audio) {
				try {
					audio.currentTime = 0;
				} catch (e) {}
				audio.play();
			} else {
				NewMusic(src);
				oAudio[src].play();
			}
		}
	: function (src) {
			NewMusic(src);
		};

var PlayAudioLegacy = $User.HTML5
	? function (src, loop) {
			const audio = oAudio[src];
			if (audio) {
				audio.loop = !!loop;
				audio.play();
			} else {
				NewAudio({ source: src, loop: !!loop }).play();
			}
		}
	: function () {};

var PlayAudio = $User.HTML5
	? function (src, loop) {
			let audio = oAudio[src];
			if (!audio) {
				audio = NewAudio({ source: src, loop: !!loop });
				oAudio[src] = audio;
			} else {
				audio.loop = !!loop;
			}
			audio.currentTime = 0;
			audio.play();
		}
	: function () {};

var PauseAudio = $User.HTML5
	? function (src) {
			oAudio[src].pause();
		}
	: function () {};

var StopMusic = $User.HTML5
	? function () {
			const audio = oAudio[oS.LoadMusic];
			try {
				audio.currentTime = 0;
			} catch (e) {}
			if (audio) {
				audio.pause();
			}
		}
	: function () {};

var StopAudio = $User.HTML5
	? function (src) {
			const audio = oAudio[src];
			try {
				audio.currentTime = 0;
			} catch (e) {}
			try {
				audio.pause();
			} catch (e) {}
		}
	: function () {};

var AllAudioPaused = $User.HTML5
	? function () {
			for (let key in oAudio) {
				let audio = oAudio[key];
				if (!(audio.paused || audio.ended)) {
					PausedAudioArr.push(key);
					audio.pause();
				}
			}
		}
	: function () {};

var AllAudioPauseCanceled = $User.HTML5
	? function () {
			let i = PausedAudioArr.length;
			while (i--) {
				oAudio[PausedAudioArr[i]].play();
			}
			PausedAudioArr.length = 0;
		}
	: function () {};

var AllAudioMuted = function () {
	for (let key in oAudio) {
		oAudio[key].muted = true;
	}
	// also playingSounds
	for (let key in playingSounds) {
		playingSounds[key].muted = true;
	}
};

var AllAudioMuteCanceled = function () {
	for (let key in oAudio) {
		oAudio[key].muted = false;
	}
	// also playingSounds
	for (let key in playingSounds) {
		playingSounds[key].muted = false;
	}
};

var CheckSilence = $User.HTML5
	? function (checkbox) {
			const val = checkbox.checked ? 1 : 0;
			if (val !== oS.Silence) {
				addCookie("JSPVZSilence", (oS.Silence = val));
				val ? AllAudioMuted() : AllAudioMuteCanceled();
			}
		}
	: function (checkbox) {
			const val = checkbox.checked ? 1 : 0;
			if (val !== oS.Silence) {
				addCookie("JSPVZSilence", (oS.Silence = val));
				val ? PauseMusic() : NewMusic(oS.StartGameMusic);
			}
		};

var AppearCard = function (x, y, PlantClass, moveType, duration) {
	const id = "dCard" + Math.random();
	let style = `opacity:1;width:100px;height:120px;cursor:url(images/interface/Pointer.cur),pointer;clip:rect(auto,auto,60px,auto);left:${x}px;top:-1000px`;
	duration = duration || 1500;
	let endTop;

	if (moveType) {
		endTop = 0;
		oSym.addTask(1, MoveDropCard, [id, y, duration]);
	} else {
		endTop = y - 15 - 20;
		style += ";top:" + endTop + "px";

		oSym.addTask(1, DisappearCard, [id, duration]);

		// Parabolic drop animation
		oSym.addTask(
			1,
			function (cardId, curX, curY, xStep, ySteps, dir, stepsLeft, tick) {
				if (ArCard[cardId] && $(cardId)) {
					SetStyle($(cardId), {
						left: (curX += xStep * dir) + "px",
						top: (curY += Number(ySteps[0])) + "px",
					});
					ySteps.shift();
					--stepsLeft;
					if (stepsLeft > 0) {
						if (ySteps.length === 0) {
							ySteps = [8, 16, 24, 32];
						}
						oSym.addTask(tick, arguments.callee, [cardId, curX, curY, xStep, ySteps, dir, stepsLeft, ++tick]);
					}
				}
			},
			[id, x, endTop, Math.floor(Math.random() * 4), [-32, -24, -16, -8], [-1, 1][Math.floor(Math.random() * 2)], 8, 2]
		);
	}

	ArCard[id] = {
		DID: id,
		PName: PlantClass,
		PixelTop: 600,
		CDReady: 1,
		SunReady: 1,
		top: endTop,
		HasChosen: false,
		Kind: 1,
	};

	NewImg(id, PlantClass.prototype.PicArr[PlantClass.prototype.CardGif], style, $("dCardList"), {
		onclick(e) {
			const self = this;
			ClearChild($("MovePlant"), $("MovePlantAlpha"));
			CancelPlant();
			if (self.style) {
				self.style.opacity = 0.5;
			}
			ChosePlant(e, self.id);
			if (ArCard[self.id]) {
				ArCard[self.id].HasChosen = true;
			}
		},
	});
};

var MoveDropCard = function (id, targetY, duration) {
	const card = ArCard[id];
	const ele = $(id);
	if (card && ele) {
		if (!card.HasChosen && card.top < targetY - 52) {
			ele.style.top = (card.top += 2) + "px";
			oSym.addTask(5, MoveDropCard, [id, targetY, duration]);
		} else {
			DisappearCard(id, duration);
		}
	}
};

var DisappearCard = function (id, duration) {
	const step = 5;
	let ele = $(id);

	(function tick(timeLeft) {
		if (!ArCard[id] || !ele) {
			return;
		}

		if (oS.Chose === 1 && oS.ChoseCard === id) {
			// Selected, do nothing
		} else if (timeLeft > 500) {
			ele.style.opacity = 1;
		} else if (timeLeft > 0) {
			ele.style.opacity = [1, 0.5][Math.ceil(timeLeft / 50) % 2];
		} else {
			delete ArCard[id];
			ClearChild(ele);
			return;
		}

		ele = $(id);
		oSym.addTask(step, tick, [timeLeft - step]);
	})(duration);
};

NewEle("dTitle", "div", 0, 0, $("dBody"));

const allPlantsStringArray = [
	// for alamanac
	"oPeashooter",
	"oSunFlower",
	"oCherryBomb",
	"oWallNut",
	"oPotatoMine",
	"oSnowPea",
	"oChomper",
	"oRepeater",
	"oPuffShroom",
	"oSunShroom",
	"oFumeShroom",
	"oGraveBuster",
	"oHypnoShroom",
	"oScaredyShroom",
	"oIceShroom",
	"oDoomShroom",
	"oLilyPad",
	"oSquash",
	"oThreepeater",
	"oTangleKlep",
	"oJalapeno",
	"oSpikeweed",
	"oTorchwood",
	"oTallNut",
	"oCactus",
	"oPlantern",
	"oSplitPea",
	"oStarfruit",
	"oPumpkinHead",
	"oFlowerPot",
	"oCoffeeBean",
	"oGarlic",
	"oSeaShroom",
	"oOxygen",
	"ostar",
	"oTTS",
	"oGun",
	"oSeaAnemone",
	"oGatlingPea",
	"oGloomShroom",
	"oTwinSunflower",
	"oSpikerock",
	"oTenManNut",
	"oSnowRepeater",
	"oCattail",
	"oLotusRoot",
	"oIceFumeShroom",
	"oLaserBean",
	"oBigChomper",
	"oFlamesMushroom",
	"oBalloon",
];

const allPlantsArray = () => {
	// also for almanac
	const arr = [];
	for (let i = 0; i < allPlantsStringArray.length; i++) {
		arr.push(window[allPlantsStringArray[i]]);
	}
	return arr;
};

const izombiePlantsMap = [
	// for izombie (DONT CHANGE THE ORDER!!!!!!)
	"oPeashooter",
	"oSunFlower",
	"oCherryBomb",
	"oWallNut",
	"oPotatoMine",
	"oSnowPea",
	"oChomper",
	"oRepeater",
	"oPuffShroom",
	"oSunShroom",
	"oFumeShroom",
	"oGraveBuster",
	"oHypnoShroom",
	"oScaredyShroom",
	"oIceShroom",
	"oDoomShroom",
	"oLilyPad",
	"oILilyPad",
	"oSquash",
	"oThreepeater",
	"oTangleKlep",
	"oJalapeno",
	"oSpikeweed",
	"oTorchwood",
	"oTallNut",
	"oCactus",
	"oPlantern",
	"oSplitPea",
	"oStarfruit",
	"oPumpkinHead",
	"oFlowerPot",
	"oCoffeeBean",
	"oGarlic",
	"oSeaShroom",
	"oOxygen",
	"ostar",
	"oTTS",
	"oGun",
	"oSeaAnemone",
	"oGatlingPea",
	"oGloomShroom",
	"oTwinSunflower",
	"oSpikerock",
	"oTenManNut",
	"oSnowRepeater",
	"oCattail",
	"oLotusRoot",
	"oIceFumeShroom",
	"oLaserBean",
	"oBigChomper",
	"oFlamesMushroom",
];

var CPlants = NewO({
	name: "Plants",
	HP: 300,
	PKind: 1,
	beAttackedPointL: 20,
	CardGif: 0,
	StaticGif: 1,
	NormalGif: 2,
	AlmanacGif: 2,
	BookHandBack: "Day",
	canEat: 1,
	zIndex: 0,
	AudioArr: [],
	coolTime: 7.5,
	CanSelect: 1,
	canTrigger: 1,
	Stature: 0,

	Sleep: 0,
	CanGrow(c, b, e) {
		var a = b + "_" + e;
		var d = oS.ArP;
		// oxlint-disable-next-line no-nested-ternary
		return d
			? oGd.$LF[b] === 1
				? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1]
			: oGd.$LF[b] === 1
				? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1])
				: c[0] && !c[1];
	},
	getHurt(e, c, b) {
		var d = this;
		var a = d.id;
		!(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
	},
	GetDY(b, c, a) {
		return a[0] ? -21 : -15;
	},
	GetDX() {
		return -Math.floor(this.width * 0.5);
	},
	GetDBottom() {
		return this.height;
	},
	Birth(d, c, h, a, m, n) {
		var e = this;
		var k = d + e.GetDX();
		var i = c + e.GetDY(h, a, m);
		var l = e.prototype;
		var g = i - e.height;
		var b = (e.id = "P_" + Math.random());
		var j = (e.zIndex += 3 * h);
		var f = NewEle(0, "div", "position:absolute");

		var isOnLilyPad = false;
		for (var pID in $P) {
			var p = $P[pID];
			if (p && p.R === h && p.C === a && p.EName === "oLilyPad") {
				isOnLilyPad = true;
				break;
			}
		}

		var isWaterRow = oGd.$LF[h] === 2;
		var isBlacklisted = e.EName === "oPoolCleaner";

		if ((isOnLilyPad || isWaterRow) && !isBlacklisted) {
			f.className += " floatingPlant";
		}

		NewImg(0, ShadowPNG, e.getShadow(e), f);
		e.plantImage = NewImg(0, e.PicArr[e.NormalGif], "", f);

		e.ele = f;
		e.pixelLeft = k;
		e.pixelRight = k + e.width;
		e.pixelTop = g;
		e.pixelBottom = g + e.GetDBottom();
		e.opacity = 1;
		e.InitTrigger(e, b, (e.R = h), (e.C = a), (e.AttackedLX = k + e.beAttackedPointL), (e.AttackedRX = k + e.beAttackedPointR));

		$P[b] = e;
		$P.length += 1;

		e.BirthStyle(
			e,
			b,
			f,
			{
				left: k + "px",
				top: g + "px",
				zIndex: j,
			},
			n
		);

		oGd.add(e, h + "_" + a + "_" + e.PKind);
		e.PrivateBirth(e, n);
	},
	getShadow(a) {
		return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px";
	},
	BirthStyle(c, d, b, a) {
		EditEle(
			b,
			{
				id: d,
			},
			a,
			EDPZ
		);
	},
	PrivateBirth(a) {},
	getTriggerRange(a, b, c) {
		return [[b, oS.W, 0]];
	},
	getTriggerR(a) {
		return [a, a];
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
	TriggerCheck(b, a) {
		this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
	},
	CheckLoop(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		oSym.addTask(
			140,
			(e, f, h) => {
				var g;
				(g = $P[e]) && g.AttackCheck1(f, h);
			},
			[a, b, c]
		);
	},
	AttackCheck1(g, f) {
		var b = this;
		var c = b.oTrigger;
		var a = $Z[g];
		var h;
		var e;
		var k;
		var j;
		if (a && a.PZ && (h = c[a.R])) {
			k = a.ZX;
			e = h.length;
			while (e--) {
				j = h[e];
				if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
					b.CheckLoop(g, j[2]);
					return;
				}
			}
		}
		b.canTrigger = 1;
	},
	AttackCheck2(a) {
		return a.Altitude > 0;
	},
	PrivateDie(a) {},
	BoomDie() {
		var a = this;
		var b = a.id;
		a.oTrigger && oT.delP(a);
		a.HP = 0;
		delete $P[b];
		delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
		$P.length -= 1;
		ClearChild($(b));
		a.PrivateDie(a);
	},
	Die(a) {
		var b = this;
		var c = b.id;
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
		$P.length -= 1;
		!a && ClearChild($(c));
		b.PrivateDie(b);
	},
});

var interpolate = function (start, end, amt, easingFunc) {
	return start + (end - start) * (easingFunc ? easingFunc(amt) : amt);
};

var easeInSine = function (x) {
	return 1 - Math.cos((x * Math.PI) / 2);
};

var easeOutSine = function (x) {
	return Math.sin((x * Math.PI) / 2);
};

var easeInOutSine = function (x) {
	return -(Math.cos(Math.PI * x) - 1) / 2;
};

var easeInQuad = function (x) {
	return x * x;
};

var easeOutQuad = function (x) {
	return 1 - (1 - x) * (1 - x);
};

var easeInOutQuad = function (x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

var easeInCubic = function (x) {
	return x * x * x;
};

var easeOutCubic = function (x) {
	return 1 - Math.pow(1 - x, 3);
};

var easeInOutCubic = function (x) {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

var easeInQuart = function (x) {
	return x * x * x * x;
};

var easeOutQuart = function (x) {
	return 1 - Math.pow(1 - x, 4);
};

var easeInOutQuart = function (x) {
	return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

var easeInQuint = function (x) {
	return x * x * x * x * x;
};

var easeOutQuint = function (x) {
	return 1 - Math.pow(1 - x, 5);
};

var easeInOutQuint = function (x) {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

var easeInExpo = function (x) {
	return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

var easeOutExpo = function (x) {
	return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

var easeInOutExpo = function (x) {
	// oxlint-disable-next-line no-nested-ternary
	return x === 0
		? 0
		: // oxlint-disable-next-line no-nested-ternary
			x === 1
			? 1
			: x < 0.5
				? Math.pow(2, 20 * x - 10) / 2
				: (2 - Math.pow(2, -20 * x + 10)) / 2;
};

var easeInCirc = function (x) {
	return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

var easeOutCirc = function (x) {
	return Math.sqrt(1 - Math.pow(x - 1, 2));
};

var easeInOutCirc = function (x) {
	return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

var easeInBack = function (x) {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return c3 * x * x * x - c1 * x * x;
};

var easeOutBack = function (x) {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

var easeInOutBack = function (x) {
	const c1 = 1.70158;
	const c2 = c1 * 1.525;
	return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

var easeInElastic = function (x) {
	const c4 = (2 * Math.PI) / 3;
	// oxlint-disable-next-line no-nested-ternary
	return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

var easeOutElastic = function (x) {
	const c4 = (2 * Math.PI) / 3;
	// oxlint-disable-next-line no-nested-ternary
	return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

var easeInOutElastic = function (x) {
	const c5 = (2 * Math.PI) / 4.5;
	// oxlint-disable-next-line no-nested-ternary
	return x === 0
		? 0
		: // oxlint-disable-next-line no-nested-ternary
			x === 1
			? 1
			: x < 0.5
				? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
				: (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

var easeOutBounce = function (x) {
	const n1 = 7.5625;
	const d1 = 2.75;
	if (x < 1 / d1) {
		return n1 * x * x;
	} else if (x < 2 / d1) {
		return n1 * (x -= 1.5 / d1) * x + 0.75;
	} else if (x < 2.5 / d1) {
		return n1 * (x -= 2.25 / d1) * x + 0.9375;
	}
	return n1 * (x -= 2.625 / d1) * x + 0.984375;
};

var easeInBounce = function (x) {
	return 1 - easeOutBounce(1 - x);
};

var easeInOutBounce = function (x) {
	return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
};

function createZombie(zombieClass, row, column) {
	let zombie = new zombieClass(),
		zombieHTML = zombie.CustomBirth(row, column, 0, "auto");
	asyncInnerHTML(
		zombieHTML,
		(fragment, zombieObj) => {
			EDPZ.appendChild(fragment);
			zombieObj.Birth();
		},
		zombie
	);
}
