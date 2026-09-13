import { oOG } from "./oOG.js";

export var oOxygen = InheritO(CPlants, {
	EName: "oOxygen",
	CName: "Oxygen",
	width: 115,
	height: 102,
	beAttackedPointR: 53,
	SunNum: 25,
	HP: 300,
	BookHandBack: "Undersea",
	coolTime: 7.5,
	PicArr: ["images/Card/Plants/Oxygen.webp", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen.gif"],
	Tooltip: "Oxygen provides algae to plants on the ground",
	Produce:
		'<font color="#28325A">Oxygen Algae can provide oxygen bubbles to plants on land</font><p>Range: <font color="#CC241D">all tiles in a medium area</font><br></p>"Puff...puff..." puffs Oxygen Algae, it wasn\'t that he was willing to keep spitting bubbles, only to blame him for drinking too much soda last night. However, there are rumors that all he knows is spitting bubbles.',
	CanGrow(e, d, f) {
		var c = d + "_" + f;
		var b = oGd.$LF[d];
		var a = f < 1 || f > 9;
		return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
	},
	NormalAttack() {},
	PrivateBirth(a) {
		var { R } = a;
		var { C } = a;
		var R1;
		var C1;
		var MaxR = oS.R;
		var MaxC = oS.C;
		var LF = oGd.$LF;
		var LFR;
		var _$ = oGd.$;
		var rc;

		for (R1 = R - 1; R1 <= R + 1; R1++) {
			if (R1 > 0 && R1 <= MaxR) {
				LFR = LF[R];
				for (C1 = C - 1; C1 <= C + 1; C1++) {
					if (C1 > 0 && C1 <= MaxC && (LFR === 1 || LFR === 3)) {
						rc = R1 + "_" + C1 + "_";
						!(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oOG, R1, C1);
					}
				}
			}
		}
	},
});
