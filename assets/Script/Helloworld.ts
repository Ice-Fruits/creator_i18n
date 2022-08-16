import { i18nMgr } from "./i18n/i18nMgr";
import { i18nLabel } from "./i18n/i18nLabel";

const { ccclass, property } = cc._decorator;

enum E_language {
    "zh" = 1,
    "en" = 2,
}

@ccclass
export class Helloworld extends cc.Component {
    @property({ visible: false })
    private nowLanguage: E_language = E_language.zh;

    @property({ type: cc.Enum(E_language), displayName: "语言" })
    get language() {
        return this.nowLanguage;
    }
    set language(value: E_language) {
        this.nowLanguage = value;
        i18nMgr.setLanguage(E_language[value]);
    }
    onLoad() {
        i18nMgr.setLanguage(E_language[this.nowLanguage]);
    }

    start() {
        i18nMgr.addComponent("Canvas/New Label","no need");
    }

    setEn() {
        i18nMgr.setLanguage("en");
    }

    setZh() {
        i18nMgr.setLanguage("zh");
    }
}
