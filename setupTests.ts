import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@/__mocks__/firebase/mockFirebaseClient";
import "@/__mocks__/plugins/mockAuthServicePlugin";

expect.extend(matchers);

