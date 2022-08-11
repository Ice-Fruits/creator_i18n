import { i18nMgr } from "./i18nMgr";
const { ccclass, property, executeInEditMode, disallowMultiple, requireComponent, menu } = cc._decorator;

@ccclass
@executeInEditMode
@requireComponent(sp.Skeleton)
@disallowMultiple
@menu("多语言/i18nSpine")
export class i18nSpine extends cc.Component {

    @property({ visible: false })
    private i18n_string: string = "";

    start() {
        i18nMgr._addOrDelSpine(this, true);
        this._resetValue();
    }

    @property({ type: cc.String })
    get string() {
        return this.i18n_string;
    }

    set string(value: string) {
        this.i18n_string = value;

        let spine = this.getComponent(sp.Skeleton);
        if (cc.isValid(spine)) {
            i18nMgr._getSpine(value, (skeletonData) => {
                if (cc.isValid(spine)) {
                    spine.skeletonData = skeletonData;
                }
            });
        }
    }

    _resetValue() {
        this.string = this.i18n_string;
    }

    onDestroy() {
        i18nMgr._addOrDelSpine(this, false);
    }
}
