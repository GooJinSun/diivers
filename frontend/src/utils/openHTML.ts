export const openHTML = (html: string) => {
  if ((window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        actionType: 'OPEN_BROWSER',
        url: `${window.origin}/${html}`
      })
    );
  } else window.location.href = `./${html}`;
};
