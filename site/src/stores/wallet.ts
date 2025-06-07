import { writable } from "svelte/store";
import type { BrowserWallet } from "@meshsdk/core";
import { Option } from "effect";

export const connectedWallet = writable<Option.Option<BrowserWallet>>(Option.none());
