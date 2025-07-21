import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@/__tests__/mocks/mockFirebaseClient";
import "@/__tests__/mocks/plugins/mockAuthServicePlugin";

expect.extend(matchers);

