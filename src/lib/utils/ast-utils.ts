import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

//------------------------------------------------------------------------------
// Patterns
//------------------------------------------------------------------------------

const anyFunction = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;

const anyWindowEvent = /^(?:on(?:afterprint|beforeprint|beforeunload|error|hashchange|load|message|offline|online|pagehide|pageshow|popstate|resize|storage|unload))&/u;
const anyFormEvent = /^(?:on(?:blur|change|contextmenu|focus|input|invalid|reset|search|select|submit))$/u;
const anyKeyboardEvent = /^(?:on(?:keydown|keypress|keyup))$/u;
const anyMouseEvent = /^(?:on(?:click|dblclick|mousedown|mousemove|mouseout|mouseover|mouseup|mousewheel|wheel))$/u;
const anyDragEvent = /^(?:on(?:drag|dragend|dragenter|dragleave|dragover|dragstart|drop|scroll))$/u;
const anyClipboardEvent = /^(?:on(?:copy|cut|paste))$/u;

const anyListenersMethods = /^(?:(?:add|remove)EventListener)$/u;

const anyHtmlElementsSearchMethod = /^(?:getElement(?:ById|sByTagName|sByClassName)|querySelector(?:All)?)$/u;
const anyHtmlElementObjectCollection = /^(?:anchors|body|documentElement|embeds|forms|head|images|links|scripts|title)$/;

//------------------------------------------------------------------------------
// FUnctions
//------------------------------------------------------------------------------

const isFunction = (node: TSESTree.Node): boolean => {
  return !!(node && anyFunction.test(node.type));
};

const isHtmlEventIdentifier = (node: TSESTree.Identifier): boolean => {
  const test = (regexp: RegExp): boolean => {
    return regexp.test(node.name);
  };

  if (!node) return false;

  return (
    test(anyMouseEvent) ||
    test(anyKeyboardEvent) ||
    test(anyFormEvent) ||
    test(anyWindowEvent) ||
    test(anyDragEvent) ||
    test(anyClipboardEvent)
  );
};

const isListenerMethodIdentifier = (node: TSESTree.Identifier): boolean => {
  return !!(node && anyListenersMethods.test(node.name));
};

const isHtmlElementSearchMethodIdentifier = (
  node: TSESTree.Identifier,
): boolean => {
  return !!(node && anyHtmlElementsSearchMethod.test(node.name));
};

const isHtmlElementsObjectCollectionIdentifier = (
  node: TSESTree.Identifier,
): boolean => {
  return !!(node && anyHtmlElementObjectCollection.test(node.name));
};

const getLastAncestor = <MessageIds extends string, TOptions extends unknown[]>(
  context: TSESLint.RuleContext<MessageIds, TOptions>,
): TSESTree.Node => {
  const ancestors = context.getAncestors();
  const lastAncestor = ancestors[ancestors.length - 1];

  return lastAncestor;
};

export {
  isFunction,
  getLastAncestor,
  isHtmlEventIdentifier,
  isListenerMethodIdentifier,
  isHtmlElementSearchMethodIdentifier,
  isHtmlElementsObjectCollectionIdentifier,
};
