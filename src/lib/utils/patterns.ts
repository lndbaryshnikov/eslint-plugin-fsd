export const anyWindowEvent = /^(?:on(?:afterprint|beforeprint|beforeunload|error|hashchange|load|message|offline|online|pagehide|pageshow|popstate|resize|storage|unload))&/u;

export const anyFormEvent = /^(?:on(?:blur|change|contextmenu|focus|input|invalid|reset|search|select|submit))$/u;

export const anyKeyboardEvent = /^(?:on(?:keydown|keypress|keyup))$/u;

export const anyMouseEvent = /^(?:on(?:click|dblclick|mousedown|mousemove|mouseout|mouseover|mouseup|mousewheel|wheel))$/u;

export const anyDragEvent = /^(?:on(?:drag|dragend|dragenter|dragleave|dragover|dragstart|drop|scroll))$/u;

export const anyClipboardEvent = /^(?:on(?:copy|cut|paste))$/u;

export const anyListenersMethods = /^(?:(?:add|remove)EventListener)$/u;

export const anyHtmlElementsSearchMethod = /^(?:getElement(?:ById|sByTagName|sByClassName)|querySelector(?:All)?)$/u;

export const anyHtmlElementObjectCollection = /^(?:anchors|body|documentElement|embeds|forms|head|images|links|scripts|title)$/;
