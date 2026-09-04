const levelContainer = menuContainer.querySelector(".iz-level-container");
const levelTemplate = levelContainer.querySelector("#iz-level-template");
const paginationContainer = menuContainer.querySelector(".iz-pagination");
const menuTitle = menuContainer.querySelector("#iz-menu-title");

const bgNormal = new Image();
bgNormal.src = "images/interface/background2.jpg";
const bgWater = new Image();
bgWater.src = "images/interface/background4.jpg";

const paginationButtons = {
	first: paginationContainer?.querySelector(".iz-pagination-first"),
	prev: paginationContainer?.querySelector(".iz-pagination-prev"),
	back2: paginationContainer?.querySelector(".iz-pagination-back2"),
	back1: paginationContainer?.querySelector(".iz-pagination-back1"),
	current: paginationContainer?.querySelector(".iz-pagination-current"),
	forward1: paginationContainer?.querySelector(".iz-pagination-forward1"),
	forward2: paginationContainer?.querySelector(".iz-pagination-forward2"),
	next: paginationContainer?.querySelector(".iz-pagination-next"),
	last: paginationContainer?.querySelector(".iz-pagination-last"),
};

let page = 1;
let limit = 6;
let requestId = 0;
let sorts = {
	featured: "Featured",
	recent: "Recent",
	plays: "Popular",
	favorites: "Player's Choice",
};
const SORT_STORAGE_KEY = "pvz.izombieonline.sort";

function getDefaultSortIndex() {
	const sortKeys = Object.keys(sorts);
	const saved = (() => {
		try {
			return StorageUtil.getItem(SORT_STORAGE_KEY);
		} catch {
			return null;
		}
	})();

	if (saved && sortKeys.includes(saved)) {
		return sortKeys.indexOf(saved);
	}

	// Default to "Featured" if no valid saved preference.
	const featuredIndex = sortKeys.indexOf("featured");
	return featuredIndex >= 0 ? featuredIndex : 0;
}

let currentSortIndex = getDefaultSortIndex();

function persistCurrentSort() {
	try {
		StorageUtil.setItem(SORT_STORAGE_KEY, Object.keys(sorts)[currentSortIndex]);
	} catch {
		// Ignore storage errors (private mode, disabled storage, etc.)
	}
}

document.querySelector(".iz-sort").addEventListener("click", (event) => {
	PlaySound2("tap");
	currentSortIndex += 1;
	if (currentSortIndex >= Object.keys(sorts).length) {
		currentSortIndex = 0;
	}
	persistCurrentSort();
	ViewGenericMouseover(`<b>Current Sort</b>: ${Object.values(sorts)[currentSortIndex]}`, event);
	menuTitle.textContent = `${Object.values(sorts)[currentSortIndex]} Online Levels`;
	clearLevels();
	loadPage(page);
});

document.querySelector(".iz-sort").addEventListener("mousemove", (event) => {
	ViewGenericMouseover(`<b>Current Sort</b>: ${Object.values(sorts)[currentSortIndex]}`, event);
});

document.querySelector(".iz-reload").addEventListener("click", () => {
	PlaySound2("tap");
	clearLevels();
	loadPage(page);
});

function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

