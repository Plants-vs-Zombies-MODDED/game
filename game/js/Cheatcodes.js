let keySequence = "";
let sequenceTimeout = null;

// Cheat codes can be:
// - A function (clears sequence after use)
// - An object with { action: function, clearSequence: boolean }
let cheatCodes = {
	fast: () => {
		CSpeed(1000, 10, "really damn fast");
	},
	balloon: () => {
		oBalloon.prototype.Birth();
	},
	re: () => {
		SelectModal(oS.Lvl);
	},
	handy: () => {
		ViewHandBook();
	},
	j: () => {
		const sunId = AppearSun($User.Mouse.x, $User.Mouse.y, 25, false);
		if (!oS.AutoSun) {
			oSym.addTask(Math.round(1000 / oSym.TimeStep), ClickSun, [sunId]);
		}
	},
	abminArrowUp: () => {
		window.open("https://backend.pvzm.net/admin.html", "_blank");
	},
	mustache: () => {
		alert("yearn for the mustache");
	},
	moustache: () => {
		alert("yearn for the moustache");
	},
	ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba: () => {
		PlaySound2("tap");
	},
	trickedout: () => {
		// todo: actually do the thing!!!
		alert("get tricked (out)!");
		// PlaySound2("tap");
	},
	debug: () => {
		import("./Debug.js");
	},
};

function getCheatAction(cheat) {
	return typeof cheat === "function" ? cheat : cheat.action;
}

function shouldClearSequence(cheat) {
	if (typeof cheat === "function") {
		return true;
	}
	return cheat.clearSequence !== false;
}

// oxlint-disable-next-line complexity
document.addEventListener("keydown", (event) => {
	// Ignore if typing in input fields
	if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
		return;
	}

	// Add key to sequence
	keySequence += event.key;

	// Clear sequence after 5 seconds of inactivity
	clearTimeout(sequenceTimeout);
	sequenceTimeout = setTimeout(() => {
		keySequence = "";
	}, 5000);

	// Check for cheat codes
	if (!["izombieverifynormal", "izombieverifywater"].includes(oS.Lvl)) {
		for (i in cheatCodes) {
			if (keySequence.includes(i)) {
				const cheat = cheatCodes[i];
				getCheatAction(cheat)();
				if (shouldClearSequence(cheat)) {
					keySequence = "";
				}
			}
		}
	}

	// Prevent sequence from getting too long
	if (keySequence.length > 100) {
		keySequence = keySequence.slice(-10);
	}
	console.log(keySequence);
});
