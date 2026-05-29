import re
import os

files_to_refactor = [
    'src/pages/homepage-settings/HomepageSettingsMaster.jsx',
    'src/pages/homepage-settings/IndustryPageSettings.jsx'
]

def revert_formcard(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change all </FormCard> back to </div>
    content = content.replace('</FormCard>', '</div>')

    # Change <FormCard ...> to a standard div
    # Example: <FormCard key={idx} onRemove={() => handleRemoveFromArray('heroSlides', idx)}>
    # We want: 
    # <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">
    #   <button onClick={() => handleRemoveFromArray('heroSlides', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>

    pattern = re.compile(r'<FormCard\s+key={([^}]+)}\s+onRemove={([^}]+)}>', re.DOTALL)
    def repl(m):
        return f'<div key={{{m.group(1)}}} className="bg-slate-50 p-4 rounded-lg border relative grid grid-cols-1 md:grid-cols-2 gap-3">\n                                <button onClick={{{m.group(2)}}} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={{18}}/></button>'
    
    content = pattern.sub(repl, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Reverted FormCards in {file_path}")

for f in files_to_refactor:
    revert_formcard(f)
