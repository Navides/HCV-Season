import { Season } from "../../../src/season";

// hex3
// 3桁の16進数表現(例: #000 )に関するテスト

describe("Season.getReflectionColor hex3_", () => {
    // hex3_1:
    it("1: 第1引数が16進数(3桁)の色表現の場合は、調整した色の16進数(3桁)表現が返却される", () => {
        // テストの準備
        const expression = "#012";
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": "#345",
                "01/03": "#bdf"
            }
        };
        
        // テスト対象の処理を実行
        const result = Season.getReflectionColor(expression, config);
        
        // 結果を検証
        expect(result).toBe("#123");
        
        // NOTE :
        // 16進数(3桁)の各桁が示す値はRGB値で言うところの17を乗算した値となっている
        //  例 : 1 = 17, 2 = 34, 3 = 51
        //
        // 処理結果が17で割り切れる場合は n/17 の16進数表記を桁とするので問題ない
        //  例 : rgb(0, 17, 34) > #012
        //
        // 処理結果が17で割り切れない場合は、最も近い17の倍数に丸めた値を結果とする
        //  例 : rgb(1, 8, 9) > #001
    });

    // hex3_2:
    it("2: 第1引数が16進数(3桁)の色表現を含む場合は、調整した色の16進数(3桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const expression = "linear-gradient(#012, #345);";
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": "#678",
                "01/03": "#bdf"
            }
        };

        // テスト対象の処理を実行
        const result = Season.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("linear-gradient(#123, #456);");
    });
});