const DOMNodeCollection = require('./dom_node_collection');

const queue = [];
let ready = false;

window.$l = (selector, callback) => {
  if (callback !== undefined && document.readyState !== 'complete') {
    queue.push(callback);
  }
  else if (callback !== undefined && document.readyState === 'complete') {
    callback();
  }

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      queue.forEach( (callback) => callback());
    }
  };

  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection(selector);
  }
  else if (typeof selector === 'string') {
    let nodelist = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodelist);
  }
};

$l.extend = function(target, ...objs){
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key];
    });
  });
};

$l = window.$l;
