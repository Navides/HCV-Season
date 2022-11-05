import { Season } from "../../../src/season";
import { ExpressionConverter } from "./expression-converter";

// space-delimited-hsl-alpha
// 空白文字区切りのアルファ値を含むHSL表現(例: hsl(0 0% 0%/0%) )に関するテスト

describe("Season.getReflectionColor - space-delimited-hsl-alpha_", () => {
    // space-delimited-hsl-alpha_1
    it("1: 第1引数が空白文字区切りのアルファ値ありHSLの色表現の場合は、調整した色の空白文字区切りのアルファ値ありHSL表現が返却される", () => {
        // テストの準備
        const delimiters = [ " ", "  ", "   " ];
        const hue = 210;
        const saturationValues = [ "100%", "100.0%" ];
        const lightnessValues = [ "50%", "50.0%" ];
        const alphas = [ "0", "0.5", "1", "0%", "50%", "100%", "0.0%", "50.0%", "100.0%", ".5", ".5%" ];
        const combinations = delimiters.flatMap(d => 
                                saturationValues.flatMap(s => 
                                    lightnessValues.flatMap(l =>
                                        alphas.map(a => [d, s, l, a]))));
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `hsl(210 25.0% 26.7%)`,
                "01/03": `hsl(210 100.0% 86.7%)`
            }
        };

        // 区切り文字と各種値の組合せごとにテストを実施
        for (const combination of combinations) {
            // テスト対象の表現を作成
            const delimiter = combination[0];
            const saturation = combination[1];
            const lightness = combination[2];
            const alpha = combination[3];
            const expression = `hsl(${[hue, saturation, lightness].join(delimiter)}/${alpha})`;

            // テスト対象の処理を実行
            const result = Season.getReflectionColor(expression, config);

            // 結果を検証
            expect(result).toBe(`hsl(210 94% 51%/${ExpressionConverter.getPercent(alpha)})`);
        }
    });

    // space-delimited-hsl-alpha_2
    it("2: 第1引数が空白文字区切りのアルファ値ありHSLの色表現を含む場合は、調整した色の空白文字区切りのアルファ値ありHSL表現に置換した内容が返却される", () => {
        // テストの準備
        const delimiters = [ " ", "  ", "   " ];
        const hue = 210;
        const saturationValues1 = [ "100%", "100.0%" ];
        const saturationValues2 = [ "50%", "50.0%" ];
        const lightnessValues1 = [ "50%", "50.0%" ];
        const lightnessValues2 = [ "20%", "20.0%" ];
        const alphas = [ "0", "0.5", "1", "0%", "50%", "100%", "0.0%", "50.0%", "100.0%", ".5", ".5%" ];
        const createCombinations = (arr1, arr2, arr3, arr4) => arr1.flatMap(d =>
                                                                    arr2.flatMap(s =>
                                                                        arr3.flatMap(l =>
                                                                            arr4.map(a => [d, s, l, a]))));
        const combinations1 = createCombinations(delimiters, saturationValues1, lightnessValues1, alphas);
        const combinations2 = createCombinations(delimiters, saturationValues2, lightnessValues2, alphas);
        const combinationSets = combinations1.flatMap(x => combinations2.map(y => [x, y]));
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `hsl(210 14.3% 46.7%)`,
                "01/03": `hsl(210 100.0% 86.7%)`
            }
        };

        // 区切り文字と各種値の組合せごとにテストを実施
        for (const set of combinationSets) {
            // テスト対象の表現を作成
            const delimiter1 = set[0][0];
            const delimiter2 = set[1][0];
            const saturation1 = set[0][1];
            const saturation2 = set[1][1];
            const lightness1 = set[0][2];
            const lightness2 = set[1][2];
            const alpha1 = set[0][3];
            const alpha2 = set[1][3];
            const createExpression = (h, s, l, a, d) => `hsl(${[h, s, l].join(d)}/${a})`;
            const expression1 = createExpression(hue, saturation1, lightness1, alpha1, delimiter1);
            const expression2 = createExpression(hue, saturation2, lightness2, alpha2, delimiter2);
            const expression = `linear-gradient(${expression1}, ${expression2})`;

            // テスト対象の処理を実行
            const result = Season.getReflectionColor(expression, config);

            // 結果を検証
            const hsl1 = `hsl(210 95% 52%/${ExpressionConverter.getPercent(alpha1)})`;
            const hsl2 = `hsl(211 40% 25%/${ExpressionConverter.getPercent(alpha2)})`;
            expect(result).toBe(`linear-gradient(${hsl1}, ${hsl2})`);
        }
    });
});