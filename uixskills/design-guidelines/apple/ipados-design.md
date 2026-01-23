# iPadOS Design Guidelines

Native Apple iPadOS design skill for creating adaptive, productive iPad applications following Human Interface Guidelines.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/apple |
| Platform | iPadOS / iPad |
| Source | [Apple HIG - iPadOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados) |
| License | MIT |
| Version | iPadOS 17+ |

## 📱 iPad-Specific Design Principles

### Multitasking Support

iPadOS apps must support multiple window configurations:

- **Full Screen**: Single app fills the screen
- **Split View**: Two apps side by side (50/50, 70/30, 30/70)
- **Slide Over**: Compact app overlaying another
- **Stage Manager**: Multiple resizable windows

```swift
// Detect current size class
@Environment(\.horizontalSizeClass) var horizontalSizeClass
@Environment(\.verticalSizeClass) var verticalSizeClass

var body: some View {
    if horizontalSizeClass == .regular {
        // iPad regular layout - sidebar + content
        NavigationSplitView {
            SidebarView()
        } content: {
            ContentListView()
        } detail: {
            DetailView()
        }
    } else {
        // Compact layout - stack navigation
        NavigationStack {
            ContentListView()
        }
    }
}
```

---

## 🎛️ Navigation Patterns

### 1. Three-Column Layout (Mail/Notes Style)

```swift
struct ThreeColumnLayout: View {
    @State private var selectedFolder: Folder?
    @State private var selectedItem: Item?

    var body: some View {
        NavigationSplitView {
            // Sidebar - folders/categories
            List(folders, selection: $selectedFolder) { folder in
                Label(folder.name, systemImage: folder.icon)
            }
            .navigationTitle("Folders")
        } content: {
            // Content list
            if let folder = selectedFolder {
                List(folder.items, selection: $selectedItem) { item in
                    ItemRow(item: item)
                }
                .navigationTitle(folder.name)
            }
        } detail: {
            // Detail view
            if let item = selectedItem {
                ItemDetailView(item: item)
            } else {
                ContentUnavailableView(
                    "Select an Item",
                    systemImage: "doc.text",
                    description: Text("Choose an item to view details")
                )
            }
        }
        .navigationSplitViewStyle(.balanced)
    }
}
```

### 2. Sidebar with Tab Selection

```swift
struct SidebarNavigation: View {
    @State private var selection: NavigationItem = .home

    var body: some View {
        NavigationSplitView {
            List(NavigationItem.allCases, selection: $selection) { item in
                Label(item.title, systemImage: item.icon)
            }
            .listStyle(.sidebar)
            .navigationTitle("App Name")
        } detail: {
            switch selection {
            case .home: HomeView()
            case .library: LibraryView()
            case .settings: SettingsView()
            }
        }
    }
}
```

---

## 🖱️ Pointer & Keyboard Support

### Hover Effects

```swift
struct HoverableCard: View {
    @State private var isHovered = false

    var body: some View {
        VStack {
            // Card content
        }
        .background(isHovered ? Color.blue.opacity(0.1) : Color.clear)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .onHover { hovering in
            withAnimation(.easeInOut(duration: 0.15)) {
                isHovered = hovering
            }
        }
        // Pointer lift effect
        .hoverEffect(.lift)
    }
}
```

### Keyboard Shortcuts

```swift
struct ContentView: View {
    var body: some View {
        NavigationStack {
            ContentList()
        }
        .keyboardShortcut("n", modifiers: .command) // ⌘N for new
        .keyboardShortcut("f", modifiers: .command) // ⌘F for search
    }
}

// Menu bar commands
struct AppCommands: Commands {
    var body: some Commands {
        CommandMenu("Edit") {
            Button("New Item") { }
                .keyboardShortcut("n", modifiers: .command)
            Button("Delete") { }
                .keyboardShortcut(.delete, modifiers: .command)
        }
    }
}
```

---

## 📐 Layout Specifications

### Sidebar Width

```swift
NavigationSplitView(columnVisibility: $visibility) {
    SidebarView()
        .navigationSplitViewColumnWidth(min: 200, ideal: 250, max: 300)
} detail: {
    DetailView()
}
```

### Grid Layouts

```swift
// Adaptive grid for different screen sizes
LazyVGrid(columns: [
    GridItem(.adaptive(minimum: 200, maximum: 300))
], spacing: 20) {
    ForEach(items) { item in
        ItemCard(item: item)
    }
}
.padding()
```

---

## ✏️ Apple Pencil Support

### Drawing Canvas

```swift
import PencilKit

struct DrawingView: UIViewRepresentable {
    @Binding var canvasView: PKCanvasView

    func makeUIView(context: Context) -> PKCanvasView {
        canvasView.tool = PKInkingTool(.pen, color: .black, width: 10)
        canvasView.drawingPolicy = .pencilOnly // or .anyInput
        return canvasView
    }

    func updateUIView(_ uiView: PKCanvasView, context: Context) {}
}
```

### Scribble Support

```swift
TextField("Notes", text: $text)
    .textContentType(.none) // Enable Scribble
```

---

## 🎨 Visual Design

### Corner Radius Scale

| Element | Corner Radius |
|---------|---------------|
| Small buttons | 8pt |
| Cards | 12pt |
| Modals | 16pt |
| Large panels | 20pt |

### Spacing System

| Context | Spacing |
|---------|---------|
| Grid gap | 20pt |
| Section padding | 24pt |
| Content margins | 20-40pt |

---

## ✅ Checklist

- [ ] **Adaptive Layout**: Use `NavigationSplitView` for sidebar patterns
- [ ] **Size Classes**: Handle `.regular` and `.compact` layouts
- [ ] **Pointer Support**: Add hover effects with `.hoverEffect()`
- [ ] **Keyboard Shortcuts**: Implement common ⌘ shortcuts
- [ ] **Apple Pencil**: Support drawing and Scribble where appropriate
- [ ] **Multitasking**: Test in Split View and Slide Over
- [ ] **Drag & Drop**: Enable content transfer between apps
- [ ] **External Display**: Support screen mirroring and extended display

---

## 📚 Resources

- [Designing for iPadOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados)
- [Pointer Interactions](https://developer.apple.com/design/human-interface-guidelines/pointing-devices)
- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking)
