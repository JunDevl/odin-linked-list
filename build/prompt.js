"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prompt;
const readline_1 = require("readline");
async function prompt(query) {
    const rl = (0, readline_1.createInterface)({ input: process.stdin, output: process.stdout });
    const value = await new Promise((resolve) => rl.question(query, resolve));
    rl.close();
    return value;
}
//# sourceMappingURL=prompt.js.map