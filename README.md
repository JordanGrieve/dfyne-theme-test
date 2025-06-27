# 🧪 Shopify Theme Developer Test – Variant Picker (Dawn)

### Objective:
Replicate the **color variant picker** component from this live product:
🔗 https://dfyne.com/collections/defy/products/dfyne-defy-red-crop-top-250401

---

### 📋 Requirements:
- Use the [Shopify Dawn Theme](https://github.com/Shopify/dawn)
- Do **not** rebuild the full product page — only the **variant picker UI**
- Replicate the same **hover, active, and selected behavior**
- Must be:
  - Fully responsive (mobile and desktop)
  - Integrated using **Liquid + CSS + JS**
  - Fully functional (changes the selected variant)

---

### 🧩 Start Here
A placeholder snippet has been added at:
```
snippets/variant-picker.liquid
```

You're encouraged to implement your custom color selector here and render it in `main-product.liquid` using:
```liquid
{% render 'variant-picker', product: product %}
```

---

### 🎯 What We’re Looking For
- How you approach **problem solving** and inspect existing websites
- How you organize and structure your code
- Your **thought process** in reverse engineering a UI
- Use of native Shopify theme tools (Liquid, CSS, JS)
- Clean, maintainable code with responsive styling

---

### 🕒 Time Limit
2 days maximum

---

### 📦 Submission
- Fork the Dawn theme, make your changes, and share the GitHub link