async function renderThumbnailCanvas(thumb, background, small) {
	const s = small ? 0.15 : 1;
	const canvas = document.createElement("canvas");
	canvas.width = 900 * s;
	canvas.height = 600 * s;
	const ctx = canvas.getContext("2d");
	// draw bg, position −115px size 1400x600
	ctx.drawImage(background, -115 * s, 0, 1400 * s, 600 * s);
	// sort thumbnail by zindex (plant[5])
	thumb.sort((a, b) => a[5] - b[5]);
	// preload all plant images
	const plantImages = await Promise.all(
		thumb.map((plant) => {
			const plantClass = window[izombiePlantsMap[plant[0]]];
			const src = plantClass !== oPumpkinHead ? plantClass.prototype.PicArr[1] : plantClass.prototype.PicArr[8];
			return loadImage(src);
		})
	);
	// draw thumbnail with cardboard filter
	ctx.filter = small ? "url(#cardboardNoShadow)" : "url(#cardboard)";
	thumb.forEach((plant, i) => {
		const plantClass = window[izombiePlantsMap[plant[0]]];
		if (plantClass !== oPumpkinHead) {
			const scale = 1.5;
			const newW = plant[3] * scale * s;
			const newH = plant[4] * scale * s;
			const newX = (plant[1] - (plant[3] * scale - plant[3]) / 2) * s;
			const newY = (plant[2] - (plant[4] * scale - plant[4]) / 2) * s;
			ctx.drawImage(plantImages[i], newX, newY, newW, newH);
		} else {
			ctx.drawImage(plantImages[i], plant[1] * s, plant[2] * s, plant[3] * s, plant[4] * s);
		}
	});
	return canvas;
}

async function renderThumbnail(thumb, thumbContainer, backgroundImg) {
	const canvas = await renderThumbnailCanvas(thumb, backgroundImg, true);
	thumbContainer.innerHTML = "";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	thumbContainer.appendChild(canvas);
}

