import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://putjowciegpzdheideaf.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dGpvd2NpZWdwemRoZWlkZWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTQ5MTQsImV4cCI6MjA1MDUzMDkxNH0.p3UPDQc4Y9r1BbMB4cPssPKNvoj5fbf9b9M40x6724o';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const BUCKET = 'blog-images';

function logHeader(title) {
  console.log(`\n==== ${title} ====`);
}

function getClients() {
  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const svc = SUPABASE_SERVICE_ROLE_KEY ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) : null;
  return { anon, svc };
}

function tinyPngBuffer() {
  // 1x1 transparent PNG
  const base64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
  return Buffer.from(base64, 'base64');
}

async function testListObjects(anon) {
  logHeader('List objects (anon client)');
  try {
    const { data, error } = await anon.storage.from(BUCKET).list('test', { limit: 10 });
    if (error) {
      console.log('List error:', error.message);
      return false;
    }
    console.log('List success. Objects in \'test\':', (data || []).map(o => o.name));
    return true;
  } catch (e) {
    console.log('Unexpected list error:', e?.message || e);
    return false;
  }
}

async function testUpload(svc) {
  logHeader('Upload test image (service role client)');
  if (!svc) {
    console.log('Service role key missing. Skipping upload test that requires authenticated insert policy.');
    return { ok: false, path: '', url: '', reason: 'missing_service_role_key' };
  }
  const fileName = `${Date.now()}-diag.png`;
  const path = `test/${fileName}`;
  try {
    const buffer = tinyPngBuffer();
    const { data, error } = await svc.storage.from(BUCKET).upload(path, buffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.log('Upload error:', error.message);
      return { ok: false, path: '', url: '', reason: 'upload_error' };
    }
    console.log('Upload success. Path:', data.path);
    const { data: urlData } = svc.storage.from(BUCKET).getPublicUrl(data.path);
    console.log('Public URL:', urlData.publicUrl);
    return { ok: true, path: data.path, url: urlData.publicUrl };
  } catch (e) {
    console.log('Unexpected upload error:', e?.message || e);
    return { ok: false, path: '', url: '', reason: 'exception' };
  }
}

async function testPublicUrlAccessible(url) {
  logHeader('Fetch public URL');
  if (!url) {
    console.log('No URL to fetch.');
    return false;
  }
  try {
    const res = await fetch(url, { method: 'GET' });
    console.log('HTTP status:', res.status);
    const ct = res.headers.get('content-type');
    console.log('Content-Type:', ct);
    return res.ok && ct?.includes('image');
  } catch (e) {
    console.log('Fetch error:', e?.message || e);
    return false;
  }
}

async function tryAnonUpload(anon) {
  logHeader('Attempt anon upload (expected to fail if insert requires auth)');
  const fileName = `${Date.now()}-anon.png`;
  const path = `test/${fileName}`;
  try {
    const buffer = tinyPngBuffer();
    const { data, error } = await anon.storage.from(BUCKET).upload(path, buffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.log('Anon upload failed as expected:', error.message);
      return false;
    }
    console.log('Anon upload unexpectedly succeeded. Path:', data.path);
    return true;
  } catch (e) {
    console.log('Anon upload threw error (expected):', e?.message || e);
    return false;
  }
}

async function cleanup(svc, path) {
  logHeader('Cleanup test object');
  if (!svc || !path) {
    console.log('Skip cleanup. Missing service client or path.');
    return;
  }
  try {
    const { error } = await svc.storage.from(BUCKET).remove([path]);
    if (error) {
      console.log('Cleanup delete error:', error.message);
    } else {
      console.log('Cleanup success. Deleted:', path);
    }
  } catch (e) {
    console.log('Cleanup unexpected error:', e?.message || e);
  }
}

async function main() {
  console.log('Supabase URL:', SUPABASE_URL);
  console.log('Using service role:', Boolean(SUPABASE_SERVICE_ROLE_KEY));
  const { anon, svc } = getClients();

  // 1) List objects (policy SELECT)
  const listOk = await testListObjects(anon);

  // 2) Upload with service role
  const { ok: uploadOk, path, url } = await testUpload(svc);

  // 3) Fetch public URL
  const urlOk = await testPublicUrlAccessible(url);

  // 4) Try anon upload (should fail if policy requires auth)
  const anonUploadOk = await tryAnonUpload(anon);

  // 5) Cleanup
  await cleanup(svc, path);

  logHeader('Summary');
  console.log('List objects (anon):', listOk ? 'OK' : 'FAILED');
  console.log('Upload (service role):', uploadOk ? 'OK' : 'FAILED');
  console.log('Public URL fetch:', urlOk ? 'OK' : 'FAILED');
  console.log('Anon upload allowed:', anonUploadOk ? 'YES (unexpected if policy requires auth)' : 'NO (expected)');

  if (!uploadOk) {
    console.log('\nPossible causes:');
    console.log('- Bucket may not exist or is misconfigured');
    console.log('- Storage RLS may block inserts (service role missing)');
    console.log('- Network/CORS issue when calling storage API');
  }
  if (!urlOk && uploadOk) {
    console.log('\nPublic URL issue detected:');
    console.log('- Bucket may not be public');
    console.log('- Object path malformed');
    console.log('- Supabase project URL incorrect');
  }
}

main().catch((e) => {
  console.error('Fatal error:', e?.message || e);
  process.exitCode = 1;
});