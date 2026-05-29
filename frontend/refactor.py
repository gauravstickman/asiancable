import re

files_to_refactor = [
    'src/pages/homepage-settings/HomepageSettingsMaster.jsx',
    'src/pages/homepage-settings/IndustryPageSettings.jsx'
]

def refactor_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if "import { FormInput" not in content:
        content = content.replace(
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';",
            "import { Plus, Trash2, Image, Home, Info, BarChart2, Briefcase, FileText, Settings, Star, Cpu, Type } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput, FormCard } from '../../components/admin/FormComponents';"
        )
        content = content.replace(
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';",
            "import { Plus, Trash2, Image, LayoutTemplate, Briefcase, Users, Anchor, Zap, Grid, FileText, Layers } from 'lucide-react';\nimport { FormInput, FormTextarea, ImageInput, FormCard } from '../../components/admin/FormComponents';"
        )

    # 1. Simple text inputs
    input_regex = re.compile(
        r'<input type="?text"?\s+placeholder="([^"]+)"\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>'
    )
    def repl_input(m):
        label = m.group(1).replace(' (e.g. 3600)', '').replace(' (e.g. Production)', '').replace(' (comma separated)', '').replace(' (e.g. ABOUT US)', '').replace(' (e.g. blue)', '').replace(' (e.g. PRIMARY APPLICATION)', '').replace(' (e.g. 2.5M+)', '').replace(' (e.g. 5)', '').replace(' (e.g. 20,000)', '')
        label = re.sub(r'\s*\([^)]*\)', '', label)
        return f'<FormInput label="{label}" placeholder="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = input_regex.sub(repl_input, content)

    # Replace type="number"
    number_regex = re.compile(
        r'<input type="?number"?\s+placeholder="([^"]+)"\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>'
    )
    def repl_number(m):
        label = re.sub(r'\s*\([^)]*\)', '', m.group(1))
        return f'<FormInput type="number" label="{label}" placeholder="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = number_regex.sub(repl_number, content)

    # 2. Simple textarea
    textarea_regex = re.compile(
        r'<textarea(?: rows="?(\d+)"?)?\s+placeholder="([^"]+)"(?:\s+rows="?(\d+)"?)?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"></textarea>'
    )
    def repl_textarea(m):
        rows = m.group(1) or m.group(3) or '3'
        label = re.sub(r'\s*\([^)]*\)', '', m.group(2))
        return f'<FormTextarea label="{label}" placeholder="{m.group(2)}" rows={{{rows}}} value={{{m.group(4)}}} onChange={{{m.group(5)}}} className="md:col-span-2" />'
    content = textarea_regex.sub(repl_textarea, content)

    # 3. Image Input combinations
    image_input_regex = re.compile(
        r'<div className="[^"]*flex gap-2[^"]*">\s*<FormInput label="Image URL" placeholder="Image URL" value={([^}]+)}\s*onChange={([^}]+)}\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>'
    )
    def repl_img(m):
        return f'<ImageInput label="Image" value={{{m.group(1)}}} onChange={{{m.group(2)}}} onChoose={{{m.group(3)}}} className="md:col-span-2" />'
    content = image_input_regex.sub(repl_img, content)

    image_input_regex_2 = re.compile(
        r'<div className="[^"]*flex gap-2[^"]*">\s*<input type="?text"?\s*placeholder="Image URL"\s*value={([^}]+)}\s*onChange={([^}]+)}\s*className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/>(?: Choose)?</button>\s*</div>'
    )
    content = image_input_regex_2.sub(repl_img, content)

    # Labeled inputs
    labeled_input_regex = re.compile(
        r'<label className="[^"]*">([^<]+)</label>\s*<input type="?text"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>'
    )
    def repl_labeled(m):
        return f'<FormInput label="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} />'
    content = labeled_input_regex.sub(repl_labeled, content)

    labeled_textarea_regex = re.compile(
        r'<label className="[^"]*">([^<]+)</label>\s*<textarea rows="?(\d+)"?\s+value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"></textarea>'
    )
    def repl_labeled_textarea(m):
        return f'<FormTextarea label="{m.group(1)}" rows={{{m.group(2)}}} value={{{m.group(3)}}} onChange={{{m.group(4)}}} className="md:col-span-2" />'
    content = labeled_textarea_regex.sub(repl_labeled_textarea, content)

    labeled_image_regex = re.compile(
        r'<label className="[^"]*">([^<]+)</label>\s*<div className="flex gap-2">\s*<input type="text" value={([^}]+)}\s+onChange={([^}]+)}\s+className="[^"]*"\s*/>\s*<button onClick={([^}]+)}\s*className="[^"]*"><Image size={16}/> Choose</button>\s*</div>'
    )
    def repl_labeled_img(m):
        return f'<ImageInput label="{m.group(1)}" value={{{m.group(2)}}} onChange={{{m.group(3)}}} onChoose={{{m.group(4)}}} className="md:col-span-2" />'
    content = labeled_image_regex.sub(repl_labeled_img, content)

    # FormCard replacements
    # Need to match the opening div, and then replace the corresponding closing div.
    # We can do this safely using regex if we just look for the typical pattern block.
    
    # We know the pattern is:
    # <div key={idx} className="bg-slate-50 p-4 rounded-lg border relative ...">
    #    <button ... Trash2 ...</button>
    #    ... inputs ...
    # </div>
    # ))}
    
    # Let's replace the opening:
    card_open_regex = re.compile(
        r'<div key={([^}]+)}\s*className="bg-slate-50 p-4 rounded-lg border relative[^"]*">\s*<button onClick={([^}]+)}\s*className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={18}/></button>'
    )
    def repl_card_open(m):
        return f'<FormCard key={{{m.group(1)}}} onRemove={{{m.group(2)}}}>'
    content = card_open_regex.sub(repl_card_open, content)

    # Some without the absolute Trash button but are cards:
    card_flex_regex = re.compile(
        r'<div key={([^}]+)}\s*className="bg-slate-50 p-4 rounded-lg border relative flex gap-3 items-center">\s*<button onClick={([^}]+)}\s*className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>'
    )
    def repl_card_flex(m):
        return f'<FormCard key={{{m.group(1)}}} onRemove={{{m.group(2)}}}>'
    content = card_flex_regex.sub(repl_card_flex, content)

    # Now we need to replace the `</div>\n))} ` with `</FormCard>\n))}`
    # To be safe, we can just replace `</div>\n))} ` -> `</FormCard>\n))}` if it was a map
    # Actually `))} ` might have spaces.
    content = re.sub(r'</div>\s*\)\)}', r'</FormCard>\n                                ))} ', content)

    # Also there are some simple flex groups (like stats in aboutUs)
    # <div key={idx} className="flex gap-2"> ... <Trash2 ... /></div>
    # We can leave them or upgrade them too.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Refactored {file_path}")

for f in files_to_refactor:
    refactor_file(f)
