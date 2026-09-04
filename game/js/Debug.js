import { Pane } from "./tweakpane.min.js";

const pane = new Pane({
	container: document.querySelector("#debugMenu"),
});

const tab = pane.addTab({
	pages: [{ title: "Level" }, { title: "Cheats" }, { title: "Variables" }],
});

const [levelTab, cheatsTab, variablesTab] = tab.pages;

// shared helpers

const stringifyProxy = (obj) =>
	new Proxy(obj, {
		get: (t, k) => (typeof t[k] === "object" && t[k] !== null ? JSON.stringify(t[k]) : String(t[k])),
	});

function syncKeys({ keys, bindings, add, remove }) {
	for (const k of bindings.keys()) {
		if (!keys.includes(k)) {
			remove(k);
		}
	}

	for (const k of keys) {
		if (!bindings.has(k)) {
			add(k);
		}
	}
}

// dynamic object folder

function dynamicObjectFolder(container, source, title, { expanded = false, include, exclude = [] } = {}) {
	const folder = container.addFolder({ title, expanded });

	let obj = source;
	let proxy = stringifyProxy(obj);
	const bindings = new Map();

	const validKeys = () =>
		Object.keys(obj).filter((k) => {
			if (exclude.includes(k)) {
				return false;
			}
			if (include && !include.includes(k)) {
				return false;
			}
			return typeof obj[k] !== "function";
		});

	const sync = () =>
		syncKeys({
			keys: validKeys(),
			bindings,
			add: (k) => bindings.set(k, folder.addBinding(proxy, k, { readonly: true })),
			remove: (k) => {
				bindings.get(k).dispose();
				bindings.delete(k);
			},
		});

	const observed = new Proxy(obj, {
		set(t, k, v) {
			t[k] = v;
			sync();
			return true;
		},
		deleteProperty(t, k) {
			delete t[k];
			sync();
			return true;
		},
	});

	sync();

	return {
		folder,
		observed,
		setSource(newObj) {
			for (const b of bindings.values()) {
				b.dispose();
			}
			bindings.clear();
			obj = newObj;
			proxy = stringifyProxy(obj);
			sync();
		},
	};
}

// dynamic array folder

function dynamicArrayFolder(container, array, title, { expanded = false, itemExpanded = false } = {}) {
	const folder = container.addFolder({ title, expanded });

	let arr = array;
	const items = new Map();

	const syncItem = (i) => {
		const el = arr[i];
		if (!el || typeof el !== "object") {
			return;
		}

		const entry = items.get(i);
		const keys = Object.keys(el).filter((k) => typeof el[k] !== "function");

		syncKeys({
			keys,
			bindings: entry.bindings,
			add: (k) => entry.bindings.set(k, entry.folder.addBinding(entry.proxy, k, { readonly: true })),
			remove: (k) => {
				entry.bindings.get(k).dispose();
				entry.bindings.delete(k);
			},
		});
	};

	const sync = () => {
		for (const [i, entry] of items) {
			if (i >= arr.length) {
				entry.folder.dispose();
				items.delete(i);
			}
		}

		for (let i = 0; i < arr.length; i++) {
			const el = arr[i];
			if (!el || typeof el !== "object") {
				continue;
			}

			if (!items.has(i)) {
				const entry = {
					folder: folder.addFolder({ title: `[${i}]`, expanded: itemExpanded }),
					bindings: new Map(),
					proxy: stringifyProxy(el),
					source: el,
				};
				items.set(i, entry);
				syncItem(i);
			} else if (items.get(i).source !== el) {
				const entry = items.get(i);
				for (const b of entry.bindings.values()) {
					b.dispose();
				}
				entry.bindings.clear();
				entry.proxy = stringifyProxy(el);
				entry.source = el;
				syncItem(i);
			}
		}
	};

	const observed = new Proxy(arr, {
		set(t, k, v) {
			t[k] = v;
			sync();
			return true;
		},
		deleteProperty(t, k) {
			delete t[k];
			sync();
			return true;
		},
	});

	sync();

	return { folder, observed };
}

// variables tab

const osFolder = dynamicObjectFolder(variablesTab, oS, "oS");
const userFolder = dynamicObjectFolder(variablesTab, $User, "$User");
const soundsFolder = dynamicArrayFolder(variablesTab, playingSounds, "playingSounds", { itemExpanded: true });
const plantsFolder = dynamicObjectFolder(variablesTab, $P, "$P");
const zombiesFolder = dynamicObjectFolder(variablesTab, $Z, "$Z");

window.oS = osFolder.observed;
window.$User = userFolder.observed;
playingSounds = soundsFolder.observed;
window.$P = plantsFolder.observed;
window.$Z = zombiesFolder.observed;

// level tab

const levelName = levelTab.addBlade({
	view: "text",
	label: "name",
	value: "0",
	parse: String,
});

levelTab.addButton({ title: "Load Level" }).on("click", () => {
	SelectModal(levelName.value);
});

levelTab.addBlade({ view: "separator" });

const side = levelTab.addBlade({
	view: "list",
	label: "side",
	value: "front",
	options: [
		{ text: "front (normal)", value: "front" },
		{ text: "back (pool)", value: "back" },
	],
});

const time = levelTab.addBlade({
	view: "list",
	label: "time",
	value: "day",
	options: [
		{ text: "day", value: "day" },
		{ text: "night", value: "night" },
	],
});

levelTab.addButton({ title: "Load Debug Level" }).on("click", () => {
	SelectModal(`debug_${side.value}_${time.value}`);
});

levelTab.addBlade({ view: "separator" });

levelTab.addButton({ title: "Reload Current Level" }).on("click", () => {
	SelectModal(oS.Lvl);
});

// cheats tab

const sun = cheatsTab.addBlade({
	view: "slider",
	label: "sun",
	min: 1,
	max: 9990,
	value: 50,
	format: Math.round,
});
/*
cheatsTab.addButton({ title: "Gain Sun" }).on("click", () => {
	const id = AppearSun($User.Mouse.x - 45, $User.Mouse.y + 45, Math.round(sun.value), false);

	if (!oS.AutoSun) {
		oSym.addTask(Math.round(1000 / oSym.TimeStep), ClickSun, [id]);
	}
});

cheatsTab.addBlade({ view: "separator" });

cheatsTab.addButton({ title: "Spawn Balloonatic" }).on("click", () => {
	oBalloon.prototype.Birth();
});
*/

const cheatsMap = {
	fast: {
		title: "1000x speed (fast)",
		visible: true,
	},
	balloon: {
		title: "spawn balloonatic (balloon)",
		visible: true,
	},
	re: {
		title: "reload current level (re)",
		visible: true,
	},
	handy: {
		title: "open handbook (handy)",
		visible: true,
	},
	j: {
		title: "spawn sun at mouse (j)",
		visible: true,
	},
	abminArrowUp: {
		title: "open admin page (abmin↑)",
		visible: true,
	},
	mustache: {
		title: "mustache alert!!! (mustache)",
		visible: true,
	},
	moustache: {
		title: "moustache alert!!! (moustache)",
		visible: true,
	},
	ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba: {
		title: "konami code (↑↑↓↓←→←→ba)",
		visible: true,
	},
	trickedout: {
		title: "alert tricked out (trickedout)",
		visible: true,
	},
	debig: {
		title: "open debug menu (debig)",
		visible: false,
	},
};

Object.entries(cheatCodes).forEach(([name, action]) => {
	if (!cheatsMap[name]?.visible) {
		return;
	}
	cheatsTab.addButton({ title: cheatsMap[name].title || name }).on("click", () => {
		action();
	});
});
