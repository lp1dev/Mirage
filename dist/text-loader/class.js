"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../game/exceptions");
var TextLoader = (function () {
    function TextLoader(textData, locale) {
        this.textData = textData;
        this.locale = locale;
    }
    TextLoader.prototype.get = function (id) {
        if (!this.textData[id]) {
            return id;
        }
        else if (!this.textData[id][this.locale]) {
            throw new exceptions_1.InvalidLocaleSpecifiedException(this.locale);
        }
        else {
            return this.textData[id][this.locale];
        }
    };
    TextLoader.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    return TextLoader;
}());
exports.default = TextLoader;
//# sourceMappingURL=class.js.map