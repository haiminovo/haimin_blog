/**
 * 原生 JavaScript 获取 cookie 值
 * @param name
 */
export function getCookie(name: string, cookiesStr: string = document.cookie) {
    const arr = cookiesStr.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) {
        try {
            return unescape(decodeURI(arr[2]));
        } catch (error) {
            return arr[2];
        }
    }
    return null;
}

// 获取全部 cookie
export function getAllCookies() {
    const cookies: {
        [key in string]: string;
    } = {};
    try {
        document.cookie.split('; ').forEach((item) => {
            const msg = item.split('=');
            cookies[msg[0]] = msg[1];
        });
    } catch {
        throw new Error('Cookie解析失败，请检查Cookie格式！');
    }
    return cookies;
}

export function deleteCookie(name: string, domain?: string, path?: string) {
    const d = new Date(0);
    const domainTemp = domain ? `; domain=${domain}` : '';
    const pathTemp = path || '/';
    document.cookie = name + '=; expires=' + d.toUTCString() + domainTemp + '; path=' + pathTemp;
}

export function deleteAllCookies(domain: string, path: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i]) {
            deleteCookie(cookies[i].split('=')[0], domain, path);
        }
    }
}

export function setCookie(
    name: string,
    value: string | number | object | boolean,
    days?: number,
    domainStr?: string,
    path = '/'
) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    let domain = '';
    if (domainStr) {
        domain = '; domain=' + domainStr;
    }
    document.cookie = name + '=' + value + expires + domain + '; path=' + path;
}
