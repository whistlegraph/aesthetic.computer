export const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
export const Android = /(Android)/g.test(navigator.userAgent);
export const MetaBrowser = /(OculusBrowser)/g.test(navigator.userAgent);
export const Desktop = !iOS && !Android && !MetaBrowser;