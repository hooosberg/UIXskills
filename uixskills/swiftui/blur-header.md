# Blur Header ScrollView

ScrollView with dynamic blur header that appears on scroll. Matches iOS 17+ design patterns.

## Overview

| Field | Value |
|-------|-------|
| Category | swiftui |
| Tech Base | SwiftUI |
| Source | iOS 17 Design Patterns |
| License | MIT |
| Dependencies | SwiftUI, UIKit |

## Features

- Large title that collapses on scroll
- Blur header appears when scrolling
- Smooth transition animation
- Matches native iOS navigation behavior
- Safe area handling

## Code

```swift
import SwiftUI

struct BlurHeaderScrollView<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    @State private var scrollOffset: CGFloat = 0

    private var showBlurHeader: Bool {
        scrollOffset < -20
    }

    var body: some View {
        ZStack(alignment: .top) {
            ScrollView {
                // Offset reader
                GeometryReader { geo in
                    Color.clear.preference(
                        key: ScrollOffsetKey.self,
                        value: geo.frame(in: .named("scroll")).minY
                    )
                }
                .frame(height: 0)

                // Content with large title
                VStack(spacing: 0) {
                    // Large title
                    HStack {
                        Text(title)
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        Spacer()
                    }
                    .padding(.horizontal)
                    .padding(.top, 8)
                    .padding(.bottom, 8)

                    content
                }
            }
            .coordinateSpace(name: "scroll")
            .onPreferenceChange(ScrollOffsetKey.self) { value in
                scrollOffset = value
            }

            // Blur header overlay
            if showBlurHeader {
                VStack(spacing: 0) {
                    VisualEffectBlur(blurStyle: .systemMaterial)
                        .frame(height: 44 + getSafeAreaTop())

                    Divider()
                }
                .overlay(
                    Text(title)
                        .font(.headline)
                        .padding(.top, getSafeAreaTop())
                )
                .transition(.opacity)
                .animation(.easeInOut(duration: 0.2), value: showBlurHeader)
            }
        }
        .ignoresSafeArea(edges: .top)
    }

    private func getSafeAreaTop() -> CGFloat {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }?
            .safeAreaInsets.top ?? 0
    }
}

// Preference key for scroll offset
struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

// Visual effect blur wrapper
struct VisualEffectBlur: UIViewRepresentable {
    let blurStyle: UIBlurEffect.Style

    func makeUIView(context: Context) -> UIVisualEffectView {
        UIVisualEffectView(effect: UIBlurEffect(style: blurStyle))
    }

    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {}
}
```

## Usage

```swift
import SwiftUI

struct SettingsView: View {
    var body: some View {
        BlurHeaderScrollView(title: "Settings") {
            VStack(spacing: 16) {
                ForEach(0..<20) { index in
                    HStack {
                        Image(systemName: "star.fill")
                            .foregroundColor(.yellow)
                        Text("Setting Item \(index + 1)")
                        Spacer()
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(10)
                }
            }
            .padding(.horizontal)
        }
    }
}

// With sections
struct ProfileView: View {
    var body: some View {
        BlurHeaderScrollView(title: "Profile") {
            VStack(spacing: 24) {
                // Profile header
                VStack {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 80))
                        .foregroundColor(.blue)
                    Text("John Doe")
                        .font(.title2)
                        .fontWeight(.semibold)
                    Text("john@example.com")
                        .foregroundColor(.secondary)
                }
                .padding(.vertical)

                // Settings sections
                GroupBox("Account") {
                    SettingsRow(icon: "person", title: "Personal Info")
                    SettingsRow(icon: "lock", title: "Security")
                }

                GroupBox("Preferences") {
                    SettingsRow(icon: "bell", title: "Notifications")
                    SettingsRow(icon: "moon", title: "Appearance")
                }
            }
            .padding(.horizontal)
        }
    }
}

#Preview {
    SettingsView()
}
```

## AI Prompt

> Create a SwiftUI scroll view with:
> - Large title that's visible at rest
> - Blur header that appears when scrolling up
> - Smooth opacity transition
> - Uses PreferenceKey to track scroll offset
> - Matches iOS navigation bar collapse behavior
