type HtmlArtisanBuildFunction = (
    tag: string = 'div',
    attributes: Object = null,
    children: Array[] | HTMLElement | Function | string = null,
    callback: Function = null,
) => Element;

type HtmlArtisan = {
    build: HtmlArtisanBuildFunction;
    author: string;
    version: string;
}

export const HtmlArtisan: HtmlArtisan;
export const h: HtmlArtisanBuildFunction;
