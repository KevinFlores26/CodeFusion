const regex = {
  notExtLStyle: /<link\b[^>]*\b(?=[^>]*\brel=["']stylesheet["'])[^>]*href=["']((?!\w+:\/\/|data:)[^"']+)["'][^>]*>/gi,
  notExtScript: /<script\b[^>]*\bsrc=["']((?!\w+:\/\/|data:)[^"']+)["'][^>]*><\/script>/gi,
  notExtResource: /<(script|link)\b[^>]*\b(?:src|href)=["']((?!\w+:\/\/|data:)[^"']+)["'][^>]*>(?:<\/\1>)?/gi,
  srcHref: /(?:src|href)=["']([^"']*)["']/gi,
  notExtUrl: /^(?!\w+:\/\/|data:|mailto:|tel:|blob:|javascript:).+/,
  opHtml: /<html\b[^>]*>/gi,
  clsHtml: /<\/html>/gi,
  head: /<head\b[\s\S]*?<\/head>/gi,
  body: /<body\b[\s\S]*?<\/body>/gi,
}

export default regex