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
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const shared_1 = require("./shared");
test_1.test.describe("App", () => {
    let ConfigPage;
    test_1.test.beforeEach(({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        ConfigPage = new shared_1.PlayConfigPage(page);
        yield ConfigPage.goto();
    }));
    (0, test_1.test)("should open App properly ", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_1.expect)(page.getByText(/Hey, let’s build something together?/i)).toBeVisible();
        yield (0, test_1.expect)(page.getByText(/We are here to help you configure easily your react.js project/i)).toBeVisible();
    }));
});
//# sourceMappingURL=home.spec.js.map