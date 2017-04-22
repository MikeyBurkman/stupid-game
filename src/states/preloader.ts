import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';
import IState from '../IState';
import * as Phaser from 'phaser-ce';

export default function init(game: Phaser.Game): IState {

    return {
        preload: preload
    };

    function preload() {
        const preloadBarSprite = game.add.sprite(
            game.world.centerX, 
            game.world.centerY, 
            Assets.Atlases.AtlasesPreloadSpritesArray.getName(), 
            Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar);

        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadBar);
        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadBar);
        preloadBarSprite.anchor.setTo(0, 0.5);
        preloadBarSprite.x -= preloadBarSprite.width * 0.5;

        const preloadFrameSprite = game.add.sprite(
            game.world.centerX, 
            game.world.centerY, 
            Assets.Atlases.AtlasesPreloadSpritesArray.getName(), 
            Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadFrame);
        preloadFrameSprite.anchor.setTo(0.5);

        game.load.setPreloadSprite(preloadBarSprite);

        AssetUtils.Loader.loadAllAssets(game, () => {
            console.log('All assets loaded');
            AssetUtils.Loader.waitForSoundDecoding(() => {
                console.log('Sound decoding finished');
                game.camera.onFadeComplete.addOnce(() => game.state.start('title'));
                game.camera.fade(0x000000, 1000);
            });
        });
    }
/*
    function loadAssets() {
        return new Promise<any>((resolve) => AssetUtils.Loader.loadAllAssets(game, resolve));
    }*/
}