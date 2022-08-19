export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter( x => x && x!== true || x === 0)
    .join('')
}

export function creatStore(reducer) {
    let state = reducer();
    const roots = new Map();

    function reder() {
        for (const [root, component] of roots) {
            const output = component();
            root.innerHTML = output;
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component);
            reder();
        },

        connect(selector = state => state) {
            return component => (props, ...args) => 
                component(Object.assign({}, props, selector(state), ...args))
        },

        dispatch(action, ...args) {
            state = reducer(state, action, args);
            reder();
        }
    }
}