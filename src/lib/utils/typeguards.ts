import { TSESTree } from '@typescript-eslint/experimental-utils';

import * as pattern from './patterns';

const isHtmlEventIdentifier = (node: TSESTree.Identifier): boolean => {
  const test = (regexp: RegExp): boolean => {
    return regexp.test(node.name);
  };

  if (!node) return false;

  return (
    test(pattern.anyMouseEvent) ||
    test(pattern.anyKeyboardEvent) ||
    test(pattern.anyFormEvent) ||
    test(pattern.anyWindowEvent) ||
    test(pattern.anyDragEvent) ||
    test(pattern.anyClipboardEvent)
  );
};

const isListenerMethodIdentifier = (node: TSESTree.Identifier): boolean => {
  return !!(node && pattern.anyListenersMethods.test(node.name));
};

const isHtmlElementSearchMethodIdentifier = (
  node: TSESTree.Identifier,
): boolean => {
  return !!(node && pattern.anyHtmlElementsSearchMethod.test(node.name));
};

const isHtmlElementsObjectCollectionIdentifier = (
  node: TSESTree.Identifier,
): boolean => {
  return !!(node && pattern.anyHtmlElementObjectCollection.test(node.name));
};

export {
  isHtmlEventIdentifier,
  isListenerMethodIdentifier,
  isHtmlElementSearchMethodIdentifier,
  isHtmlElementsObjectCollectionIdentifier,
};
