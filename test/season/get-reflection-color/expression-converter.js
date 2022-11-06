/**
 * 表現の変換処理を提供します。
 */
class ExpressionConverter {
    /**
     * %表記を取得します。
     * @param {String} expression 数値。
     * @returns {String} %表記を返します。
     */
    static getPercent(expression) {
        let number = Number(expression.replace(/[^0-9.]/g, ""));
        if (expression.indexOf("%") === -1) number *= 100;
        return `${Math.round(number)}%`;
    }
}

export { ExpressionConverter };