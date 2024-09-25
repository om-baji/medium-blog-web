"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputs = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Required field" }),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.blogInputs = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Required Field" }),
    content: zod_1.z.string().min(1, { message: "Required Field" })
});
