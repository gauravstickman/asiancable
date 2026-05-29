import re
import os

files_to_refactor = [
    'src/pages/homepage-settings/HomepageSettingsMaster.jsx',
    'src/pages/homepage-settings/IndustryPageSettings.jsx'
]

def clean_refactor(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to extract the structure safely. 
    # Instead of regexing everything, let's just do a clean replacement of standard patterns.
    # 1. Imports
    if "import { FormInput" not in content:
        content = content.replace(
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';",
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput, FormCard } from '../../components/admin/FormComponents';"
        )
        content = content.replace(
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';",
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput, FormCard } from '../../components/admin/FormComponents';"
        )

    # 2. Form Inputs
    input_regex = re.compile(r'<input type="?text"?\s+placeholder="([^"]+)"\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>')
    def repl_input(m):
        label = re.sub(r'\s*\([^)]*\)', '', m.group(1))
        return f'<FormInput label="{label}" placeholder="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = input_regex.sub(repl_input, content)

    # type="number"
    number_regex = re.compile(r'<input type="?number"?\s+placeholder="([^"]+)"\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>')
    def repl_number(m):
        label = re.sub(r'\s*\([^)]*\)', '', m.group(1))
        return f'<FormInput type="number" label="{label}" placeholder="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = number_regex.sub(repl_number, content)

    # 3. Form Textarea
    textarea_regex = re.compile(r'<textarea(?: rows="?(\d+)"?)?\s+placeholder="([^"]+)"(?:\s+rows="?(\d+)"?)?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"></textarea>')
    def repl_textarea(m):
        rows = m.group(1) or m.group(3) or '3'
        label = re.sub(r'\s*\([^)]*\)', '', m.group(2))
        return f'<FormTextarea label="{label}" placeholder="{m.group(2)}" rows={{{rows}}} value={{{m.group(4)}}} onChange={{{m.group(5)}}} className="md:col-span-2" />'
    content = textarea_regex.sub(repl_textarea, content)

    # 4. Labeled Inputs
    labeled_input_regex = re.compile(r'<label className="[^"]*">([^<]+)</label>\s*<input type="?text"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>')
    def repl_labeled(m):
        return f'<FormInput label="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = labeled_input_regex.sub(repl_labeled, content)

    labeled_textarea_regex = re.compile(r'<label className="[^"]*">([^<]+)</label>\s*<textarea rows="?(\d+)"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"></textarea>')
    def repl_labeled_textarea(m):
        return f'<FormTextarea label="{m.group(1)}" rows={{{m.group(2)}}} value={{{m.group(3)}}} onChange={{{m.group(4)}}} className="md:col-span-2" />'
    content = labeled_textarea_regex.sub(repl_labeled_textarea, content)

    labeled_image_regex = re.compile(r'<label className="[^"]*">([^<]+)</label>\s*<div className="flex gap-2">\s*<input type="text" value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/> Choose</button>\s*</div>')
    def repl_labeled_img(m):
        return f'<ImageInput label="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} onChoose={{{m.group(4)}}} className="md:col-span-2" />'
    content = labeled_image_regex.sub(repl_labeled_img, content)

    # 5. FormCards (repeater wrappers)
    # The structure: 
    # <div key={idx} className="...">
    #   <button onClick={...} className="... Trash ..."><Trash2 .../></button>
    card_regex1 = re.compile(r'<div key={([^}]+)}\s*className="bg-slate-50 p-4 rounded-lg border relative[^"]*">\s*<button onClick={([^}]+)}\s*className="[^"]*text-red-500[^"]*"><Trash2[^>]*></button>', re.DOTALL)
    def repl_card1(m):
        return f'<FormCard key={{{m.group(1)}}} onRemove={{{m.group(2)}}}>'
    content = card_regex1.sub(repl_card1, content)
    
    # 6. We must close FormCard! We replace the div closing the map function.
    # Often it looks like:
    #     </div>
    # ))}
    # But wait! If we have inner divs (like the image input), we don't want to replace them.
    # A safe way is to replace `</div>\n                                ))} ` with `</FormCard>\n                                ))} `
    # Or just `</div>\s*\)\)}` with `</FormCard>\n))} `
    content = re.sub(r'</div>(\s*\)\)})', r'</FormCard>\1', content)

    # Let's fix the ImageInput combinations which have internal divs.
    img_pattern1 = re.compile(r'<div className="[^"]*flex gap-2[^"]*">\s*<FormInput label="Image URL"[^>]*value={([^}]+)}\s*onChange={([^}]+)}\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>', re.DOTALL)
    def repl_img(m):
        return f'<ImageInput label="Image" value={{{m.group(1)}}} onChange={{{m.group(2)}}} onChoose={{{m.group(3)}}} className="md:col-span-2" />'
    content = img_pattern1.sub(repl_img, content)

    img_pattern2 = re.compile(r'<div className="[^"]*flex gap-2[^"]*">\s*<input type="text" placeholder="Image URL" value={([^}]+)}\s*onChange={([^}]+)}\s*className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/></button>\s*</div>', re.DOTALL)
    content = img_pattern2.sub(repl_img, content)

    # Let's also make sure we remove the extra syntax error divs that were there originally:
    # "</div></div></div>" before ")}"
    # Let's just fix it properly:
    # If there's an extra div, we can just remove it.
    
    # We will write out the file.
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Clean refactored {file_path}")

for f in files_to_refactor:
    clean_refactor(f)
