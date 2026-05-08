import csv
import json
import re

csv_file = "Pemetaan Kerja Sama KKP - Database.csv"
data_js_file = "app/js/data.js"

# 1. Parse CSV
data_list = []
with open(csv_file, mode='r', encoding='utf-8-sig') as f: # Use utf-8-sig to handle BOM
    # Skip header
    header = next(f)
    reader = csv.reader(f)
    for row in reader:
        if not row or not any(row): continue
        
        # Mapping based on CSV structure
        # row[0]: Tahun, row[1]: Kategori, row[2]: Mitra, row[3]: Jenis, row[5]: No Pihak 1, row[7]: No Pihak 2, row[10]: Selesai, row[11]: Status, row[13]: Link
        
        item = {
            "id": f"KSM-{len(data_list) + 1:03d}",
            "tahun": row[0].strip().replace('\n', ' '),
            "kategoriMitra": row[1].strip().replace('\n', ' '),
            "mitra": row[2].strip().replace('\n', ' '),
            "jenisKerjasama": row[3].strip().replace('\n', ' '),
            "pihak1": row[4].strip().replace('\n', ' '),
            "noPihak1": row[5].strip().replace('\n', ' '),
            "pihak2": row[6].strip().replace('\n', ' '),
            "noPihak2": row[7].strip().replace('\n', ' '),
            "masaBerlaku": row[8].strip().replace('\n', ' '),
            "tanggalMulai": row[9].strip().replace('\n', ' '),
            "tanggalSelesai": row[10].strip().replace('\n', ' '),
            "status": row[11].strip().replace('\n', ' '),
            "linkDokumen": row[13].strip().replace('\n', ' ') if len(row) > 13 else ""
        }
        data_list.append(item)

# 2. Prepare JSON string
json_data = json.dumps(data_list, indent=4)

# 3. Read data.js and replace the array more carefully
with open(data_js_file, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the start of 'databaseKerjaSama: [' and the matching closing ']'
# Since there might be nested brackets, let's use a simpler marker search

start_tag = "databaseKerjaSama: ["
end_tag = "// --- Current User Session ---" # This is a reliable marker after the array

start_idx = content.find(start_tag)
end_idx = content.find(end_tag)

if start_idx != -1 and end_idx != -1:
    # Preserve everything before the array and everything after the marker
    new_content = content[:start_idx] + f"databaseKerjaSama: {json_data},\n  " + content[end_idx:]
    
    with open(data_js_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully fixed and imported {len(data_list)} rows to data.js")
else:
    print("Could not find markers in data.js")
