export function init(scope: string) {
  // @ts-ignore
  const container = window[scope];
  if (container) {
    console.log('init', container);
    if (!container.__init__) {
      container.init({});
      container.__init__ = true;
    }
  } else {
    throw new Error('container资源未加载');
  }
  return container;
}
