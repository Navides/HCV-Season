import { Config } from "./config";
const core = require("hcv-core");

/**
 * 季節をページに反映する処理を提供します。
 */
class Season {
    /**
     * インスタンスを初期化します。
     */
    constructor() {
        this._creator = core.creator;
        this._detector = core.detector;
        this._extractor = core.extractor;
    }

    /**
     * 季節を反映した色を取得します。
     * @param {String} expression 色表現。
     * @param {Config} config 設定情報。
     * @returns {String} 季節を反映した色を返します。色表現は expression と同種類になります。例えば、expression がヘックス表現の場合は、
     *                   返却される色表現もヘックス表現です。expression が色を含む表現の場合は、その色表現のみを置換した内容を返します。
     */
    getReflectionColor (expression, config) {
        // デフォルト設定を補完
        config = this._createConfig(config);

        // 色表現を抽出
        const detected = this._detector.detect(expression);

        // 単一の色表現の調整
        const getSingle = e => {
            // 色表現を抽出
            const source = this._extractor.extract(e.expression);
            if (!source) return null;

            // 季節を反映
            const themeColor = config.getThemeColor();
            const reflect = (value1, value2) => {
                const gap = value2 - value1;
                let value = value1 + Math.round(gap * config.impact);
                value = value < 0 ? 0 : value > 255 ? 255 : value;
                return value;
            }

            // 反映結果を作成
            const reflected = new core.color(
                reflect(source.r, themeColor[0]),
                reflect(source.g, themeColor[1]),
                reflect(source.b, themeColor[2]),
                source.a
            );

            // 変換結果を返す
            return this._creator.create(reflected, e.type);
        };

        // 調整した色を取得
        const replacement = {};
        for (const result of detected) {
            const modified = getSingle(result);
            if (modified == null) continue;
            replacement[result.expression] = modified;
        }

        // 色情報を置換
        let newExpression = expression;
        for (const key of Object.keys(replacement)) {
            const value = replacement[key];
            newExpression = newExpression.replaceAll(key, value);
        }
        return newExpression;
    }

    /**
     * 完全な設定を作成します。
     * @param {Config} source 元となる設定。 
     * @returns {Config} 設定を返します。未設定の項目は補完されます。
     */
    _createConfig(source) {
        if (!source) source = {};

        const config = new Config();
        config.now = source.now || config.now;
        config.impact = source.impact || config.impact;
        config.numberOfLimitReflection = source.numberOfLimitReflection || config.numberOfLimitReflection;
        config.brightness = source.brightness || config.brightness;

        return config;
    }
    
    /**
     * 要素に色を反映します。
     * @param {HTMLElement} element 要素。
     * @param {Array<String>} properties 色を反映するプロパティ。
     * @param {Config} config 設定情報。
     */
    reflectToElement(element, properties=[], config) {
        // デフォルト設定を補完
        config = this._createConfig(config);

        // 最大適用回数を超えていれば処理終了
        const reflectionCountKey = "numberOfLimitReflection";
        const reflectionCount = element.dataset[reflectionCountKey] ? Number(element.dataset[reflectionCountKey]) : 0;
        if (reflectionCount >= config.numberOfLimitReflection) {
            return;
        }

        // 各種プロパティ毎に反映
        for (const property of properties) {
            // プロパティの設定がなければ処理を終了
            let style = window.getComputedStyle(element, "");
            if (!style[property]) {
                return;
            }

            // 色表現を抽出
            let target = style[property];
            const detected = this._detector.detect(target);

            // 調整した色を取得
            const replacement = {};
            for (const result of detected) {
                const modified = this.getReflectionColor(result.expression, config);
                if (modified == null) continue;
                replacement[result.expression] = modified;
            }

            // 色情報を置換
            for (const key of Object.keys(replacement)) {
                const value = replacement[key];
                target = target.replaceAll(key, value);
            }
            element.style[property] = target;
        }

        // 反映結果を記録
        element.dataset[reflectionCountKey] = reflectionCount + 1;
    }

    /**
     * 全ての要素に色を反映します。
     * @param {Array<String>} properties 色を反映するプロパティ。
     * @param {Config} config 設定情報。
     * @param {Array<HTMLElement>} ignore 無視対象。
     */
    reflectToPage(properties=[], config, ignore=[]) {
        // デフォルト設定を補完
        config = this._createConfig(config);

        // 画面の要素を変更
        const all = document.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
            // 無視対象であればスキップ
            if (ignore.some(x => x.isEqualNode(all[i]))) {
                continue;
            }

            // 変更を適用
            this.reflectToElement(all[i], properties, config);
        }
    }
}

// シングルトンとして提供
const instance = new Season();
export { instance as Season };