function createLevelCard(levelData) {
	const levelCard = levelTemplate.cloneNode(true);
	levelCard.id = `level-${levelData.id}`;
	levelCard.querySelector(".iz-level-title").textContent = levelData.name;
	levelCard.querySelector(".iz-level-title").title = levelData.name;
	levelCard.querySelector(".iz-level-stats > #author").textContent = levelData.author;
	levelCard.querySelector(".iz-level-stats > #sun").textContent = levelData.sun;
	levelCard.querySelector(".iz-level-stats > #downloads").textContent = levelData.plays;
	levelCard.querySelector(".iz-level-stats > #favorites").textContent = levelData.favorites;
	const bg = levelData.is_water ? bgWater : bgNormal;
	if (levelData.thumbnail?.every((p) => p[1] != null)) {
		renderThumbnail(levelData.thumbnail, levelCard.querySelector(".iz-level-thumbnail"), bg);
	}
	levelCard.style.display = null;

	levelCard.querySelector(".iz-level-report").onclick = () => {
		const reason = prompt("Tell us how you think this level is breaking the rules:");
		const confirmation = confirm("Are you sure you want to report this level?");
		if (!confirmation) {
			return;
		}
		// reason is optional
		fetch(`${$User.Server.URL}/api/levels/${levelData.id}/report`, {
			method: "POST",
			headers: {
				"Content-Type": "application/msgpack",
			},
			body: msgpack.serialize({ reason }),
		})
			.then((response) => {
				if (response.ok) {
					alert("Thank you for your report. Our team will review the level shortly.");
				} else {
					alert("There was an error submitting your report. Please try again later.");
				}
			})
			.catch(() => {
				alert("There was an error submitting your report. Please try again later.");
			});
	};

	levelCard.querySelector(".iz-level-favorite").onclick = () => {
		fetch(`${$User.Server.URL}/api/levels/${levelData.id}/favorite`, {
			method: "POST",
			headers: {
				Accept: "application/msgpack",
			},
		})
			.then((response) => {
				if (response.ok) {
					const favCountElem = levelCard.querySelector(".iz-level-stats > #favorites");
					// alert("Level favorited!");
					response.arrayBuffer().then((data) => {
						const newFavCount = msgpack.deserialize(data).level.favorites;
						favCountElem.textContent = newFavCount;
					});
				} else {
					alert("There was an error favoriting this level. Please try again later.");
				}
			})
			.catch(() => {
				alert("There was an error favoriting this level. Please try again later.");
			});
	};

	levelCard.querySelector(".iz-level-play").onclick = () => {
		// fetch the level data from the server (responds with binary data)
		fetch(`${$User.Server.URL}/api/levels/${levelData.id}/download`, {
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
	};

	return levelCard;
}

function setPaginationButtonVisible(button, visible) {
	if (!button) {
		return;
	}
	if (visible) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", "");
		button.onclick = null;
	}
}

function setPaginationButtonPage(button, targetPage, currentPage, totalPages) {
	if (!button) {
		return;
	}
	const valid = Number.isInteger(targetPage) && targetPage >= 1 && targetPage <= totalPages;
	setPaginationButtonVisible(button, valid);
	if (!valid) {
		return;
	}

	button.value = String(targetPage);
	button.onclick = () => {
		if (targetPage !== currentPage) {
			void loadPage(targetPage);
		}
	};
}

function renderPagination(pagination) {
	if (!paginationContainer) {
		return;
	}

	const currentPage = Number(pagination?.page ?? 1);
	const totalPages = Math.max(1, Number(pagination?.pages ?? 1));

	if (totalPages <= 1) {
		paginationContainer.style.display = "none";
		return;
	}
	paginationContainer.style.display = "";

	// Current page is always shown.
	if (paginationButtons.current) {
		paginationButtons.current.value = String(currentPage);
		paginationButtons.current.onclick = null;
		setPaginationButtonVisible(paginationButtons.current, true);
	}

	// Navigation buttons.
	setPaginationButtonVisible(paginationButtons.first, currentPage > 1);
	if (paginationButtons.first) {
		paginationButtons.first.onclick = () => void loadPage(1);
	}

	setPaginationButtonVisible(paginationButtons.prev, currentPage > 1);
	if (paginationButtons.prev) {
		paginationButtons.prev.onclick = () => void loadPage(currentPage - 1);
	}

	setPaginationButtonVisible(paginationButtons.next, currentPage < totalPages);
	if (paginationButtons.next) {
		paginationButtons.next.onclick = () => void loadPage(currentPage + 1);
	}

	setPaginationButtonVisible(paginationButtons.last, currentPage < totalPages);
	if (paginationButtons.last) {
		paginationButtons.last.onclick = () => void loadPage(totalPages);
	}

	// numbered neighbors
	if (currentPage === totalPages) {
		setPaginationButtonPage(paginationButtons.back2, currentPage - 2, currentPage, totalPages);
	} else {
		setPaginationButtonVisible(paginationButtons.back2, false);
	}
	setPaginationButtonPage(paginationButtons.back1, currentPage - 1, currentPage, totalPages);
	setPaginationButtonPage(paginationButtons.forward1, currentPage + 1, currentPage, totalPages);
	if (currentPage === 1) {
		setPaginationButtonPage(paginationButtons.forward2, currentPage + 2, currentPage, totalPages);
	} else {
		setPaginationButtonVisible(paginationButtons.forward2, false);
	}
}

function clearLevels() {
	for (const child of Array.from(levelContainer.children)) {
		if (child !== levelTemplate) {
			child.remove();
		}
	}
}

async function loadPage(targetPage) {
	page = targetPage;
	const id = ++requestId;

	const response = await fetch(`${$User.Server.URL}/api/levels?page=${page}&limit=${limit}&sort=${Object.keys(sorts)[currentSortIndex]}`, {
		method: "GET",
		headers: {
			Accept: "application/msgpack",
		},
	});
	const data = msgpack.deserialize(await response.arrayBuffer());
	if (id !== requestId) {
		return;
	}

	const levels = data.levels ?? [];
	const pagination = data.pagination ?? { page, limit, pages: 1, total: levels.length };
	limit = Number(pagination.limit ?? limit);

	clearLevels();
	levels.forEach((level) => {
		const levelCard = createLevelCard(level);
		levelContainer.appendChild(levelCard);
	});

	renderPagination(pagination);
}

// set initial menu title
menuTitle.textContent = `${Object.values(sorts)[currentSortIndex]} Online Levels`;
// fetch first page from server
void loadPage(page);
