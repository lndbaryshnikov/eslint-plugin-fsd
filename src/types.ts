import { TSESLint } from '@typescript-eslint/experimental-utils';

export type BaseOptions = object;

export type RuleContext<
  MessageIds extends string,
  Options extends BaseOptions
> = TSESLint.RuleContext<MessageIds, readonly [Options]>;
