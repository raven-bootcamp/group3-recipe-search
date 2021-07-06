//import dom, { Fragments } from 'jsx-render';
var TestJSX = /*#__PURE__*/function () {
  function TestJSX() {}

  var _proto = TestJSX.prototype;

  _proto.render = function render() {
    // Return siblings without direct parent component
    var Foo = function Foo() {
      return dom(Fragments, null, dom("li", null), dom("li", null));
    };

    var ul = document.createElement('ul');
    ul.appendChild(dom(Foo, null));
  };

  return TestJSX;
}();

export { TestJSX as default };