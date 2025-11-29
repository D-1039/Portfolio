# Chat Widget Alternative Approaches

## Current Method: Node.js Proxy + HF Router API
**Complexity: Medium**
- ✅ Works reliably, bypasses CORS
- ✅ Can switch models easily
- ❌ Requires backend server running
- ❌ Not suitable for static hosting (needs deployment)

---

## Simpler Alternatives

### 1. **Hugging Face Serverless Inference API (Simplest!)**
**Complexity: Low | Recommended if new API supports CORS**

```javascript
// No backend needed if HF enables CORS on their new router
const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    messages: [{ role: 'user', content: prompt }]
  })
});
```

**Status**: Currently blocked by CORS. Monitor HF Router updates—they may enable CORS headers in future.

---

### 2. **Static FAQ-Only Bot (Zero Backend)**
**Complexity: Very Low**

- Remove LLM integration entirely
- Use only regex-based FAQ patterns
- Add more comprehensive FAQ coverage
- **Pros**: Zero cost, instant responses, no API keys
- **Cons**: Limited to predefined questions

**Implementation**: Already in place as fallback; expand FAQ array with more patterns.

---

### 3. **Browser-Based LLM (WebLLM)**
**Complexity: Medium-High**

Use [WebLLM](https://github.com/mlc-ai/web-llm) to run small models like Phi-2 or Llama-3.2-1B directly in browser via WebGPU.

```javascript
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const engine = await CreateWebWorkerMLCEngine(
  new Worker("worker.js"), 
  "Llama-3.2-1B-Instruct-q4f16_1-MLC"
);

const response = await engine.chat.completions.create({
  messages: [{ role: "user", content: prompt }]
});
```

**Pros**: No backend, no API keys, works offline
**Cons**: Large initial download (~1-2GB model), requires modern GPU, slower on low-end devices

---

### 4. **Public LLM APIs with CORS Support**
**Complexity: Low**

Use APIs that allow direct browser calls:

- **OpenAI (via CORS proxy)**: Still needs proxy or serverless function
- **Anthropic Claude**: No browser CORS support
- **Cohere**: Supports CORS! Can call directly from browser
- **Together AI**: Some endpoints support CORS

**Example with Cohere** (supports CORS):
```javascript
const response = await fetch('https://api.cohere.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${cohereApiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: prompt, model: 'command-r' })
});
```

---

### 5. **Serverless Function Proxy (Easiest Deployment)**
**Complexity: Low**

Deploy your proxy as a serverless function instead of running Node.js locally:

**Vercel (Free tier)**:
```javascript
// api/chat.js
export default async function handler(req, res) {
  const { prompt, apiKey } = req.body;
  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/Meta-Llama-3-8B-Instruct',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  res.json([{ generated_text: data.choices[0].message.content }]);
}
```

Deploy: `vercel deploy`
Update frontend: `PROXY_ENDPOINT = 'https://your-app.vercel.app/api/chat'`

**Pros**: No local server, auto-scaling, free tier generous
**Cons**: Slight cold-start delay (~500ms)

---

## Recommendation

**For Development**: Keep current Node.js proxy (already working)

**For Production**:
1. **Best**: Deploy proxy to Vercel/Netlify serverless (5 min setup)
2. **Alternative**: Switch to Cohere API if you prefer direct browser calls
3. **Future**: Wait for HF Router to add CORS support, then remove proxy

**If you want zero backend forever**: Expand FAQ-only mode or explore WebLLM for offline AI.

---

## Quick Migration to Vercel Serverless

1. Create `api/chat.js` with handler code above
2. Add `vercel.json`:
```json
{
  "functions": {
    "api/chat.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```
3. Run `vercel deploy`
4. Update `chat-widget.html`: `const PROXY_ENDPOINT = 'https://your-username-miniproject.vercel.app/api/chat';`
5. Delete local `hf-proxy.js` and `npm` files

**Estimated time**: 10 minutes
