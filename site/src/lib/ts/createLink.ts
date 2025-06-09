import { Data } from "effect";

export type CreateLinkStep = Data.TaggedEnum<{
  ChooseMethod: {},
  ManualAddress: {},
  AutomaticAddress: {},
  ComfirmAddress: {},
  EnterAmount: {},
  EnterDescription: {},
  ShareLink: {},
}>

export const Step = Data.taggedEnum<CreateLinkStep>();
