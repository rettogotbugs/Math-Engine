import fs from 'fs';
import path from 'path';

const directory = 'src/lib/tools';

const classMap = {
    'Basic Math': 'Class 8',
    'Arithmetic & Number System': 'Class 8',
    'Trigonometry': 'Class 9-10',
    'Geometry': 'Class 8',
    'Mensuration': 'Class 9-10',
    'Coordinate Geometry': 'Class 9-10',
    'Calculus': 'Class 11-12',
    'Statistics & Data': 'Class 9-10',
    'Charts & Graphs': 'Class 8',
    'Advanced Math (JEE Level)': 'Class 11-12',
    'Utility': 'General'
};

const files = fs.readdirSync(directory);

for (const filename of files) {
    if (filename.endsWith('.ts')) {
        const filepath = path.join(directory, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        for (const [cat, cls] of Object.entries(classMap)) {
            const regex = new RegExp(`category: "${cat}",\\n`, 'g');
            content = content.replace(regex, `category: "${cat}",\n    classLevel: "${cls}",\n`);
        }
        
        fs.writeFileSync(filepath, content);
    }
}

console.log("Updated tools");
