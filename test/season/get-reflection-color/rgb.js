import { Season } from "../../../src/season";

// rgb
// RGB表現(例: rgb(0, 0, 0) )に関するテスト

describe("Season.getReflectionColor - rgb_", () => {
    // rgb_1:
    it("1: 第1引数がRGBの色表現の場合は、調整した色のRGB表現が返却される", () => {
        // テストの準備
        const rgb = [ 0*17, 1*17, 2*17 ];
        const delimiters = [ ",", ", ", " ,", " , " ];
        const expressions = delimiters.map(x => `rgb(${rgb.join(x)})`);
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `rgb(${[  3*17,  4*17,  5*17 ].join(",")})`,
                "01/03": `rgb(${[ 11*17, 13*17, 15*17 ].join(",")})`
            }
        };

        // テスト対象の処理を実行
        const results = expressions.map(x => Season.getReflectionColor(x, config));

        // 結果を検証
        results.forEach(x => expect(x).toBe("rgb(12,30,48)"));
    });

    // rgb_2:
    it("2: 第1引数がRGBの色表現を含む場合は、調整した色のRGB表現に置換した内容が返却される", () => {
        // テストの準備
        const rgb1 = [ 0*17, 1*17, 2*17 ];
        const rgb2 = [ 3*17, 4*17, 5*17 ];
        const delimiters = [",", ", ", " ,", " , "];
        const expressions = delimiters.map(x => `linear-gradient(rgb(${rgb1.join(x)}), rgb(${rgb2.join(x)}))`);
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `rgb(${[  6*17,  7*17,  8*17 ].join(",")})`,
                "01/03": `rgb(${[ 11*17, 13*17, 15*17 ].join(",")})`
            }
        };

        // テスト対象の処理を実行
        const results = expressions.map(x => Season.getReflectionColor(x, config));

        // 結果を検証
        results.forEach(x => expect(x).toBe("linear-gradient(rgb(15,32,50), rgb(60,78,96))"));
    });
});