import re

files_to_refactor = [
    'src/pages/homepage-settings/HomepageSettingsMaster.jsx',
    'src/pages/homepage-settings/IndustryPageSettings.jsx'
]

def simplify_refactor(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Imports
    if "import { FormInput" not in content:
        content = content.replace(
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';",
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';"
        )
        content = content.replace(
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';",
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput } from '../../components/admin/FormComponents';"
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

    # 4. Labeled Inputs (e.g. ones preceded by a <label>)
    # We will remove the <label> tag and replace the input with FormInput!
    labeled_input_regex = re.compile(r'<label className="[^"]*">([^<]+)</label>\s*<input type="?text"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>')
    def repl_labeled(m):
        return f'<FormInput label="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = labeled_input_regex.sub(repl_labeled, content)

    labeled_textarea_regex = re.compile(r'<label className="[^"]*">([^<]+)</label>\s*<textarea rows="?(\d+)"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"></textarea>')
    def repl_labeled_textarea(m):
        return f'<FormTextarea label="{m.group(1)}" rows={{{m.group(2)}}} value={{{m.group(3)}}} onChange={{{m.group(4)}}} className="md:col-span-2" />'
    content = labeled_textarea_regex.sub(repl_labeled_textarea, content)

    # 5. Image Inputs
    img_pattern1 = re.compile(r'<div className="[^"]*flex gap-2[^"]*">\s*<FormInput label="Image URL"[^>]*value={([^}]+)}\s*onChange={([^}]+)}\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>', re.DOTALL)
    def repl_img(m):
        return f'<ImageInput label="Image" value={{{m.group(1)}}} onChange={{{m.group(2)}}} onChoose={{{m.group(3)}}} className="md:col-span-2" />'
    content = img_pattern1.sub(repl_img, content)

    img_pattern2 = re.compile(r'<div className="[^"]*flex gap-2[^"]*">\s*<input type="text" placeholder="Image URL" value={([^}]+)}\s*onChange={([^}]+)}\s*className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>', re.DOTALL)
    content = img_pattern2.sub(repl_img, content)
    
    # We leave ALL divs intact! We ONLY upgraded the form inputs.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Simply refactored {file_path}")

for f in files_to_refactor:
    simplify_refactor(f)
