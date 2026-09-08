// Collapse all but the most recent updates behind a disclosure.
//
// The markup stays one flat list, so adding an update means adding an <li>
// at the top and nothing else. How many stay visible is read from
// data-collapse-after on the list. Without JS every update simply shows.
(function () {
  var list = document.querySelector('.updates[data-collapse-after]');
  if (!list) return;

  var keep = parseInt(list.getAttribute('data-collapse-after'), 10);
  if (!(keep > 0)) return;

  var items = Array.prototype.slice.call(list.children);
  if (items.length <= keep) return;

  var details = document.createElement('details');
  details.className = 'more-updates';

  var summary = document.createElement('summary');
  summary.textContent = 'Earlier updates';
  details.appendChild(summary);

  var rest = document.createElement('ul');
  rest.className = 'updates';
  items.slice(keep).forEach(function (item) {
    rest.appendChild(item);
  });
  details.appendChild(rest);

  list.parentNode.insertBefore(details, list.nextSibling);
})();
