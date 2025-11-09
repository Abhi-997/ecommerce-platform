# Product Images Folder

Place your jersey and boot images in this folder.

## How to add your images:

1. **Copy your jersey photos** into this folder (`client/public/images/`)

2. **Name your images** (examples):
   - `barcelona-jersey.jpg`
   - `realmadrid-jersey.jpg`
   - `manutd-jersey.jpg`
   - `liverpool-jersey.jpg`
   - Or any name you prefer!

3. **Update the product entries** in `server/routes/products.js`:
   - Change the `image` field to match your filename
   - Example: `image: '/images/your-jersey-photo.jpg'`

## Supported image formats:
- .jpg / .jpeg
- .png
- .webp

## Image recommendations:
- Recommended size: 800x800px or larger
- Aspect ratio: Square (1:1) works best
- File size: Keep under 2MB for faster loading

## Example:
If you have a photo named `my-barcelona-jersey.png`, update the product like this:
```javascript
{
  id: 1,
  name: 'Barcelona Home Jersey 2024',
  image: '/images/my-barcelona-jersey.png',
  // ... rest of product data
}
```

Note: The path `/images/` refers to this folder in the public directory.

