import { Season } from "../../../src/season";

// hex6
// 6桁の16進数表現(例: #000000 )に関するテスト

describe("Season.getReflectionColor - hex6_", () => {
    // hex6_1:
    it("1: 第1引数が16進数(6桁)の色表現の場合は、調整した色の16進数(6桁)表現が返却される", () => {
        // テストの準備
        const expression = "#001122";
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
        expect(result).toBe("#0c1e2f");
    });

    // hex6_2:
    it("2: 第1引数が16進数(6桁)の色表現を含む場合は、調整した色の16進数(6桁)表現に置換した内容が返却される", () => {
        // テストの準備
        const expression = "linear-gradient(#001122, #334455);";
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
        expect(result).toBe("linear-gradient(#0e2032, #3c4e60);");
    });
});