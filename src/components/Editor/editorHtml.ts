export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <title>Rich Text Editor</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f9f9f9;
      --text-primary: #1a1a1a;
      --text-secondary: #666666;
      --text-tertiary: #999999;
      --border-primary: #dddddd;
      --border-light: #eeeeee;
      --primary: #007aff;
      --primary-light: #4da3ff;
      --input-bg: #f9f9f9;
      --placeholder: #999999;
    }
    
    * {
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-primary);
      display: flex;
      flex-direction: column;
      height: 100%;
      color: var(--text-primary);
    }
    
    #editor-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--bg-primary);
      position: relative;
      padding-bottom: 80px; /* Space for fixed toolbar */
      min-height: 50px;
      height: 100%;
    }
    
    #editor {
      padding: 24px;
      min-height: 100%;
      outline: none;
      line-height: 1.7;
      font-size: 16px;
      color: var(--text-primary);
      font-weight: 400;
      letter-spacing: -0.01em;
      flex-grow: 1;
      overflow-y: auto;
      height: 100%;
    }
    
    #editor:empty:before {
      content: "Write something here...";
      color: var(--placeholder);
      font-style: italic;
    }
    
    #toolbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      width: 100%;
      max-width: 100%;
      align-items: center;
      justify-content: center;
      padding: 12px 16px;
      background-color: var(--bg-primary);
      border-top: 1px solid var(--border-primary);
      gap: 4px;
      box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
      z-index: 1000;
    }
    
    .toolbar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background-color: transparent;
      color: var(--text-tertiary);
      font-weight: 500;
      font-size: 14px;
      border: 1px solid transparent;
      cursor: pointer;
      outline: none;
      transition: all 0.15s ease;
      font-family: inherit;
    }
    
    .toolbar-button:hover {
      background-color: var(--bg-secondary);
      color: var(--text-secondary);
      border-color: var(--border-primary);
    }
    
    .toolbar-button:active {
      background-color: var(--input-bg);
      transform: scale(0.95);
    }
    
    .toolbar-button.active {
      background-color: rgba(0, 122, 255, 0.1);
      color: var(--primary);
      border-color: rgba(0, 122, 255, 0.2);
    }
    
    .toolbar-separator {
      width: 1px;
      height: 20px;
      background-color: var(--border-primary);
      margin: 0 8px;
    }
    
    /* Typography styles */
    b, strong {
      font-weight: 600;
      color: var(--text-primary);
    }
    
    i, em {
      font-style: italic;
      color: var(--text-secondary);
    }
    
    blockquote {
      border-left: 3px solid var(--border-primary);
      margin: 1.5em 0;
      padding: 0.75em 1.25em;
      color: var(--text-tertiary);
      font-style: italic;
      background-color: var(--bg-secondary);
      border-radius: 0 8px 8px 0;
      font-size: 15px;
    }
    
    ul, ol {
      margin: 1em 0 1em 1.5em;
      padding: 0;
      line-height: 1.6;
    }
    
    ul {
      list-style-type: none;
    }
    
    ul li {
      position: relative;
      margin-bottom: 0.5em;
    }
    
    ul li:before {
      content: "•";
      color: var(--text-tertiary);
      font-weight: bold;
      position: absolute;
      left: -1.2em;
    }
    
    ol {
      list-style-type: decimal;
    }
    
    ol li {
      margin-bottom: 0.5em;
    }
    
    p {
      margin: 0 0 1em 0;
    }
    
    p:last-child {
      margin-bottom: 0;
    }
    
    /* Focus states */
    [contenteditable="true"]:focus {
      outline: none;
    }
    
    /* Selection styles */
    ::selection {
      background-color: rgba(0, 122, 255, 0.2);
      color: var(--text-primary);
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      #toolbar {
        padding: 8px 12px;
        gap: 2px;
      }
      
      .toolbar-button {
        width: 32px;
        height: 32px;
        font-size: 13px;
      }
      
      #editor {
        padding: 16px;
        font-size: 15px;
      }
      
      #editor-container {
        padding-bottom: 70px; /* Slightly less space on mobile */
      }
    }
  </style>
</head>
<body>
  <div id="editor-container">
    <div id="editor" contenteditable="true"></div>
  </div>
  
  <div id="toolbar">
    <button class="toolbar-button" onclick="window.applyBold()" title="Bold">B</button>
    <button class="toolbar-button" onclick="window.applyItalic()" title="Italic">I</button>
    <div class="toolbar-separator"></div>
    <button class="toolbar-button" onclick="window.applyQuote()" title="Quote">"</button>
    <button class="toolbar-button" onclick="window.applyList()" title="List">•</button>
  </div>

  <script>
    const editor = document.getElementById('editor');
    const toolbarButtons = document.querySelectorAll('.toolbar-button');

    // Function to get the current HTML content of the editor
    window.getEditorContent = () => {
      return editor.innerHTML;
    };

    // Function to update toolbar button states
    function updateToolbarState() {
      toolbarButtons.forEach(button => {
        button.classList.remove('active');
      });
      
      if (document.queryCommandState('bold')) {
        toolbarButtons[0].classList.add('active');
      }
      if (document.queryCommandState('italic')) {
        toolbarButtons[1].classList.add('active');
      }
    }

    // Function to apply bold formatting
    window.applyBold = () => {
      document.execCommand('bold', false, null);
      updateToolbarState();
    };

    // Function to apply italic formatting
    window.applyItalic = () => {
      document.execCommand('italic', false, null);
      updateToolbarState();
    };

    // Function to apply quote formatting (using blockquote)
    window.applyQuote = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let parentBlock = range.startContainer;
        while (parentBlock && parentBlock.nodeName !== 'BODY' && parentBlock.nodeName !== 'DIV') {
          if (parentBlock.nodeName === 'BLOCKQUOTE') {
            const parent = parentBlock.parentNode;
            while (parentBlock.firstChild) {
              parent.insertBefore(parentBlock.firstChild, parentBlock);
            }
            parent.removeChild(parentBlock);
            return;
          }
          parentBlock = parentBlock.parentNode;
        }
      }
      document.execCommand('formatBlock', false, 'blockquote');
    };

    // Function to apply unordered list formatting
    window.applyList = () => {
      document.execCommand('insertUnorderedList', false, null);
    };

    // Listen for selection changes to update toolbar state
    document.addEventListener('selectionchange', updateToolbarState);
    
    // Listen for keyup events to update toolbar state
    editor.addEventListener('keyup', updateToolbarState);
    editor.addEventListener('mouseup', updateToolbarState);

    // Listen for messages from React Native WebView (e.g., to set content)
    document.addEventListener('message', function(event) {
      const data = JSON.parse(event.data);
      if (data.type === 'setContent') {
        editor.innerHTML = data.content;
      }
    });

    // Initialize toolbar state
    updateToolbarState();
  </script>
</body>
</html>
`;