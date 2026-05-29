import re

files_to_refactor = [
    'src/pages/homepage-settings/HomepageSettingsMaster.jsx',
    'src/pages/homepage-settings/IndustryPageSettings.jsx'
]

def fix_cards(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The opening div:
    # <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
    # <button onClick={() => handleRemoveFromArray('heroSlides', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>

    # Replace all `<div key={something} className="bg-slate-50 p-4 rounded-lg border relative...` followed by button Trash2
    # with `<FormCard key={something} onRemove={button's onClick}>`
    
    # We will use re.DOTALL to let .* match newlines if needed, but [^<]* is safer.
    pattern1 = re.compile(
        r'<div key={([^}]+)}\s*className="bg-slate-50 p-4 rounded-lg border relative[^"]*">\s*<button onClick={([^}]+)}\s*className="[^"]*Trash2[^"]*"><Trash2[^>]*></button>',
        re.DOTALL
    )
    
    def repl1(m):
        return f'<FormCard key={{{m.group(1)}}} onRemove={{{m.group(2)}}}>'
    
    content = pattern1.sub(repl1, content)
    
    pattern2 = re.compile(
        r'<div key={([^}]+)}\s*className="bg-slate-50 p-4 rounded-lg border relative[^"]*">\s*<button onClick={([^}]+)}\s*className="[^"]*text-red-500[^"]*"><Trash2[^>]*></button>',
        re.DOTALL
    )
    content = pattern2.sub(repl1, content)

    # Some cards might not have Trash2 right there, e.g. applications? 
    # Actually all of them have Trash2 right after.
    
    # Let's restore `</FormCard>` to `</div>` if they were accidentally placed without an opening tag.
    # Wait, if we replace the opening tag correctly, `</FormCard>` is correct!
    
    # But wait! I also noticed in `HomepageSettingsMaster.jsx` line 175:
    # <div className="md:col-span-2 flex gap-2">
    #    <FormInput label="Image URL" placeholder="Image URL" value={slide.image || ''} onChange={...} />
    #    <button onClick={() => openMediaPicker(...)} className="..."><Image size={16}/></button>
    # </div>
    # My previous script FAILED to replace this with ImageInput because FormInput was already replaced!
    # Let's fix that now!
    
    img_pattern = re.compile(
        r'<div className="[^"]*flex gap-2[^"]*">\s*<FormInput label="Image URL"[^>]*value={([^}]+)}\s*onChange={([^}]+)}\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>',
        re.DOTALL
    )
    def repl_img(m):
        return f'<ImageInput label="Image" value={{{m.group(1)}}} onChange={{{m.group(2)}}} onChoose={{{m.group(3)}}} className="md:col-span-2" />'
    content = img_pattern.sub(repl_img, content)

    # Another img pattern:
    img_pattern2 = re.compile(
        r'<div className="[^"]*flex gap-2[^"]*">\s*<input type="text" placeholder="Image URL" value={([^}]+)}\s*onChange={([^}]+)}\s*className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/></button>\s*</div>',
        re.DOTALL
    )
    content = img_pattern2.sub(repl_img, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed cards in {file_path}")

for f in files_to_refactor:
    fix_cards(f)
