import os
import re
import urllib.parse
import sys

def get_all_images(uploads_dir):
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp'}
    images = {}
    for root, dirs, files in os.walk(uploads_dir):
        # Ignore matplotlib directory as it is managed by the MkDocs hook
        if 'matplotlib' in root.split(os.sep):
            continue
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in image_extensions:
                full_path = os.path.join(root, file)
                images[file] = full_path
    return images

def scan_references(project_root):
    referenced_basenames = set()
    
    # We will scan all files with these extensions
    text_extensions = {'.md', '.yml', '.yaml', '.html', '.css', '.js'}
    
    for root, dirs, files in os.walk(project_root):
        # Exclude build output (site) and cache directories
        if any(p in root.split(os.sep) for p in ['site', '.git', '__pycache__', '.gemini']):
            continue
            
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in text_extensions:
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                        # Extract any potential word/filename patterns to speed up or match
                        # We also search for decoded URLs
                        content_decoded = urllib.parse.unquote(content)
                        
                        # Store the raw and decoded contents to match against
                        # We will check references against these
                        yield content, content_decoded
                except Exception as e:
                    print(f"Error reading {filepath}: {e}", file=sys.stderr)

def main():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    uploads_dir = os.path.join(project_root, 'docs', 'uploads')
    
    if not os.path.exists(uploads_dir):
        print(f"Uploads directory not found: {uploads_dir}")
        return
        
    print("Scanning uploads directory...")
    images = get_all_images(uploads_dir)
    print(f"Found {len(images)} total images in uploads.")
    
    unused_images = set(images.keys())
    
    print("Scanning project files for references...")
    for content, content_decoded in scan_references(project_root):
        if not unused_images:
            break
            
        found = set()
        for img in unused_images:
            # Check if the filename or its url-encoded version is referenced
            img_encoded = urllib.parse.quote(img)
            
            # Match raw or decoded content
            if (img in content or 
                img_encoded in content or 
                img in content_decoded):
                found.add(img)
                
        unused_images -= found
        
    print("\n--- RESULTS ---")
    if not unused_images:
        print("All images are currently in use. No files to delete.")
        return
        
    print(f"Found {len(unused_images)} unused images:")
    total_savings = 0
    for img in sorted(unused_images):
        path = images[img]
        size = os.path.getsize(path)
        total_savings += size
        print(f"- {img} ({size / 1024:.1f} KB)")
        
    print(f"\nTotal potential space savings: {total_savings / (1024*1024):.2f} MB")
    
    # Perform deletion
    confirm = input("Do you want to delete these unused images? (yes/no): ").strip().lower()
    if confirm == 'yes':
        deleted_count = 0
        for img in unused_images:
            try:
                os.remove(images[img])
                deleted_count += 1
            except Exception as e:
                print(f"Failed to delete {img}: {e}")
        print(f"Successfully deleted {deleted_count} files.")
    else:
        print("Deletion cancelled.")

if __name__ == '__main__':
    main()
