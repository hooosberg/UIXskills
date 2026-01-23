# Console & PC Game UI Design

Design guidelines for creating immersive UI experiences for console (PlayStation, Xbox, Nintendo) and PC games.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/gaming |
| Platform | Console & PC |
| Source | Platform Guidelines |
| License | MIT |
| Platforms | PS5, Xbox, Switch, PC |

## 🎮 Platform-Specific Considerations

### Input Methods

| Platform | Primary Input | Secondary |
|----------|--------------|-----------|
| PlayStation | DualSense | Touch pad |
| Xbox | Controller | Voice (Cortana) |
| Nintendo | Joy-Con / Pro | Motion, Touch |
| PC | Mouse + Keyboard | Controller |

### Safe Zones

```
┌─────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────┐ │
│ │  ┌─────────────────────────────────────┐    │ │
│ │  │                                     │    │ │
│ │  │      TITLE SAFE ZONE (90%)         │    │ │
│ │  │      Critical UI elements          │    │ │
│ │  │                                     │    │ │
│ │  └─────────────────────────────────────┘    │ │
│ │        ACTION SAFE ZONE (95%)               │ │
│ │        Important gameplay elements          │ │
│ └─────────────────────────────────────────────┘ │
│            SCREEN EDGE (100%)                   │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Controller Navigation

### Focus System

```csharp
// Unity example - Focus navigation
public class UIFocusManager : MonoBehaviour
{
    public Selectable defaultSelection;
    private Selectable currentSelection;

    void Start()
    {
        EventSystem.current.SetSelectedGameObject(defaultSelection.gameObject);
    }

    void Update()
    {
        // Handle controller input
        if (Input.GetButtonDown("Submit"))
        {
            currentSelection?.OnSubmit(null);
        }

        if (Input.GetButtonDown("Cancel"))
        {
            OnBackPressed();
        }
    }

    // Visual feedback for focused element
    public void OnFocusChanged(Selectable newSelection)
    {
        // Animate focus indicator
        focusIndicator.DOMove(newSelection.transform.position, 0.15f)
            .SetEase(Ease.OutQuad);

        // Play focus sound
        AudioManager.Play("UI_Focus");
    }
}
```

### Focus Indicators

```css
/* Focus states for controller navigation */
.menu-item {
    transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.menu-item:focus {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    outline: 3px solid white;
}

.menu-item:focus::before {
    content: "▶";
    position: absolute;
    left: -30px;
    animation: pulse 0.8s infinite;
}
```

---

## 📺 Living Room Optimization (10-foot UI)

### Typography Scale

| Element | Size | Distance |
|---------|------|----------|
| Title | 48-72px | Readable at 10ft |
| Heading | 32-48px | Menu headers |
| Body | 24-32px | Descriptions |
| Caption | 18-24px | Secondary info |

### Contrast & Readability

```csharp
// Ensure high contrast for TV viewing
public static class UIColors
{
    // High contrast text
    public static Color TextPrimary = Color.white;
    public static Color TextSecondary = new Color(0.8f, 0.8f, 0.8f);

    // Backgrounds with sufficient contrast
    public static Color PanelDark = new Color(0.1f, 0.1f, 0.1f, 0.9f);
    public static Color PanelMedium = new Color(0.2f, 0.2f, 0.2f, 0.85f);

    // Focus/selection
    public static Color FocusHighlight = new Color(0.2f, 0.6f, 1f);
    public static Color SelectionGlow = new Color(1f, 1f, 1f, 0.3f);
}
```

---

## 🖥️ PC-Specific Features

### Mouse Hover States

```csharp
public class PCButtonHover : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public void OnPointerEnter(PointerEventData eventData)
    {
        // Highlight on hover
        GetComponent<Image>().color = hoverColor;

        // Show tooltip
        TooltipManager.Show(tooltipText, transform.position);

        // Cursor change
        Cursor.SetCursor(hoverCursor, Vector2.zero, CursorMode.Auto);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        GetComponent<Image>().color = normalColor;
        TooltipManager.Hide();
        Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);
    }
}
```

### Keyboard Shortcuts

```csharp
// Display keyboard shortcuts in UI
public class KeybindDisplay : MonoBehaviour
{
    [SerializeField] private string action;
    private TextMeshProUGUI keyText;

