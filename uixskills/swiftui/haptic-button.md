# Haptic Feedback Button

SwiftUI button with haptic feedback and smooth press animation. Feels native and responsive on iOS.

## Overview

| Field | Value |
|-------|-------|
| Category | swiftui |
| Tech Base | SwiftUI |
| Source | SwiftUI Best Practices |
| License | MIT |
| Dependencies | SwiftUI, UIKit (for haptics) |

## Features

- Haptic feedback on tap
- Scale animation on press
- Spring physics for natural feel
- Loading state variant
- Customizable appearance

## Code

```swift
import SwiftUI

struct HapticButton: View {
    let title: String
    let action: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: {
            // Trigger haptic feedback
            let impact = UIImpactFeedbackGenerator(style: .medium)
            impact.impactOccurred()
            action()
        }) {
            Text(title)
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundColor(.white)
                .padding(.horizontal, 24)
                .padding(.vertical, 14)
                .background(Color.black)
                .clipShape(Capsule())
        }
        .scaleEffect(isPressed ? 0.95 : 1)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }
}

// Variant with loading state
struct LoadingButton: View {
    let title: String
    let isLoading: Bool
    let action: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: {
            guard !isLoading else { return }
            let impact = UIImpactFeedbackGenerator(style: .medium)
            impact.impactOccurred()
            action()
        }) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        .scaleEffect(0.8)
                }
                Text(isLoading ? "Loading..." : title)
                    .font(.headline)
                    .fontWeight(.semibold)
            }
            .foregroundColor(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 14)
            .background(isLoading ? Color.gray : Color.black)
            .clipShape(Capsule())
        }
        .disabled(isLoading)
        .scaleEffect(isPressed ? 0.95 : 1)
        .animation(.spring(response: 0.3), value: isPressed)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in if !isLoading { isPressed = true } }
                .onEnded { _ in isPressed = false }
        )
    }
}
```

## Usage

```swift
import SwiftUI

struct ContentView: View {
    @State private var isLoading = false
    @State private var count = 0

    var body: some View {
        VStack(spacing: 20) {
            // Basic haptic button
            HapticButton(title: "Tap Me") {
                count += 1
            }

            Text("Tapped \(count) times")

            // Loading button
            LoadingButton(
                title: "Save",
                isLoading: isLoading
            ) {
                isLoading = true
                // Simulate async operation
                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                    isLoading = false
                }
            }

            // Custom styled button
            HapticButton(title: "Delete") {
                print("Delete tapped")
            }
            .tint(.red)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

## Haptic Styles

```swift
// Different haptic intensities
UIImpactFeedbackGenerator(style: .light).impactOccurred()
UIImpactFeedbackGenerator(style: .medium).impactOccurred()
UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
UIImpactFeedbackGenerator(style: .soft).impactOccurred()
UIImpactFeedbackGenerator(style: .rigid).impactOccurred()

// Selection feedback (for toggles, pickers)
UISelectionFeedbackGenerator().selectionChanged()

// Notification feedback
UINotificationFeedbackGenerator().notificationOccurred(.success)
UINotificationFeedbackGenerator().notificationOccurred(.warning)
UINotificationFeedbackGenerator().notificationOccurred(.error)
```

## AI Prompt

> Create a SwiftUI button with:
> - Haptic feedback using UIImpactFeedbackGenerator
> - Press-down scale animation
> - Spring physics for natural bounce
> - Loading state with spinner
> - Disabled state during loading
