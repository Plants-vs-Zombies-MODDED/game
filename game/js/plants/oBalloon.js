export var oBalloon = InheritO(CPlants, {
	EName: "oBalloon",
	CName: "Balloonatic",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: "+150",
	coolTime: "Wave",
	HP: 1,
	AlmanacGif: 1,
	PicArr: ["images/Card/Plants/BalloonGoober.webp", "images/Zombies/Balloon/0.png", "images/Zombies/Balloon/popped.png"],
	Tooltip: "Drops sun when popped",
	Produce:
		'<font color="#28325A">Balloonatics have a chance to spawn every wave. Popping them produces 150 sun</font>.</font><br><p>Toughness: <font color="CC241D">low</font></p> ">:3" says the Balloonatic. ">:3" says the Balloonatic, again.',
	Birth(_1, _2, row, _4) {
		let balloonId = Math.floor(1 + Math.random() * 1000);
		let endMode = "endOfAnimation";

		function getAnimatedPosition(element) {
			const computedStyle = getComputedStyle(element);
			const left = parseFloat(computedStyle.left);
			const top = parseFloat(computedStyle.top);
			return { left, top };
		}

		if (!oBalloon.StyleSheet) {
			let dynamicStyle = document.createElement("style");
			document.head.appendChild(dynamicStyle);
			oBalloon.StyleSheet = dynamicStyle.sheet;
		}

		function getRandomY() {
			if (row) {
				return GetY(row - 2) + 45;
			}
			return GetY(-1 + Math.floor(Math.random() * oS.R)) + 45;
		}

		let randomY = getRandomY();
		const toTicks = (ms) => Math.round(ms / oSym.TimeStep);

		oBalloon.StyleSheet.insertRule(`@keyframes moveLeft${balloonId} { from { left: 910px; } to { left: -75px; } }`, oBalloon.StyleSheet.cssRules.length);

		oBalloon.StyleSheet.insertRule(
			`@keyframes bobbing${balloonId} { 0%, 100% { top: ${randomY}px; } 50% { top: ${randomY + 10}px; } }`,
			oBalloon.StyleSheet.cssRules.length
		);

		let image = document.createElement("div");
		image.style = `
            background-image: url(images/Zombies/Balloon/balloonidle.png);
            position: absolute;
            display: block;
            left: 875px;
            top: ${randomY}px;
            z-index: 99;
            width: 154px;
            height: 181px;
            scale: 0.6038961039;
            cursor: url(images/interface/Pointer.cur),pointer;
            animation:
                spritesheetIdle 1s steps(30) infinite,
                moveLeft${balloonId} 13s linear,
                bobbing${balloonId} 2s ease-in-out infinite;
        `;

		EDPZ.appendChild(image);
		image.getAnimations().forEach((a) => (a.playbackRate = oSym.NowStep));

		image.onclick = function () {
			image.onclick = null;
			image.style = `
                background-image: url(images/Zombies/Balloon/popped.png);
                position: absolute;
                display: block;
                left: ${getAnimatedPosition(image).left}px;
                top: ${randomY}px;
                z-index: 99;
                width: 154px;
                height: 181px;
                scale: 0.6038961039;
                pointer-events: none;
                animation: spritesheetPop 1s 1 normal forwards steps(21);
            `;
			image.getAnimations().forEach((a) => (a.playbackRate = oSym.NowStep));

			image.addEventListener("animationend", () => {
				if (endMode === "endOfAnimation") {
					image.style = `
                        background-image: url(images/Zombies/Balloon/popped.png);
                        background-position-x: -3080px;
                        position: absolute;
                        display: block;
                        left: ${getAnimatedPosition(image).left}px;
                        top: ${randomY}px;
                        z-index: 99;
                        width: 154px;
                        height: 181px;
                        scale: 0.6038961039;
                        pointer-events: none;
                    `;
					endMode = "remove";
				} else {
					image.parentNode.removeChild(image);
				}
			});

			oSym.addTask(toTicks(300), () => {
				PlaySound2("balloon_pop");
				oSym.addTask(toTicks(150), () => {
					if ($("dSunNum").style.visibility === "") {
						AppearSun(getAnimatedPosition(image).left + 40, randomY + 60, 125, false);
					}
				});
				oSym.addTask(toTicks(2500), () => {
					SetStyle(image, {
						transition: "opacity 0.2s ease",
						opacity: 0,
					});

					oSym.addTask(toTicks(400), () => {
						image.parentNode.removeChild(image);
					});
				});
			});
		};

		PlaySound2("ballooninflate");
	},
	InitTrigger() {},
});
