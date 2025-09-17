export function timeInSeconds() {
    return Math.trunc(new Date().getTime() / 1000);
}

export function getElapsedTime(start: number) {
    return new Date().getTime() - start;
}