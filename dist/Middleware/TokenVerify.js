"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = request.header('x-auth-token');
    if (!token) {
        response.status(401).json({ msg: 'Token not provided,access denied' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, 'sshhhh', (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                response.status(401).send({ msg: 'Token is invalid' });
                return;
            }
            response.locals.jwt = yield (payload === null || payload === void 0 ? void 0 : payload.user.id);
            next();
        }));
    }
    catch (error) {
        response.status(401).send({ msg: 'Token is invalid' });
    }
});
exports.default = verifyToken;
