function render(element, parentDom) {
    const { type, props } = element;
    
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
        ? document.createTextNode("")
        : document.createElement(type);

    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substr(2);
        dom.addEventListener(eventType, props[name])
    })

    const isAtrribute = name => !isListener(name) && name != "children";
    Object.keys(name).filter(isAtrribute).forEach(name => {
        dom[name] = props[name];
    })


    const childElements = element.children || [];
    childElements.forEach(child => render(child, element));
    
    parentDom.appendChild(dom);
}