import { oFumeShroom } from "./oFumeShroom.js";

export var oIceFumeShroom = InheritO(oFumeShroom, {
	EName: "oIceFumeShroom",
	CName: "Icy Fume-shroom",
	SunNum: 200,
	PicArr: [
		"images/Card/Plants/IcyFumeShroom.webp",
		"images/Plants/IcyFumeShroom/0.gif",
		"images/Plants/IcyFumeShroom/FumeShroom.gif",
		"images/Plants/IcyFumeShroom/FumeShroomSleep.gif",
		"images/Plants/IcyFumeShroom/FumeShroomAttack.gif",
		"images/Plants/IcyFumeShroom/FumeShroomBullet.gif",
	],
	Tooltip: 'Shoots icy fumes that can pass through screen doors  <p> <font color="red">(requires fume-shroom)</font>',
	Produce:
		'大喷菇喷出的臭气可以穿透铁丝网门。<p>Harm:<font color="#CC241D">普通，可穿透铁丝网门</font><br>Scope:<font color="#CC241D">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
	PrivateBirth(b) {
		var a = b.id;
		NewEle(
			a + "_Bullet",
			"div",
			"position:absolute;visibility:hidden;width:343px;height:62px;left:" +
				b.AttackedRX +
				"px;top:" +
				(b.pixelTop + 5) +
				"px;background:url(images/Plants/IcyFumeShroom/FumeShroomBullet.gif);z-index:" +
				(b.zIndex + 1),
			0,
			EDPZ
		);
	},
	NormalAttack() {
		PlaySound2("fume");
		var f = this;
		var d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R);
		var e = d.length;
		var g;
		var c = f.id;
		var b = $(c);
		var a = c + "_Bullet";
		while (e--) {
			(g = d[e]).Altitude < 2 && g.getSnowPea(g, 20);
		}
		b.childNodes[1].src = "images/Plants/IcyFumeShroom/FumeShroomAttack.gif";
		SetVisible($(a));
		ImgSpriter(
			a,
			c,
			[
				["0 0", 9, 1],
				["0 -62px", 9, 2],
				["0 -124px", 9, 3],
				["0 -186px", 9, 4],
				["0 -248px", 9, 5],
				["0 -310px", 9, 6],
				["0 -372px", 9, 7],
				["0 -434px", 9, -1],
			],
			0,
			(i, j) => {
				var h = $(j);
				$P[j] && ((h.childNodes[1].src = "images/Plants/IcyFumeShroom/FumeShroom.gif"), SetHidden($(i)));
			}
		);
	},
});
