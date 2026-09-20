const { readSiteData, writeSiteData } = require('./_db');
const { requireAdmin } = require('./_auth');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  try {
    if (req.method === 'GET') {
      let payload = await readSiteData();
      if (!payload) {
        try {
          const localDataPath = path.join(__dirname, '..', 'data.json');
          if (fs.existsSync(localDataPath)) {
            payload = JSON.parse(fs.readFileSync(localDataPath, 'utf-8'));
            await writeSiteData(payload);
          }
        } catch (seedErr) {
          console.error('Auto-seed error:', seedErr);
        }
      }
      return res.status(200).json({ payload });
    }
    if (req.method === 'PUT') {
      if (!requireAdmin(req, res)) return;
      const payload = req.body && req.body.payload;
      if (!payload || typeof payload !== 'object' || !Array.isArray(payload.products)) {
        return res.status(400).json({ success: false, message: 'بيانات الموقع غير صالحة.' });
      }
      if (!Array.isArray(payload.categories) || payload.categories.length === 0) {
        try {
          const localDataPath = path.join(__dirname, '..', 'data.json');
          if (fs.existsSync(localDataPath)) {
            const localData = JSON.parse(fs.readFileSync(localDataPath, 'utf-8'));
            payload.categories = localData.categories || [];
          }
        } catch (e) {}
      }
      await writeSiteData(payload);
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('site-data API error', error);
    return res.status(500).json({ success: false, message: 'تعذر الاتصال بقاعدة البيانات.' });
  }
};

