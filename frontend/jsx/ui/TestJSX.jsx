//import dom, { Fragments } from 'jsx-render';

export default class TestJSX {
    render() {
        // Return siblings without direct parent component
        const Foo = () => (
            <Fragments>
                <li />
                <li />
            </Fragments>
        )
        const ul = document.createElement('ul')
        ul.appendChild(<Foo />)
    }
}