/**
 * 季節の反映処理の設定を提供します。
 */
class Config {
    /**
     * インスタンスを初期化します。
     */
    constructor() {
        /**
         * 季節を表現する日付。
         */
        this.today = new Date();

        /**
         * 季節が要素に与える影響度。0 は夏でも冬でも影響がないことを意味します。
         * 1 は季節のみが色を決め、要素本来の色が調整後に影響しないことを意味します。
         */
        this.impact = 0.1;

        /**
         * 要素への最大反射回数。1 を指定した場合は最初の実行のみ色への反映が適用されます。
         */
        this.numberOfLimitReflection = 1;

        /**
         * 季節のテーマ色の定義。それぞれの季節の色を表します。プロパティは日付を表す 
         * mm/dd 形式の文字列で、値はその時点のテーマ色をヘックスコードです。
         */
        this.season = {
            "01/01": "#aae3cd",
            "03/21": "#7cfc00",
            "06/22": "#ff6347",
            "09/23": "#d2691e",
            "12/22": "#b0e0e6",
            "12/31": "#abe3cf"
        }
    }

    /**
     * 現在時刻のテーマ色を取得します。
     * @returns {Array<Number>} rgbを返します。
     */
    getThemeColor() {
        // 基準となる日付を生成
        const seasons = Object.keys(this.season);

        // 色情報を抽出する処理
        const core = require("hcv-core");
        const extractor = core.extractor;
        const getColor = expression => {
            const color = extractor.extract(expression);
            return [ color.r, color.g, color.b ];
        }
        
        // 設定された季節
        const distances = [];
        const thisYear = this.today.getFullYear();
        for(const season of seasons) {
            const themeDate = new Date(`${thisYear}/${season}`);

            // 日数差の計算
            const getSecondDifference = (date1, date2) => {
                const dayMilliseconds = 86400000;
                return Math.abs(Math.ceil((date1 - date2) / dayMilliseconds));
            }

            // 対象時間の設定色があれば、そちらを利用
            const distance = getSecondDifference(themeDate, this.now);
            if (distance === 0) return getColor(this.season[season]);

            // 時間毎の距離を記録
            distances.push({
                time: season,
                distance: distance
            });
        }

        // 秒数差で昇順ソート
        distances.sort((a, b) => {
            return a.distance - b.distance;
        });

        // 最も近い時間帯2つ以外を排除
        while (distances.length > 2) {
            distances.pop();
        };

        // 全体を100として比率を計算
        const amount = [ 0, 1 ].map(x => distances[x].distance).reduce((a, b) => a + b, 0);
        [ 0, 1 ].forEach(x => distances[x].distance = Math.round((distances[x].distance / amount * 100)));

        // 2つの時間帯の中間色を算出
        const [ color1, color2 ] = [ 0, 1 ]
            .map(x => this.season[distances[x].time])
            .map(x => getColor(x));
        const midColor = [ 0, 1, 2 ].map(x => {
            const gap = color1[x] - color2[x];
            return color2[x] + Math.round(gap * distances[0].distance / 100);
        });
        return midColor;
    }
}

export { Config }