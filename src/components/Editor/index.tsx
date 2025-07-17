import React, {useRef, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {htmlContent} from './editorHtml';
import {Button} from '../Button';
import {useTheme} from '@/hooks/common/useTheme';

export type EditorProps = {
  onSave: (content: string) => void;
};

export const Editor = ({onSave}: EditorProps) => {
  const webViewRef = useRef<WebView>(null);
  const {colors, isDark} = useTheme();

  // Generate themed HTML content
  const themedHtmlContent = useMemo(() => {
    return htmlContent
      .replace(/--bg-primary: #[^;]+/g, `--bg-primary: ${colors.background}`)
      .replace(
        /--bg-secondary: #[^;]+/g,
        `--bg-secondary: ${colors.backgroundSecondary}`,
      )
      .replace(/--text-primary: #[^;]+/g, `--text-primary: ${colors.text}`)
      .replace(
        /--text-secondary: #[^;]+/g,
        `--text-secondary: ${colors.textSecondary}`,
      )
      .replace(
        /--text-tertiary: #[^;]+/g,
        `--text-tertiary: ${colors.textTertiary}`,
      )
      .replace(
        /--border-primary: #[^;]+/g,
        `--border-primary: ${colors.border}`,
      )
      .replace(
        /--border-light: #[^;]+/g,
        `--border-light: ${colors.borderLight}`,
      )
      .replace(/--primary: #[^;]+/g, `--primary: ${colors.primary}`)
      .replace(
        /--primary-light: #[^;]+/g,
        `--primary-light: ${colors.primaryLight}`,
      )
      .replace(/--input-bg: #[^;]+/g, `--input-bg: ${colors.inputBackground}`)
      .replace(
        /--placeholder: #[^;]+/g,
        `--placeholder: ${colors.inputPlaceholder}`,
      );
  }, [colors, isDark]);

  // Handles messages coming from the WebView (e.g., saved content)
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'editorContentSaved') {
        onSave(data.content);
      }
    } catch (error) {
      console.error(
        'Failed to parse message from WebView:',
        error,
        event.nativeEvent.data,
      );
    }
  };

  // Function to get content from the WebView (on Save button press)
  const handleSave = async () => {
    webViewRef.current?.injectJavaScript(`
      (function() {
        const content = window.getEditorContent();
        // Send the content back to React Native via postMessage
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'editorContentSaved', content: content }));
      })();
      true; // This is important to ensure the script executes
    `);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* WebView for the editor - toolbar is now inside htmlContent */}
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{html: themedHtmlContent}}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={styles.webView}
      />

      {/* Save button - remains in React Native to interact with WebView */}
      <Button onPress={handleSave}>
        <Text>Save</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
