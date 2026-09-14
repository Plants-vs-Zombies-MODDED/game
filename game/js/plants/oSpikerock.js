import { oSpikeweed } from "./oSpikeweed.js";

export var oSpikerock = InheritO(oSpikeweed, {
	EName: "oSpikerock",
	CName: "Spikerock",
	width: 84,
	height: 43,
	beAttackedPointL: 10,
	beAttackedPointR: 74,
	SunNum: 125,
	BookHandPosition: "49% 80%",
	PicArr: [
		"images/Card/Plants/Spikerock.webp",
		"images/Plants/Spikerock/0.gif",
		"images/Plants/Spikerock/Spikerock.gif",
		"images/Plants/Spikerock/2.gif",
		"images/Plants/Spikerock/3.gif",
	],
	Attack: 40,
	Tooltip: 'Pops multiple tires and damages zombies that walk over it  <p> <font color="red">(requires spikeweed)</font>',
	Produce:
		'<font color="#28325A">Spikerocks pop multiple tires and damage zombies that walk over it.</font><p>Must be planted on spikeweeds<p>Spikerock just got back from a trip to Europe. He had a great time, met some wonderful people, really broadened his horizons. He never knew they made museums so big, or put so many paintings in them. That was a big surprise for him.',
	CanGrow(b, a, d) {
		var c = b[1];
		return c && c.EName === "oSpikeweed";
	},
	GetDY(b, c, a) {
		return 0;
	},
	getHurt(f, c, b) {
		var e = this;
		var d;
		var a = $(e.id).childNodes[1];
		switch (c) {
			case 2:
				f.flatTire();
				break;
			case 1:
				f.getHit2(f, 40, 0);
		}
		switch (true) {
			case (d = e.HP -= b) < 1:
				e.Die();
				break;
			case d < 101:
				a.src = "images/Plants/Spikerock/3.gif";
				break;
			case d < 201:
				a.src = "images/Plants/Spikerock/2.gif";
		}
	},
});
