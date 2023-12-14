export function requireImage() {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}

export function requireFile() {
    return new URL(`../assets/${name}`, import.meta.url).href
}
