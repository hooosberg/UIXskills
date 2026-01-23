# iOS Settings Row

Native iOS settings row component matching Apple Human Interface Guidelines. Includes icon, label, and navigation chevron.

## Overview

| Field | Value |
|-------|-------|
| Category | swiftui |
| Tech Base | SwiftUI |
| Source | Apple Human Interface Guidelines |
| License | MIT |
| Dependencies | SwiftUI |

## Features

- Matches native iOS Settings app design
- Colored icon with rounded background
- Optional subtitle text
- Navigation chevron indicator
- Works with List and Form

## Code

```swift
import SwiftUI

struct SettingsRow: View {
    let icon: String
    let iconColor: Color
    let title: String
    var subtitle: String? = nil
    var showChevron: Bool = true

    var body: some View {
        HStack(spacing: 12) {
            // Icon with colored background
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundColor(.white)
                .frame(width: 28, height: 28)
                .background(iconColor)
                .clipShape(RoundedRectangle(cornerRadius: 6))

            // Title and optional subtitle
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.body)
                    .foregroundColor(.primary)

                if let subtitle = subtitle {
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            // Navigation chevron
            if showChevron {
                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.gray.opacity(0.5))
            }
        }
        .padding(.vertical, 4)
    }
}
```

## Usage

```swift
import SwiftUI

struct SettingsView: View {
    var body: some View {
        NavigationView {
            List {
                // Profile section
                Section {
                    NavigationLink(destination: ProfileView()) {
                        SettingsRow(
                            icon: "person.fill",
                            iconColor: .gray,
                            title: "Apple ID",
                            subtitle: "iCloud, Media & Purchases"
                        )
                    }
                }

                // Connectivity section
                Section {
                    SettingsRow(
                        icon: "airplane",
                        iconColor: .orange,
                        title: "Airplane Mode",
                        showChevron: false
                    )

                    NavigationLink(destination: WiFiView()) {
                        SettingsRow(
                            icon: "wifi",
                            iconColor: .blue,
                            title: "Wi-Fi",
                            subtitle: "Home Network"
                        )
                    }

                    NavigationLink(destination: CellularView()) {
                        SettingsRow(
                            icon: "antenna.radiowaves.left.and.right",
                            iconColor: .green,
                            title: "Cellular"
                        )
                    }
                }

                // Notifications section
                Section {
                    NavigationLink(destination: NotificationsView()) {
                        SettingsRow(
                            icon: "bell.badge.fill",
                            iconColor: .red,
                            title: "Notifications"
                        )
                    }

                    NavigationLink(destination: SoundsView()) {
                        SettingsRow(
                            icon: "speaker.wave.3.fill",
                            iconColor: .pink,
                            title: "Sounds & Haptics"
                        )
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Settings")
        }
    }
}

#Preview {
    SettingsView()
}
```

## AI Prompt

> Create a SwiftUI settings row component with:
> - SF Symbol icon with colored rounded background
> - Title and optional subtitle text
> - Optional navigation chevron
> - Matches iOS Settings app visual style
> - Works with List and NavigationLink
