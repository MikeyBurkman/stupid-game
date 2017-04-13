import * as Assets from '../assets';
import IState from '../IState';
import * as Phaser from 'phaser-ce';

export default function create(game: Phaser.Game): IState {

    return {
        create: create
    };
    
    function create(): void {
        const backgroundTemplateSprite = game.add.sprite(game.world.centerX, game.world.centerY,                         Assets.Images.ImagesBackgroundTemplate.getName());

        backgroundTemplateSprite.anchor.setTo(0.5);

        const googleFontText = game.add.text(game.world.centerX, game.world.centerY - 100, 'Google Web Fonts', {
            font: '50px ' + Assets.GoogleWebFonts.Barrio
        });
        googleFontText.anchor.setTo(0.5);

        const localFontText = game.add.text(game.world.centerX, game.world.centerY, 'Local Fonts + Shaders .frag (Pixelate here)!', {
            font: '30px ' + Assets.CustomWebFonts.Fonts2DumbWebfont.getFamily()
        });
        localFontText.anchor.setTo(0.5);

        const pixelateShader = new Phaser.Filter(game, null, game.cache.getShader(Assets.Shaders.ShadersPixelate.getName()));
        localFontText.filters = [pixelateShader];

        const bitmapFontText = game.add.bitmapText(game.world.centerX, game.world.centerY + 100, Assets.BitmapFonts.FontsFontFnt.getName(), 'BLARGH GRR ARGHH Bitmap Fonts + Filters .js (Blur here)!', 40);
        bitmapFontText.anchor.setTo(0.5);

        const blurXFilter = game.add.filter(Assets.Scripts.ScriptsBlurX.getName()) as Phaser.Filter.BlurX;
        blurXFilter.blur = 8;
        const blurYFilter = game.add.filter(Assets.Scripts.ScriptsBlurY.getName()) as Phaser.Filter.BlurY;
        blurYFilter.blur = 2;

        bitmapFontText.filters = [blurXFilter, blurYFilter];

        const mummySpritesheet = game.add.sprite(game.world.centerX, game.world.centerY + 175, Assets.Spritesheets.SpritesheetsMetalslugMummy.getName());
        mummySpritesheet.animations.add('walk');
        mummySpritesheet.animations.play('walk', 30, true);

        const sfxAudiosprite = game.add.audioSprite(Assets.Audiosprites.AudiospritesSfx.getName());

        let availableSFX = Assets.Audiosprites.AudiospritesSfx.Sprites;
        const sfxLaserSounds = [
            availableSFX.Laser1,
            availableSFX.Laser2,
            availableSFX.Laser3,
            availableSFX.Laser4,
            availableSFX.Laser5,
            availableSFX.Laser6,
            availableSFX.Laser7,
            availableSFX.Laser8,
            availableSFX.Laser9
        ];

        game.sound.play(Assets.Audio.AudioMusic.getName(), 0.2, true);

        backgroundTemplateSprite.inputEnabled = true;
        backgroundTemplateSprite.events.onInputDown.add(() => {
            sfxAudiosprite.play(Phaser.ArrayUtils.getRandomItem(sfxLaserSounds).toString());
        });

        game.camera.flash(0x000000, 1000);
    }
}