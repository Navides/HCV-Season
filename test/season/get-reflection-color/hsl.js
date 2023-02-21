import { Season } from "../../../src/season";

// hsl
// HSL表現(例: hsl(0, 0%, 0%) )に関するテスト

describe("Season.getReflectionColor - hsl_", () => {
    // hsl_1
    it("1: 第1引数がHSLの色表現の場合は、調整した色のHSL表現が返却される", () => {
        // テストの準備
        const delimiters = [ ",", ", ", " ,", " , " ];
        const hue = 210;
        const saturationValues = [ "100%", "100.0%" ];
        const lightnessValues = [ "50%", "50.0%" ];
        const combinations = delimiters.flatMap(x => saturationValues.flatMap(y => lightnessValues.map(z => [x, y, z])));
        const expressions = combinations.map(x => `hsl(${[hue, x[1], x[2]].join(x[0])})`);
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `hsl(210, 25.0%, 26.7%)`,
                "01/03": `hsl(210, 100.0%, 86.7%)`
            }
        };

        // テスト対象の処理を実行
        const results = expressions.map(x => Season.getReflectionColor(x, config));

        // 結果を検証
        results.forEach(x => expect(x).toBe("hsl(210,93%,51%)"));
    });

    // hsl_2
    it("2: 第1引数がHSLの色表現を含む場合は、調整した色のHSL表現に置換した内容が返却される", () => {
        // テストの準備
        const delimiters = [ ",", ", ", " ,", " , " ];
        const hue = 210;
        const saturationValues1 = [ "100%", "100.0%" ];
        const saturationValues2 = [ "50%", "50.0%" ];
        const lightnessValues1 = [ "50%", "50.0%" ];
        const lightnessValues2 = [ "20%", "20.0%" ];
        const createCombinations = (arr1, arr2, arr3) => arr1.flatMap(x => arr2.flatMap(y => arr3.map(z => [x, y, z])));
        const combinations1 = createCombinations(delimiters, saturationValues1, lightnessValues1);
        const combinations2 = createCombinations(delimiters, saturationValues2, lightnessValues2);
        const createExpressions = combinations => combinations.map(x => `hsl(${[hue, x[1], x[2]].join(x[0])})`);
        const expressions1 = createExpressions(combinations1);
        const expressions2 = createExpressions(combinations2);
        const expressions = expressions1.flatMap(x => expressions2.map(y => [x, y])).map(x => `linear-gradient(${x[0]}, ${x[1]})`);
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": `hsl(210, 14.3%, 46.7%)`,
                "01/03": `hsl(210, 100.0%, 86.7%)`
            }
        };

        // テスト対象の処理を実行
        const results = expressions.map(x => Season.getReflectionColor(x, config));

        // 結果を検証
        const hsl1 = "hsl(210,95%,52%)";
        const hsl2 = "hsl(211,40%,25%)";
        results.forEach(x => expect(x).toBe(`linear-gradient(${hsl1}, ${hsl2})`));
    });
});