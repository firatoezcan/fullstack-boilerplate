import commonDe from "../public/locales/de/common.json";
import commonEn from "../public/locales/en/common.json";

type CommonKeys = keyof (typeof commonEn | typeof commonDe);

export type ContentFrontendKeys = CommonKeys;
