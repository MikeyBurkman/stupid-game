import * as Assets from '../assets';

export class Loader {
    private static game: Phaser.Game;
    private static soundKeys: string[] = [];
    private static soundExtensionsPreference: string[] = SOUND_EXTENSIONS_PREFERENCE;

    private static loadImages() {
        for (let imageName in Assets.Images) {
            const image = Assets.Images[imageName];
            if (!this.game.cache.checkImageKey(image.getName())) {
                this.game.load.image(image.getName(), image.getPNG());
            }
        }
    }

    private static loadSpritesheets() {
        for (let spritesheet in Assets.Spritesheets) {
            const sheet = Assets.Spritesheets[spritesheet];
            if (!this.game.cache.checkImageKey(sheet.getName())) {
                this.game.load.spritesheet(
                    sheet.getName(), 
                    sheet.getPNG(), 
                    sheet.getFrameWidth(), 
                    sheet.getFrameHeight(), 
                    sheet.getFrameMax(), 
                    sheet.getMargin(), 
                    sheet.getSpacing());
            }
        }
    }

    private static loadAtlases() {
        for (let atlasName in Assets.Atlases) {
            const atlas = Assets.Atlases[atlasName];

            if (!this.game.cache.checkImageKey(atlas.getName())) {

                const dataOption = atlas.getXML || atlas.getJSONArray || atlas.getJSONHash;

                if (atlas.getXML) {
                    this.game.load.atlasXML(
                        atlas.getName(), 
                        atlas.getPNG(), 
                        atlas.getXML());

                } else if (atlas.getJSONArray) {
                    this.game.load.atlasJSONArray(
                        atlas.getName(), 
                        atlas.getPNG(), 
                        atlas.getJSONArray());

                } else if (atlas.getJSONHash) {
                    this.game.load.atlasJSONHash(
                        atlas.getName(), 
                        atlas.getPNG(), 
                        atlas.getJSONHash());
                }
            }
        }
    }

    private static orderAudioSourceArrayBasedOnSoundExtensionPreference(soundSourceArray: string[]): string[] {
        let orderedSoundSourceArray: string[] = [];

        for (let e in this.soundExtensionsPreference) {
            let sourcesWithExtension: string[] = soundSourceArray.filter((el) => {
                return (el.substring(el.lastIndexOf('.') + 1, el.length) === this.soundExtensionsPreference[e]);
            });

            orderedSoundSourceArray = orderedSoundSourceArray.concat(sourcesWithExtension);
        }

        return orderedSoundSourceArray;
    }

    private static loadAudio() {

        const options = [
            'getAC3',
            'getM4A',
            'getMP3',
            'getOGG'
        ];

        for (let audioName in Assets.Audio) {
            const audio = Assets.Audio[audioName];
            const soundName = audio.getName();
            this.soundKeys.push(soundName);

            if (!this.game.cache.checkSoundKey(soundName)) {
                const audioTypeArray: string[] = [];

                options.forEach((option) => {
                    if (audio[option]) {
                        audioTypeArray.push(audio[option]());
                    }
                });

                const sortedArray = this.orderAudioSourceArrayBasedOnSoundExtensionPreference(audioTypeArray);

                this.game.load.audio(soundName, sortedArray, true);
            }
        }
    }

    private static loadAudiosprites() {
        const options = [
            'getAC3',
            'getM4A',
            'getMP3',
            'getOGG'
        ];

        for (let audioName in Assets.Audiosprites) {
            const audio = Assets.Audiosprites[audioName];
            let soundName = audio.getName();
            this.soundKeys.push(soundName);

            if (!this.game.cache.checkSoundKey(soundName)) {
                const audioTypeArray: string[] = [];

                options.forEach((option) => {
                    if (audio[option]) {
                        audioTypeArray.push(audio[option]());
                    }
                });

                const sortedArray = this.orderAudioSourceArrayBasedOnSoundExtensionPreference(audioTypeArray);

                this.game.load.audiosprite(soundName, sortedArray, audio.getJSON(), null, true);
            }
        }
    }

    private static loadBitmapFonts() {
        for (let fontName in Assets.BitmapFonts) {
            const font = Assets.BitmapFonts[fontName];
            if (!this.game.cache.checkBitmapFontKey(font.getName())) {
                
                const dataOption = font.getXML || font.getFNT;

                this.game.load.bitmapFont(
                    font.getName(), 
                    font.getPNG(), 
                    dataOption());
            }
        }
    }

    private static loadJSON() {
        for (let json in Assets.JSON) {
            if (!this.game.cache.checkJSONKey(Assets.JSON[json].getName())) {
                this.game.load.json(Assets.JSON[json].getName(), Assets.JSON[json].getJSON(), true);
            }
        }
    }

    private static loadXML() {
        for (let xml in Assets.XML) {
            if (!this.game.cache.checkXMLKey(Assets.XML[xml].getName())) {
                this.game.load.xml(Assets.XML[xml].getName(), Assets.XML[xml].getXML(), true);
            }
        }
    }

    private static loadText() {
        for (let text in Assets.Text) {
            if (!this.game.cache.checkTextKey(Assets.Text[text].getName())) {
                this.game.load.xml(Assets.Text[text].getName(), Assets.Text[text].getText(), true);
            }
        }
    }

    private static loadScripts() {
        for (let script in Assets.Scripts) {
            this.game.load.script(Assets.Scripts[script].getName(), Assets.Scripts[script].getJS());
        }
    }

    private static loadShaders() {
        for (let shader in Assets.Shaders) {
            if (!this.game.cache.checkShaderKey(Assets.Shaders[shader].getName())) {
                this.game.load.shader(Assets.Shaders[shader].getName(), Assets.Shaders[shader].getFRAG(), true);
            }
        }
    }

    public static loadAllAssets(game: Phaser.Game, onComplete?: Function, onCompleteContext?: any) {
        this.game = game;

        if (onComplete) {
            this.game.load.onLoadComplete.addOnce(onComplete, onCompleteContext);
        }

        this.loadImages();
        this.loadSpritesheets();
        this.loadAtlases();
        this.loadAudio();
        this.loadAudiosprites();
        this.loadBitmapFonts();
        this.loadJSON();
        this.loadXML();
        this.loadText();
        this.loadScripts();
        this.loadShaders();
    }

    public static waitForSoundDecoding(onComplete: Function, onCompleteContext?: any) {
        if (this.soundKeys.length > 0) {
            this.game.sound.setDecodedCallback(this.soundKeys, onComplete, onCompleteContext);
        } else {
            onComplete.call(onCompleteContext);
        }
    }
}
