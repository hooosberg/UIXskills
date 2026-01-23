# Samsung One UI Design Guidelines

Samsung One UI design guidelines for creating comfortable, reachable mobile experiences optimized for large-screen Samsung devices.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/android |
| Platform | Samsung Galaxy |
| Source | [Samsung One UI](https://developer.samsung.com/one-ui) |
| License | Samsung |
| Version | One UI 6.0+ |

## 📱 One UI Design Philosophy

### Core Principles

- **Focus on Content**: 60% content area, 40% interaction area
- **One-Handed Usability**: Important actions in the bottom half
- **Visual Comfort**: Reduced visual clutter, larger touch targets
- **Natural Interaction**: Follows natural thumb reach zones

### Thumb Zone Optimization

```
┌─────────────────────────┐
│                         │  ← Content Zone (View-only)
│      CONTENT AREA       │     - Headers, images, info
│         (60%)           │     - Scroll content
│                         │
├─────────────────────────┤
│                         │  ← Interaction Zone
│   INTERACTION AREA      │     - Buttons, inputs
│         (40%)           │     - Navigation
│                         │     - Thumb-reachable
└─────────────────────────┘
```

---

## 🎛️ Components

### 1. One UI App Bar

```kotlin
// Header with large title that collapses on scroll
@Composable
fun OneUIAppBar() {
    val scrollState = rememberScrollState()

    Scaffold(
        topBar = {
            LargeTopAppBar(
                title = {
                    Text(
                        "Settings",
                        style = MaterialTheme.typography.headlineLarge
                    )
                },
                scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior()
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .verticalScroll(scrollState)
                .padding(padding)
        ) {
            // Content - pushed to top, actions at bottom
        }
    }
}
```

### 2. Bottom Action Buttons

```kotlin
@Composable
fun OneUIBottomActions() {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        // Content takes up space
        Box(modifier = Modifier.weight(1f)) {
            // Scrollable content
        }

        // Action buttons at bottom - thumb reachable
        Surface(
            tonalElevation = 3.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .padding(16.dp)
                    .fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                OutlinedButton(
                    onClick = { },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Cancel")
                }
                Button(
                    onClick = { },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Confirm")
                }
            }
        }
    }
}
```

### 3. One UI List Items

```kotlin
@Composable
fun OneUIListItem(
    title: String,
    subtitle: String? = null,
    icon: ImageVector,
    onClick: () -> Unit
) {
    ListItem(
        headlineContent = {
            Text(
                title,
                style = MaterialTheme.typography.bodyLarge
            )
        },
        supportingContent = subtitle?.let {
            { Text(it, style = MaterialTheme.typography.bodyMedium) }
        },
        leadingContent = {
            Icon(
                icon,
                contentDescription = null,
                modifier = Modifier
                    .size(40.dp)
                    .background(
                        MaterialTheme.colorScheme.primaryContainer,
                        CircleShape
                    )
                    .padding(8.dp),
                tint = MaterialTheme.colorScheme.onPrimaryContainer
            )
        },
        trailingContent = {
            Icon(Icons.Default.ChevronRight, "Navigate")
        },
        modifier = Modifier
            .clickable(onClick = onClick)
            .padding(vertical = 4.dp)
    )
}
```

### 4. Edge Panel (Side Panel)

```kotlin
// Samsung Edge Panel integration
@Composable
fun EdgePanelContent() {
    Column(
        modifier = Modifier
            .width(320.dp)
            .fillMaxHeight()
            .background(MaterialTheme.colorScheme.surface)
    ) {
        // Quick actions grid
        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            contentPadding = PaddingValues(16.dp)
        ) {
            items(quickActions) { action ->
                EdgePanelItem(action)
            }
        }
    }
}
```

---

## 🎨 Visual Design

### Color System

```kotlin
// One UI uses softer, more pastel colors
val OneUIBlue = Color(0xFF0381FE)
val OneUIGreen = Color(0xFF00A65C)
val OneUIRed = Color(0xFFFF0033)
val OneUIOrange = Color(0xFFFF7F00)

// Background colors
val OneUIBackground = Color(0xFFF7F7F7)  // Light
val OneUIBackgroundDark = Color(0xFF000000)  // True black AMOLED
```

### Typography

```kotlin
// Samsung One (default system font)
val OneUITypography = Typography(
    headlineLarge = TextStyle(
        fontSize = 28.sp,
        fontWeight = FontWeight.Bold,
        letterSpacing = 0.sp
    ),
    bodyLarge = TextStyle(
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal,
        letterSpacing = 0.15.sp
    ),
    labelLarge = TextStyle(
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        letterSpacing = 0.1.sp
    )
)
```

### Corner Radius

| Element | Radius |
|---------|--------|
| Small buttons | 12dp |
| Cards | 16dp |
| Dialogs | 24dp |
| Bottom sheets | 28dp |

---

## 📐 Layout Specifications

### Spacing Grid

```kotlin
// One UI spacing system
val OneUISpacing = object {
    val xs = 4.dp
    val sm = 8.dp
    val md = 16.dp
    val lg = 24.dp
    val xl = 32.dp
    val xxl = 48.dp
}
```

### Touch Targets

| Element | Minimum Size |
|---------|--------------|
| Icon buttons | 48dp |
| List items | 56dp height |
| Buttons | 48dp height |
| Input fields | 56dp height |

---

## 🔧 Samsung-Specific Features

### S Pen Support

```kotlin
// Detect S Pen hover
Modifier.pointerInput(Unit) {
    awaitPointerEventScope {
        while (true) {
            val event = awaitPointerEvent()
            if (event.type == PointerEventType.Enter) {
                // S Pen hovering
            }
        }
    }
}
```

### Foldable Support

```kotlin
@Composable
fun FoldableLayout() {
    val foldingFeature = LocalFoldingFeature.current

    when {
        foldingFeature?.state == FoldingFeature.State.HALF_OPENED -> {
            // Flex mode - split layout
            TwoPane(
                first = { TopContent() },
                second = { BottomContent() }
            )
        }
        else -> {
            // Normal mode
            SinglePaneLayout()
        }
    }
}
```

---

## ✅ Checklist

- [ ] **Thumb Zone**: Place primary actions in bottom 40%
- [ ] **Large Headers**: Use collapsing large headers
- [ ] **Touch Targets**: Minimum 48dp touch areas
- [ ] **AMOLED Dark**: Use true black (#000000) for dark mode
- [ ] **Rounded Corners**: Use 16-28dp corner radius
- [ ] **Edge Panel**: Consider Edge Panel integration
- [ ] **S Pen**: Support hover states for S Pen
- [ ] **Foldables**: Support Flex mode for foldable devices

---

## 📚 Resources

- [Samsung One UI Design Guidelines](https://developer.samsung.com/one-ui)
- [Samsung Developers](https://developer.samsung.com/)
- [Foldable Design](https://developer.samsung.com/galaxy-fold)
