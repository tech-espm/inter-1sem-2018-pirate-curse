var telas = ["menu", "jogo"];
var larguraJogo = 1280;
var alturaJogo = 720;

// https://github.com/photonstorm/phaser/blob/v2.6.2/src/core/Group.js#L2372
Phaser.Group.prototype.getRandomNotExists = function (startIndex, endIndex) {
	var list = this.getAll('exists', false, startIndex, endIndex);
	return this.game.rnd.pick(list);
};

function menu() {

	var btnPlay;
	var btnLoja;
	var btnPlayOver;
	var btnLojaOver;
	var fundo;
	var btnVoltar;
	var btnVoltarOver;

	var somBotao;
	var somBarcoRangendo;
	var SomBarcoVelejando;
	var tela2;
	var tela3;
	var loja1;
	var loja2;

	this.preload = function () {
		game.stage.backgroundColor = "#000000";
		game.load.crossOrigin = "anonymous";

		game.load.image('tela', 'Sprites/fundo.jpg', 1280, 720);
		game.load.spritesheet('btnPlay', 'Sprites/BotaoPlay.png');
		game.load.spritesheet('btnPlayOver', 'Sprites/BotaoPlayHover.png');
		game.load.spritesheet('btnLoja', 'Sprites/BotaoLoja.png');
		game.load.spritesheet('btnLojaOver', 'Sprites/BotaoLojaHover.png');
		game.load.spritesheet('btnVoltar', 'Sprites/BotaoVoltar.png');
		game.load.spritesheet('btnVoltarOver', 'Sprites/BotaoVoltarOver.png');
		game.load.image('tela2', 'Sprites/escritos.png');
		game.load.image('tela3', 'Sprites/texto.png');
		game.load.image('loja1', 'Sprites/Loja1.png');
		game.load.image('loja2', 'Sprites/Loja2.png');

		game.load.audio('barcoRangendo', 'Sons/ShipCreaking.mp3');
		game.load.audio('somBotao', 'Sons/SomBotao.mp3');
		game.load.audio('SomBarcoMenu', 'Sons/SailSound.mp3');
	};

	this.create = function () {

		fundo = game.add.tileSprite(640, 360, 1920, 1080, 'tela');
		fundo.scale.setTo(0.75, 0.75);
		fundo.anchor.setTo(0.5, 0.5);

		game.physics.enable(fundo, Phaser.Physics.ARCADE);

		tela2 = game.add.tileSprite(640, 330, 1920, 1080, 'tela2');
		tela2.scale.setTo(0.75, 0.75);
		tela2.anchor.setTo(0.5, 0.5);

		tela3 = game.add.tileSprite(640, 320, 1920, 1080, 'tela3');
		tela3.scale.setTo(0.75, 0.75);
		tela3.anchor.setTo(0.5, 0.5);

		loja2 = game.add.tileSprite(-70, -800, 1920, 1080, 'loja2');
		loja2.scale.setTo(0.75, 0.75);
		loja1 = game.add.tileSprite(-70, -800, 1920, 1080, 'loja1');
		loja1.scale.setTo(0.75, 0.75);


		btnPlay = game.add.image(450, 550, 'btnPlay');
		btnPlay.scale.setTo(0.666, 0.666);

		btnLoja = game.add.image(675, 550, 'btnLoja');
		btnLoja.scale.setTo(0.666, 0.666);

		btnPlay.inputEnabled = true;
		btnPlay.events.onInputDown.add(clica, this);

		btnLoja.inputEnabled = true;
		btnLoja.events.onInputDown.add(clicaLoja, this);

		btnPlay.events.onInputOver.add(clicaOverPlay, this);
		btnLoja.events.onInputOver.add(clicaOverLoja, this);

		btnPlay.events.onInputOut.add(clicaOutPlay, this);
		btnLoja.events.onInputOut.add(clicaOutLoja, this);

		btnVoltar = game.add.image(0, -800, 'btnVoltar');
		btnVoltar.scale.setTo(0.666, 0.666);
		btnVoltar.inputEnabled = true;
		btnVoltar.events.onInputDown.add(voltarLoja, this);
		btnVoltar.events.onInputOver.add(voltarOver, this);
		btnVoltar.events.onInputOut.add(voltarOut, this);

		somBarcoRangendo = game.add.audio('barcoRangendo', 0.6);
		somBarcoRangendo.play();

		SomBarcoVelejando = game.add.audio('SomBarcoMenu', 0.2);
		SomBarcoVelejando.play();

		somBotao = game.add.audio('somBotao');


	};

	function clica() {
		game.state.start("jogo");
		somBotao.play();
		somBarcoRangendo.stop();
	}

	function clicaLoja() {

		tela2.alpha = 0;
		tela3.alpha = 0;
		btnPlay.kill();
		btnLoja.kill();
		btnVoltar.revive();

		game.add.tween(loja1).to({
			y: -45
		}, 750).start();
		game.add.tween(loja2).to({
			y: -250
		}, 750).start();
		game.add.tween(btnVoltar).to({
			y: 0
		}, 750).start();
	}

	function voltarLoja() {

		tela2.alpha = 1;
		tela3.alpha = 1;
		btnPlay.revive();
		btnLoja.revive();
		btnVoltar.kill();

		loja1.position.y = -800;
		loja2.position.y = -800;
		btnVoltar.position.y = -800;
		loja2.alpha = 0;
	}

	function voltarOver() {
		btnVoltarOver = game.add.image(0, 0, 'btnVoltarOver');
		btnVoltarOver.scale.setTo(0.666, 0.666);

	}

	function voltarOut() {
		btnVoltarOver.scale.setTo(0.666, 0.666);
		btnVoltarOver.kill();
	}

	function clicaOverPlay() {
		btnPlayOver = game.add.image(450, 550, 'btnPlayOver');
		btnPlayOver.scale.setTo(0.666, 0.666);
	}

	function clicaOutPlay() {
		btnLoja.scale.setTo(0.666, 0.666);
		btnPlayOver.kill();
	}

	function clicaOverLoja() {
		btnLojaOver = game.add.image(675, 550, 'btnLojaOver');
		btnLojaOver.scale.setTo(0.666, 0.666);
	}

	function clicaOutLoja() {
		btnLoja.scale.setTo(0.666, 0.666);
		btnLojaOver.kill();
	}

	var angle = 0.025;

	this.update = function () {

		fundo.angle = 4 * Math.sin(game.time.now * 0.0005);

		if (loja1.position.y == -45) {

			game.add.tween(loja2).to({
				y: -45
			}, 400).start();
			loja2.alpha = 1;

		}
		if (loja1.position.y == -800) {

			loja2.position.y = -800;
		}
	};

}
