# Scroll Class
Adds a Class on User Scroll.

Once the class is applied, CSS may be used as normal to change any aspect of your website. Including, but not limited to, adding a sticky nav partway down the page, lessening the height of a sticky header, fading in items, etc.

## Options

No options are required.

|     Option     |       Type       |   Default    | Description |
|----------------|------------------|--------------|-------------|
|     target     | INT, STR, $, ARR |   ['top']    | Sets the point when the class gets added. More information below. |
|     class      |     STR, ARR     | ['scrolled'] | The class that is assigned when the user scrolls to the position. |
| showDirections |       BOOL       |    false     | Option for adding a class based on the scrolls direction. Classes: up-scroll, down-scroll, no-scroll |
|   keepClass    |       BOOL       |    false     | Option for keeping the classes when scrolling up the page. |

## Positions

|  Value   | Effect |
|----------|--------|
|   INT    | Toggles the class when the user reaches specified amount in pixels. |
|   'px'   | Toggles the class when the user reaches specified pixels. |
|   'vw'   | Toggles the class when the user reaches specified vw value. |
|   'vh'   | Toggles the class when the user reaches specified vh value. |
|   '%'    | Toggles the class when the user reaches specified percentage of document height. |
|  'top'   | Toggles the class when the user scroll off of the top of the page. |
| 'middle' | Toggles the class when the user passes the middle of the page. |
| 'bottom' | Toggles the class when the user reaches the bottom of the page. |
|    $     | Toggles the class when the user reaches the top of the first jQuery element referenced. |

## Examples

### Basic usage

    <script type="text/javascript" src="path/to/scrollclass.js"></script>
  
    <script type="text/javascript">
    $(document).ready(function(){
      $('body').scrollClass();
    });
    </script>
    
### Using options

    $('body').scrollClass({
      class: 'scrolled',
      target: 'top',
      showDirections: true,
      keepClass: false
    });

    $('body').scrollClass({
      class: 'scrolled',
      target: 1000,
      showDirections: false,
      keepClass: true
    });

    $('body').scrollClass({
      class: 'scrolled',
      target: '100vh',
      showDirections: false,
      keepClass: false
    });
    
### Targeting Element

    $('body').scrollClass({
      target: $('element')
    });
    
### Multiple Points

When assigning multiple targets, add each point into an array. A default class of "scrolled" will be added to the first target. This may be changed either by passing a string or the first value of an array. The following targets will recieve a class name following the pattern 'firstClass-1', 'firstClass-2', 'firstClass-3', etc.

The First string in the class array will be used for the first value in the target array, the second for the second, etc. If you wish to give a particular class to a later target but want to keep the default for others, you may use an empty string ('') for these choices.

The class array does not need to be the same length as the target array. Default classes will be used to fill in missing values. If the class array is longer, only the first classes will be used.

    $('body').scrollClass({
      target: ['top', 1000, '100vh', $('element')],
      class: ['scrolled', '', 'scrolled-3']
    });

## Other information

Requires jQuery to be included.

Tested in IE 8+, the latest version of Firefox and the latest version of Google Chrome.
