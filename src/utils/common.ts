export function requireImage(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}

export function requireFile(name: string) {
    return new URL(`../assets/${name}`, import.meta.url).href
}
