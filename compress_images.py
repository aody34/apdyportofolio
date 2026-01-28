import os
from PIL import Image

def compress_images():
    directory = r"d:\hqshs\Desktop\apdyportofolio\public"
    files = ["landing-bg.png", "memeradar-bg.png", "portfolio-bg.png"]
    
    for file in files:
        path = os.path.join(directory, file)
        if os.path.exists(path):
            try:
                print(f"Compressing {file}...")
                img = Image.open(path)
                # Resize if too massive (optional, but good for Hero)
                if img.width > 1920:
                    ratio = 1920 / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
                
                # Save as optimized, slightly lower quality to get under 500KB
                # Keeping PNG but optimizing, or converting to WebP would be better but user logic checks extension?
                # User asked to convert to .webp or .avif. Let's convert to .webp.
                
                webp_path = os.path.splitext(path)[0] + ".webp"
                img.save(webp_path, "WEBP", quality=85)
                print(f"Saved {webp_path}")
                
                # Verify size
                size = os.path.getsize(webp_path)
                print(f"New size: {size/1024:.2f} KB")
                
            except Exception as e:
                print(f"Error compressing {file}: {e}")

if __name__ == "__main__":
    compress_images()
