import * as Utils from '../utils/utils';
import * as Assets from '../assets';
import * as Phaser from 'phaser-ce';
import IState from '../IState';

export default function init(game: Phaser.Game): IState {

    return {
        preload: preload,
        create: create
    };

    function preload() {
        // Load any assets you need for your preloader state here.
        game.load.atlasJSONArray(
            Assets.Atlases.AtlasesPreloadSpritesArray.getName(), 
            Assets.Atlases.AtlasesPreloadSpritesArray.getPNG(), 
            Assets.Atlases.AtlasesPreloadSpritesArray.getJSONArray());
        // this.game.load.atlasJSONHash(Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.getPNG(), Assets.Atlases.AtlasesPreloadSpritesHash.getJSONHash());
        // this.game.load.atlasXML(Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.getPNG(), Assets.Atlases.AtlasesPreloadSpritesXml.getXML());
    }

    function create() {
        // Do anything here that you need to be setup immediately, before the game actually starts doing anything.

        // Uncomment the following to disable multitouch
        // this.input.maxPointers = 1;

        game.scale.scaleMode = Phaser.ScaleManager[SCALE_MODE];

        if (SCALE_MODE === 'USER_SCALE') {
            let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.screenMetrics;

            game.scale.setUserScale(screenMetrics.scaleX, screenMetrics.scaleY);
        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        if (game.device.desktop) {
            // Any desktop specific stuff here
        } else {
            // Any mobile specific stuff here

            // Comment the following and uncomment the line after that to force portrait mode instead of landscape
            game.scale.forceOrientation(true, false);
            // this.game.scale.forceOrientation(false, true);
        }

        // Use DEBUG to wrap code that should only be included in a DEBUG build of the game
        // Use GIT_REVISION as an identifier when testing builds
        // DEFAULT_GAME_WIDTH is the safe area width of the game
        // DEFAULT_GAME_HEIGHT is the safe area height of the game
        // MAX_GAME_WIDTH is the max width of the game
        // MAX_GAME_HEIGHT is the max height of the game
        // game.width is the actual width of the game
        // game.height is the actual height of the game
        // GOOGLE_WEB_FONTS are the fonts to be loaded from Google Web Fonts
        // SOUND_EXTENSIONS_PREFERENCE is the most preferred to least preferred order to look for audio sources
        console.log(
            `DEBUG....................... ${DEBUG} 
           \nGIT_REVISION................ ${GIT_REVISION}
           \nSCALE_MODE.................. ${SCALE_MODE}
           \nDEFAULT_GAME_WIDTH.......... ${DEFAULT_GAME_WIDTH}
           \nDEFAULT_GAME_HEIGHT......... ${DEFAULT_GAME_HEIGHT}
           \nMAX_GAME_WIDTH.............. ${MAX_GAME_WIDTH}
           \nMAX_GAME_HEIGHT............. ${MAX_GAME_HEIGHT} 
           \ngame.width.................. ${game.width} 
           \ngame.height................. ${game.height}
           \nGOOGLE_WEB_FONTS............ ${GOOGLE_WEB_FONTS}
           \nSOUND_EXTENSIONS_PREFERENCE. ${SOUND_EXTENSIONS_PREFERENCE}`
        );

        game.state.start('preloader');
    }
}

