export var oSunFlower = InheritO(CPlants, {
	EName: "oSunFlower",
	CName: "SunFlower",
	width: 73,
	height: 74,
	beAttackedPointR: 53,
	SunNum: 50,
	PicArr: [
		"images/Card/Plants/SunFlower.webp",
		"images/Plants/SunFlower/0.gif",
		"images/Plants/SunFlower/SunFlower1.gif",
		"images/Plants/SunFlower/SunFlower.gif",
	],
	Tooltip: "Gives you additional sun",
	Produce:
		'<font color="#28325A">Sunflowers are essential for you to produce extra sun. Try planting as many as you can!</font><p>Sun production: <font color="#CC241D">normal</font></p>Sunflower can\'t resist bouncing to the beat. Which beat is that? Why, the life-giving jazzy rhythm of the Earth itself, thumping at a frequency only Sunflower can hear.',

	/* Unused BirthStyle function
	BirthStyle: function (c, e, b, a) {
		var d = b.childNodes[1];
		d.src = "images/Plants/SunFlower/SunFlower.gif";
		d.style.clip = "rect(0,auto,74px,0)";
		d.style.height = "148px";
		EditEle(
			b,
			{
				id: e,
			},
			a,
			EDPZ
		);
	},
	*/

	ChangePosition(c, a) {
		var b = c.childNodes[1];
		if (a) {
			// Highlight the sunflower when producing sun
			SetStyle(b, {
				transition: "filter 0.4s ease",
				filter: "saturate(1.2) brightness(1.1) contrast(1.1)",
			});
		} else {
			// Reset the sunflower's appearance
			SetStyle(b, {
				transition: "filter 0.2s ease",
				filter: "saturate(1) brightness(1) contrast(1)",
			});
		}
	},

	PrivateBirth(a) {
		if (oS.ProduceSun) {
			// Normal sun production mode
			oSym.addTask(
				500,
				function produceSun(plantId, x, y) {
					// Check if the plant still exists
					if (!$P[plantId]) {
						return;
					}

					// Highlight the sunflower
					a.ChangePosition($(plantId), 1);

					oSym.addTask(
						100,
						(id, posX, posY, callback) => {
							if (!$P[id]) {
								return;
							}

							// Produce sun at a slightly randomized position
							const randomX = Math.floor(posX + Math.random() * 41);
							AppearSun(randomX, posY, 25, 0);

							// Reset sunflower appearance
							oSym.addTask(
								50,
								(plantId) => {
									if ($P[plantId]) {
										a.ChangePosition($(plantId), 0);
									}
								},
								[id]
							);

							// Schedule next sun production
							oSym.addTask(2400, callback, [id, posX, posY]);
						},
						[plantId, x, y, produceSun]
					);
				},
				[a.id, GetX(a.C) - 40, GetY(a.R)]
			);
		} else {
			// Alternative mode: produce sun when damaged
			a.getHurt = function (zombie, damageType, damage) {
				switch (damageType) {
					case 0: // Normal damage
						this.HP -= damage;

						// Produce sun every 100 HP lost
						if (!(this.HP % 100)) {
							const plantX = GetX(this.C);
							const plantY = GetY(this.R);
							const randomX = Math.floor(plantX - 40 + Math.random() * 41);

							// Produce suns
							AppearSun(randomX, plantY, 25, 0);

							oSym.addTask(
								50,
								(col, row) => {
									const x = Math.floor(GetX(col) - 40 + Math.random() * 41);
									AppearSun(x, GetY(row), 25, 0);
								},
								[this.C, this.R]
							);

							if (this.HP < 1) {
								this.Die();
							} else {
								oSym.addTask(
									50,
									(col, row) => {
										const x = Math.floor(GetX(col) - 40 + Math.random() * 41);
										AppearSun(x, GetY(row), 25, 0);
									},
									[this.C, this.R]
								);
							}
						}
						break;

					case 3: // Special damage type
						this.HP -= damage;
						if (this.HP < 1) {
							this.Die();
						}
						break;

					default: // Other damage types
						this.Die(1);
				}
			};
		}
	},

	InitTrigger() {}, // Empty function - sunflowers don't need triggers
});
