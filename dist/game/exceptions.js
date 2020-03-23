"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = (function () {
    function Exception() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = 'Exception';
        this.params = params;
    }
    Exception.prototype.toString = function () {
        return this.type + " :: " + this.params;
    };
    return Exception;
}());
exports.Exception = Exception;
;
var InvalidDataFormatException = (function (_super) {
    __extends(InvalidDataFormatException, _super);
    function InvalidDataFormatException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidDataFormatException';
        return _this;
    }
    return InvalidDataFormatException;
}(Exception));
exports.InvalidDataFormatException = InvalidDataFormatException;
;
var InvalidQuestionIdException = (function (_super) {
    __extends(InvalidQuestionIdException, _super);
    function InvalidQuestionIdException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidQuestionIdException';
        return _this;
    }
    return InvalidQuestionIdException;
}(Exception));
exports.InvalidQuestionIdException = InvalidQuestionIdException;
;
var InvalidTextIdException = (function (_super) {
    __extends(InvalidTextIdException, _super);
    function InvalidTextIdException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidTextIdException';
        return _this;
    }
    return InvalidTextIdException;
}(Exception));
exports.InvalidTextIdException = InvalidTextIdException;
;
var InvalidLocaleSpecifiedException = (function (_super) {
    __extends(InvalidLocaleSpecifiedException, _super);
    function InvalidLocaleSpecifiedException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidLocaleSpecifiedException';
        return _this;
    }
    return InvalidLocaleSpecifiedException;
}(Exception));
exports.InvalidLocaleSpecifiedException = InvalidLocaleSpecifiedException;
;
var InvalidStateException = (function (_super) {
    __extends(InvalidStateException, _super);
    function InvalidStateException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidStateException';
        return _this;
    }
    return InvalidStateException;
}(Exception));
exports.InvalidStateException = InvalidStateException;
;
var InvalidInstructionFormatException = (function (_super) {
    __extends(InvalidInstructionFormatException, _super);
    function InvalidInstructionFormatException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidInstructionFormat';
        return _this;
    }
    return InvalidInstructionFormatException;
}(Exception));
exports.InvalidInstructionFormatException = InvalidInstructionFormatException;
;
var InvalidInstructionTypeException = (function (_super) {
    __extends(InvalidInstructionTypeException, _super);
    function InvalidInstructionTypeException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'InvalidInstructionTypeException';
        return _this;
    }
    return InvalidInstructionTypeException;
}(Exception));
exports.InvalidInstructionTypeException = InvalidInstructionTypeException;
;
var UndefinedValueException = (function (_super) {
    __extends(UndefinedValueException, _super);
    function UndefinedValueException() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'UndefinedValueException';
        return _this;
    }
    return UndefinedValueException;
}(Exception));
exports.UndefinedValueException = UndefinedValueException;
;
//# sourceMappingURL=exceptions.js.map