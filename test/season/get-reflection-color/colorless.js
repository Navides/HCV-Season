import { Season } from "../../../src/season";

// colorless
// 色を含まない表現に関するテスト

describe("Season.getReflectionColor - colorless_", () => {
    // colorless_1:
    it("1: 第1引数が色表現ではない/色表現を含まない場合は、そのまま返却される", () => {
        // テストの準備
        const expression = "not color";

        // テスト対象の処理を実行
        const result = Season.getReflectionColor(expression);

        // 結果を検証
        expect(result).toBe(expression);
    });
});