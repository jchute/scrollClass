# Scroll Class
Adds a Class on User Scroll.

Once the class is applied, CSS may be used as normal to change any aspect of your website. Including, but not limited to, adding a sticky nav partway down the page, lessening the height of a sticky header, fading in items, etc.

## Options

No options are required.

|  Option   |       Type       |  Default   | Description |
|-----------|------------------|------------|-------------|
| className |       STR        | 'scrolled' | The class that is assigned when the user scrolls to the position. |
| position  | INT, STR, jQuery |     1      | Sets the point when the class gets added. More information below. |

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
      className: 'scrolled',
      position: 'top'
    });
    
### Targeting Element

    $('body').scrollClass({
      position: $('element')
    });

## Other information

Requires jQuery to be included.

Tested in IE 8+, the latest version of Firefox and the latest version of Google Chrome.
