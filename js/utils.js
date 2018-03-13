function applyVector({x: cx, y: cy}, {x: vx, y: vy}) {
    return {
        x: cx + vx,
        y: cy + vy,
    };
}

function areEqual({x: xa, y: ya}, {x: xb, y: yb}) {
    return xa == xb && ya == yb;
}

export {
    applyVector,
    areEqual,
};