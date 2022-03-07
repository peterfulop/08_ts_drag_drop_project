// autobind decorator: Need to set tsconfig => "experimentalDecorators": true
export function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescritor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescritor;
}
