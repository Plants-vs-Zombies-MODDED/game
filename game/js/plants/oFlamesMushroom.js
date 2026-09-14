import { oDoomShroom } from "./oDoomShroom.js";

export var oFlamesMushroom = InheritO(CPlants, {
	EName: "oFlamesMushroom",
	CName: "Fire-shroom",
	width: 102,
	height: 91,
	beAttackedPointR: 80,
	SunNum: 200,
	HP: 4e3,
	BookHandBack: "Night",
	coolTime: 30,
	PicArr: [
		"images/Card/Plants/FlamesMushroom.webp",
		"images/Plants/FlamesMushroom/0.gif",
		"images/Plants/FlamesMushroom/FlamesMushroom.gif",
		"images/Plants/FlamesMushroom/FlamesMushroom1.gif",
		"images/Plants/FlamesMushroom/FlamesMushroom2.gif",
	],
	Tooltip: "烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸",
	Produce:
		'烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸<p>Toughness:<font color="CC241D">高</font><p><font color="#000000">技能：<font color="#1F470B">在自身3x3范围内召唤8只毁灭菇</font></p>烈焰菇总是为自己的火焰感到反感，因为它们</font><br>总是伤害到自己的朋友。所以为了朋友，烈焰</font><br>菇到花园里找到了自己的归宿。',
	getHurt(e, b, a) {
		var c = this;
		var d = $(c.id).childNodes[1];
		!(b % 3)
			? (c.HP -= a) < 1
				? c.Die()
				: c.HP < 2667
					? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/FlamesMushroom/FlamesMushroom2.gif"))
					: c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/FlamesMushroom/FlamesMushroom1.gif"))
			: c.Die(1);
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
						!(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oDoomShroom, R1, C1);
					}
				}
			}
		}
	},
});
