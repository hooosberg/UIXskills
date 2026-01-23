# macOS Design Guidelines

Native Apple macOS design skill for creating productive desktop applications following Human Interface Guidelines.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/apple |
| Platform | macOS / Mac |
| Source | [Apple HIG - macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) |
| License | MIT |
| Version | macOS 14+ (Sonoma) |

## 🖥️ macOS Design Principles

### Core Philosophy

- **Powerful**: Full-featured, professional tools
- **Precise**: Pixel-perfect pointer control
- **Productive**: Keyboard shortcuts, multiple windows
- **Flexible**: Customizable workspaces

---

## 🪟 Window Management

### Window Styles

```swift
@main
struct MyApp: App {
    var body: some Scene {
        // Standard window with toolbar
        WindowGroup {
            ContentView()
        }
        .windowStyle(.automatic)
        .windowToolbarStyle(.unified)

        // Settings window
        Settings {
            SettingsView()
        }

        // Utility panel
        Window("Inspector", id: "inspector") {
            InspectorView()
        }
        .windowStyle(.hiddenTitleBar)
        .defaultSize(width: 300, height: 500)
    }
}
```

### Toolbar

```swift
struct ContentView: View {
    var body: some View {
        NavigationSplitView {
            Sidebar()
        } detail: {
            DetailView()
        }
        .toolbar {
            ToolbarItemGroup(placement: .primaryAction) {
                Button(action: {}) {
                    Label("Add", systemImage: "plus")
                }
                Button(action: {}) {
                    Label("Share", systemImage: "square.and.arrow.up")
                }
            }

            ToolbarItem(placement: .navigation) {
                Button(action: {}) {
                    Label("Back", systemImage: "chevron.left")
                }
            }
        }
        .navigationTitle("Documents")
    }
}
```

---

## 📋 Menu Bar

### App Menus

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .commands {
            // Replace default commands
            CommandGroup(replacing: .newItem) {
                Button("New Document") {
                    // Action
                }
                .keyboardShortcut("n", modifiers: .command)
            }

            // Add custom menu
            CommandMenu("View") {
                Button("Show Sidebar") {
                    // Toggle sidebar
                }
                .keyboardShortcut("s", modifiers: [.command, .control])

                Divider()

                Toggle("Dark Mode", isOn: $isDarkMode)
            }
        }
    }
}
```

### Menu Bar Extra (Status Item)

```swift
@main
struct MyApp: App {
    var body: some Scene {
        MenuBarExtra("My App", systemImage: "star.fill") {
            Button("Quick Action") { }
            Divider()
            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q")
        }
        .menuBarExtraStyle(.menu) // or .window for popover
    }
}
```

---

## ⌨️ Keyboard Navigation

### Focus Management

```swift
struct FormView: View {
    @FocusState private var focusedField: Field?

    enum Field {
        case name, email, message
    }

    var body: some View {
        Form {
            TextField("Name", text: $name)
                .focused($focusedField, equals: .name)

            TextField("Email", text: $email)
                .focused($focusedField, equals: .email)

            TextEditor(text: $message)
                .focused($focusedField, equals: .message)
        }
        .onSubmit {
            switch focusedField {
            case .name: focusedField = .email
            case .email: focusedField = .message
            case .message: submit()
            case nil: break
            }
        }
    }
}
```

### Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘N | New |
| ⌘O | Open |
| ⌘S | Save |
| ⌘W | Close Window |
| ⌘Q | Quit |
| ⌘Z | Undo |
| ⌘⇧Z | Redo |
| ⌘C/V/X | Copy/Paste/Cut |
| ⌘, | Preferences |

---

## 🎨 Visual Design

### Vibrancy & Materials

```swift
// Sidebar with vibrancy
List {
    // Content
}
.listStyle(.sidebar)
.background(.ultraThinMaterial)

// Window background
.background(VisualEffectView(material: .sidebar))
```

### System Colors

```swift
// Accent colors
Color.accentColor  // User's chosen accent color
Color.controlAccentColor

// Text colors
Color.primary
Color.secondary
Color.labelColor

// Background
Color(.windowBackgroundColor)
Color(.controlBackgroundColor)
Color(.textBackgroundColor)
```

### Typography

```swift
// macOS system fonts
Text("Title")
    .font(.largeTitle)  // 26pt

Text("Headline")
    .font(.headline)    // 13pt semibold

Text("Body")
    .font(.body)        // 13pt

Text("Caption")
    .font(.caption)     // 10pt
```

---

## 🔲 Controls

### Native macOS Controls

```swift
VStack(alignment: .leading, spacing: 12) {
    // Segmented control
    Picker("View", selection: $viewMode) {
        Text("List").tag(0)
        Text("Grid").tag(1)
    }
    .pickerStyle(.segmented)

    // Pop-up button
    Picker("Sort by", selection: $sortOrder) {
        Text("Name").tag(0)
        Text("Date").tag(1)
    }
    .pickerStyle(.menu)

    // Checkbox
    Toggle("Show hidden files", isOn: $showHidden)
        .toggleStyle(.checkbox)

    // Radio buttons
    Picker("Size", selection: $size) {
        Text("Small").tag(0)
        Text("Medium").tag(1)
        Text("Large").tag(2)
    }
    .pickerStyle(.radioGroup)
}
```

### Table View

```swift
struct DataTable: View {
    @State private var selection = Set<Item.ID>()
    @State private var sortOrder = [KeyPathComparator(\Item.name)]

    var body: some View {
        Table(items, selection: $selection, sortOrder: $sortOrder) {
            TableColumn("Name", value: \.name)
            TableColumn("Date", value: \.date) { item in
                Text(item.date, style: .date)
            }
            TableColumn("Size", value: \.size) { item in
                Text(ByteCountFormatter().string(fromByteCount: item.size))
            }
        }
        .contextMenu(forSelectionType: Item.ID.self) { items in
            Button("Open") { }
            Button("Delete") { }
        }
    }
}
```

---

## 📐 Layout

### Inspector Panel

```swift
struct MainView: View {
    @State private var showInspector = true

    var body: some View {
        ContentView()
            .inspector(isPresented: $showInspector) {
                InspectorView()
                    .inspectorColumnWidth(min: 200, ideal: 250, max: 300)
            }
            .toolbar {
                ToolbarItem {
                    Button(action: { showInspector.toggle() }) {
                        Label("Inspector", systemImage: "sidebar.right")
                    }
                }
            }
    }
}
```

---

## ✅ Checklist

- [ ] **Menu Bar**: Provide standard Edit, View, Window menus
- [ ] **Keyboard Shortcuts**: Implement all standard shortcuts
- [ ] **Multiple Windows**: Support document-based architecture
- [ ] **Toolbar**: Use `.toolbar` with appropriate placements
- [ ] **Sidebar**: Use `NavigationSplitView` for navigation
- [ ] **Right-click**: Add context menus everywhere
- [ ] **Drag & Drop**: Support file and content dragging
- [ ] **Full Screen**: Support native full screen mode
- [ ] **Touch Bar**: Provide Touch Bar controls if applicable

---

## 📚 Resources

- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
