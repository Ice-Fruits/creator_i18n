import {i18nLabel} from "./i18nLabel";
import {i18nSprite} from "./i18nSprite";
import {i18nRichText} from "./i18nRichText";
import {i18nSpine} from "./i18nSpine";


export class i18nMgr {
    private static language = "";     // 当前语言
    private static labelArr: i18nLabel[] = [];        // i18nLabel 列表
    private static labelData: { [key: string]: string } = {};   // 文字配置
    private static spriteArr: i18nSprite[] = [];       // i18nSprite 列表
    private static richtextArr: i18nRichText[] = [];        // i18nRichText 列表
    private static richtextData: { [key: string]: string } = {};   // richtext文字配置
    private static spineArr: i18nSpine[] = [];       // i18nSpine 列表



    private static checkInit() {
        if (!this.language) {
            this.setLanguage("zh");
        }
    }

    /**
     * 设置语言
     */
    public static setLanguage(language: string) {
        if (this.language === language) {
            return;
        }
        this.language = language;
        this.reloadLabel();
        this.reloadSprite();
        this.reloadRichText();
        this.reloadSpine();
    }

    /**
     * 添加或移除 i18nLabel
     */
    public static _addOrDelLabel(label: i18nLabel, isAdd: boolean) {
        if (isAdd) {
            this.labelArr.push(label);
        } else {
            let index = this.labelArr.indexOf(label);
            if (index !== -1) {
                this.labelArr.splice(index, 1);
            }
        }
    }

    public static _getLabel(opt: string, params: string[]): string {
        this.checkInit();
        if (params.length === 0) {
            return this.labelData[opt] || opt;
        }
        let str = this.labelData[opt] || opt;
        for (let i = 0; i < params.length; i++) {
            let reg = new RegExp("#" + i, "g")
            str = str.replace(reg, params[i]);
        }
        return str;
    }


    /**
     * 添加或移除 i18nSprite
     */
    public static _addOrDelSprite(sprite: i18nSprite, isAdd: boolean) {
        if (isAdd) {
            this.spriteArr.push(sprite);
        } else {
            let index = this.spriteArr.indexOf(sprite);
            if (index !== -1) {
                this.spriteArr.splice(index, 1);
            }
        }
    }

    public static _getSprite(path: string, cb: (spriteFrame: cc.SpriteFrame) => void) {
        this.checkInit();
        cc.resources.load("i18n/sprite/" + this.language + "/" + path, cc.SpriteFrame, (err, spriteFrame: cc.SpriteFrame) => {
            if (err) {
                return cb(null);
            }
            cb(spriteFrame);
        });
    }

    /**
     * 添加或移除 i18nRichText
     */
    public static _addOrDelRichText(label: i18nRichText, isAdd: boolean) {
        if (isAdd) {
            this.richtextArr.push(label);
        } else {
            let index = this.richtextArr.indexOf(label);
            if (index !== -1) {
                this.richtextArr.splice(index, 1);
            }
        }
    }

    public static _getRichText(opt: string, params: string[]): string {
        this.checkInit();
        if (params.length === 0) {
            return this.richtextData[opt] || opt;
        }
        let str = this.richtextData[opt] || opt;
        for (let i = 0; i < params.length; i++) {
            let reg = new RegExp("#" + i, "g")
            str = str.replace(reg, params[i]);
        }
        return str;
    }

    /**
     * 添加或移除 i18nSpine
     */
     public static _addOrDelSpine(spine: i18nSpine, isAdd: boolean) {
        if (isAdd) {
            this.spineArr.push(spine);
        } else {
            let index = this.spineArr.indexOf(spine);
            if (index !== -1) {
                this.spineArr.splice(index, 1);
            }
        }
    }

    public static _getSpine(path: string, cb: (skeletonData: sp.SkeletonData) => void) {
        this.checkInit();
        cc.resources.load("i18n/spine/" + this.language + "/" + path, sp.SkeletonData, (err, skeletonData: sp.SkeletonData) => {
            if (err) {
                return cb(null);
            }
            cb(skeletonData);
        });
    }

    private static reloadLabel() {
        let url = "i18n/label/" + this.language;
        cc.resources.load(url, (err, data: cc.JsonAsset) => {
            if (err) {
                console.error(err);
                this.labelData = {};
            } else {
                this.labelData = data.json;
            }
            for (let one of this.labelArr) {
                one._resetValue();
            }
        });
    }

    private static reloadRichText() {
        let url = "i18n/richtext/" + this.language;
        cc.resources.load(url, (err, data: cc.JsonAsset) => {
            if (err) {
                console.error(err);
                this.richtextData = {};
            } else {
                this.richtextData = data.json;
            }
            for (let one of this.richtextArr) {
                one._resetValue();
            }
        });
    }

    private static reloadSprite() {
        for (let one of this.spriteArr) {
            one._resetValue();
        }
    }

    private static reloadSpine() {
        for (let one of this.spineArr) {
            one._resetValue();
        }
    }

    /**
     * 根据表格配置批量导入
     */
     public static addComponent(path: string|cc.Node, str: string) {
        let node = null;
        if(typeof(path) === 'string'){
            node = cc.find(path);
        }
        else if(typeof(path) === 'object'){
            node = path;
        }
        if(node.getComponent(cc.Label)){
            let comp = node.addComponent(i18nLabel);
            comp.string = str;
        }
        else if(node.getComponent(cc.Sprite)){
            let comp = node.addComponent(i18nSprite);
            comp.string = str;
        }
        else if(node.getComponent(cc.RichText)){
            let comp = node.addComponent(i18nRichText);
            comp.string = str;
        }
        else if(node.getComponent(sp.Skeleton)){
            let comp = node.addComponent(i18nSpine);
            comp.string = str;
        }
    }
}
