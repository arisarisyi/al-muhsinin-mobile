/**
 * Ratib Al-Haddad Screen with PDF Viewer
 *
 * Displays the Ratib Al-Haddad PDF using PDF.js in WebView
 */

import React, { useState, useRef } from "react"
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { WebView } from "react-native-webview"
import { useAssets } from "expo-asset"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { Colors, Typography, Spacing, BorderRadius } from "@/constants/theme"
import { ThemedText } from "@/components/themed-text"

const { width } = Dimensions.get("window")

const PDFJS_HTML = (pdfBase64: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #canvas-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px 0;
    }
    canvas {
      max-width: 100%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      background-color: white;
    }
    #loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div id="loading">Memuat PDF...</div>
  <div id="canvas-container"></div>

  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const pdfData = atob('${pdfBase64}');
    const loadingTask = pdfjsLib.getDocument({data: pdfData});

    loadingTask.promise.then(function(pdf) {
      const container = document.getElementById('canvas-container');
      document.getElementById('loading').style.display = 'none';

      const renderPage = async (pageNum) => {
        const page = await pdf.getPage(pageNum);
        const scale = Math.min((window.innerWidth - 40) / page.getViewport({scale: 1}).width, 2);
        const viewport = page.getViewport({scale: scale});

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);

        await page.render({canvasContext: context, viewport: viewport}).promise;
      };

      let promises = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        promises.push(renderPage(i));
      }
      Promise.all(promises);
    }).catch(function(error) {
      document.getElementById('loading').textContent = 'Error: ' + error.message;
      console.error('Error loading PDF:', error);
    });
  </script>
</body>
</html>
`

export default function RatibScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? "light"]
  const webViewRef = useRef<WebView>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfHtml, setPdfHtml] = useState<string | null>(null)

  const [assets] = useAssets([require("@/assets/pdf/ratib.pdf")])

  React.useEffect(() => {
    const loadPdf = async () => {
      if (assets && assets[0]) {
        try {
          const response = await fetch(assets[0].localUri)
          const blob = await response.blob()

          const reader = new FileReader()
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(",")[1]
            const html = PDFJS_HTML(base64)
            setPdfHtml(html)
            setIsLoading(false)
          }
          reader.readAsDataURL(blob)
        } catch (err) {
          console.error("Failed to load PDF:", err)
          setError("Gagal memuat PDF")
          setIsLoading(false)
        }
      }
    }

    loadPdf()
  }, [assets])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setPdfHtml(null)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.title} type="title">
          راتب الحدّاد
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Ratib Al-Haddad
        </ThemedText>
      </View>

      {/* PDF Container */}
      <View style={styles.pdfContainer}>
        {isLoading && !error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <ThemedText style={styles.loadingText}>
              Memuat Ratib Al-Haddad...
            </ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorTitle} type="heading3">
              Terjadi Kesalahan
            </ThemedText>
            <ThemedText style={styles.errorMessage}>{error}</ThemedText>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={handleRetry}
            >
              <ThemedText style={styles.retryButtonText}>Coba Lagi</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !error && pdfHtml && (
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            source={{ html: pdfHtml }}
            style={styles.webView}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent
              console.error("WebView error: ", nativeEvent)
              setError("Gagal memuat PDF")
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent
              console.error("HTTP error: ", nativeEvent)
              setError("Gagal memuat PDF")
            }}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    alignItems: "center",
  },
  title: {
    ...Typography.arabicLarge,
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.heading3,
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    color: "#FFFFFF",
    textAlign: "center",
  },
  pdfContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  loadingText: {
    ...Typography.body,
    marginTop: Spacing.md,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  errorTitle: {
    ...Typography.heading3,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  errorMessage: {
    ...Typography.body,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  retryButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  retryButtonText: {
    ...Typography.heading4,
    color: "#FFFFFF",
    fontWeight: "600",
  },
})
