declare module 'eslint/lib/rules/utils/ast-utils' {
  import {
    TSESTree,
    TSESLintScope,
    TSESLint,
  } from '@typescript-eslint/experimental-utils';

  type Function =
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.ArrowFunctionExpression;

  export function isFunction(node: TSESTree.Node | null): node is Function;

  export function getVariableByName(
    initScope: TSESLintScope.Scope,
    name: string,
  ): TSESLintScope.Variable;

  export function getFunctionNameWithKind(node: TSESTree.Node): string;

  export function getFunctionHeadLoc(
    node: TSESTree.Node,
    sourceCode: TSESLint.SourceCode,
  ): TSESTree.SourceLocation;
}