    void UpdateDisplay()
    {
        string key = InputManager.GetKeyForAction(action);
        keyText.text = $"[{key}]";
    }
}

// Common PC game shortcuts
// ESC - Pause/Back
// TAB - Inventory/Map
// I - Inventory
// M - Map
// J - Journal/Quests
// F - Interact
// E - Use
// Q/E - Lean (shooter)
// 1-9 - Quick slots
```

---

## 🎨 UI Animation

### Menu Transitions

```csharp
// Smooth menu transitions
public class MenuAnimator : MonoBehaviour
{
    public void ShowMenu(GameObject menu)
    {
        menu.SetActive(true);

        // Fade in background
        menu.GetComponent<CanvasGroup>().DOFade(1f, 0.3f);

        // Slide in from side
        menu.transform.DOLocalMoveX(0, 0.4f)
            .From(-200)
            .SetEase(Ease.OutQuart);

        // Stagger menu items
        var items = menu.GetComponentsInChildren<MenuItem>();
        for (int i = 0; i < items.Length; i++)
        {
            items[i].transform.DOScale(1f, 0.3f)
                .From(0.8f)
                .SetDelay(i * 0.05f)
                .SetEase(Ease.OutBack);
        }
    }
}
```

### Button Press Feedback

```csharp
public class ButtonFeedback : MonoBehaviour
{
    public void OnPress()
    {
        // Scale punch
        transform.DOPunchScale(Vector3.one * -0.1f, 0.15f);

        // Color flash
        GetComponent<Image>().DOColor(pressColor, 0.05f)
            .OnComplete(() => GetComponent<Image>().DOColor(normalColor, 0.1f));

        // Sound
        AudioManager.Play("UI_Click");

        // Controller rumble (if available)
        if (Gamepad.current != null)
        {
            Gamepad.current.SetMotorSpeeds(0.1f, 0.1f);
            DOVirtual.DelayedCall(0.1f, () => Gamepad.current.SetMotorSpeeds(0, 0));
        }
    }
}
```

---

## 🏆 Common UI Patterns

### Radial Menu (Controller-Friendly)

```csharp
public class RadialMenu : MonoBehaviour
{
    public int segments = 8;
    public float radius = 150f;

    private int selectedIndex = -1;

    void Update()
    {
        // Get stick input
        Vector2 input = new Vector2(
            Input.GetAxis("Horizontal"),
            Input.GetAxis("Vertical")
        );

        if (input.magnitude > 0.5f)
        {
            // Calculate angle and segment
            float angle = Mathf.Atan2(input.y, input.x) * Mathf.Rad2Deg;
            selectedIndex = Mathf.FloorToInt((angle + 180) / (360f / segments));
            HighlightSegment(selectedIndex);
        }
    }
}
```

### Dialog Box

```csharp
public class DialogBox : MonoBehaviour
{
    public TextMeshProUGUI speakerName;
    public TextMeshProUGUI dialogText;
    public Image portrait;

    public IEnumerator TypeText(string text, float speed = 0.03f)
    {
        dialogText.text = "";

        foreach (char c in text)
        {
            dialogText.text += c;
            AudioManager.Play("Text_Blip");

            // Skip on button press
            if (Input.GetButtonDown("Submit"))
            {
                dialogText.text = text;
                yield break;
            }

            yield return new WaitForSeconds(speed);
        }
    }
}
```

---

## ✅ Checklist

- [ ] **Safe Zones**: Stay within 90% for critical UI
- [ ] **Focus System**: Clear visual focus for controller navigation
- [ ] **10-foot UI**: Readable from couch distance
- [ ] **Input Icons**: Show correct icons (PlayStation/Xbox/PC)
- [ ] **Remappable Controls**: Allow key rebinding on PC
- [ ] **HDR Support**: Handle HDR displays properly
- [ ] **Accessibility**: Subtitles, colorblind modes, UI scaling
- [ ] **Loading States**: Show progress, tips during loads

---

## 📚 Resources

- [PlayStation Partner Portal](https://partners.playstation.net/)
- [Xbox Accessibility Guidelines](https://docs.microsoft.com/gaming/accessibility/)
- [Nintendo Developer Portal](https://developer.nintendo.com/)
