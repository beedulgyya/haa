import fs from "node:fs";
import path from "node:path";
const ignored=new Set([".git","node_modules","playwright-report","test-results"]);
const allowed=new Set([".html",".css",".js",".mjs",".json",".yml",".yaml",".md",".txt"]);
const patterns=[
 /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
 /sk-[A-Za-z0-9]{20,}/,
 /ghp_[A-Za-z0-9]{20,}/,
 /github_pat_[A-Za-z0-9_]{20,}/,
 /AIza[0-9A-Za-z_-]{20,}/,
 /(?:api[_-]?key|secret|password|passwd|authorization|bearer|token)\s*[:=]\s*["'][^"']{8,}/i
];
const findings=[];
function walk(dir){
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  if(ignored.has(e.name)) continue;
  const full=path.join(dir,e.name);
  if(e.isDirectory()) walk(full);
  else if(allowed.has(path.extname(e.name).toLowerCase())){
   const text=fs.readFileSync(full,"utf8");
   for(const p of patterns) if(p.test(text)) findings.push({file:path.relative(process.cwd(),full),pattern:String(p)});
  }
 }
}
walk(process.cwd());
if(findings.length){console.error("Potential sensitive value patterns found:");for(const f of findings)console.error("-",f.file, f.pattern);process.exit(1);}
console.log("Secret scan: PASS");
