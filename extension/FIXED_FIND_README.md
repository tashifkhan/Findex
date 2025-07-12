# Fixed Find Tool

A powerful DOM search tool that appears in the top right corner of any webpage and can search through all text content and HTML attributes.

## Features

- **Fixed Position**: Always visible in the top right corner of the page
- **Keyboard Shortcut**: Press `Ctrl+Shift+F` to open/close the tool
- **Comprehensive Search**: Searches through all text content and HTML attributes
- **Navigation**: Navigate between matches with arrow buttons or keyboard shortcuts
- **Options**: Case-sensitive and whole word search options
- **Responsive**: Works on desktop and mobile devices
- **Non-intrusive**: Small floating button shows when tool is available

## How to Use

### Opening the Tool
1. Press `Ctrl+Shift+F` on any webpage
2. Or click the floating 🔍 button in the top right corner

### Searching
1. Type your search term in the input field
2. Results are highlighted automatically as you type
3. Use the navigation buttons or keyboard shortcuts to move between matches

### Keyboard Shortcuts
- `Ctrl+Shift+F`: Open/close the find tool
- `Enter`: Go to next match
- `Shift+Enter`: Go to previous match
- `Esc`: Close the find tool

### Search Options
- **Case Sensitive**: Check to match exact case
- **Whole Word**: Check to match complete words only
- **Search in HTML**: Check to search through HTML attributes

### Navigation
- **↑ Prev**: Go to previous match
- **↓ Next**: Go to next match
- **Clear**: Remove all highlights

## Technical Implementation

### Files
- `fixed-find-tool.js`: Main tool implementation (vanilla JavaScript)
- `content-scripts/fixed-find-injector.js`: Content script that injects the tool
- `test-fixed-find.html`: Test page to demonstrate functionality

### Architecture
1. **Content Script**: Injects the find tool script into every webpage
2. **Fixed Find Tool Class**: Handles all search functionality
3. **Background Script**: Manages keyboard shortcuts
4. **Manifest**: Configures permissions and commands

### Search Algorithm
- Uses `TreeWalker` API to traverse the DOM efficiently
- Searches text nodes for content matches
- Optionally searches HTML attributes
- Creates temporary highlight elements for visual feedback
- Restores original DOM when clearing highlights

### DOM Traversal
```javascript
const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
        acceptNode: (node) => {
            // Skip script, style, and noscript tags
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                if (['script', 'style', 'noscript'].includes(tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    }
);
```

## Installation

1. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder

2. The tool will automatically be available on all webpages

## Testing

Open `test-fixed-find.html` in your browser to test the functionality. The page includes:
- Various text content to search through
- HTML attributes to test attribute search
- Interactive elements
- Hidden content
- Dynamic content added after page load

## Browser Compatibility

- Chrome/Chromium (Manifest V3)
- Firefox (with Manifest V3 support)
- Edge (Chromium-based)

## Limitations

- Cannot search in iframes (due to same-origin policy)
- Some websites may block script injection
- Dynamic content added after tool initialization may not be immediately searchable

## Customization

The tool can be customized by modifying the CSS in `fixed-find-tool.js`. Key customization points:
- Position and size of the toolbar
- Colors and styling
- Animation effects
- Highlight colors

## Troubleshooting

### Tool not appearing
1. Check if the extension is enabled
2. Refresh the page
3. Check browser console for errors

### Search not working
1. Ensure the page has loaded completely
2. Try refreshing the page
3. Check if the page blocks script injection

### Keyboard shortcuts not working
1. Ensure no other extensions are using the same shortcuts
2. Check browser keyboard shortcut settings
3. Try the floating button as an alternative

## Development

To modify the tool:
1. Edit `fixed-find-tool.js` for core functionality
2. Edit `content-scripts/fixed-find-injector.js` for injection logic
3. Reload the extension in Chrome
4. Refresh test pages to see changes

## License

This tool is part of the Findex Sidebar Extension project. 