import { Season } from "../../../src/season";

// hex8
// 8桁の16進数表現(例: #00000000 )に関するテスト

describe("Season.getReflectionColor - hex8_", () => {
    // hex8_1:
    it("1: 第1引数が16進数(8桁)の色表現の場合は、調整した色の16進数(8桁)表現が返却される", () => {
        // テストの準備
        const expression = "#001122ff";
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": "#334455",
                "01/03": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const result = Season.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("#0c1e30ff");
    });

    // hex8_2:
    it("2: 第1引数が16進数(8桁)の色表現を含む場合は、調整した色の16進数(8桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const expression = "linear-gradient(#001122ee, #334455ff);";
        const config = {
            roday: new Date(2000, 0, 2),
            impact: 0.1,
            season: {
                "01/01": "#667788",
                "01/03": "#bbddff"
            }
        };

        // テスト対象の処理を実行
        const result = Season.getReflectionColor(expression, config);

        // 結果を検証
        expect(result).toBe("linear-gradient(#0f2032ed, #3c4e60ff);");
    });
});