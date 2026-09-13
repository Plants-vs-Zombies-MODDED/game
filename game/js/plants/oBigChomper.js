import { oChomper } from "./oChomper.js";

export var oBigChomper = InheritO(oChomper, {
	EName: "oBigChomper",
	CName: "Super Chomper",
	coolTime: 15,
	BookHandPosition: "56% 54%",
	PicArr: [
		"images/Card/Plants/BigChomper.webp",
		"images/Plants/BigChomper/0.gif",
		"images/Plants/BigChomper/Chomper.gif",
		"images/Plants/BigChomper/ChomperAttack.gif",
		"images/Plants/BigChomper/ChomperDigest.gif",
	],
	Tooltip: "Can devour multiple zombie whole at once, but is vulnerable while rapidly chewing",
	Produce:
		'超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速</font><br>度是普通大嘴花的50%。<p>Harm:<font color="#CC241D">巨大</font><br>Scope:<font color="#CC241D">非常近</font><br>Features:<font color="#CC241D">咀嚼时间短</font></p>超级大嘴花曾经是电视节目“超级大胃王”节</font><br>目的常客，但后来他被踢出了节目组，原因是</font><br>它的存在直接影响到观众的饮食量和节目收视</font><br>率。没办法，为了糊口他只得干起吞食僵尸行</font><br>动。',
	/*
CanGrow: function(b, a, d) {
var c = b[1];
return c && c.EName == "oChomper"
},
*/
	NormalAttack(a, b) {
		$(a).childNodes[1].src = "images/Plants/BigChomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(
			70,
			(c, d) => {
				PlaySound2("bigchomp");
				$P[c] &&
					oSym.addTask(
						9,
						(e, f) => {
							var g = $P[e];
							var h;
							g &&
								((h = $Z[f]) && h.beAttacked && h.PZ
									? ($(e).childNodes[1].src = h.getRaven(e, h)
											? (oSym.addTask(
													2100,
													(i) => {
														var j = $P[i];
														j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif"));
													},
													[e]
												),
												"images/Plants/BigChomper/ChomperDigest.gif")
											: ((g.canTrigger = 1), "images/Plants/BigChomper/Chomper.gif"))
									: oSym.addTask(
											9,
											(i) => {
												var j = $P[i];
												j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif"));
											},
											[e]
										));
						},
						[c, d]
					);
			},
			[a, b]
		);
	},
});
