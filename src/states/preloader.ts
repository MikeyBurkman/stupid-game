import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';

export default class Preloader extends Phaser.State {
    public preload(): void {
        const preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar);
        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadBar);
        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadBar);
        preloadBarSprite.anchor.setTo(0, 0.5);
        preloadBarSprite.x -= preloadBarSprite.width * 0.5;

        const preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadFrame);
        preloadFrameSprite.anchor.setTo(0.5);

        this.game.load.setPreloadSprite(preloadBarSprite);

        AssetUtils.Loader.loadAllAssets(this.game, () => {
            AssetUtils.Loader.waitForSoundDecoding(() => {
                this.game.camera.onFadeComplete.addOnce(() => this.game.state.start('title'));
                this.game.camera.fade(0x000000, 1000);
            });
        });
    }
}
