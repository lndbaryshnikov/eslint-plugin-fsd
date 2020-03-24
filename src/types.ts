import { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';

// "url" will be set automatically.
export type RuleMetaDataDocs = Omit<TSESLint.RuleMetaDataDocs, 'url'>;

// "docs.url" will be set automatically.
export type RuleMetaData<MessageIds extends string> = {
  readonly docs: RuleMetaDataDocs;
} & Omit<TSESLint.RuleMetaData<MessageIds>, 'docs'>;

export type Function =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;
